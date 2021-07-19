const connection = require('./connection');

const executeQuery = (query, parameters = '') => {
    return new Promise((resolve, reject) => {
        connection.query(query, parameters, (errors, results, fields) => {
            if (errors) {
                console.log('teste ===================== 4');
                reject(errors);
            } else {
                console.log('teste ===================== 5');
                resolve(results)
            }
        })
    })
}

module.exports = executeQuery;