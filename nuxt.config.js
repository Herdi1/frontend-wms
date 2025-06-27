const webpack = require("webpack");
const fs = require("fs");

require("dotenv").config();

export default {
  devtools: { enable: true },
  // css: ["~/assets/css/vristo/app.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // ssg example
  // target: 'static', // default is 'server'
  // routes: ['/'],

  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "WMS",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "",
      },
      {
        name: "format-detection",
        content: "telephone=no",
      },
    ],
    link: [
      // {hid: 'icon',rel: 'icon',type: 'image/x-icon',href: '/favicon.ico' },
      {
        rel: "icon",
        type: "image/x-icon",
        href: (process.env.LOGO_URL || "/safari/img/") + "default.jpeg",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css",
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap",
      },
    ],
    script: [
      {
        src: "/js/vendor/jquery/jquery-3.3.1.min.js",
      },
      {
        src: "/js/vendor/popper/popper.min.js",
      },
      // {
      //   src: "/js/vendor/bootstrap/bootstrap.min.js",
      // },
      {
        src: "/js/vendor/jquery-nicescroll/jquery.nicescroll.min.js",
      },
      {
        src: "/js/vendor/moments/moment.min.js",
      },
      {
        src: "/js/vendor/moments/moment-with-locales.min.js",
      },
      {
        src: "/js/timeline.min.js",
      },
    ],
  },

  loading: {
    color: "green",
    height: "2px",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // "~/assets/css/bootstrap/css/bootstrap.min.css",
    "~/assets/css/vristo/app.css",
    "~/assets/css/fontawesome/css/all.min.css",
    // "~/assets/css/style.css",
    // "~/assets/css/components.css",
    // "~/assets/css/timeline.min.css",
    // "~/assets/css/invoice.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vee-validate",
    "~/plugins/toaster",
    "~/plugins/vue-select",
    "~/plugins/vue-multiselect",
    "~/plugins/global-components",
    "~/plugins/vue-infinite-loading",
    "~/plugins/vue-sticky-element",
    "~/plugins/v-money",
    "~/plugins/vue-confirm-dialog",
    "~/plugins/vue-loading-overlay",
    "~/plugins/nuxt-client-init",
    "~/plugins/global-filters",
    "~/plugins/vue-error-handler",
    // "~/plugins/init-theme",
    // '~/plugins/date-picker',
    // '~/plugins/pagination',
    // '~/plugins/vue-htmlpdf',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module'
    "@nuxtjs/tailwindcss",
    "@nuxt/postcss8",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/axios
    [
      "@nuxtjs/dotenv",
      {
        systemvars: false,
      },
    ],
    "portal-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    [
      "cookie-universal-nuxt",
      {
        alias: "cookiz",
      },
    ],
  ],

  router: {
    html: {
      scrollBehavior(to, from, savedPosition) {
        return {
          x: 0,
          y: 0,
          behavior: "smooth",
        };
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {},

  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    },
  },

  pwa: {
    meta: {
      title: "Safari",
      author: "Dexza",
    },
    manifest: {
      name: "Safari",
      short_name: "",
      lang: "en",
    },
    icon: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  auth: {
    watchLoggedIn: true,
    redirect: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "login",
            method: "post",
            propertyName: "access_token",
          },
          logout: {
            url: "logout",
            method: "post",
          },
          user: {
            url: "me",
            method: "get",
            propertyName: false,
          },
        },
        tokenRequired: true,
        tokenType: "Bearer",
      },
    },
  },
};
