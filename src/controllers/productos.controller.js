const Producto = require("../models/producto.model");

const index = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const { sort, order } = req.query;

    const productos = await Producto.getAll({ offset, limit }, { sort, order });

    let response = {
      message: "productos obtenidos exitosamente",
      data: productos,
    };

    if (page && limit) {
      const totalproductos = await Producto.count();
      response = {
        ...response,
        total: totalproductos,
        totalPages: Math.ceil(totalproductos / limit),
        currentPage: page,
      };
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener los productos",
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const idProducto = req.params.id;
    const Producto = await Producto.getById(idProducto);

    if (!Producto) {
      return res.status(404).json({
        message: `no se encontró el Producto con id ${idProducto}`,
      });
    }

    return res.status(200).json({
      message: "Producto encontrado exitosamente",
      Producto,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener el Producto",
      error: error.message,
    });
  }
};

const getProductsDeleted = async (req, res) => {
  try {
    const productos = await Producto.getAllDeleted();

    let response = {
      message: "productos obtenidos exitosamente",
      data: productos,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener los productos",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const producto = new Producto({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      id_categoria: req.body.id_categoria,
      precio: req.body.precio,
      cantidad_disponible: req.body.cantidad_disponible,
      url_img: req.body.url_img,
      rating: req.body.rating,
      id_color: req.body.id_color,
      talla: req.body.talla,
    });

    await producto.save();

    return res.status(200).json({
      message: "Producto creado exitosamente",
      producto,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al crear el Producto",
      error: error.message,
    });
  }
};

const getTotalProducts = async (req, res) => {
  try {
    const totalProductos = await Producto.countProducts();

    return res.status(200).json({
      message: "total de productos obtenido exitosamente",
      totalProductos,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener el total de productos",
      error: error.message,
    });
  }
}

const deleteLogico = async (req, res) => {
  try {
    const idProducto = req.params.id;

    await Producto.deleteLogicoById(idProducto);

    return res.status(200).json({
      message: "se eliminó el Producto correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al eliminar el Producto",
      error: error.message,
    });
  }
};

const deleteFisico = async (req, res) => {
  try {
    const idProducto = req.params.id;

    await Producto.deleteFisicoById(idProducto);

    return res.status(200).json({
      message: "se eliminó el Producto permanentemente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al eliminar el Producto",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const idProducto = req.params.id;
    const datosActualizar = {
      ...req.body,
    };

    const affectedRows = await Producto.updateById(idProducto, datosActualizar);

    if (affectedRows > 0) {
      return res.status(200).json({
        message: "el Producto se actualizó correctamente",
      });
    } else {
      return res.status(404).json({
        message: `no se encontró el Producto con id ${idProducto}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al actualizar el Producto",
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
  getProductsDeleted,
  getTotalProducts
};
