const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');

router.get('/', categoriaController.index);
router.get('/:id', categoriaController.getById);
router.post('/', categoriaController.create);
router.delete('/:id', categoriaController.delete);
router.patch('/:id', categoriaController.update);

module.exports = router;