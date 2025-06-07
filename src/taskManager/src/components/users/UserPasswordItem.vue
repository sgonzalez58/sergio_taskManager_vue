<template>
  <div class="userItemHeader">
    Modification du mot de passe de l'utilisateur
    <button id='closeModal' v-on:click="$emit('closeModal')">X</button>
  </div>
  <form class="userItemInfo">
    <div class="userItemInfosPrincipales">
      <div class="flex-col">
        <p>Nouveau mot de passe de l'utilisateur</p>
        <input type="password" id="userPassword" v-model="formData.password" autocomplete="new-password"/>
      </div>
      <div class="flex-col">
        <p>Répétez le mot de passe</p>
        <input type="password" id="userPasswordRepeat" v-model="formData.passwordRepeat" autocomplete="new-password"/>
      </div>      
    </div>
  </form>
  <div class="userItemActions">
    <button v-if="user" id='confirmUserUpdate' v-on:click="$emit('userPasswordUpdate')">Confirmer les modifications</button>
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
  }
});

defineEmits(['userPasswordUpdate', 'closeModal'])
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
  width: 100%;
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

.userItemActions{
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px;
  background-color: rgb(207, 242, 249);
  border-top: 1px solid black;
  flex-wrap: wrap;
}

#confirmUserUpdate{
  background-color: rgb(94, 211, 234);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(5, 156, 186);
  transition-duration: 0.3s;
}

#confirmUserUpdate:hover{
  background-color: white;
  color: rgb(5, 156, 186);
}
</style>