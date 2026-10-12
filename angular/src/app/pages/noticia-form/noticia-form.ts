import { Component, OnInit, signal } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NoticiasService } from '../../services/noticias';

import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-noticia-form',

  imports: [ReactiveFormsModule, RouterLink],

  templateUrl: './noticia-form.html',
  styleUrl: './noticia-form.css',
})
export class NoticiaForm implements OnInit {
  formulario: FormGroup;

  modoEdicion = signal(false);

  cargando = signal(false);

  noticiaNoEncontrada = signal(false);

  private noticiaId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private noticiasService: NoticiasService,
  ) {
    this.formulario = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],

      descripcion: ['', [Validators.required, Validators.minLength(10)]],

      categoria: ['', [Validators.required]],

      imagen: ['', [Validators.required]],

      fecha: ['', [Validators.required]],

      autor: ['', [Validators.required]],

      tiempoLectura: ['', [Validators.required]],

      destacada: [false],

      contenido: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  ngOnInit(): void {
    const idTexto = this.route.snapshot.paramMap.get('id');

    if (!idTexto) {
      this.modoEdicion.set(false);

      return;
    }

    const id = Number(idTexto);

    if (!id) {
      this.noticiaNoEncontrada.set(true);

      return;
    }

    this.modoEdicion.set(true);

    this.noticiaId = id;

    this.cargarNoticia(id);
  }

  private cargarNoticia(id: number): void {
    this.cargando.set(true);

    this.noticiasService.obtenerNoticiaPorId(id).subscribe({
      next: (noticia) => {
        if (!noticia) {
          this.noticiaNoEncontrada.set(true);

          this.cargando.set(false);

          return;
        }

        this.formulario.patchValue({
          titulo: noticia.titulo,

          descripcion: noticia.descripcion,

          categoria: noticia.categoria,

          imagen: noticia.imagen,

          fecha: noticia.fecha,

          autor: noticia.autor,

          tiempoLectura: noticia.tiempoLectura,

          destacada: noticia.destacada,

          contenido: noticia.contenido.join('\n\n'),
        });

        this.cargando.set(false);
      },

      error: (error) => {
        console.error('Error cargando noticia:', error);

        this.noticiaNoEncontrada.set(true);

        this.cargando.set(false);
      },
    });
  }

  guardarNoticia(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();

      return;
    }

    const valores = this.formulario.getRawValue();

    const contenido = valores.contenido
      .split(/\n+/)
      .map((parrafo: string) => parrafo.trim())
      .filter((parrafo: string) => parrafo.length > 0);

    const datos: Omit<Noticia, 'id' | 'vistas'> = {
      titulo: valores.titulo,

      descripcion: valores.descripcion,

      categoria: valores.categoria,

      imagen: valores.imagen,

      fecha: valores.fecha,

      autor: valores.autor,

      tiempoLectura: valores.tiempoLectura,

      destacada: valores.destacada,

      contenido,
    };

    if (this.modoEdicion() && this.noticiaId) {
      this.noticiasService.actualizarNoticia(this.noticiaId, datos);
    } else {
      this.noticiasService.crearNoticia(datos);
    }

    this.router.navigate(['/noticias']);
  }

  campoInvalido(nombreCampo: string): boolean {
    const campo = this.formulario.get(nombreCampo);

    return Boolean(campo && campo.invalid && campo.touched);
  }
}
