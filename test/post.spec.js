import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        abc123: {
          likes: 0,
          post: 'Hola mundo',
          privacy: 'public',
          user: 'Ivana Chiquinquira Olortegui Moreno',
          userId: 'lIwQuh6fYSXpUF9ukwHJNmeaEln2'

        },
        /* abc124: {
          title: 'Me encanta reciclar'
        } */
      }
    }
  }
}

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import {

  addPost,
  getPost,
  editPost,
  deletedPost,
  addCommentPost,
  getComentPost
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
        getPost(callback)
      })
  })
})

describe('editPost', () => {
  it('editPost aregar un post', (done) => {
    return editPost('abc123', 'hi', 'public').then(() => {
      const callback = (post) => {
        const postAdded = post.find(ele => ele.id === 'abc123')
        expect(postAdded.post).toBe('hi')
        done()
      }
      getPost(callback)
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

/* describe('addCommentPost', () => {
  it('addCommentPost deberia ',(done) => {
    return addCommentPost('abc123','Muy bueno').then (()=>{
      const callback = (post) => {
        const commet = post.find(ele => ele.post=== 'Muy bueno');
        expect(commet).toBe('Muy bueno');
        done()
      }
      getComentPost('abc123',callback)
    })
  })

}) */