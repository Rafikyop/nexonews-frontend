import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { DatePipe } from '@angular/common';

import { Noticia } from '../../models/noticia.model';

import { StorageService } from '../../services/storage';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

import { NoticiasService } from '../../services/noticias';

@Component({
  selector: 'app-news-card',

  imports: [RouterLink, DatePipe],

  templateUrl: './news-card.html',

  styleUrl: './news-card.css',
})
export class NewsCard {
  @Input({
    required: true,
  })
  noticia!: Noticia;

  constructor(
    public storageService: StorageService,
    public authService: AuthService,
    private noticiasService: NoticiasService,
    private router: Router,
  ) {}

  alternarFavorito(): void {
    this.storageService.alternarFavorito(this.noticia.id);
  }

  editarNoticia(): void {
    this.router.navigate(['/admin/noticia', this.noticia.id, 'editar']);
  }

  eliminarNoticia(): void {
    const confirmar = window.confirm(`¿Seguro que deseas eliminar "${this.noticia.titulo}"?`);

    if (!confirmar) {
      return;
    }

    this.noticiasService.eliminarNoticia(this.noticia.id);

    window.location.reload();
  }

  obtenerClaseCategoria(): string {
    const clases: Record<string, string> = {
      Tecnología: 'category-badge--technology',

      Educación: 'category-badge--education',

      Turismo: 'category-badge--tourism',

      Negocios: 'category-badge--business',
    };

    return clases[this.noticia.categoria] ?? '';
  }
}
