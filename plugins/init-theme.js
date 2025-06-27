export default ({ store }) => {
  // Only run on client
  if (process.client) {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "system");
    }

    const savedTheme = localStorage.getItem("theme");
    store.dispatch("app/toggleTheme", savedTheme);
  }
};
