const database = require('../models')

class Services{
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async criarRegistro(registro){
        return database[this.nomeDoModelo].create(registro)
    }

}

module.exports = Services