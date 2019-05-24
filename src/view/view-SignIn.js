import {
  loginSubmit,
  loginWithGmailSubmit, 
  loginWithFacebookSubmit
} from './view-controller.js'

export default () => {
  const body = document.createElement('div');
  const template = `
  <div class="block-container">
    <header>
      <img class="logo" src="./img/logo.png" alt="logo-principal">
    </header>
    <section class="block-login" id="pag-one">
      <p><img class="tittle" src="./img/titulo.png" alt="tittle"></p>
      <h4 class="text" >Bienvenida a PureLife, la red donde reciclar es divertido.</h4>
      <p class="error-message" id="error-message"></p>
      <input class="login-input" id="email-login" type="email" placeholder="   &#9993    Email">
      <input class="login-input" id="password-login" type="password" placeholder="   &#128274     Password">
      <a href="#/ingresar"><button class="button" id="log-in"> Log In </button></a>
      <article>
        <h4 class="text">O inicia sesión con...</h4>
        <a id="Facebook"><img class="icon-social" src="./img/facebook.png" alt="facebook"></a>
        <a" id="Gmail"><img class="icon-social" src="./img/gmail.png" alt="gmail"></a>
      </article>
      <h4 class="text" >¿No tienes una cuenta?<a href="#/signUp"> Regístrate.</a></h4>
    </section>
  </div>`;
  body.innerHTML = template;

  const btnLogIn = body.querySelector('#log-in')
  btnLogIn.addEventListener('click', loginSubmit);

  const btnGmail = body.querySelector('#Gmail');
  btnGmail.addEventListener('click', loginWithGmailSubmit)

  const btnFacebook = body.querySelector('#Facebook');
  btnFacebook.addEventListener('click', loginWithFacebookSubmit);

  return body;
}

