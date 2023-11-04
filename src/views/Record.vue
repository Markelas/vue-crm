<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Новая запись</h3>
      </div>

      <loader-app v-if="loading"/>

      <p v-else-if="!categories.length" class="center">Категорий пока нет. <router-link to="/categories">Добавить категорию</router-link></p>

      <form v-else class="form" @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="category">
            <option
              v-for="item in categories"
              :key="item.id"
              :value="item.id"
            >{{item.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <p>
          <label>
            <input
              v-model="type"
              class="with-gap"
              name="type"
              type="radio"
              value="income"
            />
            <span>Доход</span>
          </label>
        </p>

        <p>
          <label>
            <input
              v-model="type"
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
            />
            <span>Расход</span>
          </label>
        </p>

        <div class="input-field">
          <input
            id="amount"
            v-model.number="amount"
            type="number"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
          >
          <label for="amount">Сумма</label>
          <span
            v-if="$v.amount.$dirty && !$v.amount.minValue"
            class="helper-text invalid"
          >
            Минимальная значение {{$v.amount.$params.minValue.min}}
          </span>
        </div>

        <div class="input-field">
          <input
            id="description"
            v-model="description"
            type="text"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
          >
          <label for="description">Описание</label>
          <span
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
          >
            Введите описание
          </span>
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
import { minValue, required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'record',
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null, // v-model у селекта, в mounted добавляем первый элемент категории
    type: 'outcome', // Тип категории, по умолчанию расход
    amount: 100,
    description: ''
  }),
  validations: {
    amount: { minValue: minValue(100) },
    description: { required }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories') // Подтягиваем категории
    this.loading = false // Останавливаем loader
    if (this.categories.length) { // Если есть категории
      this.category = this.categories[0].id // В селект добавляем первый элемент
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      // С помощью ref обращаемся с помощью прямого доступа к дочернему компоненту и даём специальный ID ссылки на дочерний компонент
      // setTimeout с 0 сделали для того, чтобы чуть позже обратиться к селектору, так как он еще не успел загрузиться
      // т.е. эта задача попадает в очередь и после того, как выполнятся другие действия, начнется выполняться эта
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']), // Получаем геттер info из store info.ts, в котором есть информация о пользователе
    canCreateRecord () {
      if (this.type === 'income') { // Если радиобатн в позиции пополнения, то разрешаем запись
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler () { // После нажатия на кнопку
      if (this.$v.$invalid) { // Проверяем валидность формы
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) { // Проверка, сможет ли пользователь создать расход денег
        try {
          await this.$store.dispatch('createRecord', { // Вызываем экшен с записью в firebase
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income' // Новое состояние счета
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', { bill }) // Передаем информацию в firebase, новый счет
          this.$message('Запись успешно создана')
          this.$v.$reset() // Очищаем форму
          this.amount = 1
          this.description = ''
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$message(`На счете недостаточно средств (${this.amount - this.info.bill} рублей)`)
      }
    }
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
