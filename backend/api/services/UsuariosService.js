const database = require('../models')
const Service = require('./Services')

class UsuariosService extends Service{
    constructor() {
        super('Usuarios')
    }
}

module.exports = UsuariosService