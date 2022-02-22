import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    createdAt: {type:Date, required:true, default:Date.now},
    text:{type:String, required:true},
    avatar:String,
    owner: String,
    video:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Video"},
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;