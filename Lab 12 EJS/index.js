const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send("Hello World!");
    res.end();
});

app.get("/test.ejs", (req, res) => {
    let frases = [];

    frases.push("Frase 1");
    frases.push("Frase 2");
    frases.push("Frase 3");
    frases.push("Frase 4");
    frases.push("Frase 5");

    res.render('index', { 
        frases: frases 
    });
});

app.get("/preguntas", (req, res) => {
    res.setHeader("Content-Type", "text/html");

    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Preguntas</title>
        </head>
        <body>
            <h1>Preguntas</h1>

            <h2>1. Que otros templating engines existen para Node?</h2>

            <p>
                Ademas de EJS, existen otros templating engines para Node.js como
                Pug, Handlebars, Mustache, Nunjucks y Eta. Todos sirven para generar
                HTML dinamico desde el servidor, aunque cada uno tiene una sintaxis
                diferente.
            </p>

        </body>
        </html>
    `);
});

app.use((request, response) => {
    response.status(404).send('404 - Pagina no encontrada');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});