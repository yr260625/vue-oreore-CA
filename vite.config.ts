import { ConfigEnv, defineConfig, loadEnv, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd());
  process.env = { ...process.env, ...env };

  // import.metaの代わりにprocess.envで環境変数を使用するための処理
  // 参考URL: https://github.com/vitejs/vite/issues/1149#issuecomment-857686209
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ["process.env." + key]: `"${val}"`,
      };
    },
    {}
  );

  return defineConfig({
    define: envWithProcessPrefix,
    resolve: {
      alias: [{ find: "src", replacement: "/src" }],
    },
    plugins: [vue()],
  });
};
