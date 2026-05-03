/*//Middlewareconst 
// express = require('express');
const app = express();
let log = console.log;

app.use((req, res, next) =>{
    log("Middleware");
    next(); //Permite a la peticion avanzar hacia la siguiente
});

app.get('/', (req, res, next) => {
    res.setHeader("Content-Type", "text/plain");
    res.send("URL index /");
});

app.get('/unicorn', (req, res, next) => {
    res.setHeader("Content-Type", "text/plain");
    res.send("URL unicornio");
});

app.use((req, res, next) =>{
    log("Middleware 3!");
    res.status(404) //Envia una respuesta al cliente
    res.send("Pagina no EnConTRadA");
});

app.listen(3000);*/

const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//Middleware
app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

app.get('/', (request, response) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send("URL index /");
    response.end(); 
});

app.get('/test_json', (request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    response.json({code:200, msg:"Ok GET"});
    response.end();  
});

app.post('/test_json', (request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    response.json({code:200, msg:"Ok POST"});
    response.end();  
});

app.get('/test_html', (request, response, next) => {
    response.setHeader('Content-Type', 'text/html');    
    response.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Código en HTML</title>
        </head>
        <body>
            <h1>hola mundo desde express</h1>
        </body>
        </html>
    `);
    response.end(); 
});

app.get('/preguntas', (request, response) => {
    response.setHeader('Content-Type', 'text/html');

    response.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="utf-8">
            <title>Preguntas</title>
        </head>
        <body>
            <h1>Preguntas del lab</h1>

            <h2>1. Describe el archivo package.json.</h2>

            <p>
                El archivo package.json es el archivo de configuracion de un proyecto
                de Node.js. Contiene datos como el nombre, version, archivo principal,
                scripts de npm y dependencias instaladas.
            </p>

            <p>
                En este lab sirve para registrar paquetes como Express y para
                definir comandos como npm start o npm run dev.
            </p>
        </body>
        </html>
    `);
});

const rutasFormulario = require("./formulario.routes");
app.use('/formulario', rutasFormulario);

app.use((request, response, next) => {
    console.log('Otro middleware!');
    response.status(404);
    response.send('¡Page Not Found!'); //Manda la respuesta
});

const server = http.createServer( (request, response) => {    
    console.log(request.url);
});
app.listen(3000);