import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  private readonly dataUrl = '/data/noticias.json';

  constructor(private http: HttpClient) {}

  obtenerNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.dataUrl);
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
}
