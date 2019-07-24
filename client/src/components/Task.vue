<template>
  <div class="task">
    <div>
      <p>{{taskProp.title}}</p>
      <button class="btn btn-danger" @click.prevent="deleteList">Delete</button>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'task',
    props: ['taskProp'],
    data() {
      return {}
    },
    computed: {
      tasks() {
        return this.$store.state.tasks
      }
    },
    methods: {},
    components: {}
  }
</script>


<style scoped>

</style>