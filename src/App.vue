<!-- @format -->

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TaskInterface, tasksList } from './data/tasks'
import Task from './components/Task.vue'
import Filter from './components/Filter.vue'
import Modal from './components/modal/Modal.vue'
import AddTaskModal from './components/modal/AddTaskModal.vue'
import { computed } from 'vue'
import { useTasksStore } from './stores/tasks.store'

const store = useTasksStore()

let modalIsOpen = ref<boolean>(false)

const toggleModal = () => {
  modalIsOpen.value = !modalIsOpen.value
}
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="header-side">
        <h1>My first vue Task manager</h1>
      </div>
      <button class="btn secondary" @click="toggleModal">Add task</button>
    </div>
  </div>
  <main>
    <Filter />
    <div class="tasks">
      <Task v-for="(task, index) in store.filteredTasks" :key="index" :task="task" />
    </div>
    <Modal @toggleModal="toggleModal" v-if="modalIsOpen">
      <AddTaskModal @addTask="store.addTask"
    /></Modal>
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
</style>
