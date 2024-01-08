<!-- @format -->

<script setup lang="ts"></script>

<template>
  <form class="form" action="">
    <div class="add-task">
      <h3>Add a new task</h3>
      <label for="task-name">Task name</label>
      <input id="task-name" type="text" name="title" placeholder="Enter a title..." /><br />

      <label for="task-description">Task description</label>
      <textarea
        id="task-description"
        name="description"
        rows="4"
        placeholder="Enter a description..."
      />

      <br />
      <button @click="$emit('addTask')" class="btn gray">Add Task</button>
    </div>
  </form>
</template>

<style></style>
