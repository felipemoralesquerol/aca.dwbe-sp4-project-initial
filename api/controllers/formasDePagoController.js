const httpMessage = require("./../helpers/httpMessage");
const formasDePago = require("../models/formaDePago");

const cache = require("../../config/cache");
const itemCache = "formasDePago";

exports.get = async (req, res, next) => {
  try {
    cache.get(itemCache, async (error, info) => {
      if (error) {
        httpMessage.Error(req, res, error);
      }
      if (info) {
        //console.log(info);
        res.json({ formasDePago: JSON.parse(info) });
      } else {
        const data = await formasDePago.findAll();
        //console.log(data);

        // Agregado de clave en redis
        cache.set(itemCache, JSON.stringify(data), "EX", "600");

        // Resuesta
        res.json({ [itemCache]: data });
      }
    });
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};

exports.post = async (req, res, next) => {
  try {
    // TODO: Sanetizar y validar

    const data = await formasDePago.create(req.body);
    console.log(data);

    //Borrado de clave para que se recargue en nueva operacion que lo necesite
    cache.del(itemCache);

    res.json({ status: data });
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    let { codigo } = req.params;
    const info = { codigo };

    const data = await formasDePago.findOne({ where: info });
    if (data.borrado) {
      texto = "Dato borrado anteriomente: " + codigo + " - " + data.nombre;
      console.log(texto);
      res.status(410).json({ status: texto }); // contenido borrado
    } else {
      data.borrado = true;
      await data.save();

      //Borrado de clave para que se recargue en nueva operacion que lo necesite
      cache.del(itemCache);

      res.json({
        status:
          "Forma de pago borrada correctamente: " +
          codigo +
          " - " +
          data.nombre,
      });
    }
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};

exports.put = async (req, res, next) => {
  try {
    let { codigo, nombre } = req.body;
    const info = { codigo, nombre };

    const data = await formasDePago.findOne({ where: { codigo: codigo } });
    if (data.borrado) {
      texto =
        "No se puede modificar porque esta borrado: " +
        codigo +
        " - " +
        data.nombre;
      console.log(texto);
      res.status(410).json({ status: texto }); // contenido borrado
    } else {
      data.nombre = nombre;
      await data.save();

      //Borrado de clave para que se recargue en nueva operacion que lo necesite
      cache.del(itemCache);

      res.json({
        status:
          "Forma de pago actualizada correctamente: " +
          codigo +
          " - " +
          data.nombre,
      });
    }
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
};

exports.agregarDefaultData = async (req, res, next) => {
  try {
    //await formasDePago.sync({ force: true });

    let dato = await formasDePago.findOrCreate({
      where: { codigo: "EF", nombre: "Efectivo" },
    });

    dato = await formasDePago.findOrCreate({
      where: {
        codigo: "TD",
        nombre: "Tarjeta de Débito",
      },
    });
    dato = await formasDePago.findOrCreate({
      where: {
        codigo: "TC",
        nombre: "Tarjeta de Crédito",
      },
    });

    dato = await formasDePago.findOrCreate({
      where: {
        codigo: "MP",
        nombre: "Mercado Pago",
      },
    });

    httpMessage.Message("Agregado de data OK", res)
  } catch (error) {
    httpMessage.Error(req, res, error);
  }
}