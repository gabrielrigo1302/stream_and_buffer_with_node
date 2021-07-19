const sqlQuery = require('../infraestrutura/database/queries');

class Atendimentos {
    post(atendimentos) {
        console.log('teste ===================== 3');
        const query = 'INSERT INTO Atendimentos SET ?';
        return sqlQuery(query, atendimentos);
    }
}

module.exports = new Atendimentos();