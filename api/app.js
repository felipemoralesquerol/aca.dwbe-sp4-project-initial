require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
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
app.use(helmet());
app.use(morgan("common"));

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



app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// view in localhost:5000/api-docs

// Activación de la app en modo escucha
app.listen(process.env.APP_PORT, function () {
  console.log(`Escuchando el puerto ${process.env.APP_PORT}!`);
});
