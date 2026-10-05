export interface Noticia {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha: string;
  autor: string;
  tiempoLectura: string;
  vistas: number;
  destacada: boolean;
  contenido: string[];
}
