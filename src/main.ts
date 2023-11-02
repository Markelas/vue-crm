import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import messagePlugin from './utils/message.plugin'
import 'materialize-css/dist/js/materialize.min.js'
import dateFilter from '../filters/date.filter'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

firebase.initializeApp({
  apiKey: 'AIzaSyBGBRuMITFtCxw-9jZOISkF9JKRtXDxaUA',
  authDomain: 'vue-crm-frontend-mark.firebaseapp.com',
  projectId: 'vue-crm-frontend-mark',
  storageBucket: 'vue-crm-frontend-mark.appspot.com',
  messagingSenderId: '258787809320',
  appId: '1:258787809320:web:b73eebb9d14a6fab917d1d'
})

let app:any

// firebase.auth().onAuthStateChanged Вызывается, когда firebase найдет локальные данные пользователя для автоматической авторизации
firebase.auth().onAuthStateChanged(() => {
  if (!app) { // Если приложение не создано ранее
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
