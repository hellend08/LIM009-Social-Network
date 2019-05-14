import {
  singUp,
  signIn,
  signInWithFacebook,
  signInWithGmail,
  signOut,
  editPost,
  addPost
} from '../controller/controller-Firebase.js'




const showErrorMessage = (error) => {
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
  }).catch(error => {
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
      window.location.hash = '#/signIn';
    }).catch(() => {
      console.error('Sign Out Error', error);
    });
}

export const addPostSubmit = (userId, user, privacySelectValue) => {
  const input = document.querySelector('#input-post').value;
  addPost(input, userId, user, privacySelectValue);

}




export const editPostOnclick = (textPost, id) => {
  document.querySelector('#input-post').value = textPost;
  const btnAddPost = document.querySelector('#btn-add-post');
  btnAddPost.classList.remove('button','shower');
  btnAddPost.classList.add('hidden');
  const btnEditPost = document.querySelector('#btn-edit-post')
  btnEditPost.classList.add('shower','button');
  btnEditPost.addEventListener('click', () => {
    const postEdited = document.querySelector('#input-post').value;
    const privacySelectValue = document.querySelector('#privacy-select').value;
    editPost(id, postEdited, privacySelectValue);
    btnAddPost.classList.add('shower');
    btnEditPost.classList.add('hidden');
    
  });
}



