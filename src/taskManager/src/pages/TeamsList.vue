<script setup>
import { ref, onMounted } from "vue"
import { useTeamStore } from "@/stores/team"
import { useUserStore } from "@/stores/user"

import teamTable from "../components/teams/TeamTable.vue"
import teamItem from "../components/teams/TeamItem.vue"

const teamStore = useTeamStore();
const teams = ref([])
let current_id = ref(1);
onMounted(async () =>{
  if(teamStore.getTeams === undefined){
    await teamStore.fetchData();
  }
  teams.value = teamStore.getTeams;
  current_id.value = teamStore.getCurrentId;
})

const userStore = useUserStore();
const users = ref([])
onMounted(async () =>{
  if(userStore.getUsers === undefined){
    await userStore.fetchData();
  }
  users.value = userStore.getUsers;
})
  
const openTeamItem = ref(false)

const formData = ref({})
let currenTeamOpen = ref({})

function teamCreate() {
  formData.value.id = current_id.value++;  
  teamStore.addTeam(formData.value);
  closeModal();
}

function teamUpdate() {
  currenTeamOpen.value.name = formData.value.name;
  currenTeamOpen.value.managerID = formData.value.managerID;
  currenTeamOpen.value.members = formData.value.members;
  teamStore.updateTeam(currenTeamOpen.value)
  closeModal();
}

function teamDelete(id) {
  teamStore.deleteTeam(id)
  closeModal();
}

function teamRead(team) {
  formData.value = {};
  if(team){
    formData.value = {
      id: team.id,
      name: team.name,
      managerID: team.managerID,
      members: team.members
    }
  }
  currenTeamOpen.value = team;
  openTeamItem.value = true;
}

function closeModal() {
  openTeamItem.value = false;
}
</script>

<template>
  <main>
    <h1>Teams manager</h1>

    <section class="main-buttons">
      <button id="addTeam" v-on:click="teamRead(null)">Créer une équipe</button>
    </section>

    <Teleport to="body">
      <div v-if="openTeamItem" class="modal">
        <teamItem :team="currenTeamOpen" :users="users" :formData="formData" :teams="teams" @closeModal="closeModal" @teamCreate="teamCreate" @teamUpdate="teamUpdate" @teamDelete="teamDelete"/>
      </div>
      <div v-if="openTeamItem" class="overlay" @click="closeModal"></div>
    </Teleport>

    <teamTable :teams="teams" :users="users" @teamRead="teamRead" @closeModal="closeModal"/>
  </main>
</template>

<style scoped>

.main-buttons {
  display: flex;
  justify-content: end;
  margin: 20px 0;
}

#addTeam {
  background-color: #22EA17;
  color: black;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid transparent;
  transition-duration: 0.3s;
}

#addTeam:hover {
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>