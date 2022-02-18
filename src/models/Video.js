import mongoose from "mongoose";



const videoSchema = new mongoose.Schema({
    title: {type:String, required:true, maxlength:15, uppercase:true , trim:true},
    fileUrl: {type:String, required:true},
    description: {type: String, required: true, minlength: 10 , trim:true},
    createdAt: {type:Date, required:true, default:Date.now},
    hashtags: [{type: String , trim:true}],
    views:{type:Number, default: 0 , required:true},
    owner: {type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"}
});

videoSchema.static("formatHashtags", function(hashtags){
    return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
})
const Video = mongoose.model("Video", videoSchema);

export default Video;