<template>
  <div>
    <loader-app v-if="loading"/>
    <div v-else class="app-main-layout">

      <Navbar @open-nav="isOpenNav = !isOpenNav"/>

      <Sidebar v-model="isOpenNav"/>

      <main class="app-content" :class="{full: !isOpenNav}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import Navbar from '@/components/app/Navbar.vue'
export default {
  name: 'main-layout',
  components: {
    Navbar, Sidebar
  },
  data: () => ({
    isOpenNav: true,
    loading: true
  }),
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) { // Если есть в info информация о пользователе
      await this.$store.dispatch('fetchInfo') // Делаем асинхронный запрос на получение данных о пользователе
    }
    this.loading = false
  }
}
</script>

<style scoped lang="scss">

</style>
