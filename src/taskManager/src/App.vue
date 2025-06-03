<script setup>
import { ref, computed } from "vue"

const tasks = ref([])

const tasksTerminées = computed(() => {
  return tasks.value.filter((task) => task.status === "terminée")
})

const tasksEnCours = computed(() => {
  return tasks.value.filter((task) => task.status === "enCours")
})

const title = ref("")
const description = ref("")

function taskCreate() {
  let newTask = {
    title : title.value,
    description : description.value,
    status : "enCours"
  };
  tasks.value.push(newTask);
  title.value = "";
  description.value = "";
}

function taskStatusToggle(e) {
  const task = tasks.value[e.target.id.split('-')[1]]
  task.status = task.status === "terminée" ? "enCours" : "terminée";
}

function taskDelete(e) {
  console.log(e)
  tasks.value.splice(e.target.id.split('-')[1], 1)
}
</script>

<template>
  <main>
    <h1>Task manager</h1>

    <h2 style="padding-top: 20px">Main info</h2>
    <div>
      <p>Nombre de tasks : {{ tasks.length }}</p>
      <p>Tasks terminée : {{ tasksTerminées.length }}</p>
      <p>Tasks en cours : {{ tasksEnCours.length }}</p>
    </div>

    <h2 style="padding-top: 20px">Add Task</h2>
    <form @submit.prevent>
      <div>
        <label for="title">Task title : </label>
        <input id="title" v-model="title">
      </div>
      <div style="display: flex; flex-direction: column;">
        <label for="description">Task description</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <button v-on:click="taskCreate" >Ajouter une tâche</button>
    </form>

    <h2 style="padding-top: 20px">Task list</h2>
    <ul>
      <li :class="task.status === 'enCours' ? 'task' : 'task-terminée'" v-for="(task, index) in tasks" :key="index">
        <label :for="'task-' + index">{{ task.title }}</label>
        <input :id="'task-' + index" v-on:change="taskStatusToggle" type="checkbox" :checked="task.status === 'terminée'">
        <button :id="'taskDeleteButton-' + index" v-on:click="taskDelete">Supprimer</button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
  .task{
    display: flex;
    gap: 10px;
  }

  .task-terminée{
    display: flex;
    gap: 10px;
    text-decoration: line-through;
    color: rgb(255, 148, 148);
  }
</style>
