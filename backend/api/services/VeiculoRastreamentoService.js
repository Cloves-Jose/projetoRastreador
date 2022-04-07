const database = require('../models')
const Services = require('./Services')

class VeiculoRastreamentoService extends Services {
    constructor(){
        super('VeiculoRastreamentos')
    }
}

module.exports = VeiculoRastreamentoService