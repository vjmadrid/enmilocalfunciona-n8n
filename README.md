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
  - [Uso](#uso)
  - [Autor](#autor)





## Descripción

Este **repositorio** se encarga de servir como una **estructura** de los **recursos utilizados** para los **artículos publicados** en la plataforma **enmilocalfunciona.io** relacionados con el uso de **n8n** y basado en la serie de artículos **“Primeros pasos con n8n**

* [Primeros pasos con n8n (Parte 1)](https://www.enmilocalfunciona.io/primeros-pasos-con-n8n/): Artículo de introducción a la herramienta n8n donde se explicarán más ciertos detalles técnicos de la herramienta y ciertos conceptos necesarios para explotar el máximo su uso

PRÓXIMAS PUBLICACIONES

* [Acelerando los desarrollos con contenedores : n8n](https://www.enmilocalfunciona.io/acelerando-los-desarrollos-con-contenedores-n8n/): Artículo de soporte que ayudará a desplegar la herramienta en local mediante Docker y que servirá de base para la realización de los siguientes artículos

* [Ejemplo de n8n: Uso del nodo code](https://www.enmilocalfunciona.io/ejemplo-de-n8n-uso-del-nodo-code/): Artículo de soporte que se utilizará para implementar un ejemplo de workflow sin integraciones externas, para explicar el nodo code y para usarlo como base de ejemplo para otros tutoriales.

* [Primeros pasos con n8n (Parte 2) : Uso de Base de Datos](https://www.enmilocalfunciona.io/primeros-pasos-con-n8n-parte-2-uso-de-base-de-datos/): Artículo de la herramienta n8n donde se explicarán las diferentes configuraciones de base de datos que se pueden tener y su integración

* [Primeros pasos con n8n (Parte 3) : Importar/Exportar Flujos de Trabajo](https://www.enmilocalfunciona.io/primeros-pasos-con-n8n-parte-3-importar-exportar-flujo/): Artículo de la herramienta n8n donde se explicarán las diferentes maneras de importar y exportar workflows

* [Primeros pasos con n8n (Parte 4) : Importar/Exportar Credenciales](https://www.enmilocalfunciona.io/primeros-pasos-con-n8n-parte-4-importar-exportar-credenciales/): Artículo de la herramienta n8n donde se explicarán las diferentes maneras de importar y exportar credenciales





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





## Uso

Cada una de las partes prácticas que componen los artículos asociados dispondrán de un fichero README explicativo





## Autor

* **Víctor Madrid**