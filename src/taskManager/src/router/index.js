import { createMemoryHistory, createRouter, useRoute } from 'vue-router'

import Dashboard from "../pages/Dashboard.vue"
import TasksList from "../pages/TasksList.vue"
import ProjectsList from "../pages/ProjectsList.vue"
import NotFound from '../pages/NotFound.vue'
import UsersList from "../pages/UsersList.vue"
import TeamsList from "../pages/TeamsList.vue"
import Login from "../pages/Login.vue"

import { useUserStore } from "@/stores/user"

const routes = [
  { path: '/', name: 'DashBoard', component: Dashboard, meta: { requiredAuth: true } },
  { path: '/tasks', name: 'TasksList', component: TasksList, meta: { requiredAuth: true } },
  {
    path: '/projects', name: 'ProjectsList', component: ProjectsList, meta: { requiredAuth: true }, beforeEnter: async (to) => {
      const userStore = useUserStore();
      if (userStore.getUserInfo.type != "admin" && userStore.getUserInfo.type != "manager") {
        return '/';
      }
    }
  },
  {
    path: '/users', name: 'UsersList', component: UsersList, meta: { requiredAuth: true }, beforeEnter: async (to) => {
      const userStore = useUserStore();
      if (userStore.getUserInfo.type != "admin") {
        return '/';
      }
    }
  },
  {
    path: '/teams', name: 'TeamsList', component: TeamsList, meta: { requiredAuth: true }, beforeEnter: async (to) => {
      const userStore = useUserStore();
      if (userStore.getUserInfo.type != "admin") {
        return '/';
      }
    }
  },
  {
    path: '/login', name: 'Login', component: Login, beforeEnter: async (to) => {
      const userStore = useUserStore();
      if (userStore.isLoggedIn)
        return '/';
    }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  if (to.meta.requiredAuth && !userStore.isLoggedIn && to.name !== 'Login') {
    return '/login'
  }
})

export default router;