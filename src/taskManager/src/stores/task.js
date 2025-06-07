import { defineStore } from 'pinia'
import { ref } from "vue"

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: undefined,
    currentId: 1
  }),
  getters: {
    getTaskById: (state) => {
      return (taskId) => state.tasks.find((task) => task.id === taskId)
    },
    getTasks: (state) => {
      return state.tasks
    },
    getCurrentId: (state) => {
      return state.currentId
    }
  },
  actions: {
    async fetchData() {
      return fetch("http://localhost:3000/tasks")
        .then((res) => res.json())
        .then((res) => {
          this.tasks = res
          for (const task of res) {
            if (task.id >= this.currentId) {
              this.currentId = task.id + 1;
            }
          }
        })
    },
    async addTask(task) {
      try {
        return fetch("http://localhost:3000/tasks", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        })
          .then(() => this.tasks.push(task))
      } catch (error) {
        console.log(error)
      }
    }
  }
});