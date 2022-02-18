const videos = document.querySelectorAll("video");
const playBtns = document.querySelectorAll(".play"); 
const muteBtns = document.querySelectorAll(".mute");
const times= document.querySelectorAll(".time");
const volumes= document.querySelectorAll(".volume");
console.log(videos);
/* for (const playBtn of playBtns) {
    playBtn.addEventListener('click', function(event) {
for(const video of videos){
    if(video.paused){
        playBtn.innerText = "Pause";
        video.play();
    }else{
        playBtn.innerText = "Play";
        video.pause();
    }
}
    })
  }
for (const muteBtn of muteBtns){
    muteBtn.addEventListener('click', function(event){
       for(const video of videos){
           if(video.muted){
            video.muted = false;
           }else{
               video.muted = true;
           }
       }
    })
} */
for (const video of videos) {
    video.addEventListener('ended', function(event) {
    const {videoid} = video.dataset;
    fetch(`/api/videos/${videoid}/view`,{
        method:"POST",
    })
    })
  }
