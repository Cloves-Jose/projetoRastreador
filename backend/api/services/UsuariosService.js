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

    async procuraPorId(id, []) {
        const usuario = await database[this.nomeDoModelo].findOne({where: {id: id}, attributes: {exclude:[]}})
    }
}

module.exports = UsuariosService