<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Счет</h3>

        <button class="btn waves-effect waves-light btn-small" @click="refresh()">
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <loader-app v-if="loading"/>

      <div v-else class="row">
        <HomeBill :rates="currency"/>
        <HomeCurrency :rates="currency" :date="currency.date"/>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCurrency from '@/components/HomeCurrency.vue' // @ is an alias to /src
import HomeBill from '../components/HomeBill.vue'

export default {
  name: 'HomeView',
  components: {
    HomeCurrency,
    HomeBill
  },
  data: () => ({
    loading: true, // По умолчанию loading включен
    currency: null
  }),
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')// Обращаемся к экшену из стора
      this.loading = false
    }
  },
  async mounted () {
    this.currency = await this.$store.dispatch('fetchCurrency')// Обращаемся к экшену из стора
    this.loading = false // Останавливаем loading, после того, как загрузили информацию о валютах
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
</style>
