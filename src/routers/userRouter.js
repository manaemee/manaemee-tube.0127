import express from "express";
import {myprofile, editUser,seeUser,Githubstart,Githubfinish,Kakaostart, Kakaofinish,logout} from "../controllers/userController"
const userRouter = express.Router();

userRouter.get("/my-profile", myprofile);
userRouter.get("/edit", editUser);
userRouter.get("/github/start", Githubstart);
userRouter.get("/github/callback", Githubfinish);
userRouter.get("/kakao/start", Kakaostart);
userRouter.get("/kakao/callback", Kakaofinish);
userRouter.get("/logout", logout);
userRouter.get("/:id", seeUser);

export default userRouter;