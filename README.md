<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



## Description

Este proyecto tiene como objetivo proporcionar una guía paso a paso para inicializar un contenedor Docker para la instancia de la base de datos en PostgreSQL y luego ejectur el yarn start:dev

## Instalación
1. Clona este repositorio en tu máquina local.
2. Ejecuta `yarn install` para instalar las dependencias.
3. ¡Listo para usar!
4. Ejecuta `docker compose up` para iniciacilizar la instancia de PostgreSQL

## Uso Local
1. Ejecuta `yarn dev` para inicializar la aplicacion en local
2. Abre el navegador `http://localhost:4200`.

# Uso Produccion
2. El Api se encuentra activo en produccion en la siguiente url `https://nestjs-poscresql-jwt.onrender.com/api/v1`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Postmant

1. El el `nest.postman_collection.json` debe agregar en el environment la variable `base_url` donde `http://localhost:3000/api/v1` para local y `https://nestjs-poscresql-jwt.onrender.com/api/v1` en prodcción


Nest is [MIT licensed](LICENSE).
