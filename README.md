# Curso en el que se aprende a utilizar Servicios Rest

## Temas vistos:

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

-----------------------------------------------------------------------------

```
nodemon server -e js,hbs,html,css
```
###### Descripcion: Se levanta un servidor http en el localhost:8080 y al utilizar el -e se le indica luego que tipo de archivos necesitamos que quede escuchando por cambios y actualizar

-----------------------------------------------------------------------------

## [MongoDB](https://www.mongodb.com/download-center/community)
<b>Es una base de datos No Relacional </b>

#### [Instalacion](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
``` ```

- 
    
-----------------------------------------------------------------------------

## [Robo3T](https://robomongo.org/download)
<b>Es un manejador de la base de datos que nos va a permitir crear todo de forma visual</b>

##### Instalacion: Para poder instalarlo, vamos a la pagina, nos descargamos el .gz y lo extraemos. Una vez hecho esto, vamos a la carpeta bin y ejecutamos robo3t.

-----------------------------------------------------------------------------

## Peticiones GET, PUT, POST, DELETE
<b>Es un paquete que se complementa con express para poder tener un css default en cada pagina que se desee. Además agrega funcionalidades como los parciales y helpers</b>

### body-parser:
- Es un paquete para 
```npm install body-parser --save```}

### Parciales--------
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

### Helpers--------
<p>Los helpers son funciones del HBS que se disparan cuando el template lo requiera</p>

- Se declaran las funciones en una clase helpers.js de la siguiente manera
```
hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
});
```
- Se pueden utilizar en las clases .hbs para lo que uno quiera hacer

-----------------------------------------------------------------------------
## [Heroku](https://dashboard.heroku.com/)
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

