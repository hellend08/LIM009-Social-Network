import { editPostSubmit, countLikes, deletedPostSubmit, commentPostSubmit } from './view-controller.js'
import { getComentPost } from '../controller/controller-Firebase.js'
import commenTemplates from './comments.js'


const addCommentSubmit = (id, index) => {
  const divContentComment = document.createElement('div');
  divContentComment.innerHTML = `<input class= "imput-comment"name="text" rows="8" cols="50" id="input-comment"
  placeholder="Comentario"></input>
  <button class="button" id="btn-comment-post-${index}"> Comentar </button>  
  `;

  const btnComment = divContentComment.querySelector(`#btn-comment-post-${index}`)
  btnComment.addEventListener('click', () => {
    commentPostSubmit(id, index);
  });

  return divContentComment;
};

export default (post, index, userId) => {
  const divPostContent = document.createElement('div');
  divPostContent.innerHTML = ` 
    <section class="block-post">
    <p class="user-post">Publicado por ${post.user}${userId === post.userId ?
      `<span id="btn-deleted-${index}"><img class="icon-post" src="./img/delete.png"></span>` : ''} </p>
    <p class="post-post"> ${post.privacy === 'private' ? `${post.post} &#128274 ` :
      `${post.post} &#128101`} </p>`;
  if (userId === post.userId) {
    divPostContent.innerHTML += `
    <span id="btn-edit-${index}"> 
      <img class="icon-post" src="./img/edit.png"> </span>
      `;
  }

  divPostContent.innerHTML += ` <span id="count-likes-${index}">${post.likes} <img class="icon-post" src="./img/like.png"> </span>   
   
      <div id="comments-content-${index}" ></div> </div>
     
      <input class= "imput-comment"name="text" rows="8" cols="50" id="input-comment"
  placeholder="Comentario"></input>
  <button class="button" id="btn-comment-post-${index}"> Comentar </button>  
    </div>
  </section>
    
      `;
  divPostContent.querySelector(`#count-likes-${index}`).addEventListener('click', () => {
    countLikes(post.id, post.likes, 1)
  });
  if (divPostContent.querySelector(`#btn-edit-${index}`) != null) {
    divPostContent.querySelector(`#btn-edit-${index}`).addEventListener('click', () => {
      editPostSubmit(post.post, post.id)
    });
  }

  if (divPostContent.querySelector(`#btn-deleted-${index}`) != null) {
    divPostContent.querySelector(`#btn-deleted-${index}`).addEventListener('click', () => {
      deletedPostSubmit(post.id)
    });
  }
  /*  divPostContent.querySelector(`#btn-coment-${index}`).addEventListener('click', () => {
    const divComment = divPostContent.querySelector(`#comment-content-${index}`)
    divComment.appendChild(addCommentSubmit(post.id, index))
  });
  
  const divComments = divPostContent.querySelector(`#comments-content-${index}`)
  getComentPost(post.id, (comments) => {
    divComments.innerHTML = '';
    comments.forEach(comment => {
      divComments.appendChild(commenTemplates(comment));
    });
  }) */
  const btnComment = divPostContent.querySelector(`#btn-comment-post-${index}`)
  btnComment.addEventListener('click', () => {
    commentPostSubmit(post.id, index)
  })
  const divComments = divPostContent.querySelector(`#comments-content-${index}`)
  getComentPost(post.id, (comments) => {
    divComments.innerHTML = '';
    comments.forEach(comment => {
      divComments.appendChild(commenTemplates(comment))
    });
  })
  
  return divPostContent;
}