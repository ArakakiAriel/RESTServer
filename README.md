# Curso en el que se aprende a utilizar Servicios Rest (Sección 08 y 09 del curso)

# Sección08
## Temas vistos:
(Sección08)
* Instalacion y pruebas con MongoDB
* Peticiones HTTP
  a. GET
  b. PUT
  c. POST
  d. DELETE
* Aprender sobre códigos de error HTTP (info en  pdf/http-response-codes.pdf)
* Códigos de error en Express
* Archivos para la configuracion global
* Tips importantes en Postman

(Sección09)
- Definir los alcances de nuestro RESTServer
- CRUD
- Encriptación de contraseñas
- Validaciones personalizadas
- Creación de roles
- Conexiones con MLAB
- Despliegue de base de datos en la nube
- Conexión con Robo 3T con base de datos en la nube
- Configuración de variables de entorno
- Borrado de archivos
    a. Eliminado físico de la base de datos
    b. Eliminación por estado en un campo de la colección

(Seccion10)
- Introducción a los tokens
- JWT
- Login personalizado
- Protección de rutas vía token
- Leer payload del token sin la firma
- Tips importantes para POSTMan
- Despliegues en Heroku para pruebas en producción
- Uso de Middleware
-----------------------------------------------------------------------------

```
nodemon server -e js,hbs,html,css
```
###### Descripcion: Se levanta un servidor http en el localhost:8080 y al utilizar el -e se le indica luego que tipo de archivos necesitamos que quede escuchando por cambios y actualizar

-----------------------------------------------------------------------------

## [MongoDB] ([LINK](https://www.mongodb.com/download-center/community))
<b>Es una base de datos No Relacional </b>

#### Instalacion:[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)



- Así se levanta localmente: ```mongod --dbpath \MongoDB/database```

-----------------------------------------------------------------------------

## [Robo3T] ([LINK](https://robomongo.org/download))
<b>Es un manejador de la base de datos MongoDB que nos va a permitir crear todo de forma visual</b>

##### Instalacion: Para poder instalarlo, vamos a la pagina, nos descargamos el .gz y lo extraemos. Una vez hecho esto, vamos a la carpeta bin y ejecutamos robo3t.

-----------------------------------------------------------------------------

## [Peticiones GET, PUT, POST, DELETE]
<b>Es un paquete que se complementa con express para poder tener un css default en cada pagina que se desee. Además agrega funcionalidades como los parciales y helpers</b>

### [body-parser](https://www.npmjs.com/package/body-parser):
- Es un paquete para poder manejar de forma fácil los middlewares
```npm install body-parser --save```}

### Parciales
<p>Los parciales simplifican la repeticion de codigo al crear archivos .hbs</p>

1. En nuestro server.js escribimos para registrar los parciales
```
hbs.registerPartials(__dirname + '/views/partials');
```
2. Luego creamos una carpeta contenedora /views/partials en donde vamos a crear nuestros archivos hbs
3. Para llamar a los hbs que van a ser nuestras páginas (que se encuentran dentro de /views) se las llaman de la siguiente manera dentro de server.js
```
app.get('/', (req, res) => {
    res.render('home', {
        nombre: "Kenji",
        anio: new Date().getFullYear()
    }); 
});
```

### Helpers
<p>Los helpers son funciones del HBS que se disparan cuando el template lo requiera</p>

- Se declaran las funciones en una clase helpers.js de la siguiente manera
```
hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
});
```
- Se pueden utilizar en las clases .hbs para lo que uno quiera hacer

-----------------------------------------------------------------------------
## [Heroku] ([LINK](https://dashboard.heroku.com/))
<p>Servicio en la nube que permite desplegar aplicaciones php, ruby, node, etc.</p>

1. Para poder logearse con heroku
```heroku login```

2. Nos paramos sobre el branch y ponemos:
```
heroku git:remote -a kenjiman-webpage
git push heroku master
```
###### Esto sirve para poder levantar los cambios en el servidor de heroku

