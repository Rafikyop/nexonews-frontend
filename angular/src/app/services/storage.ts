import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly FAVORITES_KEY = 'nexonews_favorites';

  favoritos = signal<number[]>(this.cargarFavoritos());

  private cargarFavoritos(): number[] {
    const data = localStorage.getItem(this.FAVORITES_KEY);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error leyendo favoritos:', error);

      return [];
    }
  }

  private guardarFavoritos(favoritos: number[]): void {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favoritos));

    this.favoritos.set(favoritos);
  }

  esFavorito(id: number): boolean {
    return this.favoritos().includes(id);
  }

  agregarFavorito(id: number): void {
    if (this.esFavorito(id)) {
      return;
    }

    const favoritos = [...this.favoritos(), id];

    this.guardarFavoritos(favoritos);
  }

  eliminarFavorito(id: number): void {
    const favoritos = this.favoritos().filter((favoritoId) => favoritoId !== id);

    this.guardarFavoritos(favoritos);
  }

  alternarFavorito(id: number): void {
    if (this.esFavorito(id)) {
      this.eliminarFavorito(id);
    } else {
      this.agregarFavorito(id);
    }
  }
}
