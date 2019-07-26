<template>
  <div>
    <div class="container-fluid">
      <drag class="drag" :transfer-data="{taskProp, oldListId: taskProp.listId}">
        <div class="task">
          <div class="row my-4">
            <h5 class="col-6 offset-1 justify-content-start d-flex border-bottom">{{taskProp.title}}</h5>
            <!-- <p class="col-6 offset-1 justify-content-end d-flex">{{taskProp.listId}}</p> -->
            <div class="col-2">
              <button class="btn btn-sm btn-danger justify-content-start d-flex" @click.prevent="deleteTask">Delete
                Task</button>
            </div>
            <a class="col-3" @click="showCommentForm=!showCommentForm">
              <p id="textDecoration" class="border-bottom">Make/Open Comments</p>
            </a>
          </div>
          <form @submit.prevent="createComment(newComment)" v-if="showCommentForm">
            <p><b>Comments</b></p>
            <input type="text" name="comment" v-model="newComment.title" placeholder="Enter a comment">
            <button class="btn btn-sm btn-warning" @click.prevent="createComment">Submit</button>
            <comment v-for="comment in comments" :commentProp="comment"></comment>
          </form>
        </div>
      </drag>
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
        },
        showCommentForm: false
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




<style>
  #textDecoration:hover {
    color: rgb(0, 145, 255);
  }
</style>