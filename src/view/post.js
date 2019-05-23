import { editPostSubmit, countLikes, deletedPostSubmit, commentPostSubmit,   } from './view-controller.js'
import { getComentPost } from '../controller/controller-Firebase.js'
import commenTemplates from './comments.js'



export default (post, index, userId) => {
  const divPostContent = document.createElement('div');
  divPostContent.innerHTML = ` 
    <section class="block-post">
    <p class="user-post"> ${post.user}${userId === post.userId ?
      `<span id="btn-deleted-${index}"> &#x1D5EB </span>` : ''} </p>
    <div id="post-text-${index}" class="post-post"> <p>${post.privacy === 'private' ? `${post.post} &#128274 ` :
      `${post.post} &#128101`}</p> </div>
    <div>`
  if (userId === post.userId) {
    divPostContent.innerHTML += `
    <span id="btn-edit-${index}"> 
      <img class="icon-post" src="./img/edit.png"> </span>
      `;
  }

  divPostContent.innerHTML += ` <span id="count-likes-${index}">${post.likes} <img class="icon-post" src="./img/like.png"> </span>   
      <div id="comments-content-${index}" ></div> </div>
      <input class= "imput-comment"name="text" rows="8" cols="50" id="input-comment-${index}"
  placeholder="Comentario"></input>
  <button class="button" id="btn-comment-post-${index}"> Comentar </button>  
    </div>
  </section> 
      `;

      //Capturo el like 
  divPostContent.querySelector(`#count-likes-${index}`).addEventListener('click', () => {
    countLikes(post.id, post.likes, 1)
  })

  if (divPostContent.querySelector(`#btn-edit-${index}`) != null) {
    divPostContent.querySelector(`#btn-edit-${index}`).addEventListener('click', () => {
      divPostContent.querySelector(`#post-text-${index}`).innerHTML = ''
      divPostContent.querySelector(`#post-text-${index}`).innerHTML = `
       <input id="input-edit-${index}"class="input"name='coment'></input>
       
       <select  id="privacy-select-edit">
          <option value="public" > Público &#128101 </option>
          <option value="private">Privado &#128274</option>
        </select>
       
      <button type="button"  id="btn-edit-post"> Edit </button>`
      divPostContent.querySelector(`#input-edit-${index}`).value = post.post
    
      editPostSubmit( post.id, index)
    })
  }

  if (divPostContent.querySelector(`#btn-deleted-${index}`) != null) {
    divPostContent.querySelector(`#btn-deleted-${index}`).addEventListener('click', () => {
      deletedPostSubmit(post.id)
    });
  }


  /* const postEdited = document.querySelector('#input-post').value;
  const privacySelectValue = document.querySelector('#privacy-select').value;
  editPost(id, postEdited, privacySelectValue); */


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