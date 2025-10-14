<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">Rute Shipment</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div class="w-full">
        <div class="w-full gap-3">
          <div class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
              <div>
                <input-horizontal
                  label="Kode Shipment"
                  type="text"
                  name="kode_pick_order"
                  :isHorizontal="true"
                  v-model="parameters.form.shipment.kode_shipment"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Tanggal"
                  type="date"
                  name="tanggal"
                  :isHorizontal="true"
                  v-model="parameters.form.shipment.tanggal"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Kendaraan"
                  type="text"
                  name="kendaraan"
                  :isHorizontal="true"
                  v-model="parameters.form.shipment.kendaraan.nama_kendaraan"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Jenis Kendaraan"
                  type="text"
                  name="jenis_kendaraan"
                  :isHorizontal="true"
                  v-model="
                    parameters.form.shipment.jenis_kendaraan
                      .nama_jenis_kendaraan
                  "
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Pengemudi"
                  type="text"
                  name="staff"
                  :isHorizontal="true"
                  v-model="parameters.form.shipment.staff.nama_lengkap"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Gudang"
                  type="text"
                  name="gudang"
                  :isHorizontal="true"
                  v-model="parameters.form.gudang.nama_gudang"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div class="flex w-full items-center mb-2">
                <label class="w-1/2">Lokasi Asal</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                >
                  {{
                    parameters.form.lokasi_asal
                      ? parameters.form.lokasi_asal.nama_lokasi
                      : "-"
                  }}
                  ({{
                    parameters.form.lokasi_asal
                      ? parameters.form.lokasi_asal.latitude
                      : "-"
                  }},
                  {{
                    parameters.form.lokasi_asal
                      ? parameters.form.lokasi_asal.longitude
                      : "-"
                  }})
                </div>
              </div>
              <div class="flex w-full items-center mb-2">
                <label class="w-1/2">Lokasi Tujuan</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                >
                  {{
                    parameters.form.lokasi_tujuan
                      ? parameters.form.lokasi_tujuan.nama_lokasi
                      : "-"
                  }}
                  ({{
                    parameters.form.lokasi_tujuan
                      ? parameters.form.lokasi_tujuan.latitude
                      : "-"
                  }},
                  {{
                    parameters.form.lokasi_tujuan
                      ? parameters.form.lokasi_tujuan.longitude
                      : "-"
                  }})
                </div>
              </div>
            </div>
            <div class="table-responsive my-2" v-if="lookup_custom6.length > 0">
              <table
                class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <th class="w-[200px] border border-gray-300">
                      Item Gudang
                    </th>
                    <th class="w-[200px] border border-gray-300">
                      Kode Delivery Order
                    </th>
                    <th class="w-[200px] border border-gray-300">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="aligh-top border-t"
                    v-for="(item, i) in lookup_custom6"
                    :key="i"
                  >
                    <td class="border border-gray-300">
                      {{ item.item_gudang.nama_item }} -
                      {{ item.item_gudang.kode_item }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.kode_delivery_order }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.quantity }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <tab-component :tabs="tabs">
              <template #RiwayatShipment>
                <div class="table-responsive overflow-y-hidden mb-7">
                  <div
                    class="mb-3 mt-5 text-xl font-bold uppercase flex justify-between items-start w-full"
                  >
                    <h1>Riwayat Rute Shipment</h1>
                    <div class="flex justify-end gap-2">
                      <button
                        v-if="parameters.status !== 'SELESAI'"
                        type="button"
                        @click="show"
                        class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                      >
                        <i class="fas fa-plus"></i>
                        <p class="text-xs font-medium">Tambah Riwayat</p>
                      </button>
                    </div>
                  </div>
                  <table
                    class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                  >
                    <thead>
                      <tr class="text-sm uppercase">
                        <th class="w-60 border border-gray-300">
                          Lokasi Tujuan
                        </th>
                        <th class="w-40 border border-gray-300">Status</th>
                        <th class="w-40 border border-gray-300">Tanggal</th>
                        <th class="w-40 border border-gray-300">Latitude</th>
                        <th class="w-40 border border-gray-300">Longitude</th>
                        <th class="w-60 border border-gray-300">Catatan</th>
                        <th class="w-40 border border-gray-300">File</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in parameters.form
                          .riwayat_rute_shipments"
                        :key="i"
                        class="border-t border-gray-400 align-top"
                      >
                        <td class="border border-gray-300">
                          {{ item.lokasi_tujuan.nama_lokasi }}
                        </td>
                        <td class="border border-gray-300">
                          <div
                            v-if="item.status === 'MENUNGGU'"
                            class="p-1 w-1/2 mx-auto rounded-md bg-orange-500 font-semibold text-white text-center"
                          >
                            <p>Menunggu</p>
                          </div>
                          <div
                            v-if="item.status === 'SAMPAI'"
                            class="bg-blue-500 mx-auto p-1 w-1/2 rounded-md font-semibold text-white text-center"
                          >
                            <p>Sampai</p>
                          </div>
                          <div
                            v-if="item.status === 'PROSES'"
                            class="bg-blue-500 mx-auto p-1 w-1/2 rounded-md font-semibold text-white text-center"
                          >
                            <p>Proses</p>
                          </div>
                          <div
                            v-if="item.status === 'SELESAI'"
                            class="bg-green-500 mx-auto p-1 w-1/2 rounded-md font-semibold text-white text-center"
                          >
                            <p>Selesai</p>
                          </div>
                          <div
                            v-if="item.status === 'BATAL'"
                            class="bg-red-500 mx-auto p-1 w-1/2 rounded-md font-semibold text-white text-center"
                          >
                            <p>Batal</p>
                          </div>
                        </td>
                        <td class="border border-gray-300">
                          {{ item.tanggal }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.latitude }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.longitude }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.catatan }}
                        </td>
                        <td class="border border-gray-300">
                          <button
                            v-if="item.file"
                            @click="onShowPicture(item)"
                            type="button"
                            class="flex p-2 my-1 max-w-full rounded-md bg-blue-500 text-white hover:bg-blue-400 items-center"
                          >
                            <i class="fa fa-file mx-2"></i>
                            <span class="font-bold text-ellipsis">File</span>
                          </button>
                          <p v-else>File Tidak Ditemukan</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
              <template #ReturBarang>
                <ReturBarang
                  :self="{ parameters, showRetur, editRetur, deleteRetur }"
                />
              </template>
            </tab-component>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" to="modal-riwayat">
      <div
        @click="hide"
        class="fixed inset-0 bg-black bg-opacity-50 z-50"
      ></div>
      <div
        class="modal w-[600px] fade fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
        aria-hidden="true"
        id="modal-riwayat"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div
              class="modal-header flex justify-between text-xl font-bold mb-3"
            >
              <h5 class="modal-title">Tambah Riwayat</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="hide()"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <ValidationObserver
              v-slot="{ invalid, validate }"
              ref="formValidate"
            >
              <form
                @submit.prevent="validate().then(() => onSubmit(invalid))"
                enctype="multipart/form-data"
              >
                <div class="grid grid-cols-1 w-full gap-2 mt-10">
                  <div>
                    <div class="form-group flex items-center">
                      <label for="" class="w-1/2"
                        >Status <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        id=""
                        v-model="parameters.form.status"
                        class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                      >
                        <option value="MENUNGGU">Menunggu</option>
                        <option value="SAMPAI">Sampai</option>
                        <option value="PROSES">Proses</option>
                        <option value="SELESAI">Selesai</option>
                        <option value="BATAL">Batal</option>
                      </select>
                    </div>
                  </div>
                  <div
                    v-if="parameters.form.status === 'SELESAI'"
                    class="flex items-center justify-between"
                  >
                    <label for="" class="w-1/2">File </label>
                    <!-- :required="parameters.form.status === 'SELESAI'" -->
                    <input
                      type="file"
                      name="file"
                      id="file"
                      @change="handleFileChange"
                      class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                    />
                  </div>
                  <div class="form-group flex items-start mb-5">
                    <label for="keterangan" class="w-1/2 pt-1">Catatan</label>
                    <textarea
                      placeholder="Catatan"
                      class="w-1/2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                      v-model="parameters.form.catatan"
                    ></textarea>
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
        </div>
      </div>
    </div>
    <div v-if="showModalRetur" to="modal-retur">
      <div
        @click="hideRetur"
        class="fixed inset-0 bg-black bg-opacity-50 z-50"
      ></div>
      <div
        class="modal w-[600px] fade fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
        aria-hidden="true"
        id="modal-riwayat"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div
              class="modal-header flex justify-between text-xl font-bold mb-3"
            >
              <h5 class="modal-title">Tambah Retur Barang</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="hideRetur()"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <ValidationObserver
              v-slot="{ invalid, validate }"
              ref="formValidate"
            >
              <form
                @submit.prevent="validate().then(() => onSubmitRetur(invalid))"
              >
                <div class="grid grid-cols-1 w-full gap-2 mt-10">
                  <div>
                    <div
                      class="form-group flex items-center"
                      v-if="!parameters.form.shipment_detail_id"
                    >
                      <label for="" class="w-1/2"
                        >Delivery Order
                        <span class="text-danger">*</span></label
                      >
                      <select
                        name="shipment_detail_id"
                        id="shipment_detail_id"
                        @change="handleDo(parameters.form.shipment_detail_id)"
                        v-model="parameters.form.shipment_detail_id"
                        class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                      >
                        <option
                          v-for="(value, index) in lookup_custom6"
                          :key="index"
                          :value="value"
                        >
                          {{ value.kode_delivery_order }} -
                          {{ value.item_gudang.nama_item }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-between"
                    v-if="parameters.form.shipment_detail_id"
                  >
                    <label for="" class="w-1/2">Delivery Order</label>
                    <div class="w-1/2 p-1 rounded-sm border border-gray-300">
                      {{
                        parameters.form.shipment_detail_id
                          .kode_delivery_order || "-"
                      }}
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <label for="" class="w-1/2">Quantity SO</label>
                    <!-- type="text" -->
                    <money
                      disabled
                      name="quantity"
                      id="quantity"
                      v-model="parameters.form.quantity_kirim"
                      class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none disabled:bg-gray-300"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <label for="" class="w-1/2"
                      >Quantity Retur <span class="text-danger">*</span></label
                    >
                    <!-- type="text" -->
                    <money
                      min="1"
                      name="quantity"
                      id="quantity"
                      v-model="parameters.form.quantity_retur"
                      class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <label for="" class="w-1/2">Quantity Terima</label>
                    <!-- type="text" -->
                    <money
                      disabled
                      name="quantity"
                      id="quantity"
                      v-model="quantityTerima"
                      class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none disabled:bg-gray-300"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <label for="" class="w-1/2"
                      >Valuation <span class="text-danger">*</span></label
                    >
                    <v-select
                      label="nama_valuation"
                      :loading="isLoadingGetValuation"
                      :options="lookup_warehouses.data"
                      :filterable="false"
                      @search="onGetValuation"
                      v-model="parameters.form.valuation_id"
                      :reduce="(item) => item.valuation_id"
                      class="w-1/2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_warehouses.data.length || search"
                      >
                        <span
                          v-if="lookup_warehouses.current_page > 1"
                          @click="onGetValuation(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_warehouses.last_page >
                            lookup_warehouses.current_page
                          "
                          @click="onGetValuation(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="form-group flex items-start mb-5">
                    <label for="Alasan" class="w-1/2 pt-1">Alasan</label>
                    <v-select
                      label="nama_alasan_beda_plan"
                      :loading="isLoadingGetAlasan"
                      :options="lookup_custom1.data"
                      :filterable="false"
                      @search="onGetAlasan"
                      v-model="parameters.form.alasan_beda_plan_id"
                      class="w-1/2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom1.data.length || search"
                      >
                        <span
                          v-if="lookup_custom1.current_page > 1"
                          @click="onGetAlasan(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom1.last_page >
                            lookup_custom1.current_page
                          "
                          @click="onGetAlasan(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="form-group flex items-start mb-5">
                    <label for="Alasan" class="w-1/2 pt-1"
                      >Keterangan Retur</label
                    >
                    <textarea
                      placeholder="Alasan"
                      class="w-1/2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                      v-model="parameters.form.keterangan_retur"
                    ></textarea>
                  </div>
                </div>
                <modal-footer-section
                  class="mt-5"
                  :isLoadingForm="isLoadingForm"
                  @reset="formReturReset()"
                />
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <ShowPictureModal ref="pictureModal" />
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
import ShowPictureModal from "../../../components/transaksional/ShowPictureModal.vue";
import ReturBarang from "./ReturBarang.vue";

export default {
  props: ["self"],
  middleware: ["checkRoleUserDetail"],

  components: {
    ShowPictureModal,
    ReturBarang,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      tabs: [
        {
          name: "Rute Shipment",
          slotName: "RiwayatShipment",
        },
        {
          name: "Retur Barang",
          slotName: "ReturBarang",
        },
      ],

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Konfirmasi Checkpoint",
      parameters: {
        url: "lastmile/riwayat-shipment",
        form: {
          status: "",
          catatan: "",
          file: "",

          rute_shipment_id: "",
          shipment_id: "",
          lokasi_id_tujuan: "",
          lokasi_id_asal: "",
          pick_request_detail_id: "",
          pick_order_detail_id: "",
          shipment_detail_id: "",
          valuation_id: "",
          item_id: "",
          item_pelanggan_id: "",
          item_gudang_id: "",
          alasan: "",
          quantity_kirim: "",
          quantity_retur: "",

          gudang: {},
          shipment: {},
          lokasi_asal: {},
          lokasi_tujuan: {},

          jarak: "",
          biaya_bbm: "",
          waktu_sampai_tujuan: "",
          jenis_routing: "",
          jenis_kiriman: "",
          waktu_berangkat: "",
          tanggal_selesai: "",
          catatan_selesai: "",
          realisasi_waktu_sampai_tujuan: "",
          file_bukti_selesai: "",
          riwayat_rute_shipments: [],

          shipment_retur_details: [],
          shipment_retur_detail_id: "",
          shipment_detail_id: "",
          quantity_retur: "",
          quantity_kirim: "",
          alasan: "",
          valuation_id: "",
          keterangan_retur: "",
        },
      },

      tracking: {
        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },

      retur_form: {},

      showModal: false,
      showModalRetur: false,

      isStopSearchShipmentDetail: false,
      isLoadingGetShipmentDetail: false,
      shipment_detail_search: "",

      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

      isStopSearchAlasan: false,
      isLoadingGetAlasan: false,
      alasan_search: "",
    };
  },

  async created() {
    await this.getRuteShipment();
    await this.onSearchShipmentDetail();
  },

  async mounted() {
    await this.onSearchValuation();
    await this.onSearchAlasan();
    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom6",
      "lookup_warehouses",
      "lookup_custom1",
    ]),

    quantityTerima() {
      let quantityTerima =
        parseFloat(this.parameters.form.quantity_kirim) -
        parseFloat(this.parameters.form.quantity_retur);
      return quantityTerima;
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    async getRuteShipment() {
      try {
        if (this.isEditable) {
          let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
          Object.keys(this.parameters.form).forEach((item) => {
            this.parameters.form[item] = res.data[item];
          });

          if (res.data.shipment_retur_details) {
            this.parameters.form.shipment_retur_details =
              res.data.shipment_retur_details.map((item) => {
                return {
                  ...item,
                  shipment_detail_id: item.shipment_detail,
                };
              });
          }
        }
        console.log(this.parameters.form);
      } catch (error) {
        this.$router.back;
      } finally {
        this.isLoadingPage = false;
      }
    },

    getUserAgent() {
      this.tracking.user_agent = navigator.userAgent;
      if (this.tracking.user_agent.includes("Mobile")) {
        this.tracking.device = "Mobile";
      } else if (this.tracking.user_agent.includes("Tablet")) {
        this.tracking.device = "Tablet";
      } else {
        this.tracking.device = "Desktop";
      }
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.tracking.longitude = position.coords.longitude.toString();
            this.tracking.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
            console.log(
              "latitude",
              this.tracking.latitude,
              "longitude",
              this.tracking.longitude
            );
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
      let url = "lastmile/riwayat-shipment";

      let formData = new FormData();

      formData.append("status", this.parameters.form.status ?? "");
      formData.append("catatan", this.parameters.form.catatan ?? "");
      formData.append(
        "catatan_selesai",
        this.parameters.form.catatan_selesai ?? ""
      );
      formData.append("latitude", this.tracking.latitude ?? "");
      formData.append("longitude", this.tracking.longitude ?? "");
      formData.append("user_agent", this.tracking.user_agent ?? "");
      formData.append("device", this.tracking.device ?? "");

      if (this.parameters.form.file instanceof File) {
        formData.append("file", this.parameters.form.file);
        console.log("halo");
      }

      if (this.isEditable) {
        url += "/" + this.id;
        formData.append("_method", "PUT");
      }

      this.$axios({
        url: url,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success("Rute Shipment Telah Diupdate");
          // this.$router.push("/lastmile/konfirmasi-checkpoint");
          this.hide();
          this.getRuteShipment();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          // this.$refs.formValidate.reset();
        });
    },

    async onSubmitRetur(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (this.parameters.form.quantity_retur < 1) {
        this.$globalErrorToaster(
          this.$toaster,
          "Quantity Retur Tidak Boleh Kurang Dari 1"
        );
        return;
      }

      this.isLoadingForm = true;
      let url;

      if (this.parameters.form.shipment_retur_detail_id) {
        url = `lastmile/riwayat-shipment/update-retur/${this.parameters.form.shipment_retur_detail_id}`;
      } else {
        url = `lastmile/riwayat-shipment/retur/${this.parameters.form.rute_shipment_id}`;
      }

      let formData = {
        shipment_retur_detail_id:
          this.parameters.form.shipment_retur_detail_id || "",
        shipment_detail_id:
          typeof this.parameters.form.shipment_detail_id === "object"
            ? this.parameters.form.shipment_detail_id.shipment_detail_id
            : this.parameters.form.shipment_detail_id,
        alasan_beda_plan_id:
          typeof this.parameters.form.alasan_beda_plan_id === "object"
            ? this.parameters.form.alasan_beda_plan_id.alasan_beda_plan_id
            : this.parameters.form.alasan_beda_plan_id,
        pick_order_detail_id:
          this.parameters.form.shipment_detail_id.pick_order_detail_id,
        pick_request_detail_id:
          this.parameters.form.shipment_detail_id.pick_request_detail_id,
        item_gudang_id: this.parameters.form.shipment_detail_id.item_gudang_id,
        item_id: this.parameters.form.shipment_detail_id.item_id,
        quantity_kirim: this.parameters.form.quantity_kirim,
        quantity_retur: this.parameters.form.quantity_retur,
        valuation_id: this.parameters.form.valuation_id,
        alasan: this.parameters.form.alasan,
        keterangan: this.parameters.form.keterangan_retur,
        latitude: this.tracking.latitude,
        longitude: this.tracking.longitude,
        user_agent: this.tracking.user_agent,
        device: this.tracking.device,
      };

      this.$axios({
        method: this.parameters.form.shipment_retur_detail_id ? "put" : "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success("Data berhasil di  Tambah");
          this.getRuteShipment();
          this.formReturReset();
          this.hideRetur();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
        });
    },

    formReset() {
      this.parameters.form.status = "";
      this.parameters.form.catatan = "";
      this.parameters.form.file = "";
    },

    formReturReset() {
      this.parameters.form.shipment_retur_detail_id = "";
      this.parameters.form.shipment_detail_id = "";
      this.parameters.form.quantity_retur = "";
      this.parameters.form.quantity_kirim = "";
      this.parameters.form.alasan = "";
      this.parameters.form.valuation_id = "";
    },

    onShowPicture(item) {
      this.$refs.pictureModal.title = "Bukti Kiriman";
      this.$refs.pictureModal.src = "file_bukti_kiriman/" + item.file;
      this.$refs.pictureModal.show();
    },

    //get shipment_detail

    async onSearchShipmentDetail() {
      if (!this.isLoadingGetShipmentDetail) {
        this.isLoadingGetShipmentDetail = true;

        await this.lookUp({
          url: `outbound/shipment/get-shipment-detail/${this.parameters.form.shipment_id}`,
          lookup: "custom6",
          query: "?lokasi_id=" + this.parameters.form.lokasi_id_tujuan,
        });

        this.isLoadingGetShipmentDetail = false;
      }
    },

    handleDo(value) {
      this.parameters.form.shipment_detail_id = value;
      this.parameters.form.quantity_kirim = value.quantity;
    },

    onGetValuation(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchValuation);

      this.isStopSearchValuation = setTimeout(() => {
        this.valuation_search = search;

        if (typeof isNext !== "function") {
          this.lookup_warehouses.current_page = isNext
            ? this.lookup_warehouses.current_page + 1
            : this.lookup_warehouses.current_page - 1;
        } else {
          this.lookup_warehouses.current_page = 1;
        }

        this.onSearchValuation();
      }, 600);
    },

    async onSearchValuation() {
      if (!this.isLoadingGetValuation) {
        this.isLoadingGetValuation = true;

        await this.lookUp({
          url: "master/valuation/get-valuation",
          lookup: "warehouses",
          query:
            "?search=" +
            this.valuation_search +
            "&page=" +
            this.lookup_warehouses.current_page +
            "&per_page=10",
        });

        this.isLoadingGetValuation = false;
      }
    },

    onGetAlasan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchAlasan);

      this.isStopSearchAlasan = setTimeout(() => {
        this.alasan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchAlasan();
      }, 600);
    },

    async onSearchAlasan() {
      if (!this.isLoadingGetAlasan) {
        this.isLoadingGetAlasan = true;

        await this.lookUp({
          url: "master/alasan-beda-plan/get-alasan-beda-plan",
          lookup: "custom1",
          query:
            "?search=" +
            this.alasan_search +
            "&tipe_alasan_id=4" +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetAlasan = false;
      }
    },

    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
      this.formReset();
    },
    handleFileChange(e) {
      let file = e.target.files[0];
      this.parameters.form.file = file;
    },

    showRetur() {
      this.showModalRetur = true;
    },
    hideRetur() {
      this.showModalRetur = false;
      this.formReturReset();
    },
    editRetur(item) {
      this.showModalRetur = true;
      this.parameters.form.shipment_retur_detail_id =
        item.shipment_retur_detail_id;
      this.parameters.form.shipment_detail_id = item.shipment_detail;
      this.parameters.form.quantity_retur = item.quantity_retur;
      this.parameters.form.quantity_kirim = item.quantity_kirim;
      this.parameters.form.alasan = item.alasan;
      this.parameters.form.valuation_id = item.valuation_id;
    },
    async deleteRetur(item) {
      try {
        let url = `lastmile/riwayat-shipment/delete-retur/${item.shipment_retur_detail_id}`;

        await this.$axios({
          url: url,
          method: "delete",
        }).then((res) => {
          this.$toaster.error("Data berhasil di  Hapus");
          this.getRuteShipment();
        });
      } catch (err) {
        this.$globalErrorToaster(this.$toaster, err);
      }
    },
  },
};
</script>
