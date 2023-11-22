const db = require("../configs/db.config");

class Producto {
  constructor({
    id,
    nombre,
    descripcion,
    id_categoria,
    precio,
    cantidad_disponible,
    url_img,
    rating,
    id_color,
    talla,
    created_at,
    deleted,
    deleted_at,
    updated_at,
  }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.id_categoria = id_categoria;
    this.precio = precio;
    this.cantidad_disponible = cantidad_disponible;
    this.url_img = url_img;
    this.rating = rating;
    this.id_color = id_color;
    this.talla = talla;
    this.created_at = created_at;
    this.deleted = deleted;
    this.deleted_at = deleted_at;
    this.updated_at = updated_at;
  }

  static async getAll({ offset, limit }, { sort, order }) {
    const connection = await db.createConnection();
    let query =
      "SELECT id, nombre, descripcion, id_categoria, precio, cantidad_disponible, url_img, rating, id_color, talla,  created_at, deleted, deleted_at, updated_at FROM productos WHERE deleted = 0";

    if (sort && order) {
      query += ` ORDER BY ${sort} ${order}`;
    }

    if (offset >= 0 && limit) {
      query += ` LIMIT ${offset}, ${limit}`;
    }

    const [rows] = await connection.query(query);
    connection.end();

    return rows;
  }

  static async getById(id) {
    const connection = await db.createConnection();
    const [rows] = await connection.execute(
      "SELECT id, nombre, descripcion, id_categoria, precio, cantidad_disponible, url_img, rating, id_color, talla,  created_at, deleted, deleted_at, updated_at FROM productos WHERE id = ? AND deleted = 0",
      [id]
    );
    connection.end();

    if (rows.length > 0) {
      const row = rows[0];
      return new Producto({
        id: row.id,
        nombre: row.nombre,
        descripcion: row.descripcion,
        id_categoria: row.id_categoria,
        precio: row.precio,
        cantidad_disponible: row.cantidad_disponible,
        url_img: row.url_img,
        rating: row.rating,
        id_color: row.id_color,
        talla: row.talla,
        createdAt: row.created_at,
        deleted: row.deleted,
        deletedAt: row.deleted_at,
        updatedAt: row.updated_at,
      });
    }

    return null;
  }

  static async deleteLogicoById(id) {
    const connection = await db.createConnection();

    const deletedAt = new Date();
    const [result] = await connection.execute(
      "UPDATE productos SET deleted = 1, deleted_at = ? WHERE id = ?",
      [deletedAt, id]
    );

    connection.end();

    if (result.affectedRows === 0) {
      throw new Error("No se pudo eliminar el producto");
    }

    return result.affectedRows;
  }

  static async deleteFisicoById(id) {
    const connection = await db.createConnection();
    const [result] = await connection.execute(
      "DELETE FROM productos WHERE id = ?",
      [id]
    );
    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se eliminó el producto");
    }

    return;
  }

  static async updateById(id, datosActualizar) {
    const connection = await db.createConnection();

    const fieldsToUpdate = Object.keys(datosActualizar).map(key => `${key} = ?`).join(', ');
    const valuesToUpdate = Object.values(datosActualizar);

    const updated_at = new Date();
    valuesToUpdate.push(updated_at);

    const [result] = await connection.execute(
    `UPDATE productos SET ${fieldsToUpdate}, updated_at = ? WHERE id = ?`,
      [
        ...valuesToUpdate,
        id,
      ]
    );

    if (result.affectedRows == 0) {
      throw new Error("no se actualizó el producto");
    }

    return result.affectedRows;
  }

  static async count() {
    const connection = await db.createConnection();
    const [rows] = await connection.query(
      "SELECT COUNT(*) AS totalCount FROM productos WHERE deleted = 0"
    );
    connection.end();

    return rows[0].totalCount;
  }

  async save() {
    const connection = await db.createConnection();

    const createdAt = new Date();
    const [result] = await connection.execute(
      "INSERT INTO productos (nombre, descripcion, id_categoria, precio, cantidad_disponible, url_img, rating, id_color, talla, created_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)",
      [
        this.nombre,
        this.descripcion,
        this.id_categoria,
        this.precio,
        this.cantidad_disponible,
        this.url_img,
        this.rating,
        this.id_color,
        this.talla,
        createdAt,
      ]
    );

    connection.end();

    if (result.insertId === 0) {
      throw new Error("No se insertó el producto");
    }

    this.id = result.insertId;
    this.deleted = 0;
    this.createdAt = createdAt;
    this.updatedAt = null;
    this.deletedAt = null;

    return;
  }
}

module.exports = Producto;
