let log = console.log;

/*log("Hola Mundo");

//fs es el módulo que contiene las funciones para 
//manipular el sistema de archivos
const fs = require("fs");

// Crear un archivo con la clase readFileSync
fs.writeFileSync("archivo.txt", "Hola fMundo");

// Async Sort ordena esperando el mismo tiempo del tamano 
// del numero terminando ordenados al imprimirse todos
const arreglo = [5000, 60, 90, 100, 10, 20, 10000, 0, 120, 2000, 340, 1000, 50];

for (let item of arreglo) {
    setTimeout(() => {
        log(item);
    }, item);
}

log("Hola");

setTimeout(() => {
    log("Mundo");
}, 2000);

log("Adios");*/


// Modulos de Node.js
const fs = require("fs");
const http = require("http");

//Funcion que recibe un arreglo de numeros y devuelve su promedio
function promedio(numeros) {
    let suma = 0;

    for (let numero of numeros) {
        suma += numero;
    }

    return suma / numeros.length;
}

const calificaciones = [90, 85, 100, 95, 80];
log("Promedio:", promedio(calificaciones));

//Funcion que recibe un string y lo escribe en un archivo de texto
function escribirArchivo(texto) {
    fs.writeFileSync("archivo.txt", texto);
    log("Archivo creado correctamente.");
}

escribirArchivo("Hola, este texto fue escrito desde Node.js");

//Problema extra funcion que calcula el factorial de un numero
function factorial(numero) {
    let resultado = 1;

    for (let i = 1; i <= numero; i++) {
        resultado *= i;
    }

    return resultado;
}

log("Factorial de 5:", factorial(5));

//Servidor web con Node.js
const server = http.createServer((req, res) => {
    log("Peticion recibida:", req.url);

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (req.url === "/" || req.url === "/inicio") {
        res.write(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Laboratorio Node</title>
            </head>
            <body>
                <header>
                    <h1>Hola mundo desde Node.js</h1>
                    <nav>
                        <a href="/inicio">Inicio</a> |
                        <a href="/pagina">Pagina del laboratorio</a>
                    </nav>
                </header>

                <main>
                    <h2>Servidor web</h2>
                    <p>Esta pagina fue enviada como respuesta HTTP desde un servidor creado con Node.js.</p>
                    <p>El servidor recibe una peticion del navegador y responde con codigo HTML.</p>
                </main>
            </body>
            </html>
        `);
    } else if (req.url === "/pagina") {
        res.write(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pagina anterior</title>
            </head>
            <body>
                <header>
                    <h1>Mi pagina personal</h1>
                    <nav>
                        <a href="/inicio">Regresar al inicio</a>
                    </nav>
                </header>

                <main>
                    <section>
                        <h2>Sobre mi</h2>
                        <p>Esta es una pagina sencilla reutilizada de mis laboratorios anteriores.</p>
                    </section>

                    <section>
                        <h2>Mis intereses</h2>
                        <ul>
                            <li>Desarrollo web</li>
                            <li>JavaScript</li>
                            <li>Node.js</li>
                        </ul>
                    </section>
                </main>

                <footer>
                    <p>Pagina enviada desde el servidor de Node.js.</p>
                </footer>
            </body>
            </html>
        `);
    } else {
        res.statusCode = 404;
        res.write(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="utf-8">
                <title>Error 404</title>
            </head>
            <body>
                <h1>404 - Pagina no encontrada</h1>
                <p>La ruta solicitada no existe.</p>
                <a href="/inicio">Volver al inicio</a>
            </body>
            </html>
        `);
    }

    res.end();
});

server.listen(4141, () => {
    log("Mi servidor esta vivo corriendo en http://localhost:4141");
});
