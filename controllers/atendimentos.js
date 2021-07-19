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
        console.log('teste ===================== 1');
        Atendimento.post(request.body)
            .then((result) => { 
                console.log('teste ===================== 8');
                response.sendStatus(201).json(result)
            })
            .catch((reject) => { 
                console.log('teste ===================== 9');
                response.sendStatus(400).json(reject)
            });
    });
}