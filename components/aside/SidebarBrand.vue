<template>
  <div class="flex items-center justify-between px-4 py-3">
    <nuxt-link to="/home" class="main-logo flex shrink-0 items-center gap-2">
      <img
        class="ml-[5px] w-8 flex-none"
        :src="apiUrl + 'images/icon/' + settingItem('icon')"
        alt=""
      />
      <span
        class="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline"
        >{{ settingItem("app_name") }}</span
      >
    </nuxt-link>
    <a
      href="javascript:;"
      class="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 hover:text-primary rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
      @click="toggleSidebar()"
    >
      <IconCaretsDown class="m-auto rotate-90" />
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      apiUrl: process.env.PUBLIC_URL,
    };
  },
  computed: {
    logo_url() {
      return (process.env.LOGO_URL || "/img/") + "default.jpeg";
    },
  },
  methods: {
    settingItem(nama, fallback = "-") {
      let item = this.$store.state.setting.settings.find(
        (item) => item.nama == nama
      );

      return item ? item.value : fallback;
    },
    toggleSidebar() {
      this.$store.dispatch("app/toggleSidebar");
    },
  },
};
</script>
