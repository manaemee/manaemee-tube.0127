import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const myprofile = (req, res) => res.send("my profile");
export const editUser = (req, res) => res.send("Edit User");
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
    try{await User.create({
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
export const getLogin = (req, res) => res.render("login", {pageTitle:"login"})
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
export const  Githubstart = (req , res) => {
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
  /*   if(exist){
        req.session.loggedIn = true;
        req.session.user = exist;
        return res.redirect("/");
    }else{
        const user = await User.create({
            name:userRequest.login,
            username:userRequest.login,
            socialOnly:true,
            email:userRequest.email,
            password:"",
        })
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } */
    if(!exist){
        exist =  await User.create({
            name:userRequest.login,
            username:userRequest.login,
            avatar:userRequest.avatar_url,
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
export const seeUser = (req, res) => res.send("see user");
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};