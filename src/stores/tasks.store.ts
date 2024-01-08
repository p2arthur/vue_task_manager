import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { TaskInterface, tasksList } from '../data/tasks'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = reactive<TaskInterface[]>(tasksList)
  let filterByType = ref<string>('')
  const setFilter = (type: string) => {
    filterByType.value = type
  }

  const filteredTasks = computed(() => {
    switch (filterByType.value) {
      case 'todo':
        return tasks.filter((task) => !task.completed)
      case 'done':
        return tasks.filter((task) => task.completed)
      default:
        return tasks
    }
  })

  //Add a new task to the list
  const addTask = () => {
    //Declaring a simple variable to hold the data from our inputs using let
    let newTask: TaskInterface = {
      name: '',
      description: '',
      completed: false,
      id: 0
    }

    if (newTask.name == '' || newTask.description == '') {
      alert('Fill the task inputs to create a task')
      return
    }
    Object.assign(newTask, { id: tasks.length + 1 })
    tasks.push(newTask)
  }
  const toggleCompleted = (taskId: number) => {
    console.log('toggling')
    const taskToToggle = tasks.find((task) => task.id === taskId)!
    console.log('task to toggle', taskToToggle)
    Object.assign(taskToToggle, { completed: !taskToToggle.completed })
  }

  return { tasks, setFilter, filteredTasks, filterByType, addTask, toggleCompleted }
})
