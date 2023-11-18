const Venta = require("../models/venta.model");

const index = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const { sort, order } = req.query;

    const ventas = await venta.getAll({ offset, limit }, { sort, order });

    let response = {
      message: "ventas obtenidas exitosamente",
      data: ventas,
    };

    if (page && limit) {
      const totalventas = await venta.count();
      response = {
        ...response,
        total: totalventas,
        totalPages: Math.ceil(totalventas / limit),
        currentPage: page,
      };
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener las ventas",
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const idventa = req.params.id;
    const venta = await venta.getById(idventa);

    if (!venta) {
      return res.status(404).json({
        message: `no se encontró la venta con id ${idventa}`,
      });
    }

    return res.status(200).json({
      message: "venta encontrada exitosamente",
      venta,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener la venta",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const venta = new venta({
      id_venta_producto: req.body.id_venta_producto,
      cantidad: req.body.cantidad,
      total: req.body.total,
      subtotal: req.body.subtotal,
      descuento: req.body.descuento,
    });

    await venta.save();

    return res.status(200).json({
      message: "venta creada exitosamente",
      venta,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al crear la venta",
      error: error.message,
    });
  }
};


const deleteLogico = async (req, res) => {
  try {
    const idventa = req.params.id;

    await venta.deleteLogicoById(idventa);

    return res.status(200).json({
      message: "se eliminó la venta correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al eliminar la venta",
      error: error.message,
    });
  }
};

const deleteFisico = async (req, res) => {
  try {
    const idventa = req.params.id;

    await venta.deleteFisicoById(idventa);

    return res.status(200).json({
      message: "se eliminó la venta correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al eliminar la venta",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const idventa = req.params.id;
    const datosActualizar = {
        id_venta_producto: req.body.id_venta_producto,
        cantidad: req.body.cantidad,
        total: req.body.total,
        subtotal: req.body.subtotal,
        descuento: req.body.descuento,
    };

    await venta.updateById(idventa, datosActualizar);

    return res.status(200).json({
      message: "la venta se actualizó correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al actualizar la venta",
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
