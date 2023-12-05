const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET
const dotenv = require('dotenv')

dotenv.config()

const verifyJWT = (req, res, next) => {
    const token = req.get('Authorization')

    jwt.verify(token, jwtSecret, (error, decode) => {
        if(error) {
            return res.status(401).send({
                message: 'Error al validar el Token',
                error: error.message
            })
        }

        req.usuario = decode.usuario
        next()
    })
}

module.exports = {
    verifyJWT
}