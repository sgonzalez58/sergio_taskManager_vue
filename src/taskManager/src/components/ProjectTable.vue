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
          <button v-if="project.team_id != myTeam" @click="$emit('projectAssignTo', project)" :disabled="project.team_id && project.team_id != 0">Assigner mon équipe</button>
          <button v-if="project.team_id == myTeam" @click="$emit('projectWithdrawFrom', project)" :disabled="project.team_id != myTeam">Retirer mon équipe</button>
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
    type: Number,
    required: true
  }
});

defineEmits(['closeModal', 'projectAssignTo', 'projectWithdrawFrom'])
</script>