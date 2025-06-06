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
          <button>Modifier</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  projects: {
    type: Array,
    required: true
  },
  teams: {
    type: Array,
    required: true
  }
});
</script>