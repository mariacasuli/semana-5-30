const db = require('../models');

module.exports = {
    list: async(req, res) => {
        try {
            const articulo = await db.Articulo.findAll();
            res.status(200).json(articulo)            
        } catch (error) {
            res.status(500).send("Error!")
        }    
    },

    add: async(req, res) => {
        try {
            const articulo = await db.Articulo.create(req.body);
            res.status(200).json(articulo);
        } catch (error) {
            res.status(500).send("Error!")
        }
        
    },

    update: async (req, res) => {
        try{
            const articulo = await db.Articulo.update({nombre: req.body.nombre, 
                descripcion: req.body.descripcion}, {where: {id: req.body.id}});
                res.status(200).json(articulo)
        }catch(e){
            res.status(500).send("Error!")
        }
    },

    activate: async (req, res) => {
        try{
            const articulo = await db.Articulo.update({estado: 1}, {where: {id: req.body.id}});
                res.status(200).json(articulo)
        }catch(e){
            res.status(500).send("Error!")
        }
    },

    deactivate: async (req, res) => {
        try{
            const articulo = await db.Articulo.update({estado: 0}, {where: {id: req.body.id}});
                res.status(200).json(articulo)
        }catch(e){
            res.status(500).send("Error!")
        }
    }
}