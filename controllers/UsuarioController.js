const db = require('../models');
var bcrypt = require('bcryptjs');
const tokenService = require('../services/token')


module.exports = {
    login: async(req, res) => {
        try{
            const user = await db.Usuario.findOne({where: {
                email: req.body.email
            }})
            if(user){
                const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if (passwordIsValid){
                    const token = await tokenService.encode(user.id, user.rol)
                    res.status(200).send({ auth: true, tokenReturn: token })
                }else{
                    return res.status(401).send({ auth: false, tokenReturn: null, reason: "Invalid Password!"})
                }
            }else{
                return res.status(404).send('User Not Found.');
            }
        }catch(err) {
            res.status(500).send('Error -> ' + err)
        }
    },

    list: async(req, res) => {
        try{
            const usuario = await db.Usuario.findAll();
            res.status(200).json(usuario) 
        } catch (error) {
            res.status(500).send("Error!")
        }    
    },

    add: async(req, res) => {
        try {
            const usuario = await db.Usuario.create(req.body);
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).send("Error!")
        }
        
    },

    update: async (req, res) => {
        try{
            const usuario = await db.Usuario.update({nombre: req.body.nombre, 
                rol: req.body.rol, password: req.body.password, email: req.body.email}, {where: {id: req.body.id}});
                res.status(200).json(usuario)
        }catch(e){
            res.status(500).send("Error!")
        }
    },

    activate: async (req, res) => {
        try{
            const usuario = await db.Usuario.update({estado: 1}, {where: {id: req.body.id}});
                res.status(200).json(usuario)
        }catch(e){
            res.status(500).send("Error!")
        }
    },

    deactivate: async (req, res) => {
        try{
            const usuario = await db.Usuario.update({estado: 0}, {where: {id: req.body.id}});
                res.status(200).json(usuario)
        }catch(e){
            res.status(500).send("Error!")
        }
    }
}