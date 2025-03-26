
# n8n integration

Este proyecto representa una estructura de recursos utilizados para el uso de **n8n** con **Docker** en el artículo:

* [Acelerando los desarrollos con contenedores : n8n + integración](https://www.enmilocalfunciona.io/acelerando-los-desarrollos-con-contenedores-n8n-integracion/): Artículo de soporte que ayudará a desplegar la herramienta n8n en local junto con otras herramientas mediante Docker para dar funcionalidad a un determinado workflow





## Stack Tecnológico

* [Docker](https://www.docker.com/) - Tecnología de Contenedores/Containers
* [Docker Hub](https://hub.docker.com/) - Repositorio de Docker Público
* [n8n](https://n8n.io/) - Herramienta de automatización de procesos + Agentes IA
* [MySQL](https://www.mysql.com/) - Base de datos relacional (9.2.0)
* [DBeaver Community](https://dbeaver.io/) - Cliente de base de datos (25.0.1)
* Microservicio Python 3.11 montado con Docker, FastApi, Unicorn y Pydantic

Dependencias con Proyectos de Arquitectura

N/A

Dependencias con Terceros

N/A





## Prerrequisitos

Define que elementos son necesarios para instalar el software

* Docker instalado (19+)





## Instalación

### Docker Compose : INTEGRATION-docker-compose-01.yml

Configuración del fichero "INTEGRATION-docker-compose-01.yml"

```bash
# Use Case: Basic Integration
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
      - N8N_ENCRYPTION_KEY=${ENCRYPTION_KEY}
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
      - ./integration01-n8n-data/n8n:/home/node/.n8n
      - ./integration01-n8n-data/other:/home/node/

  # Project URL: https://github.com/mysql
  # Docs URL: https://dev.mysql.com/doc/
  mysql:
    image: mysql:9.2.0
    container_name: "mysql"
    #container_name: "${PROJECT_NAME}mysql"
    restart: always
    networks: ['demo']
    environment:
      - TZ=Europe/Madrid
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=pizzeriadb
      - MYSQL_USER=test1
      - MYSQL_PASSWORD=test1
    #command: --general-log=1 --general-log-file=/var/log/mysql/general.log --log-error=/var/log/mysql/error.log --slow-query-log=1 --slow-query-log-file=/var/log/mysql/slow.log --log-queries-not-using-indexes=1 --log-bin=/var/log/mysql/mysql-bin.log --binlog-format=ROW --log-output=FILE --verbose
    ports:
      - 3306:3306
    volumes:
      # *** MySQL configuration ***
      - ./config/mysql:/docker-entrypoint-initdb.d
      # *** Volume configuration ***
      - ./mysql-data/data:/var/lib/mysql
      - ./mysql-data/config:/etc/mysql/conf.d
      #- ./mysql-data/logs:/var/log/mysql

  delivery-api:
    build:
      context: ./delivery-api
      dockerfile: Dockerfile
    container_name: "delivery-api"
    #container_name: "${PROJECT_NAME}delivery-api"
    restart: always
    networks: ['demo']
    ports:
      - 3000:80

volumes:
  integration01-n8n-data:
  mysql-data:

networks:
  demo:
    name: demo
    driver: bridge

```

Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>

2. Localiza la ruta : **/example/integration/**

3. Ejecutar el siguiente comando

```bash
docker-compose -f INTEGRATION-docker-compose-01.yml up --build

ó

docker-compose -f INTEGRATION-docker-compose-01.yml up --build -d
```

Tambien se puede ejecutar poniendo la ruta completa del fichero de Docker Compose

4. Comprobar que las imágenes ha sido creadas

Verificar que parece como imagen Docker: "n8n", "mysql" y "delivery-api"

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
DOCKER_COMPOSE_FILE_USED=./example/integration/INTEGRATION-docker-compose-01.yml
...
```

3. Ejecutar el siguiente comando

```bash
### --- DOCKER ---
make up
```

4. Comprobar que las imágenes ha sido creadas

Verificar que parece como imagen Docker: "n8n", "mysql" y "delivery-api"

5. Comprobar que la aplicación ha sido desplegada correctamente

Verificar mediante el acceso a la aplicación mediante la URL : http://localhost:5678

### Docker Compose : EXAMPLE-docker-compose-02.yml

Se trata de una configuración igual al ejemplo EXAMPLE-docker-compose-01.yml pero utilizando un fichero de variables de entorno .env





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
