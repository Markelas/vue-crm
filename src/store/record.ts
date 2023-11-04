
import { getDatabase, ref, set } from 'firebase/database'
export default {
  actions: {
    // @ts-ignore
    async createRecord ({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid') // Получаем uid пользователя
        const database = getDatabase()
        const categoryID = Date.now() // Задаём рандомный ID для категории
        return await set(ref(database, `/users/${uid}/records/${categoryID}`), { record })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
