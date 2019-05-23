import MockFirebase from 'mock-cloud-firestore';

beforeEach(() => {
  const fixtureData = {
    __collection__: {
      post: {
        __doc__: {
          abc123: {
            __collection__: {
              comments: {
                __doc__: {
                  abz12345: {
                    postComent: 'hola'
                  }
                }
              }
            },
            likes: 0,
            post: 'Hola mundo',
            privacy: 'public',
            user: 'Ivana Chiquinquira Olortegui Moreno',
            userId: 'lIwQuh6fYSXpUF9ukwHJNmeaEln2'

          },
          abc55: {
            __collection__: {
              comments: {
                __doc__: {
                  abci12034: {
                    postComent: 'hola'
                  }
                }
              }
            }
          },
          likes: 0,
          post: 'Hola mundo',
          privacy: 'private',
          user: 'Margarita Fernandez',
          userId: 'mIwQuh6fYSXpUF9ukwHJNmeaEln2'
        }
      }
    }
  }

  global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
})

import {

  addPost,
  getPost,
  getPublicPost,
  getPrivatePost,
  editPost,
  deletedPost,
  addCommentPost,
  getComentPost,
  editLike
} from "../src/controller/controller-Firebase.js";

describe('addPost', () => {
  it('addPost aregar un post', (done) => {
    return addPost('Hola amigos', '12345', 'chiquinquira@gmail.com', 'public', 1,
      '5/16/2019, 2:36:01 PM').then(() => {
        const callback = (post) => {
          const postAdded = post.find(ele => ele.post === 'Hola amigos')
          expect(postAdded.post).toBe('Hola amigos')
          done()
        }
        getPublicPost(callback)
      })
  })
})

describe('editPost', () => {
  it('editPost aregar un post', (done) => {
    return editPost('abc123', 'hi', 'private').then(() => {
      const callback = (post) => {
        const postAdded = post.find(ele => ele.id === 'abc123')
        expect(postAdded.post).toBe('hi')
        done()
      }
      getPrivatePost('lIwQuh6fYSXpUF9ukwHJNmeaEln2', callback)
    })
  })
})

describe('deletedPost', () => {
  it('deletedPost eliminar un post', (done) => {
    return deletedPost('abc123').then(() => {
      const callback = (post) => {
        const postDeleted = post.find(ele => ele.id === 'abc123');
        expect(postDeleted).toBe(undefined);
        done()
      }
      getPost(callback)
    })
  })
})

describe('editLike', () => {
  it('deberia tener conteo de los me gustas en los post', (done) => {
    return editLike('abc123', 0, 1).then(() => {
      const callback = (post) => {
        const postLIke = post.find(ele => ele.id === 'abc123')
        expect(postLIke.likes).toEqual(0 + 1)
        done()
      }
      getPost(callback)
    })
  })
})

describe('addCommentPost', () => {
  it('addCommentPost deberia ', (done) => {
    return addCommentPost('abc123', 'Muy bueno').then(() => {
      const callback = (post) => {
        const commet = post.find(ele => ele.postComent === 'Muy bueno');
        expect(commet.postComent).toBe('Muy bueno');
        done()
      }
      getComentPost('abc123', callback)
    })
  })

}) 
