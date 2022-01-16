const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");

class PedidosModel extends Model {}

PedidosModel.init(
  {
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: new Date
    },
    direccion: {
      type: DataTypes.STRING,
      comment: "Registra la dirección del usuario al momento del pedido",
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'PEN',
      comments:
        "Pendiente => Confirmado => En preparación => Enviado => Entregado. PEN => CON => ENP => ENV => ENT",
    },
    monto_total: {
      type: DataTypes.DECIMAL(16,2),
      defaultValue: 0
    },
    anulado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // usuarioId: { 
    //   type: DataTypes.BIGINT(11), 
    //   field: 'usuarioId',
    //   references: {
    //     model: 'usuarios',
    //     key: 'id'
    //   },
    // },
  },
  {
    sequelize,
    modelName: 'pedido',
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
    underscored: true,
  }
);


module.exports = PedidosModel;
