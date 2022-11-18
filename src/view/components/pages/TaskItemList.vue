<script setup lang="ts">
import { ref } from "vue";
import { XMarkIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
import { useTask } from "./useTask";
import draggable from "vuedraggable";

// init
const { taskViewState, controller } = useTask();
controller.initTaskView();

const shownIds = ref<Set<number>>(new Set());
const toggle = (targetId: number) => {
  if (shownIds.value.has(targetId)) {
    shownIds.value.delete(targetId);
  } else {
    shownIds.value.add(targetId);
  }
};
const titleStyle = (error: string | null) => {
  return error ? ["bg-red-200"] : ["bg-teal-100"];
};
</script>

<template>
  <draggable v-model="taskViewState.tasks" group="people" item-key="id">
    <template #item="{ element, index }">
      <article class="pb-2">
        <h2
          class="flex justify-between items-center"
          :class="titleStyle(element.error)"
        >
          <div @click="toggle(element.id)" class="flex-1 cursor-pointer p-2">
            {{ element.title }}
          </div>
          <p class="text-red-500 tracking-wide text-sm first-letter:">
            {{ element.error }}
          </p>
          <div
            @click="controller.deleteTask(element.id)"
            class="flex items-center justify-center w-12 cursor-pointer hover:opacity-70"
          ></div>
        </h2>
        <div v-show="shownIds.has(element.id)">
          <textarea
            v-model="taskViewState.tasks[index].detail"
            class="w-full border rounded-b focus:ring-2 h-32 text-base outline-none px-3"
            placeholder="input detail"
            >{{ element.detail }}</textarea
          >
          <div class="flex items-center gap-3">
            <button
              @click="
                controller.updateTask(
                  element.id,
                  element.category,
                  element.title,
                  element.detail
                )
              "
              class="flex items-center gap-2 px-2 bg-teal-400 border active:bg-teal-800 text-base text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
            >
              <ArrowPathIcon class="w-4 h-4"></ArrowPathIcon>
              Update
            </button>
            <button
              @click="controller.deleteTask(element.id)"
              class="flex items-center gap-2 px-2 bg-white border active:bg-gray-200 border-gray-400 text-base text-gray-400 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <XMarkIcon class="w-4 h-4"></XMarkIcon>
              Delete
            </button>
          </div>
        </div>
      </article>
    </template>
  </draggable>
</template>
