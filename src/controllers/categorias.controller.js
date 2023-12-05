const Categoria = require("../models/categoria.model");

const index = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const { sort, order } = req.query;

    const Categorias = await Categoria.getAll({ offset, limit }, { sort, order });

    let response = {
      message: "Categorias obtenidas exitosamente",
      data: Categorias,
    };

    if (page && limit) {
      const totalCategorias = await Categoria.count();
      response = {
        ...response,
        total: totalCategorias,
        totalPages: Math.ceil(totalCategorias / limit),
        currentPage: page,
      };
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener las Categorias",
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const idCategoria = req.params.id;
    const Categoria = await Categoria.getById(idCategoria);

    if (!Categoria) {
      return res.status(404).json({
        message: `no se encontró el Categoria con id ${idCategoria}`,
      });
    }

    return res.status(200).json({
      message: "Categoria encontrada exitosamente",
      Categoria,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al obtener el Categoria",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const Categoria = new Categoria({
      categoria: req.body.categoria
    });

    await Categoria.save();

    return res.status(200).json({
      message: "Categoria creado exitosamente",
      Categoria,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al crear la Categoria",
      error: error.message,
    });
  }
};

const deletelogico = async (req, res) => {
  try {
    const idCategoria = req.params.id;

    await Categoria.deleteLogicoById(idCategoria);

    return res.status(200).json({
      message: "se eliminó la Categoria correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al eliminar la Categoria",
      error: error.message,
    });
  }
};

const deleteFisico = async (req, res) => {
  try {
    const idCategoria = req.params.id;

    await Categoria.deleteFisicoById(idCategoria);

    return res.status(200).json({
      message: "se eliminó el Categoria correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al eliminar el Categoria",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const idCategoria = req.params.id;
    const datosActualizar = {
      categoria: req.body.categoria
    };

    await Categoria.updateById(idCategoria, datosActualizar);

    return res.status(200).json({
      message: "el Categoria se actualizó correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al actualizar el Categoria",
      error: error.message,
    });
  }
};

module.exports = {
  index,
  getById,
  create,
  delete: deletelogico,
  update,
};
