const bodyParser = require('body-parser')

const usuarios = require('./usuariosRoutes')
const veiculosRastreamento = require('./veiculoRastreamentoRoutes')

module.exports = app => {
    app.use(
        bodyParser.json(),
        usuarios,
        veiculosRastreamento
    )
}