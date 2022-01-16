const httpMessage = require("./../helpers/httpMessage");
const pedidos = require("../models/pedidos");
const pedidosProductos = require("../models/pedidosProductos")
const productos = require("../models/productos");
const usuarios = require("../models/usuarios");
const formaDePago = require("../models/formaDePago");
const { report } = require("../routes/program");


exports.get = async (req, res, next) => {
  try {
    const data = await pedidos.findAll({ where: {usuario_id : req.authData.usernameID},
      include: [
      {model: usuarios,
        attributes: ['id', 'username', 'email', 'nombre', 'apellido','direccion_envio']
        }, {model:formaDePago,
          attributes: ['id', 'codigo', 'nombre']
        }
    ],
    attributes: ['id', 'fecha', 'direccion', 'estado', 'monto_total', 'anulado']
  });
    console.log(data);
    res.json({ pedidos: data });
    //res.json(data);
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};

exports.post = async (req, res, next) => {
  try {
    const direccion = req.body.direccion;
    const codeFormaDePago = req.body.formaDePago;

    const dataFormaDePago = await formaDePago.findOne({ where: { codigo: codeFormaDePago}});
    console.log(dataFormaDePago);

    const cant = await pedidos.count();
    const numeroPedido = cant + 1;


    const dataPedido = await pedidos.create({ numero: numeroPedido, usuarioId: req.authData.usernameID, direccion, 
      formasDePagoId:dataFormaDePago.id });
    console.log(dataPedido);

    res.json({ status: dataPedido });

  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};


exports.postProducto = async (req, res, next) => {
  try {
    const numeroPedido = req.params.id;
    const codeProducto = req.params.codeProducto
    const cantidad = req.body.cantidad;

    const dataPedido = await pedidos.findOne({ where :{ id:numeroPedido, usuario_id : req.authData.usernameID} });
    console.log(dataPedido);
    if (!dataPedido) {
      httpMessage.NotFound(`Pedido no encontrado` ,res);
      return
    }

    if (dataPedido.anulado) {
      httpMessage.NotFound(`Pedido anulado` ,res);
      return 
    }

    if (dataPedido.estado !== 'PEN') {
      httpMessage.NotFound(`Pedido en estado inhabilitado para operar` ,res);
      return 
    }

    const dataProducto = await productos.findOne({ where: {codigo:codeProducto} });
    console.log(dataProducto);
    if (!dataProducto) {
      httpMessage.NotFound(`Producto no encontrado` ,res);
      return
    }
   
    // Actualización de cabecera de pedidos
    dataPedido.monto_total = parseFloat(dataPedido.monto_total) + parseFloat(dataProducto.precio_venta) * parseInt(cantidad);
    dataPedido.save();

    const dataPedidoProducto = await pedidosProductos.create({ pedido_id: numeroPedido, producto_id: dataProducto.id, cantidad:cantidad});
    console.log(dataPedidoProducto);

    res.json({ status: dataPedido });
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};


// exports.pedidos = function pedidos(req, res) {
//   //TODO: Refactoring con /pedidos
//   pedidosUsuario = pedidos.filter(
//     (p) => req.usuario.admin || p.usuario == req.usuario.username
//   );
//   console.log(pedidosUsuario);
//   res.send(pedidosUsuario);
// };

// exports.borrado = function borrado(req, res) {
//   //TODO: Modularizar
//   let usuario = req.usuario;
//   let index = req.usuarioIndex;
//   let indexABorrar = req.params.id;
//   // Recuperación de datos del usuario a borrar
//   usuarioABorrar = usuarios[indexABorrar];
//   console.log(indexABorrar, usuarioABorrar);
//   if (!usuarioABorrar) {
//     res.status(404).send({ resultado: `Usuario a borrar no encontrado` });
//   }
//   resultado = "Borrado según el indice: " + usuarioABorrar;
//   usuarioABorrar.borrado = true;
//   res.send({ resultado: resultado, valor: usuarioABorrar });
// };
