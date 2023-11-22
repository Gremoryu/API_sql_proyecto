const db = require("../configs/db.config");

class Cliente {
  constructor({
    id,
    nombre,
    apellido_paterno,
    apellido_materno,
    id_venta,
    id_contacto,
    updated_at,
    password,
    created_at,
    deleted,
    deleted_at,
    email,
  }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido_paterno = apellido_paterno;
    this.apellido_materno = apellido_materno;
    this.id_venta = id_venta;
    this.id_contacto = id_contacto;
    this.updated_at = updated_at;
    this.password = password;
    this.created_at = created_at;
    this.deleted = deleted;
    this.deleted_at = deleted_at;
    this.email = email;
  }

  static async getById(id) {
    const connection = await db.createConnection();
    const [rows] = await connection.execute(
      "SELECT id, nombre, apellido_paterno, apellido_materno, id_venta, id_contacto, updated_at, created_at, deleted, deleted_at, email FROM clientes WHERE id = ? AND deleted = 0",
      [id]
    );
    connection.end();

    if (rows.length > 0) {
      const row = rows[0];
      return new Cliente(row);
    }

  }


  static async getByEmail(email) {
    const connection = await db.createConnection()
    const query = 'SELECT id, email, password, deleted, created_at, updated_at, deleted_at FROM clientes WHERE email = ? AND deleted = 0'
    const [rows] = await connection.execute(query, [email])

    connection.end()

    if (rows.length > 0) {
      const row = rows[0];
      return new Cliente({
        email: row.email,
        password: row.password,
        apellido_paterno: row.apellido_paterno,
        apellido_materno: row.apellido_materno,
        id_venta: row.id_venta,
        id_contacto: row.id_contacto,
        deleted: row.deleted,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        deletedAt: row.deleted_at,
      });
    }
  }

  static async deleteLogicoById(id) {
    const connection = await db.createConnection();

    const deletedAt = new Date();
    const [result] = connection.execute(
      "UPDATE clientes SET deleted = 1, deleted_at = ? WHERE id = ?",
      [deletedAt, id]
    );

    connection.end();

    if (result.affectedRows === 0) {
      throw new Error("No se pudo eliminar el cliente");
    }

    return;
  }

  static async deleteFisicoById(id) {
    const connection = await db.createConnection();
    const [result] = await connection.execute(
      "DELETE FROM clientes WHERE id = ?",
      [id]
    );
    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se eliminó el cliente");
    }

    return;
  }

  static async updateById(id, { nombre, apellido_paterno, apellido_materno, email, password }) {
    const connection = await db.createConnection();

    const updatedAt = new Date();
    const [result] = await connection.execute(
      "UPDATE clientes SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, email = ?, password = ?, updated_at = ? WHERE id = ?",
      [nombre, apellido_paterno, apellido_materno, email, password, updatedAt, id]
    );

    if (result.affectedRows == 0) {
      throw new Error("no se actualizó el cliente");
    }

    return;
  }

  static async savewithTransaction(connection) {

    const createdAt = new Date();
    const [result] = await connection.execute(
      "INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, email, created_at, password, deleted) VALUES (?, ?, ?, ?, ?, ?, 0)",
      [
        this.nombre,
        this.apellido_paterno,
        this.apellido_materno,
        this.email,
        createdAt,
        this.password,
      ]
    );

    if (result.insertId === 0) {
      throw new Error("No se insertó el cliente");
    }

    return result.insertId;
  }
}

module.exports = Cliente;
