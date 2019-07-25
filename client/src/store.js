import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})


export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    // lists: [],
    activeLists: [],
    tasks: {
      /**'listId332': [] */
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    resetState(state) {
      state.boards = []
      state.user = {}
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard
    },
    // setLists(state, lists) {
    //   state.lists = lists
    // },
    setActiveLists(state, activeLists) {
      state.activeLists = activeLists
    },
    setTasks(state, { listId, tasks }) {
      Vue.set(state.tasks, listId, tasks)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "boards" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion


    //#region -- BOARDS --
    async getBoards({ commit, dispatch }) {
      try {
        let res = await api.get('boards')
        commit('setBoards', res.data)
      } catch (error) { console.error(error) }
    },
    async getActiveBoard({ commit, dispatch }, payload) {
      try {
        let res = await api.get('boards/' + payload)
        commit('setActiveBoard', res.data)
      } catch (error) { console.error(error) }
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    async deleteBoard({ commit, dispatch }, payload) {
      try {
        let res = await api.delete('boards/' + payload)
        dispatch('getBoards')
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion


    //#region -- LISTS --
    // async getLists({ commit, dispatch }, payload) {
    //   try {
    //     let res = await api.get('lists/', payload)
    //     commit('setLists', res.data)
    //     console.log(this.state)
    //   } catch (error) { console.error(error) }

    // },

    async getListsByBoardId({ commit, dispatch }, payload) {
      try {
        let res = await api.get('boards/' + payload + '/lists')
        commit('setActiveLists', res.data)
      } catch (error) { console.error(error) }

    },

    // this is only drawing the lists on screen after we've added a list
    async createList({ commit, dispatch }, payload) {
      try {
        let res = await api.post('/lists', payload)
        dispatch('getListsByBoardId', res.data.boardId)
        // commit('setActiveLists', res.data)
      } catch (error) { console.error(error) }
    },

    async deleteListById({ commit, dispatch }, payload) {
      try {
        let res = await api.delete('lists/' + payload._id)
        dispatch('getListsByBoardId', payload.boardId)

        // commit('setActiveLists')
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    },




    //#endregion


    // #region --TASKS--
    async getTasksByListId({ commit, dispatch }, listId) {
      try {
        let res = await api.get('/lists/' + listId + '/tasks')
        commit('setTasks', { tasks: res.data, listId })
      } catch (error) { console.error(error) }

    },
    async createTask({ commit, dispatch }, payload) {
      try {
        let res = await api.post('/tasks', payload)
        dispatch('getTasksByListId', res.data.listId)
        console.log('Created a task.')
      } catch (error) { console.error(error) }
    },
    async deleteTaskById({ commit, dispatch }, payload) {
      try {
        let res = await api.delete('tasks/' + payload._id)
        dispatch('getTasksByListId', payload.listId)
        console.log('Task was deleted.')
      } catch (error) {
        console.error(error)
      }
    },

    async moveTask({ commit, dispatch }, { taskProp, oldListId }) {
      try {
        let res = await api.put('tasks/' + taskProp._id, taskProp)
        dispatch('getTasksByListId', taskProp.listId)
        dispatch('getTasksByListId', oldListId)

      } catch (error) {
        console.error(error)
      }
    }


    // #endregion
  }

})
