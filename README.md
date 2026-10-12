# NexoNews

NexoNews es una aplicación web tipo periódico digital desarrollada como proyecto académico para la asignatura FrontEnd.

La aplicación permite consultar noticias de tecnología, educación, turismo y negocios, visualizar el contenido completo de cada noticia, realizar búsquedas, filtrar por categoría, guardar favoritos y administrar noticias mediante un módulo de gestión.

## Objetivo

Desarrollar una aplicación web funcional aplicando conceptos de desarrollo FrontEnd y fundamentos de Angular, incluyendo componentes, routing, servicios, binding, formularios, persistencia local y organización modular del código.

El proyecto se desarrolló progresivamente en tres etapas:

- Entrega 1: diseño y maquetación en Figma.
- Entrega 2: prototipo funcional con HTML, CSS y JavaScript.
- Entrega 3: migración e implementación final con Angular y despliegue web.

## Estado del proyecto

Actualmente NexoNews corresponde a la **Entrega 3** y cuenta con una aplicación funcional desarrollada en Angular.

## Funcionalidades implementadas

- Página principal basada en los mockups realizados en Figma.
- Navbar y footer implementados como componentes reutilizables.
- Carga inicial de noticias desde un archivo JSON.
- Renderizado dinámico de noticias.
- Listado completo de noticias.
- Filtros por categoría.
- Buscador de noticias.
- Vista de detalle mediante parámetros dinámicos de Angular Router.
- Sistema de favoritos con persistencia mediante `localStorage`.
- Persistencia de favoritos después de recargar la aplicación.
- Formulario de contacto con validaciones mediante Reactive Forms.
- Inicio de sesión administrativo simulado.
- Interfaz diferenciada para usuario y administrador.
- Creación de noticias.
- Edición de noticias.
- Eliminación de noticias.
- Persistencia del CRUD mediante `localStorage`.
- Protección básica de rutas administrativas mediante Route Guard.
- Uso de Signals para el manejo reactivo de estado.
- Diseño responsive.
- Build de producción generado correctamente con Angular.

## Tecnologías

- Angular
- TypeScript
- HTML5
- CSS3
- Angular Router
- Reactive Forms
- Angular Signals
- HttpClient
- RxJS
- JSON
- LocalStorage
- Git
- GitHub
- Vercel

## Arquitectura general

La aplicación está organizada mediante componentes, páginas, servicios, modelos y guards.

```text
nexonews/
│
├── angular/
│   │
│   ├── public/
│   │   └── data/
│   │       └── noticias.json
│   │
│   ├── src/
│   │   │
│   │   ├── app/
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── navbar/
│   │   │   │   ├── footer/
│   │   │   │   └── news-card/
│   │   │   │
│   │   │   ├── guards/
│   │   │   │   └── admin-guard.ts
│   │   │   │
│   │   │   ├── models/
│   │   │   │   └── noticia.model.ts
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── home/
│   │   │   │   ├── noticias/
│   │   │   │   ├── detalle/
│   │   │   │   ├── favoritos/
│   │   │   │   ├── contacto/
│   │   │   │   ├── admin/
│   │   │   │   └── noticia-form/
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── noticias.ts
│   │   │   │   └── storage.ts
│   │   │   │
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   ├── app.html
│   │   │   └── app.ts
│   │   │
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   │
│   ├── angular.json
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── tsconfig.spec.json
│
└── README.md
```
