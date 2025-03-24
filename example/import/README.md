
# n8n + import

Este proyecto representa una estructura de recursos utilizados para el uso de **n8n** con **Docker** en el artículo:

* [Acelerando los desarrollos con contenedores : n8n + importación](https://www.enmilocalfunciona.io/acelerando-los-desarrollos-con-contenedores-n8n-importacion/): Artículo de soporte que ayudará a desplegar la herramienta n8n en local mediante Docker con importación de workflows y/o credenciales con diferentes automatismos.





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

### Docker Compose : IMPORT-docker-compose-01.yml

Configuración del fichero "IMPORT-docker-compose-01.yml"

```bash
# Use Case: Basic Importation
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
      - N8N_ENCRYPTION_KEY=SDi9RWzDZlQB3Gd+NnE5F0LL4ikmLpvV
      # *** Auth ***
      #- N8N_BASIC_AUTH=true
      #- N8N_BASIC_AUTH_USERNAME=test1
      #- N8N_BASIC_AUTH_PASSWORD=test1
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

2. Localiza la ruta : **/example/import/**

3. Ejecutar el siguiente comando

```bash
docker-compose -f IMPORT-docker-compose-01.yml up --build

ó

docker-compose -f IMPORT-docker-compose-01.yml up --build -d
```

Tambien se puede ejecutar poniendo la ruta completa del fichero de Docker Compose

4. Comprobar que la imagen ha sido creada

Verificar que parece como imagen Docker el nombre "n8n"

5. Comprobar que la aplicación ha sido desplegada correctamente

Verificar mediante el acceso a la aplicación mediante la URL : http://localhost:5678


#### Makefile de gestión del proyecto

Se puede instalar y ejecutar desde la herramienta gestora de Makefile desde el repositorio


Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>
2. Cambiar al variable de entorno del fichero .env principal

```bash
### --- DOCKER ---
...
DOCKER_COMPOSE_FILE_USED=./example/import/IMPORT-docker-compose-01.yml
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





### Docker Compose : IMPORT-docker-compose-02.yml

Configuración del fichero "IMPORT-docker-compose-02.yml"

```bash
# Use Case: Basic Installation + automatic import

# *** N8N shared ***
# Project URL: https://github.com/n8n-io/n8n
# Docs URL: https://docs.n8n.io/
x-n8n: &service-n8n
  image: n8nio/n8n:1.82.1
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
      - N8N_ENCRYPTION_KEY=SDi9RWzDZlQB3Gd+NnE5F0LL4ikmLpvV

services:

  # Project URL: https://github.com/n8n-io/n8n
  # Docs URL: https://docs.n8n.io/
  n8n:
    <<: *service-n8n
    container_name: "n8n"
    #container_name: "${PROJECT_NAME}n8n"
    restart: unless-stopped
    ports:
      - 5678:5678
    volumes:
      # *** General configuration ***
      - /var/run/docker.sock:/var/run/docker.sock:ro # Access to Docker on host machine
      # *** Volume configuration ***
      - ./example02-n8n-data/n8n:/home/node/.n8n
      - ./example02-n8n-data/other:/home/node/
      - ./backup:/backup

volumes:
  example02-n8n-data:

networks:
  demo:
    name: demo
    driver: bridge
```

Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>

2. Localiza la ruta : **/example/import/**

3. Ejecutar el siguiente comando

```bash
docker-compose -f IMPORT-docker-compose-02.yml up --build

ó

docker-compose -f IMPORT-docker-compose-02.yml up --build -d
```

Tambien se puede ejecutar poniendo la ruta completa del fichero de Docker Compose

4. Comprobar que la imagen ha sido creada

Verificar que parece como imagen Docker el nombre "n8n"

5. Comprobar que la aplicación ha sido desplegada correctamente

Verificar mediante el acceso a la aplicación mediante la URL : http://localhost:5678


#### Makefile de gestión del proyecto

Se puede instalar y ejecutar desde la herramienta gestora de Makefile desde el repositorio


Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>
2. Cambiar al variable de entorno del fichero .env principal

```bash
### --- DOCKER ---
...
DOCKER_COMPOSE_FILE_USED=./example/import/IMPORT-docker-compose-02.yml
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




### Docker Compose : IMPORT-docker-compose-03.yml

Configuración del fichero "IMPORT-docker-compose-03.yml"

```bash
# Use Case: Basic Installation + automatic import

# *** N8N shared ***
# Project URL: https://github.com/n8n-io/n8n
# Docs URL: https://docs.n8n.io/
x-n8n: &service-n8n
  image: n8nio/n8n:1.82.1
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
      - N8N_ENCRYPTION_KEY=SDi9RWzDZlQB3Gd+NnE5F0LL4ikmLpvV

services:

  n8n-import:
    <<: *service-n8n
    container_name: "n8n-import"
    #container_name: "${PROJECT_NAME}n8n-import"
    entrypoint: /bin/sh
    command:
      - "-c"
      - "n8n import:workflow --separate --input=/backup/workflows/ && n8n import:credentials --separate --input=/backup/credentials"
    volumes:
      # *** Volume configuration ***
      - ./example03-n8n-data/n8n:/home/node/.n8n
      - ./backup:/backup

  # Project URL: https://github.com/n8n-io/n8n
  # Docs URL: https://docs.n8n.io/
  n8n:
    <<: *service-n8n
    container_name: "n8n"
    #container_name: "${PROJECT_NAME}n8n"
    restart: unless-stopped
    ports:
      - 5678:5678
    volumes:
      # *** General configuration ***
      - /var/run/docker.sock:/var/run/docker.sock:ro # Access to Docker on host machine
      # *** Volume configuration ***
      - ./example03-n8n-data/n8n:/home/node/.n8n
      - ./example03-n8n-data/other:/home/node/
    depends_on:
      n8n-import:
        condition: service_completed_successfully

volumes:
  example03-n8n-data:

networks:
  demo:
    name: demo
    driver: bridge
```

Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>

2. Localiza la ruta : **/example/import/**

3. Ejecutar el siguiente comando

```bash
docker-compose -f IMPORT-docker-compose-03.yml up --build

ó

docker-compose -f IMPORT-docker-compose-03.yml up --build -d
```

Tambien se puede ejecutar poniendo la ruta completa del fichero de Docker Compose

4. Comprobar que la imagen ha sido creada

Verificar que parece como imagen Docker el nombre "n8n"

5. Comprobar que la aplicación ha sido desplegada correctamente

Verificar mediante el acceso a la aplicación mediante la URL : http://localhost:5678


#### Makefile de gestión del proyecto

Se puede instalar y ejecutar desde la herramienta gestora de Makefile desde el repositorio


Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>
2. Cambiar al variable de entorno del fichero .env principal

```bash
### --- DOCKER ---
...
DOCKER_COMPOSE_FILE_USED=./example/import/IMPORT-docker-compose-03.yml
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
