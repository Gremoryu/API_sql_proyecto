const db = require("../configs/db.config");
const bcrypt = require("bcrypt");
const saltos = process.env.SALTOS;

const index = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit || 0;

    const sql = `SELECT * FROM clientes WHERE deleted = 0 OR deleted IS NULL LIMIT ?, ?`;

    const [clientes] = await db.execute(sql, [skip, limit]);

    return res.status(200).json({
      message: "Se consiguieron los clientes correctamente",
      clientes: clientes[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const cliente_id = req.params.id;
    const cliente = await db.execute(
      `SELECT * FROM clientes WHERE id_clientes =? `,
      [cliente_id]
    );

    return res.status(200).json({
      message: "Cliente obtenido",
      cliente: cliente[0],
    });
  } catch (error) {
    return res.status(406).json({
      message: "Error al obtener al cliente",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { nombre, a_paterno, a_materno, email } = req.body;
    const deleted = "0";
    const password = bcrypt.hashSync(req.body.password, saltos);
    const date = new Date();

    try {
      await db.execute(
        `INSERT INTO clientes (nombre, a_paterno, a_materno, password, email, deleted, created_at values (?,?,?,?,?,?,?)`,
        [nombre, a_paterno, a_materno, password, email, deleted, date]
      );

      return res.status(201).json({
        message: "Cliente registrado correctamente",
      });
    } catch (error) {
      return res.status(406).json({
        message: "Fallo al registrar el cliente",
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error con el servidor",
      error: error.message,
    });
  }
};

const updateParcial = async (req, res) => {
  try {
    const cliente_id = req.params.id;
    const { nombre, a_paterno, a_materno, email } = req.body;
    const date = new Date();

    if (nombre)
      db.execute(
        `UPDATE clientes SET nombre = ?, updated_at = ? WHERE id_clientes = ?`,
        [nombre, date, cliente_id]
      );
    if (a_paterno)
      db.execute(
        `UPDATE clientes SET a_paterno = ?, updated_at = ? WHERE id_clientes = ?`,
        [a_paterno, date, cliente_id]
      );
    if (a_materno)
      db.execute(
        `UPDATE clientes SET a_materno = ?, updated_at = ? WHERE id_clientes = ?`,
        [a_materno, date, cliente_id]
      );
    if (email)
      db.execute(
        `UPDATE clientes SET email = ?, updated_at = ? WHERE id_clientes = ?`,
        [email, date, cliente_id]
      );

    return res.status(200).json({
      message: "Cliente actualizado correctamente",
    });
  } catch (error) {
    return res.status(406).json({
      message: "Fallo al intentar actualizar el cliente",
      error: error.message,
    });
  }
};

const updateTotal = async (req, res) => {
  try {
    const cliente_id = req.params.id;
    const { nombre, a_paterno, a_materno, email } = req.body;
    const date = new Date();

    await db.execute(
      `UPDATE clientes SET nombre = ?, a_paterno = ?, a_materno = ?, email = ?, updated_at = ? WHERE id_clientes = ?`,
      [
        nombre || null,
        a_paterno || null,
        a_materno || null,
        email || null,
        date,
        cliente_id,
      ]
    );

    return res.status(200).json({
      message: "Cliente actualizado correctamente",
    });
  } catch (error) {
    return res.status(406).json({
      message: "Fallo al intentar actualizar el cliente",
      error: error.message,
    });
  }
};

const deleteLogico = async (req, res) => {
    try {
        const cliente_id = req.params.id
        const date = new Date()

        const query = `UPDATE clientes SET deleted = 1, deleted_at = ? WHERE id_clientes = ?`

        await db.execute(query, [date, cliente_id])

        return res.status(200).json({
            message: 'Cliente eliminado correctamente'
        })
    } catch (error) {
        return res.status(406).json({
            message: 'Fallo al eliminar el cliente',
            error: error.message
        })
    }
}

const deleteFisico = async (req, res) => {
    try {
        const cliente_id = req.params.id

        const query = `DELETE FROM clientes WHERE id_clientes = ?`
        
        await db.execute(query, [cliente_id])

        return res.status(200).json({
            message: 'Cliente eliminado permanentemente'
        })
    } catch (error) {
        return res.status(406).json({
            message: 'Fallo al eliminar el cliente',
            error: error.message
        })
    }
}

module.exports = {
    index,
    getById,
    create,
    delete: deleteLogico,
    updateParcial,
    updateTotal,
}