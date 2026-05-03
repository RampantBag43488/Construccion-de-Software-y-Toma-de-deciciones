const express = require('express');
const fs      = require('fs');
const path    = require('path');
const router = express.Router();

router.get('/form_method', (request, response, next) => {
    response.setHeader('Content-Type', 'text/html');
    const html = fs.readFileSync(path.resolve(__dirname, './form.html'), 'utf8')
    response.write(html);
    response.end();  
});

router.post('/form_method', (request, response, next) => {
    const indice = Number(request.body.indice);
    const imprimir = request.body.imprimir;

    for (var i = 1; i <= indice; i++) {
        console.log(imprimir);
    }

    fs.appendFileSync(
        path.resolve(__dirname, './datos.txt'),
        `Indice: ${indice}, Imprimir: ${imprimir}\n`
    );

    response.setHeader('Content-Type', 'application/json');
    response.status(200).send('{ "code": 200, "msg": "Ok POST" }');
});

module.exports = router;