3. Podemos abrirlo desde el link que nos aparece en consola (En mi caso https://kenjiman-webpage.herokuapp.com/) o ponemos por linea de comando:
```heroku open```

### Siempre sirve:

- En caso de que necesitemos declarar variables de configuraciones en heroku podemos poner lo siguiente:
    ```heroku config:set SEED="production-token-seed"```
 #### heroku config:set NOMBRE_PARAMETRO="Valor-del-parametro"

- En caso de que querramos ver las variables de configuraciones creadas utilizamos el siguiente código:
    ```heroku config```
 

----------------------------------------------------
----------------------------------------------------

# Sección09
-----------------------------------------------------------------------------
## [Mongoose] ([LINK](https://mongoosejs.com/docs/guide.html))
<b>Es un paquete que nos ayuda a realizar la conexión de NodeJS con MongoDB</b>
- Se utiliza en la clase server/models/user.js y server/server.js

#### Instalacion: ```npm install mongoose --save```

- type: Tipo de dato (String, Boolean, etc)
- required: Si es requerido (true, false),
- default: Valor por default si no se pasa valor
- unique: Si el valor solo puede ser único en la DB (true, false)
- enum: se le pasa un objeto indicando valores permitidos (Ej: {values: ['ADMIN_ROLE', 'USER_ROLE'], message: '{VALUE} is not a valid role'})

-----------------------------------------------------------------------------
## [Mongoose-unique-validator] ([LINK](https://www.npmjs.com/package/mongoose-unique-validator))
<b>Es un paquete nos ayudará a definir los errores de validaciones utilizando mongoose</b>
- Se utiliza en la clase server/models/user.js 

#### Instalacion: ```npm install mongoose-unique-validator --save```

-----------------------------------------------------------------------------
## [B-crypt] ([LINK](https://www.npmjs.com/package/bcrypt))
<b>Es un paquete para poder encriptar y desencriptar</b>
- Se utiliza en la clase server/routes/user.js 

#### Instalacion: ```npm install bcrypt --save ```

-----------------------------------------------------------------------------
## [UNDERSCORE] ([LINK](https://underscorejs.org))
<b>Es una librería para poder expandir javascript</b>
- Se utiliza en la clase server/routes/user.js 

#### Instalacion: ```npm install underscore --save ```

-----------------------------------------------------------------------------
## [MONGODB ATLAS] ([LINK](https://www.mongodb.com/cloud/atlas))
<b>Es una base de datos online que se puede registrar gratis con 500mb de almacenamiento</b>

(Falta completar)


----------------------------------------------------
----------------------------------------------------

# Sección10
-----------------------------------------------------------------------------

## Tokens
- Un token es un elemento virtual o físico que se utiliza para poder logearse o entrar en una página o lugar físico

-----------------------------------------------------------------------------

## [JWT (Json Web Token)] ([LINK](https://www.npmjs.com/package/jsonwebtoken))
<b>Librería para generar los tokens</b>
- Se utiliza en la clase server/routes/login.js 

#### Instalacion: ```npm i jsonwebtoken --save ```



-----------------------------------------------
-----------------------------------------------
-----------------------------------------------
# APARTADO I: Como desplegar un API en HEROKU

1. New -> Create New App // Agregamos el nombre, la región más cercana.
2. Commitear y pushear nuestro código a un repo de github.
3. Una vez creado el repo de heroku, nos dirigimos en nuestra consola a la raiz de nuestro repo que vamos a desplegar en heroku y ponemos lo siguiente:
```heroku git:clone -a rest-server-heroku``` (Cambiando rest-server-heroku por el nombre que le hayan asignado)
4. Luego pusheamos el código al repo de heroku:
```git push heroku master```
5. Listo. Tenemos nuestro servicio en Heroku levantado!

# APARTADO II: Como crear nuestra base en MongoDB Atlas

1. Nos creamos la cuenta en la pagina de [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Elegimos AWS como cloud y si quieren le cambian el nombre al cluster 
   - Una vez que le demos aceptar va a tardar aproximadamente unos 5min en generar el cluster.
3. Mientras se genera el cluster, vamos a Security -> Network Access y le damos al boton + ADD IP ADRESS
   - Le damos la opcion de allow access from anywhere y aceptamos.
4. Luego vamos a Security -> Database Access y le damos al boton + ADD NEW USER
   - Elegimos un nombre de usuario
   - Autogeneramos la password
   - Le damos Atlas Admin privileges
   - Guardamos estos datos en un archivo de texto para su posterior uso
5. Para conectarnos al cluster vamos a Atlas -> Cluster -> Connect(Al cluster creado previamente) -> Connect with MongoDB Compass
   - Nos copiamos el string que nos de de conexion y lo agregamos al archivo de texto donde guardamos el usuario y pass
   -En donde diga <password> cambiamos con la password que autogeneramos.
6. Es necesario tener MongoDB Compass instalado en sus maquinas (Fijarse algun instructivo de como instalarlo)
   - Una vez abierto el MongoDB Compass vamos a New Connection y completamos:
     - Hostname: Sacamos del string de conexiones desde el @ hasta el .net (EJ: cluster0-xvaow.mongodb.net)
     - Si el string de conexiones tiene un +srv prendemos la opcion de SRV Record, caso contrario dejamos el puerto 27017 por defecto
     - Authentication: Username/Password (Indicando el username y pass que guardamos previamente)

