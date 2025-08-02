<template>
  <div id="app" class="relative min-h-screen">
    <div class="absolute inset-0">
      <img
        src="/img/auth/bg-gradient.png"
        alt="image"
        class="h-full w-full object-cover"
      />
    </div>
    <div
      class="relative flex min-h-screen items-center justify-center bg-[url(/img/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
    >
      <img
        src="/img/auth/coming-soon-object1.png"
        alt="image"
        class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
      />
      <img
        src="/img/auth/coming-soon-object2.png"
        alt="image"
        class="absolute left-24 top-0 h-40 md:left-[30%]"
      />
      <img
        src="/img/auth/coming-soon-object3.png"
        alt="image"
        class="absolute right-0 top-0 h-[300px]"
      />
      <img
        src="/img/auth/polygon-object.svg"
        alt="image"
        class="absolute bottom-0 end-[28%]"
      />

      <div
        class="relative w-full max-w-[630px] max-h-[700px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]"
      >
        <div
          class="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[650px]"
        >
          <div class="mx-auto w-full max-w-[440px]">
            <!-- <div class="login-brand p-3 m-0">
              <img
                :src="logo_url"
                alt="logo"
                class="rounded-circle"
                style="width: 150px; height: 150px; object-fit: contain"
              />
            </div>

            <div class="card-header">
              <h4 class="text-success">Login</h4>
            </div> -->

            <!-- <div class="">
              <div class="mb-10"> -->
            <!-- <h1
              class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl"
            >
              Login
            </h1> -->
            <div class="mb-10 text-center">
              <div class="flex justify-center gap-3 items-center mb-2 w-full">
                <img
                  :src="publicUrl + 'images/icon/' + settingItem('icon')"
                  alt="logo"
                  class="w-14"
                />
                <p
                  class="text-3xl font-extrabold uppercase !leading-snug text-blue-700 md:text-4xl"
                >
                  {{ settingItem("app_name") }}
                </p>
              </div>
              <p class="text-base font-bold leading-normal text-white-dark">
                Enter your username and password to login
              </p>
            </div>
            <ValidationObserver v-slot="{ invalid, validate }">
              <form
                @submit.prevent="validate().then(onSubmit(invalid))"
                autocomplete="off"
                class="space-y-5 dark:text-white"
              >
                <ValidationProvider name="username" rules="required">
                  <div class="form-group mb-3" slot-scope="{ errors, valid }">
                    <div>
                      <label for="username" class="text-sm text-gray-700"
                        >Username
                      </label>
                      <div class="relative text-white-dark">
                        <input
                          id="username"
                          type="text"
                          class="form-input ps-10 placeholder:text-white-dark w-full py-2 rounded-md border border-gray-200 text-md active:outline-blue-500"
                          name="username"
                          v-model="form.username"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
                          required
                        />
                        <span class="absolute start-4 top-1/2 -translate-y-1/2">
                          <IconMail :fill="true" />
                        </span>
                      </div>
                    </div>
                    <div class="invalid-feedback" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                    <!-- <div class="valid-feedback" v-if="valid">
                              Email Telah Tervalidasi
                            </div> -->
                  </div>
                </ValidationProvider>

                <ValidationProvider name="password" rules="required|min:8">
                  <div class="form-group mb-3" slot-scope="{ errors, valid }">
                    <div class="">
                      <label for="password" class="text-sm text-gray-700"
                        >Password</label
                      >
                      <div class="relative text-white-dark">
                        <input
                          :type="showPassword ? 'text' : 'password'"
                          class="form-input ps-10 placeholder:text-white-dark w-full py-2 rounded-md border text-md active:outline-blue-500"
                          name="password"
                          v-model="form.password"
                          :class="
                            errors[0]
                              ? 'border-red-600'
                              : valid
                              ? 'border-gray-200'
                              : ''
                          "
                          required
                        />
                        <span class="absolute start-4 top-1/2 -translate-y-1/2">
                          <IconLockDots :fill="true" />
                        </span>
                        <span
                          class="absolute end-4 top-1/2 -translate-y-1/2 text-base"
                          @click="toggleShow"
                        >
                          <i
                            :class="
                              showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                            "
                          ></i>
                        </span>
                      </div>
                      <div class="float-right">
                        <!--
                                    <nuxt-link to="/forgot-password" class="text-small">
                                      Forgot Password?
                                    </nuxt-link>
                                  -->
                      </div>
                    </div>
                    <div class="text-red-600" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                    <!-- <div class="valid-feedback" v-if="valid">
                                Password Telah Tervalidasi
                              </div> -->
                  </div>
                </ValidationProvider>

                <div
                  class="flex items-baseline justify-between p-3 w-[200px] mx-auto bg-gray-100 border border-gray-200 rounded-md"
                >
                  <label class="text-base"
                    >Berapa {{ captcha.a }} + {{ captcha.b }}?</label
                  >
                  <input
                    v-model.number="captchaInput"
                    type="number"
                    placeholder="0"
                    class="w-[60px] p-2 rounded-md outline-none border border-gray-200 text-base"
                    required
                  />
                </div>

                <div v-if="errorCaptcha" class="text-red-600 mt-2">
                  {{ errorCaptcha }}
                </div>

                <div class="form-group">
                  <button
                    type="submit"
                    class="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                    :disabled="isLoadingForm"
                  >
                    <span v-if="isLoadingForm">
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </span>

                    <span v-else>Login</span>
                  </button>
                  <!-- <button
                    type="submit"
                    class="btn btn-success btn-md"

                  >
                  </button> -->
                </div>
              </form>
            </ValidationObserver>
          </div>
          <!-- </div> -->
          <!-- </div> -->
          <!-- </div> -->
          <div class="text-center mt-5 text-blue-500 text-sm">
            <nuxt-link to="/forgot-password">Lupa Password?</nuxt-link>
          </div>
          <div class="text-center dark:text-white mt-3">
            Copyright &copy; {{ settingItem("company_name") }} -
            {{ year }}.<br />
            Developed by <a href="http://dexza.com">Dexza</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  layout: "empty",

  middleware: "isNotLogin",

  head() {
    return {
      title: "Login",
    };
  },

  data() {
    return {
      showPassword: false,
      publicUrl: process.env.PUBLIC_URL,
      isLoadingForm: false,
      form: {
        username: null,
        password: null,
      },
      //captcha
      captcha: {
        a: 0,
        b: 0,
      },
      captchaInput: null,
      errorCaptcha: "",
    };
  },

  computed: {
    logo_url() {
      return (process.env.PUBLIC_URL || "/images/icon/") + "default.jpeg";
    },

    year() {
      return new Date().getFullYear();
    },
  },

  mounted() {
    this.generateCaptcha();
  },

  methods: {
    settingItem(nama, fallback = "-") {
      let item = this.$store.state.setting.settings.find(
        (item) => item.nama == nama
      );

      return item ? item.value : fallback;
    },
    //captcha
    generateCaptcha() {
      this.captcha.a = Math.floor(Math.random() * 10);
      this.captcha.b = Math.floor(Math.random() * 10);
      this.captchaInput = null;
      this.errorCaptcha = "";
    },

    ...mapMutations("setting", ["SET_SETTINGS"]),

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      //captcha
      const correct = this.captcha.a + this.captcha.b;
      if (this.captchaInput !== correct) {
        this.errorCaptcha = "Jawaban Captcha Salah! Coba lagi";
        this.generateCaptcha();
        console.log(this.errorCaptcha);
        this.isLoadingForm = false;
        return;
      }

      this.error = "";

      this.$auth
        .login({
          data: this.form,
        })
        .then(() => {
          return this.$axios.get("/get-setting");
        })
        .then((res) => {
          // this.SET_SETTINGS(res.data);
          console.log(this.$auth);
          this.$router.push("/home");
        })
        .catch((err) => {
          this.isLoadingForm = false;
          this.$globalErrorToaster(this.$toaster, err);
        });
    },

    toggleShow() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
