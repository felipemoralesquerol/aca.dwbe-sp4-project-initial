const express = require("express");
const router = express.Router();

const FormasDePagoModel = require("../models/formaDePago");

const authController = require("../controllers/authController");
const formasDePagoController = require("../controllers/formasDePagoController");

router.get(
  "/api/formasDePago",
  authController.authenticated,
  formasDePagoController.get
);


router.post(
  "/api/formasDePago",
  authController.authenticated,
  authController.isAdmin,
  formasDePagoController.post
);

router.delete(
  "/api/formasDePago/:codigo",
  authController.authenticated,
  authController.isAdmin,
  formasDePagoController.delete
);
module.exports = router;

router.put(
  "/api/formasDePago/:codigo",
  authController.authenticated,
  authController.isAdmin,
  formasDePagoController.put
);

router.post(
  "/api/formasDePago/data",
  authController.authenticated,
  authController.isAdmin,
  formasDePagoController.agregarDefaultData
);


module.exports = router;
