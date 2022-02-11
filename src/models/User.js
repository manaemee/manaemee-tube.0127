import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    username:{type:String, required:true, unique:true, maxlength:5},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true, minlength:5},
})
UserSchema.pre("save", async function(){
    this.password = this.password, 5, function(err, hash){

    }
})
UserSchema.pre('save', async function() {
    this.password = bcrypt.hashSync(this.password, 5);
  });
const User = mongoose.model("User", UserSchema);

export default User;