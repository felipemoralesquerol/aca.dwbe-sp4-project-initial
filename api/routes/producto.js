const express = require("express");
let router = express.Router();

const productoController = require("../controllers/productoController");
const authController = require("../controllers/authController");

router.get(
  "/api/productos",
  authController.authenticated,
  productoController.get
);

router.post(
  "/api/productos",
  authController.authenticated,
  authController.isAdmin,
  productoController.post
);

router.post(
  "/api/productos/defaultData",
  //authController.authenticated,
  //authController.isAdmin,
  productoController.agregarDefaultData
);


router.put(
  "/api/productos/:codigo",
  authController.authenticated,
  authController.isAdmin,
  productoController.put
);

router.delete(
  "/api/productos/:codigo",
  authController.authenticated,
  authController.isAdmin,
  productoController.delete
);




module.exports = router;
