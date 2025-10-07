import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_585d33f4 from 'nuxt_plugin_plugin_585d33f4' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_cookieuniversalnuxt_1e06f082 from 'nuxt_plugin_cookieuniversalnuxt_1e06f082' // Source: .\\cookie-universal-nuxt.js (mode: 'all')
import nuxt_plugin_axios_376bf617 from 'nuxt_plugin_axios_376bf617' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_portalvue_f53fa6c8 from 'nuxt_plugin_portalvue_f53fa6c8' // Source: .\\portal-vue.js (mode: 'all')
import nuxt_plugin_workbox_e3d17d1a from 'nuxt_plugin_workbox_e3d17d1a' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_0eef12f3 from 'nuxt_plugin_metaplugin_0eef12f3' // Source: .\\pwa\\meta.plugin.js (mode: 'all')
import nuxt_plugin_veevalidate_6e5ad03a from 'nuxt_plugin_veevalidate_6e5ad03a' // Source: ..\\plugins\\vee-validate (mode: 'all')
import nuxt_plugin_toaster_bbce2e44 from 'nuxt_plugin_toaster_bbce2e44' // Source: ..\\plugins\\toaster (mode: 'all')
import nuxt_plugin_vueselect_0c6a19ce from 'nuxt_plugin_vueselect_0c6a19ce' // Source: ..\\plugins\\vue-select (mode: 'all')
import nuxt_plugin_vuemultiselect_f0c5f110 from 'nuxt_plugin_vuemultiselect_f0c5f110' // Source: ..\\plugins\\vue-multiselect (mode: 'all')
import nuxt_plugin_globalcomponents_91a8526c from 'nuxt_plugin_globalcomponents_91a8526c' // Source: ..\\plugins\\global-components (mode: 'all')
import nuxt_plugin_vueinfiniteloading_ba354f40 from 'nuxt_plugin_vueinfiniteloading_ba354f40' // Source: ..\\plugins\\vue-infinite-loading (mode: 'all')
import nuxt_plugin_vuestickyelement_1fbf8c35 from 'nuxt_plugin_vuestickyelement_1fbf8c35' // Source: ..\\plugins\\vue-sticky-element (mode: 'all')
import nuxt_plugin_vmoney_c8268f1a from 'nuxt_plugin_vmoney_c8268f1a' // Source: ..\\plugins\\v-money (mode: 'all')
import nuxt_plugin_vueconfirmdialog_befa8bdc from 'nuxt_plugin_vueconfirmdialog_befa8bdc' // Source: ..\\plugins\\vue-confirm-dialog (mode: 'all')
import nuxt_plugin_vueloadingoverlay_7e0edf42 from 'nuxt_plugin_vueloadingoverlay_7e0edf42' // Source: ..\\plugins\\vue-loading-overlay (mode: 'all')
import nuxt_plugin_nuxtclientinit_181bd504 from 'nuxt_plugin_nuxtclientinit_181bd504' // Source: ..\\plugins\\nuxt-client-init (mode: 'all')
import nuxt_plugin_globalfilters_775d0cc7 from 'nuxt_plugin_globalfilters_775d0cc7' // Source: ..\\plugins\\global-filters (mode: 'all')
import nuxt_plugin_vueerrorhandler_c709c870 from 'nuxt_plugin_vueerrorhandler_c709c870' // Source: ..\\plugins\\vue-error-handler (mode: 'all')
import nuxt_plugin_vueconfig_41e97d42 from 'nuxt_plugin_vueconfig_41e97d42' // Source: ..\\plugins\\vue-config (mode: 'all')
import nuxt_plugin_apexcharts_475acaea from 'nuxt_plugin_apexcharts_475acaea' // Source: ..\\plugins\\apexcharts.js (mode: 'client')
import nuxt_plugin_plugin_65fab886 from 'nuxt_plugin_plugin_65fab886' // Source: .\\auth\\plugin.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root ? this.$root.$options.$nuxt : null
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const store = createStore(ssrContext)
  const router = await createRouter(ssrContext, config, { store })

  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"WMS","htmlAttrs":{"lang":"en"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""},{"name":"format-detection","content":"telephone=no"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"http:\u002F\u002F127.0.0.1:8000\u002Fimages\u002Flogos\u002Fdefault.jpeg"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fanimate.css\u002F3.5.2\u002Fanimate.min.css"},{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.png"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Nunito:wght@400;500;600;700;800&display=swap"}],"script":[{"src":"\u002Fjs\u002Fvendor\u002Fjquery\u002Fjquery-3.3.1.min.js"},{"src":"\u002Fjs\u002Fvendor\u002Fpopper\u002Fpopper.min.js"},{"src":"\u002Fjs\u002Fvendor\u002Fjquery-nicescroll\u002Fjquery.nicescroll.min.js"},{"src":"\u002Fjs\u002Fvendor\u002Fmoments\u002Fmoment.min.js"},{"src":"\u002Fjs\u002Fvendor\u002Fmoments\u002Fmoment-with-locales.min.js"},{"src":"\u002Fjs\u002Ftimeline.min.js"}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    beforeSerializeFns: ssrContext ? ssrContext.beforeSerializeFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_585d33f4 === 'function') {
    await nuxt_plugin_plugin_585d33f4(app.context, inject)
  }

  if (typeof nuxt_plugin_cookieuniversalnuxt_1e06f082 === 'function') {
    await nuxt_plugin_cookieuniversalnuxt_1e06f082(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_376bf617 === 'function') {
    await nuxt_plugin_axios_376bf617(app.context, inject)
  }

  if (typeof nuxt_plugin_portalvue_f53fa6c8 === 'function') {
    await nuxt_plugin_portalvue_f53fa6c8(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_e3d17d1a === 'function') {
    await nuxt_plugin_workbox_e3d17d1a(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_0eef12f3 === 'function') {
    await nuxt_plugin_metaplugin_0eef12f3(app.context, inject)
  }

  if (typeof nuxt_plugin_veevalidate_6e5ad03a === 'function') {
    await nuxt_plugin_veevalidate_6e5ad03a(app.context, inject)
  }

  if (typeof nuxt_plugin_toaster_bbce2e44 === 'function') {
    await nuxt_plugin_toaster_bbce2e44(app.context, inject)
  }

  if (typeof nuxt_plugin_vueselect_0c6a19ce === 'function') {
    await nuxt_plugin_vueselect_0c6a19ce(app.context, inject)
  }

  if (typeof nuxt_plugin_vuemultiselect_f0c5f110 === 'function') {
    await nuxt_plugin_vuemultiselect_f0c5f110(app.context, inject)
  }

  if (typeof nuxt_plugin_globalcomponents_91a8526c === 'function') {
    await nuxt_plugin_globalcomponents_91a8526c(app.context, inject)
  }

  if (typeof nuxt_plugin_vueinfiniteloading_ba354f40 === 'function') {
    await nuxt_plugin_vueinfiniteloading_ba354f40(app.context, inject)
  }

  if (typeof nuxt_plugin_vuestickyelement_1fbf8c35 === 'function') {
    await nuxt_plugin_vuestickyelement_1fbf8c35(app.context, inject)
  }

  if (typeof nuxt_plugin_vmoney_c8268f1a === 'function') {
    await nuxt_plugin_vmoney_c8268f1a(app.context, inject)
  }

  if (typeof nuxt_plugin_vueconfirmdialog_befa8bdc === 'function') {
    await nuxt_plugin_vueconfirmdialog_befa8bdc(app.context, inject)
  }

  if (typeof nuxt_plugin_vueloadingoverlay_7e0edf42 === 'function') {
    await nuxt_plugin_vueloadingoverlay_7e0edf42(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxtclientinit_181bd504 === 'function') {
    await nuxt_plugin_nuxtclientinit_181bd504(app.context, inject)
  }

  if (typeof nuxt_plugin_globalfilters_775d0cc7 === 'function') {
    await nuxt_plugin_globalfilters_775d0cc7(app.context, inject)
  }

  if (typeof nuxt_plugin_vueerrorhandler_c709c870 === 'function') {
    await nuxt_plugin_vueerrorhandler_c709c870(app.context, inject)
  }

  if (typeof nuxt_plugin_vueconfig_41e97d42 === 'function') {
    await nuxt_plugin_vueconfig_41e97d42(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_apexcharts_475acaea === 'function') {
    await nuxt_plugin_apexcharts_475acaea(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_65fab886 === 'function') {
    await nuxt_plugin_plugin_65fab886(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
