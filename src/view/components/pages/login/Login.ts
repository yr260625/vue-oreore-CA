import { Api } from "src/driver/axiosConfig";
import router from "src/view/router";
import { useCookies } from "vue3-cookies";

export const login = async (email: string, password: string) => {
  console.log(`login: ${email}/${password}`);
  const postBody = { email, password };
  const res = await Api.post("/token/", postBody);
  const token: string = res.data.token;

  // tokenをcookieに保持
  const { cookies } = useCookies();
  cookies.set("token", token);

  router.push({ path: "/tasks" });
};
