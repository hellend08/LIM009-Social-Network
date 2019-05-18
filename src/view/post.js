import { editPostSubmit, countLikes, deletedPostSubmit } from './view-controller.js'

export default (post, index, userId) => {

  const divPostContent = document.createElement('div');
  if (userId === post.userId && (post.privacy === 'private' || post.privacy === 'public')) {
    divPostContent.innerHTML = `
    <section class="block-post">
      <p class="user-post"> ${post.user} </p>
      <p class="post-post"> ${post.privacy === 'private' ? `${post.post} &#128274  <span id="btn-edit-${index}"> &#x1F58A  </span> ` :
      `${post.post} &#128101`} </p>
      <form>
        <span id="btn-edit-${index}"> <img class="icon-post" src="./img/edit.png"> </span>
        <span id="count-likes-${index}">${post.likes} <img class="icon-post" src="./img/like.png"> </span>
        <span id="btn-deleted-${index}"> <img class="icon-post" src="./img/delete.png"> </span>
      </form>
    </section>`;

    divPostContent.querySelector(`#count-likes-${index}`).addEventListener('click', () => {
      countLikes(post.id, post.likes, 1)
    })
    divPostContent.querySelector(`#btn-edit-${index}`).addEventListener('click', () => {
      editPostSubmit(post.post, post.id)
    })

    divPostContent.querySelector(`#btn-deleted-${index}`).addEventListener('click', () => {
      deletedPostSubmit(post.id)
    })

  } else {
    if (userId != post.userId && post.privacy === 'public') {
      divPostContent.innerHTML = `
      <section class="block-post">
        <p class="user-post"> ${post.user} </p>
        <p class="post-post" rows="8" cols="50"> ${post.post} &#128101   </p>
        <form>
          <span id="btn-delete" ><img class="icon-post" src="./img/delete.png"/></span>
        </form>
      </section>`;
      divPostContent.innerHTML += ` <div id="count-likes-${index}"> ${post.likes} &#x1F49A </div>`

      divPostContent.querySelector(`#count-likes-${index}`).addEventListener('click', () => {
        countLikes(post.id, post.likes, 1)
      })
    }
  }
  return divPostContent;
}
