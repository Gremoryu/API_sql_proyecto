const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const clienteModel = require("../models/cliente.model");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const clienteEncontrado = await clienteModel.getByEmail({ email });
    if (!clienteEncontrado) {
      return res.status(400).json({
        message: "email o password incorrecto",
      });
    }

    const passwordCorrecto = bcrypt.compareSync(
      password,
      clienteEncontrado.password
    );
    if (!passwordCorrecto) {
      return res.status(400).json({
        message: "email o password incorrecto",
      });
    }

    const payload = {
      cliente: {
        id: clienteEncontrado._id,
      },
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      message: "acceso correcto",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al validar credenciales",
      error: error.message,
    });
  }
};

module.exports = {
  login,
};
