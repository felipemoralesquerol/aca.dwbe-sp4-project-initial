const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class ProductosModel extends Model { }

ProductosModel.init(
  {
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    precio_venta: {
      type: DataTypes.DECIMAL(16, 2),
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    foto: {
      type: DataTypes.STRING,
    },
    borrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'producto',
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
    underscored: true,
  }
);


module.exports = ProductosModel;
