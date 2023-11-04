const db = require('../configs/db.config')
const bcrypt = require('bcrypt')

const clientes = [
    {
        nombre: 'Angel',
        a_paterno: 'asd',
        a_materno: 'sdasd',
        email: 'asd234',
        password: bcrypt.hashSync('Angel', 12)
    },
    {
        nombre: 'Daniel',
        a_paterno: 'asd',
        a_materno: 'ssdasd',
        email: 'asd231234',
        password: bcrypt.hashSync('Daniel', 12)
    },
    {
        nombre: 'Erick',
        a_paterno: 'azxced',
        a_materno: 'sdaqwesd',
        email: 'asd20.1234',
        password: bcrypt.hashSync('Erick', 12)
    },
    {
        nombre: 'Diana',
        a_paterno: 'zxcnasd',
        a_materno: 'snbvdasd',
        email: 'asd23plm4',
        password: bcrypt.hashSync('Diana', 12)
    },
]

const insertarClientes = () => {
    const query = 'INSERT INTO clientes (nombre, a_paterno, a_materno, email, password) values (?,?,?,?,?)'

    clientes.map(cliente => {
        db.execute(query, [cliente.nombre, cliente.a_paterno, cliente.a_materno, cliente.email, cliente.password])
    })
}

insertarClientes()