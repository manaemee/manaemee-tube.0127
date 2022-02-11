import express from "express";
import {editUser,seeUser,removeUser,logout} from "../controllers/userController"
const userRouter = express.Router();

userRouter.get("/edit", editUser);
userRouter.get("/:id", seeUser);
userRouter.get("/delete", removeUser);
userRouter.get("/logout", logout);


export default userRouter;