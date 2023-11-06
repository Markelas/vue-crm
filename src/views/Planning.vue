<template>
  <div>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Планирование</h3>
          <h4>{{info.bill | currency()}}</h4>
        </div>

        <loader-app v-if="loading"/>

        <p v-else-if="!categories.length" class="center">Категорий пока нет. <router-link to="/categories">Добавить категорию</router-link></p>

        <section v-else class="planning-table">
          <div v-for="item in categories" :key="item.id" class="planning-table-items">
            <p>
              <strong>{{item.title}}</strong>
              {{item.spend | currency}} из {{item.limit | currency}}
            </p>
            <div v-tooltip="item.tooltip" class="progress">
              <div
                  class="determinate"
                  :class="[item.progressColor]"
                  :style="{width: item.progressPercent + '%'}"
              ></div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '../../filters/currency.filter'
export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords') // Получаем записи
    const categories = await this.$store.dispatch('fetchCategories') // Получаем категории
    this.categories = categories.map(category => {
      let spend = records
        .filter(rec => rec.record.categoryId === category.id) // Фильтруем деньги, которые потратили, по категориям
        .filter(rec => rec.record.type === 'outcome') // Ищем, если тип потрачено
      let total = 0
      spend.forEach((el) => {
        total += +el.record.amount
      })
      spend = total
      const percent = 100 * spend / category.limit // Считаем процент, сколько потрачено от лимита в категории
      const progressPercent = percent > 100 ? 100 : percent // Если потрачено больше лимита, то будем показывать в progess bar 100
      const progressColor = (percent < 60)
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red' // Если меньше 60 процентов - зеленый, если меньше 100 желтый, иначе красный
      const tooltipValue = category.limit - spend // Отображаем в тултипе, сколько осталось в лимите
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
      return { // Возвращаем массив с объектами, в которых лежат категории
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.loading = false
  },
  computed: {
    ...mapGetters(['info'])
  }
}

</script>

<style scoped lang="scss">
::v-deep.page-title{
  h3 {
    font-weight: 500;
    color: #2c3e50;
  }
}
::v-deep.planning-table{
  background-color: white;
  height: 100%;
  padding: 10px 30px;
  border-radius: 16px;
  &-items{
    margin: 40px 0;
  }
}
</style>
