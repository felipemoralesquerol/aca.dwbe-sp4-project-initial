const { Router } = require("express");
const router = Router();

const Controller = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *    tags: [auth]
 *    summary: Login de usuario.
 *    description: Login de usuario.
 *    requestBody:
 *      description: Email y contraseña de usuario a loguearse
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 description: Email de usuario a loguearse.
 *                 type: email
 *                 example: admin@localhost
 *               password:
 *                 description: Contraseña de usuario a loguearse
 *                 type: string
 *                 example: 1234
 *             required:
 *               - password
 *               - email
 *    responses:
 *      '200':
 *       description: Login de usuario satisfactorio.
 *      '404':
 *       description: Usuario no encontrado (email y/o contraseña incorrecta)
 */
router.post("/api/auth/signin", Controller.signin);

//  app.post("/auth/login", existeUsuario, function (req, res) {
//     console.log("Login OK: ", req.usuarioIndex);
//     res.json({ index: req.usuarioIndex });
//   });

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    tags: [auth]
 *    summary: Registro de usuario.
 *    description : Registro de usuarios.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: usuario
 *        description: usuario  a crear
 *        schema:
 *          type: object
 *          required:
 *            - username
 *            - password
 *            - nombre
 *            - apellido
 *            - email
 *            - direccionEnvio
 *            - telefono
 *          properties:
 *            username:
 *              description: Nombre del usuario
 *              type: string
 *              example: juangomez
 *            password:
 *              description: Contraseña
 *              type: password
 *              example: 1234
 *            nombre:
 *              description: Nombre del usuario
 *              type: string
 *              example: Juan
 *            apellido:
 *              description: Apellido del usuario
 *              type: string
 *              example: Gomez
 *            email:
 *              description: Correo electrónico del usuario
 *              type: email
 *              example: juangomez@gmail.com
 *            direccionEnvio:
 *              description: Dirección de envio
 *              type: string
 *              example: La Plata, Calle 7 # 1234
 *            telefono:
 *              description: Telefono del usuario
 *              type: string
 *              example: 221 1234567
 *    responses:
 *      201:
 *       description: Usuario registrado
 *      401:
 *       description: Usuario no registrado
 *
 */
router.post("/api/auth/signup", Controller.signup);

//   app.post("/auth/signup", nuevoUsuario, function (req, res) {
//     let {
//       username,
//       nombre,
//       apellido,
//       email,
//       password,
//       telefono,
//       direccionEnvio,
//     } = req.body;
//     console.log(req.body);
//     usuario = new Usuario(
//       username,
//       nombre,
//       apellido,
//       email,
//       password,
//       telefono,
//       direccionEnvio
//     );

//     usuarios.push(usuario);
//     res.send(usuario);
//   });

/**
 * @swagger
 * /auth/logout:
 *  post:
 *    tags: [auth]
 *    summary: Logout de usuario.
 *    description : Logout de usuario.
 *    consumes:
 *      - application/json
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *      200:
 *       description: Logout de usuario satisfactorio.
 *      404:
 *       description: Usuario no encontrado (id incorrecta)
 */
// app.post("/auth/logout", isLoginUsuario, function (req, res) {
//   console.log("Logout OK: ", req.usuarioIndex);
//   res.json({ index: -1 });
// });

//router.get('/api/me', Controller.authenticated, Controller.me)

router.get("/api/auth/me", Controller.authenticated, Controller.me);

module.exports = router;
