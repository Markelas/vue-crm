<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>История записей [СТРАНИЦА В РАЗРАБОТКЕ]</h3>
      </div>

      <div class="history-chart hide">
        <canvas></canvas>
      </div>

      <section class="history-table">
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Категория</th>
            <th>Тип</th>
            <th>Открыть</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>1</td>
            <td>1212</td>
            <td>12.12.32</td>
            <td>name</td>
            <td>
              <span class="white-text badge red">Расход</span>
            </td>
            <td>
              <button class="btn-small btn">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
::v-deep.page-title{
  h3 {
    font-weight: 500;
    color: #2c3e50;
  }
}
.history-table{
  background-color: white;
  height: 100%;
  padding: 40px;
  border-radius: 16px;
}
</style>
