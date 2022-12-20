import { AuthApi } from "src/driver/auth/interfaces/AuthApi";
import { createRouter, createWebHistory } from "vue-router";
import { useCookies } from "vue3-cookies";
import Login from "../components/pages/auth/Login.vue";
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
      meta: { requiresAuth: true },
    },
  ],
});

// Navigation Guard
router.beforeEach(async (to, from) => {
  // get token from cookie
  const { cookies } = useCookies();
  const token = cookies.get("token");

  // Without token, redirect to login page
  if (!token) {
    // Avoid an infinite redirect
    console.log("Credentials have missed. Login again.");
    if (to.meta.requiresAuth && to.name !== "login") {
      return { name: "login" };
    }
    return;
  }

  // verify token
  try {
    const api = new AuthApi();
    await api.verify(token);
  } catch (error) {
    if (to.meta.requiresAuth && to.name !== "login") {
      console.log("Credentials have expired. Login again.");
      return { name: "login" };
    }
  }
});

export default router;
