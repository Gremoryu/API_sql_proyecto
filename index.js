require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT

app.use(express.json())

app.use(cors());

const clientesRouter = require('./src/routes/clientes.route')
const productoRouter = require('./src/routes/productos.route')
const categoriaRouter = require('./src/routes/categorias.route')
const ventaRouter = require('./src/routes/ventas.route')

app.use('/clientes', clientesRouter)
app.use('/productos', productoRouter)
app.use('/categorias', categoriaRouter)
app.use('/ventas', ventaRouter)


app.listen(port, () => console.log(`API listening on port ${port}!`))