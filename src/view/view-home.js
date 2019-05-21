import { userData, getPublicPost, getPrivatePost } from '../controller/controller-Firebase.js'
import { addPostSubmit } from './view-controller.js'

import itemPost from './post.js'

export const home = (post) => {
  const pageMain = document.createElement('div');
  const user = userData();
  /* let us;
  onUsuarioLoggeado((user) => console.log(user))
  console.log(us); */
  const template = `
  <main>
    <nav class="menu">
      <ul>
        <a class="menu-items" href=""><h4> &#x1F464 ${user.displayName ? `${user.displayName}` : `${user.email}`} </h4></a>
        <a class="menu-items" href="#/home"> <h4> <img class="icon-menu" src="./img/recycle.png"> PureLife </h4> </a>
        <a class="menu-items" href="#/signOut"><h4> <img class="icon-menu" src="./img/logout.png"> cerrar sesion </h4> </a>
        <a class="hidden" href=""> <h1> &#9776 </h1> </a>
      </ul>
    </nav>
    <div class="block-home">
      <article class="block-profile">
        <span><img class="titulo" src="./img/titulo.png"></span>
        <img class="profile-logo" src="${user.photoURL ? `${user.photoURL}` : `./img/avatar.png`}">
        <p> Bienvenido ${user.displayName ? `${user.displayName}` : `${user.email}`} </p>
      </article>
      <section class="block-post">
      <form class="form-post">
        <textarea class="share-post" name="textarea" rows="8" cols="50" id="input-post" placeholder="¿Qué estas pensando?"></textarea>
        <div class="container-btn">
          <label for="input-file">&#128247</label>
          <input class="hidden" type="file" id="input-file" name="file" accept="image/png, image/jpeg, image/gif" multiple>
          <div class="select">
          <select id="privacy-select">
            <option value="public" > Público &#128101 </option>
            <option value="private">Privado &#128274</option>
            </select>
            </div>
          <button class="button" id="btn-add-post"> Share </button>
          <button class="hidden" id="btn-edit-post"> Edit </button>
          </div>
        </form>
        <div id="post-content"></div>
      </section>
      </div>
      </main>`;


  pageMain.innerHTML = template;
  const userName = user.displayName ? user.displayName : user.email;
  const userId = user.uid;
  let numberLike = 0;
  const privacySelect = pageMain.querySelector('#privacy-select');
  const btnAddPost = pageMain.querySelector('#btn-add-post');
  const divPost = pageMain.querySelector('#post-content');


   post.forEach((post, index) => {
    if (userId === post.userId) {
      divPost.appendChild(itemPost(post, index, userId))
    }
  }) 
 
  /*  getPrivatePost(userId,(postArray)=> {
    postArray.forEach((post, index) => {
     
      divPost.appendChild(itemPost(post, index, userId))
      
    })
  })   */

  getPublicPost((postPublic) => {
    postPublic.forEach((post, index) => {
      if (userId != post.userId) {
        divPost.innerHTML=''
        divPost.appendChild(itemPost(post, index, userId))
      }
    })
  })




  btnAddPost.addEventListener('click', () => {
    const privacySelectValue = privacySelect.value

    addPostSubmit(userId, userName, privacySelectValue, numberLike)
  });
  return pageMain;
}