require('./services/clients')
const customExpress = require("./config/customExpress");
const connection = require('./infraestrutura/connection');
const Tabelas = require('./infraestrutura/tabelas');
const port = 3000;
const app = customExpress();

connection.connect((error) => {
    if(error) {
        console.log("erro: ", error)
    } else {
        Tabelas.init(connection);
        app.listen(port, () => {
            console.log("Servidor rodando com sucesso")
        });
        
    }
})
