import { Component, signal } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',

  imports: [ReactiveFormsModule],

  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  formulario: FormGroup;

  mensajeEnviado = signal(false);

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],

      email: ['', [Validators.required, Validators.email]],

      asunto: ['', [Validators.required]],

      mensaje: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  enviarFormulario(): void {
    this.mensajeEnviado.set(false);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();

      return;
    }

    console.log('Formulario enviado:', this.formulario.value);

    this.mensajeEnviado.set(true);

    this.formulario.reset();
  }

  campoInvalido(nombreCampo: string): boolean {
    const campo = this.formulario.get(nombreCampo);

    return Boolean(campo && campo.invalid && campo.touched);
  }
}
