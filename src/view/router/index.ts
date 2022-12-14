import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/pages/login/Login.vue";
import Task from "../components/pages/tasks/Tasks.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/tasks",
      name: "tasks",
      component: Task,
    },
  ],
});

export default router;
