const axios = require('axios');
const moment = require('moment');
const connection = require('../infraestrutura/connection');

class Atendimento {
    get(response) {
        const sqlQuery = 'SELECT * FROM Atendimentos';

        connection.query(sqlQuery, (error, result) => {
            if (error) {
                return response.status(400).json(error);;
            } else {
                return response.status(200).json(result);
            }
        })
    }

    getById(id, response) {
        const sqlQuery = `SELECT * FROM Atendimentos WHERE id = ${id}`;

        connection.query(sqlQuery, async (error, result) => {
            const atendimento = result[0];
            const cpf = atendimento.cliente;

            if (error) {
                return response.status(400).json(error);;
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                
                atendimento.cliente = data;
                return response.status(200).json(atendimento);
            }
        })
    }

    post(atendimento, response) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento?.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const atendimentoCompleto = {...atendimento, dataCriacao, data};

        const validacoes = [
            {
                nome: 'data',
                valido: moment(data).isSameOrAfter(dataCriacao),
                mensagem: 'A data deve ser maior ou igual a data de hoje'
            },
            {
                nome: 'cliente',
                valido: atendimentoCompleto?.cliente?.length > 5,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];

        const erros = validacoes.filter((campo) => !campo.valido);
        const sqlQuery = 'INSERT INTO Atendimentos SET ?';

        if (erros.length) {
            response.status(400).json(erros);

        } else {
            connection.query(sqlQuery, atendimentoCompleto, (error) => {
                if (error) {
                    response.status(400).json(error);
                } else {
                    response.status(201).json(atendimentoCompleto);
                }
            })
        }      
    }
}

module.exports = new Atendimento;