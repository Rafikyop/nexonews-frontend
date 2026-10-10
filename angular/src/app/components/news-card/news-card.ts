import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { DatePipe } from '@angular/common';

import { Noticia } from '../../models/noticia.model';

import { StorageService } from '../../services/storage';

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

  constructor(public storageService: StorageService) {}

  alternarFavorito(): void {
    this.storageService.alternarFavorito(this.noticia.id);
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
