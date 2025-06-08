import { defineStore } from 'pinia'

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
      return await fetch("http://localhost:3000/tasks")
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
        return await fetch("http://localhost:3000/tasks", {
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
    },
    async updateTask(task) {
      try {
        return await fetch("http://localhost:3000/tasks/" + task.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteTask(id) {
      try {
        return await fetch("http://localhost:3000/tasks/" + id, {
          method: 'DELETE'
        })
          .then(() => {
            const task_index = this.tasks.findIndex((task) => task.id == id)
            this.tasks.splice(task_index, 1)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
});