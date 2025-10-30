<template>
  <section class="section h-screen">
    <div
      class="section-body bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
      v-if="!isLoadingPage"
    >
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Master Rute Lokasi Cabang
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Master Rute Lokasi Cabang
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
          <div class="flex gap-x-4">
            <div class="w-1/2 flex-1">
              <!-- <div class="form-group">
                <input-form
                  label="Kode Rute Lokasi"
                  type="text"
                  name="kode_master_rute_lokasi"
                  v-model="parameters.form.kode_master_rute_lokasi"
                  :required="false"
                />
              </div> -->
              <ValidationProvider rules="required">
                <div class="form-group" slot-scope="{ errors, valid }">
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
                    class="w-full mb-2 bg-white"
                    @input="onSelectGudang"
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
                          lookup_location.last_page >
                          lookup_location.current_page
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

              <ValidationProvider rules="required">
                <div class="form-group" slot-scope="{ errors, valid }">
                  <label for="lokasi_id_awal"
                    >Lokasi Awal<span class="text-danger">*</span></label
                  >
                  <v-select
                    label="nama_lokasi"
                    :loading="isLoadingGeLokasiAwal"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetLokasiAwal"
                    v-model="parameters.form.lokasi_id_awal"
                    @input="onSelectLokasiAwal"
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
                        @click="onGetLokasiAwal(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetLokasiAwal(search, true)"
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
                <div class="form-group" slot-scope="{ errors, valid }">
                  <label for="lokasi_id_tujuan"
                    >Lokasi Tujuan<span class="text-danger">*</span></label
                  >
                  <v-select
                    label="nama_lokasi"
                    :loading="isLoadingGetLokasiTujuan"
                    :options="lookup_defects.data"
                    :filterable="false"
                    @search="onGetLokasiTujuan"
                    @input="onSelectLokasiTujuan"
                    v-model="parameters.form.lokasi_id_tujuan"
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
                        @click="onGetLokasiTujuan(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_defects.last_page > lookup_defects.current_page
                        "
                        @click="onGetLokasiTujuan(search, true)"
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

              <div class="form-group">
                <!-- <input-form
              label="Jarak"
              type="text"
              name="jarak"
              v-model="parameters.form.jarak"
              :required="false"
            /> -->
                <label for="min-stok">Jarak (km)</label>
                <money
                  v-model="parameters.form.jarak"
                  min="0"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <div class="flex flex-col gap-y-2">
                  <span v-show="show_rekomendasi" class="text-sm text-gray-500"
                    >*Jarak Rekomendasi Sistem:
                    {{ jarak_rekomendasi | formatPrice }} KM</span
                  >
                  <span
                    class="text-sm text-gray-500"
                    v-if="
                      totalDistance !== 0 &&
                      parseFloat(jarak_rekomendasi) !==
                        parseFloat(totalDistance)
                    "
                    >*Jarak Perubahan Rute:
                    {{ totalDistance | formatPrice }} KM</span
                  >
                </div>
              </div>
              <div class="flex gap-x-2">
                <div class="my-2 w-1/2">
                  <label for="">Waktu Sampai Tujuan Muat (Jam)</label>
                  <money
                    min="0"
                    v-model="parameters.form.waktu_sampai_tujuan"
                    class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="my-2 w-1/2">
                  <label for="">Waktu Sampai Tujuan Kosong (Jam)</label>
                  <money
                    min="0"
                    v-model="parameters.form.waktu_sampai_tujuan_kosong"
                    class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
              </div>

              <ValidationProvider rules="required">
                <div class="form-group" slot-scope="{ errors, valid }">
                  <label for="status_approve"
                    >Status Approve<span class="text-danger">*</span></label
                  >
                  <select
                    class="mb-2 w-full pl-2 py-1 border rounded focus:outline-none"
                    name="status_approve"
                    id="status_approve"
                    v-model="parameters.form.status_approve"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                  >
                    <option value="p">Pending</option>
                    <option value="a">Approve</option>
                    <option value="r">Reject</option>
                  </select>
                  <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </div>
              </ValidationProvider>
            </div>

            <div
              v-if="isMapReady"
              class="w-1/2 mt-2 flex items-center rounded-md overflow-hidden bg-gray-500"
            >
              <MapComponent
                :lokasi1Lat="lokasi1Lat"
                :lokasi1Lng="lokasi1Lng"
                :lokasi2Lat="lokasi2Lat"
                :lokasi2Lng="lokasi2Lng"
                @distance-updated="handleDistanceUpdated"
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
import MapComponent from "../../../components/map.vue";
export default {
  props: ["self"],
  components: {
    MapComponent,
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Master Rute Lokasi Cabang",

      isStopSearchLokasiAwal: false,
      isLoadingGeLokasiAwal: false,
      lokasi_awal_search: "",
      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",
      isStopSearchLokasiTujuan: false,
      isLoadingGetLokasiTujuan: false,
      lokasi_awal_search: "",
      totalDistance: 0,

      parameters: {
        url: "master/rute-lokasi-cabang",
        form: {
          kode_master_rute_lokasi: "",
          jarak: "",
          status_approve: "p",
          lokasi_id_awal: "",
          lokasi_id_tujuan: "",
          gudang_id: "",
          waktu_sampai_tujuan: "",
          waktu_sampai_tujuan_kosong: "",
        },
      },
      jarak_rekomendasi: 0,
      show_rekomendasi: false,
      lokasi1Lat: "0",
      lokasi1Lng: "0",
      lokasi2Lat: "0",
      lokasi2Lng: "0",
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/rute-lokasi-cabang/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.gudang_id = res.data.gudang ?? "";
        this.parameters.form.lokasi_id_awal = res.data.lokasi_awal ?? "";
        this.parameters.form.lokasi_id_tujuan = res.data.lokasi_tujuan ?? "";
        this.parameters.form.jarak = res.data.jarak ?? 0;
        this.parameters.form.waktu_sampai_tujuan =
          res.data.waktu_sampai_tujuan ?? 0;
        this.parameters.form.waktu_sampai_tujuan_kosong =
          res.data.waktu_sampai_tujuan_kosong ?? 0;
        this.isLoadingPage = false;
        this.lokasi1Lat = res.data.lokasi_awal.latitude ?? 0;
        this.lokasi1Lng = res.data.lokasi_awal.longitude ?? 0;
        this.lokasi2Lat = res.data.lokasi_tujuan.latitude ?? 0;
        this.lokasi2Lng = res.data.lokasi_tujuan.longitude ?? 0;

        await this.getRekomendasiJarak();
        // console.log("lokasi 1 latitude", this.lokasi1Lat);
        // console.log("lokasi 1 longitude", this.lokasi1Lng);
        // console.log("lokasi 2 latitude", this.lokasi2Lat);
        // console.log("lokasi 2 longitude", this.lokasi2Lng);
      }
    } catch (error) {
      // console.log(error);
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchGudang();
    // await this.onSearchLokasiAwal();
    // await this.onSearchLokasiTujuan();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_location",
      "lookup_defects",
      "lookup_custom1",
    ]),
    isMapReady() {
      return (
        this.lokasi1Lat && this.lokasi1Lng && this.lokasi2Lat && this.lokasi2Lng
      );
    },
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    handleDistanceUpdated(data) {
      this.totalDistance = data.distanceKm;
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          id: this.parameters.form.master_rute_lokasi_id
            ? this.parameters.form.master_rute_lokasi_id
            : "",
          gudang_id:
            typeof this.parameters.form.gudang_id === "object"
              ? this.parameters.form.gudang_id.gudang_id
              : this.parameters.form.gudang_id,
          lokasi_id_awal:
            typeof this.parameters.form.lokasi_id_awal === "object"
              ? this.parameters.form.lokasi_id_awal.lokasi_id
              : this.parameters.form.lokasi_id_awal,
          lokasi_id_tujuan:
            typeof this.parameters.form.lokasi_id_tujuan === "object"
              ? this.parameters.form.lokasi_id_tujuan.lokasi_id
              : this.parameters.form.lokasi_id_tujuan,
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
          kode_master_rute_lokasi: "",
          jarak: "",
          status_approve: "p",
          lokasi_id_awal: "",
          lokasi_id_tujuan: "",
          gudang_id: "",
          waktu_sampai_tujuan: "",
          waktu_sampai_tujuan_kosong: "",
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
        kode_master_rute_lokasi: "",
        jarak: "",
        status_approve: "p",
        lokasi_id_awal: "",
        lokasi_id_tujuan: "",
        gudang_id: "",
        waktu_sampai_tujuan: "",
        waktu_sampai_tujuan_kosong: "",
      };
    },

    //jenis peralatan
    onGetLokasiAwal(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchLokasiAwal);

      this.isStopSearchLokasiAwal = setTimeout(() => {
        this.lokasi_awal_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchLokasiAwal();
      }, 600);
    },

    async onSearchLokasiAwal() {
      if (!this.isLoadingGeLokasiAwal) {
        this.isLoadingGeLokasiAwal = true;

        await this.lookUp({
          url: "master/lokasi-by-gudang/get-lokasi-by-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.lokasi_awal_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGeLokasiAwal = false;
      }
    },

    async onSelectLokasiAwal(item) {
      if (item) {
        this.parameters.form.lokasi_id_awal = item;
        await this.getRekomendasiJarak();
        this.lokasi1Lat =
          item.latitude || item.latitude2 || item.latitude3 || null;

        this.lokasi1Lng =
          item.longitude || item.longitude2 || item.longitude3 || null;
      } else {
        this.parameters.form.lokasi_id_awal = "";
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
          url: "master/gudang/get-gudang-user",
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

    async onSelectGudang(item) {
      if (item) {
        this.parameters.form.gudang_id = item;
        this.parameters.form.lokasi_id_awal = "";
        this.parameters.form.lokasi_id_tujuan = "";
        await this.onSearchLokasiAwal();
        await this.onSearchLokasiTujuan();
        await this.getRekomendasiJarak();
      } else {
        this.parameters.form.gudang_id = "";
        this.parameters.form.lokasi_id_awal = "";
        this.parameters.form.lokasi_id_tujuan = "";
      }
    },

    onGetLokasiTujuan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchLokasiTujuan);

      this.isStopSearchLokasiTujuan = setTimeout(() => {
        this.lokasi_awal_search = search;

        if (typeof isNext !== "function") {
          this.lookup_defects.current_page = isNext
            ? this.lookup_defects.current_page + 1
            : this.lookup_defects.current_page - 1;
        } else {
          this.lookup_defects.current_page = 1;
        }

        this.onSearchLokasiTujuan();
      }, 600);
    },

    async onSearchLokasiTujuan() {
      if (!this.isLoadingGetLokasiTujuan) {
        this.isLoadingGetLokasiTujuan = true;

        await this.lookUp({
          url: "master/lokasi-by-gudang/get-lokasi-by-gudang",
          lookup: "defects",
          query:
            "?search=" +
            this.lokasi_awal_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_defects.current_page +
            "&per_page=10",
        });

        this.isLoadingGetLokasiTujuan = false;
      }
    },

    async onSelectLokasiTujuan(item) {
      if (item) {
        this.parameters.form.lokasi_id_tujuan = item;
        await this.getRekomendasiJarak();
        this.lokasi2Lat =
          item.latitude || item.latitude2 || item.latitude3 || null;

        this.lokasi2Lng =
          item.longitude || item.longitude2 || item.longitude3 || null;
      } else {
        this.parameters.form.lokasi_id_tujuan = "";
      }
    },

    async getRekomendasiJarak() {
      if (
        this.parameters.form.lokasi_id_awal &&
        this.parameters.form.lokasi_id_tujuan &&
        this.parameters.form.gudang_id
      ) {
        await this.$axios
          .get(
            `master/rute-lokasi-cabang/get-jarak-lokasi-awal-tujuan/${this.parameters.form.gudang_id.gudang_id}?lokasi_id_awal=${this.parameters.form.lokasi_id_awal.lokasi_id}&lokasi_id_tujuan=${this.parameters.form.lokasi_id_tujuan.lokasi_id}`
          )
          .then((res) => {
            if (!this.isEditable) {
              this.parameters.form.jarak = res.data.jarak ?? 0;
              this.parameters.form.waktu_sampai_tujuan =
                res.data.waktu_sampai_tujuan ?? 0;
              this.parameters.form.waktu_sampai_tujuan_kosong =
                res.data.waktu_sampai_tujuan_kosong ?? 0;
            }
            this.jarak_rekomendasi = res.data.jarak ?? 0;
            this.show_rekomendasi = true;
          });
      }
    },
  },
};
</script>
