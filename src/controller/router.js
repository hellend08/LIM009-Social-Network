import { components } from '../view/index.js'
import { logOutSubmit } from '../view/view-controller.js'
import { userData, onUsuarioLoggeado, getPost } from '../controller/controller-Firebase.js'



export const changeView = (router) => {
  const divContainer = document.getElementById('all-page');
  divContainer.innerHTML = ''; // ANtes de hacr cualquier cambio te limpies
  switch (router) {
    case '#/signIn': {
      if (!userData()) {
        divContainer.appendChild(components.SignInView())
      } else {
        window.location.hash = '#/home'
      }

    }
      break;
    case '#/signUp': {
      divContainer.appendChild(components.signUpView())
    }
      break;
    case '#/home': {
      if (userData()) {        
        getPost((post) => {
          divContainer.innerHTML = '';
          divContainer.appendChild(components.home(post))
        })
      } else {
       
        window.location.hash = '#/signIn'
      }
    }
      break;
    case '#/signOut': {
      logOutSubmit()
    }
      break;
    default:
      if (userData()) {
        window.location.hash = '#/home'
      } else {
        window.location.hash = '#/signIn'
      }
      break;
  }
}


export const initRouter = () => {
  window.addEventListener('load', () => { 
    //changeView(window.location.hash)
   setTimeout(() => changeView(window.location.hash), 700)
  })
  if (("onhashchange" in window)) window.onhashchange = () => changeView(window.location.hash)
 
  //onUsuarioLoggeado(() => changeView('#/home'))
}