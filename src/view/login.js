

import { ingresarUsuarioExistente, ingresoDatos, cerrarSession, iniciarSessionFaceBook } from '../controller/controllerFirebase.js/index.js.js';
import {allPageOne} from './getValue.js'

 const keyFirebase = () => {
  let config = {
    apiKey: "AIzaSyBrEkqM2kN4YhK8ALD4rGDziPene6zeWhQ",
    authDomain: "red-social-ecologica.firebaseapp.com",
    databaseURL: "https://red-social-ecologica.firebaseio.com",
    projectId: "red-social-ecologica",
    storageBucket: "red-social-ecologica.appspot.com",
    messagingSenderId: "246884214989"
  }
  firebase.initializeApp(config);
}
keyFirebase();


allPageOne();




const btnIngresar = document.getElementById('ingresar');
btnIngresar.addEventListener('click', () => {
  const email = document.getElementById('email-login').value;
  const contraseña = document.getElementById('contraseña-login').value;
  ingresarUsuarioExistente(email, contraseña);
});

ingresoDatos();

export const aparece = () => {
  const container = document.getElementById('container');
  container.innerHTML = `<p>Bienvenido!</p>
<button id= "cerrar"> cerrar sesión  </button>`;

};
aparece()
 const btnCerrar = document.getElementById('cerrar');
btnCerrar.addEventListener('click', () => {
  cerrarSession();
})

 
const btnFb =  document.getElementById('Facebook');
btnFb.addEventListener('click', () => {
  iniciarSessionFaceBook();
});  
