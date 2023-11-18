require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.json())

const clientesRouter = require('./src/routes/clientes.route')
const productoRouter = require('./src/routes/producto.route')
const categoriaRouter = require('./src/routes/categoria.route')
const ventaRouter = require('./src/routes/venta.route')

app.use('/clientes', clientesRouter)
app.use('/producto', productoRouter)
app.use('/categoria', categoriaRouter)
app.use('/ventas', ventaRouter)


app.listen(port, () => console.log(`API listening on port ${port}!`))