<template>
  <div id="app" class="relative min-h-screen">
    <div class="absolute inset-0">
      <img
        src="/img/auth/bg-gradient.png"
        alt="image"
        class="h-full w-full object-fill"
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
              <p class="text-xl font-bold leading-normal text-white-dark">
                Verifikasi OTP
              </p>
              <p class="text-base font-bold leading-normal text-white-dark">
                Masukkan Kode yang telah dikirim ke email Anda
              </p>
            </div>
            <ValidationObserver v-slot="{ invalid, validate }">
              <form
                @submit.prevent="validate().then(onSubmit(invalid))"
                autocomplete="off"
                class="space-y-5 dark:text-white"
              >
                <ValidationProvider name="otp" rules="required">
                  <div class="form-group mb-3" slot-scope="{ errors, valid }">
                    <div>
                      <label for="otp" class="text-sm text-gray-700"
                        >Kode OTP
                      </label>
                      <div class="relative text-white-dark">
                        <input
                          id="otp"
                          type="text"
                          class="form-input ps-10 placeholder:text-white-dark w-full py-2 rounded-md border border-gray-200 text-md active:outline-blue-500"
                          name="otp"
                          v-model="form.otp"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
                          required
                        />
                        <span class="absolute start-4 top-1/2 -translate-y-1/2">
                          <IconLock :fill="false" />
                        </span>
                      </div>
                    </div>
                    <div class="invalid-feedback text-danger" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                    <!-- <div class="valid-feedback" v-if="valid">
                              Email Telah Tervalidasi
                            </div> -->
                  </div>
                </ValidationProvider>

                <div class="form-group mb-5">
                  <button
                    type="submit"
                    class="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                    :disabled="isLoadingForm"
                  >
                    <span v-if="isLoadingForm">
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </span>

                    <span v-else>Verifikasi</span>
                  </button>
                  <!-- <button
                    type="submit"
                    class="btn btn-success btn-md"

                  >
                  </button> -->
                </div>
                <div class="text-center mt-5 text-blue-500 text-sm">
                  <nuxt-link to="/login">Kembali</nuxt-link>
                </div>
              </form>
            </ValidationObserver>
          </div>
          <!-- </div> -->
          <!-- </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>

    <!-- <section class="section">
      <div class="container mt-5">
        <div class="row">
          <div
            class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4"
          >
            <div class="login-brand">
              <img
                :src="publicUrl + 'images/icon/' + settingItem('icon')"
                alt="logo"
                width="100"
                class="shadow-light rounded-circle"
              />
            </div>

            <div class="card card-primary">
              <div class="card-header">
                <h4>Forgot Password</h4>
              </div>

              <div class="card-body">
                <p class="text-muted">
                  We will send a link to reset your password
                </p>

                <ValidationObserver v-slot="{ invalid, validate }">
                  <form
                    @submit.prevent="validate().then(onSubmit(invalid))"
                    autocomplete="off"
                  >
                    <ValidationProvider name="email" rules="required|email">
                      <div class="form-group" slot-scope="{ errors, valid }">
                        <label for="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          class="form-control"
                          name="email"
                          v-model="form.email"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
                        />
                        <div class="invalid-feedback" v-if="errors[0]">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>

                    <div class="form-group">
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg btn-block"
                        :disabled="isLoadingForm"
                      >
                        <span v-if="isLoadingForm">
                          <i class="fas fa-circle-notch fa-spin"></i>
                        </span>
                        <span v-else> Forgot Password </span>
                      </button>
                    </div>

                    <div class="form-group">
                      <nuxt-link to="/login">Kembali</nuxt-link>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </div>
            <div class="simple-footer">Copyright &copy; Stisla 2018</div>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
export default {
  layout: "empty",

  middleware: "isNotLogin",

  head() {
    return {
      title: "Forgot Password",
    };
  },

  data() {
    return {
      publicUrl: process.env.PUBLIC_URL,
      isLoadingForm: false,
      form: {
        otp: null,
      },
    };
  },

  computed: {},

  methods: {
    settingItem(nama, fallback = "-") {
      let item = this.$store.state.setting.settings.find(
        (item) => item.nama == nama
      );

      return item ? item.value : fallback;
    },
    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      this.$axios
        .post("/reset-password/verifikasi-otp", this.form)
        .then((res) => {
          this.$toaster.success(res.message);
          localStorage.setItem("otp", this.form.otp);
          this.$router.push("/reset-password");
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
        });
    },
  },
};
</script>
