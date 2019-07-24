<template>
  <div>
    <div class="border border-dark rounded m-4 " id="listShadow">
      <div>
        <h3>{{listProp.title}}</h3>
      </div>
      <form @submit.prevent="createTask(newTask)">
        <label for="task">Task</label>
        <input type="text" placeholder="Enter a new task" name='task' v-model='newTask.title'>
        <button type="submit" class="btn btn-outline-primary">Submit Task</button>
      </form>
      <task v-for="task in tasks" :taskProp="task"></task>
      <button class="btn btn-block btn-outline-danger mt-2" @click.prevent="deleteList">Delete List</button>
    </div>
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
          boardId: this.listProp.boardId,
          listId: ''
        }
      }
    },
    mounted() {
      // this.$store.dispatch('getTasksByListId', this.$route.params.listId)
      this.$store.dispatch('getTasksByListId', this.listProp._id)

    },
    computed: {
      lists() {
        return this.$store.state.activeLists
      },
      tasks() {
        return this.$store.state.tasks[this.listProp._id] || []
      }
    },
    methods: {
      deleteList() {
        // debugger
        this.$store.dispatch('deleteListById', this.listProp)
      },
      createTask() {
        this.newTask.listId = this.listProp._id
        this.$store.dispatch('createTask', this.newTask)
      }
    },
    components: {
      task
    }
  }
</script>

<style scoped>
  #listShadow {
    box-shadow: 2px 2px 2px 2px rgba(128, 128, 128, 0.701);
  }
</style>