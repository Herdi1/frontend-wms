<template>
  <div
    id="app"
    class="main-section relative font-nunito text-sm font-normal antialiased"
    :class="[
      showSidebar ? 'horizontal' : '',
      $store.state.menu,
      $store.state.layout,
    ]"
  >
    <div class="relative">
      <div
        class="fixed inset-0 z-50 bg-[black]/60 lg:hidden"
        :class="{ hidden: !$store.state.sidebar }"
        @click="$store.dispatch('app/toggleSidebar')"
      ></div>

      <div
        class="main-container min-h-screen text-black dark:text-white-dark"
        :class="[$store.state.navbar]"
      >
        <app-sidebar></app-sidebar>
        <div class="main-content flex flex-col min-h-screen">
          <app-navbar></app-navbar>
          <div class="animation p-6">
            <!-- <app-section></app-section> -->
            <vue-perfect-scrollbar>
              <Nuxt />
            </vue-perfect-scrollbar>
          </div>
          <vue-confirm-dialog></vue-confirm-dialog>
        </div>
      </div>
    </div>

    <portal-target name="modal"></portal-target>
    <portal-target name="modal-filter"></portal-target>
    <portal-target name="modal-detail"></portal-target>
    <portal-target name="modal-childs"></portal-target>
    <portal-target name="modal-filter-school"></portal-target>
    <portal-target name="modal-coolligtbox"></portal-target>

    <button @click="topScroll" id="topBtn" title="Go to top">
      <i class="fas fa-caret-up"></i>
    </button>
  </div>
</template>

<script>
import AppSidebar from "@/components/Sidebar.vue";
import AppNavbar from "@/components/Navbar.vue";
import AppSection from "@/components/Section.vue";
import Profil from "../pages/profil.vue";

export default {
  middleware: ["isLogin"],

  components: {
    AppNavbar,
    AppSidebar,
    AppSection,
    Profil,
  },

  created() {
    let myScript = ["/js/stisla.js", "/js/scripts.js"];

    myScript.forEach((item, index) => {
      let script = document.createElement("script");
      script.setAttribute("src", item);
      document.body.appendChild(script);
    });
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll());
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
    if (!localStorage.getItem("navbar")) {
      localStorage.setItem("navbar", "navbar-sticky");
    }

    const theme = localStorage.getItem("theme");
    this.$store.dispatch("app/toggleTheme", theme);

    // Optional: auto update if system theme changes
    // window
    //   .matchMedia("(prefers-color-scheme: dark)")
    //   .addEventListener("change", (e) => {
    //     if (localStorage.getItem("theme") === "system") {
    //       this.$store.dispatch("app/toggleTheme", "system");
    //     }
    //   });
  },

  computed: {
    showSidebar() {
      return this.$store.state.app.sidebar;
    },
  },

  methods: {
    onScroll() {
      window.onscroll = () => {
        let btn = document.getElementById("topBtn");

        if (btn) {
          btn.style.display =
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
              ? "block"
              : "none";
        }
      };
    },
    topScroll() {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
body {
  font-size: 12px !important;
}

input.form-control {
  padding: 5px !important;
  padding-left: 5px !important;
  height: 30px !important;
  font-size: 12px !important;
}

select.form-control {
  padding: 5px !important;
  padding-left: 5px !important;
  height: 30px !important;
  font-size: 12px !important;
}

textarea.form-control {
  padding: 5px !important;
  padding-left: 5px !important;
  min-height: 35px !important;
  font-size: 12px !important;
}

select.form-control:focus,
textarea.form-control:focus,
input.form-control:focus {
  border-color: #2b7bf3 !important;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px #4b74fa !important;
  outline: 0 none;
}
.page-item {
  cursor: pointer;
}

.main-sidebar {
  -moz-box-shadow: -2px 0 10px 0 rgb(75, 73, 73);
  -webkit-box-shadow: -2px 0 10px 0 rgb(75, 73, 73);
  box-shadow: -2px 0 10px 0 rgb(75, 73, 73);
  max-width: 220px !important;
}

.card {
  -moz-box-shadow: 0 0 3px 0px rgb(75, 73, 73);
  -webkit-box-shadow: 0 0 3px 0px rgb(75, 73, 73);
  box-shadow: 0 0 3px 0px rgb(167, 164, 164);
}

/* BTN BOTTOM TO TOP STYLE */
#topBtn {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: #3abaf4 !important;
  color: white;
  cursor: pointer;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 4px;
  scroll-behavior: smooth;
}

/* LIGHT GRAY GLOBAL STYLE */
.light-gray {
  color: lightgray;
}

/* CURSOR POINTER GLOBAL STYLE */
.cursor-pointer {
  cursor: pointer;
}

.vs__actions {
  display: flex !important;
  align-items: center !important;
  margin-top: 4px !important;
  padding: 1px 6px 0 3px !important;
}

.vs__spinner,
.vs__spinner:after {
  border-radius: 50% !important;
  width: 20px !important;
  height: 20px !important;
  margin-top: 0px !important;
  padding: 1px 6px 0 3px !important;
}
.v-select {
  box-sizing: border-box;
  height: 30px !important;
}
.vs__selected-options {
  display: flex !important;
  flex-basis: 100% !important;
  flex-wrap: wrap !important;
  padding: 0 2px !important;
  position: relative !important;
  height: 25px !important;
}

.vs__selected {
  display: flex !important;
  /* align-items: center; */
  /* background-color: #f0f0f0 !important; */
  /* border: 1px solid rgba(60,60,60,.26) !important; */
  border-radius: 4px !important;
  color: #333 !important;
  line-height: 1.4 !important;
  margin: 4px 2px 0 !important;
  padding: 0 0.25em !important;
  z-index: 0 !important;
}

/* SCROLL BAR GLOBAL STYLE */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #3abaf4;
  border-radius: 10px;
}

