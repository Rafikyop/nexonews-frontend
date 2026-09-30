# NexoNews

NexoNews es una aplicación web tipo periódico digital desarrollada como proyecto académico para la asignatura FrontEnd.

La aplicación permite consultar noticias relacionadas con tecnología, educación, turismo y negocios mediante una interfaz moderna, organizada y adaptable a diferentes dispositivos.

## Objetivo

Desarrollar progresivamente una aplicación web funcional aplicando HTML, CSS y JavaScript, incorporando posteriormente fundamentos de Angular.

El proyecto se desarrolla en tres etapas:

- Entrega 1: diseño y maquetación de la aplicación.
- Entrega 2: prototipo funcional con HTML, CSS y JavaScript.
- Entrega 3: aplicación final con implementación básica en Angular.

## Estado actual

Actualmente el proyecto se encuentra en desarrollo para la Entrega 2.

Funcionalidades implementadas hasta el momento:

- Estructura inicial del proyecto.
- Diseño del Home basado en los mockups realizados en Figma.
- Navbar y footer reutilizables mediante componentes HTML.
- Estilos globales organizados por responsabilidad.
- Fuente de datos local mediante JSON.
- Servicio JavaScript para consultar noticias.
- Renderizado dinámico de noticias destacadas.
- Cards de noticias generadas a partir de datos dinámicos.
- Diseño responsive básico.

## Próximas funcionalidades

- Listado completo de noticias.
- Filtros por categoría.
- Buscador de noticias.
- Vista de detalle.
- Gestión de favoritos mediante localStorage.
- Formulario de contacto con validaciones.
- Gestión administrativa de noticias.
- Operaciones básicas CRUD.
- Preparación para migración a Angular.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- JSON
- LocalStorage
- Git
- GitHub

En la entrega final se incorporará:

- Angular
- Componentes
- Binding
- Routing
- Despliegue web

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
├── js/
│   ├── app.js
│   ├── services/
│   │   ├── noticias.service.js
│   │   └── storage.service.js
│   ├── components/
│   │   ├── navbar.js
│   │   ├── footer.js
│   │   └── news-card.js
│   └── pages/
│       ├── home.js
│       ├── noticias.js
│       ├── detalle.js
│       ├── favoritos.js
│       ├── contacto.js
│       └── admin.js
│
├── data/
│   └── noticias.json
│
└── assets/
    └── images/
```
