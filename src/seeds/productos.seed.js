require("dotenv").config();

/**
 * @param {import('knex').Knex} knex
 * @returns {Promise<void>}
 */

exports.seed = async function (knex) {
    
    await knex("venta_producto").del();
  await knex("productos").del();

  await knex("categorias").del();

  await knex("categorias").insert([
    {
      id: 1,
      categoria: "Ropa",
      deleted: 0,
    },
    {
      id: 2,
      categoria: "Zapatos",
      deleted: 0,
    },
    {
      id: 3,
      categoria: "Accesorios",
      deleted: 0,
    },
  ]);
  await knex("colores").del();
  await knex("colores").insert([
    {
      id: 1,
      color: "Rojo",
      deleted: 0,
    },
    {
      id: 2,
      color: "Azul",
      deleted: 0,
    },
    {
      id: 3,
      color: "Verde",
      deleted: 0,
    },
  ]);
  await knex("productos").insert([
    {
      nombre: "Playera",
      descripcion: "Playera de algodon",
      id_categoria: 1,
      precio: 100,
      cantidad_disponible: 10,
      url_img:
        "https://i.pinimg.com/originals/9e/9f/4a/9e9f4a8a2c8b3d5c1d8e0d1c3b4f9f3f.jpg",
      rating: 4,
      id_color: 1,
      talla: "M",
      deleted: 0,
    },
    {
      nombre: "Jeans",
      descripcion: "Jeans de mezclilla",
      id_categoria: 1,
      precio: 200,
      cantidad_disponible: 5,
      url_img:
        "https://i.pinimg.com/originals/9e/9f/4a/9e9f4a8a2c8b3d5c1d8e0d1c3b4f9f3f.jpg",
      rating: 5,
      id_color: 2,
      talla: "32",
      deleted: 0,
    },
    {
      nombre: "Tenis",
      descripcion: "Tenis de tela",
      id_categoria: 2,
      precio: 300,
      cantidad_disponible: 15,
      url_img:
        "https://i.pinimg.com/originals/9e/9f/4a/9e9f4a8a2c8b3d5c1d8e0d1c3b4f9f3f.jpg",
      rating: 3,
      id_color: 3,
      talla: "8",
      deleted: 0,
    },
    {
      nombre: "Reloj",
      descripcion: "Reloj de acero",
      id_categoria: 3,
      precio: 400,
      cantidad_disponible: 20,
      url_img:
        "https://i.pinimg.com/originals/9e/9f/4a/9e9f4a8a2c8b3d5c1d8e0d1c3b4f9f3f.jpg",
      rating: 2,
      id_color: 1,
      talla: "N/A",
      deleted: 0,
    },
  ]);
};
