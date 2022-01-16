const express = require("express");
let router = express.Router();

const authController = require("../controllers/authController");
const Controller = require("../controllers/usuarioController");

/**
 * @swagger
 * /api/usuarios:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags: [usuarios]
 *    summary: usuarios
 *    description: Listado de usuarios
 *    tag: Usuario
 *    responses:
 *      200:
 *        description: Descripción de la versión
 *      304:
 *        description: Descripción de la versión
 */
router.get(
  "/api/usuarios",
  authController.authenticated,
  authController.isAdmin,
  Controller.list
);

/**
 * @swagger
 * /api/usuarios/{id}:
 *  get:
 *    tags: [usuarios]
 *    summary: Recupera la información de un usuario  según su ID
 *    description: Información de un usuarios.
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: ID del usuario a recuperar sus pedidos.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *        description: Listado ok.
 *       404:
 *        description: usuario  no encontrado.
 */
router.get(
  "/api/usuarios/:id",
  authController.authenticated,
  authController.isAdmin,
  Controller.list
);

/**
 * @swagger
 * /api/usuarios/{id}/pedidos:
 *  get:
 *    tags: [usuarios]
 *    summary: Recupera la información pedidos según su ID
 *    description: Información de un usuarios.
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: ID del usuario a recuperar sus pedidos.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *        description: Listado de pedidos ok.
 *       404:
 *        description: Usuario  no encontrado.
 */
router.get(
  "/api/usuarios/:id/pedidos",
  authController.authenticated,
  Controller.pedidos
);

/**
 * @swagger
 * /api/usuarios/{id}:
 *  delete:
 *    tags: [usuarios]
 *    summary: Eliminar un usuario  según su ID
 *    description: Elimina el usuario .
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *        description: usuario  eliminado correctamente.
 *       404:
 *        description: usuario  no encontrado.
 */
router.delete(
  "/api/usuarios/:id",
  authController.authenticated,
  authController.isAdmin,
  Controller.borrado
);

router.post(
  "/api/usuarios/data",
  //authController.authenticated,
  //authController.isAdmin,
  Controller.agregarDefaultData
);

module.exports = router;
