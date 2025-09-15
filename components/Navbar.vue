<template>
  <header
    class="z-40"
    :class="{
      dark: $store.state.semidark && $store.state.menu === 'horizontal',
    }"
  >
    <div class="shadow-sm">
      <div
        class="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-[#0e1726]"
      >
        <div
          class="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 mx-2"
          :class="showSidebar ? '' : 'hidden'"
        >
          <NuxtLink to="/" class="main-logo flex shrink-0 items-center">
            <img
              class="inline w-8 ltr:-ml-1 rtl:-mr-1"
              src="/assets/images/logo.svg"
              alt=""
            />
            <span
              class="hidden align-middle text-2xl font-semibold transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline"
            >
              {{ settingItem("app_name") }}
            </span>
          </NuxtLink>

          <a
            class="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary"
            data-toggle="sidebar"
            id="toggle-sidebar"
            @click="toggleSidebar()"
          >
            <IconMenu class="h-5 w-5" />
          </a>
        </div>
        <div
          class="flex items-center justify-between space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2"
        >
          <div class="sm:ltr:mr-auto sm:rtl:ml-auto">
            <!-- <form
              class="absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0"
              :class="{ '!block': search }"
              @submit.prevent="search = false"
            >
              <div class="relative">
                <input
                  type="text"
                  class="peer form-input bg-gray-100 placeholder:tracking-widest ps-10 ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4"
                  placeholder="Search..."
                />
                <button
                  type="button"
                  class="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto"
                >
                  <icon-search class="mx-auto" />
                </button>
                <button
                  type="button"
                  class="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 ltr:right-2 rtl:left-2 sm:hidden"
                  @click="search = false"
                >
                  <icon-x-circle />
                </button>
              </div>
            </form> -->

            <button
              type="button"
              class="search_btn rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden"
              @click="search = !search"
            >
              <icon-search class="mx-auto h-4.5 w-4.5 dark:text-[#d0d2d6]" />
            </button>
          </div>
          <div class="flex gap-2">
            <div>
              <a
                href="javascript:;"
                v-show="$store.state.app.theme === 'light'"
                @click="$store.dispatch('app/toggleTheme', 'dark')"
                class="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
              >
                <IconSun />
              </a>
              <a
                href="javascript:;"
                v-show="$store.state.app.theme === 'dark'"
                @click="$store.dispatch('app/toggleTheme', 'system')"
                class="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
              >
                <IconMoon />
              </a>
              <a
                href="javascript:;"
                v-show="$store.state.app.theme === 'system'"
                @click="$store.dispatch('app/toggleTheme', 'light')"
                class="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
              >
                <IconLaptop />
              </a>
            </div>
            <div>
              <button
                type="button"
                class="relative block rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
              >
                <icon-bell-bing />

                <span
                  class="absolute top-0 flex h-3 w-3 ltr:right-0 rtl:left-0"
                >
                  <span
                    class="absolute -top-[3px] inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-75 ltr:-left-[3px] rtl:-right-[3px]"
                  ></span>
                  <span
                    class="relative inline-flex h-[6px] w-[6px] rounded-full bg-success"
                  ></span>
                </span>
              </button>
            </div>
            <div>
              <button type="button" class="group relative block" @click="toggleProfilePopUp()">
                <img
                  class="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                  src="/img/avatar/avatar-1.png"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- <nav class="navbar navbar-expand-lg main-navbar">
        <form class="form-inline mr-auto">
          <ul class="navbar-nav mr-3">
            <li>
              <a
                href="#"
                data-toggle="sidebar"
                id="toggle-sidebar"
                class="nav-link nav-link-lg"
                ><i class="fas fa-bars"></i
              ></a>
            </li> -->
      <!-- <li><a href="#" data-toggle="search" class="nav-link nav-link-lg d-sm-none"><i class="fas fa-search"></i></a></li> -->
      <!-- </ul> -->
      <!-- <app-search-form></app-search-form>  -->
      <!-- </form> -->

      <!-- <ul class="navbar-nav navbar-right"> -->
      <!-- messages -->
      <!-- <app-messages></app-messages> -->
      <!-- notifications -->
      <!-- <app-notifications></app-notifications> -->
      <!-- user options -->
      <app-user-options :visible="isProfileVisible"></app-user-options>
      <!-- </ul> -->
      <!-- </nav> -->
    </div>
  </header>
</template>
<script>
import SearchForm from "@/components/anavbar/SearchForm.vue";
import Messages from "@/components/anavbar/Messages.vue";
import Notifications from "@/components/anavbar/Notifications.vue";
import UserOptions from "@/components/anavbar/UserOptions.vue";

export default {
  components: {
    "app-search-form": SearchForm,
    "app-messages": Messages,
    "app-notifications": Notifications,
    "app-user-options": UserOptions,
  },
  data(){
    return{
      isProfileVisible: false
    }
  },
  computed: {
    showSidebar() {
      return this.$store.state.app.sidebar;
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

    toggleProfilePopUp(){
      this.isProfileVisible = !this.isProfileVisible;
    },
  },
  mounted() {
    localStorage.setItem("theme", "light");
  },
};
</script>
