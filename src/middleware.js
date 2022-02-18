import multer from "multer";
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "manaemeetube";
    res.locals.loggedIn=Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    next();
}

export const protectorMiddleware = (req , res, next) => {
    if(req.session.loggedIn){
        next();
    }else{
        return res.redirect("/login");
    }
}
export const publicOnlyMiddleware = (req,res,next) => {
    if(!req.session.loggedIn){
        next();
    }else{
        return res.redirect("/");
    }
}
export const notsocialOnlyMiddleware = (req, res, next) => {
    if(!req.session.user.socialOnly){
        next();
    }else{
        return res.redirect("/");
    }
}
export const avatarUpload = multer({
    dest:"uploads/avatars", limits:{
        fileSize:60000,
    }
})
export const videoUpload = multer({
    dest:"uploads/videos", limits:{
        fileSize:15000000,
    }
})