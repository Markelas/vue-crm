import firebase from 'firebase/compat/app'

export default {
  actions: {
    // @ts-ignore
    async login ({ dispatch, commit }, { email, password }) {
      try {
        // @ts-ignore
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        throw e
      }
    }
  }
}
