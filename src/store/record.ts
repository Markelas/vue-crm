
import { get, getDatabase, ref, set } from 'firebase/database'
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
    },
    // @ts-ignore
    async fetchRecords ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid') // Получаем uid пользователя
        const database = getDatabase()
        const records = (await get(ref(database, `/users/${uid}/records`)))
        const recordsObj = records.val()
        if (recordsObj) {
          return Object.keys(recordsObj).map(key => ({ ...recordsObj[key], id: key }))
        } else {
          return []
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
