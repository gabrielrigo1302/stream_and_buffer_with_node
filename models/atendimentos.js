const axios = require('axios');
const moment = require('moment');
const connection = require('../infraestrutura/database/connection');
const repository = require('../repositories/atendimentos');

class Atendimento {
    constructor() {

    }

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

    post(atendimento) {
        console.log('teste ===================== 2');
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
    
        console.log('aqui então')
        if (erros.length) {
            return new Promise((resolve, reject) => {
                console.log('teste ===================== 6');
                reject(erros)
            });

        } else {
            console.log('aqui')
            return repository.post(atendimentoCompleto)
                .then((results) => {
                    const id = results.insertId
                    console.log('teste ===================== 7');
                    return {...atendimentoCompleto, id};
                });
        }      
    }
}

module.exports = new Atendimento;