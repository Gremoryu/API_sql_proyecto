const Cliente = require("../models/cliente.model");
const bcrypt = require("bcrypt");
const saltosBcrypt = parseInt(process.env.SALTOS);

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

const getById = async (req, res) => {
  try {
    const idCliente = req.params.id;
    const cliente = await Cliente.getById(idCliente);

    if (!cliente) {
      return res.status(404).json({
        message: `no se encontró el Cliente con id ${idCliente}`,
      });
    }

    return res.status(200).json({
      message: "Cliente encontrado exitosamente",
      cliente,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener el Cliente",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const cliente = new Cliente({
      nombre: req.body.nombre,
      a_paterno: req.body.a_p,
      a_materno: req.body.a_m,
      email: req.body.email,
      password: req.body.password,
    });

    await cliente.save();

    return res.status(200).json({
      message: "Cliente creado exitosamente",
      cliente,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al crear el Cliente",
      error: error.message,
    });
  }
};


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
  getById,
  create,
  delete: deleteLogico,
  update,
};
