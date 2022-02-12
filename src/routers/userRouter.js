import express from "express";
import {myprofile, editUser,seeUser,removeUser,logout} from "../controllers/userController"
const userRouter = express.Router();

userRouter.get("/my-profile", myprofile);
userRouter.get("/edit", editUser);
userRouter.get("/:id", seeUser);
userRouter.get("/delete", removeUser);
userRouter.get("/logout", logout);


export default userRouter;