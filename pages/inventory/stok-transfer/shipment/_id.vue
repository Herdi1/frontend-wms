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
            <div>
              <input-horizontal
                label="Kode Shipment"
                type="text"
                name="kode_shipment"
                labelWidth="w-[40%]"
                inputWidth="w-[60%]"
                :isHorizontal="true"
                v-model="parameters.form.kode_shipment"
                :required="false"
              />
            </div>
            <div>
              <input-horizontal
                label="Tanggal"
                type="date"
                name="tanggal"
                labelWidth="w-[40%]"
                inputWidth="w-[60%]"
                :isHorizontal="true"
                v-model="parameters.form.tanggal"
                :required="false"
              />
            </div>
            <div>
              <input-horizontal
                label="Nomor Referensi"
                type="text"
                name="nomor_referensi"
                labelWidth="w-[40%]"
                inputWidth="w-[60%]"
                :isHorizontal="true"
                v-model="parameters.form.no_referensi"
                :required="false"
              />
            </div>
            <div>
              <input-horizontal
                label="Nomor Referensi 2"
                type="text"
                name="nomor_referensi_2"
                labelWidth="w-[40%]"
                inputWidth="w-[60%]"
                :isHorizontal="true"
                v-model="parameters.form.no_referensi_2"
                :required="false"
              />
            </div>
            <div>
              <select-button
                :self="{
                  label: 'Gudang',
                  optionLabel: 'nama_gudang',
                  isLoading: isLoadingGetGudang,
                  lookup: lookup_custom1,
                  onGet: onGetGudang,
                  value: parameters.form.gudang_id,
                  input: onSelectGudang,
                }"
                width="w-[60%]"
                :required="false"
              />
            </div>
            <div>
              <select-button
                :self="{
                  label: 'Pengemudi',
                  optionLabel: 'nama_pengemudi',
                  isLoading: isLoadingGetPengemudi,
                  lookup: lookup_custom2,
                  onGet: onGetPengemudi,
                  value: parameters.form.pengemudi_id,
                  input: onSelectPengemudi,
                }"
                width="w-[60%]"
                :required="false"
              />
            </div>
            <div>
              <select-button
                :self="{
                  label: 'Kendaraan',
                  optionLabel: 'nama_kendaraan',
                  isLoading: isLoadingGetKendaraan,
                  lookup: lookup_custom3,
                  onGet: onGetKendaraan,
                  value: parameters.form.kendaraan_id,
                  input: onSelectKendaraan,
                }"
                width="w-[60%]"
                :required="false"
              />
            </div>
            <div>
              <input-horizontal
                label="Keterangan"
                type="text"
                name="keterangan"
                labelWidth="w-[40%]"
                inputWidth="w-[60%]"
                :isHorizontal="true"
                v-model="parameters.form.keterangan"
                :required="false"
              />
            </div>
          </div>
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

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchPengemudi: false,
      isLoadingGetPengemudi: false,
      pengemudi_search: "",

      isStopSearchKendaraan: false,
      isLoadingGetKendaraan: false,
      kendaraan_search: "",

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Shipment Stok Transfer",
      parameters: {
        url: "inventory/stok-transfer/shipment",
        form: {
          kode_shipment: "",
          tanggal: "",
          no_referensi: "",
          no_referensi_2: "",
          keterangan: "",
          gudang_id: "",
          kendaraan_id: "",
          pengemudi_id: "",
          detail_produk: [],
          lastMile: [],

          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await rhis.$axios.get(
          `inventory/stok-transfer/shipment/${this.id}`
        );
        Object.keys(this.parameters.form).forEach((item) => {
          if (item !== "detail_produk" && item !== "lastMile") {
            this.parameters.form[item] = res.data[item];
          }
        });
        // this.parameters.form = res.data;
        // this.parameters.form.gudang_id = res.data.gudang_id;
        // this.parameters.form.kendaraan_id = res.data.kendaraan_id;
        // this.parameters.form.pengemudi_id = res.data.pengemudi_id;
        this.parameters.form.detail_produk = res.data.detail_produk.map(
          (item) => {
            return {
              ...item,
              detail_produk_id: item || "",
            };
          }
        );
        this.parameters.form.lastMile = res.data.lastMile.map((item) => {
          return {
            ...item,
            lastMile_id: item || "",
          };
        });
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
      // console.log("error",error);
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchPengemudi();
    await this.onSearchKendaraan();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", // gudang
      "lookup_custom2", // pengemudi
      "lookup_custom3", // kendaraan
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.form.user_agent = navigator.userAgent;
      if (this.form.user_agent.includes("Mobile")) {
        this.form.device = "Mobile";
      } else if (this.form.user_agent.includes("Tablet")) {
        this.form.device = "Tablet";
      } else {
        this.form.device = "Desktop";
      }
      // console.log("user agent", this.form.user_agent);
      // console.log("device", this.form.device);
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.longitude = position.coords.longitude.toString();
            this.form.latitude = position.coords.latitude.toString();
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

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    onGetPengemudi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPengemudi);

      this.isStopSearchPengemudi = setTimeout(() => {
        this.pengemudi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchPengemudi();
      }, 600);
    },

    async onSearchPengemudi() {
      if (!this.isLoadingGetPengemudi) {
        this.isLoadingGetPengemudi = true;

        await this.lookUp({
          url: "master/pengemudi/get-pengemudi",
          lookup: "custom2",
          query:
            "?search=" +
            this.pengemudi_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPengemudi = false;
      }
    },

    onGetKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKendaraan);

      this.isStopSearchKendaraan = setTimeout(() => {
        this.kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchKendaraan();
      }, 600);
    },

    async onSearchKendaraan() {
      if (!this.isLoadingGetKendaraan) {
        this.isLoadingGetKendaraan = true;

        await this.lookUp({
          url: "master/kendaraan/get-kendaraan",
          lookup: "custom3",
          query:
            "?search=" +
            this.kendaraan_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKendaraan = false;
      }
    },

    onSelectGudang(item) {
      if (item) {
        this.parameters.form.gudang_id = item;
      } else {
        this.parameters.form.gudang_id = "";
      }
    },

    onSelectPengemudi(item) {
      if (item) {
        this.parameters.form.pengemudi_id = item;
      } else {
        this.parameters.form.pengemudi_id = "";
      }
    },

    onSelectKendaraan(item) {
      if (item) {
        this.parameters.form.kendaraan_id = item;
      } else {
        this.parameters.form.kendaraan_id = "";
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "inventory/stok-transfer/shipment";

      let formData = {
        ...this.parameters.form,
        gudang_id:
          typeof this.parameters.form.gudang_id === "object"
            ? this.parameters.form.gudang_id.gudang_id
            : "",
        pengemudi_id:
          typeof this.parameters.form.pengemudi_id === "object"
            ? this.parameters.form.pengemudi_id.pengemudi_id
            : "",
        kendaraan_id:
          typeof this.parameters.form.kendaraan_id === "object"
            ? this.parameters.form.kendaraan_id.kendaraan_id
            : "",
      };

      if (this.isEditable) {
        url += `/${this.id}`;
      }

      this.$axios({
        method: this.isEditable ? "put" : "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );

          if (!this.isEditable) {
            this.parameters.form = {
              kode_shipment: "",
              tanggal: "",
              no_referensi: "",
              no_referensi_2: "",
              keterangan: "",
              gudang_id: "",
              kendaraan_id: "",
              pengemudi_id: "",
              detail_produk: [],
              lastMile: [],

              user_agent: "",
              device: "",
              longitude: "",
              latitude: "",
            };
          }
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
