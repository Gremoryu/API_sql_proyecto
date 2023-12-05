require('dotenv').config();
const bcrypt = require('bcrypt');
const saltos = parseInt(process.env.SALTOS);

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */
exports.seed = async function (knex) {
  await knex('clientes').del();
  await knex('contactos').del();
  await knex('contactos').insert([
    {
        id: 1,
        numero_tel: '1234567890',
        direccion: 'Calle 1',
        deleted: 0,
    },
    {
        id: 2,
        numero_tel: '0987654321',
        direccion: 'Calle 2',
        deleted: 0,
    }
    ]);
  await knex('clientes').insert([
    {
      nombre: 'Juan',
      apellido_paterno: 'Perez',
      apellido_materno: 'Gomez',
      email: 'c1@gmail.com',
        password: bcrypt.hashSync('123456', saltos),
        id_contacto: 1,
        deleted: 0,
    },
    {
        nombre: 'Maria',
        apellido_paterno: 'Gomez',
        apellido_materno: 'Perez',
        email: 'c2@gmail.com',
        password: bcrypt.hashSync('1234567', saltos),
        id_contacto: 2,
        deleted: 0,
    }
    ]);
}

