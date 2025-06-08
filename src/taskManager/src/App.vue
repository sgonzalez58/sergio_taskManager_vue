<script setup>
import { RouterLink } from "vue-router"
</script>

<template>
  <nav>
    <RouterLink to="/">
      <img src="./assets/logo.png" height="80px" alt="logo taskManager"/>
    </RouterLink>
    <RouterLink to="/tasks">Tasks</RouterLink>
    <RouterLink to="/projects">Projects</RouterLink>
    <RouterLink to="/users">Users</RouterLink>
    <RouterLink to="/teams">Teams</RouterLink>
  </nav>
  <RouterView/>
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
