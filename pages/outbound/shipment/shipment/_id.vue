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
                  :required="true"
                />
              </ValidationProvider>

              <!-- <ValidationProvider name="pengemudi_id">
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
              </ValidationProvider> -->
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
                  :disabled="true"
                />
              </ValidationProvider>
              <div class="form-group">
                <select-button
                  :self="{
                    label: 'Pengemudi',
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
              <div v-if="parameters.form.vendor_id" class="form-group">
                <input-horizontal
                  label="Vendor"
                  type="text"
                  name="vendor_id"
                  :isHorizontal="true"
                  v-model="parameters.form.vendor_id.nama_vendor"
                  :disabled="true"
                />
              </div>
              <div class="flex px-1 items-center">
                <label for="jenis_kiriman" class="w-1/2">Jenis Kiriman</label>
                <select
                  name="jenis_kiriman"
                  id="jenis_kiriman"
                  v-model="parameters.form.jenis_kiriman"
                  @change="onJenisKirimanChange"
                  class="w-1/2 outline-none p-1 rounded-sm border border-gray-300"
                >
                  <option value="FRC">Franco</option>
                  <option value="LCO">Locco</option>
                  <option value="SWC">Switch</option>
                </select>
              </div>
              <!-- <div
                v-if="parameters.form.jenis_kiriman == 'LCO'"
                class="form-group flex px-1 items-center"
              >
                <label for="total_locco" class="w-1/2">Biaya Locco</label>
                <money
                  name="total_locco"
                  v-model="parameters.form.total_locco"
                  class="w-1/2 outline-none p-1 rounded-md border border-gray-300"
                />
              </div> -->
              <div
                v-if="parameters.form.jenis_kiriman == 'SWC'"
                class="form-group flex px-1 items-center"
              >
                <label for="total_switch" class="w-1/2">Biaya Switch</label>
                <money
                  name="total_switch"
                  v-model="parameters.form.total_switch"
                  class="w-1/2 outline-none p-1 rounded-md border border-gray-300"
                />
              </div>
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
                :self="{
                  parameters,
                  onOpenModal,
                  generateRuteShipment,
                  updateUrutan,
                }"
              />
            </template>
            <template #RuteShipment>
              <RuteShipments :self="{ parameters }" />
            </template>
            <template #BiayaLastmile>
              <BiayaLastmiles :self="{ parameters }" />
            </template>
            <!-- <template #TagihanLastmile>
              <TagihanLastmiles :self="{ parameters }" />
            </template> -->
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
import TagihanLastmiles from "./TagihanLastmiles.vue";
export default {
  props: ["self"],
  middleware: ["checkRoleUserDetail"],

  components: {
    ShipmentDetails,
    RuteShipments,
    BiayaLastmiles,
    ModalPickOrder,
    TagihanLastmiles,
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
        // {
        //   name: "Tagihan Lastmile",
        //   slotName: "TagihanLastmile",
        // },
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
          vendor_id: "",
          keterangan: "",
          no_referensi: "",
          status_muat: "",
          catatan_muat: "",
          user_id_pic: "",
          jenis_kiriman: "FRC",
          total_switch: 0,
          total_locco: 0,

          shipment_details: [],
          rute_shipments: [],
          biaya_lastmiles: [],
          tagihan_lastmiles: [],

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
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    try {
      this.parameters.form.tanggal = formattedDate;
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          this.parameters.form[item] = res.data[item];
        });
        this.parameters.form.pengemudi_id = res.data.pengemudi;
        this.parameters.form.vendor_id = res.data.vendor;
        this.parameters.form.kendaraan_id = res.data.kendaraan;
        this.parameters.form.gudang_id = res.data.gudang;
        this.parameters.form.staff_id = res.data.staff;
        this.parameters.form.user_id_pic = res.data.user_pic;
        this.parameters.form.jenis_kendaraan_id = res.data.jenis_kendaraan;

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
                jenis_routing: item.jenis_routing.trim(),
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
                divisi_id: item.divisi,
                vendor_id: item.vendor,
              };
            }
          );
        }

        if (res.data.tagihan_lastmiles) {
          this.parameters.form.tagihan_lastmiles =
            res.data.tagihan_lastmiles.map((item) => {
              return {
                ...item,
                biaya_lastmile_id: item,
                lokasi_id: item.lokasi,
                jenis_biaya_id: item.jenis_biaya,
                term_pembayaran_id: item.term_pembayaran,
                divisi_id: item.divisi,
                vendor_id: item.vendor,
                pelanggan_id: item.pelanggan,
              };
            });
        }
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchGudang();
    // await this.onSearchPengemudi();
    // await this.onSearchKendaraan();
    // await this.onSearchJenisKendaraan();
    await this.onSearchUser();
    // await this.onSearchStaff();

    // await this.onSearchPickOrder(); warehouses

    this.getGeoLocation();
    this.getUserAgent();

    if (this.lookup_warehouses.data && !this.isEditable) {
      this.onSelectGudang(this.lookup_warehouses.data[0]);
    }
    if (this.user && !this.isEditable) {
      this.onSelectUser(this.user);
    }
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
        staff_id:
          typeof this.parameters.form.staff_id === "object"
            ? this.parameters.form.staff_id.staff_id
            : this.parameters.form.staff_id,
        jenis_kendaraan_id:
          typeof this.parameters.form.jenis_kendaraan_id === "object"
            ? this.parameters.form.jenis_kendaraan_id.jenis_kendaraan_id
            : this.parameters.form.jenis_kendaraan_id,
        pengemudi_id:
          typeof this.parameters.form.pengemudi_id == "object"
            ? this.parameters.form.pengemudi_id.pengemudi_id
            : this.parameters.form.pengemudi_id,
        kendaraan_id:
          typeof this.parameters.form.kendaraan_id == "object"
            ? this.parameters.form.kendaraan_id.kendaraan_id
            : this.parameters.form.kendaraan_id,
        jenis_kendaraan_id:
          typeof this.parameters.form.jenis_kendaraan_id == "object"
            ? this.parameters.form.jenis_kendaraan_id.jenis_kendaraan_id
            : this.parameters.form.jenis_kendaraan_id,
        staff_id:
          typeof this.parameters.form.staff_id == "object"
            ? this.parameters.form.staff_id.staff_id
            : this.parameters.form.staff_id,
        user_id_pic:
          typeof this.parameters.form.user_id_pic == "object"
            ? this.parameters.form.user_id_pic.user_id
            : this.parameters.form.user_id_pic,
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
                ? item.lokasi_id.lokasi_id ?? ""
                : item.lokasi_id ?? "",
            item_gudang_id:
              typeof item.item_gudang_id == "object"
                ? item.item_gudang_id.item_gudang_id ?? ""
                : item.item_gudang_id ?? "",
            zona_gudang_id:
              typeof item.zona_gudang_id == "object"
                ? item.zona_gudang_id.zona_gudang_id ?? ""
                : item.zona_gudang_id ?? "",
            slot_penyimpanan_id_aisle:
              typeof item.slot_penyimpanan_id_aisle === "object"
                ? item.slot_penyimpanan_id_aisle.slot_penyimpanan_id ?? ""
                : "",
            slot_penyimpanan_id_rack:
              typeof item.slot_penyimpanan_id_rack === "object"
                ? item.slot_penyimpanan_id_rack.slot_penyimpanan_id ?? ""
                : "",
            slot_penyimpanan_id_level:
              typeof item.slot_penyimpanan_id_level === "object"
                ? item.slot_penyimpanan_id_level.slot_penyimpanan_id ?? ""
                : "",
            slot_penyimpanan_id_bin:
              typeof item.slot_penyimpanan_id_bin === "object"
                ? item.slot_penyimpanan_id_bin.slot_penyimpanan_id ?? ""
                : "",
            stok_transfer_detail_id: item.stok_transfer_detail_id ?? "",
            // valuation_id:
            //   typeof item.valuation_id === "object"
            //     ? item.valuation_id.valuation_id
            //     : "",
          };
        }
      );

      formData.rute_shipments = this.parameters.form.rute_shipments.map(
        (item) => {
          return {
            ...item,
            rute_shipment_id:
              typeof item.rute_shipment_id === "object"
                ? item.rute_shipment_id.rute_shipment_id ?? ""
                : item.rute_shipment_id ?? "",
            lokasi_id_asal:
              typeof item.lokasi_id_asal === "object"
                ? item.lokasi_id_asal.lokasi_id ?? ""
                : item.lokasi_id_asal ?? "",
            lokasi_id_tujuan:
              typeof item.lokasi_id_tujuan === "object"
                ? item.lokasi_id_tujuan.lokasi_id ?? ""
                : item.lokasi_id_tujuan ?? "",
          };
        }
      );

      formData.biaya_lastmiles = this.parameters.form.biaya_lastmiles.map(
        (item) => {
          return {
            ...item,
            biaya_perkm_muat: item.nominal_satuan,
            biaya_perkm_kosong: item.nominal_satuan,
            biaya_lastmile_id:
              typeof item.biaya_lastmile_id === "object"
                ? item.biaya_lastmile_id.biaya_lastmile_id
                : "",
            lokasi_id:
              typeof item.lokasi_id === "object"
                ? item.lokasi_id.lokasi_id ?? ""
                : item.lokasi_id ?? "",
            jenis_biaya_id:
              typeof item.jenis_biaya_id == "object"
                ? item.jenis_biaya_id.jenis_biaya_id ?? ""
                : item.jenis_biaya_id ?? "",
            term_pembayaran_id:
              typeof item.term_pembayaran_id == "object"
                ? item.term_pembayaran_id.term_pembayaran_id ?? ""
                : item.term_pembayaran_id ?? "",
            divisi_id:
              typeof item.divisi_id == "object"
                ? item.divisi_id.divisi_id ?? ""
                : item.divisi_id ?? "",
            vendor_id:
              typeof item.vendor_id == "object"
                ? item.vendor_id.vendor_id ?? ""
                : item.vendor_id ?? "",
          };
        }
      );
      formData.tagihan_lastmiles = this.parameters.form.tagihan_lastmiles.map(
        (item) => {
          return {
            ...item,
            tagihan_lastmile_id:
              typeof item.tagihan_lastmile_id === "object"
                ? item.tagihan_lastmile_id.tagihan_lastmile_id
                : "",
            lokasi_id:
              typeof item.lokasi_id === "object"
                ? item.lokasi_id.lokasi_id ?? ""
                : item.lokasi_id ?? "",
            jenis_biaya_id:
              typeof item.jenis_biaya_id == "object"
                ? item.jenis_biaya_id.jenis_biaya_id ?? ""
                : item.jenis_biaya_id ?? "",
            term_pembayaran_id:
              typeof item.term_pembayaran_id == "object"
                ? item.term_pembayaran_id.term_pembayaran_id ?? ""
                : item.term_pembayaran_id ?? "",
            divisi_id:
              typeof item.divisi_id == "object"
                ? item.divisi_id.divisi_id ?? ""
                : item.divisi_id ?? "",
            vendor_id:
              typeof item.vendor_id == "object"
                ? item.vendor_id.vendor_id ?? ""
                : item.vendor_id ?? "",
            pelanggan_id:
              typeof item.pelanggan_id == "object"
                ? item.pelanggan_id.pelanggan_id ?? ""
                : item.pelanggan_id ?? "",
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
              jenis_kendaraan_id: "",
              pengemudi_id: "",
              keterangan: "",
              no_referensi: "",
              status_muat: "",
              catatan_muat: "",
              user_id_pic: "",

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
      // let urutans = this.parameters.form.shipment_details.length + 1;
      this.parameters.form.shipment_details.push({
        shipment_details_id: "",
        item_gudang_id: "",
        zona_gudang_id: "",
        serial_number: "",
        quantity: "",
        keterangan_detail: "",
        nomor_surat_perintah_jalan: "",
        tujuan_pengiriman: "",
        urutan: urutans,
      });
      // console.log("urutan", urutans);
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

    async onSelectGudang(item) {
      if (item) {
        this.parameters.form.gudang_id = item;
        this.parameters.form.shipment_details = [];
        this.parameters.form.rute_shipments = [];
        this.parameters.form.biaya_lastmiles = [];
        await this.onSearchKendaraan();
      } else {
        this.parameters.form.gudang_id = "";
        this.parameters.form.kendaraan_id = "";
        this.parameters.form.jenis_kendaraan_id = "";
        this.parameters.form.staff_id = "";
        this.parameters.form.vendor_id = "";
        this.parameters.form.shipment_details = [];
        this.parameters.form.rute_shipments = [];
        this.parameters.form.biaya_lastmiles = [];
      }
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
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
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
        this.parameters.form.vendor_id = item.vendor_id;
      } else {
        this.parameters.form.pengemudi_id = "";
        this.parameters.form.vendor_id = "";
      }
    },

    async onSelectKendaraan(item) {
      if (item) {
        this.parameters.form.kendaraan_id = item;
        this.parameters.form.jenis_kendaraan_id = item.jenis_kendaraan;
        this.parameters.form.staff_id = "";
        this.parameters.form.vendor_id = "";
        await this.onSearchStaff();
      } else {
        this.parameters.form.kendaraan_id = "";
        this.parameters.form.jenis_kendaraan_id = "";
        this.parameters.form.staff_id = "";
        this.parameters.form.vendor_id = "";
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
              "&jenis_user=pengemudi" +
              "&kendaran_id=" +
              this.parameters.form.kendaraan_id.kendaraan_id ??
            "" + "&page=" + this.lookup_beam.current_page + "&per_page=10",
        });
        this.isLoadingGetStaff = false;
      }
    },

    onSelectStaff(item) {
      if (item) {
        this.parameters.form.staff_id = item;
        this.parameters.form.vendor_id = item.vendor_operator;
      } else {
        this.parameters.form.staff_id = "";
        this.parameters.form.vendor_id = "";
      }
    },

    onSelectJenisKendaraan(item) {
      if (item) {
        this.parameters.form.jenis_kendaraan_id = item;
      } else {
        this.parameters.form.jenis_kendaraan_id = "";
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
        jenis_kiriman: "FRC",
        shipment_details: [],
      };
    },

    async onOpenModal() {
      if (
        !this.parameters.form.gudang_id ||
        !this.parameters.form.kendaraan_id ||
        !this.parameters.form.staff_id
      ) {
        this.$toaster.error("Harap Pilih Gudang, Kendaraan, dan Pengemudi");
        return;
      }
      if (this.parameters.form.gudang_id) {
        this.$refs.modalPickOrder.parameters.params.gudang_id =
          this.parameters.form.gudang_id.gudang_id;
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
          item_gudang_id: item.item_gudang,
          zona_gudang_id: item.zona_gudang_tujuan,
          lokasi_id: item.lokasi,
          valuation_id: item.valuation_id,
          urutan: 1,
        };
        this.updateUrutan();
        this.parameters.form.shipment_details.push(detailShipment);
        this.generateRuteShipment();
        this.$toaster.success("Data Berhasil Ditambahkan");
      } else {
        this.$toaster.error("Item Sudah Ditambahkan");
      }
    },

    updateUrutan() {
      this.parameters.form.shipment_details.forEach((item, index) => {
        item.urutan = index + 1;
      });
    },

    async generateRuteShipment() {
      if (this.parameters.form.shipment_details.length > 0) {
        try {
          this.isLoadingForm = true;
          this.parameters.form.rute_shipments = [];
          this.parameters.form.rute_shipments =
            this.parameters.form.shipment_details
              .filter(
                (value, index, self) =>
                  index ===
                  self.findIndex(
                    (t) => t.lokasi_id.lokasi_id === value.lokasi_id.lokasi_id
                  )
              )
              .map((item, index) => {
                return {
                  item_gudang_id: item.item_gudang_id,
                  lokasi_id_asal:
                    index > 0
                      ? this.parameters.form.shipment_details[index - 1]
                          .lokasi_id
                      : this.parameters.form.gudang_id.lokasi,
                  lokasi_id_tujuan: item.lokasi_id,
                  jenis_routing: "MUAT",
                  jenis_kiriman: 1,
                  jenis: item.jenis,
                };
              });
          this.parameters.form.rute_shipments.push({
            lokasi_id_asal:
              this.parameters.form.rute_shipments[
                this.parameters.form.rute_shipments.length - 1
              ].lokasi_id_tujuan,
            lokasi_id_tujuan: this.parameters.form.gudang_id.lokasi,
            jenis_routing: "KOSONG",
            jenis_kiriman: 0,
            jenis: 0,
          });
          // if (!res.data.biaya_lastmiles.length) {
          //   this.parameters.form;
          // }
          await Promise.all(
            this.parameters.form.rute_shipments.map((item, index) => {
              return this.$axios
                .get(
                  `master/rute-lokasi/get-jarak-lokasi-awal-tujuan/${this.parameters.form.gudang_id.gudang_id}?lokasi_id_awal=${item.lokasi_id_asal.lokasi_id}&lokasi_id_tujuan=${item.lokasi_id_tujuan.lokasi_id}`
                )
                .then((res) => {
                  this.parameters.form.rute_shipments[index].jarak =
                    res.data.jarak ?? 0;
                  this.parameters.form.rute_shipments[
                    index
                  ].waktu_sampai_tujuan = res.data.waktu_sampai_tujuan ?? 0;
                  // this.parameters.form.rute_shipments[index].biaya_bbm =
                  //   res.biaya_bbm;
                });
            })
          );
          this.parameters.form.biaya_lastmiles = [];
          const sumJarak = this.parameters.form.rute_shipments.reduce(
            (total, rute) => {
              return total + parseFloat(rute.jarak);
            },
            0
          );
          await Promise.all(
            this.parameters.form.rute_shipments.map((item) => {
              return this.$axios
                .get("/finance/kontrak-lastmile/get-kontrak-lastmile-atcost", {
                  params: {
                    gudang_id: this.parameters.form.gudang_id.gudang_id,
                    jenis_kendaraan_id:
                      this.parameters.form.jenis_kendaraan_id
                        .jenis_kendaraan_id,
                    lokasi_id: item.lokasi_id_tujuan.lokasi_id,
                    vendor_id: this.parameters.form.vendor_id.vendor_id ?? "",
                    jenis_kiriman: item.jenis_kiriman,
                    jarak: sumJarak,
                  },
                })
                .then((res) => {
                  res.data.forEach((data) => {
                    this.parameters.form.biaya_lastmiles.push({
                      ...data,
                      // pick_order_detail_id: item.pick_order_detail_id,
                      jenis: item.jenis,
                      item_gudang: data.item_gudang,
                      item_id: data.item_id,
                      item_gudang_id: data.item_gudang_id,
                      biaya_inbound_id: "",
                      jenis_biaya_id: data.jenis_biaya,
                      jenis_kendaraan_id: data.jenis_kendaraan,
                      jenis_kontrak_id: data.jenis_kontrak,
                      mata_uang_id: data.mata_uang,
                      pembayaran_id: data.pembayaran,
                      term_pembayaran_id: data.term_pembayaran,
                      vendor_id: data.vendor,
                      dasar_perhitungan: data.dasar_perhitungan,
                      lokasi_id_asal: item.lokasi_id_tujuan_asal,
                      lokasi_id: item.lokasi_id_tujuan,
                      jenis_routing: item.jenis_routing,
                      jumlah: data.jenis == 2 ? item.jarak : 1,
                      nominal_satuan:
                        data.jenis == 2
                          ? item.jenis_routing === "MUAT"
                            ? data.biaya_perkm_muat
                            : data.biaya_perkm_kosong
                          : data.nilai_kontrak,
                      total:
                        data.jenis == 2
                          ? item.jenis_routing === "MUAT"
                            ? data.biaya_perkm_muat * item.jarak
                            : data.biaya_perkm_kosong * item.jarak
                          : data.nilai_kontrak,
                      vendor_id: {
                        vendor_id: item.vendor_id,
                        nama_vendor: item.nama_vendor,
                      },
                    });
                  });
                });
            })
          );
          this.parameters.form.tagihan_lastmiles = [];
          await Promise.all(
            this.parameters.form.rute_shipments.map((item) => {
              return this.$axios
                .get(
                  "/finance/kontrak-lastmile-pelanggan/get-kontrak-lastmile-atcost",
                  {
                    params: {
                      gudang_id: this.parameters.form.gudang_id.gudang_id,
                      jenis_kendaraan_id:
                        this.parameters.form.jenis_kendaraan_id
                          .jenis_kendaraan_id,
                      lokasi_id: item.lokasi_id_tujuan.lokasi_id,
                    },
                  }
                )
                .then((res) => {
                  res.data.forEach((data) => {
                    this.parameters.form.tagihan_lastmiles.push({
                      ...data,
                      // pick_order_detail_id: item.pick_order_detail_id,
                      jenis: item.jenis,
                      item_gudang: data.item_gudang,
                      item_id: data.item_id,
                      item_gudang_id: data.item_gudang_id,
                      biaya_inbound_id: "",
                      jenis_biaya_id: data.jenis_biaya,
                      jenis_kendaraan_id: data.jenis_kendaraan,
                      jenis_kontrak_id: data.jenis_kontrak,
                      mata_uang_id: data.mata_uang,
                      pembayaran_id: data.pembayaran,
                      term_pembayaran_id: data.term_pembayaran,
                      vendor_id: data.vendor,
                      pelanggan_id: {
                        pelanggan_id: data.pelanggan_id,
                        nama_pelanggan: data.nama_pelanggan,
                      },
                      dasar_perhitungan: data.dasar_perhitungan,
                      lokasi_id: item.lokasi_id_tujuan,
                      jenis_routing: item.jenis_routing,
                      jumlah: data.jenis == 2 ? item.jarak : 1,
                      nominal_satuan:
                        data.jenis == 2
                          ? item.jenis_routing === "MUAT"
                            ? data.biaya_perkm_muat
                            : data.biaya_perkm_kosong
                          : data.nilai_kontrak,
                      total:
                        data.jenis == 2
                          ? item.jenis_routing === "MUAT"
                            ? data.biaya_perkm_muat * item.jarak
                            : data.biaya_perkm_kosong * item.jarak
                          : data.nilai_kontrak,
                    });
                  });
                });
            })
          );
          // if(!res.data.biaya_lastmiles.length){
          // }else{
          //   this.parameters.form.biaya_lastmiles = []
          //   this.parameters.form.biaya_lastmiles = res.data.biaya_lastmiles.map(())
          // }
        } catch (error) {
          this.$globalErrorToaster(this.$toaster, error);
          console.log(error);
        } finally {
          this.isLoadingForm = false;
        }
      } else {
        this.$toaster.error("Detail Shipment Masih Kosong");
      }
    },

    onJenisKirimanChange() {
      this.parameters.form.total_locco = 0;
      this.parameters.form.total_switch = 0;
    },
  },
};
</script>
