const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/venta.controller");

router.get("/", ventaController.index);
router.get("/ganancias", ventaController.countGanancies);
router.get("/ventas", ventaController.countVentas);
router.get("/:id", ventaController.getById);
router.post("/", ventaController.create);
router.delete("/:id", ventaController.delete);
router.patch("/:id", ventaController.update);

module.exports = router;
