import express from "express";
import userController from "../controllers/user_controller.js";

const userRouter = express.Router();

//registro de nuevo usuario
userRouter.post("/", userController.addUser);

// Login de un usuario
userRouter.post("/login", userController.loginUser);

//delete an user con el id
userRouter.delete("/:id", userController.deleteUser);

//modificar un usuario con el id
userRouter.patch("/:id", userController.updateUser);

export default userRouter;
