import express from "express";
import { getEditUser, getChangePassword, postChangePassword,postEditUser, seeUser,Githubstart,Githubfinish,Kakaostart,Kakaofinish,seeComment,logout} from "../controllers/userController"
import { protectorMiddleware,publicOnlyMiddleware,notsocialOnlyMiddleware,avatarUpload } from "../middleware";

const userRouter = express.Router();


userRouter.route("/edit").all(protectorMiddleware).get(getEditUser).post(avatarUpload.single("avatar"), postEditUser);
userRouter.route("/change-password").all(protectorMiddleware).all(notsocialOnlyMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, Githubstart);
userRouter.get("/github/callback",publicOnlyMiddleware, Githubfinish);
userRouter.get("/kakao/start", publicOnlyMiddleware, Kakaostart);
userRouter.get("/kakao/callback", publicOnlyMiddleware, Kakaofinish);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/:id", seeUser);
userRouter.get("/:id/comment", seeComment);
export default userRouter;