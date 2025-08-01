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
            class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <div v-if="isEditable">
                <input-horizontal
                  label="Kode Shipment"
                  type="text"
                  name="kode_shipment"
                  :isHorizontal="true"
                  v-model="parameters.form.kode_shipment"
                  :disabled="true"
                />
              </div>
              <ValidationProvider name="gudang_id">
                <select-button
                  :self="{
                    label: 'Gudang',
                    optionLabel: 'nama_gudang',
                    lookup: lookup_warehouses,
                    value: parameters.form.gudang_id,
                    onGet: onGetGudang,
                    isLoadingL: isLoadingGetGudang,
                    input: onSelectGudang,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <div class="form-group">
                <input-horiontal
                  label="Nomor Referensi"
                  type="text"
                  name="no_referensi"
                  v-model="parameters.form.no_referensi"
                  :required="false"
                />
              </div>
              <!-- <div class="form-group">
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
              </div> -->
              <div class="form-group">
                <input-horiontal
                  label="Tanggal"
                  type="date"
                  name="tanggal"
                  v-model="parameters.form.tanggal"
                  :required="true"
                />
              </div>
              <ValidationProvider name="user_pic">
                <select-button
                  :self="{
                    label: 'User PIC',
                    optionLabel: 'nama_lengkap',
                    lookup: lookup_grade,
                    value: parameters.form.user_id_pic,
                    onGet: onGetUser,
                    isLoadingL: isLoadingGetUser,
                    input: onSelectUser,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <div class="form-group">
                <select-button
                  :self="{
                    label: 'Staff',
                    optionLabel: 'nama_lengkap',
                    lookup: lookup_beam,
                    value: parameters.form.staff_id,
                    onGet: onGetStaff,
                    isLoadingL: isLoadingGetStaff,
                    input: onSelectStaff,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                  :required="true"
                />
              </div>
              <ValidationProvider name="pengemudi_id">
                <select-button
                  :self="{
                    label: 'Pengemudi',
                    optionLabel: 'nama_pengemudi',
                    lookup: lookup_custom1,
                    value: parameters.form.pengemudi_id,
                    onGet: onGetPengemudi,
                    isLoadingL: isLoadingGetPengemudi,
                    input: onSelectPengemudi,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <ValidationProvider name="kendaraan_id">
                <select-button
                  :self="{
                    label: 'Kendaraan',
                    optionLabel: 'nama_kendaraan',
                    lookup: lookup_custom2,
                    value: parameters.form.kendaraan_id,
                    onGet: onGetKendaraan,
                    isLoadingL: isLoadingGetKendaraan,
                    input: onSelectKendaraan,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <ValidationProvider name="kendaraan_id">
                <select-button
                  :self="{
                    label: 'Jenis Kendaraan',
                    optionLabel: 'nama_jenis_kendaraan',
                    lookup: lookup_roles,
                    value: parameters.form.jenis_kendaraan_id,
                    onGet: onGetJenisKendaraan,
                    isLoadingL: isLoadingGetJenisKendaraan,
                    input: onSelectJenisKendaraan,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <div class="col-span-2 w-full px-1 mb-3">
                <label for="keterangan">Keterangan</label>
                <textarea
                  name="keterangan"
                  id="keterangan"
                  v-model="parameters.form.keterangan"
                  class="w-full outline-none p-1 rounded-md border border-gray-300"
                ></textarea>
              </div>
            </div>
          </div>

          <tab-component :tabs="tabs">
            <template #DetailShipment>
              <ShipmentDetails
                :self="{ parameters, onOpenModal, generateRuteShipment }"
              />
            </template>
            <template #RuteShipment>
              <RuteShipments :self="{ parameters }" />
            </template>
            <template #BiayaLastmile>
              <BiayaLastmiles :self="{ parameters }" />
            </template>
          </tab-component>

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
    <ModalPickOrder :self="this" ref="modalPickOrder" />
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
import ShipmentDetails from "./ShipmentDetails.vue";
import RuteShipments from "./RuteShipments.vue";
import BiayaLastmiles from "./BiayaLastmiles.vue";
import ModalPickOrder from "../../../../components/transaksional/ModalPickOrder.vue";
export default {
  props: ["self"],
  middleware: ["checkRoleUserDetail"],

  components: {
    ShipmentDetails,
    RuteShipments,
    BiayaLastmiles,
    ModalPickOrder,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        {
          name: "Detail Shipment",
          slotName: "DetailShipment",
        },
        {
          name: "Rute Shipment",
          slotName: "RuteShipment",
        },
        {
          name: "Biaya Lastmile",
          slotName: "BiayaLastmile",
        },
      ],
      id,

      user: this.$auth.user,

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchPengemudi: false,
      isLoadingGetPengemudi: false,
      pengemudi_search: "",

      isStopSearchKendaraan: false,
      isLoadingGetKendaraan: false,
      kendaraan_search: "",

      isStopSearchPickOrder: false,
      isLoadingGetPickOrder: false,
      pick_order_search: "",

      isStopSearchUser: false,
      isLoadingGetUser: false,
      user_search: "",

      isStopSearchStaff: false,
      isLoadingGetStaff: false,
      staff_search: "",

      isStopSearchJenisKendaraan: false,
      isLoadingGetJenisKendaraan: false,
      jenis_kendaraan_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Konfirmasi Muat",
      parameters: {
        url: "outbound/shipment",
        form: {
          kode_shipment: "",
          staff_id: "",
          gudang_id: "",
          tanggal: "",
          kendaraan_id: "",
          jenis_kendaraan_id: "",
          pengemudi_id: "",
          keterangan: "",
          no_referensi: "",
          status_muat: "",
          catatan_muat: "",

          shipment_details: [],
          rute_shipments: [],
          biaya_lastmiles: [],

          //Tracking
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
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          this.parameters.form[item] = res.data.data[item];
        });
        this.parameters.form.pengemudi_id = res.data.pengemudi;
        this.parameters.form.kendaraan_id = res.data.kendaraan;

        this.parameters.form.shipment_details = res.data.shipment_details.map(
          (item) => {
            return {
              ...item,
              shipment_detail_id: item,
              lokasi_id: item.lokasi,
              item_gudang_id: item.item_gudang,
              zona_gudang_id: item.zona_gudang,
              slot_penyimpanan_id_aisle: item.slot_penyimpanan_aisle,
              slot_penyimpanan_id_rack: item.slot_penyimpanan_rack,
              slot_penyimpanan_id_level: item.slot_penyimpanan_level,
              slot_penyimpanan_id_bin: item.slot_penyimpanan_bin,
              valuation_id: item.valuation,
            };
          }
        );

        if (res.data.rute_shipments) {
          this.parameters.form.rute_shipments = res.data.rute_shipments.map(
            (item) => {
              return {
                ...item,
                rute_shipment_id: item,
                lokasi_id_asal: item.lokasi_asal,
                lokasi_id_tujuan: item.lokasi_tujuan,
              };
            }
          );
        }

        if (res.data.biaya_lastmiles) {
          this.parameters.form.biaya_lastmiles = res.data.biaya_lastmiles.map(
            (item) => {
              return {
                ...item,
                biaya_lastmile_id: item,
                lokasi_id: item.lokasi,
                jenis_biaya_id: item.jenis_biaya,
                term_pembayaran_id: item.term_pembayaran,
                coa_id: item.coa,
                divisi_id: item.divisi,
                vendor_id: item.vendor,
              };
            }
          );
        }
        this.isLoadingPage = false;
      }
    } catch (error) {
      console.log("error", error);
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchPengemudi();
    await this.onSearchKendaraan();
    await this.onSearchJenisKendaraan();
    await this.onSearchUser();
    await this.onSearchStaff();

    // await this.onSearchPickOrder();

    this.getGeoLocation();
    this.getUserAgent();
  },
  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_warehouses",
      "lookup_custom1", //pengemudi
      "lookup_custom2", //kendaraan
      "lookup_custom6", //pick_order
      "lookup_grade", //user pic
      "lookup_beam", //staff
      "lookup_roles", //jenis kendaraan
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
        this.$toaster.error("Geolocation not supported");
        // console.log("geolocation not supported");
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "outbound/shipment";

      let formData = {
        ...this.parameters.form,
        gudang_id:
          typeof this.parameters.form.gudang_id === "object"
            ? this.parameters.form.gudang_id.gudang_id
            : this.parameters.form.gudang_id,
        pengemudi_id:
          typeof this.parameters.form.pengemudi_id == "object"
            ? this.parameters.form.pengemudi_id.pengemudi_id
            : this.parameters.form.pengemudi_id,
        kendaraan_id:
          typeof this.parameters.form.kendaraan_id == "object"
            ? this.parameters.form.kendaraan_id.kendaraan_id
            : this.parameters.form.kendaraan_id,
      };

      formData.shipment_details = this.parameters.form.shipment_details.map(
        (item) => {
          return {
            ...item,
            shipment_detail_id:
              typeof item.shipment_detail_id === "object"
                ? item.shipment_detail_id.shipment_detail_id
                : "",
            lokasi_id:
              typeof item.lokasi_id === "object"
                ? item.lokasi_id.lokasi_id
                : item.lokasi_id,
            item_gudang_id:
              typeof item.item_gudang_id == "object"
                ? item.item_gudang_id.item_gudang_id
                : item.item_gudang_id,
            zona_gudang_id:
              typeof item.zona_gudang_id == "object"
                ? item.zona_gudang_id.zona_gudang_id
                : item.zona_gudang_id,
            slot_penyimpanan_id_aisle:
              typeof item.slot_penyimpanan_id_aisle === "object"
                ? item.slot_penyimpanan_id_aisle.slot_penyimpanan_id
                : "",
            slot_penyimpanan_id_rack:
              typeof item.slot_penyimpanan_id_rack === "object"
                ? item.slot_penyimpanan_id_rack.slot_penyimpanan_id
                : "",
            slot_penyimpanan_id_level:
              typeof item.slot_penyimpanan_id_level === "object"
                ? item.slot_penyimpanan_id_level.slot_penyimpanan_id
                : "",
            slot_penyimpanan_id_bin:
              typeof item.slot_penyimpanan_id_bin === "object"
                ? item.slot_penyimpanan_id_bin.slot_penyimpanan_id
                : "",
            valuation_id:
              typeof item.valuation_id === "object"
                ? item.valuation_id.valuation_id
                : "",
          };
        }
      );

      formData.rute_shipments = this.parameters.form.rute_shipments.map(
        (item) => {
          return {
            ...item,
            rute_shipment_id:
              typeof item.rute_shipment_id === "object"
                ? item.rute_shipment_id.rute_shipment_id
                : item.rute_shipment_id,
            lokasi_id_asal:
              typeof item.lokasi_id_asal === "object"
                ? item.lokasi_id_asal.lokasi_id
                : item.lokasi_id_asal,
            lokasi_id_tujuan:
              typeof item.lokasi_id_tujuan === "object"
                ? item.lokasi_id_tujuan.lokasi_id
                : item.lokasi_id_tujuan,
          };
        }
      );

      formData.biaya_lastmiles = this.parameters.form.biaya_lastmiles.map(
        (item) => {
          return {
            ...item,
            biaya_lastmile_id:
              typeof item.biaya_lastmile_id === "object"
                ? item.biaya_lastmile_id.biaya_lastmile_id
                : "",
            lokasi_id:
              typeof item.lokasi_id === "object"
                ? item.lokasi_id.lokasi_id
                : item.lokasi_id,
            jenis_biaya_id:
              typeof item.jenis_biaya_id == "object"
                ? item.jenis_biaya_id.jenis_biaya_id
                : item.jenis_biaya_id,
            term_pembayaran_id:
              typeof item.term_pembayaran_id == "object"
                ? item.term_pembayaran_id.term_pembayaran_id
                : item.term_pembayaran_id,
            coa_id:
              typeof item.coa_id == "object" ? item.coa_id.coa_id : item.coa_id,
            divisi_id:
              typeof item.divisi_id == "object"
                ? item.divisi_id.divisi_id
                : item.divisi_id,
            vendor_id:
              typeof item.vendor_id == "object"
                ? item.vendor_id.vendor_id
                : item.vendor_id,
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
            this.parameters.form = {
              kode_shipment: "",
              staff_id: "",
              gudang_id: "",
              tanggal: "",
              kendaraan_id: "",
              pengemudi_id: "",
              keterangan: "",
              no_referensi: "",

              shipment_details: [],
              rute_shipments: [],
              biaya_lastmiles: [],
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

    AddDetailProduk() {
      this.parameters.form.shipment_details.push({
        shipment_details_id: "",
        item_gudang_id: "",
        zona_gudang_id: "",
        serial_number: "",
        quantity: "",
        keterangan_detail: "",
        nomor_surat_perintah_jalan: "",
        tujuan_pengiriman: "",
      });
    },

    onDeleteDetailProduk(index) {
      this.parameters.form.shipment_details =
        this.parameters.form.shipment_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

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
          url: "master/gudang/get-gudang-user",
          lookup: "warehouses",
          query:
            "?search=" +
            this.gudang_search +
            "&user_id=" +
            this.user.user_id +
            "&page=" +
            this.lookup_warehouses.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGudang = false;
      }
    },

    onSelectGudang(item) {
      this.parameters.form.gudang_id = item || "";
    },

    onGetPengemudi(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchPengemudi);

      this.isStopSearchPengemudi = setTimeout(() => {
        this.pengemudi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }
        this.onSearchPengemudi();
      }, 600);
    },

    async onSearchPengemudi() {
      if (!this.isLoadingGetPengemudi) {
        this.isLoadingGetPengemudi = true;

        await this.lookUp({
          url: "master/pengemudi/get-pengemudi",
          lookup: "custom1",
          query:
            "?search=" +
            this.pengemudi_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });
        this.isLoadingGetPengemudi = false;
      }
    },

    onGetKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchKendaraan);

      this.isStopSearchKendaraan = setTimeout(() => {
        this.kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }
        this.onSearchKendaraan();
      }, 600);
    },

    async onSearchKendaraan() {
      if (!this.isLoadingGetKendaraan) {
        this.isLoadingGetKendaraan = true;

        await this.lookUp({
          url: "master/kendaraan/get-kendaraan",
          lookup: "custom2",
          query:
            "?search=" +
            this.kendaraan_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });
        this.isLoadingGetKendaraan = false;
      }
    },

    onGetPickOrder(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchPickOrder);

      this.isStopSearchPickOrder = setTimeout(() => {
        this.pick_order_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }
        this.onSearchPickOrder();
      }, 600);
    },

    async onSearchPickOrder() {
      if (!this.isLoadingGetPickOrder) {
        this.isLoadingGetPickOrder = true;

        await this.lookUp({
          url: "outbound/pick-order/get-pick-order",
          lookup: "custom6",
          query:
            "?search=" +
            this.pick_order_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });
        this.isLoadingGetPickOrder = false;
      }
    },

    onGetJenisKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchJenisKendaraan);

      this.isStopSearchJenisKendaraan = setTimeout(() => {
        this.jenis_kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }
        this.onSearchJenisKendaraan();
      }, 600);
    },

    async onSearchJenisKendaraan() {
      if (!this.isLoadingGetJenisKendaraan) {
        this.isLoadingGetJenisKendaraan = true;

        await this.lookUp({
          url: "master/jenis-kendaraan/get-jenis-kendaraan",
          lookup: "roles",
          query:
            "?search=" +
            this.jenis_kendaraan_search +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });
        this.isLoadingGetJenisKendaraan = false;
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

    onSelectPickOrder(item) {
      if (item) {
        this.parameters.form.pick_order_id = item;
      } else {
        this.parameters.form.pick_order_id = "";
      }
    },

    onGetUser(search, isNext) {
      if (!search?.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchUser);

      this.isStopSearchUser = setTimeout(() => {
        this.user_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }
        this.onSearchUser();
      }, 600);
    },

    async onSearchUser() {
      if (!this.isLoadingGetUser) {
        this.isLoadingGetUser = true;

        await this.lookUp({
          url: "setting/user",
          lookup: "grade",
          query:
            "?search=" +
            this.user_search +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });
        this.isLoadingGetUser = false;
      }
    },

    onSelectUser(item) {
      if (item) {
        this.parameters.form.user_id_pic = item;
      } else {
        this.parameters.form.user_id_pic = "";
      }
    },

    onGetStaff(search, isNext) {
      if (!search?.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchStaff);

      this.isStopSearchStaff = setTimeout(() => {
        this.staff_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }
        this.onSearchStaff();
      }, 600);
    },

    async onSearchStaff() {
      if (!this.isLoadingGetStaff) {
        this.isLoadingGetStaff = true;

        await this.lookUp({
          url: "master/staff/get-staff",
          lookup: "beam",
          query:
            "?search=" +
            this.staff_search +
            "&page=" +
            this.lookup_beam.current_page +
            "&per_page=10",
        });
        this.isLoadingGetStaff = false;
      }
    },

    onSelectStaff(item) {
      if (item) {
        this.parameters.form.staff_id_pic = item;
      } else {
        this.parameters.form.staff_id_pic = "";
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_shipment: "",
        staff_id: "",
        gudang_id: "",
        tanggal: "",
        kendaraan_id: "",
        pengemudi_id: "",
        keterangan: "",
        no_referensi_2: "",
        no_referensi_3: "",
        shipment_details: [],
      };
    },

    async onOpenModal() {
      if (this.parameters.form.gudang_id) {
        this.$refs.modalPickOrder.show();
        await this.$refs.modalPickOrder.onLoad();
      } else {
        this.$toaster.error("Gudang Belum Dipilih");
      }
    },

    addItem(item) {
      if (
        !this.parameters.form.shipment_details.find(
          (data) => data.kode_delivery_order === item.kode_delivery_order
        )
      ) {
        let detailShipment = {
          ...item,
          urutan: "",
        };
        this.parameters.form.shipment_details.push(detailShipment);
      } else {
        this.$toaster.error("Item Sudah Ditambahkan");
      }
    },

    async generateRuteShipment() {
      if (this.parameters.form.shipment_details.length > 0) {
        this.parameters.form.rute_shipments =
          this.parameters.form.shipment_details.map((item, index) => {
            return {
              lokasi_id_asal:
                index > 0
                  ? this.parameters.form.shipment_details[index - 1].lokasi_id
                  : this.parameters.form.gudang_id.gudang_id,
              lokasi_id_tujuan: item.lokasi_id,
            };
          });
        this.parameters.form.rute_shipments.push({
          lokasi_id_asal:
            this.parameters.form.rute_shipments[
              this.parameters.form.rute_shipments.length - 1
            ].lokasi_id_tujuan,
          lokasi_id_tujuan: this.parameters.form.gudang_id,
          jenis_routing: "KOSONG",
        });
        await Promise.all(
          this.parameters.form.rute_shipments.forEach((item, index) => {
            this.$axios
              .get(
                `master/rute-lokasi/get-jarak-lokasi-awal-tujuan/${this.parameters.form.gudang_id.gudang_id}?lokasi_id_asal=${item.lokasi_id_asal}&lokasi_id_tujuan=${item.lokasi_id_tujuan}`
              )
              .then((res) => {
                this.parameters.form.rute_shipments[index].jarak = res.jarak;
                this.parameters.form.rute_shipments[index].biaya_bbm =
                  res.biaya_bbm;
              });
          })
        );
      } else {
        this.$toaster.error("Detail Shipment Masih Kosong");
      }
    },
  },
};
</script>
