<script setup lang="ts">
import { provide } from "vue";
import Header from "../globals/Header.vue";
import TaskItemList from "./TaskItemList.vue";
import TaskPageHeader from "./TaskPageHeader.vue";
import { taskStateKey, taskState } from "./useTask";

// initialize and provide
provide(taskStateKey, taskState());
</script>

<template>
  <Header></Header>
  <div class="container mx-auto">
    <TaskPageHeader></TaskPageHeader>
    <TaskItemList></TaskItemList>
  </div>
</template>
