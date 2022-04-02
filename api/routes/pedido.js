const express = require("express");
let router = express.Router();

const pedidos = require("../models/pedidos");

const authController = require("../controllers/authController");
const pedidoController = require("../controllers/pedidoController");

router.get("/api/pedidos", authController.authenticated, pedidoController.get);

router.post(
  "/api/pedidos",
  authController.authenticated,
  pedidoController.post
);

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

router.post(
  "/api/pedidos/:id/producto/:codeProducto",
  authController.authenticated,
  pedidoController.postProducto

);

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
