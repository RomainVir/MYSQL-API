import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";
import db from "./services/mysql.js";
import userRouter from "./routes/user_router.js";
import productRouter from "./routes/product_router.js";
import cors from "cors";
import fileUpload from "express-fileupload";

// Añadimos el método config de dotenv para utilizar las variables de entorno
dotenv.config();

// Función para utilizar path en ES Modules (exportamos para utilizarla globalmente)
export function currentDir() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return { __dirname, __filename };
}

// instanciamos express
const app = express();

// --- middlewares de express ---
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(logger("dev"));
app.use(cookieParser());

// instanciamos la librería file upload y le añadimos propiedades.
app.use(
    fileUpload({
      createParentPath: true, // Crea la carpeta donde almacenamos las imágenes si no ha sido creada.
      limits: { fileSize: 20 * 1024 * 1024 }, // Limitamos el tamaño de la imagen a 20mb. Por defecto son 50mb.
      abortOnLimit: true, // Interrumpe la carga del archivo si supera el límite especificado.
      responseOnLimit: "Imagen demasiado grande", // Enviamos un mensaje de respuesta cuando se interrumpe la carga.
      uploadTimeout: 0, // Indicamos el tiempo de respuesta si se interrumpe la carga de la imagen.
    })
  );
  
app.use("/product", productRouter);
import { fileURLToPath } from "url";
import { dirname } from "path";


await db.createConnection(); // pour tester si bien connecté avec la bdd

//api middlewares
app.use("/user", userRouter);

export default app;
