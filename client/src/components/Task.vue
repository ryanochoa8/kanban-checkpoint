<template>
  <div>
    <div class="container-fluid">
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
          <label for="comment">Comment</label>
          <input type="text" name="comment" v-model="newComment.title" placeholder="Enter a comment">
          <button class="btn btn-sm btn-warning" @click.prevent="createComment">Submit</button>

        </div>
      </drag>
      <p><b>Comments</b></p>
      <comment v-for="comment in comments" :commentProp="comment"></comment>
    </div>
  </div>
</template>



<script>

  import { Drag, Drop } from 'vue-drag-drop';

  import comment from '@/components/Comment.vue'

  export default {
    name: 'task',
    props: ['taskProp'],
    data() {
      return {
        newComment: {
          title: '',
          listId: this.taskProp.listId,
          taskId: ''
        }
      }
    },
    mounted() {
      this.$store.dispatch('getCommentsByTaskId', this.taskProp._id)
    },
    computed: {
      tasks() {
        return this.$store.state.tasks
      },
      comments() {
        return this.$store.state.comments[this.taskProp._id]
      }
    },
    methods: {
      deleteTask() {
        // debugger
        this.$store.dispatch('deleteTaskById', this.taskProp)
      },
      createComment() {
        this.newComment.taskId = this.taskProp._id
        this.$store.dispatch('createComment', this.newComment)
      },
    },
    components: {
      Drag,
      comment
    }
  }
  // TRY AND FIGURE OUT WHY THE COMMENTS AREN'T POSTING TO THE SCREEN. LOOK AT TASK AND COMMENTS VUE
</script>




<style scoped>

</style>