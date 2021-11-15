# ProyectRadianceApp
Este repositorio contiene el codigo perteneciente al proyecto Radiance, una aplicación web destinada a ser una revista digigtal de pago. Este proyecto fue creado para el curso de programación web y de proyectos de ingeniería de sisteams 2 en la Universidad Rafael Landivar.

## Instalación del proyecto
Para instalar el proyecto lo primero sera clonar el repositorio:
```shell
$ cd /path/to/project/folder/location
$ git clone git@github.com:sharongomez98/ProyectRadianceApp.git
```
luego de esto podemos correr el siguiente comando para instalar las dependencias
```shell
$ cd ProyectoRadianceApp/radiance-app 
$ npm install
```
Esto deberia permitir la instalación de las dependencias con npm. Para probar el funcionamiento y levantar el servidor de forma local utilizaremos el siguiente comando.
```shell
$ npm run serve
```
Si no ha existido ningun problema hasta este punto deberia de poder levantarse el proyecto sin ningun problema en el puerto 8080 de localhost.
## Otros repositorios
Este proyecto esta diseñado para funciónar consumiendo de una RESTApi, esta se puede encontrar en el siguiente enlace:
[Radiance API](https://github.com/MarcosJSierra/ProyectRadianceApi)