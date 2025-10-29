// store/menu.js
export const state = () => ({
  activeMenuTitle: "",
});

export const mutations = {
  SET_ACTIVE_MENU(state, title) {
    state.activeMenuTitle = title;
  },
};
