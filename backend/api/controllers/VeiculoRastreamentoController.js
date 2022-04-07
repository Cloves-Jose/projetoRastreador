const database = require('../models')
const { VeiculoRastreamentoService } = require('../services')
const veiculoRastreamentoService = new VeiculoRastreamentoService()

class VeiculoRastreamentoController {

    static async cadastrarRota(req, res) {
        const rota = req.body
        try{
            const resultado = await veiculoRastreamentoService.criarRegistro(rota)
            res.status(201).json(resultado)
        }catch(error) {
            res.status(400).json(error.message)
        }
    }

    static async buscarPosicao(req, res) {
        try{
            const resultado = await veiculoRastreamentoService.buscarRegistro()
            res.status(200).json(resultado)
        }catch(error) {
            res.status(500).json(error.message)
        }
    }

}

module.exports = VeiculoRastreamentoController