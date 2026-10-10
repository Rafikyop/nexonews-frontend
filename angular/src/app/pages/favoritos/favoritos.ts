import { Component, computed, OnInit, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

import { NoticiasService } from '../../services/noticias';

import { StorageService } from '../../services/storage';

import { Noticia } from '../../models/noticia.model';

import { NewsCard } from '../../components/news-card/news-card';

@Component({
  selector: 'app-favoritos',

  imports: [RouterLink, NewsCard],

  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos implements OnInit {
  noticias = signal<Noticia[]>([]);

  noticiasFavoritas = computed(() => {
    const ids = this.storageService.favoritos();

    return this.noticias().filter((noticia) => ids.includes(noticia.id));
  });

  constructor(
    private noticiasService: NoticiasService,

    public storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.noticiasService.obtenerNoticias().subscribe({
      next: (noticias) => {
        this.noticias.set(noticias);
      },

      error: (error) => {
        console.error('Error cargando favoritos:', error);
      },
    });
  }
}
