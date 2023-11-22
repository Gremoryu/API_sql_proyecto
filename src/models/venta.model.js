const db = require("../configs/db.config");

class Venta {
  constructor({
    id,
    cantidad,
    total,
    subtotal,
    descuento,
    created_at,
    deleted,
    deleted_at,
    updated_at,
  }) {
    this.id = id;
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
      "SELECT id, cantidad, total, subtotal, descuento, deleted, created_at, updated_at, deleted_at FROM ventas WHERE deleted = 0";

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
      "SELECT id, cantidad, total, subtotal, descuento, deleted, created_at, updated_at, deleted_at FROM ventas WHERE id = ? AND deleted = 0",
      [id]
    );
    connection.end();

    if (rows.length > 0) {
      const row = rows[0];
      return new Usuario({
        id: row.id,
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
      "UPDATE ventas SET deleted = 1, deleted_at = ? WHERE id = ?",
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
      "DELETE FROM ventas WHERE id = ?",
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
    { cantidad, total, subtotal, descuento }
  ) {
    const connection = await db.createConnection();

    const updatedAt = new Date();
    const [result] = await connection.execute(
      "UPDATE ventas SET cantidad = ?, total = ?, subtotal = ?, descuento = ?, updated_at = ? WHERE id = ?",
      [cantidad, total, subtotal, descuento, updatedAt, id]
    );

    if (result.affectedRows == 0) {
      throw new Error("no se actualizó la venta");
    }

    return;
  }

  static async countGanancies() {
    const connection = await db.createConnection();
    const [rows] = await connection.query(
      "SELECT SUM(total) AS totalGanancias FROM ventas WHERE deleted = 0"
    );
    connection.end();

    return rows[0].totalGanancias;
  }

  static async countVentas() {
    const connection = await db.createConnection();
    const [rows] = await connection.query(
      "SELECT SUM(cantidad) AS totalCount FROM ventas WHERE deleted = 0"
    );
    connection.end();

    return rows[0].totalCount;
  }

  async save() {
    const connection = await db.createConnection();

    const createdAt = new Date();
    const [result] = await connection.execute(
      "INSERT INTO ventas (cantidad, total, subtotal, descuento, created_at, deleted) VALUES ( ?, ?, ?, ?, ?, 0)",
      [
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

    return this.id;
  }
}

module.exports = Venta;
