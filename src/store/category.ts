
import { getDatabase, ref, set, get } from 'firebase/database'
export default {
  actions: {
    // @ts-ignore
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid') // Получаем uid пользователя
        const database = getDatabase()
        const categoryID = Date.now() // Задаём рандомный ID для категории
        await set(ref(database, `/users/${uid}/categories/${categoryID}`), { title, limit })
        return { title, limit, categoryID }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }, // @ts-ignore
    async fetchCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid') // Получаем uid пользователя
        const database = getDatabase()
        const categories = (await get(ref(database, `/users/${uid}/categories`)))
        const categoriesObj = categories.val()
        // @ts-ignore
        return Object.keys(categoriesObj).map(key => ({ ...categoriesObj[key], id: key }))
        // С firebase приходил ID и в нем значения, переформировал
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
