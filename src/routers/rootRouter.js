import express from "express";
import { trending } from "../controllers/videoController";
import { getJoin,postJoin,getLogin,postLogin} from "../controllers/userController";
import { publicOnlyMiddleware } from "../middleware";

const rootRouter = express.Router();

rootRouter.get("/", trending);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);

export default rootRouter;