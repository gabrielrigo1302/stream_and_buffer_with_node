const connection = require('../infraestrutura/connection');
const uploadDeArquivo = require('../infraestrutura/uploadDeArquivos');

class Pet {
    post(pet, response) {
        const sqlQuery = 'INSERT INTO Pets SET ?';

        uploadDeArquivo(pet.imagem, pet.nome, (error, novoCaminho) => {
            
            if (error) {
                response.status(400).json(error)
            } else {
            
                const novoPet = {
                    nome: pet.nome,
                    image: novoCaminho
                }

                connection.query(sqlQuery, novoPet, error => {
                    if (error) {
                        response.status(400).json(error)
                    } else {
                        response.status(200).json(novoPet);
                    }
                })
            }
        })
    }
}

module.exports = new Pet;