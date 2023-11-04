// administrador.controller.js

const VentasModel = require('../models/ventas.model');
const { validateSaleData } = require('../middlewares/ventas.middleware');
const ventasConfig = require('../configs/ventas.config');

const ventasModel = new VentasModel();

// Controlador para obtener todas las ventas
function getAllSales(req, res) {
  ventasModel.getAllSales((error, results) => {
    if (error) {
      console.error('Error al obtener las ventas', error);
      res.status(500).json({ error: 'No se pudieron obtener las ventas' });
    } else {
      res.json(results);
    }
  });
}

// Controlador para crear una venta
function createSale(req, res) {
  // El middleware validateSaleData ya se encargó de validar los datos

  const { producto, cantidad, precio } = req.body;

  // Calcular el monto total de la venta, incluyendo impuestos si es necesario
  const totalAmount = cantidad * precio * (1 + ventasConfig.taxRate);

  // Realizar la creación de la venta en la base de datos y otros procesos relacionados con ventas
  // Por ejemplo:
  ventasModel.createSale({ producto, cantidad, precio, totalAmount }, (error, result) => {
    if (error) {
      console.error('Error al crear la venta', error);
      res.status(500).json({ error: 'No se pudo crear la venta' });
    } else {
      res.json({ message: 'Venta creada con éxito', venta: result });
    }
  });
}

module.exports = {
  getAllSales,
  createSale,
  // Otros controladores relacionados con ventas
};
