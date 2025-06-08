<script setup>
import { ref, onMounted } from "vue"
import { useProjectStore } from "@/stores/project"
import { useTeamStore } from "@/stores/team"
import { useUserStore } from "@/stores/user"

import projectTable from "../components/projects/ProjectTable.vue"
import projectItem from "../components/projects/ProjectItem.vue"

const projectStore = useProjectStore();
const projects = ref([])
let current_id = ref(1);
onMounted(async () =>{
  if(projectStore.getprojects === undefined){
    await projectStore.fetchData();
  }
  projects.value = projectStore.getprojects;
  current_id.value = projectStore.getCurrentId;
})

const teamStore = useTeamStore();
const teams = ref([])
const myTeam = ref(undefined)
onMounted(async () =>{
  if(teamStore.getTeams === undefined){
    await teamStore.fetchData();
  }
  teams.value = teamStore.getTeams;
  const userStore = useUserStore();
  myTeam.value = teamStore.getMyTeam(userStore.getUserInfo.id)
})


const openProjectItem = ref(false)
const formData = ref({});
let currentProjectOpen = ref({})

function projectCreate() {
  formData.value.id = current_id.value++;
  projectStore.addProject(formData.value);
  closeModal();
}

function projectRead(project) {
  formData.value = {team_id: myTeam.value.id};
  if(project){
    formData.value = {
      project_name: project.project_name,
      team_id: project.team_id
    }
  }
  currentProjectOpen.value = project;
  openProjectItem.value = true;
}

function closeModal() {
  openProjectItem.value = false;
}

function projectAssignTo(project) {
  project.team_id = myTeam.value.id;
  projectStore.updateProject(project)
}

function projectWithdrawFrom(project) {
  if(confirm("Etes vous sûr de vouloir retirer votre équipe de ce projet ?")){
    project.team_id = 0;
    projectStore.updateProject(project)
  }
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
        <projectItem :project="currentProjectOpen" :formData="formData" :myTeam="myTeam" :teams="teams" @closeModal="closeModal" @projectCreate="projectCreate" />
      </div>
      <div v-if="openProjectItem" class="overlay" @click="closeModal"></div>
    </Teleport>

    <projectTable :projects="projects" :teams="teams" :myTeam="myTeam" @projectAssignTo="projectAssignTo" @projectWithdrawFrom="projectWithdrawFrom"/>
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