.primary-color {
  background-color: #2b7bf3 !important;
}

.primary-text {
  color: #2b7bf3 !important;
}
.btn-outline-primary {
  border-color: #2b7bf3 !important;
  color: #2b7bf3 !important;
}

.btn-outline-primary:hover {
  background-color: #2b7bf3 !important;
  color: #ffff !important;
}

.btn-primary,
.btn-primary.disabled {
  background-color: #2b7bf3 !important;
  color: #ffff !important;
  border-color: #2b7bf3 !important;
}

.btn-info:not(:disabled):not(.disabled).active,
.btn-info:not(:disabled):not(.disabled):active,
.show > .btn-info.dropdown-toggle {
  color: #fff;
  background-color: #3abaf4;
  border-color: #3abaf4;
}
.text-danger,
.text-success,
.text-primary,
.text-success,
.text-warning {
  font-size: 14px !important;
}

.btn-block {
  width: 72px !important;
  height: 30px !important;
  margin-top: 0rem !important;
}
.btn-primary:focus,
.btn-primary.disabled:focus {
  background-color: #1128fa !important;
}
.btn-primary:focus:active,
.btn-primary.disabled:focus:active {
  background-color: #1128fa !important;
}
.btn-primary:active,
.btn-primary:hover,
.btn-primary.disabled:active,
.btn-primary.disabled:hover {
  background-color: #1128fa !important;
}

.text-primary {
  color: #2b7bf3 !important;
}

.border-success {
  border-color: #2b7bf3 !important;
}

.form-group {
  padding: 2px !important;
  margin: 1px !important;
}
tbody > tr > td > .btn-danger,
tbody > tr > td > .btn-success,
tbody > tr > td > .btn-primary,
tbody > tr > td > .btn-warning {
  line-height: 0px !important;
  padding-left: 0.8rem !important;
  padding-right: 0.8rem !important;
}

table > tbody > tr > td {
  height: 16px !important;
  font-size: 12px !important;
}

table > thead > tr > th {
  font-size: 12px !important;
}

.tr-product:hover {
  background: lightgray;
}

.table-transaction-header {
  background: linear-gradient(#2b7bf3, #2b7bf3);
  font-weight: bold !important;
  color: whitesmoke;
  border: 1px solid;
  border-color: #c7c3b7;
}
.table-transaction-row {
  border: 1px solid;
  border-color: #c7c3b7;
}

.vc-btn.left {
  border-radius: 0;
  color: rgb(212, 4, 4);
  border-right: 1px solid #e0e0e0;
  outline: none !important;
}
.vc-btn {
  border-radius: 0;
  border-right: 1px solid #e0e0e0;
  outline: none !important;
}
.vc-container {
  background: white;
  border-radius: 1rem;
  position: absolute;
  width: 286px;
  height: auto;
  top: 170px;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: rgba(0, 0, 0, 0.29) 0px 3px 8px 0px;
}
.table-hover tbody > tr:hover {
  background-color: hsl(116, 55%, 85%) !important;
  color: #fdfdff !important;
}

.table-active {
  background-color: hsl(116, 55%, 85%) !important;
  color: #fdfdff !important;
}
</style>
