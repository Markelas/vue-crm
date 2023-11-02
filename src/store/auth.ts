import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/firestore'
import { getDatabase, ref, set } from 'firebase/database'
import { IFormData } from '@/types/form.types'
export default {
  actions: {
    // @ts-ignore
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e) // Вызываем мутацию из state
        throw e
      }
    }, // @ts-ignore
    async register ({ dispatch, commit }, formdata:IFormData) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(formdata.email, formdata.password) // Обращаемся к firebase, для регистрации по email и паролю
        const uid = await dispatch('getUid') // обращаемся к экшенам vuex, используем dispatch
        await set(ref(getDatabase(), `users/${uid}/info`), {
          bill: 10000,
          username: formdata.name
        }) // Обращаемся к firebase, базе данных, по пути, где uid уникальный id, в блоке info, указываем, сколько у него денег вначале
      } catch (e) {
        commit('setError', e) // Вызываем мутацию из state
        throw e
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout () {
      await firebase.auth().signOut()
    }
  }
}
