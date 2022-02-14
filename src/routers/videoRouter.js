import express from "express";
import {getUpload, postUpload, getEditVideo, postEditVideo, removeVideo} from "../controllers/videoController";
import { protectorMiddleware ,videoUpload} from "../middleware";
const videoRouter = express.Router();   

videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.single("video"), postUpload);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEditVideo).post(postEditVideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, removeVideo);

export default videoRouter;