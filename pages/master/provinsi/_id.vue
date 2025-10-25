<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm min-h-screen"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Provinsi
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Provinsi
        </h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div
            class="modal-body mt-4 grid grid-cols-1 md:grid-cols-2 w-full gap-2 gap-x-4"
          >
            <ValidationProvider
              ref="inputProvider"
              name="nama_provinsi"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Nama Provinsi"
                  type="text"
                  name="nama_provinsi"
                  :required="true"
                  v-model="parameters.form.nama_provinsi"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="singkatan"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Singkatan"
                  type="text"
                  name="singkatan"
                  :required="true"
                  v-model="parameters.form.singkatan"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="kode_provinsi"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Kode Provinsi"
                  type="text"
                  name="kode_provinsi"
                  :required="true"
                  v-model="parameters.form.kode_provinsi"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="kode_alternatif"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Kode Alternatif"
                  type="text"
                  name="kode_alternatif"
                  :required="true"
                  v-model="parameters.form.kode_alternatif"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="ibukota"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Ibukota Provinsi"
                  type="text"
                  name="ibukota"
                  :required="true"
                  v-model="parameters.form.ibukota"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="id_negara"
              rules="required"
            >
              <div class="form-group w-full items-center mb-5">
                <label for="" class="w-4/12"
                  >Negara<span class="text-danger">*</span></label
                >
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_negara"
                  :loading="isLoadingGetNegara"
                  :options="lookup_custom1.data"
                  :filterable="false"
                  @search="onGetNegara"
                  v-model="parameters.form.negara_id"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom1.data.length || search"
                  >
                    <span
                      v-if="lookup_custom1.current_page > 1"
                      @click="onGetNegara(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom1.last_page > lookup_custom1.current_page
                      "
                      @click="onGetNegara(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </ValidationProvider>
            <!-- <ValidationProvider
              ref="inputProvider"
              name="wilayah_id"
              rules="required"
            >
              <div class="form-group w-full items-center mb-5">
                <label for="" class="w-4/12"
                  >Region<span class="text-danger">*</span></label
                >
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_wilayah"
                  :loading="isLoadingGetWilayah"
                  :options="lookup_custom2.data"
                  :filterable="false"
                  @search="onGetWilayah"
                  v-model="parameters.form.wilayah_id"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom2.data.length || search"
                  >
                    <span
                      v-if="lookup_custom2.current_page > 1"
                      @click="onGetWilayah(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom2.last_page > lookup_custom2.current_page
                      "
                      @click="onGetWilayah(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </ValidationProvider> -->
          </div>
          <modal-footer-section
            class="mt-5"
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
          />
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      isStopSearchNegara: false,
      isLoadingGetNegara: false,
      negara_search: "",

      isStopSearchWilayah: false,
      isLoadingGetWilayah: false,
      wilayah_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Provinsi",
      parameters: {
        url: "master/provinsi",
        form: {
          negara_id: "",
          wilayah_id: "",
          kode_provinsi: "",
          kode_alternatif: "",
          nama_provinsi: "",
          singkatan: "",
          ibukota: "",
        },
      },
    };
  },

  async mounted() {
    await this.onSearchNegara();
    await this.onSearchWilayah();
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/provinsi/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.negara_id = res.data.negara ?? "";
        this.parameters.form.wilayah_id = res.data.wilayah ?? "";
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          id: this.parameters.form.provinsi_id
            ? this.parameters.form.provinsi_id
            : "",
          negara_id:
            typeof this.parameters.form.negara_id === "object"
              ? this.parameters.form.negara_id.negara_id
              : this.parameters.form.negara_id,
          // wilayah_id:
          //   typeof this.parameters.form.wilayah_id === "object"
          //     ? this.parameters.form.wilayah_id.wilayah_id
          //     : this.parameters.form.wilayah_id,
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        // this.self.onLoad(this.self.parameters.params.page);
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );

        this.isEditable = false;
        this.parameters.form = {
          negara_id: "",
          wilayah_id: "",
          kode_provinsi: "",
          kode_alternatif: "",
          nama_provinsi: "",
          singkatan: "",
          ibukota: "",
        };

        this.$refs.formValidate.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    onGetNegara(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchNegara);

      this.isStopSearchNegara = setTimeout(() => {
        this.negara_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchNegara();
      }, 600);
    },

    async onSearchNegara() {
      if (!this.isLoadingGetNegara) {
        this.isLoadingGetNegara = true;

        await this.lookUp({
          url: "master/negara/get-negara",
          lookup: "custom1",
          query:
            "?search=" +
            this.negara_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetNegara = false;
      }
    },

    onGetWilayah(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchWilayah);

      this.isStopSearchWilayah = setTimeout(() => {
        this.wilayah_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchWilayah();
      }, 600);
    },

    async onSearchWilayah() {
      if (!this.isLoadingGetWilayah) {
        this.isLoadingGetWilayah = true;

        await this.lookUp({
          url: "master/wilayah/get-wilayah",
          lookup: "custom2",
          query:
            "?search=" +
            this.wilayah_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetWilayah = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        negara_id: "",
        wilayah_id: "",
        kode_provinsi: "",
        kode_alternatif: "",
        nama_provinsi: "",
        singkatan: "",
        ibukota: "",
      };
    },
  },
};
</script>
