<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
      // Определяем фон компонента, если есть layout то переходим по нему, нет - серый фон "empty" в router
    }
  },
  components: {
    EmptyLayout, MainLayout
  }
}
</script>
