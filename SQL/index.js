import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";
import db from "./services/mysql.js";
import userRouter from "./routes/user_router.js";
import productRouter from "./routes/product_router.js";

// Añadimos el método config de dotenv para utilizar las variables de entorno
dotenv.config();

// instanciamos express
const app = express();

// --- middlewares de express ---
app.use(express.json());
app.use(express.text());
app.use(logger("dev"));
app.use(cookieParser());
app.use("/products", productRouter);

await db.createConnection(); // pour tester si bien connecté avec la bdd

//api middlewares
app.use("/user", userRouter);

export default app;
