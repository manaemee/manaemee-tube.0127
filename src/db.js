import Mongoose from "mongoose"

Mongoose.connect("mongodb://127.0.0.1:27017/manaemeetube");

const db= Mongoose.connection;
db.on("error", (error) => console.log("DB Error", error));
db.once("open", ()=> console.log("Connected to DB"));