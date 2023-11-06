<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section class="form-wrapper">
      <LoaderApp v-if="loading"/>
      <div v-else class="row">
        <category-create @created="addNewCategory"/>
        <category-edit
          v-if="categories.length"
          :key="categories.length + updateCount"
          :categories="categories"
          @updated="updateCategories"
        />
        <p v-else class="center">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue'
import CategoryEdit from '@/components/CategoryEdit.vue'

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  methods: {
    addNewCategory (category) { // При добавлении новых категорий, помещаем список в массив
      this.categories.push(category)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories') // Подгружаем категории в массив, из firebase
    // вызываем экшен из store
    this.loading = false // Убираем loading
  },
  components: { CategoryEdit, CategoryCreate }
}

</script>

<style scoped lang="scss">
::v-deep.page-title{
  h3 {
    font-weight: 500;
    color: #2c3e50;
  }
}
.form-wrapper{
  background-color: white;
  height: 100%;
  padding: 30px;
  border-radius: 16px;
}
</style>
