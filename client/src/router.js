import Vue from 'vue'
import Router from 'vue-router'
//@ts-ignore
import Boards from './views/Boards.vue'
//@ts-ignore
import Board from './views/Board.vue'
//@ts-ignore
import Login from './views/Login.vue'
//@ts-ignore
import Lists from './components/List.vue'
// @ts-ignore
import Tasks from './components/Task.vue'
// @ts-ignore
import Comments from './components/Comments.vue'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'boards',
      component: Boards
    },
    {
      path: '/boards/:boardId',
      name: 'board',
      props: true,
      component: Board,
      children: [{
        path: '/lists',
        name: 'lists',
        component: Lists,
        children: [{
          path: '/tasks/',
          name: 'tasks',
          component: Tasks,
          children: [{
            path: '/comments/',
            name: 'comments',
            component: Comments,
          }]
        }]
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: "*",
      redirect: '/'
    }
  ]
})