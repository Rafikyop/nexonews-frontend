import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, map, of, tap } from 'rxjs';

import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  private readonly dataUrl = '/data/noticias.json';

  private readonly STORAGE_KEY = 'nexonews_news';

  constructor(private http: HttpClient) {}

  obtenerNoticias(): Observable<Noticia[]> {
    const guardadas = localStorage.getItem(this.STORAGE_KEY);

    if (guardadas) {
      try {
        const noticias: Noticia[] = JSON.parse(guardadas);

        return of(noticias);
      } catch (error) {
        console.error('Error leyendo noticias guardadas:', error);
      }
    }

    return this.http.get<Noticia[]>(this.dataUrl).pipe(
      tap((noticias) => {
        this.guardarNoticias(noticias);
      }),
    );
  }

  obtenerDestacadas(): Observable<Noticia[]> {
    return this.obtenerNoticias().pipe(
      map((noticias) => noticias.filter((noticia) => noticia.destacada)),
    );
  }

  obtenerNoticiaPorId(id: number): Observable<Noticia | undefined> {
    return this.obtenerNoticias().pipe(
      map((noticias) => noticias.find((noticia) => noticia.id === id)),
    );
  }

  obtenerPorCategoria(categoria: string): Observable<Noticia[]> {
    return this.obtenerNoticias().pipe(
      map((noticias) => {
        if (!categoria || categoria === 'Todas') {
          return noticias;
        }

        return noticias.filter((noticia) => noticia.categoria === categoria);
      }),
    );
  }

  crearNoticia(datos: Omit<Noticia, 'id' | 'vistas'>): void {
    this.obtenerNoticias().subscribe((noticias) => {
      const nuevoId =
        noticias.length > 0 ? Math.max(...noticias.map((noticia) => noticia.id)) + 1 : 1;

      const nuevaNoticia: Noticia = {
        ...datos,

        id: nuevoId,

        vistas: 0,
      };

      this.guardarNoticias([nuevaNoticia, ...noticias]);
    });
  }

  actualizarNoticia(id: number, datos: Partial<Noticia>): void {
    this.obtenerNoticias().subscribe((noticias) => {
      const actualizadas = noticias.map((noticia) => {
        if (noticia.id !== id) {
          return noticia;
        }

        return {
          ...noticia,
          ...datos,
          id: noticia.id,
        };
      });

      this.guardarNoticias(actualizadas);
    });
  }

  eliminarNoticia(id: number): void {
    this.obtenerNoticias().subscribe((noticias) => {
      const actualizadas = noticias.filter((noticia) => noticia.id !== id);

      this.guardarNoticias(actualizadas);
    });
  }

  private guardarNoticias(noticias: Noticia[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(noticias));
  }
}
