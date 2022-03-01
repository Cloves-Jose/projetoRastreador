const database = require('../models')
const Service = require('./Services')

class UsuariosService extends Service{
    constructor() {
        super('Usuarios')
    }

    async procuraUsuarioPorEmail(email) {
        const usuario = await database[this.nomeDoModelo].findOne({where: { email: email}})
        return usuario
    }
}

module.exports = UsuariosService