<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            v-model.trim="email"
            type="text"
            autocomplete="on"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
        > <!--Если значение не валидно и пользователь там что-то либо вводил, то не проходит-->
        <label for="email">Email</label>
        <small v-if="($v.email.$dirty && !$v.email.required)"
        class="helper-text invalid">Поле Email не должно быть пустым</small>
        <small v-else-if="($v.email.$dirty && !$v.email.email)"
               class="helper-text invalid">Поле Email некорректно</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            v-model="password"
            type="password"
            class="validate"
            autocomplete="on"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
        >
        <label for="password">Пароль</label>
        <small v-if="($v.password.$dirty && !$v.password.required)" class="helper-text invalid">Поле Пароль не должно быть пустым</small>
        <small v-else-if="($v.password.$dirty && !$v.password.minLength)" class="helper-text invalid">Пароль не может быть меньше {{ $v.password.$params.minLength.min }} символов. Текущий пароль содержит {{ password.length }} символ</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {
  email,
  required,
  minLength
} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
export default {
  name: 'loginForm',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) }
  },
  mounted () {
    if (messages[this.$route.query.message]) { // Проверяем, есть ли сообщение в параметрах
      this.$message(messages[this.$route.query.message]) // Используем плагин из message.plugin.ts, для отображения сообщения
      // если мы вышли из системы
    }
  },
  methods: {
    submitHandler () {
      if (this.$v.$invalid) { // Если не валидно
        this.$v.$touch() // Вызываем метод, который позволяет активизировать валидацию
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      console.log(formData)
      this.$router.push('/') // На главную страницу
    }
  }
}
</script>

<style scoped lang="scss">

</style>
