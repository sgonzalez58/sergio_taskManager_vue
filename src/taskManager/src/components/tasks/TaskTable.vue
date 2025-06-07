<template>
  <div class="task-table">
    <ul class="task-list">
      <div class="task-list-title">
        <h3>Task Backlog</h3>
      </div>
      <li v-for="task in tasksBacklog" :key="task.id">
        <button class="task-button" @click="$emit('taskRead', task)">{{ task.label }}</button>
      </li>
    </ul>
    <ul class="task-list">
      <div class="task-list-title">
        <h3>Task Todo</h3>
      </div>
      <li v-for="task in tasksTodo" :key="task.id">
        <button class="task-button" @click="$emit('taskRead', task)">{{ task.label }}</button>
      </li>
    </ul>
    <ul class="task-list">
      <div class="task-list-title">
        <h3>Task in Progress</h3>
      </div>
      <li v-for="task in tasksInProgress" :key="task.id">
        <button class="task-button" @click="$emit('taskRead', task)">{{ task.label }}</button>
      </li>
    </ul>
    <ul class="task-list">
      <div class="task-list-title">
        <h3>Task in Review</h3>
      </div>
      <li v-for="task in tasksInReview" :key="task.id">
        <button class="task-button" @click="$emit('taskRead', task)">{{ task.label }}</button>
      </li>
    </ul>
    <ul class="task-list">
      <div class="task-list-title">
        <h3>Task Done</h3>
      </div>
      <li v-for="task in tasksDone" :key="task.id">
        <button class="task-button" @click="$emit('taskRead', task)">{{ task.label }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
});

const tasksBacklog = computed(() => {
  return props.tasks.filter((task) => task.step == 0)
})

const tasksTodo = computed(() => {
  return props.tasks.filter((task) => task.step == 1)
})

const tasksInProgress = computed(() => {
  return props.tasks.filter((task) => task.step == 2)
})

const tasksInReview = computed(() => {
  return props.tasks.filter((task) => task.step == 3)
})

const tasksDone = computed(() => {
  return props.tasks.filter((task) => task.step == 4)
})

defineEmits(['taskRead', 'closeModal'])
</script>

<style scoped>
.task {
  display: flex;
  gap: 10px;
}

.task-table {
  margin: 20px 0;
  display: flex;
  max-width: 1200px;
  width: 100%;
  background-color: #C3F9FF;
  border-radius: 10px;
  overflow: hidden;
  height: 800px;
  max-height: 70vh;
}

.task-table ul {
  width: 20%;
  padding-inline-start: 0;
  margin: 0;
}

.task-list{
  border: 1px solid #59EEFF;
}

.task-list-title {
  background-color: #ACF7FF;
  padding: 20px;
  border-bottom: 1px solid #59EEFF;
}

.task-table ul h3 {
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: center;
}

li {
  list-style: none;
  text-align: center;
  margin: 20px;
}

.task-button{
  background-color: #22A6FF;
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid #22A6FF;
  transition-duration: 0.3s;
}

.task-button:hover {
  background-color: white;
  color: #22A6FF;
}
</style>