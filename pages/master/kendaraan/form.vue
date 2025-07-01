<template>
  <div>
    <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
      Edit Data
    </h1>
    <h1 v-else class="text-xl font-bold mb-2 uppercase">Tambah Data</h1>
    <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
      <form
        @submit.prevent="validate().then(() => onsubmit(invalid))"
        autocomplete="off"
      >
        <div class="mb-3">
          <div
            class="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full"
          >
            <ValidationProvider
              name="jenis_kendaraan_id"
              rules="required"
              class="w-full"
            >
              <div slot-scope="{ errors, valid }">
                <label for="jenis_kendaraan_id">Jenis Kendaraan</label>
                <v-select
                  label="nama_jenis_kendaraan"
                  :loading="isLoadingGetJenisKendaraan"
                  :options="lookup_custom1.data"
                  :filterable="false"
                  @search="onGetJenisKendaraan"
                  v-model="parameters.form.jenis_kendaraan_id"
                  :reduce="(item) => item.jenis_kendaraan_id"
                  class="w-full"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom1.data.length || search"
                  >
                    <span
                      v-if="lookup_custom1.current_page > 1"
                      @click="onGetJenisKendaraan(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom1.last_page > lookup_custom1.current_page
                      "
                      @click="onGetJenisKendaraan(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="gudang_id"
              rules="required"
              class="w-full"
            >
              <div slot-scope="{ errors, valid }">
                <label for="gudang_id">Gudang</label>
                <v-select
                  label="nama_gudang"
                  :loading="isLoadingGetGudang"
                  :options="lookup_warehouses.data"
                  :filterable="false"
                  @search="onGetGudang"
                  v-model="parameters.form.gudang_id"
                  :reduce="(item) => item.gudang_id"
                  class="w-full"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_warehouses.data.length || search"
                  >
                    <span
                      v-if="lookup_warehouses.current_page > 1"
                      @click="onGetGudang(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_warehouses.last_page >
                        lookup_warehouses.current_page
                      "
                      @click="onGetGudang(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="vendor_id"
              rules="required"
              class="w-full"
            >
              <div slot-scope="{ errors, valid }">
                <label for="vendor_id">Vendor</label>
                <v-select
                  label="nama_vendor"
                  :loading="isLoadingGetVendor"
                  :options="lookup_operator.data"
                  :filterable="false"
                  @search="onGetVendor"
                  v-model="parameters.form.vendor_id"
                  :reduce="(item) => item.vendor_id"
                  class="w-full"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_vendor.data.length || search"
                  >
                    <span
                      v-if="lookup_vendor.current_page > 1"
                      @click="onGetVendor(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_operator.last_page > lookup_operator.current_page
                      "
                      @click="onGetVendor(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="standar_jenis_kendaraan_id"
              rules="required"
              class="w-full"
            >
              <div slot-scope="{ errors, valid }">
                <label for="standar_jenis_kendaraan_id"
                  >Standar Jenis Kendaraan</label
                >
                <v-select
                  label="nama_standar_jenis_kendaraan"
                  :loading="isLoadingGetStandarJenis"
                  :options="lookup_custom2.data"
                  :filterable="false"
                  @search="onGetStandarJenis"
                  v-model="parameters.form.standar_jenis_kendaraan_id"
                  :reduce="(item) => item.standar_jenis_kendaraan_id"
                  class="w-full"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom2.data.length || search"
                  >
                    <span
                      v-if="lookup_custom2.current_page > 1"
                      @click="onGetStandarJenis(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom2.last_page > lookup_custom2.current_page
                      "
                      @click="onGetStandarJenis(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="nama_kendaraan"
              rules="required"
              class="w-full"
            >
              <div slot-scope="{ errors, valid }">
                <input-form
                  label="Nama Kendaraan"
                  type="text"
                  name="nama_kendaraan"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                  v-model="parameters.form.nama_kendaraan"
                />
                <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div>
              </div>
            </ValidationProvider>
            <div class="form-group" slot-scope="{ errors, valid }">
              <label>Keterangan Pindah Gudang</label>
              <textarea
                name="keterangan_pindah_gudang"
                v-model="parameters.form.keterangan_pindah_gudang"
                class="w-full border border-gray-500 rounded-md bg-white outline-none active:outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";

