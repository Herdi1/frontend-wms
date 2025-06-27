<template>
  <section class="section">
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

    <div class="section-body" v-if="!isLoadingPage">
      <div class="row mt-sm-4" v-if="!isLoadingPage">
        <div class="mb-4 font-semibold text-lg">
          <h4>Edit Aplikasi</h4>
        </div>
        <!-- <div class="col-12 col-lg-4 mb-5">
          <div
            class="card text-center p-3 border bg-white shadow-md rounded-md mt-2"
          >
            <div class="mb-5">
              <h4>Edit Logo</h4>
            </div>

            <form @submit.prevent="onSubmitLogo()" id="form-logo">
              <div class="flex items-center gap-5">
                <img
                  :src="form.logo"
                  v-if="form.logo"
                  class="mb-2 w-[200px] h-[200px] object-contain"
                />
                <div class="flex flex-col gap-2">
                  <input
                    type="file"
                    name="logo"
                    class="border rounded"
                    @change="onLogoChange"
                    required
                  />
                  <button
                    class="flex gap-2 bg-blue-900 px-2 py-1 rounded text-white w-fit"
                    v-if="logo"
                    :disabled="isLoadingFormLogo"
                  >
                    <span v-if="isLoadingFormLogo">
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </span>
                    <span v-else> <i class="fas fa-upload"></i> Upload </span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div
            class="card text-center p-3 border bg-white shadow-md rounded-md mt-2"
          >
            <div class="mb-5">
              <h4>Edit Logo Print</h4>
            </div>

            <form @submit.prevent="onSubmitLogoPrint()" id="form-logo-print">
              <div class="flex items-center gap-5">
                <img
                  :src="form.logo_print"
                  v-if="form.logo_print"
                  class="mb-2 w-[200px] h-[200px] object-contain"
                />
                <div class="flex flex-col gap-2">
                  <input
                    type="file"
                    name="logo_print"
                    class="border rounded"
                    @change="onLogoPrintChange"
                    required
                  />

                  <button
                    class="flex gap-2 bg-blue-900 px-2 py-1 rounded text-white w-fit"
                    v-if="logo_print"
                    :disabled="isLoadingFormLogoPrint"
                  >
                    <span v-if="isLoadingFormLogoPrint">
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </span>
                    <span v-else> <i class="fas fa-upload"></i> Upload </span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div
            class="card text-center p-3 border bg-white shadow-md rounded-md mt-2"
          >
            <div class="mb-5">
              <h4>Edit Tanda Tangan</h4>
            </div>

            <form @submit.prevent="onSubmitSignature()" id="form-signature">
              <div class="flex items-center gap-5">
                <img
                  :src="form.signature"
                  v-if="form.signature"
                  class="mb-2 w-[200px] h-[200px] object-contain"
                />

                <div class="flex flex-col gap-2">
                  <input
                    type="file"
                    name="signature"
                    class="border rounded"
                    @change="onSignatureChange"
                    required
                  />

                  <button
                    class="flex gap-2 bg-blue-900 px-2 py-1 rounded text-white w-fit"
                    v-if="signature"
                    :disabled="isLoadingFormSignature"
                  >
                    <span v-if="isLoadingFormSignature">
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </span>
                    <span v-else> <i class="fas fa-upload"></i> Upload </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div> -->

        <div class="col-12 col-lg-8">
          <div class="card">
            <ValidationObserver
              v-slot="{ invalid, validate }"
              ref="form-validate"
            >
              <form
                @submit.prevent="validate().then(onSubmit(invalid))"
                autocomplete="off"
              >
                <!-- <input-form label="Coba" type="date" name="coba" /> -->
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
                      <!-- <label>Email</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="form.email"
                        name="email"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      /> -->
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
                      <!-- <label>Phone</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="form.phone"
                            name="phone"
                            :class="
                              errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                            "
                          /> -->
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
                    <!-- <label for="website">Website</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.website"
                    /> -->
                  </div>

                  <div class="form-group col-12">
                    <label for="tax">PPN</label>
                    <money
                      v-model="form.tax"
                      class="w-3/4 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                    <div class="text-muted text-small">* Percent</div>
                  </div>

                  <div class="form-group col-12">
                    <input-form
                      label="Tanda Tangan Pemilik"
                      type="text"
                      name="signature_owner"
                      v-model="form.signature_owner"
                    />
                    <!-- <label for="signature_owner">Tanda Tangan Pemilik</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.signature_owner"
                    /> -->
                  </div>

                  <!-- <div class="">
                    <label for="is_min_stock"> Stok Bisa Minus </label>
                    <select
                      class="w-3/4 pl-2 py-1 border rounded focus:outline-none"
                      v-model="form.is_min_stock"
                    >
                      <option value="1">Ya</option>
                      <option value="0">Tidak</option>
                    </select>
                  </div> -->

                  <!-- <div class="">
                    <input-form
                      label="Nama Bank"
                      type="text"
                      name="bank_name"
                      v-model="form.bank_name"
                    />
                    <label for="bank_name"> Nama Bank </label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.bank_name"
                    />
                  </div> -->

                  <!-- <div class="form-group col-12">
                    <input-form
                      label="Nama Akun Bank"
                      type="text"
                      name="bank_account"
                      v-model="form.bank_account"
                    />
                    <label for="bank_account"> Nama Akun Bank </label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.bank_account"
                    />
                  </div> -->

                  <!-- <div class="form-group col-12">
                    <input-form
                      label="No Rekening Bank"
                      type="text"
                      name="bank_no"
                      v-model="form.bank_no"
                    />
                    <label for="bank_no"> No Rekening Bank </label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.bank_no"
                    />
                  </div> -->

                  <!-- <div class="form-group col-12">
                    <input-form
                      label="Batas Item Transaksi"
                      type="number"
                      name="limit_item_transaction"
                      v-model="form.limit_item_transaction"
                    />
                    <label for="limit_item_transaction">
                      Batas Item Transaksi
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="form.limit_item_transaction"
                    />
                    <span class="text-danger text-sm">
                      *Batas item transaksi tidak bisa di turunkan
                    </span> -->
                  <!-- </div> -->

                  <!-- <div class="form-group col-12">
                    <input-form
                      label="Nama  Produk Group Material"
                      type="text"
                      name="product_group_material"
                      v-model="form.product_group_material"
                    />
                    <label for="product_group_material">
                      Nama produk group material
                    </label>
                    <input
                      class="form-control"
                      v-model="form.product_group_material"
                    />
                    </span>
                  </div> -->
                  <!-- <div class="col-span-2">
                    <div class="form-group col-12 w-1/6">
                      <input-form
                        label="Warna Header"
                        type="color"
                        name="header_color"
                        v-model="form.header_color"
                      />
                      <label for="header_color">Warna Header</label>
                    <input
                      type="color"
                      class="form-control"
                      v-model="form.header_color"
                    />
                    </div> -->

                  <!-- <div class="form-group col-12">
                      <label for="footer_print_quotation">
                        Info Print Bagian Bawah Penawaran
                      </label>
                      <vue-editor
                        class="bg-white"
                        v-model="form.footer_print_quotation"
                        :editorToolbar="customToolbar"
                      />
                    </div> -->
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
import InputForm from "../../components/InputForm/InputForm.vue";

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
      form: {
        company_name: "",
        address: "",
        email: "",
        phone: "",
        logo: "",
        logo_print: "",
        header_color: "",
        tax: 0.0,
        footer_print_quotation: "",
        website: "",
        signature: "",
        signature_owner: "",
        is_min_stock: false,
        bank_name: "",
        bank_account: "",
        bank_no: "",
        limit_item_transaction: 0,
        closing_stock_opname: 0,
        product_group_material: "",
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
          this.form[item.name] = item.value;
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

    onSubmitLogo() {
      if (this.isLoadingFormLogo) return;

      this.isLoadingFormLogo = true;

      let formData = new FormData(document.getElementById("form-logo"));
      formData.append("_method", "PUT");

      this.$axios
        .post("/setting/logo", formData)
        .then(() => {
          this.logo = "";
          document.getElementById("form-logo").reset();
          this.$toaster.success("Berhasil upload logo");
        })
        .catch((err) => {
          console.log(err);
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingFormLogo = false;
        });
    },

    onSubmitSignature() {
      if (this.isLoadingFormSignature) return;

      this.isLoadingFormSignature = true;

      let formData = new FormData(document.getElementById("form-signature"));
      formData.append("_method", "PUT");

      this.$axios
        .post("/setting/signature", formData)
        .then(() => {
          this.signature = "";
          document.getElementById("form-signature").reset();
          this.$toaster.success("Berhasil upload tanda tangan");
        })
        .catch((err) => {
          console.log(err);
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingFormSignature = false;
        });
    },

    onSubmitLogoPrint() {
      if (this.isLoadingFormLogoPrint) return;

      this.isLoadingFormLogoPrint = true;

      let formData = new FormData(document.getElementById("form-logo-print"));
      formData.append("_method", "PUT");

      this.$axios
        .post("/setting/logo-print", formData)
        .then(() => {
          this.logo_print = "";
          document.getElementById("form-logo-print").reset();
          this.$toaster.success("Berhasil upload logo print");
        })
        .catch((err) => {
          console.log(err);
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingFormLogoPrint = false;
        });
    },

    onLogoChange(evt) {
      if (this.isLoadingFormLogo || !evt.target.files[0]) return;

      if (
        !["image/jpeg", "image/jpg", "image/png"].includes(
          evt.target.files[0].type
        )
      ) {
        this.$toaster.error("Gambar tidak valid");
        evt.target.value = "";
        return;
      }

      this.logo = evt.target.files[0].name;
      this.form.logo = URL.createObjectURL(evt.target.files[0]);
    },

    onSignatureChange(evt) {
      if (this.isLoadingFormSignature || !evt.target.files[0]) return;

      if (
        !["images/jpeg", "image/jpg", "image/png"].includes(
          evt.target.files[0].type
        )
      ) {
        this.$toaster.error("Gambar tidak valid");
        evt.target.value = "";
        return;
      }

      this.signature = evt.target.files[0].name;
      this.form.signature = URL.createObjectURL(evt.target.files[0]);
    },

    onLogoPrintChange(evt) {
      if (this.isLoadingFormLogoPrint || !evt.target.files[0]) return;

      if (
        !["images/jpeg", "image/jpg", "image/png"].includes(
          evt.target.files[0].type
        )
      ) {
        this.$toaster.error("Gambar tidak valid");
        evt.target.value = "";
        return;
      }

      this.logo_print = evt.target.files[0].name;
      this.form.logo_print = URL.createObjectURL(evt.target.files[0]);
    },
  },
};
</script>
