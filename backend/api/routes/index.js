const bodyParser = require('body-parser')

const usuarios = require('./usuariosRoutes')

module.exports = app => {
    app.use(
        bodyParser.json(),
        usuarios
    )
}