const Atendimento = require('../models/atendimentos');

module.exports = (app) => {
    app.get('/atendimentos', ( _, response) => {
        Atendimento.get(response);
    });

    app.get('/atendimentos/:id', ( request, response) => {
        const {id} = request.params
        Atendimento.getById(parseInt(id), response);
    });

    app.post('/atendimentos', ( request, response) => {
        Atendimento.post(request.body, response);
    });
}