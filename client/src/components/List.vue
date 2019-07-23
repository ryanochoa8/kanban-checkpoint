<template>
  <div>
    <div>
      <h6>{{listProp.title}}</h6>
      <button class="btn btn-danger" @click.prevent="deleteList">Delete</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'List',
    props: ['listProp'],
    computed: {
      lists() {
        return this.$store.state.activeLists
      }
    },
    methods: {
      deleteList() {
        // debugger
        this.$store.dispatch('deleteListById', this.listProp)
      }
    }
  }
</script>

<style scoped>
</style>