const db = require("../configs/db.config");

class Categoria {
  constructor({
    id,
    categoria,
    created_at,
    updated_at,
    deleted,
    deleted_at
  }) {
    this.id = id;
    this.categoria = categoria;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted = deleted;
    this.deleted_at = deleted_at;
  }

  static async getAll({ offset, limit }, { sort, order }) {
    const connection = await db.createConnection();
    let query =
      "SELECT id, categoria, deleted, created_at, updated_at, deleted_at FROM categorias WHERE deleted = 0";

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
      "SELECT id, categoria, deleted, created_at, updated_at, deleted_at FROM categorias WHERE id = ? AND deleted = 0",
      [id]
    );
    connection.end();

    if (rows.length > 0) {
      const row = rows[0];
      return new Usuario({
        id: row.id,
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
      "UPDATE categorias SET deleted = 1, deleted_at = ? WHERE id = ?",
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
      "DELETE FROM categorias WHERE id = ?",
      [id]
    );
    connection.end();

    if (result.affectedRows == 0) {
      throw new Error("no se eliminó la categoria");
    }

    return;
  }

  static async updateById(id, { categoria }) {
    const connection = await db.createConnection();

    const updatedAt = new Date();
    const query = "UPDATE categorias SET categoria = ?, updated_at = ? WHERE id = ?";
    const [result] = await connection.execute(
      query,
      [categoria, updatedAt, id]
    );
    const [trigger] = await connection.query(
      "CREATE TRIGGER update_categoria BEFORE UPDATE ON categorias FOR EACH ROW SET NEW.updated_at = NOW();"
    );

    if (result.affectedRows == 0 && trigger.affectedRows == 0) {
      throw new Error("no se actualizó la categoria");
    }

    return;
  }

  static async count() {
    const connection = await db.createConnection();
    const [rows] = await connection.query(
      "SELECT COUNT(*) AS totalCount FROM categorias WHERE deleted = 0"
    );
    connection.end();

    return rows[0].totalCount;
  }

  async save() {
    const connection = await db.createConnection();

    const createdAt = new Date();
    const [result] = await connection.execute(
      "INSERT INTO categorias (categoria, created_at, deleted) VALUES (?, ?, 0)",
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
