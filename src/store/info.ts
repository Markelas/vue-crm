import firebase from 'firebase/compat/app'
import { getDatabase, ref, get } from 'firebase/database'

export default {
  state: {
    info: {}
  },
  mutations: {
    // @ts-ignore
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state:any) { // Чтобы очищать и мы не кэшировали информацию при выходе
      state.info = {}
    }
  },
  actions: {
    // @ts-ignore
    async fetchInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const database = getDatabase()
        const info = await get(ref(database, `users/${uid}/info`)) // Берем данные с базы данных
        const userInfo = info.val() // Получаем значения
        commit('setInfo', userInfo) // Передаем объект со значениями в мутации, для изменения state
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    info: (s: { info: object; }) => s.info // Для получения из state info
  }
}
