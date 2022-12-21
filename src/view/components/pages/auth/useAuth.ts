import { Auth } from "src/domain/auth/entities/Auth";
import { AuthApi } from "src/driver/auth/interfaces/AuthApi";
import router from "src/view/router";
import { useCookies } from "vue3-cookies";

export const auth = async (email: string, password: string) => {
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

// export const loginStore = () => {
//   // states
//   const loginViewModel = reactive(new LoginViewModel());

//   // controller
//   const controller = new AuthControllerFactory(
//     new LoginView(loginViewModel)
//   ).create();

//   return {
//     loginViewModel,
//     controller,
//   };
// };

// // component injection
// export type loginStoreType = ReturnType<typeof loginStore>;
// export const loginStateKey: InjectionKey<loginStoreType> = Symbol("authState");
// export const useAuth = () => {
//   const state = inject(loginStateKey);
//   if (!state) throw new Error("key is undefined");
//   return state;
// };
