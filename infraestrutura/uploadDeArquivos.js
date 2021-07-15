const fs = require('fs');
const pt = require('path');
//buffers: síncronos

//  fs.readFile('./assets/png-pet.png', (erro, buffer) => {
//      fs.writeFile('./assets/png-pet.png', buffer, (erro) => {
//          console.log('imagem foi escrita')
//      })
//  })

//streams: assíncronas
module.exports = (path, archieveName, callbackImagemCriada) => {

    const validTypes = ['.jpg', '.png', '.jpeg'];
    const type = pt.extname(path);
    const IsTypeValid = validTypes.indexOf(type) > -1;
    const newPath = `./assets/${archieveName}${type}`;

    if(IsTypeValid) {
        fs.createReadStream(path)
        .pipe(fs.createWriteStream(newPath)) //pipe está recebendo como parâmetro a strem que foi aberta para leitura anteriormente
        .on('finish', () => callbackImagemCriada(false, newPath));
    } else {
        const error = 'Tipo inválido';
        callbackImagemCriada(error);
        console.log('Tipo inválido');
    }
}