<!-- @format -->

<script setup lang="ts">
import { useTasksStore } from '../stores/tasks.store'

const store = useTasksStore()
</script>

<template>
  <div class="filters">
    <div>
      <p>Filter by state</p>
      <div class="badges">
        <div
          @click="store.setFilter('todo')"
          :class="{ selected: store.filterByType == 'todo' }"
          class="badge"
        >
          To-Do
        </div>
        <div
          @click="store.setFilter('done')"
          :class="{ selected: store.filterByType === 'done' }"
          class="badge"
        >
          Done
        </div>
        <span @click="store.setFilter('')" v-if="store.filterByType" class="clear"> x clear </span>
      </div>
    </div>
  </div>
</template>
<style>
.filters {
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 14px 0;
    align-items: center;
  }

  .badge {
    padding: 8px 7px;
    background-color: gray;
    color: black;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    border-radius: 8px;

    &.selected {
      background-color: red;
      color: white;
    }
  }

  .clear {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
  }
}
</style>
