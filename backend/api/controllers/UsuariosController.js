const { UsuariosService } = require('../services')
const usuariosService = new UsuariosService()


class UsuariosController {

    static async cadatrarUsuario(req, res) {
        const usuario = req.body
        try{
            const resultado = await usuariosService.criarRegistro(usuario)
            return res.status(201).json(resultado)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
    
}

module.exports = UsuariosController