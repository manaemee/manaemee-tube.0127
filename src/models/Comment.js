import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    createdAt: {type:String, required:true},
    text:{type:String, required:true},
    avatar:String,
    username:String,
    owner:{ type: mongoose.Schema.Types.ObjectId,  required: true, ref: "User" },
    video:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Video"},
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;