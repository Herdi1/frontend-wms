<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Kota
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Kota
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
          <div class="modal-body mt-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
              <ValidationProvider
                name="nama_kota"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Nama Kota"
                    type="text"
                    name="nama_kota"
                    :required="true"
                    v-model="parameters.form.nama_kota"
                    :inputClass="
                      errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                    "
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider
                name="kode_kota"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Kode Kota"
                    type="text"
                    name="kode_kota"
                    :required="true"
                    v-model="parameters.form.kode_kota"
                    :inputClass="
                      errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                    "
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider
                name="kode_alternatif"
                rules="required"
                ref="ruteProvider"
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
                name="latitude"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Latitude"
                    type="text"
                    name="latitude"
                    v-model="parameters.form.latitude"
                    :required="true"
                    :inputClass="
                      errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                    "
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider
                name="longitude"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Longitude"
                    type="text"
                    name="longitude"
                    v-model="parameters.form.longitude"
                    :required="true"
                    :inputClass="
                      errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                    "
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider name="id_provinsi" rules="required">
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
                  <label for="" class="w-4/12"
                    >Provinsi <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_provinsi"
                    :loading="isLoadingGetProvinsi"
                    :options="lookup_custom2.data"
                    :filterable="false"
                    @search="onGetProvinsi"
                    v-model="parameters.form.provinsi_id"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                    @input="onSelectProvinsi"
                  >
                    <template slot="option" slot-scope="option">
                      {{
                        option.nama_provinsi + ", " + option.negara.nama_negara
                      }}
                    </template>
                    <template slot="option-selected" slot-scope="option">
                      {{
                        option.nama_provinsi + ", " + option.negara.nama_negara
                      }}
                    </template>
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom2.data.length || search"
                    >
                      <span
                        v-if="lookup_custom2.current_page > 1"
                        @click="onGetProvinsi(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom2.last_page > lookup_custom2.current_page
                        "
                        @click="onGetProvinsi(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <div class="form-group">
                <input-form
                  label="Negara"
                  type="text"
                  name="negara_id"
                  :disabled="true"
                  v-model="parameters.form.negara_id.nama_negara"
                />
              </div>
            </div>
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

      isStopSearchProvinsi: false,
      isLoadingGetProvinsi: false,
      provinsi_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Kota",
      parameters: {
        url: "master/kota",
        form: {
          negara_id: "",
          provinsi_id: "",
          nama_kota: "",
          kode_kota: "",
          kode_alternatif: "",
          longitude: "",
          latitude: "",
        },
      },
    };
  },

  async mounted() {
    await this.onSearchProvinsi();
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/kota/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.negara_id = res.data.negara;
        this.parameters.form.provinsi_id = res.data.provinsi;
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
          id: this.parameters.form.kota_id ? this.parameters.form.kota_id : "",
          provinsi_id:
            typeof this.parameters.form.provinsi_id == "object"
              ? this.parameters.form.provinsi_id.provinsi_id
              : this.parameters.form.provinsi_id,
          negara_id:
            typeof this.parameters.form.negara_id == "object"
              ? this.parameters.form.negara_id.negara_id
              : this.parameters.form.negara_id,
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

        this.formReset();
        this.$refs.formValidate.reset();
        this.$refs.ruteProvider.reset();
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
      this.onSearchProvinsi();
    },

    async onSearchNegara() {
      if (!this.isLoadingGetNegara) {
        this.isLoadingGetNegara = true;

        try {
          const response = await this.lookUp({
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
        } catch (error) {
          this.isLoadingGetNegara = false;
        }
      }
    },

    onGetProvinsi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProvinsi);

      this.isStopSearchProvinsi = setTimeout(() => {
        this.provinsi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchProvinsi();
      }, 600);
    },

    async onSearchProvinsi() {
      if (!this.isLoadingGetProvinsi) {
        this.isLoadingGetProvinsi = true;

        await this.lookUp({
          url: "master/provinsi/get-provinsi",
          lookup: "custom2",
          query:
            "?search=" +
            this.provinsi_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProvinsi = false;
      }
    },

    changeStatus() {
      this.parameters.provinsi_id = "";
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        negara_id: {},
        provinsi_id: {},
        nama_kota: "",
        kode_kota: "",
        kode_alternatif: "",
        longitude: "",
        latitude: "",
      };
    },

    onSelectProvinsi(item) {
      if (item) {
        this.parameters.form.negara_id = item.negara;
      } else {
        this.parameters.form.negara_id = {};
      }
    },
  },
};
</script>
