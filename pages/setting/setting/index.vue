<template>
  <section class="section">
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Setting</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Profil</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="section-body" v-if="isLoadingPage">
      <div class="row">
        <div class="col-12">
          <div
            class="card d-flex align-items-center justify-content-center"
            style="height: 300px"
          >
            <div class="text-center">
              <i class="fas fa-circle-notch fa-spin fa-2x"></i>
              <br />
              Loading
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full bg-white rounded-md p-2 px-4 border border-gray-300"
      v-if="!isLoadingPage"
    >
      <div class="row mt-sm-4" v-if="!isLoadingPage">
        <div class="mb-4 font-semibold text-lg">
          <h4>Edit Aplikasi</h4>
        </div>

        <div class="col-12 col-lg-8">
          <div class="">
            <ValidationObserver
              v-slot="{ invalid, validate }"
              ref="form-validate"
            >
              <form
                @submit.prevent="validate().then(onSubmit(invalid))"
                autocomplete="off"
              >
                <div class="grid grid-cols-2">
                  <ValidationProvider name="company_name" rules="required">
                    <div class="form-group col" slot-scope="{ errors, valid }">
                      <input-form
                        label="Nama Perusahaan"
                        type="text"
                        name="company_name"
                        v-model="form.company_name"
                        :inputClass="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      />
                      <div class="text-sm text-danger" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider name="email" rules="required|email">
                    <div class="form-group col" slot-scope="{ errors, valid }">
                      <input-form
                        label="Email"
                        type="text"
                        name="email"
                        v-model="form.email"
                        :inputClass="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      />
                      <div class="text-sm text-danger" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <div class="form-group col-span-2">
                    <label for="address">Alamat</label>
                    <textarea
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      v-model="form.address"
                    >
                    </textarea>
                  </div>
                  <ValidationProvider name="phone" rules="required">
                    <div
                      class="form-group col-12"
                      slot-scope="{ errors, valid }"
                    >
                      <input-form
                        label="Phone"
                        type="text"
                        name="phone"
                        v-model="form.phone"
                        :inputClass="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      />
                      <div class="text-sm text-danger" v-if="errors[0]">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <div class="form-group col-12">
                    <input-form
                      label="Website"
                      type="text"
                      name="website"
                      v-model="form.website"
                    />
                  </div>

                  <div class="form-group col-12">
                    <input-form
                      label="Nama Aplikasi"
                      type="text"
                      name="app_name"
                      v-model="form.app_name"
                    />
                  </div>
                  <div class="grid grid-cols-2 justify-between mt-2">
                    <div class="form-group col-12">
                      <label for="tax">PPN</label>
                      <money
                        v-model="form.tax"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                      <div class="text-muted text-small">* Percent</div>
                    </div>

                    <div class="form-group col-12">
                      <label for="is_min_stock"> Stok Bisa Minus </label>
                      <select
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        v-model="form.is_min_stock"
                      >
                        <option value="1">Ya</option>
                        <option value="0">Tidak</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="card-footer text-right">
                  <button class="btn btn-primary" :disabled="isLoadingForm">
                    <span v-if="isLoadingForm">
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </span>
                    <span v-else> Kirim </span>
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from "vuex";

import { VueEditor } from "vue2-editor";
import InputForm from "../../../components/InputForm/InputForm.vue";

