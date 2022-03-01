const { Router } = require('express')
const UsuariosController = require('../controllers/UsuariosController')


const router = Router()

router
    .post('/api/cadastrarUsuario', UsuariosController.cadatrarUsuario)

module.exports = router