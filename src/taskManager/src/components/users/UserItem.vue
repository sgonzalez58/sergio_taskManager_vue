<template>
  <div class="userItemHeader">
    {{ formData?.id ? "Modification d'un utilisateur" : "Création d'un utilisateur" }} 
    <button id='closeModal' v-on:click="$emit('closeModal')">X</button>
  </div>
  <form class="userItemInfo">
    <div class="userItemInfosPrincipales">
      <div class="flex-col">
        <p>Prénom de l'utilisateur</p>
        <input id="userFirstName" v-model="formData.first_name" placeholder="Prénom de l'utilisateur">
      </div>
      <div class="flex-col">
        <p>Nom de l'utilisateur</p>
        <input id="userLastName" v-model="formData.last_name" placeholder="Nom de l'utilisateur">
      </div>
      <div class="flex-col">
        <p>Email de l'utilisateur</p>
        <input type="email" id="userEmail" v-model="formData.email" placeholder="Email de l'utilisateur">
      </div>
      <div class="flex-col" v-if="!formData.id">
        <p>Mot de passe de l'utilisateur</p>
        <input type="password" id="userPassword" v-model="formData.password" placeholder="Email de l'utilisateur">
      </div>
      
    </div>
    <div class="userItemInfosEquipe">
      <div class="flex-col">
        <p>Rôle de l'utilisateur</p>
        <select id="userRole" v-model="formData.type">
          <option value="dev">Développeur</option>
          <option value="manager">Manageur</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="flex-col">
        <p>Equipe assigné</p>
        <select id="userTeam" v-model="formData.teamId">
          <option value="0">No team assigned</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
        </select>
      </div>
    </div>
  </form>
  <div class="userItemActions">
    <button v-if="!user" id='confirmuserUpdate' v-on:click="$emit('userCreate')">Créer l'utilisateur</button>
    <button v-if="user" id='confirmuserUpdate' v-on:click="$emit('userUpdate')">Confirmer les modifications</button>
    <button v-if="user" id='deleteuser' v-on:click="$emit('userDelete')">Supprimer l'utilisateur</button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue"

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  user: {
    type: Object
  },
  teams : {
    type: Array,
    required: true
  }
});

props.formData.teamId = findTeam(props.formData.id)

function findTeam(user_id){
  const team = props.teams.find((team) => team.managerID == user_id || team.members.includes(user_id));
  if(team){
    return team.id;
  }
  return 0;
}

defineEmits(['userUpdate', 'userDelete', 'closeModal', 'userCreate'])
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

.userItemHeader{
  text-align: center;
  background-color: rgb(72, 188, 211);
  color: black;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  border: 2px solid rgb(72, 188, 211);
}

.userItemInfo{
  display: flex;
  align-items: baseline;
  padding: 18px;
  background-color: rgb(134, 229, 248);
  color: black;
}

.userItemInfo input, .userItemInfo select{
  padding: 3px 6px;
  border-radius: 3px;
  border: 1px solid black;
}

.userItemInfosPrincipales{
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

.userItemInfosEquipe{
  width: 30%;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  box-sizing: content-box;
  gap: 10px;
}

.userItemActions{
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px;
  background-color: rgb(207, 242, 249);
  border-top: 1px solid black;
  flex-wrap: wrap;
}

#confirmuserUpdate{
  background-color: rgb(94, 211, 234);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(5, 156, 186);
  transition-duration: 0.3s;
}

#confirmuserUpdate:hover{
  background-color: white;
  color: rgb(5, 156, 186);
}

#deleteuser{
  background-color: rgb(241, 63, 63);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(241, 63, 63);
  transition-duration: 0.3s;
}

#deleteuser:hover{
  background-color: white;
  color: rgb(241, 63, 63);
}
</style>