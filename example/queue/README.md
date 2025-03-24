
# n8n modo queue

Este proyecto representa una estructura de recursos utilizados para el uso de **n8n** con **Docker** en el artículo:

* [Primeros pasos con n8n (Parte 5) : Modo Queue](https://www.enmilocalfunciona.io/primeros-pasos-con-n8n-parte-5-modo-queue/): Artículo de la herramienta n8n donde se explicarán las diferentes configuraciones necesarias para disponer de un n8n funcionando en modo distribuido y escalable.






## Stack Tecnológico

* [Docker](https://www.docker.com/) - Tecnología de Contenedores/Containers
* [Docker Hub](https://hub.docker.com/) - Repositorio de Docker Público
* [n8n](https://n8n.io/) - Herramienta de automatización de procesos + Agentes IA
* [PostgreSQL](https://www.postgresql.org/) - Base de Datos relacional (Versión 16)
* [Redis](https://redis.io/) - Cola de mensajes / Caché / Estructura de Datos de alto rendimiento (Versión 7)


Dependencias con Proyectos de Arquitectura

N/A

Dependencias con Terceros

N/A





## Prerrequisitos

Define que elementos son necesarios para instalar el software

* Docker instalado (19+)





## Instalación

### Docker Compose : QUEUE-docker-compose-prepare-redis.yml

Configuración del fichero "QUEUE-docker-compose-prepare-redis.yml"

```bash
# Use Case: Prepare Redis
services:

  # Project URL: https://github.com/redis/redis
  # Docs URL: https://redis.io/docs/latest/
  redis:
    #image: redis:7.2.7-alpine
    image: redis:7.4.2
    container_name: "redis"
    restart: always
    networks: ['demo']
    ports:
      - 6379:6379
    volumes:
      # *** Volume configuration ***
      - ./example-redis-data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 5s
      timeout: 5s
      retries: 10

  # Project URL: https://github.com/RedisInsight/RedisInsight
  # Docs URL: https://redis.io/docs/latest/develop/tools/insight/
  redis-insight:
    image: redis/redisinsight:2.66.0
    container_name: "redis-insight"
    restart: always
    networks: ['demo']
    ports:
      - 5540:5540
    volumes:
      - ./redis-insight-data:/data

volumes:
  example-redis-data:
  redis-insight-data:

networks:
  demo:
    name: demo
    driver: bridge
```

Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>

2. Localiza la ruta : **/example/queue/**

3. Ejecutar el siguiente comando

```bash
docker-compose -f QUEUE-docker-compose-prepare-redis.yml up --build

ó

docker-compose -f QUEUE-docker-compose-prepare-redis.yml up --build -d
```

Tambien se puede ejecutar poniendo la ruta completa del fichero de Docker Compose

4. Comprobar que las imágenes han sido creadas

Verificar que aparecen como imágenes Docker: "redis" y "redis-insight"


5. Comprobar que la aplicación ha sido desplegada correctamente

Verificar mediante el acceso a la aplicación mediante la URL : http://localhost:5540


#### Makefile de gestión del proyecto

Se puede instalar y ejecutar desde la herramienta gestora de Makefile desde el repositorio


Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>
2. Cambiar al variable de entorno del fichero .env principal

```bash
### --- DOCKER ---
...
DOCKER_COMPOSE_FILE_USED=./example/queue/QUEUE-docker-compose-prepare-redis.yml
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





### Docker Compose : QUEUE-docker-compose-01.yml

Configuración del fichero "QUEUE-docker-compose-01.yml"

```bash
# Use Case: Basic Queue Mode
services:

  # Project URL: https://github.com/postgres/postgres
  # Docs URL: https://www.postgresql.org/docs/16/index.html
  n8n-postgres:
    image: postgres:16
    container_name: "n8n-postgres"
    restart: always
    networks: ['demo']
    environment:
      # *** Settings ***
      - POSTGRES_USER=${DB_POSTGRES_USER}
      - POSTGRES_PASSWORD=${DB_POSTGRES_PASSWORD}
      - POSTGRES_DB=${DB_POSTGRES_DB}
      - POSTGRES_NON_ROOT_USER=${DB_POSTGRES_NON_ROOT_USER}
      - POSTGRES_NON_ROOT_PASSWORD=${DB_POSTGRES_NON_ROOT_PASSWORD}
      # *** Tunnings  ***
      # High performance and scalability
      # IMPORTANT: Depends on the host machine
      #- POSTGRES_WORK_MEM=64MB
      #- POSTGRES_SHARED_BUFFERS=2GB
      #- POSTGRES_MAINTENANCE_WORK_MEM=1GB
      #- POSTGRES_EFFECTIVE_CACHE_SIZE=2GB
      #- POSTGRES_MAX_PARALLEL_WORKERS=10
      #- POSTGRES_MAX_PARALLEL_WORKERS_PER_GATHER=5
    ports:
      - 5432:5432
    volumes:
      # *** Database Initializer ***
      - ./init-data.sh:/docker-entrypoint-initdb.d/init-data.sh
      # *** Volume configuration ***
      - ./postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -h localhost -U ${DB_POSTGRES_NON_ROOT_USER} -d ${DB_POSTGRES_DB}']
      interval: 5s
      timeout: 5s
      retries: 10

  # Project URL: https://github.com/redis/redis
  # Docs URL: https://redis.io/docs/latest/
  n8n-redis:
    #image: redis:7.2.7-alpine
    image: redis:7.4.2
    container_name: "n8n-redis"
    restart: always
    networks: ['demo']
    ports:
      - 6379:6379
    volumes:
      # *** Volume configuration ***
      - ./redis-data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 5s
      timeout: 5s
      retries: 10


  # Project URL: https://github.com/n8n-io/n8n
  # Docs URL: https://docs.n8n.io/
  n8n-main:
    image: n8nio/n8n:1.82.1
    container_name: "n8n-main"
    #container_name: "${PROJECT_NAME}n8n-main"
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
      # *** Database ***
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=n8n-postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=${DB_POSTGRES_DB}
      - DB_POSTGRESDB_USER=${DB_POSTGRES_NON_ROOT_USER}
      - DB_POSTGRESDB_PASSWORD=${DB_POSTGRES_NON_ROOT_PASSWORD}
      # *** Queue Mode ***
      - EXECUTIONS_MODE=queue
      - EXECUTIONS_QUEUE=redis
      - QUEUE_BULL_REDIS_HOST=n8n-redis
      - QUEUE_BULL_REDIS_PORT=6379
      - QUEUE_HEALTH_CHECK_ACTIVE=true
      # *** Executions ***
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=336
      - EXECUTIONS_DATA_PRUNE_MAX_COUNT=10000
      - N8N_CONCURRENCY_PRODUCTION_LIMIT=10
      - N8N_WORKER_CONCURRENCY=10
    ports:
      - 5678:5678
    links:
      - n8n-postgres
    volumes:
      # *** General configuration ***
      - /var/run/docker.sock:/var/run/docker.sock:ro # Access to Docker on host machine
      # *** Volume configuration ***
      - ./queue01-n8n-data/n8n:/home/node/.n8n
      - ./queue01-n8n-data/other:/home/node/
    depends_on:
      - n8n-postgres
      - n8n-redis

  n8n-worker:
    image: n8nio/n8n:1.82.1
    restart: always
    networks: ['demo']
    command: ["worker"]
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
      # *** Database ***
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=n8n-postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=${DB_POSTGRES_DB}
      - DB_POSTGRESDB_USER=${DB_POSTGRES_NON_ROOT_USER}
      - DB_POSTGRESDB_PASSWORD=${DB_POSTGRES_NON_ROOT_PASSWORD}
      # *** Queue Mode ***
      - EXECUTIONS_MODE=queue
      - EXECUTIONS_QUEUE=redis
      - QUEUE_BULL_REDIS_HOST=n8n-redis
      - QUEUE_BULL_REDIS_PORT=6379
      - QUEUE_HEALTH_CHECK_ACTIVE=true
      - OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true
      # *** Executions ***
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=336
      - EXECUTIONS_DATA_PRUNE_MAX_COUNT=10000
      - N8N_CONCURRENCY_PRODUCTION_LIMIT=10
      - N8N_WORKER_CONCURRENCY=10
    depends_on:
      - n8n-main
    deploy:
      replicas: 3

volumes:
  postgres-data:
  redis-data:
  queue01-n8n-data:

networks:
  demo:
    name: demo
    driver: bridge
```

Pasos a seguir

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>

2. Localiza la ruta : **/example/queue/**

3. Ejecutar el siguiente comando

```bash
docker-compose -f QUEUE-docker-compose-01.yml up --build

ó

docker-compose -f QUEUE-docker-compose-01.yml up --build -d
```

Tambien se puede ejecutar poniendo la ruta completa del fichero de Docker Compose

4. Comprobar que las imágenes han sido creadas

Verificar que aparecen como imágenes Docker: "n8n-postgres", "n8n-redis", "n8n-main" y "n8n-worker"

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
DOCKER_COMPOSE_FILE_USED=./example/queue/QUEUE-docker-compose-01.yml
...
```

3. Ejecutar el siguiente comando

```bash
### --- DOCKER ---
make up
```

4. Comprobar que las imágenes han sido creadas

Verificar que aparecen como imágenes Docker: "n8n-postgres", "n8n-redis", "n8n-main" y "n8n-worker"

5. Comprobar que la aplicación ha sido desplegada correctamente

Verificar mediante el acceso a la aplicación mediante la URL : http://localhost:5678





### Docker Compose : QUEUE-docker-compose-02.yml

Se trata de una configuración igual al ejemplo QUEUE-docker-compose-01.yml pero utilizando un fichero de variables de entorno .env para cada una de los contenedores





### Docker Compose : QUEUE-docker-compose-03.yml

Se trata de una configuración igual al ejemplo QUEUE-docker-compose-02.yml pero utilizando utilizando una sección de propiedades comunese para la parte de n8n-main y n8n-worker




### Docker Compose : QUEUE-docker-compose-04.yml

Se trata de una configuración igual al ejemplo QUEUE-docker-compose-03.yml pero añadiendo la capa de gestión de recursos hardware para cada contenedor





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
