# NexoNews

Aplicación web de noticias desarrollada con Angular, Node.js, Express y PostgreSQL. El proyecto incorpora contenedorización con Docker Compose y un proceso de integración continua mediante Jenkins.

## 1. Objetivo del proyecto

Implementar y verificar una arquitectura de aplicación web con frontend, API y base de datos independientes, utilizando contenedores Docker y automatizando la construcción y las pruebas de integración.

El proyecto se desarrolla como parte de la asignatura **Integración Continua**.

## 2. Tecnologías

| Tecnología        | Función                                   |
| ----------------- | ----------------------------------------- |
| Angular           | Interfaz de usuario                       |
| Nginx             | Servidor web y proxy inverso              |
| Node.js y Express | API REST                                  |
| PostgreSQL        | Almacenamiento de noticias                |
| Docker            | Construcción y ejecución de contenedores  |
| Docker Compose    | Orquestación de servicios                 |
| Jenkins           | Automatización de integración continua    |
| Git y GitHub      | Control de versiones y repositorio remoto |

## 3. Arquitectura

NexoNews utiliza tres servicios definidos en `compose.yaml`:

| Servicio | Tecnología        | Responsabilidad                                        |
| -------- | ----------------- | ------------------------------------------------------ |
| `web`    | Angular + Nginx   | Servir el frontend y redirigir las solicitudes `/api/` |
| `api`    | Node.js + Express | Gestionar solicitudes HTTP y consultar PostgreSQL      |
| `db`     | PostgreSQL 17     | Almacenar las noticias                                 |

La comunicación interna utiliza nombres de servicio de Docker Compose:

```text
Navegador
    |
    v
localhost:8080
    |
    v
web (Angular + Nginx)
    |
    | /api/ -> http://api:3000
    v
api (Node.js + Express)
    |
    | DB_HOST=db
    v
db (PostgreSQL)
```

Los servicios se comunican mediante la red `nexonews-network`.

**Estado de integración del frontend:** la interfaz Angular todavía utiliza datos JSON o `localStorage` para algunas funcionalidades de noticias. Los endpoints de Express y su persistencia en PostgreSQL se han implementado y probado de forma independiente.

## 4. Estructura principal

```text
nexonews/
├── angular/
│   ├── Dockerfile
│   └── nginx.conf
├── backend/
│   ├── Dockerfile
│   └── server.js
├── jenkins/
│   ├── Dockerfile
│   ├── compose.yaml
│   └── test-integration.js
├── .github/
│   └── workflows/
│       └── docker-ci.yml
├── .env.example
├── compose.yaml
├── Jenkinsfile
└── README.md
```

La carpeta `angular` contiene el frontend. La carpeta `backend` contiene la API. La carpeta `jenkins` contiene la configuración del servidor Jenkins y las pruebas automatizadas.

## 5. Ejecución local

### Requisitos

- Git.
- Docker Desktop o una instalación compatible de Docker Engine.
- Docker Compose v2.
- Puertos locales `8080` y `5433` disponibles.

### Configurar variables de entorno

Copiar el archivo de ejemplo:

```bash
cp .env.example .env
```

Configurar los valores correspondientes:

```dotenv
POSTGRES_DB=nexonews
POSTGRES_USER=nexonews_app
POSTGRES_PASSWORD=UNA_CONTRASENA_LOCAL_SEGURA
```

El archivo `.env` está excluido del repositorio mediante `.gitignore`.

### Iniciar servicios

Desde la raíz del repositorio:

```bash
docker compose up -d --build
```

Consultar el estado:

```bash
docker compose ps
```

### Direcciones locales

| Recurso          | URL o conexión                     |
| ---------------- | ---------------------------------- |
| Frontend Angular | http://localhost:8080              |
| Estado de la API | http://localhost:8080/api/health   |
| Noticias         | http://localhost:8080/api/noticias |
| PostgreSQL       | localhost:5433                     |

La base de datos se almacena en el volumen `postgres_data`.

### Preparación de la base de datos

Para utilizar los endpoints de noticias, es necesario que exista la tabla `noticias`. La definición de la tabla utilizada por las pruebas de integración está documentada en el `Jenkinsfile`.

El arranque local mediante Docker Compose no crea automáticamente esta tabla. Debe inicializarse previamente en una base de datos nueva.

### Detener servicios

```bash
docker compose down
```

Este comando detiene y elimina los contenedores y la red, pero conserva el volumen de PostgreSQL.

**Precaución:** `docker compose down -v` también elimina los volúmenes y puede borrar la información almacenada.

## 6. API REST

### Comprobar disponibilidad

```http
GET /api/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "servicio": "nexonews-api"
}
```

### Consultar noticias

```http
GET /api/noticias
```

Devuelve las noticias almacenadas en PostgreSQL.

### Crear noticia

```http
POST /api/noticias
Content-Type: application/json
```

Ejemplo:

```json
{
  "titulo": "Noticia de ejemplo",
  "descripcion": "Contenido de prueba",
  "categoria": "Tecnologia",
  "autor": "NexoNews"
}
```

Cuando la creación es exitosa, la API responde con el código HTTP `201`.

Actualmente están implementadas las operaciones de consulta y creación. No se presenta la API como un CRUD completo, porque todavía faltan operaciones de actualización y eliminación.

## 7. Integración continua con Jenkins

NexoNews utiliza Jenkins para automatizar la construcción de imágenes y las pruebas de integración.

### Infraestructura

Jenkins se ejecuta mediante `jenkins/compose.yaml`, que define:

- Un contenedor Jenkins con almacenamiento persistente.
- Un motor Docker-in-Docker para construir y ejecutar contenedores de prueba.
- Redes Docker para comunicar ambos servicios.
- Acceso local a Jenkins mediante `http://localhost:8081`.

Para iniciar Jenkins desde la raíz del proyecto:

```bash
docker compose -f jenkins/compose.yaml up -d --build
```

Para consultar su estado:

```bash
docker compose -f jenkins/compose.yaml ps
```

La comunicación con el motor Docker-in-Docker utiliza `docker
