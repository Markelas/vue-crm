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

        <section v-else>
          <div v-for="item in categories" :key="item.id">
            <p>
              <strong>{{item.title}}</strong>
              {{item.spend | currency}} из {{item.limit | currency}}
            </p>
            <div class="progress">
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
      console.log(progressColor)
      return { // Возвращаем массив с объектами, в которых лежат категории
        ...category,
        progressPercent,
        progressColor,
        spend
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

</style>
