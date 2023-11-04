// ventasSeeder.js

const db = require('./db');

// Datos de ventas ficticios
const ventasData = [
  { producto: 'Producto 1', cantidad: 5, precio: 50.0 },
  { producto: 'Producto 2', cantidad: 3, precio: 30.0 },
  { producto: 'Producto 3', cantidad: 2, precio: 25.0 },
];

// Inserta los datos en la tabla 'ventas'
ventasData.forEach((venta) => {
  const query = 'INSERT INTO ventas (producto, cantidad, precio) VALUES (?, ?, ?)';
  const values = [venta.producto, venta.cantidad, venta.precio];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al insertar datos de venta', error);
    } else {
      console.log('Datos de venta insertados con éxito');
    }
  });
});
