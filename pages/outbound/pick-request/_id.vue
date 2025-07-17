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
            <div class="grid grid-flow-col grid-rows-5 w-full">
              <div class="form-group" v-if="isEditable">
                <input-horizontal
                  label="Kode Pick Request"
                  type="text"
                  name="kode_pick_request"
                  :isHorizontal="true"
                  v-model="parameters.form.kode_request"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div class="form-group">
                <input-horizontal
                  label="Doc Type External"
                  type="text"
                  name="doc_type_sap"
                  :isHorizontal="true"
                  v-model="parameters.form.doc_type_sap"
                  :required="false"
                />
              </div>
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
              <div v-if="!user.gudang_id" class="w-full">
                <ValidationProvider name="gudang" rules="required">
                  <div slot-scope="{ errors, valid }">
                    <!-- <div class="w-full flex justify-between">
                      <label for="" class="w-1/2"
                        >Gudang <span class="text-danger">*</span></label
                      >
                      <v-select
                        class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_gudang"
                        :loading="isLoadingGetGudang"
                        :options="lookup_roles.data"
                        :filterable="false"
                        @search="onGetGudang"
                        :reduce="(item) => item.gudang_id"
                        v-model="parameters.form.gudang_id"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_roles.data.length || search"
                        >
                          <span
                            v-if="lookup_roles.current_page > 1"
                            @click="onGetGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_roles.last_page > lookup_roles.current_page
                            "
                            @click="onGetGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div> -->
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
                    />
                    <div class="w-full flex justify-end">
                      <span
                        class="text-danger text-xs pl-1 w-1/2"
                        v-if="errors[0]"
                        >{{ errors[0] }}</span
                      >
                    </div>
                  </div>
                </ValidationProvider>
              </div>
              <ValidationProvider name="lokasi">
                <select-button
                  :self="{
                    label: 'Lokasi',
                    optionLabel: 'nama_lokasi',
                    lookup: lookup_location,
                    value: parameters.form.lokasi_id,
                    onGet: onGetLokasi,
                    isLoadingL: isLoadingGetLokasi,
                    input: onSelectAsalMuat,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <!-- <div class="form-group">
                <input-horiontal
                  label="Tanggal Pembuatan"
                  type="date"
                  name="tanggal"
                  v-model="parameters.form.tanggal"
                  :required="true"
                />
              </div> -->

              <div class="form-group">
                <input-horiontal
                  label="Tanggal"
                  type="text"
                  name="tanggal"
                  v-model="parameters.form.tanggal"
                  :required="true"
                />
              </div>

              <ValidationProvider name="pengemudi">
                <div class="form-group mb-5" slot-scope="{ errors, valid }">
                  <select-button
                    :self="{
                      label: 'Pengemudi',
                      optionLabel: 'nama_pengemudi',
                      lookup: lookup_custom3,
                      value: parameters.form.pengemudi_id,
                      onGet: onGetPengemudi,
                      isLoadingL: isLoadingGetPengemudi,
                      input: onSelectPengemudi,
                    }"
                    width="w-[50%]"
                    class="mb-5"
                  />
                  <!-- <div class="w-full flex justify-between">
                    <label for="" class="w-1/2">Pengemudi </label>
                    <v-select
                      class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_pengemudi"
                      :loading="isLoadingGetPengemudi"
                      :options="lookup_custom3.data"
                      :filterable="false"
                      @search="onGetPengemudi"
                      v-model="parameters.form.pengemudi_id"
                      @input="onSelectPengemudi"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom3.data.length || search"
                      >
                        <span
                          v-if="lookup_custom3.current_page > 1"
                          @click="onGetPengemudi(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom3.last_page >
                            lookup_custom3.current_page
                          "
                          @click="onGetPengemudi(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div> -->
                </div>
              </ValidationProvider>
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
          <div
            class="mb-3 mt-7 text-xl font-bold uppercase flex justify-between items-start w-full"
          >
            <span class="w-1/2">
              <h1>Pick Request Detail</h1>
            </span>
            <div class="w-full relative flex justify-end gap-2">
              <button
                type="button"
                @click="addPickRequestDetail"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Tambah Detail ASN</p>
              </button>
            </div>
          </div>
          <div
            class="mt-4 overflow-auto w-full bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <table
              class="table border-collapse border border-gray-300 mt-5 table-fixed"
            >
              <thead>
                <tr class="text-sm uppercase">
                  <th class="w-[20%] border border-gray-300 text-center">
                    Delete
                  </th>
                  <!-- <th class="w-40 border border-gray-300">Item</th> -->
                  <!-- <th class="w-40 border border-gray-300">Item Pelanggan</th> -->
                  <th class="w-[25%] border border-gray-300">Item</th>
                  <!-- <th class="w-40 border border-gray-300">Zona Gudang</th> -->
                  <th class="w-[25%] border border-gray-300">Quantity</th>
                  <!-- <th class="w-40 border border-gray-300">Serial Number</th> -->
                  <!-- <th class="w-40 border border-gray-300">Nomor Referensi</th> -->
                  <!-- <th class="w-40 border border-gray-300">Dimensi</th> -->
                  <!-- <th class="w-40 border border-gray-300">Lebar</th>
                  <th class="w-40 border border-gray-300">Tinggi</th>
                  <th class="w-40 border border-gray-300">Berat</th> -->
                  <th class="w-[30%] border border-gray-300">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in parameters.form.detail_pick_request"
                  :key="index"
                  class="border-t border-gray-400 align-top"
                >
                  <td class="text-center text-gray-600 border border-gray-300">
                    <i
                      class="fas fa-trash mx-auto"
                      style="cursor: pointer"
                      @click="onDeleteItem(index)"
                    ></i>
                  </td>
                  <!-- <td class="border border-gray-300">
                    <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_item"
                      :loading="isLoadingGetItem"
                      :options="lookup_packing.data"
                      :filterable="false"
                      @search="onGetItem"
                      :reduce="(item) => item.item_id"
                      v-model="item.item_id"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_packing.data.length || search"
                      >
                        <span
                          v-if="lookup_packing.current_page > 1"
                          @click="onGetItem(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_packing.last_page >
                            lookup_packing.current_page
                          "
                          @click="onGetItem(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </td> -->
                  <!-- <td class="border border-gray-300">
                    <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_item_pelanggan"
                      :loading="isLoadingGetPelanggan"
                      :options="lookup_department.data"
                      :filterable="false"
                      @search="onGetPelanggan"
                      :reduce="(item) => item.item_pelanggan_id"
                      v-model="item.item_pelanggan_id"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_department.data.length || search"
                      >
                        <span
                          v-if="lookup_department.current_page > 1"
                          @click="onGetPelanggan(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_department.last_page >
                            lookup_department.current_page
                          "
                          @click="onGetPelanggan(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </td> -->
                  <td class="border border-gray-300">
                    <div class="w-full">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                        label="nama_item"
                        :loading="isLoadingGetItemGudang"
                        :options="lookup_defects.data"
                        :filterable="false"
                        @search="onGetItemGudang"
                        v-model="item.item_gudang_id"
                        @input="(item) => onSelectItemGudang(item, index)"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_defects.data.length || search"
                        >
                          <span
                            v-if="lookup_defects.current_page > 1"
                            @click="onGetItemGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_defects.last_page >
                              lookup_defects.current_page
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
                  <!-- <td class="border border-gray-300">
                    <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_zona_gudang"
                      :loading="isLoadingGetZonaGudang"
                      :options="lookup_regus.data"
                      :filterable="false"
                      @search="onGetZonaGudang"
                      :reduce="(item) => item.zona_gudang_id"
                      v-model="item.zona_gudang_id_plan"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_regus.data.length || search"
                      >
                        <span
                          v-if="lookup_regus.current_page > 1"
                          @click="onGetZonaGudang(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_regus.last_page > lookup_regus.current_page
                          "
                          @click="onGetZonaGudang(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </td> -->
                  <td class="border border-gray-300">
                    <p>Quantity:</p>
                    <money
                      v-model="item.quantity"
                      class="w-full pl-2 py-1 mb-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                    <p>Quantity Order:</p>
                    <money
                      v-model="item.quantity_order"
                      class="w-full pl-2 py-1 mb-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                    <p>Quantity Termuat:</p>
                    <money
                      v-model="item.quantity_termuat"
                      class="w-full pl-2 py-1 mb-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                    <p>Quantity Terkirim:</p>
                    <money
                      v-model="item.quantity_terkirim"
                      class="w-full pl-2 py-1 mb-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </td>
                  <!-- <td class="border border-gray-300">
                    <input-form
                      label=""
                      type="text"
                      name="serial_number"
                      :required="false"
                      v-model="item.serial_number"
                    />
                  </td>
                  <td class="border border-gray-300">
                    <input-form
                      label=""
                      type="text"
                      name="no_referensi"
                      :required="false"
                      v-model="item.no_referensi"
                    />
                  </td>
                  <td class="border border-gray-300">
                    <span>
                      <label for="" class="text-[10px]">Panjang</label>

                      <money
                        v-model="item.panjang"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </span>
                    <span>
                      <label for="" class="text-[10px]">Lebar</label>

                      <money
                        v-model="item.lebar"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </span>
                    <span>
                      <label for="" class="text-[10px]">Tinggi</label>
                      <money
                        v-model="item.tinggi"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </span>
                    <span>
                      <label for="" class="text-[10px]">Berat</label>
                      <money
                        v-model="item.berat"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </span>
                  </td> -->

                  <td class="border border-gray-300">
                    <textarea
                      placeholder="keterangan"
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      v-model="item.keterangan"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
              <tr v-if="!parameters.form.detail_pick_request.length > 0">
                <td colspan="12" class="text-center">
                  <span class="flex justify-center w-full">
                    <img
                      src="/img/data-not-found.svg"
                      alt="Data Tidak Ditemukan"
                      class="h-64 object-cover"
                    />
                  </span>
                  <div class="mt-3 w-full">Data Tidak Ditemukan</div>
                </td>
              </tr>
            </table>
          </div>
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
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearcnKendaraan: false,
      isLoadingGetKendaraan: false,
      kendaraan_search: "",

      isStopSearchPengemudi: false,
      isLoadingGetPengemudi: false,
      pengemudi_search: "",

      isStopSearchSupplier: false,
      isLoadingGetSupplier: false,
      supplier_search: "",

      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchItem: false,
      isLoadingGetItem: false,
      item_search: "",

      // isStopSearchPelanggan: false,
      // isLoadingGetPelanggan: false,
      // pelanggan_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pick Request",
      parameters: {
        url: "outbound/pick-request",
        form: {
          pick_request_id: "",
          kode_stok_transfer: "",
          kode_pick_request: "",
          doc_type_sap: "",
          tanggal: "",
          no_referensi_1: "",
          no_referensi_2: "",
          no_referensi_3: "",
          lokasi_id: "",
          gudang_id: "",
          status_transaksi_id: "",
          keterangan: "",

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",

          // asn detail
          detail_pick_request: [],
        },
      },
      formPickRequest: {
        detail_pick_request_id: "",
        item_id: "",
        item_pelanggan_id: "",
        item_gudang_id: "",
        quantity: "",
        quantity_order: "",
        quantity_termuat: "",
        quantity_terkirim: "",
        keterangan: "",
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`outbound/pick-request/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          this.parameters.form[item] = res.data[item];
        });

        this.parameters.form.gudang_id = res.data.gudang || "";
        this.parameters.form.lokasi_id = res.data.lokasi || "";
        this.parameters.form.status_transaksi_id =
          res.data.status_transaksi || "";
        // this.onSelectKendaraan(res.data.kendaraan);
        // this.parameters.form.pengemudi_id = res.data.pengemudi || "";
        // this.onSelectPengemudi(res.data.pengemudi);

        this.parameters.form.detail_pick_request =
          res.data.detail_pick_request.map((item) => {
            return {
              ...item,
              detail_pick_request_id: item || null,
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
    await this.onSearchLokasi();
    await this.onSearchGudang();
    await this.onSearchItem();
    // await this.onSearchPelanggan();
    await this.onSearchItemGudang();
    await this.onSearchZonaGudang();
    this.getGeoLocation();
    this.getUserAgent();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //vendor
      "lookup_custom2", //kendaraan
      "lookup_custom3", //pengemudi
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
      this.parameters.form.detail_pick_request.push({
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

      let formData = {
        ...this.parameters.form,
        gudang_id:
          typeof this.parameters.form.gudang_id === "object"
            ? this.parameters.form.gudang_id.gudang_id
            : this.parameters.form.gudamg_id,
        status_transaksi_id:
          typeof this.parameters.form.status_transaksi_id === "object"
            ? this.parameters.form.status_transaksi_id.status_transaksi_id
            : this.parameters.form.status_transaksi_id,
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
      };

      // formData.tanggal = formattedDate;

      formData.detail_pick_request = formData.detail_pick_request.map(
        (item) => {
          return {
            ...item,
            detail_pick_request_id: item.detail_pick_request_id
              ? item.detail_pick_request_id
              : "",
            item_gudang_id:
              typeof item.item_gudang_id === "object"
                ? item.item_gudang_id.item_gudang_id
                : item.item_gudang_id,
          };
        }
      );

      // if (this.user.gudang_id) {
      //   this.parameters.form.gudang_id = this.user.gudang_id;
      // }

      // console.log("form", this.parameters.form);

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
              doc_type_sap: "",
              tanggal: "",
              no_referensi_1: "",
              no_referensi_2: "",
              no_referensi_3: "",
              lokasi_id: "",
              gudang_id: "",
              status_transaksi_id: "",

              //Tracking
              user_agent: "",
              device: "",
              longitude: "",
              latitude: "",

              // asn detail
              detail_pick_request: [],
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
      // if (this.result == true) {
      //   this.$toaster.success(
      //     "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
      //   );

      //   this.isEditable = false;
      //   this.parameters.form = {
      //     gudang_id: "",
      //     kode_asp: "",
      //     doc_type_sap: "",
      //     tanggal: "",
      //     lokasi_id_asal_muat: "",
      //     asal_muat: "",
      //     vendor_id_transporter: "",
      //     nama_transporter: "",
      //     surat_jalan: "",
      //     no_referensi: "",
      //     no_referensi_2: "",
      //     kendaraan_id: "",
      //     pengemudi_id: "",
      //     supplier_id: "",
      //     perkiraan_tiba: "",
      //     kebutuhan_peralatan: "",
      //     handling_instruction: "",
      //     catatan: "",

      //     //Tracking
      //     user_agent: "",
      //     device: "",
      //     longitude: "",
      //     latitude: "",
      //     asn_details: [],
      //   };
      //   this.$refs.formValidate.reset();
      //   // this.$refs.ruteProvider.reset();
      //   this.$router.back();
      // } else {
      //   this.$globalErrorToaster(this.$toaster, this.error);
      // }
    },

    AddPickRequestDetail() {
      this.parameters.form.detail_pick_request.push({
        detail_pick_request_id: "",
        item_id: "",
        item_pelanggan_id: "",
        item_gudang_id: "",
        quantity: "",
        quantity_order: "",
        quantity_termuat: "",
        quantity_terkirim: "",
        keterangan: "",
      });
    },

    onDeleteItem(index) {
      this.parameters.form.detail_pick_request =
        this.parameters.form.detail_pick_request.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    // Get Vendor
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

    // Get Kendaraan
    onGetKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

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

    // Get Pengemudi
    onGetPengemudi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPengemudi);

      this.isStopSearchPengemudi = setTimeout(() => {
        this.pengemudi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchPengemudi();
      }, 600);
    },

    async onSearchPengemudi() {
      if (!this.isLoadingGetPengemudi) {
        this.isLoadingGetPengemudi = true;

        await this.lookUp({
          url: "master/pengemudi/get-pengemudi",
          lookup: "custom3",
          query:
            "?search=" +
            this.pengemudi_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPengemudi = false;
      }
    },

    // Get Suppliers
    onGetSupplier(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSupplier);

      this.isStopSearchSupplier = setTimeout(() => {
        this.supplier_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchSupplier();
      }, 600);
    },

    async onSearchSupplier() {
      if (!this.isLoadingGetSupplier) {
        this.isLoadingGetSupplier = true;

        await this.lookUp({
          url: "master/supplier/get-supplier",
          lookup: "suppliers",
          query:
            "?search=" +
            this.supplier_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSupplier = false;
      }
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
          url: "master/lokasi/get-lokasi",
          lookup: "location",
          query:
            "?search=" +
            this.lokasi_search +
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
          url: "master/gudang/get-gudang",
          lookup: "roles",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    // Get Item
    onGetItem(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItem);

      this.isStopSearchItem = setTimeout(() => {
        this.item_search = search;

        if (typeof isNext !== "function") {
          this.lookup_packing.current_page = isNext
            ? this.lookup_packing.current_page + 1
            : this.lookup_packing.current_page - 1;
        } else {
          this.lookup_packing.current_page = 1;
        }

        this.onSearchItem();
      }, 600);
    },

    async onSearchItem() {
      if (!this.isLoadingGetItem) {
        this.isLoadingGetItem = true;

        await this.lookUp({
          url: "master/item/get-item",
          lookup: "packing",
          query:
            "?search=" +
            this.item_search +
            "&page=" +
            this.lookup_packing.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItem = false;
      }
    },

    //Get Item Pelanggan
    // onGetPelanggan(search, isNext) {
    //   if (!search.length && typeof isNext === "function") return false;

    //   clearTimeout(this.isStopSearchPelanggan);

    //   this.isStopSearchPelanggan = setTimeout(() => {
    //     this.pelanggan_search = search;

    //     if (typeof isNext !== "function") {
    //       this.lookup_department.current_page = isNext
    //         ? this.lookup_department.current_page + 1
    //         : this.lookup_department.current_page - 1;
    //     } else {
    //       this.lookup_department.current_page = 1;
    //     }

    //     this.onSearchPelanggan();
    //   }, 600);
    // },

    // async onSearchPelanggan() {
    //   if (!this.isLoadingGetPelanggan) {
    //     this.isLoadingGetPelanggan = true;

    //     await this.lookUp({
    //       url: "master/item-pelanggan/get-item-pelanggan",
    //       lookup: "department",
    //       query:
    //         "?search=" +
    //         this.pelanggan_search +
    //         "&page=" +
    //         this.lookup_department.current_page +
    //         "&per_page=10",
    //     });

    //     this.isLoadingGetPelanggan = false;
    //   }
    // },

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
            "&gudang_id" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_defects.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },

    //Get Zona Gudang
    onGetZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchZonaGudang);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.zona_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }

        this.onSearchZonaGudang();
      }, 600);
    },

    async onSearchZonaGudang() {
      if (!this.isLoadingGetZonaGudang) {
        this.isLoadingGetZonaGudang = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "regus",
          query:
            "?search=" +
            this.zona_gudang_search +
            "&page=" +
            this.lookup_regus.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaGudang = false;
      }
    },

    //select gudang
    onSelectGudang(item, index) {
      if (item) {
        this.parameters.form.gudang_id = item;
      } else {
        this.parameters.form.gudang_id = "";
      }
    },
    onSelectSupplier(item, index) {
      if (item) {
        this.parameters.form.supplier_id = item;
      } else {
        this.parameters.form.supplier_id = "";
      }
    },
    //select item gudang
    onSelectItemGudang(item, index) {
      if (item) {
        this.parameters.form.detail_pick_request[index].item_gudang_id =
          item.item_gudang_id;
      } else {
        this.parameters.form.detail_pick_request[index].item_gudang_id = "";
      }
    },

    onSelectAsalMuat(item) {
      if (item) {
        this.parameters.form.lokasi_id_asal_muat = item;
        this.parameters.form.asal_muat = item.nama_lokasi;
      } else {
        this.parameters.form.lokasi_id_asal_muat = "";
        this.parameters.form.asal_muat = "";
      }
    },

    onSelectTransporter(item) {
      if (item) {
        this.parameters.form.vendor_id_transporter = item;
        this.parameters.form.nama_transporter = item.nama_vendor;
      } else {
        this.parameters.form.vendor_id_transporter = "";
        this.parameters.form.nama_transporter = "";
      }
    },

    onSelectKendaraan(item) {
      if (item) {
        this.parameters.form.kendaraan_id = item;
        this.parameters.form.nama_kendaraan = item.plat_nomor;
      } else {
        this.parameters.form.kendaraan_id = "";
        this.parameters.form.nama_kendaraan = "";
      }
    },

    onSelectPengemudi(item) {
      if (item) {
        this.parameters.form.pengemudi_id = item;
        this.parameters.form.nama_pengemudi = item.nama_pengemudi;
      } else {
        this.parameters.form.pengemudi_id = "";
        this.parameters.form.nama_pengemudi = "";
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        pick_request_id: "",
        kode_stok_transfer: "",
        kode_pick_request: "",
        doc_type_sap: "",
        tanggal: "",
        no_referensi_1: "",
        no_referensi_2: "",
        no_referensi_3: "",
        lokasi_id: "",
        gudang_id: "",
        status_transaksi_id: "",
        keterangan: "",

        //Tracking
        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",

        // asn detail
        detail_pick_request: [],
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
  },
};
</script>
