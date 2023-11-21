const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/cliente.controller');

router.get('/', clientesController.index);
router.get('/:id', clientesController.getById);
router.post('/', clientesController.createwithTransaction);
router.delete('/:id', clientesController.delete);
router.patch('/:id', clientesController.update);

module.exports = router;