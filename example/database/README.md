
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

N/A



## Versionado

**Nota :** [SemVer](http://semver.org/) es usado para el versionado.





## Autores

* **Víctor Madrid**
