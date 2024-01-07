<!-- @format -->

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TaskInterface, tasks } from './data/tasks'
import Task from './components/Task.vue'
import Filter from './components/Filter.vue'
import { computed } from 'vue'

//Reactive for arrays and objects
const tasksReactive = reactive<TaskInterface[]>(tasks)

//Declaring a simple variable to hold the data from our inputs using let
let newTask: TaskInterface = {
  name: '',
  description: '',
  completed: false,
  id: 0
}

//Add a new task to the list
const addTask = () => {
  if (newTask.name == '' || newTask.description == '') {
    alert('Fill the task inputs to create a task')
    return
  }
  Object.assign(newTask, { id: tasksReactive.length + 1 })
  tasksReactive.push(newTask)
}

const toggleCompleted = (taskId: number) => {
  console.log('toggling')
  const taskToToggle = tasksReactive.find((task) => task.id === taskId)!
  console.log('task to toggle', taskToToggle)
  Object.assign(taskToToggle, { completed: !taskToToggle.completed })
}

let filterByType = ref<string>('')
const filterBy = (type: string): void => {
  console.log('filtering', type)

  switch (type) {
    case 'todo':
      filterByType.value = 'todo'
      break
    case 'done':
      const newTasks2 = tasksReactive.filter((task) => task.completed)
      filterByType.value = 'done'
      break

    default:
      filterByType.value = ''
      return
  }
}

const filteredTasks = computed(() => {
  switch (filterByType.value) {
    case 'todo':
      return tasksReactive.filter((task) => !task.completed)

    case 'done':
      return tasksReactive.filter((task) => task.completed)

    default:
      return tasksReactive
  }
})
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="header-side">
        <h1>My first vue Task manager</h1>
      </div>
    </div>
  </div>
  <main>
    <Filter @filterBy="filterBy" :filterByType="filterByType" />
    <div class="tasks">
      <Task
        @toggleCompleted="toggleCompleted"
        v-for="(task, index) in filteredTasks"
        :key="index"
        :task="task"
      />
    </div>

    <div class="add-task">
      <h3>Add a new task</h3>
      <input v-model="newTask.name" type="text" name="title" placeholder="Enter a title..." /><br />
      <textarea
        v-model="newTask.description"
        name="description"
        rows="4"
        placeholder="Enter a description..."
      /><br />
      <button @click="addTask()" class="btn gray">Add Task</button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }
}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.add-task {
  margin-top: 60px;

  input,
  textarea {
    width: 360px;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
  }

  button {
    width: 360px;
    margin-top: 12px;
  }
}
</style>
