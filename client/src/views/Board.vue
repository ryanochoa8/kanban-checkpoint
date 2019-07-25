<template>
  <div class="board">
    <div class="container-fluid">
      <div class="row" style="height: 5vh;">
        <router-link to="/boards" class="col-6 justify-content-start d-flex">Home</router-link>
        <a @click="logout" href="#" class="col-6 justify-content-end d-flex">Logout</a>
      </div>
      <h3>{{board.title}}</h3>
      <h5>{{board.description}}</h5>
      <form @submit.prevent="createList(newList)">
        <label for="title">Lists</label>
        <input type="text" placeholder="Enter a new list" name="title" v-model="newList.title">
        <button type="submit" class="btn btn-primary">Submit List</button>
      </form>
      <list v-for="list in lists" :listProp="list"></list>
    </div>
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
      },
    },
    methods: {
      createList() {
        this.$store.dispatch('createList', this.newList)
      },
      logout() {
        this.$store.dispatch("logout")
      }
    },
    components: {
      list
    },
    props: ["boardId"]
  };
</script>

<style scoped>
  /* #navBarBg {
    background-color: rgba(128, 128, 128, 0.619);
  } */
</style>