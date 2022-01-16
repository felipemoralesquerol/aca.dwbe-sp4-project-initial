const express = require("express");
let router = express.Router();

const productos = require("../models/productos");
const pedidos = require("../models//pedidos");

const authController = require("../controllers/authController");
const pedidoController = require("../controllers/pedidoController");

/**
 * @swagger
 * /api/pedidos:
 *  get:
 *    tags: [pedidos]
 *    summary: pedidos
 *    description: Listado de pedidos
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
router.get("/api/pedidos", authController.authenticated, pedidoController.get);

/**
 * @swagger
 * /api/pedidos:
 *  post:
 *    tags: [pedidos]
 *    summary: Agregado de pedido.
 *    description : Agregado de pedido.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: body
 *        name: pedido
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - formaDePago
 *          properties:
 *            direccionEnvio:
 *              description: Dirección de envio
 *              type: string
 *              example:
 *            formaDePago:
 *              description: Forma de Pago (EF, TC, TD, MP)
 *              type: string
 *              example: EF
 *    responses:
 *      201:
 *       description: Pedido creado
 *      401:
 *       description: Pedido no creado
 *
 */
router.post(
  "/api/pedidos",
  authController.authenticated,
  pedidoController.post
);

/**
 * @swagger
 * /api/pedidos/{id}:
 *  put:
 *    tags: [pedidos]
 *    summary: Modificación de pedido.
 *    description : Modificación de pedido.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del pedido a modificar
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: body
 *        name: pedido
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - formaDePago
 *          properties:
 *            direccionEnvio:
 *              description: Dirección de envio
 *              type: string
 *              example: "Calle x"
 *            formaDePago:
 *              description: Forma de Pago (EF, TC, TD, MP)
 *              type: string
 *              example: EF
 *    responses:
 *      201:
 *       description: Pedido modificado
 *      401:
 *       description: Pedido no modificado debido a error
 *
 */
router.put(
  "/api/pedidos/:id",
  authController.authenticated,
  function (req, res) {
    idPedido = req.params.id;
    let { direccionEnvio, formaDePago } = req.body;
    usuario = req.usuario;
    console.log(req.body);
    if (!formaDePago in ["EF", "TC", "TD", "MP"]) {
      return res
        .status(404)
        .send({ resultado: `Forma de pago incorrecta: ${formaDePago}` });
    }

    pedido = pedidos.find(
      (p) => p.id == idPedido && p.usuario == req.usuario.username
    );
    if (!pedido) {
      return res
        .status(404)
        .send({ resultado: `ID de pedido no encontrado: ${idPedido}` });
    }
    //Requerimiento adicional (s). Los usuarios solo pueden agregar productos si el pedido está PEN
    if (pedido.estado != "PEN") {
      return res.status(404).send({
        resultado: `Un usuario solo puede modificar un pedido en estado pendiente`,
      });
    }
    direccionEnvio = direccionEnvio || usuario.direccionEnvio;
    pedido.setFormaDePago(formaDePago);
    pedido.setDireccionEnvio(direccionEnvio);
    console.log(pedidos);
    res.send(pedido);
  }
);

/**
 * @swagger
 * /api/pedidos/{id}:
 *  get:
 *    tags: [pedidos]
 *    summary: pedidos según id pedido
 *    description: Listado de pedidos
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a mostrar
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *         description: Listado de usuarios
 */
router.get(
  "/api/pedidos/:id",
  authController.authenticated,
  function (req, res) {
    idPedido = req.params.id;
    console.log(req.params, req.query.index);
    pedidosUsuario = pedidos.find(
      (p) =>
        p.id == idPedido &&
        (req.usuario.admin || p.usuario == req.usuario.username)
    );
    console.log(idPedido, pedidosUsuario);
    if (!pedidosUsuario) {
      res.status(404).json({ message: "Orden no encontrada" });
    } else {
      res.send(pedidosUsuario);
    }
  }
);

/**
 * @swagger
 * /api/pedidos/{id}/producto/{codeProducto}:
 *  post:
 *    tags: [pedidos]
 *    summary: pedidos según id pedido
 *    description: Listado de pedidos
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del pedido a mostrar
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: body
 *        name: producto
 *        description: Código del producto a agregar al pedido
 *        schema:
 *          type: object
 *          required:
 *            - codeProducto
 *          properties:
 *            codeProducto:
 *              description: Código del producto
 *              type: string
 *              example: XX
 *    responses:
 *      200:
 *        description: Ok de producto agregado
 */
router.post(
  "/api/pedidos/:id/producto/:codeProducto",
  authController.authenticated,
  pedidoController.postProducto
  
);

/**
 * @swagger
 * /api/pedidos/{id}/estado/{codeEstado}:
 *  patch:
 *    tags: [pedidos]
 *    summary: Cambio de estado
 *    description: Cambio de estado de pedido vía id pedido
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del pedido a mostrar
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: body
 *        name: codeEstado
 *        description: Código del estado a cambiar
 *        schema:
 *          type: object
 *          required:
 *            - codeEstado
 *          properties:
 *            codeEstado:
 *              description: Código de Estado (PEN, CON, ENP, ENV, ENT)
 *              type: string
 *              example: XX
 *    responses:
 *      200:
 *        description: Ok de producto agregado
 */
router.patch(
  "/api/pedidos/:id/estado/:codeEstado",
  authController.authenticated,
  authController.isAdmin,
  function (req, res) {
    idPedido = req.params.id;
    console.log(req.params, req.query.index, req.body);
    pedidosUsuario = pedidos.find(
      (p) =>
        p.id == idPedido &&
        (req.usuario.admin || p.usuario == req.usuario.username)
    );
    if (!pedidosUsuario) {
      return res.status(404).send({ resultado: `Id Pedido no encontrado` });
    }
    //Chequeo de Estado
    codeEstado = req.body.codeEstado;
    Estado = pedidosEstado.find((pe) => pe == codeEstado);
    if (!Estado) {
      return res
        .status(404)
        .send({ resultado: `Código de Estado no encontrado` });
    }
    console.log(codeEstado, Estado);
    pedidosUsuario.setEstado(Estado);
    console.log(pedidosUsuario);
    res.send({
      resultado:
        "Cambio de Estado. El pedido está en : " + pedidosUsuario.getEstado(),
    });
  }
);

module.exports = router;
