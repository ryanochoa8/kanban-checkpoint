<template>
  <div>
    <div v-for="list in lists">
      <h6>{{list.title}}</h6>
      <button class="btn btn-danger" @click="deleteList(list)">Delete</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'List',
    computed: {
      lists() {
        return this.$store.state.activeLists
      }
    },
    methods: {
      deleteList() {
        this.$store.dispatch('deleteListById', this.list._id)
      }
    }
  }
</script>

<style scoped>
</style>