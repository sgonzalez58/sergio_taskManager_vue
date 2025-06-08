<template>
  <div class="project-table">
    <table>
      <tr>
        <th class="table-header">
          Project Name
        </th>
        <th class="table-header">
          Team
        </th>
        <th class="table-header">
          Update
        </th>
      </tr>
      <tr class="table-rows" v-for="project in projects" :key="project.id">
        <td>
          {{ project.project_name }}
        </td>
        <td>
          {{ teams.find((team) => team.id == project.team_id)?.name }}
        </td>
        <td>
          <button id="confirmProjectUpdate" v-if="project.team_id != myTeam?.id" @click="$emit('projectAssignTo', project)" :disabled="project.team_id && project.team_id != 0">Assigner mon équipe</button>
          <button id="withdrawTeamFromProject" v-if="project.team_id == myTeam?.id" @click="$emit('projectWithdrawFrom', project)" :disabled="project.team_id != myTeam?.id">Retirer mon équipe</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  projects: {
    type: Array,
    required: true
  },
  teams: {
    type: Array,
    required: true
  },
  myTeam : {
    type: Object
  }
});

defineEmits(['closeModal', 'projectAssignTo', 'projectWithdrawFrom'])
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

#confirmProjectUpdate{
  background-color: rgb(94, 211, 234);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(5, 156, 186);
  transition-duration: 0.3s;
}

#confirmProjectUpdate:not([disabled]):hover{
  background-color: white;
  color: rgb(5, 156, 186);
}

#confirmProjectUpdate[disabled]{
  background-color: grey;
  border-color: grey;
}

#withdrawTeamFromProject{
  background-color: rgb(241, 63, 63);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(241, 63, 63);
  transition-duration: 0.3s;
}

#withdrawTeamFromProject:hover{
  background-color: white;
  color: rgb(241, 63, 63);
}
</style>