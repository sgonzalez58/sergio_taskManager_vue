<script setup>
import { ref, onMounted } from "vue"
import { useTaskStore } from "@/stores/task"

import taskItem from "../components/tasks/TaskItem.vue"
import TaskTable from "../components/tasks/TaskTable.vue"

const taskStore = useTaskStore();

const tasks = ref([])
const current_id = ref(1);

onMounted(async () =>{
  if(taskStore.getTasks === undefined){
    await taskStore.fetchData();
  }
  tasks.value = taskStore.getTasks;
  current_id.value = taskStore.getCurrentId;
})

const openTaskItem = ref(false)
const formData = ref({});

let currentTaskOpen = ref({})

function taskCreate() {
  formData.value.id = current_id.value++;
  taskStore.addTask(formData.value);
  closeModal();
}

function taskUpdate(task) {
  task.label = formData.value.label;
  task.estimatedTime = formData.value.estimatedTime;
  task.step = formData.value.step;
  task.projectID = formData.value.projectID;
  task.assignedTo = formData.value.assignedTo;
  taskStore.updateTask(task)
  closeModal();
}

function taskDelete(id) {
  taskStore.deleteTask(id)
  closeModal();
}

function taskRead(task) {
  formData.value = {};
  if(task){
    formData.value = {
      label: task.label,
      step: task.step,
      projectID: task.projectID,
      estimatedTime: task.estimatedTime,
      assignedTo: task.assignedTo
    }
  }
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

    <section class="main-buttons">
      <button id="addTask" v-on:click="taskRead(null)">Ajouter une tâche</button>
    </section>
    <Teleport to="body">
      <div v-if="openTaskItem" class="modal">
        <taskItem :task="currentTaskOpen" :formData="formData" @taskUpdate="taskUpdate" @taskDelete="taskDelete" @closeModal="closeModal"
          @taskCreate="taskCreate" />
      </div>
      <div v-if="openTaskItem" class="overlay" @click="closeModal"></div>
    </Teleport>

    <taskTable :tasks="tasks" @taskRead="taskRead" @closeModal="closeModal"/>
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