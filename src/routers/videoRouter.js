import express from "express";
import {getUpload, postUpload, getEditVideo, postEditVideo, removeVideo} from "../controllers/videoController";
const videoRouter = express.Router();   

videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEditVideo).post(postEditVideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", removeVideo);

export default videoRouter;