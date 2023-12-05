const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productos.controller');

router.get('/', productoController.index);
router.get('/totalProducts', productoController.getTotalProducts);
router.get('/deleted', productoController.getProductsDeleted);
router.get('/:id', productoController.getById);
router.post('/', productoController.create);
router.delete('/:id', productoController.delete);
router.patch('/:id', productoController.update);

module.exports = router;