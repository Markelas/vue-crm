import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null // Информация, есть ли ошибка
  },
  mutations: {
    setError (state, error) {
      state.error = error // Устанавливаем ошибку
    },
    clearError (state) {
      state.error = null // Обнуляем
    }
  },
  getters: {
    error: state => state.error // Нужно получить доступ до ошибки, с помощью геттера
  },
  actions: {
  },
  modules: {
    auth
  }
})
