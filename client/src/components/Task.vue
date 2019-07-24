<template>
  <div class="task">
    <div>
      <p>{{taskProp.title}}</p>
      <button class="btn btn-outline-danger" @click.prevent="deleteTask">Delete Task</button>
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
    methods: {
      deleteTask() {
        // debugger
        this.$store.dispatch('deleteTaskById', this.taskProp)
      }
    },
    components: {}
  }
</script>


<style scoped>

</style>