<template>
  <div class="projectItemHeader">
    Création d'un projet
    <button id='closeModal' v-on:click="$emit('closeModal')">X</button>
  </div>
  <div class="projectItemInfo">
    <div class="projectItemInfosPrincipales">
      <div class="flex-col">
        <p>Titre du projet</p>
        <input id="projectName" v-model="formData.project_name" placeholder="Titre du project">
      </div>
    </div>
    <div class="projectItemInfosEquipe">
      <div class="flex-col">
        <p>Equipe assigné à la tâche</p>
        <select id="projectTeam" v-model="formData.team_id">
          <option value="0">No team assigned</option>
          <option v-for="team in teams" :key="team.id" :value="team.id" :disabled="team.id != myTeam.id">{{ team.name }}</option>
        </select>
      </div>
    </div>
  </div>
  <div class="projectItemActions">
    <button v-if="!project" id='confirmProjectUpdate' v-on:click="$emit('projectCreate')">Ajouter le projet</button>
  </div>
</template>

<script setup>

defineProps({
  formData:{
    type: Object,
    required: true
  },
  project: {
    type: Object
  },
  myTeam : {
    type: Object
  },
  teams : {
    type: Array,
    required: true
  }
});

defineEmits(['closeModal', 'projectCreate'])
</script>

<style>
#closeModal{
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: transparent;
  border: 1px solid rgb(241, 63, 63);
  font-size: 1.1em;
  border-radius: 25%;
  padding: 2px 6px;
  transition-duration: 0.3s;
}

#closeModal:hover{
  background-color: rgb(241, 63, 63);
  color: white;
}

.projectItemHeader{
  text-align: center;
  background-color: rgb(72, 188, 211);
  color: black;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  border: 2px solid rgb(72, 188, 211);
}

.projectItemInfo{
  display: flex;
  align-items: baseline;
  padding: 18px;
  background-color: rgb(134, 229, 248);
  color: black;
}

.projectItemInfo input, .projectItemInfo select{
  padding: 3px 6px;
  border-radius: 3px;
  border: 1px solid black;
}

.projectItemInfosPrincipales{
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 10px;
  border-right: 1px solid black;
}

.flex-col{
  display: flex;
  flex-direction: column;
}

.projectItemInfosEquipe{
  width: 30%;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  box-sizing: content-box;
  gap: 10px;
}

.projectItemActions{
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px;
  background-color: rgb(207, 242, 249);
  border-top: 1px solid black;
  flex-wrap: wrap;
}

#confirmProjectUpdate{
  background-color: rgb(94, 211, 234);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(5, 156, 186);
  transition-duration: 0.3s;
}

#confirmProjectUpdate:hover{
  background-color: white;
  color: rgb(5, 156, 186);
}

#deleteproject{
  background-color: rgb(241, 63, 63);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(241, 63, 63);
  transition-duration: 0.3s;
}

#deleteproject:hover{
  background-color: white;
  color: rgb(241, 63, 63);
}
</style>