import { Auth } from "src/domain/auth/entities/Auth";
import { AuthApi } from "src/driver/auth/interfaces/AuthApi";
import router from "src/view/router";
import { useCookies } from "vue3-cookies";

export const auth = async (email: string, password: string) => {
  // usecase
  try {
    // 認証実行
    const api = new AuthApi();
    const token: string = await api.getToken(email, password);

    // tokenをcookieに保持
    const { cookies } = useCookies();
    cookies.set("token", token);

    // 遷移
    router.push({ path: "/tasks" });
  } catch (error) {
    window.alert(error);
  }
};
