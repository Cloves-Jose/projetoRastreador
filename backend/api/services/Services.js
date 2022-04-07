const database = require('../models')

class Services{
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async criarRegistro(registro){
        return database[this.nomeDoModelo].create(registro)
    }

    async buscarRegistro(){
        return database[this.nomeDoModelo].findAll()
    }
}

module.exports = Services