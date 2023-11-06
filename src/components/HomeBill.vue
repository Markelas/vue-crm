<template>
  <div class="col s12 m6 l4">
    <div class="card bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p class="currency-line">
          <span>{{userBillRubles | currency()}}</span>
        </p>
        <p
          v-for="cur of currencies"
          :key="cur"
          class="currency-line">
          <span>{{getCurrency(cur) | currency(cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'], // Получаем информацию о валютах из компонента HomeView
  data: () => ({
    currencies: ['USD', 'EUR']
  }),
  computed: {
    userBillRubles () { // Отображаем в рублях
      return this.$store.getters.info.bill
    }
  },
  methods: {
    getCurrency (currency) { // Проходим по массиву с валютами и умножаем на счет в рублях
      return Math.floor(this.$store.getters.info.bill * this.rates.rates[currency])
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep.bill-card{
  background-color: #359d6f;
  border-radius: 16px;
  .card-title{
    font-weight: 500;
  }
}
</style>
