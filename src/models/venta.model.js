const db = require("../configs/db.config");

class Venta {
  constructor({
    id_ventas,
    id_venta_producto,
    cantidad,
    total,
    subtotal,
    descuento,
    created_at,
    deleted,
    deleted_at,
    updated_at,
  }) {
    this.id_ventas = id_ventas;
    this.id_venta_producto = id_venta_producto;
    this.cantidad = cantidad;
    this.total = total;
    this.subtotal = subtotal;
    this.descuento = descuento;
    this.created_at = created_at;
    this.deleted = deleted;
    this.deleted_at = deleted_at;
    this.updated_at = updated_at;
  }

  static async getAll({ offset, limit }, { sort, order }) {
    const connection = await db.createConnection();
    let query =
      "SELECT id_ventas, id_venta_producto, cantidad, total, subtotal, descuento, deleted, created_at, updated_at, deleted_at FROM ventas WHERE deleted = 0";

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
      "SELECT id_ventas, id_venta_producto, cantidad, total, subtotal, descuento, deleted, created_at, updated_at, deleted_at FROM ventas WHERE id_ventas = ? AND deleted = 0",
      [id]
    );
    connection.end();

    if (rows.length > 0) {
      const row = rows[0];
      return new Usuario({
        id_ventas: row.id_ventas,
        id_venta_producto: row.id_venta_producto,
        cantidad: row.cantidad,
        total: row.total,
        subtotal: row.subtotal,
        descuento: row.descuento,
        deleted: row.deleted,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        deletedAt: row.deleted_at,
      });
    }

    return null;
  }

  static async deleteLogicoById(id) {
    const connection = await db.createConnection();

    const deletedAt = new Date();
    const [result] = connection.execute(
      "UPDATE ventas SET deleted = 1, deleted_at = ? WHERE id_ventas = ?",
      [deletedAt, id]
    );

    connection.end();

    if (result.affectedRows === 0) {
      throw new Error("No se pudo eliminar la venta");
    }

    return;
  }

  static async deleteFisicoById(id) {
    const connection = await db.createConnection();
    const [result] = await connection.execute(
      "DELETE FROM ventas WHERE id_ventas = ?",
      [id]
    );
    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se eliminó la venta");
    }

    return;
  }

  static async updateById(
    id,
    { id_venta_producto, cantidad, total, subtotal, descuento }
  ) {
    const connection = await db.createConnection();

    const updatedAt = new Date();
    const [result] = await connection.execute(
      "UPDATE ventas SET id_venta_producto = ?, cantidad = ?, total = ?, subtotal = ?, descuento = ?, updated_at = ? WHERE id_ventas = ?",
      [id_venta_producto, cantidad, total, subtotal, descuento, updatedAt, id]
    );

    if (result.affectedRows == 0) {
      throw new Error("no se actualizó la venta");
    }

    return;
  }

  static async count() {
    const connection = await db.createConnection();
    const [rows] = await connection.query(
      "SELECT COUNT(*) AS totalCount FROM ventas WHERE deleted = 0"
    );
    connection.end();

    return rows[0].totalCount;
  }

  async save() {
    const connection = await db.createConnection();

    const createdAt = new Date();
    const [result] = await connection.execute(
      "INSERT INTO ventas (id_venta_producto, cantidad, total, subtotal, descuento, created_at, deleted) VALUES (?, ?, ?, ?, ?, ?, 0)",
      [
        this.id_venta_producto,
        this.cantidad,
        this.total,
        this.subtotal,
        this.descuento,
        createdAt,
      ]
    );

    connection.end();

    if (result.insertId === 0) {
      throw new Error("No se insertó la venta");
    }

    this.id = result.insertId;
    this.deleted = 0;
    this.createdAt = createdAt;
    this.updatedAt = null;
    this.deletedAt = null;

    return;
  }
}

module.exports = Venta;
