<template>
  <div class="grey darken-1 empty-layout">
      <router-view/>
  </div>
</template>

<script>
import messages from '@/utils/messages'
export default {
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (firebaseError) { // Отслеживаем ошибки, которые присылает firebase
      this.$error(messages[firebaseError.code] || 'Что-то пошло не так') // Передаем сюда ошибку
    }
  }
}
</script>

<style scoped lang="scss">

</style>
