<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Kelurahan
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Kelurahan
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
            class="modal-body mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 w-full"
          >
            <ValidationProvider
              name="nama_kelurahan"
              rules="required"
              ref="ruteProvider"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Nama Kelurahan"
                  type="text"
                  name="nama_kelurahan"
                  v-model="parameters.form.nama_kelurahan"
                  :required="true"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="kode_kelurahan"
              rules="required"
              ref="ruteProvider"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Kode Kelurahan"
                  type="text"
                  name="kode_kelurahan"
                  v-model="parameters.form.kode_kelurahan"
                  :required="true"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="Latitude"
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
            <ValidationProvider name="id_kecamatan" rules="required">
              <div
                class="form-group w-full items-center mb-5"
                slot-scope="{ errors, valid }"
              >
                <label for="" class="w-4/12"
                  >Kecamatan<span class="text-danger">*</span></label
                >
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_kecamatan"
                  :loading="isLoadingGetKecamatan"
                  :options="lookup_beam.data"
                  :filterable="false"
                  @search="onGetKecamatan"
                  @input="onSelectKecamatan"
                  v-model="parameters.form.kecamatan_id"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <template slot="option" slot-scope="option">
                    {{
                      option.nama_kecamatan +
                      ", " +
                      option.kota.nama_kota +
                      ", " +
                      option.provinsi.nama_provinsi +
                      ", " +
                      option.negara.nama_negara
                    }}
                  </template>
                  <template slot="option-selected" slot-scope="option">
                    {{
                      option.nama_kecamatan +
                      ", " +
                      option.kota.nama_kota +
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
                    v-if="lookup_beam.data.length || search"
                  >
                    <span
                      v-if="lookup_beam.current_page > 1"
                      @click="onGetKecamatan(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="lookup_beam.last_page > lookup_beam.current_page"
                      @click="onGetKecamatan(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </ValidationProvider>

            <div class="form-group">
              <input-form
                label="Kota"
                type="text"
                name="kota_id"
                :disabled="true"
                v-model="parameters.form.kota_id.nama_kota"
              />
            </div>
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

      isStopSearchKota: false,
      isLoadingGetKota: false,
      kota_search: "",

      isStopSearchKecamatan: false,
      isLoadingGetKecamatan: false,
      kecamatan_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      title: "Kelurahan",
      parameters: {
        url: "master/kelurahan",
        form: {
          negara_id: "",
          provinsi_id: "",
          kota_id: "",
          kecamatan_id: "",
          nama_kelurahan: "",
          kode_kelurahan: "",
          longitude: "",
          latitude: "",
        },
      },
    };
  },

  async mounted() {
    // await this.onSearchNegara();
    // await this.onSearchProvinsi();
    // await this.onSearchKota();
    await this.onSearchKecamatan();
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/kelurahan/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.negara_id = res.data.negara;
        this.parameters.form.provinsi_id = res.data.provinsi;
        this.parameters.form.kota_id = res.data.kota;
        this.parameters.form.kecamatan_id = res.data.kecamatan;
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
      "lookup_beam",
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
          id: this.parameters.form.kelurahan_id
            ? this.parameters.form.kelurahan_id
            : "",
          kecamatan_id:
            typeof this.parameters.form.kecamatan_id == "object"
              ? this.parameters.form.kecamatan_id.kecamatan_id
              : this.parameters.form.kecamatan_id,
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

        this.formReset();
        // this.isEditable = false;
        // this.parameters.form = {
        //   negara_id: "",
        //   provinsi_id: "",
        //   kota_id: "",
        //   kecamatan_id: "",
        //   nama_kelurahan: "",
        //   kode_kelurahan: "",
        //   longitude: "",
        //   latitude: "",
        // };
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
      this.onSearchKota();
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
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchKota();
      }, 600);
      this.onSearchKecamatan();
    },

    async onSearchKota() {
      if (!this.isLoadingGetKota) {
        this.isLoadingGetKota = true;

        await this.lookUp({
          url: "master/kota/get-kota",
          lookup: "custom3",
          query:
            "?search=" +
            this.kota_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKota = false;
      }
    },

    onGetKecamatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKecamatan);

      this.isStopSearchKecamatan = setTimeout(() => {
        this.kecamatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchKecamatan();
      }, 600);
    },

    async onSearchKecamatan() {
      if (!this.isLoadingGetKecamatan) {
        this.isLoadingGetKecamatan = true;

        await this.lookUp({
          url: "master/kecamatan/get-kecamatan",
          lookup: "beam",
          query:
            "?search=" +
            this.kecamatan_search +
            "&kota_id=" +
            this.parameters.form.kota_id +
            "&page=" +
            this.lookup_beam.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKecamatan = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        negara_id: {},
        provinsi_id: {},
        kota_id: {},
        kecamatan_id: "",
        nama_kelurahan: "",
        kode_kelurahan: "",
        longitude: "",
        latitude: "",
      };
    },

    onSelectKecamatan(item) {
      if (item) {
        this.parameters.form.negara_id = item.negara;
        this.parameters.form.provinsi_id = item.provinsi;
        this.parameters.form.kota_id = item.kota;
      } else {
        this.parameters.form.negara_id = {};
        this.parameters.form.provinsi_id = {};
        this.parameters.form.kota_id = {};
      }
    },

    changeStatus() {
      this.parameters.kelurahan_id = "";
    },
  },
};
</script>
