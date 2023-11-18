const db = require("../configs/db.config");

class Categoria {
  constructor({
    id_categoria,
    categoria,
    created_at,
    updated_at,
    deleted,
    deleted_at
  }) {
    this.id_categoria = id_categoria;
    this.categoria = categoria;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted = deleted;
    this.deleted_at = deleted_at;
  }

  static async getAll({ offset, limit }, { sort, order }) {
    const connection = await db.createConnection();
    let query =
      "SELECT id_categoria, categoria, deleted, created_at, updated_at, deleted_at FROM categoria WHERE deleted = 0";

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
      "SELECT id_categoria, categoria, deleted, created_at, updated_at, deleted_at FROM categoria WHERE id_categoria = ? AND deleted = 0",
      [id]
    );
    connection.end();

    if (rows.length > 0) {
      const row = rows[0];
      return new Usuario({
        id_categoria: row.id_categoria,
        categoria: row.categoria,
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
      "UPDATE categoria SET deleted = 1, deleted_at = ? WHERE id_categoria = ?",
      [deletedAt, id]
    );

    connection.end();

    if (result.affectedRows === 0) {
      throw new Error("No se pudo eliminar la categoria");
    }

    return;
  }

  static async deleteFisicoById(id) {
    const connection = await db.createConnection();
    const [result] = await connection.execute(
      "DELETE FROM categoria WHERE id_categoria = ?",
      [id]
    );
    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se eliminó la categoria");
    }

    return;
  }

  static async updateById(id, { categoria, a_paterno, a_materno, email, password }) {
    const connection = await db.createConnection();

    const updatedAt = new Date();
    const [result] = await connection.execute(
      "UPDATE categoria SET categoria = ?, updated_at = ? WHERE id_categoria = ?",
      [categoria, updatedAt, id]
    );

    if (result.affectedRows == 0) {
      throw new Error("no se actualizó la categoria");
    }

    return;
  }

  static async count() {
    const connection = await db.createConnection();
    const [rows] = await connection.query(
      "SELECT COUNT(*) AS totalCount FROM categoria WHERE deleted = 0"
    );
    connection.end();

    return rows[0].totalCount;
  }

  async save() {
    const connection = await db.createConnection();

    const createdAt = new Date();
    const [result] = await connection.execute(
      "INSERT INTO categoria (categoria, created_at) VALUES (?, ?)",
      [
        this.categoria,
        createdAt,
      ]
    );

    connection.end();

    if (result.insertId === 0) {
      throw new Error("No se insertó la categoria");
    }

    this.id = result.insertId;
    this.deleted = 0;
    this.createdAt = createdAt;
    this.updatedAt = null;
    this.deletedAt = null;

    return;
  }
}

module.exports = Categoria;
