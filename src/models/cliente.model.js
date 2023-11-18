const db = require("../configs/db.config");

class Cliente {
  constructor({
    id_clientes,
    nombre,
    a_paterno,
    a_materno,
    id_ventas,
    id_contacto,
    updated_at,
    password,
    created_at,
    deleted,
    deleted_at,
    email,
  }) {
    this.id_clientes = id_clientes;
    this.nombre = nombre;
    this.a_paterno = a_paterno;
    this.a_materno = a_materno;
    this.id_ventas = id_ventas;
    this.id_contacto = id_contacto;
    this.updated_at = updated_at;
    this.password = password;
    this.created_at = created_at;
    this.deleted = deleted;
    this.deleted_at = deleted_at;
    this.email = email;
  }

  static async getAll({ offset, limit }, { sort, order }) {
    const connection = await db.createConnection();
    let query =
      "SELECT id_clientes, email, password, deleted, created_at, updated_at, deleted_at FROM clientes WHERE deleted = 0";

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
      "SELECT id_clientes, email, password, deleted, created_at, updated_at, deleted_at FROM clientes WHERE id_clientes = ? AND deleted = 0",
      [id]
    );
    connection.end();

    if (rows.length > 0) {
      const row = rows[0];
      return new Cliente({
        id_clientes: row.id_clientes,
        email: row.email,
        password: row.password,
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
      "UPDATE clientes SET deleted = 1, deleted_at = ? WHERE id_clientes = ?",
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
      "DELETE FROM clientes WHERE id_clientes = ?",
      [id]
    );
    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se eliminó el cliente");
    }

    return;
  }

  static async updateById(id, { nombre, a_paterno, a_materno, email, password }) {
    const connection = await db.createConnection();

    const updatedAt = new Date();
    const [result] = await connection.execute(
      "UPDATE clientes SET nombre = ?, a_paterno = ?, a_materno = ?, email = ?, password = ?, updated_at = ? WHERE id_clientes = ?",
      [nombre, a_paterno, a_materno, email, password, updatedAt, id]
    );

    if (result.affectedRows == 0) {
      throw new Error("no se actualizó el cliente");
    }

    return;
  }

  static async count() {
    const connection = await db.createConnection();
    const [rows] = await connection.query(
      "SELECT COUNT(*) AS totalCount FROM clientes WHERE deleted = 0"
    );
    connection.end();

    return rows[0].totalCount;
  }

  async save() {
    const connection = await db.createConnection();

    const createdAt = new Date();
    const [result] = await connection.execute(
      "INSERT INTO clientes (nombre, a_paterno, a_materno, email, created_at, password, deleted) VALUES (?, ?, ?, ?, ?, ?, 0)",
      [
        this.nombre,
        this.a_paterno,
        this.a_materno,
        this.email,
        createdAt,
        this.password,
      ]
    );

    connection.end();

    if (result.insertId === 0) {
      throw new Error("No se insertó el cliente");
    }

    this.id = result.insertId;
    this.deleted = 0;
    this.createdAt = createdAt;
    this.updatedAt = null;
    this.deletedAt = null;

    return;
  }
}

module.exports = Cliente;
