const db = require("../configs/db");

class VentaProducto {
  constructor({
    id,
    id_producto,
    cantidad,
    precio,
    subtotal,
    descuento,
    created_at,
    deleted,
    deleted_at,
    updated_at,
  }) {
    this.id = id;
    this.id_producto = id_producto;
    this.cantidad = cantidad;
    this.precio = precio;
    this.subtotal = subtotal;
    this.descuento = descuento;
    this.created_at = created_at;
    this.deleted = deleted;
    this.deleted_at = deleted_at;
    this.updated_at = updated_at;
  }

  static async getById(id) {
    const connection = await db.createConnection();
    const [rows] = await connection.execute(
      "SELECT id, id_producto, cantidad, precio, subtotal, descuento, created_at, deleted, deleted_at, updated_at FROM venta_producto WHERE id = ? AND deleted = 0",
      [id]
    );
    connection.end();

    if (rows.length > 0) {
      const row = rows[0];
      return new VentaProducto(row);
    }

    throw new Error("no existe la venta");
  }
  static async savewithTransaction(connection, ventaProducto) {
    const created_at = new Date();
    const [result] = await connection.execute(
      "INSERT INTO venta_producto (cantidad, precio, subtotal, descuento, created_at) VALUES (?, ?, ?, ?, ?)",
      [this.cantidad, this.precio, this.subtotal, this.descuento, created_at]
    );

    if (result.affectedRows == 0) {
      throw new Error("no se creó la venta");
    }

    return result.insertId;
  }

  static async deleteLogicoById(id) {
    const connection = await db.createConnection();
    const deleted_at = new Date();
    const [result] = await connection.execute(
      "UPDATE venta_producto SET deleted = 1, deleted_at = ? WHERE id = ?",
      [deleted_at, id]
    );
    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se eliminó la venta");
    }

    return;
  }

  static async deleteFisicoById(id) {
    const connection = await db.createConnection();
    const [result] = await connection.execute(
      "DELETE FROM venta_producto WHERE id = ?",
      [id]
    );
    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se eliminó la venta");
    }

    return;
  }

  static async updatebyId(id, { cantidad, precio, subtotal, descuento}) {
    const connection = await db.createConnection();

    const updated_at = new Date();
    const [result] = await connection.execute(
      "UPDATE venta_producto SET cantidad = ?, precio = ?, subtotal = ?, descuento = ?, updated_at = ? WHERE id = ?",
      [
        this.cantidad,
        this.precio,
        this.subtotal,
        this.descuento,
        updated_at,
        id,
      ]
    );
    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se actualizó la venta");
    }

    return;
  }
}

module.exports = VentaProducto;
