<script setup>
import { ref, computed } from "vue"

import projectTable from "./ProjectTable.vue"
import projectItem from "./ProjectItem.vue"
const projects = ref([])

let current_id = ref(1);

fetch('http://localhost:3000/projects')
  .then((res) => res.json())
  .then((res) => {
    projects.value = res
    for (const project in projects) {
      if (project.id > current_id) {
        current_id.value = project.id + 1;
      }
    }
  })

const teams = ref([]);

fetch('http://localhost:3000/teams')
  .then((res) => res.json())
  .then((res) => {
    teams.value = res
  })

const myTeam = ref(1)

const openProjectItem = ref(false)

let currentProjectOpen = ref({})

function projectCreate() {
  let newProject = {
    project_name: document.getElementById('projectLabel').value,
    id: current_id.value++,
    team_id: document.getElementById('projectTeam').value
  };
  projects.value.push(newProject)
  document.getElementById('projectLabel').value = '';
  document.getElementById('projectTeam').value = 0;
  closeModal();
}

// function projectUpdate(task) {
//   task.label = document.getElementById('taskLabel').value;
//   task.estimatedTime = document.getElementById('taskEstimatedTime').value;
//   task.step = document.getElementById('taskStep').value;
//   task.projectID = document.getElementById('taskProjet').value;
//   task.assignedTo = document.getElementById('taskDev').value;
//   document.getElementById('taskLabel').value = '';
//   document.getElementById('taskEstimatedTime').value = 0;
//   document.getElementById('taskStep').value = 0;
//   document.getElementById('taskProjet').value = 0;
//   document.getElementById('taskDev').value = 0;
//   closeModal();
// }

function projectDelete(id) {
  projects.value = projects.value.filter((project) => id != project.id)
  closeModal();
}

function projectRead(project) {
  currentProjectOpen.value = project;
  openProjectItem.value = true;
}

function closeModal() {
  openProjectItem.value = false;
}

function projectAssignTo(project) {
  project.team_id = myTeam.value;
}

function projectWithdrawFrom(project) {
  project.team_id = 0;
}
</script>

<template>
  <main>
    <h1>Project manager</h1>

    <h2 style="padding-top: 20px">Add Project</h2>

    <button v-on:click="projectRead(null)">Créer un projet</button>

    <Teleport to="body">
      <div v-if="openProjectItem" class="modal">
        <projectItem :project="currentProjectOpen" :myTeam="myTeam" @projectDelete="projectDelete" @closeModal="closeModal"
          @projectCreate="projectCreate" />
      </div>
      <div v-if="openProjectItem" class="overlay" @click="closeModal"></div>
    </Teleport>

    <h2 style="padding-top: 20px">Task list</h2>

    <projectTable :projects="projects" :teams="teams" :myTeam="myTeam" @projectRead="projectRead" @closeModal="closeModal" @projectAssignTo="projectAssignTo" @projectWithdrawFrom="projectWithdrawFrom">
      
    </projectTable>
  </main>
</template>

<style scoped>
.task {
  display: flex;
  gap: 10px;
}

.task-table {
  display: flex;
  max-width: 1200px;
  width: 100%;
}

.task-table ul {
  width: 20%;
  padding-inline-start: 0;
}

li {
  list-style: none;
  text-align: center;
  padding-bottom: 10px;
}

h3 {
  width: 100%;
  text-align: center;
  padding-bottom: 0.8em;
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