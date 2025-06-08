import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', {
  state: () => ({
    teams: undefined,
    currentId: 1
  }),
  getters: {
    getTeamById: (state) => {
      return (teamId) => state.teams.find((team) => team.id === teamId)
    },
    getTeams: (state) => {
      return state.teams
    },
    getCurrentId: (state) => {
      return state.currentId
    }
  },
  actions: {
    async fetchData() {
      return await fetch("http://localhost:3000/teams")
        .then((res) => res.json())
        .then((res) => {
          this.teams = res
          for (const team of res) {
            if (team.id >= this.currentId) {
              this.currentId = team.id + 1;
            }
          }
        })
    },
    async addTeam(team) {
      try {
        return await fetch("http://localhost:3000/teams", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(team)
        })
          .then(() => this.teams.push(team))
      } catch (error) {
        console.log(error)
      }
    },
    async updateTeam(team) {
      try {
        return await fetch("http://localhost:3000/teams/" + team.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": team.name,
            "managerID": team.managerID,
            "members": team.members
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteTeam(id) {
      try {
        return await fetch("http://localhost:3000/teams/" + id, {
          method: 'DELETE'
        })
          .then(() => {
            const team_index = this.teams.findIndex((team) => team.id == id)
            this.teams.splice(team_index, 1)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
});