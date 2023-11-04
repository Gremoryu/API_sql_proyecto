// administrador.route.js

const express = require('express');
const router = express.Router();
const db = require('../db'); // Importa el módulo que contiene la conexión a la base de datos

// Ruta para obtener todas las ventas
router.get('/ventas', (req, res) => {
  db.query('SELECT * FROM ventas', (error, results) => {
    if (error) {
      console.error('Error al obtener las ventas', error);
      res.status(500).json({ error: 'No se pudieron obtener las ventas' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
