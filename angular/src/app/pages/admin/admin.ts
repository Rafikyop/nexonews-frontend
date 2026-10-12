import { Component, signal } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin',

  imports: [ReactiveFormsModule],

  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  errorLogin = signal(false);

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required]],
    });
  }

  iniciarSesion(): void {
    this.errorLogin.set(false);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();

      return;
    }

    const email = this.formulario.value.email ?? '';

    const password = this.formulario.value.password ?? '';

    const valido = this.authService.iniciarSesion(email, password);

    if (!valido) {
      this.errorLogin.set(true);

      return;
    }

    this.router.navigate(['/noticias']);
  }
}
