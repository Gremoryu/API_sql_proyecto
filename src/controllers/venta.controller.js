const Venta = require("../models/venta.model");
const VentaProducto = require("../models/venta_producto.model");

const index = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const { sort, order } = req.query;

    const ventas = await Venta.getAll({ offset, limit }, { sort, order });

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
    const venta = await Venta.getById(idventa);

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
    const venta = new Venta({
      cantidad: req.body.cantidad,
      total: req.body.total,
      subtotal: req.body.subtotal,
      descuento: req.body.descuento,
    });

    const id_venta = await venta.save();

    for(venta_p of req.body.venta_producto){
      const venta_producto = new VentaProducto({id_venta, ...venta_p});
      await venta_producto.save();
    }

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

    await Venta.deleteLogicoById(idventa);

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

const countGanancies = async (req, res) => {
  try {
    const totalganancias = await Venta.countGanancies();

    return res.status(200).json({
      message: "total de ganancias obtenidas exitosamente",
      total: totalganancias,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener el total de ganancias",
      error: error.message,
    });
  }
}

const countVentas = async (req, res) => {
  try {
    const totalventas = await Venta.countVentas();

    return res.status(200).json({
      message: "total de ventas obtenidas exitosamente",
      total: totalventas,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener el total de ventas",
      error: error.message,
    });
  }
}

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
  countGanancies,
  countVentas,
};
