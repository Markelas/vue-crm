<template>
  <div>
    <ul class="sidenav app-sidenav" :class="{open: value}">

      <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.isExact"
      >
        <a href="#" class="app-sidenav-link__text waves-effect waves-white pointer white-text">{{ link.title }}</a>
      </router-link>
      <a href="https://github.com/Markelas">
        <div class="app-sidenav__github">
          <img class="app-sidenav__github-img" src="../../assets/img/icons8-github-96.png" alt="github">
          <p class="app-sidenav__github-text">My Github</p>
        </div>
      </a>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: 'Счет', url: '/', isExact: true },
      { title: 'История', url: '/history' },
      { title: 'Планирование', url: '/planning' },
      { title: 'Новая запись', url: '/record' },
      { title: 'Категории', url: '/categories' }
    ]
  })
}
</script>

<style scoped lang="scss">
::v-deep.app-sidenav{
  background-color: #2c3e50;
  &-link__text{
    font-weight: 500;
    font-size: 20px;
  }
  &__github{
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 10px;
    left: 10px;
    cursor: pointer;
    &-img {
      max-width: 40px;
      max-height: 40px;
    }
    &-text{
      font-size: 20px;
      color: white;
      font-weight: 500;
    }
  }
}
</style>
