import { userData } from '../controller/controller-Firebase.js'
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
        <a class="menu-items" href=""> <h4> &#x1F464 ${user.displayName ? `${user.displayName}` : `${user.email}`} </h4></a>
        <a class="menu-items" href="#/home"> <h4> <img class="icon-menu" src="./img/recycle.png"> PureLife </h4> </a>
        <a class="menu-items" href="#/signOut"><h4> <img class="icon-menu" src="./img/logout.png"> cerrar sesion </h4> </a>
        <a class="menu-menu" href=""> <h1> &#9776 </h1> </a>
      </ul>
    </nav>
    <div class="container-home">
    <article class="block-profile">
      <img class="profile-logo" src="${user.photoURL ? `${user.photoURL}` : `./img/avatar.png`}">
      <h3> Bienvenido <br>
      ${user.displayName ? `${user.displayName}` : `${user.email}`} </h3>
    </article>
    <section class="block-home">
      <textarea class="share-post" name="textarea" rows="8" cols="50" id="input-post" placeholder="¿Qué estas pensando?"></textarea>
      <form>
      <label for="file">&#128247</label>
      <input class="hidden" type="file" id="input-file" name="file" accept="image/png, image/jpeg, image/gif" multiple>
        <select id="privacy-select">
          <option value="public" > Público &#128101 </option>
          <option value="private">Privado &#128274</option>
        </select>
        <button class="button" id="btn-add-post"> Share </button>
        <button class="hidden" id="btn-edit-post"> Edit </button>
      </form>
    <div class="block-home" id= "post-content"></div>
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
  const inputFile = pageMain.querySelector('#input-file');
  post.forEach((post, index) => {
    divPost.appendChild(itemPost(post, index, userId))
  });
  btnAddPost.addEventListener('click', () => {
    const privacySelectValue = privacySelect.value
    addPostSubmit(userId, userName, privacySelectValue, numberLike)
  });
  return pageMain;
}