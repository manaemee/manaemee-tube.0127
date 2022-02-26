const videos = document.querySelectorAll("video");


for (const video of videos) {
    video.addEventListener('ended', function(event) {
    const {videoid} = video.dataset;
    fetch(`/api/videos/${videoid}/view`,{
        method:"POST",
    })
    })
  }
