<template>
  <div>
    <h6 v-for="list in lists">{{list.title}}</h6>
  </div>
</template>

<script>

  export default {
    name: 'List',
    computed: {
      lists() {
        return this.$store.state.activeLists
      }
    }
  }
</script>

<style scoped>
</style>