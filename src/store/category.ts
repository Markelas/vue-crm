import firebase from 'firebase/compat/app'
import category from '@/store/category'
import { getDatabase, ref, get, set } from 'firebase/database'
export default {
  actions: {
    // @ts-ignore
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid') // Получаем uid пользователя
        const database = getDatabase()
        /// const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        const categoryID = Date.now() // Задаём рандомный ID для категории
        await set(ref(database, `/users/${uid}/categories/${categoryID}`), { title, limit })
        return { title, limit, categoryID }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
