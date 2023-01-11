import express from "express";
import userController from "../controllers/user_controller.js";

const userRouter = express.Router();

userRouter.post("/", userController.addUser);

export default userRouter;
