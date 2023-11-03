<template>
  <div class="app-loader">
    <div class="preloader-wrapper big active">
      <div class="spinner-layer" :class="color">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  computed: {
    color () {
      const colors: string[] = ['spinner-blue', 'spinner-red-only', 'spinner-green-only']
      return colors[Math.floor(Math.random() * 3)]
    }
  }
}
</script>

<style scoped lang="scss">

</style>
