import Video from "../models/Video";

export const trending = async (req, res) => {
const {keyword} = req.query;
if(keyword){
    const videos = await Video.find({
        title: { $regex: keyword, $options: 'i' }
    });
    if(videos.length !== 0){
        return res.render("search", {videos});
    }
   return res.render("404");
}
const videos = await Video.find({}).sort({createdAt:"desc"});
    return res.render("home", {pageTitle: "Home", videos});
};
export const getUpload = (req, res) => {
    return res.status(404).render("upload", {pageTitle:"Upload"})
};

export const postUpload = async (req, res) =>{
    const {title, description, hashtags} = req.body;
    try{
    await Video.create({
            title,
            description,
            hashtags:Video.formatHashtags(hashtags)
        });
    }catch(error){
        return res.status(400).render("upload", {
            pageTitle:"Upload",
            errorMessage: `error : ${error.errors.description}`,
        })
    }

    return res.redirect("/");
}
export const getEditVideo = async (req, res) => {
   const {id} = req.params;
   const video = await Video.findById(id);
   if(!video){
    return res.status(404).render("404", {pageTitle:"Sorry, Video not found!"});
   };
    return res.render("VideoEdit", {pageTitle: "Edit Your Video",video});
};
export const postEditVideo = async (req, res) =>{
    const {id} = req.params;
    const {title, description, hashtags} = req.body;

    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle: "Video not found"});
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    })
    return res.redirect("/");
}
export const removeVideo = async (req, res) => {
    const {id} = req.params;
   await  Video.findByIdAndDelete(id);
    return res.redirect("/");
};