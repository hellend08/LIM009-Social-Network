
import { logupSubmit } from './view-controller.js'


export default () => {
  const divSignUp = document.createElement('div');
  const templateImput = `
  <div class='block-container'>
    <header>
      <img class="logo" src="./img/logo.png">
    </header>
    <section class="block-login" id="pag-one">
      <p><img class="titulo" src="./img/titulo.png"></p>
      <p class= "error-message" id="error-message"></p>
      <input class="login-input" id="name" type="text" placeholder="Nickname">
      <input class="login-input" id="email" type="email" placeholder="   &#9993     Email">
      <input class="login-input" id="contraseña" type="password" placeholder="   &#128274     Password">
      <button class="button" id="sign-up">Registrar</button>
    </section>
  </div>
     `;

  divSignUp.innerHTML = templateImput;
  const btn = divSignUp.querySelector('#sign-up');
  btn.addEventListener('click', logupSubmit)
  return divSignUp;
}