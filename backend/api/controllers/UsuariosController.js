const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { UsuariosService } = require('../services')
const usuariosService = new UsuariosService()
dotenv.config()

class UsuariosController {

    static async cadatrarUsuario(req, res) {
        const salt = await bcrypt.genSalt(12)

        const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: await bcrypt.hash(req.body.senha, salt),
            administrador: req.body.administrador
        }
        try{
            const resultado = await usuariosService.criarRegistro(usuario)
            return res.status(201).json(resultado)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }    

    static async fazerLogin(req, res) {
        const email = req.body.email
        const usuario = await usuariosService.procuraUsuarioPorEmail(email)
        try{
            if(usuario){
                const senha_valida = await bcrypt.compare(req.body.senha, usuario.senha)
                if(senha_valida){
                    const token = jwt.sign({"id": usuario.id, "email": usuario.email, "nome": usuario.nome}, process.env.SECRET_KEY)
                    res.set('Authorization', token)
                    return res.status(200).json({token: token})
                }
            }
        } catch(error){
            res.status(404).json(`Email ou senha incorretos`)
        }
    }

    static async decodificador(req, res, next) {
        try {
            let token = req.headers['authorizarion'].split(" ")[1]
            let decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.usuario = decoded
            next()
        } catch(error){
            res.status(401).json(error.message)
        }
    }
}

module.exports = UsuariosController