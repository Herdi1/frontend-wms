<template>
  <section class="section">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 class="text-xl font-bold mb-2 uppercase">Inspeksi ASN</h1>
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
          <div class="w-full pt-3">
            <div class="w-full flex justify-between items-center">
              <h1 class="text-xl font-bold">Data ASN</h1>
            </div>
            <div
              class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full mb-7"
              >
                <div>
                  <input-horizontal
                    label="Kode External"
                    type="text"
                    name="kode_sap"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.kode_sap"
                    :required="false"
                  />
                </div>
                <!-- <div>
                  <input-horizontal
                    label="Kode ASN"
                    type="text"
                    name="kode_asn"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.kode_asn"
                    :required="false"
                  />
                </div> -->
                <div>
                  <input-horizontal
                    label="Tanggal"
                    type="date"
                    name="tanggal"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.tanggal"
                    :required="false"
                  />
                </div>
                <div v-if="form.pelanggan">
                  <input-horizontal
                    label="Pelanggan"
                    type="text"
                    name="pelanggan"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.pelanggan.nama_pelanggan"
                    :required="false"
                  />
                </div>
                <div v-if="form.lokasi_asal_muat">
                  <input-horizontal
                    label="Asal Muat"
                    type="text"
                    name="lokasi_asal_muat"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.lokasi_asal_muat.nama_lokasi"
                    :required="false"
                  />
                </div>
                <div v-else>
                  <input-horizontal
                    label="Asal Muat"
                    type="text"
                    name="asal_muat"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.asal_muat"
                    :required="false"
                  />
                </div>
                <div v-if="form.vendor_transporter">
                  <input-horizontal
                    label="Transporter"
                    type="text"
                    name="nama_transporter"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.vendor_transporter.nama_vendor"
                    :required="false"
                  />
                </div>
                <div v-else>
                  <input-horizontal
                    label="Transporter"
                    type="text"
                    name="nama_transporter"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.nama_transporter"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Nomor Surat Jalan"
                    type="text"
                    name="surat_jalan"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.surat_jalan"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Nomor Referensi 1"
                    type="text"
                    name="no_referensi"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.no_referensi"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Nomor Referensi 2"
                    type="text"
                    name="no_referensi_2"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.no_referensi_2"
                    :required="false"
                  />
                </div>
                <div v-if="form.kendaraan">
                  <input-horizontal
                    label="Kendaraan"
                    type="text"
                    name="kendaraan"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.kendaraan.nama_kendaraan"
                    :required="false"
                  />
                </div>
                <div v-if="form.pengemudi">
                  <input-horizontal
                    label="Pengemudi"
                    type="text"
                    name="pengemudi"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.pengemudi.nama_pengemudi"
                    :required="false"
                  />
                </div>
                <div v-if="form.perekiraan_tiba">
                  <input-horizontal
                    label="Perkiraan Tiba"
                    type="date"
                    name="perkiraan_tiba"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.perkiraan_tiba"
                    :required="false"
                  />
                </div>
                <div class="col-span-3">
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label for="">Kebutuhan Peralatan</label>
                      <textarea
                        disabled
                        name="kebutuhan_peralatan"
                        v-model="form.kebutuhan_peralatan"
                        class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                      ></textarea>
                    </div>
                    <div>
                      <label for="">Handling Intruction</label>
                      <textarea
                        disabled
                        name="handling_instruction"
                        v-model="form.handling_instruction"
                        class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="col-span-3">
                  <label for="">Catatan</label>
                  <textarea
                    disabled
                    name="catatan"
                    v-model="form.catatan"
                    class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                  ></textarea>
                </div>
              </div>

              <!-- <div class="w-full flex justify-between items-center">
                <div class=" ">
                  <button
                  type="button"
                  @click="AddAsnDetails"
                  class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                  <i class="fas fa-plus"></i>
                  <p class="text-xs font-medium">Tambah Detail ASN</p>
                </button>
                </div>
              </div> -->
            </div>

            <!-- Detail ASN -->
            <div>
              <h1 class="text-xl font-bold">Detail ASN</h1>
            </div>
            <div
              class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            ></div>
            <!-- inspeksi -->
            <div>
              <h1 class="text-xl font-bold">Konfirmasi Bongkar ASN</h1>
            </div>
            <div
              class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div class="w-full flex flex-col gap-5">
                <div class="form-group flex items-center w-full">
                  <label for="status_bongkar" class="w-[30%]"
                    >Status Konfirmasi</label
                  >
                  <select
                    class="w-[70%] p-1 border rounded focus:outline-none"
                    name="status_bongkar"
                    id="status_bongkar"
                    v-model="form.status_bongkar"
                  >
                    <option value="">Pilih</option>
                    <option value="MENUNGGU">Menunggu</option>
                    <option value="PROSES">Proses</option>
                    <option value="SELESAI">Selesai</option>
                  </select>
                </div>
                <!-- <div class="form-group">
                  <input-horizontal
                    label="Tanggal Inspeksi"
                    type="date"
                    name="tanggal_konfirmasi"
                    labelWidth="w-[30%]"
                    inputWidth="w-[70%]"
                    :isHorizontal="true"
                    v-model="form.tanggal_konfirmasi"
                    :required="false"
                  />
                </div> -->
                <div class="col-span-2 flex items-center w-full">
                  <label for="catatan_bongkar" class="w-[30%]"
                    >Catatan Konfirmasi</label
                  >
                  <textarea
                    name="catatan_bongkar"
                    v-model="form.catatan_bongkar"
                    class="w-[70%] border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                  ></textarea>
                </div>
              </div>

              <!-- <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-bold">Detail ASN</h1>
                <div class=" ">
                </div>
              </div> -->
              <!-- <div class="table-responsive overflow-y-hidden mb-7">
                <table
                  class="table border-collapse border border-gray-300 mt-5 overflow-auto table-fixed"
                  :class="form.asn_details.length ? 'mb-[300px]' : ''"
                >
                  <thead>
                    <tr class="text-sm uppercase text-nowrap">
                      <th class="w-[200px] border border-gray-300">Item</th>
                      <th class="w-[200px] border border-gray-300">Nomor</th>
                      <th class="w-[200px] border border-gray-300">Quantity</th>
                      <th class="w-[200px] border border-gray-300">Dimensi</th>
                      <th class="w-[200px] border border-gray-300">
                        Zona Plan
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Aisle Plan
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Rack Plan
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Level Plan
                      </th>
                      <th class="w-[200px] border border-gray-300">Bin Plan</th>
                      <th class="w-[300px] border border-gray-300">Note</th>
                      <th class="w-[100px] border border-gray-300">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in form.asn_details"
                      :key="index"
                      style="border-top: 0.5px solid lightgray"
                      class="align-top mx-0"
                    >
                      <td class="border border-gray-300">
                        {{ item.item ? item.item.nama_item : "-" }}
                      </td>
                      <td class="border border-gray-300">
                        <div>
                          <p>
                            Serial Number:
                            {{ item.serial_number ? item.serial_number : "-" }}
                          </p>
                          <p>
                            Nomor Referensi:
                            {{ item.no_referensi ? item.no_referensi : "-" }}
                          </p>
                        </div>
                      </td>
                      <td class="border border-gray-300">
                        {{ item.quantity ? item.quantity : "-" }}
                      </td>
                      <td class="border border-gray-300">
                        <div>
                          <p v-if="item.panjang">Panjang: {{ item.panjang }}</p>
                          <p v-if="item.lebar">Lebar: {{ item.lebar }}</p>
                          <p v-if="item.tinggi">Tinggi: {{ item.tinggi }}</p>
                          <p v-if="item.berat">Berat: {{ item.berat }}</p>
                        </div>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          label="nama_zona_gudang"
                          :loading="isLoadingGetZonaPlan"
                          :options="lookup_custom1.data"
                          :filterable="false"
                          @search="onGetZonaPlan"
                          v-model="item.zona_gudang_id_plan"
                          :reduce="(item) => item.zona_gudang_id"
                          class="w-full"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom1.data.length || search"
                          >
                            <span
                              v-if="lookup_custom1.current_page > 1"
                              @click="onGetZonaPlan(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom1.last_page >
                                lookup_custom1.current_page
                              "
                              @click="onGetZonaPlan(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotAisle"
                          :options="lookup_custom2.data"
                          :filterable="false"
                          @search="onGetSlotAisle"
                          v-model="item.slot_penyimpanan_id_aisle_plan"
                          :reduce="(item) => item.slot_penyimpanan_id"
                          class="w-full"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom2.data.length || search"
                          >
                            <span
                              v-if="lookup_custom2.current_page > 1"
                              @click="onGetSlotAisle(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom2.last_page >
                                lookup_custom2.current_page
                              "
                              @click="onGetSlotAisle(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotRack"
                          :options="lookup_custom3.data"
                          :filterable="false"
                          @search="onGetSlotRack"
                          v-model="item.slot_penyimpanan_id_rack_plan"
                          :reduce="(item) => item.slot_penyimpanan_id"
                          class="w-full"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom3.data.length || search"
                          >
                            <span
                              v-if="lookup_custom3.current_page > 1"
                              @click="onGetSlotRack(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom3.last_page >
                                lookup_custom3.current_page
                              "
                              @click="onGetSlotRack(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotLevel"
                          :options="lookup_custom4.data"
                          :filterable="false"
                          @search="onGetSlotLevel"
                          v-model="item.slot_penyimpanan_id_level_plan"
                          :reduce="(item) => item.slot_penyimpanan_id"
                          class="w-full"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom4.data.length || search"
                          >
                            <span
                              v-if="lookup_custom4.current_page > 1"
                              @click="onGetSlotLevel(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom4.last_page >
                                lookup_custom4.current_page
                              "
                              @click="onGetSlotLevel(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotBin"
                          :options="lookup_custom5.data"
                          :filterable="false"
                          @search="onGetSlotBin"
                          v-model="item.slot_penyimpanan_id_bin_plan"
                          :reduce="(item) => item.slot_penyimpanan_id"
                          class="w-full"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom5.data.length || search"
                          >
                            <span
                              v-if="lookup_custom5.current_page > 1"
                              @click="onGetSlotBin(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom5.last_page >
                                lookup_custom5.current_page
                              "
                              @click="onGetSlotBin(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">{{ item.note }}</td>
                      <td class="border border-gray-300 text-center">
                        <i
                          class="fas fa-trash mx-auto"
                          style="cursor: pointer"
                          @click="onDeleteItem(index)"
                        ></i>
                      </td>
                    </tr>
                    <tr v-if="!form.asn_details.length > 0">
                      <td colspan="100" class="text-center">
                        <span class="flex justify-center">
                          <img
                            src="/img/data-not-found.svg"
                            style="height: 250px; object-fit: cover"
                          />
                        </span>
                        <div class="mt-3">Data Tidak Ditemukan</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> -->
            </div>
            <modal-footer-section
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
              class="mb-5"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchZonaPlan: false,
      isLoadingGetZonaPlan: false,
      zona_plan_search: "",

      isStopSearchSlotAisle: false,
      isLoadingGetSlotAisle: false,
      slot_aisle_search: "",

      isStopSearchSlotRack: false,
      isLoadingGetSlotRack: false,
      slot_rack_search: "",

      isStopSearchSlotLevel: false,
      isLoadingGetSlotLevel: false,
      slot_level_search: "",

      isStopSearchSlotBin: false,
      isLoadingGetSlotBin: false,
      slot_bin_search: "",

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Konfirmasi Bongkar ASN",
      url: "inbound/konfirmasi-bongkar-asn",

      form: {
        konfirmasi_bongkar_asn_id: "",
        gudang_id: "",
        supplier_id: "",
        kode_sap: "",
        kode_asn: "",
        tanggal: "",
        lokasi_asal_muat: {},
        asal_muat: "",
        nama_transporter: "",
        vendor_transporter: {},
        surat_jalan: "",
        nomor_referensi: "",
        nomor_referensi_2: "",
        kendaraan: {},
        pengemudi: {},
        perkiraan_tiba: "",
        kebutuhan_peralatan: "",
        handling_instruction: "",
        catatan: "",
        status_transaksi: {},

        status_bongkar: "",
        tanggal_bongkar: "",
        catatan_bongkar: "",
        asn_details: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      default_form: {
        inspeksi_asn_id: "",

        status_bongkar: "",
        tanggal_bongkar: "",
        catatan_bongkar: "",
        asn_details: [],

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
        let res = await this.$axios.get(
          `inbound/konfirmasi-bongkar-asn/${this.id}`
        );
        Object.keys(this.form).forEach((item) => {
          if (item !== "asn_details") {
            this.form[item] = res.data[item];
          }
        });

        this.form.asn_details = res.data.asn_details.map((item) => {
          return {
            ...item,
            asn_details_id: item || "",
          };
        });

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/inbound/konfirmasi-bongkar");
    }
  },

  async mounted() {
    await this.onSearchZonaPlan();
    await this.onSearchSlotAisle();
    await this.onSearchSlotRack();
    await this.onSearchSlotLevel();
    await this.onSearchSlotBin();
    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_custom4",
      "lookup_custom5",
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
      let url = "inbound/konfirmasi-bongkar-asn";

      let formData = {
        ...this.form,
      };

      // today's date
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      formData.tanggal_bongkar = formattedDate;

      formData.asn_details = formData.asn_details.map((item) => {
        return {
          ...item,
          asn_detail_id: item.asn_detail_id ? item.asn_detail_id : "",
        };
      });

      if (this.user.gudang_id) {
        this.form.gudang_id = this.user.gudang_id;
      }

      // console.log("form", this.parameters.form);

      if (this.isEditable) {
        url += "/" + this.id;
      }

      console.log(formData);

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
          this.$router.push("/inbound/inspeksi-asn");
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    AddAsnDetails() {
      this.form.asn_details.push({
        zona_gudang_id_plan: "",
        slot_penyimpanan_id_aisle_plan: "",
        slot_penyimpanan_id_rack_plan: "",
        slot_penyimpanan_id_level_plan: "",
        slot_penyimpanan_id_bin_plan: "",
        asn: {},
        gudang: {},
        item: {},
        pelanggan: {},
        item_gudang: {},
        setial_number: "",
        no_referensi: "",
        quantity: "",
        panjang: "",
        lebar: "",
        tinggi: "",
        berat: "",
        note: "",
      });
    },

    onDeleteItem(index) {
      this.form.asn_details = this.form.asn_details.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },

    // Get zona plan
    onGetZonaPlan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchZonaPlan);

      this.isStopSearchZonaPlan = setTimeout(() => {
        this.zona_plan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchZonaPlan();
      }, 600);
    },

    async onSearchZonaPlan() {
      if (!this.isLoadingGetZonaPlan) {
        this.isLoadingGetZonaPlan = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.zona_plan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaPlan = false;
      }
    },

    // Get slot aisle
    onGetSlotAisle(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotAisle);

      this.isStopSearchSlotAisle = setTimeout(() => {
        this.slot_aisle_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchSlotAisle();
      }, 600);
    },

    async onSearchSlotAisle() {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom2",
          query:
            "?search=" +
            this.slot_aisle_search +
            "&level=1" +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    // Get slot rack
    onGetSlotRack(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotRack);

      this.isStopSearchSlotRack = setTimeout(() => {
        this.slot_rack_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchSlotRack();
      }, 600);
    },

    async onSearchSlotRack() {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom3",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=2" +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    // Get slot level
    onGetSlotLevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotLevel);

      this.isStopSearchSlotLevel = setTimeout(() => {
        this.slot_level_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchSlotLevel();
      }, 600);
    },

    async onSearchSlotLevel() {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom4",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=3" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    // Get slot level
    onGetSlotBin(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotBin);

      this.isStopSearchSlotBin = setTimeout(() => {
        this.slot_bin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchSlotBin();
      }, 600);
    },

    async onSearchSlotBin() {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom5",
          query:
            "?search=" +
            this.slot_bin_search +
            "&level=4" +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },
  },
};
</script>
