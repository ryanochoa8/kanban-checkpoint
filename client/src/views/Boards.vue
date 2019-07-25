<template>
  <div class="boards">
    <div class="container-fluid">
      <a @click="logout" href="#">Logout</a>
      <h3>WELCOME TO THE BOARDS!!!</h3>
      <form @submit.prevent="addBoard">
        <input type="text" placeholder="title" v-model="newBoard.title" required>
        <input type="text" placeholder="description" v-model="newBoard.description">
        <button type="submit">Create Board</button>
      </form>
      <div v-for="board in boards" :key="board._id" class="row m-3 py-2 border-dark border rounded">
        <router-link :to="{name: 'board', params: {boardId: board._id}}" class="col-8">
          <h3>
            {{board.title}}
          </h3>
        </router-link>
        <button class="btn btn-danger offset-1 col-2" @click="deleteBoard(board._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Board from './Board.vue'

  export default {
    name: "boards",
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
        console.log("Board was deleted.")
      },
      logout() {
        this.$store.dispatch("logout")
        console.log("The user was logged out")
      }
    }
  };
</script>

<style scoped>
  .row {
    box-shadow: 3px 3px 3px 3px gray;
  }
</style>