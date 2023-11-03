<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <category-create @created="addNewCategory"/>
        <category-edit/>
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
    categories: []
  }),
  methods: {
    addNewCategory (category) { // При добавлении новых категорий, помещаем список в массив
      this.categories.push(category)
      console.log(this.categories)
    }
  },
  components: { CategoryEdit, CategoryCreate }
}

</script>

<style scoped lang="scss">

</style>
