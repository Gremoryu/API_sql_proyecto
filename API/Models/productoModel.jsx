
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;