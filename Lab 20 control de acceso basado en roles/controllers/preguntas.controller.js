exports.getPreguntas = (request, response, next) => {
    response.render('preguntas', {
        titulo: 'Preguntas'
    });
};