import User from "../models/User";

export const editUser = (req, res) => res.send("Edit User");
export const getJoin = (req, res) => {res.render("join" , {pageTitle: "Join"})};
export const postJoin = async (req, res) => {
    const {name, username, email, password} = req.body;
    await User.create({
        name,
        username,
        email,
        password,
    })
    return res.redirect("/login");
};
export const login = (req, res) => res.render("login", {pageTitle:"login"})
export const seeUser = (req, res) => res.send("see user");
export const removeUser = (req, res) => res.send("remove User");
export const logout = (req, res) => res.send("logout");