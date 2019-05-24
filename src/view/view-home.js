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
        <a class="menu-items" href="#/home"> <h4> <img class="icon-menu" src="./img/recycle.png" alt="image-recycle"> PureLife </h4> </a>
        <a class="menu-items" href="#/signOut"><h4> <img class="icon-menu" src="./img/logout.png" alt="log-out"> cerrar sesion </h4> </a>
        <a class="hidden" href="">&#9776</a>
      </ul>
    </nav>
    <div class="container-home">
      <section class="block-home container-flex">
        <article class="block-profile">
          <h1>PureLife</h1>
          <div class="block-item">
            <img class="profile-logo" src="${user.photoURL ? `${user.photoURL}` : `./img/avatar.png`}" alt="photo-profile">
            <p> Bienvenido <br>
            ${user.displayName ? `${user.displayName}` : `${user.email}`} </p>
          </div>
        </article>
        <div class="block-post" >
          <div class="form-post">
            <textarea class="share-post" name="textarea" rows="8" cols="50" id="input-post" placeholder="¿Qué estas pensando?"></textarea>
            <form class="container-btn">
              <label for="file"><img class="icon-post" src="./img/camera-retro.png" alt="get-photo"></label>
              <input type="file" class="hidden" type="file" id="file" name="file" multiple>
              <div class="select">
                <select  id="privacy-select">
                  <option value="public" >Public &#128101</option>
                  <option value="private">Privade &#128274</option>
                </select>
              </div>
              <button type="button" class="button-home"  id="btn-add-post"> Share </button>
            </form>
          </div>
          <div class="post-container" id= "post-content"></div>
        </div>
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


  /*   post.forEach((post, index) => {
    if (userId === post.userId) {
      divPost.appendChild(itemPost(post, index, userId))
    }
  })  */  
 
  getPrivatePost(userId,(postPrivateArray)=> {
    getPublicPost((postPublic) => {
      let posts = [
        ...postPrivateArray,
        ...postPublic
      ];
    
      posts = posts.sort();
      posts.forEach((post, index) => {
      
          divPost.appendChild(itemPost(post, index, userId))
        
      })
  }) 


  }) 




  btnAddPost.addEventListener('click', (e) => {
    e.preventDefault()
    const privacySelectValue = privacySelect.value

    addPostSubmit(userId, userName, privacySelectValue, numberLike)
  });
  return pageMain;
}