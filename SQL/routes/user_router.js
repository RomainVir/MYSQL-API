import express from "express";
import userController from "../controllers/user_controller.js";

const userRouter = express.Router();

//registro de nuevo usuario
userRouter.post("/add-user", userController.addUser);

// Login de un usuario
userRouter.post("/login", userController.loginUser);



export default userRouter;
