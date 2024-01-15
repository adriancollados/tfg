import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import articulo from "./routes/articulosRoutes";
import cliente from "./routes/clientesRoutes";
import categorias from "./routes/categoriaRoutes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./swaggerOptions";
const specs = swaggerJSDoc(options);

const app = express();
app.set('port', process.env.PORT);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(articulo);
app.use(cliente);
app.use(categorias)

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;