export const editUser = (req, res) => res.send("Edit User");
export const join = (req, res) => res.send("join");
export const login = (req, res) => res.render("login", {pageTitle:"login"})
export const seeUser = (req, res) => res.send("see user");
export const removeUser = (req, res) => res.send("remove User");
export const logout = (req, res) => res.send("logout");