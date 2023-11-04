<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="item in categories"
              :key="item.id"
              :value="item.id"
            >{{item.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

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
          <span
            v-if="($v.limit.$dirty && !$v.limit.required)"
            class="helper-text invalid"
          >
            Минимальная сумма {{$v.limit.$params.minValue.min}} рублей
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators'

export default {
  props: ['categories'], // Получаем массив с категориями
  data: () => ({
    select: null,
    title: '',
    limit: '',
    current: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    current (categoryId) { // При смене категории отслеживаем какой item выбрали и заполняем нижние поля согласно выбранной категории
      const { title, limit } = this.categories.find((item) => item.id === categoryId)
      this.title = title
      this.limit = limit
    }
  },
  created () {
    const { id, title, limit } = this.categories[0] // Во время загрузки страницы получаем из первой категории данные
    this.current = id
    this.title = title
    this.limit = limit
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        // Вызываем экшен из store и передаем данные, которые изменили в категории, по id
        this.$message('Категория упешно обновлена')
        this.$emit('updated', categoryData) // Эмитим событие, чтобы изменить информацию в селекте
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
