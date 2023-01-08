import { Auth } from "src/domain/auth/entities/Auth";
import { AuthApi } from "src/driver/auth/interfaces/AuthApi";
import router from "src/view/router";
import { useCookies } from "vue3-cookies";

export const auth = async (email: string, password: string) => {
  if (import.meta.env.VITE_USE_STORAGE) {
    router.push({ path: "/tasks" });
    return;
  }

  try {
    // 認証情報ドメイン生成
    const auth = new Auth(email, password);

    // 認証実行
    const api = new AuthApi();
    const token: string = await api.getToken(auth.email, auth.password);

    // tokenをcookieに保持
    const { cookies } = useCookies();
    cookies.set("token", token);

    // 遷移
    router.push({ path: "/tasks" });
  } catch (error) {
    window.alert(error);
  }
};
