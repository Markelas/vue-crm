<template>
  <nav class="navbar white">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('open-nav')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <h5 class="navbar-title black-text">Приложение для домашней бухгалтерии</h5>
      </div>
      <span class="black-text">Текущее время: {{ date | date('datetime') }}</span>
      <ul class="right hide-on-small-and-down">
        <li>
          <a
              ref="dropdown"
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  computed: {
    name () {
      return this.$store.getters.info.username // Передаем имя из базы данных и отображаем на странице
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      await this.$router.push('/login?message=logout') // При нажатии на кнопку выйти, переходит на страницу авторизации
    }
  },
  mounted () {
    this.interval = setInterval(() => { // Обновляем время каждую секунду
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, { // Обращение к materializecss, объект M, к user, dropdown
      constrainWidth: true // Dropdown не больше ширины блока
    })
  },
  beforeDestroy () { // Чтобы избежать утечек памяти
    clearInterval(this.interval) // Очищаем вызов функции с временем
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-title {
  margin: 0 0 0 40px;
  font-weight: 500;
}
</style>
