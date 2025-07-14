<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Peralatan
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Peralatan
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
          <div class="form-group">
            <input-form
              label="Kode Peralatan"
              type="text"
              name="kode_peralatan"
              v-model="parameters.form.kode_peralatan"
              :required="false"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Nama Peralatan"
              type="text"
              name="nama_peralatan"
              v-model="parameters.form.nama_peralatan"
              :required="true"
            />
          </div>

          <ValidationProvider rules="required">
            <div class="form-group" slot-scope="{ errors, valid }">
              <label for="status_peralatan"
                >Status Peralatan<span class="text-danger">*</span></label
              >
              <select
                class="mb-2 w-full pl-2 py-1 border rounded focus:outline-none"
                name="status_peralatan"
                id="status_peralatan"
                v-model="parameters.form.status_peralatan"
                :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
              >
                <option value="">Pilih</option>
                <option value="1">Aktif</option>
                <option value="0">Non Aktif</option>
              </select>
              <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                errors[0]
              }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider rules="required">
            <div slot-scope="{ errors, valid }">
              <label for="jenis_peralatan_id"
                >Jenis Peralatan<span class="text-danger">*</span></label
              >
              <v-select
                label="nama_jenis_peralatan"
                :loading="isLoadingGetJenisPeralatan"
                :options="lookup_custom1.data"
                :filterable="false"
                @search="onGetJenisPeralatan"
                v-model="parameters.form.jenis_peralatan_id"
                :reduce="(item) => item.jenis_peralatan_id"
                class="w-full mb-2 bg-white"
                :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom1.data.length || search"
                >
                  <span
                    v-if="lookup_custom1.current_page > 1"
                    @click="onGetJenisPeralatan(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom1.last_page > lookup_custom1.current_page
                    "
                    @click="onGetJenisPeralatan(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
              <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                errors[0]
              }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider rules="required">
            <div slot-scope="{ errors, valid }">
              <label for="vendor_id"
                >Vendor<span class="text-danger">*</span></label
              >
              <v-select
                label="nama_vendor"
                :loading="isLoadingGetVendorPemilik"
                :options="lookup_defects.data"
                :filterable="false"
                @search="onGetVendorPemilik"
                v-model="parameters.form.vendor_id"
                :reduce="(item) => item.vendor_id"
                class="w-full mb-2 bg-white"
                :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_defects.data.length || search"
                >
                  <span
                    v-if="lookup_defects.current_page > 1"
                    @click="onGetVendorPemilik(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_defects.last_page > lookup_defects.current_page
                    "
                    @click="onGetVendorPemilik(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
              <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                errors[0]
              }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider rules="required">
            <div slot-scope="{ errors, valid }">
              <label for="gudang_id"
                >Gudang<span class="text-danger">*</span></label
              >
              <v-select
                label="nama_gudang"
                :loading="isLoadingGetGudang"
                :options="lookup_location.data"
                :filterable="false"
                @search="onGetGudang"
                v-model="parameters.form.gudang_id"
                :reduce="(item) => item.gudang_id"
                class="w-full mb-2 bg-white"
                :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_location.data.length || search"
                >
                  <span
                    v-if="lookup_location.current_page > 1"
                    @click="onGetGudang(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_location.last_page > lookup_location.current_page
                    "
                    @click="onGetGudang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
              <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                errors[0]
              }}</span>
            </div>
          </ValidationProvider>

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
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Peralatan",

      isStopSearchJenisPeralatan: false,
      isLoadingGetJenisPeralatan: false,
      jenis_peralatan_search: "",
      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",
      isStopSearchVendorPemilik: false,
      isLoadingGetVendorPemilik: false,
      vendor_pemilik_search: "",

      parameters: {
        url: "master/peralatan",
        form: {
          kode_peralatan: "",
          nama_peralatan: "",
          status_peralatan: "",
          jenis_peralatan_id: "",
          vendor_id: "",
          gudang_id: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/peralatan/${this.id}`);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchJenisPeralatan();
    await this.onSearchGudang();
    await this.onSearchVendorPemilik();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_location",
      "lookup_defects",
      "lookup_custom1",
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
          id: this.parameters.form.peralatan_id
            ? this.parameters.form.peralatan_id
            : "",
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
        this.isEditable = false;
        this.parameters.form = {
          kode_peralatan: "",
          nama_peralatan: "",
          status_peralatan: "",
          jenis_peralatan_id: "",
          vendor_id: "",
          gudang_id: "",
        };
        this.$refs.formValidate.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }
      this.isLoadingForm = false;
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_peralatan: "",
        nama_peralatan: "",
        status_peralatan: "",
        jenis_peralatan_id: "",
        vendor_id: "",
        gudang_id: "",
      };
    },

    //jenis peralatan
    onGetJenisPeralatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisPeralatan);

      this.isStopSearchJenisPeralatan = setTimeout(() => {
        this.jenis_peralatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchJenisPeralatan();
      }, 600);
    },

    async onSearchJenisPeralatan() {
      if (!this.isLoadingGetJenisPeralatan) {
        this.isLoadingGetJenisPeralatan = true;

        await this.lookUp({
          url: "master/jenis-peralatan/get-jenis-peralatan",
          lookup: "custom1",
          query:
            "?search=" +
            this.jenis_peralatan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisPeralatan = false;
      }
    },
    //gudang
    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_location.current_page = isNext
            ? this.lookup_location.current_page + 1
            : this.lookup_location.current_page - 1;
        } else {
          this.lookup_location.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "location",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_location.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    onGetVendorPemilik(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendorPemilik);

      this.isStopSearchVendorPemilik = setTimeout(() => {
        this.vendor_pemilik_search = search;

        if (typeof isNext !== "function") {
          this.lookup_defects.current_page = isNext
            ? this.lookup_defects.current_page + 1
            : this.lookup_defects.current_page - 1;
        } else {
          this.lookup_defects.current_page = 1;
        }

        this.onSearchVendorPemilik();
      }, 600);
    },

    async onSearchVendorPemilik() {
      if (!this.isLoadingGetVendorPemilik) {
        this.isLoadingGetVendorPemilik = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "defects",
          query:
            "?search=" +
            this.vendor_pemilik_search +
            "&tipe_vendor=e" +
            "&page=" +
            this.lookup_defects.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendorPemilik = false;
      }
    },
  },
};
</script>
