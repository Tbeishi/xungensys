import { defineStore } from 'pinia'
import { reqTask,reqUpdTask,reqAddTask,reqDelTask } from '../../api/task'
export const useTaskInfo = defineStore('TaskInfo', {
  state: () => ({}),
  actions: {
    async getTask() {
      let result = await reqTask()
      return result
    },
    async updTask(data: any) {
      let result = await reqUpdTask(data)
      return result
    },
    async delTask(id: any) {
      let result = await reqDelTask(id)
      return result
    },
    async addTask(data: any) {
      let result = await reqAddTask(data)
      return result
    },
  },
  getters: {},
})
