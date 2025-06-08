<template>
  <div class="teamItemHeader">
    {{ formData?.id ? "Modification d'une équipe" : "Création d'une équipe" }} 
    <button id='closeModal' v-on:click="$emit('closeModal')">X</button>
  </div>
  <form class="teamItemInfo">
    <div class="teamItemInfosPrincipales">
      <div class="flex-col">
        <p>Nom de l'équipe</p>
        <input id="teamFirstName" v-model="formData.name" placeholder="Nom de l'équipe">
      </div>
      <div class="flex-col">
        <p>Manager de l'équipe</p>
        <select id="teamManager" v-model="formData.managerID">
          <option value="0">No manager assigned</option>
          <option v-for="user in findFreeManagers(team?.managerID)" :key="user.id" :value="user.id">{{ user.first_name + ' ' + user.last_name }}</option>
        </select>
      </div>
      <div class="flex-col">
        <p>Developpeurs de l'équipe</p>
        <select id="userTeam" v-model="formData.members" multiple>
          <option v-for="user in findFreeDeveloppers(team?.members)" :key="user.id" :value="user.id">{{ user.first_name + ' ' + user.last_name }}</option>
        </select>
      </div>
    </div>
  </form>
  <div class="teamItemActions">
    <button v-if="!team" id='confirmteamUpdate' v-on:click="$emit('teamCreate')">Créer l'équipe</button>
    <button v-if="team" id='confirmteamUpdate' v-on:click="$emit('teamUpdate')">Confirmer les modifications</button>
    <button v-if="team" id='deleteteam' v-on:click="$emit('teamDelete')">Supprimer l'équipe</button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue"

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  team: {
    type: Object
  },
  users : {
    type: Array,
    required: true
  },
  teams : {
    type : Array,
    required : true
  }
});

function findFreeManagers(manager_id){
  let managers_already_taken = props.teams.map((team) => team.managerID);
  if(manager_id){
    managers_already_taken = managers_already_taken.filter((managerId) => managerId != manager_id);
  }
  return props.users.filter((user) => user.type == "manager" && !managers_already_taken.includes(user.id));
}

function findFreeDeveloppers(members){
  const developers_already_taken_array = props.teams.map((team) => team.members);
  let developers_already_taken = developers_already_taken_array.flat(1);
  if(members){
    developers_already_taken = developers_already_taken.filter((developerId) => !members.includes(developerId));
  }
  return props.users.filter((user) => user.type == "dev" && !developers_already_taken.includes(user.id));
}

defineEmits(['teamUpdate', 'teamDelete', 'closeModal', 'teamCreate'])
</script>

<style scoped>
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

.teamItemHeader{
  text-align: center;
  background-color: rgb(72, 188, 211);
  color: black;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  border: 2px solid rgb(72, 188, 211);
}

.teamItemInfo{
  display: flex;
  align-items: baseline;
  padding: 18px;
  background-color: rgb(134, 229, 248);
  color: black;
}

.teamItemInfo input, .teamItemInfo select{
  padding: 3px 6px;
  border-radius: 3px;
  border: 1px solid black;
}

.teamItemInfosPrincipales{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.flex-col{
  display: flex;
  flex-direction: column;
}

.teamItemActions{
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px;
  background-color: rgb(207, 242, 249);
  border-top: 1px solid black;
  flex-wrap: wrap;
}

#confirmteamUpdate{
  background-color: rgb(94, 211, 234);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(5, 156, 186);
  transition-duration: 0.3s;
}

#confirmteamUpdate:hover{
  background-color: white;
  color: rgb(5, 156, 186);
}

#deleteteam{
  background-color: rgb(241, 63, 63);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(241, 63, 63);
  transition-duration: 0.3s;
}

#deleteteam:hover{
  background-color: white;
  color: rgb(241, 63, 63);
}
</style>