<template>
  <section class="section min-h-screen">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">Tambah Data</h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div
            class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 w-full section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="form-group">
              <input-horiontal
                label="No Referensi"
                type="text"
                name="no_referensi"
                v-model="parameters.form.no_referensi"
                :required="false"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'Pelanggan',
                  optionLabel: 'nama_pelanggan',
                  lookup: lookup_custom1,
                  value: parameters.form.pelanggan_id,
                  onGet: onGetPelanggan,
                  isLoadingL: isLoadingGetPelanggan,
                  input: onSelectPelanggan,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Kontrak"
                type="date"
                name="tanggal_kontrak"
                v-model="parameters.form.tanggal_kontrak"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Berlaku"
                type="date"
                name="tanggal_berlaku"
                v-model="parameters.form.tanggal_berlaku"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Berhenti"
                type="date"
                name="tanggal_berhenti"
                v-model="parameters.form.tanggal_berhenti"
                :required="false"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'PIC Kontrak',
                  optionLabel: 'nama_lengkap',
                  lookup: lookup_custom2,
                  value: parameters.form.user_id_pic,
                  onGet: onGetUser,
                  isLoadingL: isLoadingGetUser,
                  input: onSelectPIC,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'Jenis Kontrak',
                  optionLabel: 'nama_jenis_kontrak',
                  lookup: lookup_custom3,
                  value: parameters.form.jenis_kontrak_id,
                  onGet: onGetJenisKontrak,
                  isLoadingL: isLoadingGetJenisKontrak,
                  input: onSelectJenisKontrak,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="form-group flex justify-between">
              <label for="" class="w-1/2">Status Kontrak</label>
              <select
                v-model="parameters.form.status_kontrak"
                name=""
                id=""
                class="pl-2 py-1 border border-gray-300 rounded focus:outline-none w-1/2"
              >
                <option value=""></option>
                <option value="FISIK">Fisik</option>
                <option value="VIRTUAL">Virtual</option>
              </select>
            </div>
            <div class="form-group flex justify-between">
              <label for="keterangan" class="w-1/2 pt-1">Keterangan</label>
              <textarea
                placeholder="Keterangan"
                class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                v-model="parameters.form.keterangan"
              ></textarea>
            </div>
          </div>
          <div v-if="isEditable" class="my-10">
            <h1 class="text-xl font-bold mb-2 uppercase">Status Kontrak</h1>
            <div
              class="mt-4 w-full bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div class="flex w-full m-1 pr-1">
                <label for="" class="w-[30%]">Status</label>
                <select
                  name=""
                  id=""
                  v-model="parameters.form.status"
                  class="w-[70%] p-1 rounded-sm border border-gray-300 outline-none"
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approve</option>
                  <option value="REJECT">Reject</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div
            class="mt-4 w-full bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <tab-component :tabs="tabs">
              <template #KontrakLastmileJarak>
                <KontrakLastmileJarak :self="{ parameters }" />
              </template>
              <template #KontrakLastmileRitase>
                <KontrakLastmileRitase :self="{ parameters }" />
              </template>
              <template #KontrakLastmileBerat>
                <KontrakLastmileBerat :self="{ parameters }" />
              </template>
              <template #KontrakLastmileAtcost>
                <KontrakLastmileAtcost :self="{ parameters }" />
              </template>
            </tab-component>
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
import { ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";
import KontrakLastmileJarak from "./KontrakLastmileJarak.vue";
import KontrakLastmileRitase from "./KontrakLastmileRitase.vue";
import KontrakLastmileBerat from "./KontrakLastmileBerat.vue";
import KontrakLastmileAtcost from "./KontrakLastmileAtcost.vue";
export default {
  props: ["self"],

  components: {
    KontrakLastmileJarak,
    KontrakLastmileRitase,
    KontrakLastmileBerat,
    KontrakLastmileAtcost,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        { name: "Insentif Jarak", slotName: "KontrakLastmileJarak" },
        { name: "Insentif Ritase", slotName: "KontrakLastmileRitase" },
        { name: "Biaya BBM", slotName: "KontrakLastmileBerat" },
        { name: "Biaya Lainnya", slotName: "KontrakLastmileAtcost" },
        { name: "Biaya Premi", slotName: "BiayaPremi" },
      ],

      id,

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchUser: false,
      isLoadingGetUser: false,
      user_search: "",

      isStopSearchJenisKontrak: false,
      isLoadingGetJenisKontrak: false,
      jenis_kontrak_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Kontrak Pelanggan Lastmile",
      parameters: {
        url: "finance/kontrak-lastmile-pelanggan",
        form: {
          no_referensi: "",
          pelanggan_id: "",
          tanggal_kontrak: "",
          tanggal_berlaku: "",
          tanggal_berhenti: "",
          keterangan: "",
          status_kontrak: "",
          user_id_pic: "",
          jenis_kontrak_id: "",
          kontrak_lastmile_jarak_pelanggan_details: [],
          kontrak_lastmile_ritase_pelanggan_details: [],
          kontrak_lastmile_berat_pelanggan_details: [],
          kontrak_lastmile_atcost_pelanggan_details: [],
          status: "",

          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },
      default_form: {
        no_referensi: "",
        pelanggan_id: "",
        tanggal_kontrak: "",
        tanggal_berlaku: "",
        tanggal_berhenti: "",
        keterangan: "",
        status_kontrak: "",
        user_id_pic: "",
        jenis_kontrak_id: "",
        kontrak_lastmile_jarak_pelanggan_details: [],
        kontrak_lastmile_ritase_pelanggan_details: [],
        kontrak_lastmile_berat_pelanggan_details: [],
        kontrak_lastmile_atcost_pelanggan_details: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          if (
            item !== "kontrak_lastmile_jarak_pelanggan_details" &&
            item !== "kontrak_lastmile_ritase_pelanggan_details" &&
            item !== "kontrak_lastmile_berat_pelanggan_details" &&
            item !== "kontrak_lastmile_atcost_pelanggan_details"
          ) {
            this.parameters.form[item] = res.data[item];
          }
        });

        this.parameters.form.pelanggan_id = res.data.pelanggan;
        this.parameters.form.user_id_pic = res.data.user_pic;
        this.parameters.form.jenis_kontrak_id = res.data.jenis_kontrak;

        this.parameters.form.kontrak_lastmile_jarak_pelanggan_details =
          res.data.kontrak_lastmile_jarak_pelanggan_details.map((item) => {
            return {
              ...item,
              kontrak_lastmile_pelanggan_jarak_detail_id:
                item.kontrak_lastmile_pelanggan_jarak_detail_id
                  ? item.kontrak_lastmile_pelanggan_jarak_detail_id
                  : "",
              jenis_kontrak_id: item.jenis_kontrak ? item.jenis_kontrak : "",
              divisi_id: item.divisi ? item.divisi : "",
              jenis_biaya_id: item.jenis_biaya ? item.jenis_biaya : "",
              gudang_id: item.gudang ? item.gudang : "",
              mata_uang_id: item.mata_uang ? item.mata_uang : "",
              pembayaran_id: item.pembayaran ? item.pembayaran : "",
              term_pembayaran_id: item.term_pembayaran
                ? item.term_pembayaran
                : "",
              jenis_kendaraan_id: item.jenis_kendaraan
                ? item.jenis_kendaraan
                : "",
            };
          });
        this.parameters.form.kontrak_lastmile_ritase_pelanggan_details =
          res.data.kontrak_lastmile_ritase_pelanggan_details.map((item) => {
            return {
              ...item,
              kontrak_lastmile_pelanggan_ritase_detail_id:
                item.kontrak_lastmile_pelanggan_ritase_detail_id
                  ? item.kontrak_lastmile_pelanggan_ritase_detail_id
                  : "",
              jenis_kontrak_id: item.jenis_kontrak ? item.jenis_kontrak : "",
              divisi_id: item.divisi ? item.divisi : "",
              jenis_biaya_id: item.jenis_biaya ? item.jenis_biaya : "",
              gudang_id: item.gudang ? item.gudang : "",
              mata_uang_id: item.mata_uang ? item.mata_uang : "",
              pembayaran_id: item.pembayaran ? item.pembayaran : "",
              term_pembayaran_id: item.term_pembayaran
                ? item.term_pembayaran
                : "",
              jenis_kendaraan_id: item.jenis_kendaraan
                ? item.jenis_kendaraan
                : "",
            };
          });
        this.parameters.form.kontrak_lastmile_berat_pelanggan_details =
          res.data.kontrak_lastmile_berat_pelanggan_details.map((item) => {
            return {
              ...item,
              kontrak_lastmile_pelanggan_berat_detail_id:
                item.kontrak_lastmile_pelanggan_berat_detail_id
                  ? item.kontrak_lastmile_pelanggan_berat_detail_id
                  : "",
              jenis_kontrak_id: item.jenis_kontrak ? item.jenis_kontrak : "",
              divisi_id: item.divisi ? item.divisi : "",
              jenis_biaya_id: item.jenis_biaya ? item.jenis_biaya : "",
              gudang_id: item.gudang ? item.gudang : "",
              mata_uang_id: item.mata_uang ? item.mata_uang : "",
              pembayaran_id: item.pembayaran ? item.pembayaran : "",
              term_pembayaran_id: item.term_pembayaran
                ? item.term_pembayaran
                : "",
              jenis_kendaraan_id: item.jenis_kendaraan
                ? item.jenis_kendaraan
                : "",
              satuan_id_dimensi: item.satuan_dimensi ? item.satuan_dimensi : "",
              satuan_id_volume: item.satuan_volume ? item.satuan_volume : "",
            };
          });
        this.parameters.form.kontrak_lastmile_atcost_pelanggan_details =
          res.data.kontrak_lastmile_atcost_pelanggan_details.map((item) => {
            return {
              ...item,
              kontrak_lastmile_pelanggan_atcost_detail_id:
                item.kontrak_lastmile_pelanggan_atcost_detail_id
                  ? item.kontrak_lastmile_pelanggan_atcost_detail_id
                  : "",
              jenis_kontrak_id: item.jenis_kontrak ? item.jenis_kontrak : "",
              divisi_id: item.divisi ? item.divisi : "",
              jenis_biaya_id: item.jenis_biaya ? item.jenis_biaya : "",
              gudang_id: item.gudang ? item.gudang : "",
              mata_uang_id: item.mata_uang ? item.mata_uang : "",
              pembayaran_id: item.pembayaran ? item.pembayaran : "",
              term_pembayaran_id: item.term_pembayaran
                ? item.term_pembayaran
                : "",
              jenis_kendaraan_id: item.jenis_kendaraan
                ? item.jenis_kendaraan
                : "",
              lokasi_id: item.lokasi ? item.lokasi : "",
              // satuan_id_dimensi: item.satuan_dimensi ? item.satuan_dimensi : "",
              // satuan_id_volume: item.satuan_volume ? item.satuan_volume : "",
            };
          });
        // console.log("res", res.data);
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
      // console.log("error", error);
    }
  },

  async mounted() {
    await this.onSearchPelanggan();
    await this.onSearchUser();
    await this.onSearchJenisKontrak();

    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //pelanggan
      "lookup_custom2", //user pic & approver
      "lookup_custom3", //jenis kontrak
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.parameters.form.user_agent = navigator.userAgent;
      if (this.parameters.form.user_agent.includes("Mobile")) {
        this.parameters.form.device = "Mobile";
      } else if (this.parameters.form.user_agent.includes("Tablet")) {
        this.parameters.form.device = "Tablet";
      } else {
        this.parameters.form.device = "Desktop";
      }
      // console.log("user agent", this.form.user_agent);
      // console.log("device", this.form.device);
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.parameters.form.longitude =
              position.coords.longitude.toString();
            this.parameters.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
            // console.log(
            //   "latitude",
            //   this.form.latitude,
            //   "longitude",
            //   this.form.longitude
            // );
          },
          (error) => {
            this.isLoadingForm = false;
            this.$toaster.error(error.message);
          }
        );
      } else {
        this.$toaster.error("geolocation not supported");
        // console.log("geolocation not supported");
      }
    },

    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchPelanggan();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "custom1",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    onGetUser(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchUser);

      this.isStopSearchUser = setTimeout(() => {
        this.user_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchUser();
      }, 600);
    },

    async onSearchUser() {
      if (!this.isLoadingGetUser) {
        this.isLoadingGetUser = true;

        await this.lookUp({
          url: "setting/user",
          lookup: "custom2",
          query:
            "?search=" +
            this.user_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetUser = false;
      }
    },

    onGetJenisKontrak(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKontrak);

      this.isStopSearchJenisKontrak = setTimeout(() => {
        this.jenis_kontrak_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchJenisKontrak();
      }, 600);
    },

    async onSearchJenisKontrak() {
      if (!this.isLoadingGetJenisKontrak) {
        this.isLoadingGetJenisKontrak = true;

        await this.lookUp({
          url: "master/jenis-kontrak/get-jenis-kontrak",
          lookup: "custom3",
          query:
            "?search=" +
            this.jenis_kontrak_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisKontrak = false;
      }
    },

    onSelectPelanggan(item) {
      if (item) {
        this.parameters.form.pelanggan_id = item;
      } else {
        this.parameters.form.pelanggan_id = "";
      }
    },

    onSelectPIC(item) {
      if (item) {
        this.parameters.form.user_id_pic = item;
      } else {
        this.parameters.form.user_id_pic = "";
      }
    },

    onSelectJenisKontrak(item) {
      if (item) {
        this.parameters.form.jenis_kontrak_id = item;
      } else {
        this.parameters.form.jenis_kontrak_id = "";
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = this.parameters.url;

      let formData = {
        ...this.parameters.form,
        pelanggan_id:
          typeof this.parameters.form.pelanggan_id === "object"
            ? this.parameters.form.pelanggan_id.pelanggan_id
            : this.parameters.form.pelanggan_id,
        user_id_pic:
          typeof this.parameters.form.user_id_pic === "object"
            ? this.parameters.form.user_id_pic.user_id
            : this.parameters.form.user_id_pic,
        jenis_kontrak_id:
          typeof this.parameters.form.jenis_kontrak_id === "object"
            ? this.parameters.form.jenis_kontrak_id.jenis_kontrak_id
            : this.parameters.form.jenis_kontrak_id,
      };

      formData.kontrak_lastmile_jarak_pelanggan_details =
        this.parameters.form.kontrak_lastmile_jarak_pelanggan_details.map(
          (item) => {
            return {
              ...item,
              kontrak_lastmile_pelanggan_jarak_detail_id:
                typeof item.kontrak_lastmile_pelanggan_jarak_detail_id ===
                "object"
                  ? item.kontrak_lastmile_pelanggan_jarak_detail_id
                      .kontrak_lastmile_pelanggan_jarak_detail_id
                  : item.kontrak_lastmile_pelanggan_jarak_detail_id,
              jenis_kontrak_id:
                typeof item.jenis_kontrak_id === "object"
                  ? item.jenis_kontrak_id.jenis_kontrak_id
                  : item.jenis_kontrak_id,
              divisi_id:
                typeof item.divisi_id === "object"
                  ? item.divisi_id.divisi_id
                  : item.divisi_id,
              jenis_biaya_id:
                typeof item.jenis_biaya_id === "object"
                  ? item.jenis_biaya_id.jenis_biaya_id
                  : item.jenis_biaya_id,
              gudang_id:
                typeof item.gudang_id === "object"
                  ? item.gudang_id.gudang_id
                  : item.gudang_id,
              mata_uang_id:
                typeof item.mata_uang_id === "object"
                  ? item.mata_uang_id.mata_uang_id
                  : item.mata_uang_id,
              pembayaran_id:
                typeof item.pembayaran_id === "object"
                  ? item.pembayaran_id.pembayaran_id
                  : item.pembayaran_id,
              term_pembayaran_id:
                typeof item.term_pembayaran_id === "object"
                  ? item.term_pembayaran_id.term_pembayaran_id
                  : item.term_pembayaran_id,
              jenis_kendaraan_id:
                typeof item.jenis_kendaraan_id === "object"
                  ? item.jenis_kendaraan_id.jenis_kendaraan_id
                  : item.jenis_kendaraan_id,
            };
          }
        );

      formData.kontrak_lastmile_ritase_pelanggan_details =
        this.parameters.form.kontrak_lastmile_ritase_pelanggan_details.map(
          (item) => {
            return {
              ...item,
              kontrak_lastmile_pelanggan_ritase_detail_id:
                typeof item.kontrak_lastmile_pelanggan_ritase_detail_id ===
                "object"
                  ? item.kontrak_lastmile_pelanggan_ritase_detail_id
                      .kontrak_lastmile_pelanggan_ritase_detail_id
                  : item.kontrak_lastmile_pelanggan_ritase_detail_id,
              jenis_kontrak_id:
                typeof item.jenis_kontrak_id === "object"
                  ? item.jenis_kontrak_id.jenis_kontrak_id
                  : item.jenis_kontrak_id,
              divisi_id:
                typeof item.divisi_id === "object"
                  ? item.divisi_id.divisi_id
                  : item.divisi_id,
              jenis_biaya_id:
                typeof item.jenis_biaya_id === "object"
                  ? item.jenis_biaya_id.jenis_biaya_id
                  : item.jenis_biaya_id,
              gudang_id:
                typeof item.gudang_id === "object"
                  ? item.gudang_id.gudang_id
                  : item.gudang_id,
              mata_uang_id:
                typeof item.mata_uang_id === "object"
                  ? item.mata_uang_id.mata_uang_id
                  : item.mata_uang_id,
              pembayaran_id:
                typeof item.pembayaran_id === "object"
                  ? item.pembayaran_id.pembayaran_id
                  : item.pembayaran_id,
              term_pembayaran_id:
                typeof item.term_pembayaran_id === "object"
                  ? item.term_pembayaran_id.term_pembayaran_id
                  : item.term_pembayaran_id,
              jenis_kendaraan_id:
                typeof item.jenis_kendaraan_id === "object"
                  ? item.jenis_kendaraan_id.jenis_kendaraan_id
                  : item.jenis_kendaraan_id,
            };
          }
        );

      formData.kontrak_lastmile_berat_pelanggan_details =
        this.parameters.form.kontrak_lastmile_berat_pelanggan_details.map(
          (item) => {
            return {
              ...item,
              kontrak_lastmile_pelanggan_berat_detail_id:
                typeof item.kontrak_lastmile_pelanggan_berat_detail_id ===
                "object"
                  ? item.kontrak_lastmile_pelanggan_berat_detail_id
                      .kontrak_lastmile_pelanggan_berat_detail_id
                  : item.kontrak_lastmile_pelanggan_berat_detail_id,
              jenis_kontrak_id:
                typeof item.jenis_kontrak_id === "object"
                  ? item.jenis_kontrak_id.jenis_kontrak_id
                  : item.jenis_kontrak_id,
              divisi_id:
                typeof item.divisi_id === "object"
                  ? item.divisi_id.divisi_id
                  : item.divisi_id,
              jenis_biaya_id:
                typeof item.jenis_biaya_id === "object"
                  ? item.jenis_biaya_id.jenis_biaya_id
                  : item.jenis_biaya_id,
              gudang_id:
                typeof item.gudang_id === "object"
                  ? item.gudang_id.gudang_id
                  : item.gudang_id,
              mata_uang_id:
                typeof item.mata_uang_id === "object"
                  ? item.mata_uang_id.mata_uang_id
                  : item.mata_uang_id,
              pembayaran_id:
                typeof item.pembayaran_id === "object"
                  ? item.pembayaran_id.pembayaran_id
                  : item.pembayaran_id,
              term_pembayaran_id:
                typeof item.term_pembayaran_id === "object"
                  ? item.term_pembayaran_id.term_pembayaran_id
                  : item.term_pembayaran_id,
              jenis_kendaraan_id:
                typeof item.jenis_kendaraan_id === "object"
                  ? item.jenis_kendaraan_id.jenis_kendaraan_id
                  : item.jenis_kendaraan_id,
              satuan_id_dimensi:
                typeof item.satuan_id_dimensi === "object"
                  ? item.satuan_id_dimensi.satuan_id
                  : item.satuan_id_dimensi,
              satuan_id_volume:
                typeof item.satuan_id_volume === "object"
                  ? item.satuan_id_volume.satuan_id
                  : item.satuan_id_volume,
            };
          }
        );

      formData.kontrak_lastmile_atcost_pelanggan_details =
        this.parameters.form.kontrak_lastmile_atcost_pelanggan_details.map(
          (item) => {
            return {
              ...item,
              kontrak_lastmile_pelanggan_atcost_detail_id:
                typeof item.kontrak_lastmile_pelanggan_atcost_detail_id ===
                "object"
                  ? item.kontrak_lastmile_pelanggan_atcost_detail_id
                      .kontrak_lastmile_pelanggan_atcost_detail_id
                  : item.kontrak_lastmile_pelanggan_atcost_detail_id,
              jenis_kontrak_id:
                typeof item.jenis_kontrak_id === "object"
                  ? item.jenis_kontrak_id.jenis_kontrak_id
                  : item.jenis_kontrak_id,
              divisi_id:
                typeof item.divisi_id === "object"
                  ? item.divisi_id.divisi_id
                  : item.divisi_id,
              jenis_biaya_id:
                typeof item.jenis_biaya_id === "object"
                  ? item.jenis_biaya_id.jenis_biaya_id
                  : item.jenis_biaya_id,
              gudang_id:
                typeof item.gudang_id === "object"
                  ? item.gudang_id.gudang_id
                  : item.gudang_id,
              mata_uang_id:
                typeof item.mata_uang_id === "object"
                  ? item.mata_uang_id.mata_uang_id
                  : item.mata_uang_id,
              pembayaran_id:
                typeof item.pembayaran_id === "object"
                  ? item.pembayaran_id.pembayaran_id
                  : item.pembayaran_id,
              term_pembayaran_id:
                typeof item.term_pembayaran_id === "object"
                  ? item.term_pembayaran_id.term_pembayaran_id
                  : item.term_pembayaran_id,
              jenis_kendaraan_id:
                typeof item.jenis_kendaraan_id === "object"
                  ? item.jenis_kendaraan_id.jenis_kendaraan_id
                  : item.jenis_kendaraan_id,
              lokasi_id:
                typeof item.lokasi_id === "object"
                  ? item.lokasi_id.lokasi_id
                  : item.lokasi_id,
              // satuan_id_luas:
              //   typeof item.satuan_id_luas === "object"
              //     ? item.satuan_id_luas.satuan_id
              //     : item.satuan_id_luas,
              // satuan_id_waktu:
              //   typeof item.satuan_id_waktu === "object"
              //     ? item.satuan_id_waktu.satuan_id
              //     : item.satuan_id_waktu,
            };
          }
        );

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        method: this.isEditable ? "put" : "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " + (this.isEditable ? "Update" : "Tambah")
          );
          if (!this.isEditable) {
            this.parameters.form = this.default_form;
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },
  },
};
</script>
