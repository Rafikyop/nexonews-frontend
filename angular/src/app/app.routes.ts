import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Noticias } from './pages/noticias/noticias';
import { Detalle } from './pages/detalle/detalle';
import { Favoritos } from './pages/favoritos/favoritos';
import { Contacto } from './pages/contacto/contacto';
import { Admin } from './pages/admin/admin';
import { NoticiaForm } from './pages/noticia-form/noticia-form';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'NexoNews | Inicio',
  },
  {
    path: 'noticias',
    component: Noticias,
    title: 'NexoNews | Noticias',
  },
  {
    path: 'noticia/:id',
    component: Detalle,
    title: 'NexoNews | Detalle',
  },
  {
    path: 'favoritos',
    component: Favoritos,
    title: 'NexoNews | Favoritos',
  },
  {
    path: 'contacto',
    component: Contacto,
    title: 'NexoNews | Contacto',
  },
  {
    path: 'admin',
    component: Admin,
    title: 'NexoNews | Administrador',
  },
  {
    path: 'admin/noticia/nueva',
    component: NoticiaForm,
    title: 'NexoNews | Crear noticia',
  },
  {
    path: 'admin/noticia/:id/editar',
    component: NoticiaForm,
    title: 'NexoNews | Editar noticia',
  },

  {
    path: '**',
    redirectTo: '',
  },
];
