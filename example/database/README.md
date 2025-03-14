
# n8n database

Este proyecto representa una estructura de recursos utilizados para el uso de **n8n** con **Docker** en el artículo:

* [Primeros pasos con n8n (Parte 2) : Uso de Base de Datos](https://www.enmilocalfunciona.io/primeros-pasos-con-n8n-parte-2-uso-de-base-de-datos/): Artículo de la herramienta n8n donde se explicarán las diferentes configuraciones de base de datos que se pueden tener y su integración





## Stack Tecnológico

* [Docker](https://www.docker.com/) - Tecnología de Contenedores/Containers
* [Docker Hub](https://hub.docker.com/) - Repositorio de Docker Público
* [Postgresql](https://www.postgresql.org/) - Base de Datos relacional (Version 16)
* [n8n](https://n8n.io/) - Herramienta de automatización de procesos + Agentes IA


Dependencias con Proyectos de Arquitectura

N/A

Dependencias con Terceros

N/A





## Prerrequisitos

Define que elementos son necesarios para instalar el software

* Docker instalado (19+)





## Instalación

### Docker Compose

Configuración del fichero "DB-docker-compose-01.yml"

```bash
# Use Case: Database Integration
services:

  # Project URL: https://github.com/postgres/postgres
  # Docs URL: https://www.postgresql.org/docs/16/index.html
  postgres:
    image: postgres:16
    container_name: "postgres"
    restart: always
    networks: ['demo']
    environment:
      # *** Settings ***
      - POSTGRES_USER=${DB_POSTGRES_USER}
      - POSTGRES_PASSWORD=${DB_POSTGRES_PASSWORD}
      - POSTGRES_DB=${DB_POSTGRES_DB}
      - POSTGRES_NON_ROOT_USER=${DB_POSTGRES_NON_ROOT_USER}
      - POSTGRES_NON_ROOT_PASSWORD=${DB_POSTGRES_NON_ROOT_PASSWORD}
    ports:
      - 5432:5432
    volumes:
      # *** Database Initializer ***
      - ./init-data.sh:/docker-entrypoint-initdb.d/init-data.sh
      # *** Volume configuration ***
      - ./db-data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -h localhost -U ${DB_POSTGRES_NON_ROOT_USER} -d ${DB_POSTGRES_DB}']
      interval: 5s
      timeout: 5s
      retries: 10


  # Project URL: https://github.com/pgadmin-org/pgadmin4
  # Docs URL: https://www.pgadmin.org/docs/pgadmin4/8.14/index.html
  pgadmin:
    image: dpage/pgadmin4:9.0.0
    #image: dpage/pgadmin4:8.14.0
    container_name: "pgadmin"
    restart: always
    networks: ['demo']
    environment:
      # *** Settings ***
      - PGADMIN_LISTEN_PORT=80
      # *** Users ***
      - PGADMIN_DEFAULT_EMAIL=admin@acme.com
      - PGADMIN_DEFAULT_PASSWORD=admin
    depends_on:
      - postgres
    ports:
      - 5050:80
    volumes:
      # *** Volume configuration ***
      - ./pgadmin-data:/var/lib/pgadmin


  # Project URL: https://github.com/n8n-io/n8n
  # Docs URL: https://docs.n8n.io/
  n8n:
    image: n8nio/n8n:1.82.1
    container_name: "n8n"
    #container_name: "${PROJECT_NAME}n8n"
    restart: always
    networks: ['demo']
    environment:
      # *** General ***
      - GENERIC_TIMEZONE=Europe/Madrid
      - TZ=Europe/Madrid
      - NODE_ENV=production
      # *** Settings ***
      - N8N_SECURE_COOKIE=false
      - N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true
      # *** Database ***
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=${DB_POSTGRES_DB}
      - DB_POSTGRESDB_USER=${DB_POSTGRES_NON_ROOT_USER}
      - DB_POSTGRESDB_PASSWORD=${DB_POSTGRES_NON_ROOT_PASSWORD}
    ports:
      - 5678:5678
    links:
      - postgres
    volumes:
      # *** General configuration ***
      - /var/run/docker.sock:/var/run/docker.sock:ro # Access to Docker on host machine
      # *** Volume configuration ***
      - ./database01-n8n-data/n8n:/home/node/.n8n
      - ./database01-n8n-data/other:/home/node/
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  db-data:
  pgadmin-data:
  database01-n8n-data:

networks:
  demo:
    name: demo
    driver: bridge
```

Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>

2. Localiza la ruta : **/example/database/**

3. Ejecutar el siguiente comando

```bash
docker-compose -f DB-docker-compose-01.yml up --build

ó

docker-compose -f DB-docker-compose-01.yml up --build -d
```

Tambien se puede ejecutar poniendo la ruta completa del fichero de Docker Compose

4. Comprobar que las imagenes ha sido creadas

Verificar que parece como imagen Docker: "n8n", "postgres" y "pgadmin"

5. Comprobar que la aplicación "n8n" ha sido desplegada correctamente

Verificar mediante el acceso a la aplicación mediante la URL : http://localhost:5678


### Makefile de gestión del proyecto

Se puede instalar y ejecutar desde la herramienta montada


Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>
2. Cambiar al variable de entorno del fichero .env principal

```bash
### --- DOCKER ---
...
DOCKER_COMPOSE_FILE_USED=./example/DB-docker-compose-01.yml.yml
...
```

3. Ejecutar el siguiente comando

```bash
### --- DOCKER ---
make up
```

4. Comprobar que la imagen ha sido creada

Verificar que parece como imagen Docker el nombre "n8n"

5. Comprobar que la aplicación ha sido desplegada correctamente

Verificar mediante el acceso a la aplicación mediante la URL : http://localhost:5678





## Pruebas

N/A





## Despliegue

N/A





## Uso

### Configuración PGAdmin

#### Detalle

La configuración de la aplicación se encuentra disponible en la sección de las variables de entorno del contenedor.

[Documentación](https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html)

Estas varibles de entorno son las propias de la herramienta y estan referenciadas con otras variables de entorno ubicadas en el fichero ".env"

Se identificarán por el prefijo "PGADMIN_"

#### Particularidades

Principalmente hará uso de: las credenciales de acceso

#### Persistencia

Monta un volumen local para almacenar los datos persistentes: **pgadmin-data**

#### Agregar un servidor Postgres

Para acceder al esquema de n8n

Pasos a seguir:

* Verificar que el contenedor de Postgres se encuentra disponible
* Verificar que el contenedor de PGAdmin se encuentra disponible
* Acceder a la URL de la herramienta PGAdmin: http://localhost:5050
* Iniciar sesión con las credenciales por defecto (email: admin@acme.com y password: admin)
* Verificar que se ha cargado la home de la aplicación
* Pulsar sobre el botón "Add New Server"
* Verificar que se ha cargado la modal de creación
* Establecer el "name": postgres
* Acceder a la pestaña de "Connection"
* Rellenar los siguientes campos
  * Hostname (nombre del contenedor): n8ndb
  * Username: n8n
  * Password: n8n
* Verificar que se puede acceder desde el menú de servidores





## Versionado

**Nota :** [SemVer](http://semver.org/) es usado para el versionado.





## Autores

* **Víctor Madrid**
