import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

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
    async fetchCurrency () {
      const result = await fetch('https://www.cbr-xml-daily.ru/latest.js') // Запрос на валюты
      return await result.json() // Результат с объектами валют
    }
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
