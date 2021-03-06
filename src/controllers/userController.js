import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import Comment from "../models/Comment";


export const getEditUser = (req, res) => {
    return res.render("edit-profile", {pageTitle:"Edit Profile"})
};
export const postEditUser = async (req, res) => {
    const {
        body: { name, email, username},
        session: {
          user: { _id, avatar },
        },
        file,
      } = req;
const findUsername = await User.findOne({ username });
const comment = await Comment.findOne({username: findUsername.username});
const findEmail = await User.findOne({ email });
if (findUsername._id != _id || findEmail._id != _id) {
    return res.render("edit-profile", {
      pageTitle: "Edit  Profile",
      errorMessage: "User is exist",
    });
  }
const IsHeroku = process.env.NODE_ENV === "production";
const updatedUser = await User.findByIdAndUpdate(_id,{
    name,
    email,
    username,
    avatar: file ? (IsHeroku ? file.location: file.path): avatar
},{new:true});
if(comment){
    comment.avatar = updatedUser.avatar;
    comment.save();
}
req.session.user = updatedUser;
return res.redirect("/users/edit");
};
export const getChangePassword = (req, res) =>{
    if(req.session.user.socialOnly === true){
        req.flash("error", "You don't have password");
        return res.redirect("/");
    }
return res.render("change-password", {pageTitle:"change password"});
}

export const postChangePassword = async (req, res) => {
 const {
     session:{user:{_id}}, 
     body:{oldpassword, newpassword, confirmpassword}
    } = req; 
const owner = await User.findById(_id);
 const check = bcrypt.compareSync(oldpassword, owner.password);
 if(!check){
     return res.render("change-password", 
     {pageTitle:"change password", errorMessage:"The current password is incorrect"
    })
 }
 if(newpassword !== confirmpassword){
    return res.status(400).render("change-password", 
    {pageTitle:"change password", errorMessage:"New password does not match the confirmation"})
 }
 owner.password = newpassword
 await owner.save();
 req.flash("info", "Password updated")
 return res.redirect("/");
}
export const getJoin = (req, res) => {res.render("join" , {pageTitle: "Join"})};
export const postJoin = async (req, res) => {
    const {name, username, email, password} = req.body; 
    const exits = await User.exists({username, email});
    if(exits){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"This username/e-mail are already taken"});
    }
    const exitsUsername = await User.exists({username});
    if(exitsUsername){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"This username is already taken"})
    };
    const exitsEmail = await User.exists({email});
    if(exitsEmail){
        return res.status(400).render("join", {pageTitle:"Join", errorMessage:"This e-mail is already taken"});
    }
    try{
        await User.create({
        name,
        username,
        email,
        password,
    })
    return res.redirect("/login");
}catch(error){
    return res.status(400).render("join", {
        pageTitle:"Join",
        errorMessage: `error : ${error.errors.description}`,
    })
}
};
export const getLogin = (req, res) => res.render("login", {pageTitle:"Sign In"})
export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({
        username,
        socialOnly:false,
    });
    if(!user){
        return res.status(400).render("login", {pageTitle:"Login", errorMessage:"An account with this username does not exits"});
    }
    const check = bcrypt.compareSync(password, user.password); 
   if(!check){
    return res.status(400).render("login", {pageTitle:"Login", errorMessage:"Passwrod Wrong"});
   }
   req.session.loggedIn = true;
   req.session.user = user;
    return res.redirect("/");
}
export const Githubstart = (req , res) => {
    const baseUrl= "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENTID,
        allow_signup:false,
        scope:"user"
    }
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseUrl}?${params}`;
    return res.redirect(finalURL);
}
export const Githubfinish = async (req, res) =>{
const baseUrl = "https://github.com/login/oauth/access_token";
const config = {
    client_id:process.env.GH_CLIENTID,
    client_secret:process.env.GH_SECRET,
    code:req.query.code,
}
const params = new URLSearchParams(config).toString();
const finalUrl = `${baseUrl}?${params}`;

const data = await(await fetch(finalUrl,{
    method:"POST",
    headers:{
        Accept:"application/json",
    }
})).json();
if("access_token" in data){
    const {access_token} = data;
    const userRequest = await (await fetch("https://api.github.com/user", {
        headers:{
            Authorization: `token ${access_token}`,
        }
    })).json();
   let exist= await User.findOne({email:userRequest.email});
    if(!exist){
        exist =  await User.create({
            name:userRequest.login,
            username:userRequest.login,
            socialOnly:true,
            email:userRequest.email,
            password:"",
        })
    }
    req.session.loggedIn = true;
    req.session.user = exist;
    return res.redirect("/");
}else{
  return res.redirect("/login");
}
}
export const Kakaostart = async (req, res) => {
    const baseUrl= "https://kauth.kakao.com/oauth/authorize";   
    const config = {
        client_id:process.env.KAKAO_CLIENTID,
        redirect_uri:"https://manaemeetube.herokuapp.com/users/kakao/callback",    
    }
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseUrl}?${params}&response_type=code&scope=account_email`;
    return res.redirect(finalURL);
};
export const Kakaofinish = async (req,res)=>{
const baseUrl = "https://kauth.kakao.com/oauth/token";
const config = {
    grant_type:"authorization_code",
    client_id:process.env.KAKAO_CLIENTID,
    redirect_uri:"https://manaemeetube.herokuapp.com/users/kakao/callback",
    code:req.query.code,
}
const params = new URLSearchParams(config).toString();
const finalUrl = `${baseUrl}?${params}`;
const data = await(await fetch(finalUrl,{
    method:"POST",
    headers:{
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    }
})).json();
if("access_token" in data){
    const {access_token} = data;
    const userRequest = await (await fetch("https://kapi.kakao.com/v2/user/me", {
        headers:{
            Authorization: `Bearer ${access_token}`,
        }
    })).json();
    let exist= await User.findOne({email:userRequest.kakao_account.email});
    if(!exist){
        try{
            exist =  await User.create({
                name:userRequest.properties.nickname,
                username:userRequest.properties.nickname,
                socialOnly:true,
                email:userRequest.kakao_account.email,
                password:"",
            })
        }catch(error){
            req.flash("error", "This username maybe already in use");
            return res.redirect("/login");
        }
    }
    req.session.loggedIn = true;
    req.session.user = exist;
    return res.redirect("/");
}else{
    return res.redirect("/login");
};
}

export const seeUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id).populate("videos");
    if(!user){
        return res.status(404).render("404");
    }
    return res.render("profile", {pageTitle:`${user.username}'s Profile`, user})
};
export const seeComment = async (req, res) => {
    const {user} = req.session;
    const comments = await Comment.find({username:user.username}).sort({createdAt:"desc"});
    if(!user){
        return res.status(404).render("404");
    }
    return res.render("comment", {pageTitle:`${user.username}'s Comments`,comments})
}
export const logout = (req, res) => {
    req.session.user= null;
    req.session.loggedIn = false; 
    req.flash("info", "log out");
    return res.redirect("/");
};