<template>
  <div class="taskItemHeader">
    {{ task ? "Modification de tâche" : "Création d'une tâche" }}
    <button id='closeModal' v-on:click="$emit('closeModal')">X</button>
  </div>
  <form class="taskItemInfo">
    <div class="taskItemInfosPrincipales">
      <div class="flex-col">
        <p>Titre de la tâche</p>
        <input id="taskLabel" v-model="formData.label" placeholder="Titre de la tâche">
      </div>
      <div class="flex-col">
        <p>Temps estimé de travail : {{ formData.estimatedTime }} jours</p>
        <input type="number" id="taskEstimatedTime" placeholder="modifier le temps estimé" v-model="formData.estimatedTime" />
      </div>
      <div class="flex-col">
        <p>Etat de la tâche</p>
        <select id="taskStep" v-model="formData.step">
          <option value="0">Backlog</option>
          <option value="1">Todo</option>
          <option value="2">InProgress</option>
          <option value="3">InReview</option>
          <option value="4">Done</option>
        </select>
      </div>
    </div>
    <div class="taskItemInfosEquipe">
      <div class="flex-col">
        <p>Projet associé</p>
        <select id="taskProjet" v-model="formData.projectID">
          <option v-for="projet in projets" :key="projet.id" :value="projet.id">{{ projet.project_name }}</option>
        </select>
      </div>
      <div class="flex-col">
        <p>Développeur assigné à la tâche</p>
        <select id="taskDev" v-model="formData.assignedTo">
          <option v-for="dev in devs" :key="dev.id" :value="dev.id">{{ dev.first_name + ' ' + dev.last_name }}</option>
        </select>
      </div>
    </div>
  </form>
  <div class="taskItemActions">
    <button v-if="!task" id='confirmTaskUpdate' v-on:click="$emit('taskCreate')">Ajouter la tâche</button>
    <button v-if="task" id='confirmTaskUpdate' v-on:click="$emit('taskUpdate')">Confirmer les modifications</button>
    <button v-if="task" id='deleteTask' v-on:click="$emit('taskDelete')">Supprimer la tâche</button>
  </div>
</template>

<script setup>
import { ref } from "vue"

const projets = ref([]);

fetch('http://localhost:3000/projects')
  .then((res) => res.json())
  .then((res) => projets.value = res)

const devs = ref([]);

fetch('http://localhost:3000/users')
  .then((res) => res.json())
  .then((res) => devs.value = res.filter((user) => user.type === "dev"))


defineProps({
  formData:{
    type: Object,
    required: true
  },
  task: {
    type: Object
  }
});

defineEmits(['taskUpdate', 'taskDelete', 'closeModal', 'taskCreate'])
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

.taskItemHeader{
  text-align: center;
  background-color: rgb(72, 188, 211);
  color: black;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  border: 2px solid rgb(72, 188, 211);
}

.taskItemInfo{
  display: flex;
  align-items: baseline;
  padding: 18px;
  background-color: rgb(134, 229, 248);
  color: black;
}

.taskItemInfo input, .taskItemInfo select{
  padding: 3px 6px;
  border-radius: 3px;
  border: 0;
}

.taskItemInfosPrincipales{
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

.taskItemInfosEquipe{
  width: 30%;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  box-sizing: content-box;
  gap: 10px;
}

.taskItemActions{
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px;
  background-color: rgb(207, 242, 249);
  border-top: 1px solid black;
  flex-wrap: wrap;
}

#confirmTaskUpdate{
  background-color: rgb(94, 211, 234);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(5, 156, 186);
  transition-duration: 0.3s;
}

#confirmTaskUpdate:hover{
  background-color: white;
  color: rgb(5, 156, 186);
}

#deleteTask{
  background-color: rgb(241, 63, 63);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(241, 63, 63);
  transition-duration: 0.3s;
}

#deleteTask:hover{
  background-color: white;
  color: rgb(241, 63, 63);
}
</style>