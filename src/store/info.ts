import firebase from 'firebase/compat/app'
import { getDatabase, ref, get, set } from 'firebase/database'

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
    async updateInfo ({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updateData = { ...getters.info, ...toUpdate } // Получаем информацию из info о пользователе, добавляем измененные данные из toUpdate
        const database = getDatabase()
        console.log(updateData)
        const bill = updateData.bill
        const username = updateData.username
        await set(ref(database, `/users/${uid}/info`), { bill, username })
        commit('setInfo', updateData) // Обновляем также информацию в info
      } catch (e) {
        commit('setError', e)
        console.log(e)
        throw e
      }
    },
    // @ts-ignore
    async fetchInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const database = getDatabase()
        const info = await get(ref(database, `users/${uid}/info`)) // Берем данные с базы данных
        const userInfo = info.val() // Получаем значения
        commit('setInfo', userInfo) // Передаем объект со значениями в мутации, для изменения state
      } catch (e) {
        commit('setError', e)
        console.log(e)
        throw e
      }
    }
  },
  getters: {
    info: (s: { info: object; }) => s.info // Для получения из state info
  }
}
