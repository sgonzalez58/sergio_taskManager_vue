<template>
  <div class="project-table">
    <table>
      <tr>
        <th class="table-header">
          First name
        </th>
        <th class="table-header">
          Last Name
        </th>
        <th class="table-header">
          Rôle
        </th>
        <th class="table-header">
          Update
        </th>
      </tr>
      <tr class="table-rows" v-for="user in users" :key="user.id">
        <td>
          {{ user.first_name }}
        </td>
        <td>
          {{ user.last_name }}
        </td>
        <td :class="'role-' + user.type">
          {{ user.type }}
        </td>
        <td>
          <button id="userUpdate" @click="$emit('userRead', user)">Modifier l'utilisateur</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  users: {
    type: Array,
    required: true
  },
  teams: {
    type: Array,
    required: true
  }
});

defineEmits(['closeModal', 'userRead'])
</script>

<style scoped>
.project-table{
  border: 1px solid #59EEFF;
  border-radius: 10px;
  overflow: hidden;
}

 table {
  border-collapse: collapse;
  width: 100%;
  table-layout: auto !important;
  word-wrap: break-word;
}

th {
  background-color: #ACF7FF;
  padding: 20px;
  border-bottom: 1px solid #59EEFF;
}

th:nth-of-type(2) {
  border-left: 1px solid #59EEFF;
  border-right: 1px solid #59EEFF;
}

td {
  padding: 24px;
  text-align: center;
  border-bottom: 1px solid rgb(224, 242, 237);
}

.header-item {
  padding: 30px 20px;
  font-size: 12px;
  background-color: rgb(224, 242, 237);
  text-transform: uppercase;
}

.table-rows:nth-child(odd) {
  background-color: rgb(250, 250, 250);
}

.table-rows:nth-child(n):hover {
  background-color: rgb(244, 246, 245);
}

#userUpdate{
  background-color: rgb(94, 211, 234);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(5, 156, 186);
  transition-duration: 0.3s;
}

#userUpdate:hover{
  background-color: white;
  color: rgb(5, 156, 186);
}
</style>