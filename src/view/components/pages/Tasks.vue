<script setup lang="ts">
import Header from "@/view/components/globals/Header.vue";
import TaskPageHeader from "@/view/components/parts/task/TaskPageHeader.vue";
import TaskItemList from "@/view/components/parts/task/TaskItemList.vue";
import { taskState, taskStateKey } from "@/view/hooks/task/useTask";
import { provide } from "vue";

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

<style></style>
