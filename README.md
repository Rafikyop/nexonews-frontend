# NexoNews

NexoNews es una aplicación web tipo periódico digital desarrollada como proyecto académico para la asignatura FrontEnd.

La aplicación permite consultar noticias de tecnología, educación, turismo y negocios, visualizar su contenido completo, realizar búsquedas, guardar favoritos y gestionar noticias desde un módulo administrativo.

## Objetivo

Desarrollar progresivamente una aplicación web funcional aplicando HTML, CSS y JavaScript, con una estructura preparada para incorporar fundamentos de Angular en la etapa final del proyecto.

El proyecto se divide en tres etapas:

- Entrega 1: diseño y maquetación.
- Entrega 2: prototipo funcional con HTML, CSS y JavaScript.
- Entrega 3: implementación básica con Angular y despliegue web.

## Estado del proyecto

Actualmente NexoNews corresponde a la **Entrega 2** y cuenta con un prototipo funcional.

### Funcionalidades implementadas

- Home basado en los mockups realizados en Figma.
- Navbar y footer reutilizables.
- Carga de noticias desde un archivo JSON.
- Renderizado dinámico de noticias.
- Listado completo de noticias.
- Filtros por categoría.
- Buscador.
- Vista de detalle mediante parámetros en la URL.
- Sistema de favoritos con `localStorage`.
- Persistencia de favoritos al recargar la aplicación.
- Formulario de contacto con validaciones.
- Inicio de sesión administrativo simulado.
- Creación, edición y eliminación de noticias.
- Persistencia del CRUD mediante `localStorage`.
- Interfaz diferenciada para usuario y administrador.
- Diseño responsive básico.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- JSON
- LocalStorage
- Git
- GitHub

## Estructura del proyecto

```text
nexonews/
│
├── index.html
├── noticias.html
├── detalle.html
├── favoritos.html
├── contacto.html
├── acerca.html
├── admin.html
├── crear-noticia.html
│
├── components/
│   ├── navbar.html
│   └── footer.html
│
├── css/
│   ├── global.css
│   ├── components.css
│   └── pages.css
│
├── data/
│   └── noticias.json
│
├── js/
│   ├── app.js
│   │
│   ├── components/
│   │   ├── navbar.js
│   │   ├── footer.js
│   │   └── news-card.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── noticias.service.js
│   │   └── storage.service.js
│   │
│   └── pages/
│       ├── home.js
│       ├── noticias.js
│       ├── detalle.js
│       ├── favoritos.js
│       ├── contacto.js
│       ├── admin.js
│       └── crear-noticia.js
│
└── assets/
    └── images/
```
