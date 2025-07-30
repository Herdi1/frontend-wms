<template>
  <section class="section h-screen">
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
                  label="Kode Pick Order"
                  type="text"
                  name="kode_pick_order"
                  :isHorizontal="true"
                  v-model="parameters.form.kode_pick_order"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Nomor Referensi 1"
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
              <div class="form-group">
                <input-horiontal
                  label="Tanggal"
                  type="date"
                  name="tanggal"
                  v-model="parameters.form.tanggal"
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
            </div>
          </div>

          <TabComponent :tabs="tabs">
            <template #DetailProduk>
              <h1 class="text-xl font-bold">Detail Produk</h1>
              <div class="w-full flex justify-between items-center mt-5">
                <div class="w-1/2">
                  <select-button
                    :self="{
                      label: 'Pick Order',
                      optionLabel: 'nama_pick_order',
                      lookup: lookup_custom6,
                      value: parameters.form.pick_order_id,
                      onGet: onGetPickOrder,
                      isLoadingL: isLoadingGetPickOrder,
                      input: onSelectPickOrder,
                    }"
                    width="w-[50%]"
                    class="mb-5"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    @click="AddDetailProduk"
                    class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Detail Produk</p>
                  </button>
                </div>
              </div>
              <div class="table-responsive overflow-y-hidden mb-7">
                <table
                  class="table border-collapse border border-gray-300 mt-5 h-60 overflow-auto table-fixed"
                >
                  <thead>
                    <tr class="text-sm uppercase text-nowrap">
                      <th class="w-[100px] border border-gray-300 text-center">
                        Hapus
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Nama Item
                      </th>
                      <th class="w-[200px] border border-gray-300">Zona</th>
                      <th class="w-[200px] border border-gray-300">
                        Serial Number
                      </th>
                      <th class="w-[200px] border border-gray-300">Quantity</th>
                      <th class="w-[200px] border border-gray-300">
                        Keterangan Detail
                      </th>
                      <th class="w-[250px] border border-gray-300">
                        Nomor Surat Perintah Jalan
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Tujuan Kiriman
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in parameters.form.detail_produk"
                      :key="i"
                      class="border-t align-top"
                    >
                      <td
                        class="text-center text-gray-600 border border-gray-300"
                      >
                        <i
                          class="fas fa-trash mx-auto"
                          style="cursor: pointer"
                          @click="onDeleteDetailProduk(i)"
                        ></i>
                      </td>
                      <td class="border border-gray-300">
                        <div class="w-full">
                          <v-select
                            class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                            label="nama_item"
                            :loading="isLoadingGetItemGudang"
                            :options="lookup_custom3.data"
                            :filterable="false"
                            @search="onGetItemGudang"
                            v-model="item.item_gudang_id"
                          >
                            <!-- @input="(item) => onSelectItemGudang(item, index)" -->
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom3.data.length || search"
                            >
                              <span
                                v-if="lookup_custom3.current_page > 1"
                                @click="onGetItemGudang(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom3.last_page >
                                  lookup_custom3.current_page
                                "
                                @click="onGetItemGudang(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>

                          <p v-if="item.item_gudang_id">
                            {{ item.item_gudang_id.nama_item }}
                          </p>
                        </div>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_zona_gudang"
                          :loading="isLoadingGetZonaGudang"
                          :options="lookup_custom4.data"
                          :filterable="false"
                          @search="onGetZonaGudang"
                          :reduce="(item) => item.zona_gudang_id"
                          v-model="item.zona_gudang_id_plan"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom4.data.length || search"
                          >
                            <span
                              v-if="lookup_custom4.current_page > 1"
                              @click="onGetZonaGudang(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom4.last_page >
                                lookup_custom4.current_page
                              "
                              @click="onGetZonaGudang(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <input-form
                          label=""
                          type="text"
                          name="serial_number"
                          :required="false"
                          v-model="item.serial_number"
                        />
                      </td>
                      <td class="border border-gray-300">
                        <money
                          v-model="item.quantity"
                          class="w-full pl-2 py-1 border rounded focus:outline-none"
                          @keydown.native="
                            $event.key === '-' ? $event.preventDefault() : null
                          "
                        />
                      </td>
                      <td class="border border-gray-300">
                        <textarea
                          placeholder="Keterangan Detail"
                          class="w-full pl-2 py-1 border rounded focus:outline-none"
                          v-model="item.keterangan_detail"
                        ></textarea>
                      </td>
                      <td class="border border-gray-300">
                        <input-form
                          label=""
                          type="text"
                          name="nomor_surat_perintah_jalan"
                          :required="false"
                          v-model="item.nomor_surat_perintah_jalan"
                        />
                      </td>
                      <td class="border border-gray-300">
                        <input-form
                          label=""
                          type="text"
                          name="tujuan_kiriman"
                          :required="false"
                          v-model="item.tujuan_kiriman"
                        />
                      </td>
                    </tr>
                    <tr v-if="!parameters.form.detail_produk.length > 0">
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
              </div>
            </template>
            <template #DetailBiaya>
              <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-bold">Detail Biaya</h1>
                <div class=" ">
                  <button
                    type="button"
                    @click="AddDetailBiaya"
                    class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Detail Biaya</p>
                  </button>
                </div>
              </div>
              <div class="table-responsive overflow-y-hidden mb-7">
                <table
                  class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                  :class="
                    parameters.form.detail_biaya.length ? 'mb-[300px]' : ''
                  "
                >
                  <thead>
                    <tr class="text-sm uppercase text-nowrap w-full">
                      <th class="w-[100px] border border-gray-300 text-center">
                        Hapus
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Jenis Biaya
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Nominal Satuan
                      </th>
                      <th class="w-[200px] border border-gray-300">Jumlah</th>
                      <th class="w-[200px] border border-gray-300">Total</th>
                      <th class="w-[200px] border border-gray-300">COA</th>
                      <th class="w-[200px] border border-gray-300">Divisi</th>
                      <th class="w-[200px] border border-gray-300">Vendor</th>
                      <th class="w-[200px] border border-gray-300">
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in parameters.form.detail_biaya"
                      :key="i"
                      class="border-t align-top"
                    >
                      <td
                        class="text-center text-gray-600 border border-gray-300"
                      >
                        <i
                          class="fas fa-trash mx-auto"
                          style="cursor: pointer"
                          @click="onDeleteDetailBiaya(i)"
                        ></i>
                      </td>
                      <td class="border border-gray-300">
                        <div class="w-full">
                          <v-select
                            class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                            label="nama_jenis_biaya"
                            :loading="isLoadingGetJenisBiaya"
                            :options="lookup_custom5.data"
                            :filterable="false"
                            @search="onGetJenisBiaya"
                            v-model="item.item_jenis_biaya_id"
                          >
                            <!-- @input="(item) => onSelectItemGudang(item, index)" -->
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom5.data.length || search"
                            >
                              <span
                                v-if="lookup_custom5.current_page > 1"
                                @click="onGetJenisBiaya(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom5.last_page >
                                  lookup_custom5.current_page
                                "
                                @click="onGetJenisBiaya(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>

                          <p v-if="item.item_gudang_id">
                            {{ item.item_gudang_id.nama_item }}
                          </p>
                        </div>
                      </td>
                      <td class="border border-gray-300">
                        <money
                          v-model="item.nominal_satuan"
                          class="w-full pl-2 py-1 border rounded focus:outline-none"
                          @keydown.native="
                            $event.key === '-' ? $event.preventDefault() : null
                          "
                        />
                      </td>
                      <td class="border border-gray-300">
                        <money
                          v-model="item.jumlah"
                          class="w-full pl-2 py-1 border rounded focus:outline-none"
                          @keydown.native="
                            $event.key === '-' ? $event.preventDefault() : null
                          "
                        />
                      </td>
                      <td class="border border-gray-300">
                        <money
                          v-model="item.total"
                          class="w-full pl-2 py-1 border rounded focus:outline-none"
                          @keydown.native="
                            $event.key === '-' ? $event.preventDefault() : null
                          "
                        />
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          label="nama_coa"
                          :loading="isLoadingGetCoa"
                          :options="lookup_custom7.data"
                          :filterable="false"
                          @search="onGetCoa"
                          v-model="item.coa_id"
                          :reduce="(item) => item.coa_id"
                          class="w-full"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom7.data.length || search"
                          >
                            <span
                              v-if="lookup_custom7.current_page > 1"
                              @click="onGetCoa(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom7.last_page >
                                lookup_custom7.current_page
                              "
                              @click="onGetCoa(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          label="nama_divisi"
                          :loading="isLoadingGetDivisi"
                          :options="lookup_custom8.data"
                          :filterable="false"
                          @search="onGetDivisi"
                          v-model="item.divisi_id"
                          :reduce="(item) => item.divisi_id"
                          class="w-full"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom8.data.length || search"
                          >
                            <span
                              v-if="lookup_custom8.current_page > 1"
                              @click="onGetDivisi(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom8.last_page >
                                lookup_custom8.current_page
                              "
                              @click="onGetDivisi(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          label="nama_vendor"
                          :loading="isLoadingGetVendor"
                          :options="lookup_custom9.data"
                          :filterable="false"
                          @search="onGetVendor"
                          v-model="item.vendor_id"
                          :reduce="(item) => item.vendor_id"
                          class="w-full"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom9.data.length || search"
                          >
                            <span
                              v-if="lookup_custom9.current_page > 1"
                              @click="onGetVendor(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom9.last_page >
                                lookup_custom9.current_page
                              "
                              @click="onGetVendor(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <textarea
                          placeholder="Keterangan"
                          class="w-full pl-2 py-1 border rounded focus:outline-none"
                          v-model="item.keterangan"
                        ></textarea>
                      </td>
                    </tr>
                    <tr v-if="!parameters.form.detail_biaya.length > 0">
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
              </div>
            </template>
          </TabComponent>

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
import TabComponent from "./tabComponent.vue";
import DetailProduk from "./detailProduk.vue";
import DetailBiaya from "./detailBiaya.vue";
export default {
  props: ["self"],
  middleware: ["checkRoleUserDetail"],

  components: {
    TabComponent,
    DetailProduk,
    DetailBiaya,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        {
          name: "Detail Produk",
          slotName: "DetailProduk",
        },
        {
          name: "Detail Biaya",
          slotName: "DetailBiaya",
        },
      ],
      id,

      user: this.$auth.user,

      isStopSearchPengemudi: false,
      isLoadingGetPengemudi: false,
      pengemudi_search: "",

      isStopSearchKendaraan: false,
      isLoadingGetKendaraan: false,
      kendaraan_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

      isStopSearchJenisBiaya: false,
      isLoadingGetJenisBiaya: false,
      jenis_biaya_search: "",

      isStopSearchPickOrder: false,
      isLoadingGetPickOrder: false,
      pick_order_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchDivisi: false,
      isLoadingGetDivisi: false,
      divisi_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Delivery Order",
      parameters: {
        url: "outbound/approve-pick-order",
        form: {
          pick_order_id: "",
          kode_pick_order: "",
          tanggal: "",
          pengemudi_id: "",
          kendaraan_id: "",
          no_referensi_1: "",
          no_referensi_2: "",
          no_referensi_3: "",
          detail_produk: [],
          detail_biaya: [],

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

        this.parameters.form.detail_produk = res.data.detail_produk.map(
          (item) => {
            return {
              ...item,
              detail_produk_id: item,
              item_gudang_id: item.detail_produk.item_gudang_id,
              zona_gudang_id: item.detail_produk.zona_gudang_id,
            };
          }
        );

        if (res.data.detail_biaya) {
          this.parameters.form.detail_biaya = res.data.detail_biaya.map(
            (item) => {
              return {
                ...item,
                detail_biaya_id: item,
                jenis_biaya_id: item.detail_biaya.jenis_biaya_id,
                coa_id: item.detail_biaya.coa_id,
                divisi_id: item.detail_biaya.divisi_id,
                vendor_id: item.detail_biaya.vendor_id,
              };
            }
          );
        }
        this.isLoadingPage = false;
      }
    } catch (error) {
      console.log("error", error);
      //this.$router.back()
    }
  },

  async mounted() {
    await this.onSearchPengemudi();
    await this.onSearchKendaraan();
    await this.onSearchItemGudang();
    await this.onSearchZonaGudang();
    await this.onSearchJenisBiaya();
    await this.onSearchPickOrder();
    await this.onSearchCoa();
    await this.onSearchDivisi();
    await this.onSearchVendor();
    this.getGeoLocation();
    this.getUserAgent();
  },
  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //pengemudi
      "lookup_custom2", //kendaraan
      "lookup_custom3", //item_gudang
      "lookup_custom4", //zona_gudang
      "lookup_custom5", //jenis_biaya
      "lookup_custom6", //pick_order
      "lookup_custom7", //coa
      "lookup_custom8", //divisi
      "lookup_custom9", //vendor
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
        this.$toaster.error("geolocation not supported");
        // console.log("geolocation not supported");
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "outbound/delivery-order";

      let formData = {
        ...this.parameters.form,
        pengemudi_id:
          typeof this.parameters.form.pengemudi_id == "object"
            ? this.parameters.form.pengemudi_id.pengemudi_id
            : this.parameters.form.pengemudi_id,
        kendaraan_id:
          typeof this.parameters.form.kendaraan_id == "object"
            ? this.parameters.form.kendaraan_id.kendaraan_id
            : this.parameters.form.kendaraan_id,
      };

      formData.detail_produk = formData.detail_produk.map((item) => {
        return {
          ...item,
          detail_produk_id: item.detail_produk_id ? item.detail_produk_id : "",
          item_gudang_id:
            typeof item.item_gudang_id == "object"
              ? item.item_gudang_id.item_gudang_id
              : item.item_gudang_id,
          zona_gudang_id:
            typeof item.zona_gudang_id == "object"
              ? item.zona_gudang_id.zona_gudang_id
              : item.zona_gudang_id,
        };
      });

      formData.detail_biaya = formData.detail_biaya.map((item) => {
        return {
          ...item,
          detail_biaya_id: item.detail_biaya_id ? item.detail_biaya_id : "",
          jenis_biaya_id:
            typeof item.jenis_biaya_id == "object"
              ? item.jenis_biaya_id.jenis_biaya_id
              : item.jenis_biaya_id,
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
            this.parameters.form = {
              kode_pick_order: "",
              tanggal: "",
              pengemudi_id: "",
              kendaraan_id: "",
              no_referensi_1: "",
              no_referensi_2: "",
              no_referensi_3: "",
              detail_produk: [],
              detail_biaya: [],
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
      this.parameters.form.detail_produk.push({
        detail_produk_id: "",
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
      this.parameters.form.detail_produk =
        this.parameters.form.detail_produk.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    AddDetailBiaya() {
      this.parameters.form.detail_biaya.push({
        detail_biaya_id: "",
        jenis_biaya_id: "",
        nominal_satuan: "",
        jumlah: "",
        total: "",
        coa_id: "",
        divisi_id: "",
        vendor_id: "",
        keterangan: "",
      });
    },

    onDeleteDetailBiaya(index) {
      this.parameters.form.detail_biaya =
        this.parameters.form.detail_biaya.filter(
          (_, itemIndex) => index !== itemIndex
        );
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

    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }
        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "custom3",
          query:
            "?search=" +
            this.item_gudang_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });
        this.isLoadingGetItemGudang = false;
      }
    },

    onGetZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchZonaGudang);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.zona_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }
        this.onSearchZonaudang();
      }, 600);
    },

    async onSearchZonaGudang() {
      if (!this.isLoadingGetZonaGudang) {
        this.isLoadingGetZonaGudang = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom4",
          query:
            "?search=" +
            this.zona_gudang_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });
        this.isLoadingGetZonaGudang = false;
      }
    },

    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.jenis_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }
        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "custom5",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });
        this.isLoadingGetJenisBiaya = false;
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

    onGetCoa(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoa);

      this.isStopSearchCoa = setTimeout(() => {
        this.coa_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchCoa();
      }, 600);
    },

    async onSearchCoa() {
      if (!this.isLoadingGetCoa) {
        this.isLoadingGetCoa = true;

        await this.lookUp({
          url: "finance/coa/get-coa",
          lookup: "custom7",
          query:
            "?search=" +
            this.coa_search +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom8",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDivisi = false;
      }
    },

    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom9",
          query:
            "?search=" +
            this.vendor_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
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

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_pick_order: "",
        tanggal: "",
        pengemudi_id: "",
        kendaraan_id: "",
        no_referensi_1: "",
        no_referensi_2: "",
        no_referensi_3: "",
        detail_produk: [],
        detail_biaya: [],
      };
    },
  },
};
</script>
