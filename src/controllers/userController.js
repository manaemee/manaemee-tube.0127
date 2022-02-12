import User from "../models/User";
import bcrypt from "bcrypt";

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
        username
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
export const seeUser = (req, res) => res.send("see user");
export const removeUser = (req, res) => res.send("remove User");
export const logout = (req, res) => res.send("logout");