<template>
  <div>
    <div>
      <h6>{{listProp.title}}</h6>
      <button class="btn btn-danger" @click.prevent="deleteList">Delete</button>
    </div>
    <form>
      <label for="task">Task</label>
      <input type="text" name='task' v-model='newTask.title'>
    </form>
    <task v-for="task in tasks" :taskProp="task"></task>

  </div>
</template>

<script>
  import task from '@/components/Task.vue'

  export default {
    name: 'List',
    props: ['listProp'],
    data() {
      return {
        newTask: {
          title: '',
          boardId: this.boardId,
          listId: this.listId
        }
      }
    },
    computed: {
      lists() {
        return this.$store.state.activeLists
      }
    },
    methods: {
      deleteList() {
        // debugger
        this.$store.dispatch('deleteListById', this.listProp)
      },
      createTask() {
        this.$store.dispatch('createTask', this.newTask)
      }
    },
    components: {
      task
    }
  }
</script>

<style scoped>
</style>