export default {
  props: ["self"],

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchJenisKendaraan();
    await this.onSearchVendor();
    await this.onSearchStandarJenis();
  },

  data() {
    return {
      isStopSearchJenisKendaraan: false,
      isLoadingGetJenisKendaraan: false,
      jenis_kendaraan_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearchStandarJenis: false,
      isLoadingGetStandarJenis: false,
      standar_jenis_search: "",

      isEditable: false,
      isLoadingForm: false,
      title: "Kendaraan",
      parameters: {
        url: "master/kendaraan",
        form: {
          kendaraan_id: "",
          jenis_kendaraan_id: "",
          gudang_id: "",
          vendor_id: "",
          vendor_id_operator: "",
          standar_jenis_kendaraan_id: "",
          nama_kendaraan: "",
          keterangan_pindah_gudang: "",
          plat_nomor: "",
          cc: "",
          nomor_mesin: "",
          tahun_buat: "",
          nomor_sasis: "",
          stnk: "",
          kir: "",
          status_digunakan: "",
          status_normal: "",
        },
      },
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_warehouses",
      "lookup_operator",
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
          id: this.parameters.form.kendaraan_id
            ? this.parameters.form.kendaraan_id
            : "",
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.self.onLoad(this.self.parameters.params.page);
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
        this.isEditable = false;
        this.parameters.form = {
          kendaraan_id: "",
          jenis_kendaraan_id: "",
          gudang_id: "",
          vendor_id: "",
          vendor_id_operator: "",
          standar_jenis_kendaraan_id: "",
          nama_kendaraan: "",
          keterangan_pindah_gudang: "",
          plat_nomor: "",
          cc: "",
          nomor_mesin: "",
          tahun_buat: "",
          nomor_sasis: "",
          stnk: "",
          kir: "",
          status_digunakan: "",
          status_normal: "",
        };
        this.$refs.formValidate.reset();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    //jenis kendaraan
    onGetJenisKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKendaraan);

      this.isStopSearchJenisKendaraan = setTimeout(() => {
        this.jenis_kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchJenisKendaraan();
      }, 600);
    },

    async onSearchJenisKendaraan() {
      if (!this.isLoadingGetJenisKendaraan) {
        this.isLoadingGetJenisKendaraan = true;

        await this.lookUp({
          url: "master/jenis-kendaraan/get-jenis-kendaraan",
          lookup: "custom1",
          query:
            "?search=" +
            this.jenis_kendaraan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisKendaraan = false;
      }
    },

    //gudang
    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_warehouses.current_page = isNext
            ? this.lookup_warehouses.current_page + 1
            : this.lookup_warehouses.current_page - 1;
        } else {
          this.lookup_warehouses.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "warehouses",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_warehouses.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    //vendor
    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_operator.current_page = isNext
            ? this.lookup_operator.current_page + 1
            : this.lookup_operator.current_page - 1;
        } else {
          this.lookup_operator.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "operator",
          query:
            "?search=" +
            this.vendor_search +
            "&page=" +
            this.lookup_operator.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
      }
    },

    //vendor
    onGetStandarJenis(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchStandarJenis);

      this.isStopSearchStandarJenis = setTimeout(() => {
        this.standar_jenis_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchStandarJenis();
      }, 600);
    },

    async onSearchStandarJenis() {
      if (!this.isLoadingGetStandarJenis) {
        this.isLoadingGetStandarJenis = true;

        await this.lookUp({
          url: "master/standar-jenis-kendaraan/get-standar-jenis-kendaraan",
          lookup: "custom2",
          query:
            "?search=" +
            this.standar_jenis_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetStandarJenis = false;
      }
    },
  },
};
</script>
