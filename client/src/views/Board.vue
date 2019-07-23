<template>
  <div class="board">
    <h3>{{board.title}}</h3>
    <h5>{{board.description}}</h5>
    <form @submit.prevent="createList(newList)">
      <label for="list">Lists</label>
      <input type="text" name="list" v-model="newList.title">
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <lists></lists>
  </div>
</template>

<script>
  import lists from '@/components/List.vue'

  export default {
    name: "board",
    data() {
      return {
        newList: {
          title: '',
          boardId: this.boardId
        }
      }
    },
    mounted() {
      this.$store.dispatch("getActiveBoard", this.$route.params.boardId)
      this.$store.dispatch("getListsByBoardId", this.$store.state.activeLists.boardId)

    },
    computed: {
      board() {
        return (
          //NOTE  This does not work on page reload because the boards array is empty in the store
          //FINISHED!!!!!!!
          this.$store.state.boards.find(b => b._id == this.boardId) || {
            title: "Loading..."
          },
          this.$store.state.activeBoard
        );
      },
      lists() {
        return (
          this.$store.state.activeLists
        )
      }
    },
    methods: {
      createList() {
        this.$store.dispatch('createList', this.newList)
      }
    },
    components: {
      lists
    },
    props: ["boardId"]
  };
</script>