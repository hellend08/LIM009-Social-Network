import { editPostSubmit, countLikes, deletedPostSubmit, commentPostSubmit,   } from './view-controller.js'
import { getComentPost } from '../controller/controller-Firebase.js'
import commenTemplates from './comments.js'



export default (post, index, userId) => {
  const divPostContent = document.createElement('div');
  divPostContent.innerHTML = ` 
    <section>
    <p class="user-post"> ${post.user}${userId === post.userId ?
      `<span id="btn-deleted-${index}">   &#x1D5EB </span>` : ''} </p>
    <div id="post-text-${index}" class="post-post"> <p>${post.privacy === 'private' ? `${post.post} &#128274 ` :
      `${post.post} &#128101`}</p> </div>
    <div>`
  if (userId === post.userId) {
    divPostContent.innerHTML += `
    <span id="btn-edit-${index}"> 
      <img class="icon-post" src="./img/edit.png" alt="edit-logo"></span>
      `;
  }

  divPostContent.innerHTML += ` <span id="count-likes-${index}">${post.likes} <img class="icon-post" src="./img/like.png" alt="logo-like"> </span>   
      <div id="comments-content-${index}" ></div>
      <input class= "imput-comment"name="text" rows="8" cols="50" id="input-comment-${index}"
  placeholder="Comment"></input>
  <button class="button-home" id="btn-comment-post-${index}"><img class="icon-post" src="./img/telegram.png" alt="logo-comment"></button>  
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