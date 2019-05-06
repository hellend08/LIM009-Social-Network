
export const registroUsuarioNuevo = (email, contraseña) =>
  firebase.auth().createUserWithEmailAndPassword(email, contraseña)


export const ingresarUsuarioExistente = (email, contraseña) => 
  firebase.auth().signInWithEmailAndPassword(email, contraseña)



export const ingresoDatos = () =>  {
  return new Promise((resolve, reject) =>  {
  firebase.auth().onAuthStateChanged((user) => {
     if(user)  {
       return resolve(user);
     }
     else  {
      return reject('error')
     }
   })
  })
};
/*     if (user) {
      // User is signed in.
      console.log('sesion iniciado');
      var displayName = user.displayName;
      var email = user.email;
      console.log(email);
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      // ...
    } else {
      // User is signed out.
      console.log('no existe usuario');

      // ...
    }
  }); 
 */


export const cerrarSession = () => firebase.auth().signOut()

export const iniciarSessionFaceBook = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider)
}


// new firebase.auth.FacebookAuthProvider() me retorna un objeto con el id del provedor que es facebook 
export const iniciarSesionGmail = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
};
export const userData = () => firebase.auth().currentUser;


// firebase.auth().currentUser me retorna un objeto con todo la informacio que ha ingresado

export const addPublication = (publication) => {
  firebase.firestore().collection('publication').add({
    publication : publication

  })

}
// toda la funcion addpublication me retorna una premesa y por eso en el otro lado se le hace un then si fue exitosa