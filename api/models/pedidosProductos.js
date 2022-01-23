const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class PedidosProductosModel extends Model { }

PedidosProductosModel.init(
  {
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'pedidos_productos',
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
    underscored: true,
  }
);

module.exports = PedidosProductosModel;
