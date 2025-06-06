<script setup>
import { ref, computed } from "vue"
import TasksList from "./components/TasksList.vue"
import ProjectsList from "./components/ProjectsList.vue"
import NotFound from './components/NotFound.vue'

const routes = {
  '/': TasksList,
  '/manager': ProjectsList
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
  <a href="#/">Home</a> | 
  <a href="#/manager">Manager</a>
  <component :is="currentView" />
</template>

<style scoped></style>
