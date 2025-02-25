# enmilocalfunciona-n8n





**Índice**

- [enmilocalfunciona-n8n](#enmilocalfunciona-n8n)
  - [Descripción](#descripción)
  - [Estado](#estado)
  - [Stack Tecnológico](#stack-tecnológico)
    - [General](#general)
    - [Dependencias proyectos de arquitectura](#dependencias-proyectos-de-arquitectura)
    - [Dependencias de terceros](#dependencias-de-terceros)
  - [Pre-Requisitos](#pre-requisitos)
  - [Makefile de gestión del proyecto](#makefile-de-gestión-del-proyecto)
    - [Configuración de Makefile de gestión del proyecto](#configuración-de-makefile-de-gestión-del-proyecto)
    - [Uso de Makefile de gestión del proyecto](#uso-de-makefile-de-gestión-del-proyecto)
      - [Comprobar que se encuentra disponible](#comprobar-que-se-encuentra-disponible)
      - [Preparación para su uso](#preparación-para-su-uso)
  - [Configuración](#configuración)
    - [Configurar makefile para su uso en windows](#configurar-makefile-para-su-uso-en-windows)
    - [Configuración PGAdmin](#configuración-pgadmin)
      - [Detalle](#detalle)
      - [Particularidades](#particularidades)
      - [Persistencia](#persistencia)
      - [Agregar un servidor Postgres](#agregar-un-servidor-postgres)
  - [Uso](#uso)
  - [Autor](#autor)





## Descripción

Este **repositorio** se encarga de servir como una **estructura** de los **recursos utilizados** para los **artículos publicados** en la plataforma **enmilocalfunciona.io** relacionados con el uso de **n8n** y basado en la serie de artículos **“Primeros pasos con n8n**

* [Primeros pasos con n8n (Parte 1)](https://www.enmilocalfunciona.io/primeros-pasos-con-n8n/): Artículo de introducción a la herramienta n8n donde se explicarán más ciertos detalles técnicos de la herramienta y ciertos conceptos necesarios para explotar el máximo su uso

* [Acelerando los desarrollos con contenedores : n8n](https://www.enmilocalfunciona.io/acelerando-los-desarrollos-con-contenedores-n8n/): Artículo de soporte que ayudará a desplegar la herramienta en local mediante Docker y que servirá de base para la realización de los siguientes artículos

* [Primeros pasos con n8n (Parte 2) : Uso de Base de Datos](https://www.enmilocalfunciona.io/primeros-pasos-con-n8n-parte-2-uso-de-base-de-datos/): Artículo de la herramienta n8n donde se explicarán las diferentes configuraciones de base de datos que se pueden tener y su integración





## Estado

Este proyecto se encuentra en construcción





## Stack Tecnológico

### General

* [Docker](https://www.docker.com/) - Tecnología de Contenedores/Containers
* [Docker Hub](https://hub.docker.com/) - Repositorio de Docker Público
* [Makefile](https://es.wikipedia.org/wiki/Make) - Tecnología de soporte y ayuda a la gestión de ciclos de desarrollo
* [n8n](https://n8n.io/) - Herramienta de automatización de procesos + Agentes IA



### Dependencias proyectos de arquitectura

N/A


### Dependencias de terceros

N/A





## Pre-Requisitos

* Tener instalado Docker y Docker Compose
* Tener instalado soporte para Makefile
* Tener disponible el puerto 5678





## Makefile de gestión del proyecto

Se ha diseñado un component software para la gestión del ciclo de vida de las aplicaciones utilizadas
Este componente se ha diseñado sobre la tecnología Makefile

Se requiere que el ordenador tenga soporte para ejecutar esta tecnología

Se compone de 3 ficheros:

* **docker.mk**: Fichero Makefile parcial para gestionar las operaciones y acciones relacionadas con Docker y Docker Compose
* **n8n.mk**: Fichero Makefile parcial para gestionar las operaciones y acciones relacionadas con n8n
* **Makefile**: Fichero Makefile global genera que gestiona el resto de ficheros

Además hace uso del fichero de variables de entorno **.env**

### Configuración de Makefile de gestión del proyecto

La configuración de este componente se divide en 2 partes:

* **.env**: Fichero de variables de entorno que se incorpora a la ejecución del Makefile
* **Configuración específica**: Cada fichero Makefile dispone de una sección con la configuración particular

### Uso de Makefile de gestión del proyecto

#### Comprobar que se encuentra disponible

Pasos a seguir:

1. Localizar el directorio principal del proyecto : <PROJECT_PATH>

2. Ejecutar el siguiente comando

```bash
make help
```

3. Verificar que se muestran las operaciones o actividades permitidas


#### Preparación para su uso

El fichero **.env** contiene una variable de entorno que establece el fichero Docker Compose sobre el que trabajar

Se aconseja cambiar en cada uso de un nuevo fichero

```bash
### --- DOCKER ---
...
DOCKER_COMPOSE_FILE_USED=./example/EXAMPLE-docker-compose-01.yml
...
```





## Configuración

Estos son algunos de los aspectos de configuración general para los ejemplos que utilizaremos con n8n

* Configurar makefile para su uso en windows

### Configurar makefile para su uso en windows

1. Instalar GNUWin32Make : https://www.technewstoday.com/install-and-use-make-in-windows/

2. Dentro del fichero Makefile cambiar las dos rutas /bin por /Scripts

3. Usar una consola linux, como puede ser el gitBash para ejecutar el comando make


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

Pasos a seguir:

* Verificar que el contenedor de Postgres se encuentra disponible
* Verificar que el contenedor de PGAdmin se encuentra disponible
* Acceder a la URL de la herramienta PGAdmin: http://localhost:5050
* Iniciar sesión con las credenciales por defecto (email: admin@acme.com y password: admin)
* Verificar que se ha cargado la home de la aplicación
* Pulsar sobre el botón "Add New Server"
* Verificar que se ha cargado la modal de creación
* Establecer el "name": db
* Acceder a la pestaña de "Connection"
* Rellenar los siguientes campos
  * Hostname (nombre del contenedor): db
  * Username: keycloak
  * Password: keycloak
* Verificar que se puede acceder desde el menú de servidores





## Uso

Cada una de las partes prácticas que componen los artículos asociados dispondrán de un fichero README explicativo





## Autor

* **Víctor Madrid**