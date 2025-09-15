<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Kecamatan
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Kecamatan
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
                ref="inputProvider"
                name="nama_kecamatan"
                rules="required"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Nama Kecamatan"
                    type="text"
                    name="nama_kecamatan"
                    :required="true"
                    v-model="parameters.form.nama_kecamatan"
                    :inputClass="
                      errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                    "
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider
                ref="inputProvider"
                name="kode_kecamatan"
                rules="required"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Kode Kecamatan"
                    type="text"
                    name="kode_kecamatan"
                    :required="true"
                    v-model="parameters.form.kode_kecamatan"
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
                name="longitude"
                rules="required"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Longitude"
                    type="text"
                    name="longitude"
                    :required="true"
                    v-model="parameters.form.longitude"
                    :inputClass="
                      errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                    "
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider
                ref="inputProvider"
                name="latitude"
                rules="required"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Latitude"
                    type="text"
                    name="latitude"
                    :required="true"
                    v-model="parameters.form.latitude"
                    :inputClass="
                      errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                    "
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider
                ref="inputProvider"
                name="kota_id"
                rules="required"
              >
                <div slot-scope="{ errors, valid }">
                  <div class="form-group w-full items-center mb-5">
                    <label for="" class="w-4/12"
                      >Kota <span class="text-danger">*</span></label
                    >
                    <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_kota"
                      :loading="isLoadingGetKota"
                      :options="lookup_custom1.data"
                      :filterable="false"
                      @search="onGetKota"
                      @input="onSelectKota"
                      v-model="parameters.form.kota_id"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    >
                      <template slot="option" slot-scope="option">
                        {{
                          option.nama_kota +
                          ", " +
                          option.provinsi.nama_provinsi +
                          ", " +
                          option.negara.nama_negara
                        }}
                      </template>
                      <template slot="option-selected" slot-scope="option">
                        {{
                          option.nama_kota +
                          ", " +
                          option.provinsi.nama_provinsi +
                          ", " +
                          option.negara.nama_negara
                        }}
                      </template>
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom1.data.length || search"
                      >
                        <span
                          v-if="lookup_custom1.current_page > 1"
                          @click="onGetKota(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom1.last_page >
                            lookup_custom1.current_page
                          "
                          @click="onGetKota(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                </div>
              </ValidationProvider>

              <div class="form-group">
                <input-form
                  label="Provinsi"
                  type="text"
                  name="provinsi_id"
                  :disabled="true"
                  v-model="parameters.form.provinsi_id.nama_provinsi"
                />
              </div>

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

      isStopSearchProvinsi: false,
      isLoadingGetProvinsi: false,
      provinsi_search: "",

      isStopSearchNegara: false,
      isLoadingGetNegara: false,
      negara_search: "",

      isStopSearchKota: false,
      isLoadingGetKota: false,
      kota_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Kecamatan",
      parameters: {
        url: "master/kecamatan",
        form: {
          nama_kecamatan: "",
          kode_kecamatan: "",
          kode_alternatif: "",
          longitude: "",
          latitude: "",
          kota_id: "",
          provinsi_id: "",
          negara_id: "",
        },
      },
    };
  },

  async mounted() {
    await this.onSearchNegara();
    await this.onSearchProvinsi();
    await this.onSearchKota();
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/kecamatan/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.negara_id = res.data.negara;
        this.parameters.form.provinsi_id = res.data.provinsi;
        this.parameters.form.kota_id = res.data.kota;
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
      "lookup_custom3",
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
          id: this.parameters.form.kecamatan_id
            ? this.parameters.form.kecamatan_id
            : "",
          kota_id:
            typeof this.parameters.form.kota_id == "object"
              ? this.parameters.form.kota_id.kota_id
              : this.parameters.form.kota_id,
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

        this.isEditable = false;
        this.parameters.form = {
          kota_id: "",
          provinsi_id: "",
          negara_id: "",
          kode_kecamatan: "",
          kode_alternatif: "",
          nama_kecamatan: "",
          longitude: "",
          latitude: "",
        };

        this.$refs.formValidate.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
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
        this.onSearchKota();
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
            "&negara_id=" +
            this.parameters.form.negara_id +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProvinsi = false;
      }
    },

    onGetKota(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKota);

      this.isStopSearchKota = setTimeout(() => {
        this.kota_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchKota();
      }, 600);
    },

    async onSearchKota() {
      if (!this.isLoadingGetKota) {
        this.isLoadingGetKota = true;

        await this.lookUp({
          url: "master/kota/get-kota",
          lookup: "custom1",
          query:
            "?search=" +
            this.kota_search +
            "&provinsi_id=" +
            this.parameters.form.provinsi_id +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKota = false;
      }
    },

    onGetNegara(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchNegara);

      this.isStopSearchNegara = setTimeout(() => {
        this.negara_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchNegara();
      }, 600);
      this.onSearchProvinsi();
    },

    async onSearchNegara() {
      if (!this.isLoadingGetNegara) {
        this.isLoadingGetNegara = true;

        await this.lookUp({
          url: "master/negara/get-negara",
          lookup: "custom3",
          query:
            "?search=" +
            this.negara_search +
            "&provinsi_id=" +
            this.parameters.form.provinsi_id +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetNegara = false;
      }
    },

    changeProv() {
      this.parameters.kota_id = "";
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kota_id: "",
        provinsi_id: {},
        negara_id: {},
        kode_kecamatan: "",
        kode_alternatif: "",
        nama_kecamatan: "",
        longitude: "",
        latitude: "",
      };
    },

    onSelectKota(item) {
      if (item) {
        this.parameters.form.negara_id = item.negara;
        this.parameters.form.provinsi_id = item.provinsi;
      } else {
        this.parameters.form.negara_id = {};
        this.parameters.form.provinsi_id = {};
      }
    },
  },
};
</script>
