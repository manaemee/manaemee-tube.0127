import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    });

const multerUploader = multerS3({
          s3: s3,
          bucket: 'manaemeetube',
          acl:"public-read",
      })

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
        req.flash("error", "Login First");
        return res.redirect("/login");
    }
}
export const publicOnlyMiddleware = (req,res,next) => {
    if(!req.session.loggedIn){
        next();
    }else{
        req.flash("error", "Not authorized");
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
    dest:"uploads/avatars", 
    limits:{
        fileSize:6000000,
    },
storage:   multerUploader
})
export const videoUpload = multer({
    dest:"uploads/videos", 
    limits:{
        fileSize:15000000,
    },
storage:multerUploader
})