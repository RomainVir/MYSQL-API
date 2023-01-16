import express from "express";
import productController from "../controllers/products_controller.js";

const productRouter = express.Router();

//subir una o varias imagenes a la bdd y servidor

productRouter.post("/upload", productController.uploadImage);

export default productRouter;
