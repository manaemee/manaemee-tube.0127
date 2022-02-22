import 'regenerator-runtime'
const forms = document.querySelectorAll(".commentFrom");


const addComment = (text, name, image, commentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  const div = document.createElement("div");
  div.className="video__comment__column";
  const profile = document.createElement("img");
  profile.src=image;
  const points = document.createElement("div");
  points.className="comment__info";
  const h3  = document.createElement("h3");
  h3.innerText = name;
  const p = document.createElement("p");
  p.innerText =text;
  const deleteComment = document.createElement("div");
  deleteComment.className="video__comment__column";
  const link = document.createElement("a");
  link.innerText ="Delete";
  link.href=`/api/comments/${commentId}/delete`;
  deleteComment.appendChild(link);
  points.appendChild(h3);
  points.appendChild(p);
  newComment.appendChild(div);
  newComment.appendChild(deleteComment);
  div.appendChild(profile);
  div.appendChild(points);
  videoComments.prepend(newComment);
};

if(forms){
  forms.forEach( (form) => {
  const handleSubmit = async (event) => {
        event.preventDefault();
        const videoId = event.target.dataset.videoid;
        const text = event.target[0].value;
 if(text !== ""){
const response = await fetch(`/api/comments/${videoId}/comment`, {
    method: "POST",
    headers:{
"Content-Type": "application/json"
    },
    body: JSON.stringify({ text }),
  });
  event.target[0].value="";
  const{name, image, commentId} = await response.json(); 
  console.log(text, name, image,commentId);
  if(response.status === 201){
    addComment(text, name, image, commentId);
  }
 }
  }
   form.addEventListener('submit', handleSubmit);
  });
}
