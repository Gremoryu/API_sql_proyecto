const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/ventas.controller");

router.get("/", ventaController.index);
router.get("/ventasProducto/:id", ventaController.getVentasProducto);
router.get("/ganancias", ventaController.countGanancies);
router.get("/ventas", ventaController.countVentas);
router.get("/:id", ventaController.getById);
router.post("/", ventaController.createwithTransaction);
router.delete("/:id", ventaController.delete);
router.patch("/:id", ventaController.update);

module.exports = router;
