const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');

router.get('/:id', clientesController.getContactoById);
router.post('/', clientesController.createwithTransaction);
router.delete('/:id', clientesController.delete);
router.patch('/:id', clientesController.update);

module.exports = router;