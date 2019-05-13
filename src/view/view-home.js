import { userData } from '../controller/controller-Firebase.js'
import {
  addPostSubmit,
  editPostOnclick
} from './view-controller.js'


export const home = (post) => {
  const pageMain = document.createElement('div');
  const user = userData();
  /* let us;
  onUsuarioLoggeado((user) => console.log(user))
  console.log(us); */

  let template;
  if (user.displayName && user.photoURL) {
    template = `
    <nav class="menu">
    <ul>
    <a class="menu-items" href=""><h4>&#x1F464 ${user.email}</h4></a>
    <a class="menu-items" href="#/home"><h4>PureLife</h4></a>
    <a class="menu-items" href="#/signOut"><h4>cerrar sesion</h4></a>
    <a class="menu-menu" href=""><h1>&#9776</h1></a>
    </ul>
    </nav>
    <img class="profile-logo" src="${user.photoURL}">
    <h3 class="text">Bienvenido ${user.displayName} </h3>
  
   
    `;
  } else {
    template = `
    <nav class="menu">
    <ul>
    <a class="menu-items" href=""><h4>&#x1F464 ${user.email}</h4></a>
    <a class="menu-items" href="#/home"><h4>PureLife</h4></a>
    <a class="menu-items" href="#/signOut"><h4>cerrar sesion</h4></a>
    <a class="menu-menu" href=""><h1>&#9776</h1></a>
    </ul>
    </nav>
    <img class="profile-logo" src="./img/avatar.png">
    <h3 class="text">Bienvenido ${user.email} </h3>
    
    `;

  }

  template += `<div>
  <textarea name="textarea" rows="10" cols="40" id="input-post"></textarea>
  <select id= "privacy-select"> 
  <option value="public" > Público &#128101 </option>
  <option value="private">Privado &#128274</option> 
  <select> 
  <button class="button" id="btn-add-post"> compartir </button>
  <button class="hidden" id="btn-edit-post"> Editar </button>  
  </div>
  <div id= "post-content">
  </div>`;

  pageMain.innerHTML = template;
  const userName = user.email;
  const userId = user.uid;
  const privacySelect = pageMain.querySelector('#privacy-select');
  const btnAddPost = pageMain.querySelector('#btn-add-post');
  btnAddPost.addEventListener('click', () => {
    const privacySelectValue = privacySelect.value
    addPostSubmit(userId, userName, privacySelectValue)
  });

  const divPost = pageMain.querySelector('#post-content');
  post.forEach((post, index) => {
    if (userId === post.userId) {
      if (post.privacy === 'private' || post.privacy === 'public') {
        const btnEdit = document.createElement("p");
        btnEdit.innerHTML = '&#x1F58A';
        btnEdit.setAttribute('id', `btn-edit-${index}`)
        const pPost = document.createElement('p');
        const pUser = document.createElement('p');
        pPost.innerHTML = post.privacy === 'private' ? `${post.post} &#128274` :
          `${post.post} &#128101`
        pUser.innerHTML = post.user;
        divPost.appendChild(pUser);
        divPost.appendChild(btnEdit);
        divPost.appendChild(pPost);

        const editPostSubmit = pageMain.querySelector(`#btn-edit-${index}`);
        editPostSubmit.addEventListener('click', () => {
          editPostOnclick(post.post, post.id)
        })
      }

    } else {
      if (userId != post.userId && post.privacy === 'public') {
        const pPost = document.createElement('p');
        const pUser = document.createElement('p');
        pPost.innerHTML = `${post.post} &#128101`
        pUser.innerHTML = post.user;
        divPost.appendChild(pUser);
        divPost.appendChild(pPost);

      }
    }
  });

  // const btnCerrar = pageMain.querySelector('#log-out');
  // btnCerrar.addEventListener('click', logOutSubmit)

  return pageMain;
}