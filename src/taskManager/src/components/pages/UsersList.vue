<script setup>
import { ref } from "vue"

import userTable from "../users/UserTable.vue"

const users = ref([])

let current_id = ref(1);

fetch('http://localhost:3000/users')
  .then((res) => res.json())
  .then((res) => {
    users.value = res
    for (const user in users) {
      if (user.id > current_id) {
        current_id.value = user.id + 1;
      }
    }
  })

const openUserItem = ref(false)

let currentUserOpen = ref({})

function userRead(user) {
  currentUserOpen.value = user;
  openUserItem.value = true;
}

function closeModal() {
  openUserItem.value = false;
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
      </div>
      <div v-if="openUserItem" class="overlay" @click="closeModal"></div>
    </Teleport>

    <userTable :users="users" @userRead="userRead" @closeModal="closeModal"/>
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>