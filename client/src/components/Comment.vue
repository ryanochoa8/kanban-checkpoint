<template>
  <div>
    <div class="comments row m-2">
      <p class="col-6">{{commentProp.title}}</p>
      <button class="btn btn-outline-primary offset-1" @click.prevent="deleteComment">Delete
        Comment</button>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'comments',
    props: ['commentProp'],
    data() {
      return {}
    },
    computed: {
      comments() {
        return this.$store.state.comments
      }
    },
    methods: {
      deleteComment() {
        // debugger
        this.$store.dispatch('deleteCommentById', this.commentProp)
      }
    },
    components: {}
  }
</script>


<style scoped>
  .row {
    color: navy;
  }

  .btn:hover {
    background-color: green;
  }
</style>