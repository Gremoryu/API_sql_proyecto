const bcrypt = require('bcrypt')
const jwtToken = process.env.JWTSECRET
const db = require('../configs/db.config')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [usuarioEncontrado] = await db.execute('SELECT * FROM clientes WHERE email = ?', [email]);

        if (usuarioEncontrado.length === 0 || !bcrypt.compareSync(password, usuarioEncontrado[0].password)) {
            return res.status(400).json({
                message: 'Email o contraseña incorrectos'
            });
        }

        const payload = {
            usuario: {
                id: usuarioEncontrado[0].id
            }
        };

        const token = jwt.sign(payload, jwtToken, { expiresIn: '2h' });

        return res.status(200).json({
            message: 'Acceso validado',
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Fallo al validar las credenciales',
            error: error.message
        })
    }
}

module.exports = {
    login
}