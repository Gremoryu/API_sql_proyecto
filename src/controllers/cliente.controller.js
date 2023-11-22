const Cliente = require("../models/cliente.model");
const bcrypt = require("bcrypt");
const saltosBcrypt = parseInt(process.env.SALTOS);
const db = require("../configs/db.config");

const index = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const { sort, order } = req.query;

    const clientes = await Cliente.getAll({ offset, limit }, { sort, order });

    let response = {
      message: "Clientes obtenidos exitosamente",
      data: clientes,
    };

    if (page && limit) {
      const totalclientes = await Cliente.count();
      response = {
        ...response,
        total: totalclientes,
        totalPages: Math.ceil(totalclientes / limit),
        currentPage: page,
      };
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener los clientes",
      error: error.message,
    });
  }
};



const createwithTransaction = async (req, res) => {
  const connection = await db.createConnection();

  try {
    await connection.beginTransaction();

    const cliente = new Cliente({
      nombre: req.body.nombre,
      apellido_paterno: req.body.apellido_paterno,
      apellido_materno: req.body.apellido_materno,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltosBcrypt),
    });

    const id = await cliente.savewithTransaction(connection);

    for (c of req.body.contacto) {
      const contacto = new Contacto({ id, ...c });
      await contacto.savewithTransaction(connection);
    }

    await connection.commit();

    return res.status(200).json({
      message: "Registro exitoso",
      cliente,
    });
  } catch (error) {

    await connection.rollback();
    return res.status(500).json({
      message: "ocurrió un error al crear el Cliente",
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const idCliente = req.params.id;

    const cliente = await Cliente.getById(idCliente);

    return res.status(200).json({
      message: "Cliente obtenido exitosamente",
      data: cliente,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener el Cliente",
      error: error.message,
    });
  }
}

const deleteLogico = async (req, res) => {
  try {
    const idCliente = req.params.id;

    await Cliente.deleteLogicoById(idCliente);

    return res.status(200).json({
      message: "se eliminó el Cliente correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al eliminar el Cliente",
      error: error.message,
    });
  }
};

const deleteFisico = async (req, res) => {
  try {
    const idCliente = req.params.id;

    await Cliente.deleteFisicoById(idCliente);

    return res.status(200).json({
      message: "se eliminó el Cliente correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al eliminar el Cliente",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const idCliente = req.params.id;
    const datosActualizar = {
      nombre: req.body.nombre,
      a_paterno: req.body.a_paterno,
      a_materno: req.body.a_materno,  
      email: req.body.email,
      password: req.body.password,
    };

    await Cliente.updateById(idCliente, datosActualizar);

    return res.status(200).json({
      message: "el Cliente se actualizó correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al actualizar el Cliente",
      error: error.message,
    });
  }
};

module.exports = {
  index,
  createwithTransaction,
  delete: deleteLogico,
  update,
};
