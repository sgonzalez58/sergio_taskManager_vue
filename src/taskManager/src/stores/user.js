import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: undefined,
    currentId: 1,
    user: undefined,
    accessToken: undefined
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
      return state.user != undefined && state.accessToken != undefined
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
          .then((res) => this.$patch((state) => {state.user = res.user; state.accessToken = res.accessToken }))
      } catch (error) {
        console.log(error)
      }
    },
    async addUser(user) {
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
    async updateInfoUser(user) {
      try {
        return await fetch("http://localhost:3000/users/" + user.id, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "type": user.type
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    async updatePasswordUser(user) {
      try {
        return await fetch("http://localhost:3000/users/" + user.id, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "password": user.password
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(id) {
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