const express = require('express');
const path    = require('path');
const app     = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const {doubleCsrf} = require('csrf-csrf');

const {
    generateCsrfToken,
    doubleCsrfProtection,
} = doubleCsrf({
    getSecret:            () => process.env.CSRF_SECRET || 'cambia-esto-en-desarrollo',
    getSessionIdentifier: (req) => req.session.id,
    cookieName:           'x-csrf-token',
    cookieOptions:        { 
        httpOnly: true,
        sameSite: 'lax',
        secure: false //True a la hora de desplegar
    },

    // Por default csrf-csrf v4 solo busca el token en el header x-csrf-token.
    // Como nuestro <form> lo envía en el body como input hidden, le decimos
    // explícitamente que también revise req.body.
    getCsrfTokenFromRequest: (req) => req.body['x-csrf-token'] || req.headers['x-csrf-token']
});

app.set('view engine', 'ejs');
app.set('views', 'views');
//Permite cualquier origen(bueno en desarrollo, no en produccion)

// Orden importante:
// 1. PRIMERO validar el token del request entrante (POST/PUT/DELETE).
app.use(doubleCsrfProtection);

// 2. DESPUÉS generar un token nuevo para la siguiente vista.
//    Si invirtieras el orden, regenerarías el token antes de validarlo
//    y la validación pasaría siempre — anulando la protección.
app.use((req, res, next) => {
    res.locals.csrfToken = generateCsrfToken(req, res);
    next();
});

app.use(cors({
    origin: ["https:://miapp.com",
    "https:://www.miapp.com",
    "http:://localhost:3000",
    "http:://google.fonts.com"],
    credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'cambia-esto-en-desarrollo',
    resave: false,
    saveUninitialized: true,   // necesario para csrf-csrf: el token se firma con el session ID
    cookie: { 
        httpOnly: true,
         sameSite: 'lax' 
        }
}));



app.get('/', (request, response) => {
    response.cookie('mi_cookie','123',{ 
         httpOnly: true,
         sameSite:'lax',
        });
    response.type('text/plain');
    response.send('Hola Mundo');
});

app.get('/test_cookie',(req,res) => {
    const valor = req.cookies.mi_cookie;
    res.type('text/plain');
    res.send(valor || 'No hay cookie llamada mi_cookie');
});

app.get('/test_session', (request, response) => {
    request.session.mi_variable = 'valor';
    response.type('text/plain');
    response.send(request.session.mi_variable);
});

app.get('/test_session_variable', (request, response) => {
    const valor = request.session.mi_variable;
    response.type('text/plain');
    response.send(valor || 'No hay variable de sesión definida. Visita /test_session primero.');
});

app.get('/logout', (request, response) => {
    request.session.destroy(() => {
        response.redirect('/');
    });
});

app.get('/buscar', (request, response) => {
    const q = request.query.q || '';
    response.send(<h1>Resultados para: ${q}</h1>);
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});