<template>
  <div id="app">
    <div class="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
              class="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:aspect-square before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:opacity-10 md:py-20"
        ></div>

          <div class="relative" 
            v-if="error.statusCode == 404">
            <!-- <img
             src="/img/404.svg" 
             style="width: 400px; object-fit: cover" 
            /> -->

            <img
                    src="/img/404-light.svg"
                    alt="404"
                    class="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl"
                />
                <p class="mt-5 text-base text-center dark:text-white">
  The page you requested was not found!
</p>
                <NuxtLink to="/" class="btn btn-gradient mx-auto !mt-7 w-max border-0 uppercase shadow-none">Home</NuxtLink>
          </div>

          <div class="relative" 
            v-else-if="error.statusCode == 500">
            <img 
              src="/img/500-light.svg" 
              style="width: 400px; object-fit: cover" 
              />

              <!-- <img
                    :src="store.theme === 'dark' || store.isDarkMode ? '/assets/images/error/404-dark.svg' : '/assets/images/error/404-light.svg'"
                    alt="404"
                    class="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl"
                /> -->

            <div class="page-description text-danger mt-3" v-if="isDebug">
              {{ error.message }}
            </div>

            <p class="mt-5 text-base text-center dark:text-white"  v-else>
              Terjadi Kesalahan
            </p>

            <!-- <div class="page-description mt-3 text-danger" v-else>Terjadi Kesalahan</div> -->
                <NuxtLink to="#" class="btn btn-gradient mx-auto !mt-7 w-max border-0 uppercase shadow-none" @click="onReload">Reload Halama</NuxtLink>

            <!-- <div class="page-search">
              <a href="#" @click="onReload">Reload Halaman</a>
            </div> -->
          </div>

          <div class="relative" v-else>
            <img
              src="/img/something-wrong.svg"
              style="width: 400px; object-fit: cover"
            />
            
            <div class="page-description">Something Wrong</div>
          </div>
        </div>
        <!-- <div class="simple-footer mt-5">Copyright &copy; Stisla 2018</div> -->
      </div>
    <!-- </section>
  </div> -->
</template>

<script>
export default {
  props: ["error"],

  layout: "empty",

  head() {
    return {
      title: this.error.statusCode,
    };
  },

  created() {
    let myScript = ["/js/stisla.js", "/js/scripts.js"];

    myScript.forEach((item, index) => {
      let script = document.createElement("script");
      script.setAttribute("src", item);
      document.body.appendChild(script);
    });

    // window.$(".modal.in").modal("hide");
    // window.$(".modal-backdrop").hide();
    // window.$("body").removeClass("modal-open");

    if (this.isDebug) {
      this.$toaster.error(this.error.message);
      console.log(this.error.message);
    }
  },

  computed : {
    isDebug(){
      return parseInt(process.env.DEBUG);
    }
  },

  methods: {    
    onReload() {
      window.location.reload();
    },
  },
};
</script>
