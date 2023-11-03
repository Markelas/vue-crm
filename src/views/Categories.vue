<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <LoaderApp v-if="loading"/>
      <div v-else class="row">
        <category-create @created="addNewCategory"/>
        <category-edit :categories="categories"/>
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
    loading: true
  }),
  methods: {
    addNewCategory (category) { // При добавлении новых категорий, помещаем список в массив
      this.categories.push(category)
      console.log(this.categories)
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories') // Подгружаем категории в массив, из firebase
    // вызываем экшен из store
    console.log(this.categories)
    this.loading = false // Убираем loading
  },
  components: { CategoryEdit, CategoryCreate }
}

</script>

<style scoped lang="scss">

</style>
