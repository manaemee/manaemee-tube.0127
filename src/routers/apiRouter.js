import express from "express";
import {registerView, registerComment, removeComment} from "../controllers/videoController";
import { protectorMiddleware} from "../middleware";
const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/comments/:id([0-9a-f]{24})/comment", registerComment);
apiRouter.get("/comments/:id([0-9a-f]{24})/delete", protectorMiddleware, removeComment);

export default apiRouter;