import {
  singUp,
  signIn,
  signInWithFacebook,
  signInWithGmail,
  signOut,
  editPost,
  addPost,
  editLike,
  deletedPost,
  addCommentPost
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

export const addPostSubmit = (userId, user, privacySelectValue, numberLike) => {
  const input = document.querySelector('#input-post').value;
  const datePost = new Date().toLocaleString();
  addPost(input, userId, user, privacySelectValue, numberLike, datePost);

}

const addShowClassList = (id) => {
  id.classList.add('shower', 'button')
}

const addHiddenClassList = (id) => {
  id.classList.add('hidden')
}

export const editPostSubmit = (textPost, id) => {
  document.querySelector('#input-post').value = textPost;
  const btnAddPost = document.querySelector('#btn-add-post');
  btnAddPost.classList.remove('button', 'shower');
  addHiddenClassList(btnAddPost)
  const btnEditPost = document.querySelector('#btn-edit-post')
  addShowClassList(btnEditPost);
  btnEditPost.addEventListener('click', () => { 
    btnEditPostSubmit(btnAddPost, btnEditPost, id)
  });
}

const btnEditPostSubmit = (btnAddPost, btnEditPost, id) => {
  const postEdited = document.querySelector('#input-post').value;
  const privacySelectValue = document.querySelector('#privacy-select').value;
  editPost(id, postEdited, privacySelectValue);
  addShowClassList(btnAddPost);
  addHiddenClassList(btnEditPost);
}

export const countLikes = (id, totaLike, newLike) => {
  editLike(id, totaLike, newLike)
}

export const deletedPostSubmit = (id) => {
  deletedPost(id)
}

export const commentPostSubmit = (id, index) => {
  const inputValue = document.getElementById('input-comment');
  const divContentComment = document.querySelector(`#comment-content-${index}`);
  addCommentPost(id, inputValue.value)
  divContentComment.innerHTML = '';

}