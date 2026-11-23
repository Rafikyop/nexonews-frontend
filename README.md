## Integración Continua — Entrega 1: Docker

### Objetivo

Adaptar NexoNews para ejecutarse mediante contenedores Docker, utilizando una arquitectura de frontend y backend independientes que se comuniquen a través de una red interna.

### Tecnologías utilizadas

- **Angular:** aplicación frontend.
- **Nginx:** servidor web y proxy inverso.
- **Node.js y Express:** API HTTP del backend.
- **Docker:** construcción y ejecución de contenedores.
- **Docker Compose:** configuración y ejecución conjunta de los servicios.
- **Git y GitHub:** versionamiento del código fuente.

### Arquitectura

El proyecto dispone de dos servicios:

| Servicio | Tecnología        | Responsabilidad                                      |
| -------- | ----------------- | ---------------------------------------------------- |
| `web`    | Angular + Nginx   | Servir la aplicación y redirigir solicitudes `/api/` |
| `api`    | Node.js + Express | Proporcionar el endpoint de comprobación de salud    |

Docker Compose crea una red interna que permite que Nginx acceda al backend mediante `http://api:3000`.

### Estructura de contenedores

```text
nexonews/
├── angular/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── nginx.conf
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── compose.yaml
└── README.md
```

### Ejecución local

**Requisitos:** Docker Desktop con Docker Compose habilitado.

Desde la carpeta raíz del proyecto:

```bash
docker compose up --build -d
```

Consultar el estado de los contenedores:

```bash
docker compose ps
```

Detener los servicios:

```bash
docker compose down
```

### Verificación

**Aplicación frontend:**

`http://localhost:8080`

**Endpoint de salud de la API:**

`http://localhost:8080/api/health`

Respuesta esperada:

```json
{
  "status": "ok",
  "servicio": "nexonews-api"
}
```

La prueba del endpoint se realizó desde el navegador a través del puerto publicado por Nginx, demostrando la comunicación HTTP desde el contenedor web hacia el contenedor API.

### Estado de desarrollo

La primera integración con Docker se ha probado localmente.

Actualmente, las noticias siguen cargándose desde el archivo JSON de Angular o desde `localStorage`. El backend Express todavía no implementa los endpoints CRUD de noticias.

### Próximas mejoras

- Integrar PostgreSQL como base de datos persistente.
- Implementar los endpoints CRUD de noticias en Express.
- Conectar Angular con la API REST.
- Incorporar autenticación y autorización en el backend.
- Agregar pruebas automatizadas y preparar la integración con Jenkins.
