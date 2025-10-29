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
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
              <div class="form-group" v-if="isEditable">
                <input-horizontal
                  label="Kode Pick Request"
                  type="text"
                  name="kode_pick_request"
                  :isHorizontal="true"
                  v-model="parameters.form.kode_pick_request"
                  :required="false"
                  :disabled="true"
                />
              </div>

              <ValidationProvider name="lokasi">
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
                  required="true"
                />
              </ValidationProvider>

              <div class="form-group">
                <input-horiontal
                  label="Nama Request"
                  type="text"
                  name="nama_peminta"
                  v-model="parameters.form.nama_peminta"
                  :required="false"
                />
              </div>

              <div class="w-full">
                <select-button
                  :self="{
                    label: 'Gudang',
                    optionLabel: 'nama_gudang',
                    lookup: lookup_roles,
                    value: parameters.form.gudang_id,
                    onGet: onGetGudang,
                    isLoadingL: isLoadingGetGudang,
                    input: onSelectGudang,
                  }"
                  width="w-[50%]"
                  required="true"
                  :disabled="isEditable || lookup_roles.data.length == 1"
                />
                <!-- <ValidationProvider name="gudang" rules="required">
                  <div slot-scope="{ errors, valid }">
                    <div class="w-full flex justify-end">
                      <span
                        class="text-danger text-xs pl-1 w-1/2"
                        v-if="errors[0]"
                        >{{ errors[0] }}</span
                      >
                    </div>
                  </div>
                </ValidationProvider> -->
              </div>

              <ValidationProvider name="lokasi">
                <div class="flex">
                  <label for="" class="w-[50%]"
                    >Ship to <span class="text-danger">*</span></label
                  >
                  <v-select
                    label="nama_lokasi"
                    :loading="isLoadingGetLokasi"
                    :options="lookup_location.data"
                    :filterable="false"
                    @search="onGetLokasi"
                    v-model="parameters.form.lokasi_id"
                    @input="onSelectLokasi"
                    class="w-[50%] bg-white"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_location.data.length || search"
                    >
                      <span
                        v-if="lookup_location.current_page > 1"
                        @click="onGetLokasi(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_location.last_page >
                          lookup_location.current_page
                        "
                        @click="onGetLokasi(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
                <!-- <select-button
                  :self="{
                    label: 'Ship to',
                    optionLabel: 'nama_lokasi',
                    lookup: lookup_location,
                    value: parameters.form.lokasi_id,
                    onGet: onGetLokasi,
                    isLoadingL: isLoadingGetLokasi,
                    input: onSelectLokasi,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                  :required="true"
                /> -->
              </ValidationProvider>

              <!-- <div class="form-group">
                <input-horizontal
                  label="Sales"
                  type="text"
                  name="sales"
                  :isHorizontal="true"
                  v-model="parameters.form.sales"
                  :required="false"
                />
              </div> -->
              <!-- <div class="form-group">
                <input-horizontal
                  label="Doc Type External"
                  type="text"
                  name="doc_type_external"
                  :isHorizontal="true"
                  v-model="parameters.form.doc_type_external"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horizontal
                  label="Kode External"
                  type="text"
                  name="kode_external"
                  :isHorizontal="true"
                  v-model="parameters.form.kode_external"
                  :required="false"
                />
              </div> -->
              <div class="form-group">
                <input-horiontal
                  label="Nomor Referensi"
                  type="text"
                  name="no_referensi_1"
                  v-model="parameters.form.no_referensi_1"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Nomor Referensi 2"
                  type="text"
                  name="no_referensi_2"
                  v-model="parameters.form.no_referensi_2"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Nomor Referensi 3"
                  type="text"
                  name="no_referensi_3"
                  v-model="parameters.form.no_referensi_3"
                  :required="false"
                />
              </div>
              <div class="form-group flex justify-between items-center">
                <label for="" class="w-1/2"
                  >Tanggal <span class="text-danger">*</span></label
                >
                <input
                  disabled
                  required
                  type="date"
                  step="1"
                  v-model="parameters.form.tanggal"
                  class="w-1/2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                />
              </div>

              <div class="form-group flex justify-between items-center">
                <label for="" class="w-1/2"
                  >Tanggal Request Ambil
                  <span class="text-danger">*</span></label
                >
                <input
                  required
                  type="datetime-local"
                  step="1"
                  v-model="parameters.form.tanggal_request_ambil"
                  class="w-1/2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                />
              </div>

              <div class="form-group flex justify-between items-center">
                <label for="" class="w-1/2"
                  >Tanggal Request Kirim
                  <span class="text-danger">*</span></label
                >
                <input
                  required
                  type="datetime-local"
                  step="1"
                  v-model="parameters.form.tanggal_request_kirim"
                  class="w-1/2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                />
              </div>
              <div class="flex px-1 items-center">
                <label for="jenis_kiriman" class="w-1/2">Jenis Kiriman</label>
                <select
                  name="jenis_kiriman"
                  id="jenis_kiriman"
                  v-model="parameters.form.jenis_kiriman"
                  class="w-1/2 outline-none p-1 rounded-sm border border-gray-300"
                >
                  <option value="FRC">Franco</option>
                  <option value="LCO">Locco</option>
                  <option value="SWC">Switch</option>
                </select>
              </div>

              <!-- <div class="form-group">
                <input-horiontal
                  label="Jenis Kendaraan"
                  type="text"
                  name="no_referensi_2"
                  v-model="parameters.form.no_referensi_2"
                  :required="false"
                />
              </div> -->
              <div class="form-group">
                <input-horiontal
                  label="Keterangan"
                  type="text"
                  name="keterangan"
                  v-model="parameters.form.keterangan"
                  :required="false"
                />
              </div>
            </div>
          </div>
          <DetailPickRequest ref="detailPickRequest" :self="{ parameters }" />

          <div class="w-full flex justify-start items-center">
            <modal-footer-section
              class="mt-5"
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
import DetailPickRequest from "./DetailPickRequest.vue";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      // isStopSearchVendor: false,
      // isLoadingGetVendor: false,
      // vendor_search: "",

      // isStopSearcnKendaraan: false,
      // isLoadingGetKendaraan: false,
      // kendaraan_search: "",

      // isStopSearchPengemudi: false,
      // isLoadingGetPengemudi: false,
      // pengemudi_search: "",

      // isStopSearchSupplier: false,
      // isLoadingGetSupplier: false,
      // supplier_search: "",

      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      // isStopSearchZonaGudang: false,
      // isLoadingGetZonaGudang: false,
      // zona_gudang_search: "",

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pick Request",
      parameters: {
        url: "outbound/pick-request",
        form: {
          pick_request_id: "",
          kode_pick_request: "",
          doc_type_external: "",
          kode_external: "",
          nama_peminta: "",
          pelanggan_id: "",
          tanggal: "",
          tanggal_request_kirim: "",
          tanggal_request_ambil: "",
          no_referensi_1: "",
          no_referensi_2: "",
          no_referensi_3: "",
          sales: "",
          lokasi_id: "",
          gudang_id: "",
          status_approve: "0",
          jenis_kiriman: "FRC",
          keterangan: "",

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",

          pick_request_details: [],
        },
      },
      formPickRequest: {
        pick_request_detail_id: "",
        item_id: "",
        item_gudang_id: "",
        quantity: "",
        keterangan: "",
      },
    };
  },

  components: {
    DetailPickRequest,
  },

  async created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    this.parameters.form.tanggal = formattedDate;
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`outbound/pick-request/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          this.parameters.form[item] = res.data[item];
        });
        this.parameters.form.jenis_kiriman = res.data.jenis_kiriman.trim();

        this.parameters.form.gudang_id = res.data.gudang || "";
        this.parameters.form.lokasi_id = res.data.lokasi || "";
        this.parameters.form.pelanggan_id = res.data.pelanggan || "";
        // this.onSelectKendaraan(res.data.kendaraan);
        // this.parameters.form.pengemudi_id = res.data.pengemudi || "";
        // this.onSelectPengemudi(res.data.pengemudi);

        this.parameters.form.pick_request_details =
          res.data.pick_request_details.map((item) => {
            return {
              ...item,
              pick_request_detail_id: item || null,
              item_gudang_id: item.item_gudang,
              item_id: item.item.item_id,
              valuation_id: item.valuation,
            };
          });

        this.isLoadingPage = false;
      }
    } catch (error) {
      // console.log("error", error);
      this.$router.back();
    }
  },

  async mounted() {
    // await this.onSearchVendor();
    // await this.onSearchKendaraan();
    // await this.onSearchPengemudi();
    // await this.onSearchSupplier();
    // await this.onSearchLokasi();
    await this.onSearchGudang();
    if (this.lookup_roles.data.length > 0) {
      await this.onSelectGudang(this.lookup_roles.data[0]);
    }
    await this.onSearchPelanggan();
    if (!this.isEditable) {
      if (this.lookup_custom1.data.length == 1) {
        this.onSelectPelanggan(this.lookup_custom1.data[0]);
      }
    }
    await this.onSearchItemGudang();
    this.getGeoLocation();
    this.getUserAgent();
    // if (this.lookup_custom4.data && !this.isEditable) {
    //   this.$refs.detailPickRequest.onSearchValuation(
    //     this.lookup_custom4.data[0] ?? ""
    //   );
    // }
    if (this.lookup_roles.data && !this.isEditable) {
      this.onSelectGudang(this.lookup_roles.data[0]);
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2", //kendaraan
      "lookup_custom3", //pengemudi
      "lookup_custom4", //valuation
      "lookup_suppliers", //suppliers
      "lookup_location", //lokasi
      "lookup_roles", //gudang
      "lookup_packing", //item
      // "lookup_department", //pelanggan
      "lookup_defects", //item gudang
      "lookup_regus", //zona gudang
      "lookup_beam", // get superadmin / no
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    addPickRequestDetail() {
      this.parameters.form.pick_request_details.push({
        ...this.formPickRequest,
      });
      this.resetFormPickRequest();
    },

    getUserAgent() {
      this.parameters.form.user_agent = navigator.userAgent;
      if (this.parameters.form.user_agent.includes("Mobile")) {
        this.parameters.form.device = "Mobile";
      } else if (this.parameters.form.user_agent.includes("Tablet")) {
        this.parameters.form.device = "Tablet";
      } else {
        this.parameters.form.device = "Desktop";
      }
      // console.log("user agent", this.parameters.form.user_agent);
      // console.log("device", this.parameters.form.device);
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
            //   this.parameters.form.latitude,
            //   "longitude",
            //   this.parameters.form.longitude
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

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "outbound/pick-request";

      // today's date
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      let newTanggal = this.formatDateTime(this.parameters.form.tanggal);
      let newTanggalAmbil = this.formatDateTime(
        this.parameters.form.tanggal_request_ambil
      );
      let newTanggalKirim = this.formatDateTime(
        this.parameters.form.tanggal_request_kirim
      );

      let error = false;

      this.parameters.form.pick_request_details.forEach((item) => {
        if (
          parseFloat(item.quantity) %
            parseFloat(item.item_gudang_id.satuan?.min_quantity) !==
          0.0
        ) {
          this.$toaster.error(
            "Quantity Item Tidak Sesuai Dengan Minimal Quantity"
          );
          error = true;
          return;
        }
      });

      if (error) {
        this.isLoadingForm = false;
        return;
      }

      let formData = {
        ...this.parameters.form,
        gudang_id:
          typeof this.parameters.form.gudang_id === "object"
            ? this.parameters.form.gudang_id.gudang_id
            : this.parameters.form.gudamg_id,
        pelanggan_id:
          typeof this.parameters.form.pelanggan_id === "object"
            ? this.parameters.form.pelanggan_id.pelanggan_id
            : this.parameters.form.pelanggan_id,
        lokasi_id:
          typeof this.parameters.form.lokasi_id === "object"
            ? this.parameters.form.lokasi_id.lokasi_id
            : this.parameters.form.lokasi_id,
        // vendor_id_transporter:
        //   typeof this.parameters.form.vendor_id_transporter === "object"
        //     ? this.parameters.form.vendor_id_transporter.vendor_id
        //     : "",
        // kendaraan_id:
        //   typeof this.parameters.form.kendaraan_id === "object"
        //     ? this.parameters.form.kendaraan_id.kendaraan_id
        //     : "",
        // pengemudi_id:
        //   typeof this.parameters.form.pengemudi_id === "object"
        //     ? this.parameters.form.pengemudi_id.pengemudi_id
        //     : "",
        tanggal: newTanggal,
        tanggal_request_ambil: newTanggalAmbil,
        tanggal_request_kirim: newTanggalKirim,
      };

      // formData.tanggal = formattedDate;

      formData.pick_request_details = formData.pick_request_details.map(
        (item) => {
          return {
            ...item,
            pick_request_detail_id:
              typeof item.pick_request_detail_id === "object"
                ? item.pick_request_detail_id.pick_request_detail_id
                : "",
            item_gudang_id:
              typeof item.item_gudang_id === "object"
                ? item.item_gudang_id.item_gudang_id
                : item.item_gudang_id,
            valuation_id:
              typeof item.valuation_id === "object"
                ? item.valuation_id.valuation_id
                : item.valuation_id,
            item_id: this.isEditable
              ? item.item_id
              : typeof item.item_gudang_id === "object"
              ? item.item_gudang_id.item_id
              : item.item_id,
          };
        }
      );

      if (this.isEditable) {
        url += "/" + this.id;
      }

      // console.log(formData);

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
              pick_request_id: "",
              kode_pick_request: "",
              doc_type_external: "",
              kode_external: "",
              nama_peminta: "",
              pelanggan_id: "",
              tanggal: "",
              tanggal_request_kirim: "",
              tanggal_request_ambil: "",
              no_referensi_1: "",
              no_referensi_2: "",
              no_referensi_3: "",
              sales: "",
              lokasi_id: "",
              gudang_id: "",
              status_approve: "0",
              keterangan: "",

              //Tracking
              user_agent: "",
              device: "",
              longitude: "",
              latitude: "",

              pick_request_details: [],
            };
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

    AddPickRequestDetail() {
      this.parameters.form.pick_request_details.push({
        item_id: "",
        item_gudang_id: "",
        quantity: "",
        keterangan: "",
      });
    },

    onDeleteItem(index) {
      this.parameters.form.pick_request_details =
        this.parameters.form.pick_request_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    // Get Lokasi
    onGetLokasi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchLokasi);

      this.isStopSearchLokasi = setTimeout(() => {
        this.lokasi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_location.current_page = isNext
            ? this.lookup_location.current_page + 1
            : this.lookup_location.current_page - 1;
        } else {
          this.lookup_location.current_page = 1;
        }

        this.onSearchLokasi();
      }, 600);
    },

    async onSearchLokasi() {
      if (!this.isLoadingGetLokasi) {
        this.isLoadingGetLokasi = true;

        await this.lookUp({
          url: "master/lokasi-by-gudang/get-lokasi-by-gudang",
          lookup: "location",
          query:
            "?search=" +
            this.lokasi_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_location.current_page +
            "&per_page=10",
        });

        this.isLoadingGetLokasi = false;
      }
    },

    //Get Gudang
    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang-user",
          lookup: "roles",
          query:
            "?search=" +
            this.gudang_search +
            "&user_id=" +
            this.user.user_id +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    //Get Item Pelanggan

    // Get Pelanggan
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

    // Get Item Gudang
    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_defects.current_page = isNext
            ? this.lookup_defects.current_page + 1
            : this.lookup_defects.current_page - 1;
        } else {
          this.lookup_defects.current_page = 1;
        }

        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "defects",
          query:
            "?search=" +
            this.item_gudang_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_defects.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },

    //select gudang
    async onSelectGudang(item) {
      if (item) {
        this.parameters.form.gudang_id = item;
        this.parameters.form.pick_request_details = [];
        await this.onSearchLokasi();
        await this.$refs.detailPickRequest.onSearchItemGudang();
        await this.$refs.detailPickRequest.onSearchValuation();
      } else {
        this.parameters.form.gudang_id = "";
      }
    },
    //select lokasi
    onSelectLokasi(item) {
      if (item) {
        this.parameters.form.lokasi_id = item;
      } else {
        this.parameters.form.lokasi_id = "";
      }
    },
    //select item gudang
    onSelectItemGudang(item, index) {
      if (item) {
        this.parameters.form.pick_request_details[index].item_gudang_id =
          item.item_gudang_id;
      } else {
        this.parameters.form.pick_request_details[index].item_gudang_id = "";
      }
    },
    //select pelanggan
    onSelectPelanggan(item) {
      if (item) {
        this.parameters.form.pelanggan_id = item;
      } else {
        this.parameters.form.pelanggan_id = "";
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        pick_request_id: "",
        kode_pick_request: "",
        doc_type_external: "",
        kode_external: "",
        nama_peminta: "",
        pelanggan_id: "",
        tanggal: "",
        tanggal_request_kirim: "",
        tanggal_request_ambil: "",
        no_referensi_1: "",
        no_referensi_2: "",
        no_referensi_3: "",
        sales: "",
        lokasi_id: "",
        gudang_id: "",
        status_approve: "0",
        keterangan: "",

        //Tracking
        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",

        pick_request_details: [],
      };
    },
    resetFormPickRequest() {
      this.formPickRequest = {
        detail_pick_request_id: "",
        item_id: "",
        item_pelanggan_id: "",
        item_gudang_id: "",
        quantity: "",
        quantity_order: "",
        quantity_termuat: "",
        quantity_terkirim: "",
        keterangan: "",
      };
    },

    formatDateTime(dateTime) {
      const dateObject = new Date(dateTime);

      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");
      const hours = String(dateObject.getHours()).padStart(2, "0");
      const minutes = String(dateObject.getMinutes()).padStart(2, "0");
      const seconds = String(dateObject.getSeconds()).padStart(2, "0");

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return formattedDateTime;
    },
  },
};
</script>
