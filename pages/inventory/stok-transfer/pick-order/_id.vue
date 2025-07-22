<template>
  <section class="section">
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
            class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="w-full pt-3 mb-3">
              <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-bold">Pick Order Stok Transfer</h1>
                <div class=" "></div>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-1 w-[60%] mb-7">
              <div class="form-group">
                <input-horizontal
                  label="Kode Stoko Transfer"
                  type="text"
                  name="kode_stok_transfer"
                  labelWidth="w-[40%]"
                  inputWidth="w-[60%]"
                  :isHorizontal="true"
                  v-model="form.kode_stok_transfer"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div class="form-group">
                <input-horizontal
                  label="Tanggal"
                  type="date"
                  name="tanggal"
                  labelWidth="w-[40%]"
                  inputWidth="w-[60%]"
                  :isHorizontal="true"
                  v-model="form.tanggal"
                  :required="true"
                />
              </div>

              <select-button
                :self="{
                  label: 'Staff',
                  optionLabel: 'nama_staff',
                  isLoading: isLoadingGetStaff,
                  lookup: lookup_suppliers,
                  onGet: onGetStaff,
                  value: form.staff_id,
                  input: onSelectStaff,
                }"
                width="w-[60%]"
                :required="true"
              />

              <select-button
                :self="{
                  label: 'Peralatan',
                  optionLabel: 'nama_peralatan',
                  isLoading: isLoadingGetPeralatan,
                  lookup: lookup_products,
                  onGet: onGetPeralatan,
                  value: form.peralatan_id,
                  input: onSelectPeralatan,
                }"
                width="w-[60%]"
                :required="true"
              />

              <div class="form-group flex items-top">
                <label for="" class="w-[40%]">Keterangan</label>
                <textarea
                  placeholder="Keterangan"
                  class="w-[60%] pl-2 py-1 border rounded focus:outline-none"
                  v-model="form.keterangan"
                ></textarea>
                <!-- <input-horizontal
                  label="Keterangan"
                  type="text"
                  name="keterangan"
                  labelWidth="w-[40%]"
                  inputWidth="w-[60%]"
                  :isHorizontal="true"
                  v-model="form.keterangan"
                  :disabled="true"
                /> -->
              </div>
            </div>

            <tab-component class="mt-5" :tabs="tabs">
              <template #DetailPickOrder>
                <DetailPickOrder :self="{ form }" />
              </template>
              <template #BiayaPickOrder>
                <BiayaPickOrder :self="{ form }" />
              </template>
            </tab-component>
            <modal-footer-section
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
              class="m-5"
            />
          </div>
        </form>
      </ValidationObserver>
      <success-modal
        v-model="showModal"
        :message="`Data Berhasil ${
          isEditable ? 'Diedit' : 'Disimpan'
        }! Cetak Label?`"
      >
        <template #footer>
          <div class="flex justify-center gap-3">
            <button
              class="bg-orange-500 hover:bg-orange-400 p-2 rounded-md text-white"
              @click="onCloseModal"
            >
              Kembali
            </button>
            <button
              class="bg-green-500 hover:bg-green-400 p-2 rounded-md text-white"
              @click="onPrintLabel"
            >
              Cetak Label
            </button>
          </div>
        </template>
      </success-modal>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";
import DetailPickOrder from "./DetailPickOrder.vue";
import BiayaPickOrder from "./BiayaPickOrder.vue";

export default {
  components: {
    DetailPickOrder,
    BiayaPickOrder,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        { name: "Detail Pick Order", slotName: "DetailPickOrder" },
        { name: "Biaya Pick Order", slotName: "BiayaPickOrder" },
      ],

      id,

      isStopSearchStaff: false,
      isLoadingGetStaff: false,
      staff_search: "",

      isStopSearchPeralatan: false,
      isLoadingGetPeralatan: false,
      peralatan_search: "",

      isStopSearchSatuan: false,
      isLoadingGetSatuan: false,
      satuan_search: "",

      user: this.$auth.user,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Konfirmasi Stok Transfer",
      url: "inventory/konfirmas-stok-transfer",

      form: {
        pick_order_stok_transfer_id: "",
        kode_pick_order_stok_transfer: "",
        tanggal: "",
        staff_id: "",
        peralatan_id: "",
        keterangan: "",
        detail_pick_order_stok_transfer: [],
        biaya_pick_order_stok_transfer: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      default_form: {
        pick_order_stok_transfer_id: "",
        kode_pick_order_stok_transfer: "",
        tanggal: "",
        staff_id: "",
        peralatan_id: "",
        keterangan: "",
        detail_pick_order_stok_transfer: [],
        biaya_pick_order_stok_transfer: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      showModal: false,
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(
          `inventory/pick-order-stok-transfer/${this.id}`
        );
        Object.keys(this.form).forEach((item) => {
          if (
            item != "detail_pick_order_stok_transfer" &&
            item != "biaya_pick_order_stok_transfer"
          ) {
            this.form[item] = res.data[item];
          }
        });

        this.form.detail_pick_order_stok_transfer =
          res.data.detail_pick_order_stok_transfer.map((item) => {
            return {
              ...item,
              detail_pick_order_stok_transfer_id: item || "",
              pick_request_id: item.pick_request,
              item_gudang_id: item.item_gudang,
              zona_gudang_id_tujuan: item.zona_gudang_tujuan,
            };
          });

        this.form.biaya_pick_order_stok_transfer =
          res.data.biaya_pick_order_stok_transfer.map((item) => {
            return {
              ...item,
              biaya_pick_order_stok_transfer_id: item || "",
              jenis_biaya_id: item.jenis_biaya,
              coa_id: item.coa,
              divisi_id: item.divisi,
              vendor_id: item.vendor,
            };
          });

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/inventory/stok-transfer/pick-order");
    }
  },

  async mounted() {
    // await this.onSearchItemGudang();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_suppliers",
      "lookup_products",
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
      console.log("user agent", this.form.user_agent);
      console.log("device", this.form.device);
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.longitude = position.coords.longitude.toString();
            this.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
            console.log(
              "latitude",
              this.form.latitude,
              "longitude",
              this.form.longitude
            );
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

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "inventory/pick-order-stok-transfer";

      let formData = {
        ...this.form,
        staff_id:
          typeof this.form.staff_id === "object"
            ? this.form.staff_id.staff_id
            : "",
        peralatan_id:
          typeof this.form.peralatan_id === "object"
            ? this.form.peralatan_id.peralatan_id
            : "",
      };

      formData.detail_pick_order_stok_transfer =
        formData.detail_pick_order_stok_transfer.map((item) => {
          return {
            ...item,
            pick_request_id:
              typeof item.pick_request_id === "object"
                ? item.pick_request_id.pick_request_id
                : "",
            item_gudang_id:
              typeof item.item_gudang_id === "object"
                ? item.item_gudang_id.item_gudang_id
                : "",
            zona_gudang_id_tujuan:
              typeof item.zona_gudang_id_tujuan === "object"
                ? item.zona_gudang_id_tujuan.zona_gudang_id_tujuan
                : "",
          };
        });

      formData.biaya_pick_order_stok_transfer =
        formData.biaya_pick_order_stok_transfer.map((item) => {
          return {
            ...item,
            jenis_biaya_id:
              typeof item.jenis_biaya_id === "object"
                ? item.jenis_biaya_id.jenis_biaya_id
                : "",
            coa_id: typeof item.coa_id === "object" ? item.coa_id.coa_id : "",
            divisi_id:
              typeof item.divisi_id === "object"
                ? item.divisi_id.divisi_id
                : "",
            vendor_id:
              typeof item.vendor_id === "object"
                ? item.vendor_id.vendor_id
                : "",
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
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );

          if (!this.isEditable) {
            this.form = this.default_form;
          }
          this.showModal = true;
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    addDetailTransfer() {
      this.form.detail_stok_transfer.push({
        detail_stok_transfer_id: "",
        item_gudang_id: "",
        quantity: "",
        satuan_id: "",
        keterangan: "",
      });
    },

    deleteDetailTransfer(index) {
      this.form.detail_stok_transfer = this.form.detail_stok_transfer.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },
    // get  gudang
    onGetStaff(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchStaff);

      this.isStopSearchStaff = setTimeout(() => {
        this.staff_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchStaff();
      }, 600);
    },

    async onSearchStaff() {
      if (!this.isLoadingGetStaff) {
        this.isLoadingGetStaff = true;

        await this.lookUp({
          url: "master/staff/get-staff",
          lookup: "suppliers",
          query:
            "?search=" +
            this.staff_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetStaff = false;
      }
    },

    onSelectStaff(item) {
      if (item) {
        this.form.staff_id = item;
      } else {
        this.form.staff_id = "";
      }
    },

    // get  gudang
    onGetPeralatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPeralatan);

      this.isStopSearchPeralatan = setTimeout(() => {
        this.peralatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_products.current_page = isNext
            ? this.lookup_products.current_page + 1
            : this.lookup_products.current_page - 1;
        } else {
          this.lookup_products.current_page = 1;
        }

        this.onSearchPeralatan();
      }, 600);
    },

    async onSearchPeralatan() {
      if (!this.isLoadingGetPeralatan) {
        this.isLoadingGetPeralatan = true;

        await this.lookUp({
          url: "master/peralatan/get-peralatan",
          lookup: "products",
          query:
            "?search=" +
            this.peralatan_search +
            "&page=" +
            this.lookup_products.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPeralatan = false;
      }
    },

    onSelectPeralatan(item) {
      if (item) {
        this.form.peralatan_id = item;
      } else {
        this.form.peralatan_id = "";
      }
    },

    // get item gudang
    // onGetItemGudang(search, isNext) {
    //   if (!search.length && typeof isNext === "function") return false;

    //   clearTimeout(this.isStopSearchItemGudang);

    //   this.isStopSearchItemGudang = setTimeout(() => {
    //     this.item_gudang_search = search;

    //     if (typeof isNext !== "function") {
    //       this.lookup_products.current_page = isNext
    //         ? this.lookup_products.current_page + 1
    //         : this.lookup_products.current_page - 1;
    //     } else {
    //       this.lookup_products.current_page = 1;
    //     }

    //     this.onSearchItemGudang();
    //   }, 600);
    // },

    // async onSearchItemGudang() {
    //   if (!this.isLoadingGetItemGudang) {
    //     this.isLoadingGetItemGudang = true;

    //     await this.lookUp({
    //       url: "master/item-gudang/get-item-gudang",
    //       lookup: "products",
    //       query:
    //         "?search=" +
    //         this.item_gudang_search +
    //         "&gudang_id=" +
    //         this.form.gudang_id_penerima +
    //         "&page=" +
    //         this.lookup_products.current_page +
    //         "&per_page=10",
    //     });

    //     this.isLoadingGetItemGudang = false;
    //   }
    // },

    // onSelectItemGudang(item, index) {
    //   if (item) {
    //     this.form.detail_stok_transfer[index].item_gudang_id = item;
    //     this.form.detail_stok_transfer[index].satuan = item.satuan
    //       ? item.satuan.nama_satuan
    //       : "";
    //   } else {
    //     this.form.detail_stok_transfer[index].item_gudang_id = "";
    //     this.form.detail_stok_transfer[index].satuan = "";
    //   }
    // },
  },
};
</script>
