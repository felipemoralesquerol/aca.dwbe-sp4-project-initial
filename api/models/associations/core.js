const PedidosModel = require("../pedidos");
const UsuariosModel = require("../usuarios");
const ProductosModel = require("../productos");
const FormasDePagoModel = require("../formaDePago");
const PedidosProductosModel = require("../pedidosProductos");
const DireccionesModel = require("../direcciones");

console.log('Ejecución de asociaciones!')
// Agregado de relaciones

// El atributo usuario_id se agrega en el modelo origen (pedidos)
// El pedido pertenece a un usuario
PedidosModel.belongsTo(UsuariosModel);
UsuariosModel.hasMany(PedidosModel);

DireccionesModel.belongsTo(UsuariosModel);
UsuariosModel.hasOne(DireccionesModel);

PedidosModel.belongsTo(DireccionesModel);

DireccionesModel.hasMany(PedidosModel);

// Asociación entre pedidos y formas de pago
PedidosModel.belongsTo(FormasDePagoModel);
FormasDePagoModel.hasMany(PedidosModel);

// Asociacion entre pedidos y pedidos_productos
PedidosProductosModel.belongsTo(PedidosModel);
PedidosModel.hasMany(PedidosProductosModel);

// Asociacion entre productos y pedidos_productos
PedidosProductosModel.belongsTo(ProductosModel);
ProductosModel.hasMany(PedidosProductosModel);

//  Creación de nueva entidad de vinculo (para el caso en el que la tabla no tiene atributos)
// PedidosModel.belongsToMany(ProductosModel, {
//   through: "pedidos_productos",
//   foreignKey: "pedido_id", 
//   otherKey: "producto_id", 
// });

// try {
//   ProductosModel.belongsToMany(PedidosModel, {
//   through: "pedidos_productos",
//   foreignKey: "producto_id", 
//   otherKey: "pedido_id", 
// });
// } catch (error) {
//   console.log(error)
// }


console.log('Fin de asociaciones!' )