import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';

import { NoticiasService } from '../../services/noticias';

import { Noticia } from '../../models/noticia.model';

import { NewsCard } from '../../components/news-card/news-card';

@Component({
  selector: 'app-home',

  imports: [RouterLink, NewsCard],

  templateUrl: './home.html',

  styleUrl: './home.css',
})
export class Home implements OnInit {
  noticiasDestacadas: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiasService.obtenerDestacadas().subscribe({
      next: (noticias) => {
        this.noticiasDestacadas = noticias;
      },

      error: (error) => {
        console.error('Error cargando noticias:', error);
      },
    });
  }
}
