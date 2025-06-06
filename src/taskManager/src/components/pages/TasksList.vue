<script setup>
import { ref, computed } from "vue"

import taskItem from "../tasks/TaskItem.vue"
const tasks = ref([])

let current_id = ref(1);

fetch('http://localhost:3000/tasks')
  .then((res) => res.json())
  .then((res) => {
    tasks.value = res
    for (const task in tasks) {
      if (task.id > current_id) {
        current_id.value = task.id + 1;
      }
    }
  })

const tasksBacklog = computed(() => {
  return tasks.value.filter((task) => task.step == 0)
})

const tasksTodo = computed(() => {
  return tasks.value.filter((task) => task.step == 1)
})

const tasksInProgress = computed(() => {
  return tasks.value.filter((task) => task.step == 2)
})

const tasksInReview = computed(() => {
  return tasks.value.filter((task) => task.step == 3)
})

const tasksDone = computed(() => {
  return tasks.value.filter((task) => task.step == 4)
})

const openTaskItem = ref(false)

let currentTaskOpen = ref({})

function taskCreate() {
  let newTask = {
    label: document.getElementById('taskLabel').value,
    step: document.getElementById('taskStep').value,
    id: current_id.value++,
    projectID: document.getElementById('taskProjet').value,
    estimatedTime: document.getElementById('taskEstimatedTime').value,
    assignedTo: document.getElementById('taskDev').value
  };
  tasks.value.push(newTask)
  document.getElementById('taskLabel').value = '';
  document.getElementById('taskEstimatedTime').value = 0;
  document.getElementById('taskStep').value = 0;
  document.getElementById('taskProjet').value = 0;
  document.getElementById('taskDev').value = 0;
  closeModal();
}

function taskUpdate(task) {
  task.label = document.getElementById('taskLabel').value;
  task.estimatedTime = document.getElementById('taskEstimatedTime').value;
  task.step = document.getElementById('taskStep').value;
  task.projectID = document.getElementById('taskProjet').value;
  task.assignedTo = document.getElementById('taskDev').value;
  document.getElementById('taskLabel').value = '';
  document.getElementById('taskEstimatedTime').value = 0;
  document.getElementById('taskStep').value = 0;
  document.getElementById('taskProjet').value = 0;
  document.getElementById('taskDev').value = 0;
  closeModal();
}

function taskDelete(id) {
  tasks.value = tasks.value.filter((task) => id != task.id)
  closeModal();
}

function taskRead(task) {
  currentTaskOpen.value = task;
  openTaskItem.value = true;
}

function closeModal() {
  openTaskItem.value = false;
}
</script>

<template>
  <main>
    <h1>Task manager</h1>

    <!-- <h2 style="padding-top: 20px">Main info</h2>
    <div>
      <p>Nombre de tasks : {{ tasks.length }}</p>
      <p>Tasks backlog : {{ tasksBacklog.length }}</p>
      <p>Tasks todo : {{ tasksTodo.length }}</p>
      <p>Tasks in progress : {{ tasksInProgress.length }}</p>
      <p>Tasks in review : {{ tasksInReview.length }}</p>
      <p>Tasks done : {{ tasksDone.length }}</p>
    </div> -->

    <section class="main-buttons">
      <button id="addTask" v-on:click="taskRead(null)">Ajouter une tâche</button>
    </section>
    <Teleport to="body">
      <div v-if="openTaskItem" class="modal">
        <taskItem :task="currentTaskOpen" @taskUpdate="taskUpdate" @taskDelete="taskDelete" @closeModal="closeModal"
          @taskCreate="taskCreate" />
      </div>
      <div v-if="openTaskItem" class="overlay" @click="closeModal"></div>
    </Teleport>

    <div class="task-table">
      <ul class="task-list">
        <div class="task-list-title">
          <h3>Task Backlog</h3>
        </div>
        <li v-for="task in tasksBacklog" :key="task.id">
          <button class="task-button" @click="taskRead(task)">{{ task.label }}</button>
        </li>
      </ul>
      <ul class="task-list">
        <div class="task-list-title">
          <h3>Task Todo</h3>
        </div>
        <li v-for="task in tasksTodo" :key="task.id">
          <button class="task-button" @click="taskRead(task)">{{ task.label }}</button>
        </li>
      </ul>
      <ul class="task-list">
        <div class="task-list-title">
          <h3>Task in Progress</h3>
        </div>
        <li v-for="task in tasksInProgress" :key="task.id">
          <button class="task-button" @click="taskRead(task)">{{ task.label }}</button>
        </li>
      </ul>
      <ul class="task-list">
        <div class="task-list-title">
          <h3>Task in Review</h3>
        </div>
        <li v-for="task in tasksInReview" :key="task.id">
          <button class="task-button" @click="taskRead(task)">{{ task.label }}</button>
        </li>
      </ul>
      <ul class="task-list">
        <div class="task-list-title">
          <h3>Task Done</h3>
        </div>
        <li v-for="task in tasksDone" :key="task.id">
          <button class="task-button" @click="taskRead(task)">{{ task.label }}</button>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.main-buttons {
  display: flex;
  justify-content: end;
  margin: 20px 0;
}

#addTask {
  background-color: #22EA17;
  color: black;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid transparent;
  transition-duration: 0.3s;
}

#addTask:hover {
  background-color: white;
  color: #138a0d;
  border-color: #138a0d;
}

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


.modal {
  position: fixed;
  top: 20%;
  left: 50%;
  width: 600px;
  z-index: 999;
  transform: translate(-50%);
  border: 2px solid rgb(220, 249, 255);
  border-radius: 10px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>