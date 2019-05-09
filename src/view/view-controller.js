import { 
  singUp,
  signIn,
  signInWithFacebook,
  signInWithGmail,
  signOut,

  addPost
} from '../controller/controller-Firebase.js'
import { changeView } from '../controller/router.js'
//import {contentPost} from './view-home.js' 



const showErrorMessage = (error) =>{
  const errorMessage = document.querySelector('#error-message');
  errorMessage.innerHTML = error.message;

}

export const loginSubmit = () => {
  const emailUser = document.querySelector('#email-login').value;
  const passwordUser = document.querySelector('#password-login').value;
  signIn(emailUser, passwordUser).then(() => {
    window.location.hash = '#/home';
  }).catch(error => showErrorMessage(error));
}

export const loginWithFacebookSubmit = () => {
  signInWithFacebook()
    .then(() => {
      window.location.hash = '#/home';
    }).catch(error => {
      showErrorMessage(error);
    });
}

export const loginWithGmailSubmit = () => {
  signInWithGmail().then(() => {
    window.location.hash = '#/home';
  }).catch(err => {
    showErrorMessage(error);
  });
}

export const logupSubmit = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#contraseña').value;
  singUp(email, password).then(() => window.location.hash = '#/home')
    .catch((error) => showErrorMessage(error))
}

export const logOutSubmit = () => {
  signOut()
    .then(() => {
      window.location.hash = '#/';
    }).catch(() => {
      console.error('Sign Out Error', error);
    });
}

export const addPostSubmit = (id) => {
  const input = document.querySelector('#input-post').value;

  
  addPost(input,id);
  document.querySelector('#input-post').value ='';





}


 

