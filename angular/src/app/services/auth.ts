import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SESSION_KEY = 'nexonews_admin_session';

  esAdmin = signal(this.cargarSesion());

  private cargarSesion(): boolean {
    const data = localStorage.getItem(this.SESSION_KEY);

    if (!data) {
      return false;
    }

    try {
      const session = JSON.parse(data);

      return session.loggedIn === true && session.role === 'admin';
    } catch {
      return false;
    }
  }

  iniciarSesion(email: string, password: string): boolean {
    const valido = email === 'admin@nexonews.com' && password === 'nexo2026';

    if (!valido) {
      return false;
    }

    localStorage.setItem(
      this.SESSION_KEY,
      JSON.stringify({
        email,
        role: 'admin',
        loggedIn: true,
      }),
    );

    this.esAdmin.set(true);

    return true;
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.SESSION_KEY);

    this.esAdmin.set(false);
  }
}
