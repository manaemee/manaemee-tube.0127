import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    username:{type:String, required:true, unique:true, maxlength:8},
    avatar: {type:String, default: "https://cdn.pixabay.com/photo/2015/04/18/11/03/profile-728591_1280.jpg"},
    socialOnly:{type:Boolean, default:false},
    email: {type:String, required:true, unique:true},
    password: String,
    videos:[{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Video"}],
    comments:[{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}],
})


UserSchema.pre('save', async function() {
  if(this.isModified("password")){
    this.password = bcrypt.hashSync(this.password, 5);
  }
  });
const User = mongoose.model("User", UserSchema);

export default User;