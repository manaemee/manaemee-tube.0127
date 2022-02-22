
import express from "express";
import logger from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middleware";
import flash from "express-flash";

const app = express();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
app.use(logger("dev"));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:process.env.DB_URL})
}))
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;