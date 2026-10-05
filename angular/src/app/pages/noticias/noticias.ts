import { Component, OnInit, signal, computed } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { NoticiasService } from '../../services/noticias';

import { Noticia } from '../../models/noticia.model';

import { NewsCard } from '../../components/news-card/news-card';

@Component({
  selector: 'app-noticias',

  imports: [NewsCard],

  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias implements OnInit {
  // Estado reactivo con todas las noticias
  noticias = signal<Noticia[]>([]);

  // Categoría actualmente seleccionada
  categoriaActiva = signal('Todas');

  // Texto ingresado en el buscador
  textoBusqueda = signal('');

  // Valor calculado automáticamente
  noticiasFiltradas = computed(() => {
    const categoria = this.categoriaActiva();

    const busqueda = this.textoBusqueda();

    return this.noticias().filter((noticia) => {
      const coincideCategoria = categoria === 'Todas' || noticia.categoria === categoria;

      const textoNoticia = `
            ${noticia.titulo}
            ${noticia.descripcion}
            ${noticia.autor}
          `.toLowerCase();

      const coincideBusqueda = textoNoticia.includes(busqueda);

      return coincideCategoria && coincideBusqueda;
    });
  });

  constructor(
    private noticiasService: NoticiasService,

    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Leemos la categoría de la URL
    this.route.queryParamMap.subscribe((params) => {
      const categoria = params.get('categoria') ?? 'Todas';

      this.categoriaActiva.set(categoria);
    });

    // Cargamos todas las noticias
    this.noticiasService.obtenerNoticias().subscribe({
      next: (noticias) => {
        this.noticias.set(noticias);
      },

      error: (error) => {
        console.error('Error cargando noticias:', error);
      },
    });
  }

  seleccionarCategoria(categoria: string): void {
    this.categoriaActiva.set(categoria);
  }

  buscarNoticias(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.textoBusqueda.set(input.value.trim().toLowerCase());
  }
}
