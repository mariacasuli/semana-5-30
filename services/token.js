const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../secret/config');


const checkToken = async(token) =>{
    let localID = null;
    try {
        const { id } = token.decode(token);
        localID = id;
    } catch (error) {
        
    }
    const user = await models.Usuario.findOne({where:{
        id: localID,
        //estado: 1
    }});
    if(user){
        const token = encode(user.id, user.rol)
        return {
            token,
            rol: user.rol
        }
    }else{
        return false
    }
}

module.exports = {

    //todo funciones para el token

    //generar el token
    encode: async(id , rol) => {
        const token = jwt.sign({
            id: id,
            rol: rol,
        }, config.secret, {
            expiresIn: 86400, 
        }
        );

        return token;
    },
    //permite decodificar el token
    decode: async(token) => {
        try {
            const { id } = await jwt.verify(token, config.secret)
            const user = await models.Usuario.findOne({where:{
                id: id,
                //estado: 1
            }});
            if(user){
                return user;
            }else{
                return false;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }

    }
}