const express = require('express')
const router = express.Router()
const clientesController = require('../controllers/clientes.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const authController = require('../controllers/auth.controller')

router.get('/login', authController.login)
router.get('/', authMiddleware.verifyJWT, clientesController.index)