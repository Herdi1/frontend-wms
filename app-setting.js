import { $themeConfig } from "./theme.config";

export default {
  init() {
    let val = localStorage.getItem("theme");
    val = val || $themeConfig.theme;
    $store.dispatch("app/toggleTheme", val);
  },
};
