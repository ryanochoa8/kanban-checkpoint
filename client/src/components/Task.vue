<template>
  <div>

    <drag class="drag" :transfer-data="{taskProp, oldListId: taskProp.listId}">
      <div class="task">
        <div class="row my-4">
          <p class="col-6 offset-1 justify-content-end d-flex">{{taskProp.title}}</p>
          <!-- <p class="col-6 offset-1 justify-content-end d-flex">{{taskProp.listId}}</p> -->
          <div class="col-5">
            <button class="btn btn-sm btn-danger justify-content-start d-flex" @click.prevent="deleteTask">Delete
              Task</button>
          </div>
        </div>
      </div>
    </drag>
  </div>
</template>

<!-- To change the task from one list to another we need the listTitle -->


<script>

  import { Drag, Drop } from 'vue-drag-drop';

  export default {
    name: 'task',
    props: ['taskProp'],
    data() {
      return {}
    },
    computed: {
      // tasks() {
      //   return this.$store.state.tasks
      // }
    },
    methods: {
      deleteTask() {
        // debugger
        this.$store.dispatch('deleteTaskById', this.taskProp)
      }
    },
    components: {
      Drag
    }
  }
</script>


<style scoped>

</style>