export default {
  middleware: ["checkRoleSuperAdmin"],

  components: {
    VueEditor,
    InputForm,
  },

  head() {
    return {
      title: "Aplikasi",
    };
  },

  data() {
    return {
      title: "Profil Aplikasi",
      form: {
        company_name: "",
        address: "",
        email: "",
        phone: "",
        website: "",
        tax: "",
        app_name: "",
        is_min_stock: 0,
      },

      isLoadingForm: false,
      isLoadingFormLogo: false,
      isLoadingFormSignature: false,
      isLoadingFormLogoPrint: false,
      isLoadingPage: true,

      logo: "",
      logo_print: "",
      signature: "",

      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    };
  },

  created() {
    this.$axios
      .get("/setting")
      .then((res) => {
        res.data.forEach((item) => {
          this.form[item.nama] = item.value;
        });

        this.isLoadingPage = false;
      })
      .catch((err) => {
        console.log(err);
        this.$globalErrorToaster(this.$toaster, err);
      });
  },

  methods: {
    ...mapMutations("setting", ["SET_SETTINGS", "SET_APP_PROFILE"]),

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      this.$axios
        .put("/setting", this.form)
        .then(() => {
          return this.$axios.get("/setting");
        })
        .then((res) => {
          this.SET_SETTINGS(res.data);
          this.SET_APP_PROFILE(res.data);
          this.$toaster.success("Berhasil update data");
        })
        .catch((err) => {
          console.log(err);
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
        });
    },

    // onSubmitLogo() {
    //   if (this.isLoadingFormLogo) return;

    //   this.isLoadingFormLogo = true;

    //   let formData = new FormData(document.getElementById("form-logo"));
    //   formData.append("_method", "PUT");

    //   this.$axios
    //     .post("/setting/logo", formData)
    //     .then(() => {
    //       this.logo = "";
    //       document.getElementById("form-logo").reset();
    //       this.$toaster.success("Berhasil upload logo");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.$globalErrorToaster(this.$toaster, err);
    //     })
    //     .finally(() => {
    //       this.isLoadingFormLogo = false;
    //     });
    // },

    // onSubmitSignature() {
    //   if (this.isLoadingFormSignature) return;

    //   this.isLoadingFormSignature = true;

    //   let formData = new FormData(document.getElementById("form-signature"));
    //   formData.append("_method", "PUT");

    //   this.$axios
    //     .post("/setting/signature", formData)
    //     .then(() => {
    //       this.signature = "";
    //       document.getElementById("form-signature").reset();
    //       this.$toaster.success("Berhasil upload tanda tangan");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.$globalErrorToaster(this.$toaster, err);
    //     })
    //     .finally(() => {
    //       this.isLoadingFormSignature = false;
    //     });
    // },

    // onSubmitLogoPrint() {
    //   if (this.isLoadingFormLogoPrint) return;

    //   this.isLoadingFormLogoPrint = true;

    //   let formData = new FormData(document.getElementById("form-logo-print"));
    //   formData.append("_method", "PUT");

    //   this.$axios
    //     .post("/setting/logo-print", formData)
    //     .then(() => {
    //       this.logo_print = "";
    //       document.getElementById("form-logo-print").reset();
    //       this.$toaster.success("Berhasil upload logo print");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.$globalErrorToaster(this.$toaster, err);
    //     })
    //     .finally(() => {
    //       this.isLoadingFormLogoPrint = false;
    //     });
    // },

    // onLogoChange(evt) {
    //   if (this.isLoadingFormLogo || !evt.target.files[0]) return;

    //   if (
    //     !["image/jpeg", "image/jpg", "image/png"].includes(
    //       evt.target.files[0].type
    //     )
    //   ) {
    //     this.$toaster.error("Gambar tidak valid");
    //     evt.target.value = "";
    //     return;
    //   }

    //   this.logo = evt.target.files[0].name;
    //   this.form.logo = URL.createObjectURL(evt.target.files[0]);
    // },

    // onSignatureChange(evt) {
    //   if (this.isLoadingFormSignature || !evt.target.files[0]) return;

    //   if (
    //     !["images/jpeg", "image/jpg", "image/png"].includes(
    //       evt.target.files[0].type
    //     )
    //   ) {
    //     this.$toaster.error("Gambar tidak valid");
    //     evt.target.value = "";
    //     return;
    //   }

    //   this.signature = evt.target.files[0].name;
    //   this.form.signature = URL.createObjectURL(evt.target.files[0]);
    // },

    // onLogoPrintChange(evt) {
    //   if (this.isLoadingFormLogoPrint || !evt.target.files[0]) return;

    //   if (
    //     !["images/jpeg", "image/jpg", "image/png"].includes(
    //       evt.target.files[0].type
    //     )
    //   ) {
    //     this.$toaster.error("Gambar tidak valid");
    //     evt.target.value = "";
    //     return;
    //   }

    //   this.logo_print = evt.target.files[0].name;
    //   this.form.logo_print = URL.createObjectURL(evt.target.files[0]);
    // },
  },
};
</script>
