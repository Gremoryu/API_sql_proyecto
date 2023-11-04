

function validateSaleData(req, res, next) {
  const { producto, cantidad, precio } = req.body;

  if (!producto || !cantidad || !precio) {
    return res.status(400).json({ error: 'Se requieren todos los campos para crear una venta.' });
  }

  // Puedes realizar más validaciones aquí según tus requisitos

  next(); // Continuar con la siguiente función de middleware o ruta
}

module.exports = {
  validateSaleData,
};
