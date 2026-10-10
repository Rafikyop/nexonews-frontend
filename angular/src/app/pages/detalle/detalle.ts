import { Component, OnInit, signal } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { NoticiasService } from '../../services/noticias';

import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-detalle',

  imports: [RouterLink],

  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle implements OnInit {
  noticia = signal<Noticia | null>(null);

  cargando = signal(true);

  noEncontrada = signal(false);

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.noEncontrada.set(true);
      this.cargando.set(false);

      return;
    }

    this.noticiasService.obtenerNoticiaPorId(id).subscribe({
      next: (noticia) => {
        if (!noticia) {
          this.noEncontrada.set(true);
        } else {
          this.noticia.set(noticia);
        }

        this.cargando.set(false);
      },

      error: (error) => {
        console.error('Error cargando la noticia:', error);

        this.noEncontrada.set(true);
        this.cargando.set(false);
      },
    });
  }

  obtenerClaseCategoria(categoria: string): string {
    const clases: Record<string, string> = {
      Tecnología: 'category-badge--technology',

      Educación: 'category-badge--education',

      Turismo: 'category-badge--tourism',

      Negocios: 'category-badge--business',
    };

    return clases[categoria] ?? '';
  }
}
