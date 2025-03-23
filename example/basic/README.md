
# n8n basic

Este proyecto representa una estructura de recursos utilizados para el uso de **n8n** con **Docker** en el artículo:

* [Acelerando los desarrollos con contenedores : n8n](https://www.enmilocalfunciona.io/acelerando-los-desarrollos-con-contenedores-n8n/): Artículo de soporte que ayudará a desplegar la herramienta en local mediante Docker y que servirá de base para la realización de los siguientes artículos





## Stack Tecnológico

* [Docker](https://www.docker.com/) - Tecnología de Contenedores/Containers
* [Docker Hub](https://hub.docker.com/) - Repositorio de Docker Público
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
# Use Case: Basic Installation
services:
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
      - N8N_RUNNERS_ENABLED=true
      #- N8N_ENCRYPTION_KEY=SDi9RWzDZlQB3Gd+NnE5F0LL4ikmLpvV
      # *** Auth ***
      #- N8N_BASIC_AUTH=true
      #- N8N_BASIC_AUTH_USERNAME=test1
      #- N8N_BASIC_AUTH_PASSWORD=test1
      # *** Logging ***
      #- N8N_LOG_LEVEL=debug
      #- N8N_LOG_OUTPUT=console,file
      #- N8N_LOG_FILE_LOCATION=/home/node/.n8n/logs/n8n.log
      #- N8N_LOG_FILE_MAXSIZE=50
      #- N8N_LOG_FILE_MAXCOUNT=60
    ports:
      - 5678:5678
    volumes:
      # *** General configuration ***
      - /var/run/docker.sock:/var/run/docker.sock:ro # Access to Docker on host machine
      # *** Volume configuration ***
      - ./example01-n8n-data/n8n:/home/node/.n8n
      - ./example01-n8n-data/other:/home/node/

volumes:
  example01-n8n-data:

networks:
  demo:
    name: demo
    driver: bridge
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

Se puede instalar y ejecutar desde la herramienta gestora de Makefile desde el repositorio


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
