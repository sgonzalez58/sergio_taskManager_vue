<script setup>
import { ref, computed } from "vue"

import projectTable from "../projects/ProjectTable.vue"
import projectItem from "../projects/ProjectItem.vue"
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
  if(confirm("Etes vous sûr de vouloir retirer votre équipe de ce projet ?"))
    project.team_id = 0;
}
</script>

<template>
  <main>
    <h1>Project manager</h1>

    <section class="main-buttons">
      <button id="addProject" v-on:click="projectRead(null)">Créer un projet</button>
    </section>

    <Teleport to="body">
      <div v-if="openProjectItem" class="modal">
        <projectItem :project="currentProjectOpen" :myTeam="myTeam" @projectDelete="projectDelete" @closeModal="closeModal"
          @projectCreate="projectCreate" />
      </div>
      <div v-if="openProjectItem" class="overlay" @click="closeModal"></div>
    </Teleport>

    <projectTable :projects="projects" :teams="teams" :myTeam="myTeam" @projectRead="projectRead" @closeModal="closeModal" @projectAssignTo="projectAssignTo" @projectWithdrawFrom="projectWithdrawFrom"/>
  </main>
</template>

<style scoped>

.main-buttons {
  display: flex;
  justify-content: end;
  margin: 20px 0;
}

#addProject {
  background-color: #22EA17;
  color: black;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid transparent;
  transition-duration: 0.3s;
}

#addProject:hover {
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