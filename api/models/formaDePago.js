const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class FormasDePagoModel extends Model { }

FormasDePagoModel.init(
  {
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 250],
          msg: "El nombre de la forma de pago de tener entre 3 y 250 caracteres",
        },
        //isAlpha: true,
      },
    },

    borrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'formas_de_pago',
    createdAt: "createTimestamp",
    updatedAt: "updateTimestamp",
    underscored: true,
  }
);

module.exports = FormasDePagoModel;
