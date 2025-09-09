<template>
  <section class="section min-h-screen">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Standar Jenis Kendaraan
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Standar Jenis Kendaraan
        </h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form @submit.prevent="validate().then(() => onSubmit(invalid))">
          <div
            class="modal-body mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <ValidationProvider name="jenis_kendaraan" rules="required">
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
                  <label for="" class=""
                    >Jenis Kendaraan <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_jenis_kendaraan"
                    :loading="isLoadingGetJenisKendaraan"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetJenisKendaraan"
                    v-model="parameters.form.jenis_kendaraan_id"
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
                  <div v-if="errors[0]" class="text-danger text-xs">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>

              <ValidationProvider name="gudang" rules="required">
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
                  <label for="" class=""
                    >Gudang <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_gudang"
                    :loading="isLoadingGetGudang"
                    :options="lookup_custom2.data"
                    :filterable="false"
                    @search="onGetGudang"
                    v-model="parameters.form.gudang_id"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom2.data.length || search"
                    >
                      <span
                        v-if="lookup_custom2.current_page > 1"
                        @click="onGetGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom2.last_page > lookup_custom2.current_page
                        "
                        @click="onGetGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                  <div v-if="errors[0]" class="text-danger text-xs">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
              <!-- Kode Standara Jenis Kendaraan -->
              <div class="form-group">
                <input-form
                  label="Kode Standar Jenis Kendaraan"
                  type="text"
                  name="kode_standar_jenis_kendaraan"
                  :required="true"
                  v-model="parameters.form.kode_standar_jenis_kendaraan"
                />
              </div>
              <!-- Kecepatan Isi -->
              <div class="form-group col-12">
                <label for="kecepatan_isi"
                  >Kecepatan Isi <span class="text-danger">*</span></label
                >
                <money
                  v-model="parameters.form.kecepatan_isi"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <div class="text-muted text-sm pl-1 pt-1">* km/jam</div>
              </div>

              <!-- Kecepatan Kosong -->
              <div class="form-group col-12">
                <label for="kecepatan_kosong"
                  >Kecepatan Kosong <span class="text-danger">*</span></label
                >
                <money
                  v-model="parameters.form.kecepatan_kosong"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <div class="text-muted text-sm pl-1 pt-1">* km/jam</div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
              <!-- Standar Muat -->
              <div class="form-group col-12">
                <label for="standar_muat"
                  >Standar Waktu Muat <span class="text-danger">*</span></label
                >
                <money
                  v-model="parameters.form.standar_muat"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <div class="text-muted text-sm pl-1 pt-1">* jam</div>
              </div>

              <!-- Standar Bongkar -->
              <div class="form-group col-12">
                <label for="standar_bongkar"
                  >Standar Waktu Bongkar
                  <span class="text-danger">*</span></label
                >
                <money
                  v-model="parameters.form.standar_bongkar"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <div class="text-muted text-sm pl-1 pt-1">* jam</div>
              </div>

              <!-- Standar Istirahat -->
              <div class="form-group col-12">
                <label for="standar_istirahat"
                  >Standar Istirahat <span class="text-danger">*</span></label
                >
                <money
                  v-model="parameters.form.standar_istirahat"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <div class="text-muted text-sm pl-1 pt-1">* per km</div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
              <!-- Minimal Muat -->
              <div class="form-group col-12">
                <label for="minimal_muat"
                  >Minimal Muat <span class="text-danger">*</span></label
                >
                <money
                  v-model="parameters.form.minimal_muat"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <div class="text-muted text-sm pl-1 pt-1">* kg</div>
              </div>

              <!-- Maksimal Muat -->
              <div class="form-group col-12">
                <label for="maksimal_muat"
                  >Maksimal Muat <span class="text-danger">*</span></label
                >
                <money
                  v-model="parameters.form.maksimal_muat"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <div class="text-muted text-sm pl-1 pt-1">* kg</div>
              </div>
              <!-- Konsumsi BBM -->
              <div class="form-group col-12">
                <label for="konsumsi_bbm"
                  >Konsumsi BBM <span class="text-danger">*</span></label
                >
                <money
                  v-model="parameters.form.konsumsi_bbm"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <div class="text-muted text-sm pl-1 pt-1">* km/liter</div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div class="form-group col-12 w-full">
                <label for="konsumsi_bbm"
                  >Standar Ritase Harian
                  <span class="text-danger">*</span></label
                >
                <money
                  v-model="parameters.form.standar_ritase_harian"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="form-group col-12 w-full">
                <label for="konsumsi_bbm">Maksimal Panjang</label>
                <money
                  v-model="parameters.form.maksimal_panjang"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="form-group col-12 w-full">
                <label for="konsumsi_bbm">Maksimal Lebar</label>
                <money
                  v-model="parameters.form.maksimal_lebar"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div class="form-group col-12 w-full">
                <label for="konsumsi_bbm">Maksimal Tinggi</label>
                <money
                  v-model="parameters.form.maksimal_tinggi"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="form-group w-full items-center mb-5">
                <label for="" class="">Satuan Dimensi</label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_satuan"
                  :loading="isLoadingGetDimensi"
                  :options="lookup_custom3.data"
                  :filterable="false"
                  @search="onGetDimensi"
                  v-model="parameters.form.satuan_id_dimensi"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom3.data.length || search"
                  >
                    <span
                      v-if="lookup_custom3.current_page > 1"
                      @click="onGetDimensi(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom3.last_page > lookup_custom3.current_page
                      "
                      @click="onGetDimensi(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
              <div class="form-group col-12 w-full">
                <label for="konsumsi_bbm">Maksimal Volume</label>
                <money
                  v-model="parameters.form.maksimal_volume"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="form-group w-full items-center mb-5">
                <label for="" class="">Satuan Volume</label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_satuan"
                  :loading="isLoadingGetVolume"
                  :options="lookup_custom4.data"
                  :filterable="false"
                  @search="onGetVolume"
                  v-model="parameters.form.satuan_id_volume"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom4.data.length || search"
                  >
                    <span
                      v-if="lookup_custom4.current_page > 1"
                      @click="onGetVolume(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom4.last_page > lookup_custom4.current_page
                      "
                      @click="onGetVolume(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
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

      isStopSearchJenisKendaraan: false,
      isLoadingGetJenisKendaraan: false,
      jenis_kendaraan_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchDimensi: false,
      isLoadingGetDimensi: false,
      dimensi_search: "",

      isStopSearchVolume: false,
      isLoadingGetVolume: false,
      volume_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Standar Jenis Kendaraan",
      parameters: {
        url: "master/standar-jenis-kendaraan",
        form: {
          kode_standar_jenis_kendaraan: "",
          jenis_kendaraan_id: "",
          gudang_id: "",
          kecepatan_isi: "",
          kecepatan_kosong: "",
          standar_muat: "",
          standar_bongkar: "",
          standar_istirahat: "",
          standar_ritase_harian: "",
          minimal_muat: "",
          maksimal_muat: "",
          konsumsi_bbm: "",
          maksimal_panjang: "",
          maksimal_lebar: "",
          maksimal_tinggi: "",
          satuan_id_dimensi: "",
          maksimal_volume: "",
          satuan_id_volume: "",
        },
      },
    };
  },

  async mounted() {
    await this.onSearchJenisKendaraan();
    await this.onSearchGudang();
    await this.onSearchDimensi();
    await this.onSearchVolume();
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(
          `master/standar-jenis-kendaraan/${this.id}`
        );
        this.parameters.form = res.data;
        this.parameters.form.kecepatan_isi = res.data.kecepatan_isi ?? 0;
        this.parameters.form.kecepatan_kosong = res.data.kecepatan_kosong ?? 0;
        this.parameters.form.standar_muat = res.data.standar_muat ?? 0;
        this.parameters.form.standar_bongkar = res.data.standar_bongkar ?? 0;
        this.parameters.form.standar_istirahat =
          res.data.standar_istirahat ?? 0;
        this.parameters.form.minimal_muat = res.data.minimal_muat ?? 0;
        this.parameters.form.maksimal_muat = res.data.maksimal_muat ?? 0;
        this.parameters.form.konsumsi_bbm = res.data.konsumsi_bbm ?? 0;
        this.parameters.form.standar_ritase_harian =
          res.data.standar_ritase_harian ?? 0;
        this.parameters.form.maksimal_panjang = res.data.maksimal_panjang ?? 0;
        this.parameters.form.maksimal_lebar = res.data.maksimal_lebar ?? 0;
        this.parameters.form.maksimal_tinggi = res.data.maksimal_tinggi ?? 0;
        this.parameters.form.maksimal_volume = res.data.maksimal_volume ?? 0;
        this.parameters.form.jenis_kendaraan_id =
          res.data.jenis_kendaraan ?? "";
        this.parameters.form.gudang_id = res.data.gudang ?? "";
        this.parameters.form.satuan_id_dimensi = res.data.satuan_dimensi ?? "";
        this.parameters.form.satuan_id_volume = res.data.satuan_volume ?? "";

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
      "lookup_custom4",
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
          id: this.parameters.form.standar_jenis_kendaraan_id
            ? this.parameters.form.standar_jenis_kendaraan_id
            : "",
          jenis_kendaraan_id:
            typeof this.parameters.form.jenis_kendaraan_id === "object"
              ? this.parameters.form.jenis_kendaraan_id.jenis_kendaraan_id
              : this.parameters.form.jenis_kendaraan_id,
          gudang_id:
            typeof this.parameters.form.gudang_id === "object"
              ? this.parameters.form.gudang_id.gudang_id
              : this.parameters.form.gudang_id,
          satuan_id_dimensi:
            typeof this.parameters.form.satuan_id_dimensi === "object"
              ? this.parameters.form.satuan_id_dimensi.satuan_id
              : this.parameters.form.satuan_id_dimensi,
          satuan_id_volume:
            typeof this.parameters.form.satuan_id_volume === "object"
              ? this.parameters.form.satuan_id_volume.satuan_id
              : this.parameters.form.satuan_id_volume,
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
          kode_standar_jenis_kendaraan: "",
          jenis_kendaraan_id: "",
          gudang_id: "",
          kecapatan_isi: "",
          kecepatan_kosong: "",
          standar_muat: "",
          standar_bongkar: "",
          standar_istirahat: "",
          minimal_muat: "",
          maksimal_muat: "",
          konsumsi_bbm: "",
          maksimal_panjang: "",
          maksimal_lebar: "",
          maksimal_tinggi: "",
          satuan_id_dimensi: "",
          maksimal_volume: "",
          satuan_id_volume: "",
        };
        this.$refs.formValidate.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }
      this.isLoadingForm = false;
    },

    onGetJenisKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKendaraan);

      this.isStopSearchJenisKendaraan = setTimeout(() => {
        this.jenis_kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookupcustom1.current_page = isNext
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

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }
        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom2",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    onGetDimensi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDimensi);

      this.isStopSearchDimensi = setTimeout(() => {
        this.dimensi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }
        this.onSearchDimensi();
      }, 600);
    },

    async onSearchDimensi() {
      if (!this.isLoadingGetDimensi) {
        this.isLoadingGetDimensi = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "custom3",
          query:
            "?search=" +
            this.dimensi_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDimensi = false;
      }
    },

    onGetVolume(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVolume);

      this.isStopSearchVolume = setTimeout(() => {
        this.volume_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }
        this.onSearchVolume();
      }, 600);
    },

    async onSearchVolume() {
      if (!this.isLoadingGetVolume) {
        this.isLoadingGetVolume = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "custom4",
          query:
            "?search=" +
            this.volume_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVolume = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_standar_jenis_kendaraan: "",
        jenis_kendaraan_id: "",
        gudang_id: "",
        kecapatan_isi: "",
        kecepatan_kosong: "",
        standar_muat: "",
        standar_bongkar: "",
        standar_istirahat: "",
        minimal_muat: "",
        maksimal_muat: "",
        konsumsi_bbm: "",
        maksimal_panjang: "",
        maksimal_lebar: "",
        maksimal_tinggi: "",
        satuan_id_dimensi: "",
        maksimal_volume: "",
        satuan_id_volume: "",
      };
    },
  },
};
</script>
