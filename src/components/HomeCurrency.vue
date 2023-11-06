<template>
  <div class="col s12 m6 l8">
    <div class="card darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>{{'RUB'}}</td>
            <td>{{1.000}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          <tr v-for="cur in currencies" :key="cur">
            <td>{{cur}}</td>
            <td>{{rates.rates[cur].toFixed(3)}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['USD', 'EUR']
  })
}
</script>

<style scoped lang="scss">
::v-deep.bill-card{
  background-color: #4286be;
  border-radius: 16px;
  .card-title{
    font-weight: 500;
  }
}
</style>
