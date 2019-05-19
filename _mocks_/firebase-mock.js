const firebase = () => {
  return {
    auth: () => {
      return {
        createUserWithEmailAndPassword: (email, password) => {
          return new Promise((relsolved) => {
            relsolved({email: email, password:password})
          })
        }
      }
    }
  }

};


export default jest.fn(() => {
  return firebase();
})
/*
    {} */
