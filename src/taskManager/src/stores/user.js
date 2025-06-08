import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: undefined,
    currentId: 1,
    user: undefined,
  }),
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
    getUsers: (state) => {
      return state.users
    },
    getCurrentId: (state) => {
      return state.currentId
    },
    getUserInfo: (state) => {
      return state.user
    },
    isLoggedIn: (state) => {
      return state.user != undefined
    }
  },
  actions: {
    async fetchData() {
      return await fetch("http://localhost:3000/users")
        .then((res) => res.json())
        .then((res) => {
          this.users = res
          for (const user of res) {
            if (user.id >= this.currentId) {
              this.currentId = user.id + 1;
            }
          }
        })
    },
    async loginUser(email, password) {
      try {
        return await fetch("http://localhost:3000/login", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email" : email,
            "password" : password
          })
        })
          .then((res) => res.json())
          .then((res) => { this.user = res })
      } catch (error) {
        console.log(error)
      }
    },
    async adduser(user) {
      try {
        return await fetch("http://localhost:3000/users", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
          .then(() => this.users.push(user))
      } catch (error) {
        console.log(error)
      }
    },
    async updateuser(user) {
      try {
        return await fetch("http://localhost:3000/users/" + user.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteuser(id) {
      try {
        return await fetch("http://localhost:3000/users/" + id, {
          method: 'DELETE'
        })
          .then(() => {
            const user_index = this.users.findIndex((user) => user.id == id)
            this.users.splice(user_index, 1)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
});