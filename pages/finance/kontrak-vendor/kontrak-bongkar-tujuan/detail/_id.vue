<template>
  <section class="section min-h-screen">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 class="text-xl font-bold mb-2 uppercase">
          Detaili Kontrak Bongkar Tujuan
        </h1>
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
                :disabled="true"
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
                :disabled="true"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'Gudang',
                  optionLabel: 'nama_gudang',
                  lookup: lookup_custom6,
                  value: parameters.form.gudang_id,
                  onGet: onGetGudang,
                  isLoadingL: isLoadingGetGudang,
                  input: onSelectGudang,
                }"
                width="w-[50%]"
                class="mb-5"
                :disabled="true"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Kontrak"
                type="date"
                name="tanggal_kontrak"
                v-model="parameters.form.tanggal_kontrak"
                :required="false"
                :disabled="true"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Berlaku"
                type="date"
                name="tanggal_berlaku"
                v-model="parameters.form.tanggal_berlaku"
                :disabled="true"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Berhenti"
                type="date"
                name="tanggal_berhenti"
                v-model="parameters.form.tanggal_berhenti"
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
                class="mb-5"
              />
            </div>
            <div class="form-group flex justify-between items-start">
              <label for="" class="w-1/2">Status Kontrak</label>
              <select
                v-model="parameters.form.status_kontrak"
                :disabled="true"
                name=""
                id=""
                class="pl-2 py-1 border border-gray-300 rounded focus:outline-none w-1/2"
              >
                <option value="FISIK">Fisik</option>
                <option value="VIRTUAL">Virtual</option>
              </select>
            </div>
            <div class="form-group flex justify-between">
              <label for="keterangan" class="w-1/2 pt-1">Keterangan</label>
              <textarea
                :disabled="true"
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
              <template #KontrakBongkarTujuanDetails>
                <KontrakBongkarTujuanDetails :self="{ parameters }" />
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
import KontrakBongkarTujuanDetails from "./KontrakBongkarTujuanDetails.vue";
export default {
  props: ["self"],

  components: {
    KontrakBongkarTujuanDetails,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        {
          name: "Detail Kontrak Bongkar Tujuan",
          slotName: "KontrakBongkarTujuanDetails",
        },
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

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Kontrak Vendor Bongkar Tujuan",
      parameters: {
        url: "finance/kontrak-bongkar-tujuan",
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
          kontrak_bongkar_tujuan_details: [],

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
        kontrak_bongkar_tujuan_details: [],

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
          if (item !== "kontrak_bongkar_tujuan_details") {
            this.parameters.form[item] = res.data[item];
          }
        });

        this.parameters.form.vendor_id = res.data.vendor ?? "";
        this.parameters.form.user_id_pic = res.data.user_pic ?? "";
        this.parameters.form.jenis_kontrak_id = res.data.jenis_kontrak ?? "";
        this.parameters.form.gudang_id = res.data.gudang ?? "";

        this.parameters.form.kontrak_bongkar_tujuan_details =
          res.data.kontrak_bongkar_tujuan_details.map((item) => {
            return {
              ...item,
              kontrak_bongkar_tujuan_detail_id:
                item.kontrak_bongkar_tujuan_detail_id
                  ? item.kontrak_bongkar_tujuan_detail_id
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
              group_item_id: item.group_item ? item.group_item : "",
              item_gudang_id: item.item_gudang ? item.item_gudang : "",
              satuan_id: item.satuan ? item.satuan : "",
            };
          });

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    // await this.onSearchVendor();
    // await this.onSearchUser();
    // await this.onSearchJenisKontrak();
    // await this.onSearchGudang();

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
      "lookup_custom6", //gudang
      "lookup_mesin", //item gudang
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

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom6",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
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

    async onSelectGudang(item) {
      if (item) {
        this.parameters.form.gudang_id = item;
        await this.onSearchItemGudang();
      } else {
        this.parameters.form.gudang_id = "";
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = this.parameters.url;

      let formData = {
        ...this.parameters.form,
        vendor_id:
          typeof this.parameters.form.vendor_id === "object"
            ? this.parameters.form.vendor_id.vendor_id ?? ""
            : this.parameters.form.vendor_id ?? "",
        user_id_pic:
          typeof this.parameters.form.user_id_pic === "object"
            ? this.parameters.form.user_id_pic.user_id ?? ""
            : this.parameters.form.user_id_pic ?? "",
        jenis_kontrak_id:
          typeof this.parameters.form.jenis_kontrak_id === "object"
            ? this.parameters.form.jenis_kontrak_id.jenis_kontrak_id ?? ""
            : this.parameters.form.jenis_kontrak_id ?? "",
        gudang_id:
          typeof this.parameters.form.gudang_id === "object"
            ? this.parameters.form.gudang_id.gudang_id ?? ""
            : this.parameters.form.gudang_id ?? "",
      };

      formData.kontrak_bongkar_tujuan_details =
        this.parameters.form.kontrak_bongkar_tujuan_details.map((item) => {
          return {
            ...item,
            kontrak_bongkar_tujuan_detail_id:
              typeof item.kontrak_bongkar_tujuan_detail_id === "object"
                ? item.kontrak_bongkar_tujuan_detail_id
                    .kontrak_bongkar_tujuan_detail_id
                : "",
            jenis_kontrak_id:
              typeof item.jenis_kontrak_id === "object"
                ? item.jenis_kontrak_id.jenis_kontrak_id ?? ""
                : item.jenis_kontrak_id ?? "",
            divisi_id:
              typeof item.divisi_id === "object"
                ? item.divisi_id.divisi_id ?? ""
                : item.divisi_id ?? "",
            jenis_biaya_id:
              typeof item.jenis_biaya_id === "object"
                ? item.jenis_biaya_id.jenis_biaya_id ?? ""
                : item.jenis_biaya_id ?? "",
            gudang_id:
              typeof item.gudang_id === "object"
                ? item.gudang_id.gudang_id ?? ""
                : item.gudang_id ?? "",
            mata_uang_id:
              typeof item.mata_uang_id === "object"
                ? item.mata_uang_id.mata_uang_id ?? ""
                : item.mata_uang_id ?? "",
            pembayaran_id:
              typeof item.pembayaran_id === "object"
                ? item.pembayaran_id.pembayaran_id ?? ""
                : item.pembayaran_id ?? "",
            term_pembayaran_id:
              typeof item.term_pembayaran_id === "object"
                ? item.term_pembayaran_id.term_pembayaran_id ?? ""
                : item.term_pembayaran_id ?? "",
            group_item_id:
              typeof item.group_item_id === "object"
                ? item.group_item_id.group_item_id ?? ""
                : item.group_item_id ?? "",
            item_gudang_id:
              typeof item.item_gudang_id === "object"
                ? item.item_gudang_id.item_gudang_id ?? ""
                : item.item_gudang_id ?? "",
            item_id: item.item_gudang_id.item_id
              ? item.item_gudang_id.item_id ?? ""
              : item.item_id ?? "",
            satuan_id:
              typeof item.satuan_id === "object"
                ? item.satuan_id.satuan_id ?? ""
                : item.satuan_id ?? "",
          };
        });

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

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "mesin",
          query:
            "?search=" +
            this.item_gudang_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_mesin.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },
  },
};
</script>
