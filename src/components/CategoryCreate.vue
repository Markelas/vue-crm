<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            v-model="title"
            type="text"
            :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
          >
          <label for="name">Название</label>
          <span
            v-if="($v.title.$dirty && !$v.title.required)"
            class="helper-text invalid"
          >Введите название категории</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            v-model="limit"
            type="number"
            :class="{invalid: ($v.limit.$dirty && !$v.limit.required)}"
          >
          <label for="limit">Лимит</label>
          <span  v-if="($v.limit.$dirty && !$v.limit.required)" class="helper-text invalid" >Минимальная сумма {{$v.limit.$params.minValue.min}} рублей</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    title: '',
    limit: ''
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = '' // После обработки очищаем форму
        this.limit = ''
        this.$v.$reset()
        this.$message('Категория создана') // Выводим сообщение
        this.$emit('created', category)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
