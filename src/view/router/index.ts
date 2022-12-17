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

// If it is uncertified, redirect to login page
// router.beforeEach((to, from) => {
//   const isAuthenticated = false;
//   if (!isAuthenticated && to.name !== "login") {
//     return { name: "login" };
//   }
// });

export default router;
