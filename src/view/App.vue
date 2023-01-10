<script setup lang="ts">
import "./index.css";
console.log(process.env.VITE_MODE);
console.log(`VITE_SKIP_LOGIN: ${process.env.VITE_SKIP_LOGIN}`);
</script>

<template>
  <RouterView />
</template>
