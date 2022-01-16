const express = require("express");
let router = express.Router();
//const init = require("./../models/init");

/**
 * @swagger
 * /:
 *  get:
 *    description: Referencia al programa especial
 *    tags: [generales]
 *    summary: programa
 *    responses:
 *      200:
 *        description: Descripción de la versión
 *      304:
 *        description: Descripción de la versión
 */
router.get("/", function (req, res) {
  res.send({ programa: "Resto v2.0.0" });
});

module.exports = router;
