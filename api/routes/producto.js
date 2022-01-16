const express = require("express");
let router = express.Router();

const productoController = require("../controllers/productoController");
const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/productos:
 *  get:
 *    tags: [productos]
 *    summary: productos
 *    description: Listado de productos
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
router.get(
  "/api/productos",
  authController.authenticated,
  productoController.get
);

/**
 * @swagger
 * /api/productos:
 *  post:
 *    tags: [productos]
 *    summary: productos.
 *    description : Agregado de producto.
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
 *        name: producto
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - codigo
 *            - nombre
 *            - descripcion
 *            - precio_venta
 *            - stock
 *          properties:
 *            codigo:
 *              description: Código del producto
 *              type: string
 *              example: XX
 *            nombre:
 *              description: Nombre del producto
 *              type: string
 *              example: Ensalada Verde
 *            descripcion:
 *              description: Descripcion del producto
 *              type: string
 *              example: Ensalada verde en base a vegetales
 *            precio_venta:
 *              description: Precio de venta del producto
 *              type: float
 *              example: 100
 *            stock:
 *              description: Stock
 *              type: integer
 *              example: 1000
 *    responses:
 *      201:
 *       description: Producto creado
 *      401:
 *       description: Producto no creado
 *
 */
router.post(
  "/api/productos",
  authController.authenticated,
  authController.isAdmin,
  productoController.post
);

/**
 * @swagger
 * /api/productos/{codeProducto}:
 *  put:
 *    tags: [productos]
 *    summary: productos.
 *    description : Actualización de datos de producto.
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
 *        name: codeProducto
 *        required: true
 *        description: Código de producto a actualizar.
 *        schema:
 *          type: string
 *          example: XX
 *      - in: body
 *        name: producto
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - codigo
 *            - nombre
 *            - descripcion
 *            - precio_venta
 *            - stock
 *          properties:
 *            codigo:
 *              description: Código del producto
 *              type: string
 *              example: XX
 *            nombre:
 *              description: Nombre del producto
 *              type: string
 *              example: Ensalada Verde
 *            descripcion:
 *              description: Descripcion del producto
 *              type: string
 *              example: Ensalada verde en base a vegetales
 *            precio_venta:
 *              description: Precio de venta del producto
 *              type: float
 *              example: 100
 *            stock:
 *              description: Stock
 *              type: integer
 *              example: 1000
 *            borrado:
 *              description: Borrado
 *              type: boolean
 *              example: false
 *    responses:
 *      201:
 *       description: Producto actualizado
 *      401:
 *       description: Producto no actualizado
 *
 */
router.put(
  "/api/productos/:codigo",
  authController.authenticated,
  authController.isAdmin,
  productoController.put
);

/**
 * @swagger
 * /api/productos/{codeProducto}:
 *  delete:
 *    tags: [productos]
 *    summary: Eliminar un producto.
 *    description: Elimina un producto según un codigo de producto.
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *       - in: path
 *         name: codeProducto
 *         required: true
 *         description: Código de producto a borrar.
 *         schema:
 *           type: string
 *           example: XX
 *    responses:
 *       200:
 *        description: producto eliminado correctamente.
 *       404:
 *        description: producto no encontrado.
 */

router.delete(
  "/api/productos/:codigo",
  authController.authenticated,
  authController.isAdmin,
  productoController.delete
);


router.post(
  "/api/productos/data",
  authController.authenticated,
  authController.isAdmin,
  productoController.agregarDefaultData
);


module.exports = router;
