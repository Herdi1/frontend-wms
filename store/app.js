import mutations from "./module-api/mutations";

export default {
  namespaced: true,
  state: () => ({
    isDarkMode: false,
    theme: "light",
    sidebar: false,
    menu: "vertical",
    layout: "full",
    navbar: "navbar-sticky",
    semidark: false,
  }),
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.sidebar = !state.sidebar;
    },
  },
  actions: {
    toggleTheme({ state }, payload) {
      payload = payload || state.theme;
      localStorage.setItem("theme", payload);
      state.theme = payload;
      if (payload == "light") {
        state.isDarkMode = false;
      } else if (payload == "dark") {
        state.isDarkMode = true;
      } else if (payload == "system") {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          state.isDarkMode = true;
        } else {
          state.isDarkMode = false;
        }
      }

      if (state.isDarkMode) {
        document.querySelector("body")?.classList.add("dark");
      } else {
        document.querySelector("body")?.classList.remove("dark");
      }
    },
    toggleSidebar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
    toggleMenu({ state }, payload) {
      payload = payload || state.menu;
      state.sidebar = false;
      localStorage.setItem("menu", payload);
      state.menu = payload;
    },
    toggleNavbar({ state }, payload) {
      payload = payload || state.navbar;
      localStorage.setItem("navbar", payload);
    },
    toggleSemidark({ state }, payload) {
      payload = payload || false;
      localStorage.setItem("semidark", payload);
      state.semidark = payload;
    },
    toggleLayout({ state }, payload) {
      payload = payload || state.layout;
      localStorage.setItem("layout", payload);
      state.layout = payload;
    },
  },
};
