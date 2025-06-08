<script setup>
import { useUserStore } from "@/stores/user"
import { ref } from "vue";

const userStore = useUserStore();

const formData = ref({})

function submitForm() {
  userStore.loginUser(formData.value.email, formData.value.password)
}

</script>

<template>
  <main>
    <h1>Login</h1>

    <form @submit.prevent="submitForm">
      <div class="flex-col">
        <label for="loginMail">Email:</label>
        <input id="loginMail" v-model="formData.email">
      </div>
      <div class="flex-col">
        <label for="loginPassword">Mot de passe:</label>
        <input id="loginPassword" v-model="formData.password">
      </div>
      <input type="submit">
    </form>
  </main>
</template>

<style scoped>
form{
  margin:auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.flex-col{
  display: flex;
  flex-direction: column;
}

input[type=submit]{
  background-color: rgb(94, 211, 234);
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid rgb(5, 156, 186);
  transition-duration: 0.3s;
}

input[type=submit]:hover{
  background-color: white;
  color: rgb(5, 156, 186);
}
</style>