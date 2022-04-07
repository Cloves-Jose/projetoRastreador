const { Router } = require('express')
const VeiculoRastreamentoController = require('../controllers/VeiculoRastreamentoController')


const router = Router()

router
    .post('/api/cadastrarPosicao', VeiculoRastreamentoController.cadastrarRota)
    .get('/api/buscarPosicoes', VeiculoRastreamentoController.buscarPosicao)

module.exports = router
