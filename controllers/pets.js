const Pet = require('../models/pets');

module.exports = (app) => {
    app.post('/pet', (request, response) => {
        Pet.post(request.body, response);
    })
}