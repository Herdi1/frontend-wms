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
                  label: 'Vendor',
                  optionLabel: 'nama_vendor',
                  lookup: lookup_custom1,
                  value: parameters.form.vendor_id,
                  onGet: onGetVendor,
                  isLoadingL: isLoadingGetVendor,
                  input: onSelectVendor,
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
              <label for="keterangan" class="w-1/2 pt-1">Keterangan</label>
              <textarea
                placeholder="Keterangan"
                class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                v-model="parameters.form.keterangan"
              ></textarea>
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
        { name: "Kontrak Lastmile Jarak", slotName: "KontrakLastmileJarak" },
        { name: "Kontrak Lastmile Ritase", slotName: "KontrakLastmileRitase" },
        { name: "Kontrak Lastmile Berat", slotName: "KontrakLastmileBerat" },
        { name: "Kontrak Lastmile Atcost", slotName: "KontrakLastmileAtcost" },
      ],

      id,

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearchUser: false,
      isLoadingGetUser: false,
      user_search: "",

      isStopSearchJenisKontrak: false,
      isLoadingGetJenisKontrak: false,
      jenis_kontrak_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Kontrak Vendor Lastmile",
      parameters: {
        url: "finance/kontrak-lastmile",
        form: {
          no_referensi: "",
          vendor_id: "",
          tanggal_kontrak: "",
          tanggal_berlaku: "",
          tanggal_berhenti: "",
          keterangan: "",
          status_kontrak: "",
          user_id_pic: "",
          jenis_kontrak_id: "",
          kontrak_lastmile_jarak_details: [],
          kontrak_lastmile_ritase_details: [],
          kontrak_lastmile_berat_details: [],
          kontrak_lastmile_atcost_details: [],

          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },
      default_form: {
        no_referensi: "",
        vendor_id: "",
        tanggal_kontrak: "",
        tanggal_berlaku: "",
        tanggal_berhenti: "",
        keterangan: "",
        status_kontrak: "",
        user_id_pic: "",
        jenis_kontrak_id: "",
        kontrak_lastmile_jarak_details: [],
        kontrak_lastmile_ritase_details: [],
        kontrak_lastmile_berat_details: [],
        kontrak_lastmile_atcost_details: [],

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
            item !== "kontrak_lastmile_jarak_details" &&
            item !== "kontrak_lastmile_ritase_details" &&
            item !== "kontrak_lastmile_berat_details" &&
            item !== "kontrak_lastmile_atcost_details"
          ) {
            this.parameters.form[item] = res.data[item];
          }
        });

        this.parameters.form.kontrak_lastmile_jarak_details =
          res.data.kontrak_lastmile_jarak_details.map((item) => {
            return {
              ...item,
            };
          });
        this.parameters.form.kontrak_lastmile_ritase_details =
          res.data.kontrak_lastmile_ritase_details.map((item) => {
            return {
              ...item,
            };
          });
        this.parameters.form.kontrak_lastmile_berat_details =
          res.data.kontrak_lastmile_berat_details.map((item) => {
            return {
              ...item,
            };
          });
        this.parameters.form.kontrak_lastmile_atcost_details =
          res.data.kontrak_lastmile_atcost_details.map((item) => {
            return {
              ...item,
            };
          });
      }
    } catch (error) {
      this.$router.back();
      // console.log("error", error);
    }
  },

  async mounted() {
    await this.onSearchVendor();
    await this.onSearchUser();
    await this.onSearchJenisKontrak();

    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //vendor
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

    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom1",
          query:
            "?search=" +
            this.vendor_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
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

    onSelectVendor(item) {
      if (item) {
        this.parameters.form.vendor_id = item;
      } else {
        this.parameters.form.vendor_id = "";
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
  },
};
</script>
