import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: undefined,
    currentId: 1
  }),
  getters: {
    getProjectById: (state) => {
      return (projectId) => state.projects.find((project) => project.id === projectId)
    },
    getprojects: (state) => {
      return state.projects
    },
    getCurrentId: (state) => {
      return state.currentId
    }
  },
  actions: {
    async fetchData() {
      return await fetch("http://localhost:3000/projects")
        .then((res) => res.json())
        .then((res) => {
          this.projects = res
          for (const project of res) {
            if (project.id >= this.currentId) {
              this.currentId = project.id + 1;
            }
          }
        })
    },
    async addProject(project) {
      try {
        return await fetch("http://localhost:3000/projects", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(project)
        })
          .then(() => this.projects.push(project))
      } catch (error) {
        console.log(error)
      }
    },
    async updateProject(project) {
      try {
        return await fetch("http://localhost:3000/projects/" + project.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "project_name": project.project_name,
            "team_id": project.team_id
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteProject(id) {
      try {
        return await fetch("http://localhost:3000/projects/" + id, {
          method: 'DELETE'
        })
          .then(() => {
            const project_index = this.projects.findIndex((project) => project.id == id)
            this.projects.splice(project_index, 1)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
});