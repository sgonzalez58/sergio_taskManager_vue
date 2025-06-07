<script setup>
import { ref, computed } from "vue"
import Dashboard from "./components/pages/Dashboard.vue"
import TasksList from "./components/pages/TasksList.vue"
import ProjectsList from "./components/pages/ProjectsList.vue"
import NotFound from './components/pages/NotFound.vue'
import UsersList from "./components/pages/UsersList.vue"
import TeamsList from "./components/pages/TeamsList.vue"

const routes = {
  '/': Dashboard,
  '/tasks' : TasksList,
  '/projects': ProjectsList,
  '/users' : UsersList,
  '/teams' : TeamsList
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <nav>
    <a href="#/">
      <img src="./assets/logo.png" height="80px" alt="logo taskManager"/>
    </a>
    <a href="#/tasks">Tasks</a>
    <a href="#/projects">Projects</a>
    <a href="#/users">Users</a>
    <a href="#/teams">Teams</a>
  </nav>
  <component :is="currentView" />
</template>

<style scoped>

nav{
  position: fixed;
  display: flex;
  align-items: center;
  gap: 20px;
  top: 0;
  left: 0;
  padding: 0 calc(1rem + 8px);
  width: 100%;
  box-sizing: border-box;
  background-color: #BFF9FF;
  border-bottom: 1px solid #45B4FF;
}
</style>
