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
      <div class="input-field">
        <input
            id="name"
            v-model.trim="name"
            type="text"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="name">Имя</label>
        <small
          v-if="($v.name.$dirty && !$v.name.required)"
          class="helper-text invalid">Поле с именем не должно быть пустым
        </small>
      </div>
      <p>
        <label>
          <input v-model="checkAgree" type="checkbox"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    checkAgree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
    name: { required },
    checkAgree: { checked: (value) => value } // Должно быть true
  },
  methods: {
    submitHandler () {
      if (this.$v.$invalid) { // Если не валидно
        this.$v.$touch() // Вызываем метод, который позволяет активизировать валидацию
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      console.log(formData)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
