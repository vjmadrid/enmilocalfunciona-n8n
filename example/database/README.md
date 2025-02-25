
# n8n database

Este proyecto representa una estructura de recursos utilizados para el uso de **n8n** con **Docker** en el artículo:

* [Primeros pasos con n8n (Parte 2) : Uso de Base de Datos](https://www.enmilocalfunciona.io/primeros-pasos-con-n8n-parte-2-uso-de-base-de-datos/): Artículo de la herramienta n8n donde se explicarán las diferentes configuraciones de base de datos que se pueden tener y su integración





## Stack Tecnológico

* [Docker](https://www.docker.com/) - Tecnología de Contenedores/Containers
* [Docker Hub](https://hub.docker.com/) - Repositorio de Docker Público
* [Postgresql](https://www.postgresql.org/) - Base de Datos relacional (Version 17)
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

Configuración del fichero "docker-compose.yaml"

```bash

```

Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>

2. Localiza la ruta : **/example/basic/**

3. Ejecutar el siguiente comando

```bash
docker-compose -f EXAMPLE-docker-compose-01.yml up --build

ó

docker-compose -f EXAMPLE-docker-compose-01.yml up --build -d
```

Tambien se puede ejecutar poniendo la ruta completa del fichero de Docker Compose

4. Comprobar que la imagen ha sido creada

Verificar que parece como imagen Docker el nombre "n8n"

5. Comprobar que la aplicación ha sido desplegada correctamente

Verificar mediante el acceso a la aplicación mediante la URL : http://localhost:5678


### Makefile de gestión del proyecto

Se puede instalar y ejecutar desde la herramienta montada


Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>
2. Cambiar al variable de entorno del fichero .env principal

```bash
### --- DOCKER ---
...
DOCKER_COMPOSE_FILE_USED=./example/EXAMPLE-docker-compose-01.yml
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
* Establecer el "name": n8ndb
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
