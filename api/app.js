require("dotenv").config();
require('./auth/passport-setup-google');
require('./auth/passport-setup-facebook');
require('./auth/passport-setup-linkedin');
const { isLoggedIn } = require('./middleware/isLoggedIn');
const { signin }= require('./controllers/authController');

const express = require("express");
const passport = require('passport');
const session = require('express-session');
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require('cors');
const db = require("./config/db");

const associations = require("./models/associations/core");


//Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    //servers: ["http://localhost:5000/"],
    openapi: "3.0.3",
    info: {
      title: "API Resto 2",
      version: "2.1.0",
      description: "Sprint Project N. 2",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./api/routes/program.js",
    "./api/routes/auth.js",
    "./api/routes/usuario.js",
    "./api/routes/producto.js",
    "./api/app.js",
  ],
  tags: [
    {
      name: "general",
      description: "Operaciones generales",
    },
    {
      name: "auth",
      description: "Operaciones sobre autorización",
    },
    {
      name: "usuarios",
      description: "Operaciones sobre usuarios",
    },
    {
      name: "pedidos",
      description: "Operaciones sobre pedidos",
    },
    {
      name: "productos",
      description: "Operaciones sobre productos",
    },
    {
      name: "formas de pago",
      description: "Operaciones sobre formas de pago",
    },
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Inicializacion del server
const app = express();

const { Router } = require("express");
const router = Router();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use(session({
  secret: process.env.APP_SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());


const program = require("./routes/program.js");
app.use("/", program);

// Importación de rutas
const authRoutes = require("./routes/auth");
const usuarioRoutes = require("./routes/usuario");
const productoRoutes = require("./routes/producto");
const pedidoRoutes = require("./routes/pedido");
const formasDePagoRoutes = require("./routes/formasDePago");

// Definición de rutas
app.use(authRoutes);
app.use(usuarioRoutes);
app.use(productoRoutes);
app.use(pedidoRoutes);
app.use(formasDePagoRoutes);

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.get('/failed', (req, res) => {
  console.log('Falla la loguearse');
  return res.status(401).json({ Mensaje: 'Falla al loguearse' });
});

// Auth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => console.log('Usuario autenticado')
);

app.get('/auth/google/callback', passport.authenticate('google',
  {
    failureRedirect: '/failed',
    successRedirect: '/home'
  }));

function logout (req, res, next) {
  req.logout();
  req.session.destroy();
  next();
};

// Usada tanto para todos los passport
app.get('/auth/logout', logout, (req, res) => {
  console.log('logged out');
  res.status(200).redirect('/');
});

app.get('/auth/facebook',
   passport.authenticate('facebook', { scope: ['email'] }),
  // TODO. Investir scopes!
  //passport.authenticate('facebook')
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook',
    {
      failureRedirect: '/failed',
      successRedirect: '/home'
    }
  ));

app.get('/home', isLoggedIn, signin, (req, res) => {
    //console.log(req.user);
  return res.json({ user: `${req.user.displayName}`, token: req.token });
}
);

app.get('/auth/linkedin',
  //, { scope: ['r_basicprofile', 'r_emailaddress'] }r_emailaddress
  passport.authenticate('linkedin', { scope: ['r_liteprofile', 'r_emailaddress'], credentials: 'include' })
);

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    failureRedirect: '/failed',
    successRedirect: '/home'
  }
  )
);


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// view in localhost:5000/api-docs

// Activación de la app en modo escucha
app.listen(process.env.APP_PORT, function () {
  console.log(`Escuchando el puerto ${process.env.APP_PORT}!`);
});
