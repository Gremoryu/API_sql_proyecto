// ventas.model.js

const db = require('../db'); // Importa la conexión a la base de datos desde tu archivo db.js

class VentasModel {
  constructor() {
    this.tableName = 'ventas'; // Nombre de la tabla de ventas en la base de datos
  }

  // Método para obtener todas las ventas
  getAllSales(callback) {
    const query = `SELECT * FROM ${this.tableName}`;
    db.query(query, callback);
  }

  // Otros métodos para interactuar con la tabla de ventas, como insertar, actualizar o eliminar registros
}

module.exports = VentasModel;
