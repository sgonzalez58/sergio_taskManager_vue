<script setup>
import { ref } from "vue"

import teamTable from "../components/teams/TeamTable.vue"
import teamItem from "../components/teams/TeamItem.vue"

const teams = ref([])

let current_id = ref(1);

fetch('http://localhost:3000/teams')
  .then((res) => res.json())
  .then((res) => {
    teams.value = res
    for (const team of teams.value) {
      if (team.id >= current_id.value) {
        current_id.value = team.id + 1;
      }
    }
  })

const users = ref([]);

fetch('http://localhost:3000/users')
  .then((res) => res.json())
  .then((res) => {
    users.value = res
  })
  
const openTeamItem = ref(false)

const formData = ref({})
let currenTeamOpen = ref({})

function teamCreate() {
  formData.value.id = current_id.value++;  
  teams.value.push(formData.value)
  closeModal();
}

function teamUpdate() {
  currenTeamOpen.value.name = formData.value.name;
  currenTeamOpen.value.managerID = formData.value.managerID;
  currenTeamOpen.value.members = formData.value.members;
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
        <teamItem :team="currenTeamOpen" :users="users" :formData="formData" :teams="teams" @closeModal="closeModal" @teamCreate="teamCreate" @teamUpdate="teamUpdate"/>
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