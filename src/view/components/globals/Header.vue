<script setup lang="ts">
import { ref } from "vue";

const nowUrl = ref<string>("/");

const links = [
  { title: "Task", url: "/" },
  { title: "test1", url: "/test1" },
  { title: "test2", url: "/test2" },
  { title: "test3", url: "/test3" },
  { title: "test4", url: "/test4" },
  { title: "test5", url: "/test5" },
  { title: "test6", url: "/test6" },
  { title: "test7", url: "/test7" },
];

const linkStyle = (url: string) => {
  if (url === nowUrl.value) {
    return ["text-white", "bg-gray-900"];
  }
  return "text-gray-400";
};
</script>

<template>
  <header class="flex justify-left items-center gap-12 w-full px-4 py-2 bg-gray-800">
    <div><img src="../../../assets/vue.svg" /></div>
    <nav class="flex-1 overflow-auto">
      <ul class="py-2 flex gap-4">
        <li v-for="link in links" class="rounded-md hover:bg-gray-700" :class="linkStyle(link.url)">
          <a :href="link.url" class="inline-block p-2">{{ link.title }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
