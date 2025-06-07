<script setup>
import { ref } from "vue"

import userTable from "../components/users/UserTable.vue"
import userItem from "../components/users/UserItem.vue"
import userPasswordItem from "../components/users/UserPasswordItem.vue"

const users = ref([])

let current_id = ref(1);

fetch('http://localhost:3000/users')
  .then((res) => res.json())
  .then((res) => {
    users.value = res
    for (const user of users.value) {
      if (user.id >= current_id.value) {
        current_id.value = user.id + 1;
      }
    }
  })

const teams = ref([]);

fetch('http://localhost:3000/teams')
  .then((res) => res.json())
  .then((res) => {
    teams.value = res
  })
  
const openUserItem = ref(false)
const openUserPasswordItem = ref(false)

const formData = ref({})
let currentUserOpen = ref({})

function userCreate() {
  if(formData.value.type == "admin"){
    closeModal();
    return;
  }
  formData.value.id = current_id.value++;  
  users.value.push(formData.value)
  let user_team = teams.value.find((team) => team.id == formData.value.teamId);
  if(user_team){
    if(formData.value.type == "manager"){
      user_team.managerID = formData.value.id;
    }else if(formData.value.type == "dev"){
      user_team.members.push(formData.value.id);
    }
  }
  closeModal();
}

function userUpdate() {
  if(formData.value.type == "admin"){
    formData.value.teamId = 0;
  }
  currentUserOpen.value.first_name = formData.value.first_name;
  currentUserOpen.value.last_name = formData.value.last_name;
  currentUserOpen.value.email = formData.value.email;
  currentUserOpen.value.type = formData.value.type;
  let user_previous_team = teams.value.find((team) => team.managerID == currentUserOpen.value.id || team.members.includes(currentUserOpen.value.id));
  let user_team = teams.value.find((team) => team.id == formData.value.teamId);
  if(user_team.id != user_previous_team.id){
    if(formData.value.type == "manager"){
      user_team.managerID = formData.value.id;
      user_previous_team.managerID = null;
    }else if(formData.value.type == "dev"){
      user_team.members.push(formData.value.id);
      let user_previous_team_index = user_previous_team.members.findIndex((member) => member == currentUserOpen.value.id);
      user_previous_team.members.splice(user_previous_team_index, 1);
      console.log(currentUserOpen.value.id, user_previous_team)
    }
  }
  closeModal();
}

function userPasswordUpdate() {
  if(formData.value.password != formData.value.passwordRepeat || !confirm("Êtes-vous sûr de vouloir changer le mot de passe ?")){
    return;
  }
  currentUserOpen.value.password = formData.value.password;
  closeModal();
}

function userRead(user) {
  formData.value = {};
  if(user){
    formData.value = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      type: user.type
    }
  }
  currentUserOpen.value = user;
  openUserItem.value = true;
}

function userPasswordRead(user) {
  formData.value = {};
  formData.value = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name
    }
  currentUserOpen.value = user;
  openUserPasswordItem.value = true;
}

function closeModal() {
  openUserItem.value = false;
  openUserPasswordItem.value = false;
}
</script>

<template>
  <main>
    <h1>Users manager</h1>

    <section class="main-buttons">
      <button id="addUser" v-on:click="userRead(null)">Créer un utilisateur</button>
    </section>

    <Teleport to="body">
      <div v-if="openUserItem" class="modal">
        <userItem :user="currentUserOpen" :teams="teams" :formData="formData" @closeModal="closeModal" @userCreate="userCreate" @userUpdate="userUpdate"/>
      </div>
      <div v-if="openUserPasswordItem" class="modal">
        <userPasswordItem :user="currentUserOpen" :formData="formData" @closeModal="closeModal" @userPasswordUpdate="userPasswordUpdate"/>
      </div>
      <div v-if="openUserItem || openUserPasswordItem" class="overlay" @click="closeModal"></div>
    </Teleport>

    <userTable :users="users" :teams="teams" @userRead="userRead" @closeModal="closeModal" @userPasswordRead="userPasswordRead"/>
  </main>
</template>

<style scoped>

.main-buttons {
  display: flex;
  justify-content: end;
  margin: 20px 0;
}

#addUser {
  background-color: #22EA17;
  color: black;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid transparent;
  transition-duration: 0.3s;
}

#addUser:hover {
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