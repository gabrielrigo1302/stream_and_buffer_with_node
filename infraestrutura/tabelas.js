class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarAtendimentos();
        this.criaPets();
    }

    criarAtendimentos() {
        const sqlQuery = `CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, 
            cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, 
            data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, 
            observacoes text, PRIMARY KEY(id))`;

        this.conexao.query(sqlQuery, (error) => {
            if (error) {
                console.log('Erro: ', error);
            } else {
                console.log('Tabela de Atendimentos criada com sucesso');
            }
        })
    }

    criaPets() {
        const sqlQuery = `CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT,
            nome varchar(50), image varchar(200), PRIMARY KEY (id))`;

        this.conexao.query(sqlQuery, (error) => {
            if (error) {
                console.log('Ocorreu um erro: ', error);
            } else {
                console.log('Tabela de Pets criada com sucesso');
            }
        })
    }
}

module.exports = new Tabelas;