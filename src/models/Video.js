import mongoose from "mongoose";



const videoSchema = new mongoose.Schema({
    title: {type:String, required:true, maxlength:10, uppercase:true , trim:true},
    description: {type: String, required: true, minlength: 10 , trim:true},
    createdAt: {type:Date, required:true, default:Date.now},
    hashtags: [{type: String , trim:true}],
    meta:{
        views:{type:Number, default: 0 , required:true},
        favs:{type:Number, default: 0 , required:true},
    }
});

videoSchema.static("formatHashtags", function(hashtags){
    return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
})
const Video = mongoose.model("Video", videoSchema);

export default Video;