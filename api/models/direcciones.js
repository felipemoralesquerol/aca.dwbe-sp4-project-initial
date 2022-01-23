const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class DireccionesModel extends Model { }

DireccionesModel.init(
  {
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calle_nro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    piso: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    borrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'direcciones',
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
    underscored: true,
  }
);

module.exports = DireccionesModel;
