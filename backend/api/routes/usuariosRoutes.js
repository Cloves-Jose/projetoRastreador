const { Router } = require('express')
const UsuariosController = require('../controllers/UsuariosController')


const router = Router()

router
    .post('/api/cadastrarUsuario', UsuariosController.cadatrarUsuario)
    .post('/api/realizaLogin', UsuariosController.fazerLogin)
module.exports = router