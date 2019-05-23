export const singUp = (email, contraseña) =>  firebase.auth().createUserWithEmailAndPassword(email, contraseña)

export const signIn = (email, contraseña) =>  firebase.auth().signInWithEmailAndPassword(email, contraseña)

export const signOut = () => firebase.auth().signOut()

export const signInWithFacebook = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider)
}

// new firebase.auth.FacebookAuthProvider() me retorna un objeto con el id del provedor que es facebook 
export const signInWithGmail = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
};

export const userData = () => firebase.auth().currentUser;

export const onUsuarioLoggeado = (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    //if (user) {
    callback(user)
    //} 
  })
}

export const addPost = (post, userId, user, privacySelectValue, numberLike, date) => {
  //inicializamos firestore y llammos a la funcion colectioncon el nombre de la coleccion llamada usuario y con aDD agregamos 
  // los campos post 
  return firebase.firestore().collection('post').add({
    userId: userId,
    user: user,
    post: post,
    privacy: privacySelectValue,
    likes: numberLike,
    date: date
  })
}

export const getPost = (callback) => {
  return firebase.firestore().collection('post').orderBy("date", "desc")
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.docs.forEach((post) => {
        data.push({
          id: post.id,
          post: post.data().post,
          user: post.data().user,
          userId: post.data().userId,
          privacy: post.data().privacy,
          likes: post.data().likes,
          date: post.data().date 
        })
      });
      callback(data);
    });
  }
  
export const getPrivatePost = (userIdPost, callback) => {
   return  firebase.firestore().collection('post')
   .where("userId", "==", userIdPost).where("privacy", "==", "private")
   .orderBy("date", "desc").onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.docs.forEach((post) => {
      data.push({
        id: post.id,
        post: post.data().post,
        user: post.data().user,
        userId: post.data().userId,
        privacy: post.data().privacy,
        likes: post.data().likes,
        date: post.data().date
      })
    });
    callback(data);
  });
  }

export const getPublicPost = (callback) =>{
  return firebase.firestore().collection('post')
  .where("privacy", "==", "public").orderBy("date", "desc")
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.docs.forEach((post) => {
        data.push({
          id: post.id,
          post: post.data().post,
          user: post.data().user,
          userId: post.data().userId,
          privacy: post.data().privacy,
          likes: post.data().likes,
          date: post.data().date
        })
      });
      callback(data);
    });
  }


// firebase.auth().currentUser me retorna un objeto con todo la informacio que ha ingresado
/* export const post = () => {
  return firebase.firestore().collection('post').get()
} */
// toda la funcion addpublication me retorna una premesa y por eso en el otro lado se le hace un then si fue exitosa



export const editPost = (id, textPost, privacy) => {
  return firebase.firestore().collection('post').doc(id).update({
    post: textPost,
    privacy: privacy
  })
}

export const editLike = (id, totaLike, newLike) => {
  return firebase.firestore().collection('post').doc(id).update({
    likes: totaLike + newLike
  })
}

export const deletedPost = (id) => {
  return firebase.firestore().collection('post').doc(id).delete();
}

export const addCommentPost = (id, comment) => {
  return firebase.firestore().collection('post').doc(id).collection('comments').add({
    postComent: comment,
    date: new Date().toLocaleString()
  })
}

export const getComentPost = (id, callback) => {
  return firebase.firestore().doc(`post/${id}`).collection('comments').orderBy("date", "asc")
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.docs.forEach((post) => {
       data.push({ 
         id: post.id,
         ...post.data()})
      });
      callback(data)
    });  
} 


    