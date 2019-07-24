<template>
  <div class="board">
    <h3>{{board.title}}</h3>
    <h5>{{board.description}}</h5>
    <form @submit.prevent="createList(newList)">
      <label for="title">Lists</label>
      <input type="text" name="title" v-model="newList.title">
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <list v-for="list in lists" :listProp="list"></list>
  </div>
</template>

<script>
  import list from '@/components/List.vue'

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
      this.$store.dispatch("getListsByBoardId", this.$route.params.boardId)
      this.$store.dispatch('getTasksByListId', this.$route.params.listId)

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
      list
    },
    props: ["boardId"]
  };
</script>