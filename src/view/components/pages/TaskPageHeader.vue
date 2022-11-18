<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";
import { useTask } from "./useTask";

// state
const { taskViewState, controller } = useTask();

const inputStyle = (error: string) => {
  if (error) {
    return [
      "bg-red-200",
      "border-red-500",
      "focus:border-red-500",
      "focus:ring-red-200",
      "placeholder-red-500",
    ];
  }
  return [
    "border-gray-300",
    "focus:border-indigo-500",
    "focus:ring-indigo-200",
  ];
};
</script>

<template>
  <div class="h-24 py-6">
    <div class="flex gap-2">
      <div class="w-full">
        <input
          v-model="taskViewState.taskTitle"
          class="w-full border focus:ring-2 leading-8 outline-none px-3 py-1 rounded text-base"
          type="text"
          placeholder="Input your Task"
        />
      </div>
      <select
        v-model="taskViewState.categoryId"
        class="border-2 border-gray-300 focus:ring-2 leading-8 outline-none px-3 py-1 rounded text-base"
      >
        <option
          v-for="category in taskViewState.categories"
          :value="category.id"
          :key="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <div
        @click="
          controller.addTask(taskViewState.categoryId, taskViewState.taskTitle)
        "
        class="flex align-center justify-center p-2 cursor-pointer bg-teal-400 border active:bg-teal-800 text-base text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
      >
        <PlusIcon class="w-6" />
      </div>
    </div>
    <p
      v-show="taskViewState.errorSummary"
      class="text-red-500 tracking-wide h-6 px-3 text-sm first-letter:"
    >
      {{ taskViewState.errorSummary }}
    </p>
  </div>
</template>
