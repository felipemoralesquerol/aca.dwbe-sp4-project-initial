const jwt = require("jsonwebtoken");
const Op = require('sequelize').Op;
const httpMessage = require("../helpers/httpMessage");
const passwordManager = require("../helpers/passwordManager");

const UsuariosModel = require("../models/usuarios");

// TODO: Investigar si corresponde agregar mas campos
function getPayload(usuario) {
  return {
    email: usuario.email,
    username: usuario.username,
    admin: usuario.admin,
    usernameID : usuario.id
  };
}



// Login
exports.signin = async function signin(req, res, next) {
  try {
    let email, password;
    let usuario;
    let created;


    if (req.isAuthenticated()) {
      console.log('AUTH')

      const user = req.user;

      [usuario, created] = await UsuariosModel.findOrCreate({ where: { email: user.email, 
        password: user.password,
        username: user.username,
        nombre: user.name
      }
      });

    
      ({email,  password} = user);

    } else {
      ({ email, password } = req.body);
            
    };

     usuario = await UsuariosModel.findOne({
        where: { email: email, borrado: false },
       });

    console.log("signin", email, password);

     if (!usuario )  {
      httpMessage.NotFound("Credenciales incorrectas", res);
      return;
    }

    if (usuario.suspendido) {
      httpMessage.NotFound("Usuario suspendido", res);
      return;
    }

    // Armado de payload
    let payload = getPayload(usuario);
     
    const compare = req.isAuthenticated() ? true:passwordManager.comparePassword(password, usuario.password);
    if (compare) {
      const data = jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN },
        (err, token) => {
          if (err) {
            httpMessage.Error(req, res, err);
          } else {
            req.token = token;
            res.json({ status: "signin", token });
          }
        }
      );
    } else {
      httpMessage.NotAccess(req, res);
    }
  } catch (err) {
    httpMessage.Error(req, res, err);
  }
};

// Registro
exports.signup = async function signup(req, res, next) {
  try {
    console.log("FMOFMO Paso 1")
    // TODO: Sanetizar y validar la entrada
    const { username, password, email, nombre, direccion_envio, telefono } = req.body;
    console.log("signup", req.body);

    console.log("FMOFMO Paso 2")
    let usuario = await UsuariosModel.findOne({ where: { 
      [Op.or]: [{email: email}, {username: username}]
    }});
    
    console.log("FMOFMO Paso 3")
    if (usuario) {
      httpMessage.DuplicateData("Email y/o Username ya registrado!", res);
      return;
    };

    console.log("FMOFMO Paso 4")
    // Validar dureza de password
    //FMOFMOreq.body.password = passwordManager.encrypt(req.body.password);
    
    console.log("FMOFMO Paso 5")
    usuario = await UsuariosModel.create(req.body);

    console.log("FMOFMO Paso 6")
    // Armado de payload
    let payload = getPayload(usuario);

    console.log("FMOFMO Paso 1")
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (err, token) => {
        if (err) {
          httpMessage.Error(req, res, err);
        } else {
          req.token = token;
          res.json({ status: "signup", token });
        }
      }
    );
  } catch (err) {
    console.log("FMOFMO Paso Fin")
    httpMessage.Error(req, res, err);
  }
};

exports.authenticated = function authenticated(req, res, next) {
  // TODO: Implementar acceso a base de datos
  // NOTE: Requiere que la petici??n incluye en el campo headers una clave (key) de la forma
  //       Bearer {token}, donde este token haya sido suministrado por signin o signup
  try {
    if (!req.headers.authorization) {
      httpMessage.Denied(
        req,
        res,
        "Acceso denegado por falta de informaci??n de autorizaci??n"
      );
    } else {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
        if (err) {
          httpMessage.Denied(req, res, "Acceso denegado: " + err.message);
        } else {
          req.authData = authData;
          //TODO: Recuperar data del usuario
          console.log(req.authData);

          next();
        }
      });
    }
  } catch (err) {
    httpMessage.Error(req, res, err);
  }
};

// Usuario es admin
exports.isAdmin = (req, res, next) => {
  if (req.authData.admin) {
    next();
  } else {
    console.error("Acceso denegado: ");
    res.status(403).send({ status: "Acceso denegado" });
  }
};

// Perfil de usuario
exports.me = (req, res, next) => {
  res.json({ status: "me", data: req.authData });
};

// Ususuario suspendido
exports.suspender = (req, res, next) => {
  res.status(500).json({ status: "Opci??n no implementada a??n!" });
};
