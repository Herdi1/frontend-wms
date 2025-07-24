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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
              <div class="form-group" v-if="isEditable">
                <input-horiontal
                  label="Kode Stok Opname"
                  type="text"
                  name="kode_stok_opname"
                  v-model="parameters.form.kode_stok_opname"
                  :required="true"
                  :disabled="true"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Tanggal"
                  type="date"
                  name="tanggal"
                  v-model="parameters.form.tanggal"
                  :required="true"
                  :disabled="true"
                />
              </div>

              <ValidationProvider name="gudang_id" rules="required">
                <!-- <select-button
                  :self="{
                    label: 'Gudang',
                    optionLabel: 'nama_gudang',
                    lookup: lookup_custom1,
                    value: parameters.form.gudang_id,
                    onGet: onGetGudang,
                    isLoadingL: isLoadingGetGudang,
                    input: onSelectGudang,
                  }"
                  width="w-[50%]"
                  :required="true"
                  class="mb-5"
                /> -->
                <div
                  slot-scope="{ errors, valid }"
                  class="flex items-center justify-between pl-2 py-1"
                >
                  <label for="" class="w-1/2"
                    >Gudang <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                    label="nama_gudang"
                    :loading="isLoadingGetGudang"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetGudang"
                    v-model="parameters.form.gudang_id"
                    @input="onSelectGudang"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                    disabled
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom1.data.length || search"
                    >
                      <span
                        v-if="lookup_custom1.current_page > 1"
                        @click="onGetGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <div class="form-group flex items-start">
                <label for="keterangan" class="w-1/2 pt-1">Keterangan</label>
                <textarea
                  placeholder="Keterangan"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.keterangan"
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-between items-center mt-5">
            <h1 class="text-xl font-bold uppercase">Detail Stok Opname</h1>

            <div>
              <button
                type="button"
                @click="AddDetailItem"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Tambah Stok Opname</p>
              </button>
            </div>
          </div>
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                :class="
                  parameters.form.stok_opname_details.length ? 'mb-[200px]' : ''
                "
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <!-- <th class="w-[200px] border border-gray-300">
                      Nama Item <span class="text-danger">*</span>
                    </th> -->
                    <!-- <th class="w-[200px] border border-gray-300">
                      Item Pelanggan
                    </th> -->
                    <th class="w-[200px] border border-gray-300">
                      Item Gudang <span class="text-danger">*</span>
                    </th>
                    <!-- <th class="w-[200px] border border-gray-300">Supplier</th> -->
                    <th class="w-[200px] border border-gray-300">
                      Zona <span class="text-danger">*</span>
                    </th>
                    <th class="w-[200px] border border-gray-300">
                      Valuation <span class="text-danger">*</span>
                    </th>

                    <th class="w-[200px] border border-gray-300">
                      Lokasi Aisle
                    </th>
                    <th class="w-[200px] border border-gray-300">
                      Lokasi Rack
                    </th>
                    <th class="w-[200px] border border-gray-300">
                      Lokasi Level
                    </th>
                    <th class="w-[200px] border border-gray-300">Lokasi Bin</th>
                    <th class="w-[200px] border border-gray-300">
                      Stok Real <span class="text-danger">*</span>
                    </th>
                    <th class="w-[200px] border border-gray-300">
                      Stok Sistem <span class="text-danger">*</span>
                    </th>
                    <th class="w-[200px] border border-gray-300">
                      Stok Selisih <span class="text-danger">*</span>
                    </th>
                    <th class="w-[200px] border border-gray-300">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in parameters.form.stok_opname_details"
                    :key="i"
                    class="align-top border-t"
                  >
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                        label="nama_item"
                        :loading="isLoadingGetItemGudang"
                        :options="lookup_custom8.data"
                        :filterable="false"
                        @search="onGetItemGudang"
                        v-model="item.item_gudang_id"
                        @input="onSelectItem(i)"
                        disabled
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom8.data.length || search"
                        >
                          <span
                            v-if="lookup_custom8.current_page > 1"
                            @click="onGetItemGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom8.last_page >
                              lookup_custom8.current_page
                            "
                            @click="onGetItemGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>

                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_zona_gudang"
                        :loading="isLoadingGetZonaGudang"
                        :options="lookup_custom3.data"
                        :filterable="false"
                        @search="onGetZonaGudang"
                        v-model="item.zona_gudang_id"
                        @input="onSelectItem(i)"
                        disabled
                      >
                        <!-- :reduce="(item) => item.zona_gudang_id" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom3.data.length || search"
                        >
                          <span
                            v-if="lookup_custom3.current_page > 1"
                            @click="onGetZonaGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom3.last_page >
                              lookup_custom3.current_page
                            "
                            @click="onGetZonaGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                        label="nama_valuation"
                        :loading="isLoadingGetValuation"
                        :options="lookup_custom9.data"
                        :filterable="false"
                        @search="onGetValuation"
                        v-model="item.valuation_id"
                        @input="onSelectItem(i)"
                        disabled
                      >
                        <!-- :reduce="(item) => item.valuation_id" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom9.data.length || search"
                        >
                          <span
                            v-if="lookup_custom9.current_page > 1"
                            @click="onGetValuation(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom9.last_page >
                              lookup_custom9.current_page
                            "
                            @click="onGetValuation(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotAisle"
                        :options="lookup_custom4.data"
                        :filterable="false"
                        @search="onGetSlotAisle"
                        v-model="item.slot_penyimpanan_id_aisle"
                        @input="onSelectItem(i)"
                        disabled
                      >
                        <!-- :reduce="(item) => item.slot_penyimpanan_id" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom4.data.length || search"
                        >
                          <span
                            v-if="lookup_custom4.current_page > 1"
                            @click="onGetSlotAisle(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom4.last_page >
                              lookup_custom4.current_page
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
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotRack"
                        :options="lookup_custom5.data"
                        :filterable="false"
                        @search="onGetSlotRack"
                        v-model="item.slot_penyimpanan_id_rack"
                        @input="onSelectItem(i)"
                        disabled
                      >
                        <!-- :reduce="(item) => item.slot_penyimpanan_id" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom5.data.length || search"
                        >
                          <span
                            v-if="lookup_custom5.current_page > 1"
                            @click="onGetSlotRack(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom5.last_page >
                              lookup_custom5.current_page
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
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotLevel"
                        :options="lookup_custom6.data"
                        :filterable="false"
                        @search="onGetSlotLevel"
                        v-model="item.slot_penyimpanan_id_level"
                        @input="onSelectItem(i)"
                        disabled
                      >
                        <!-- :reduce="(item) => item.slot_penyimpanan_id" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom6.data.length || search"
                        >
                          <span
                            v-if="lookup_custom6.current_page > 1"
                            @click="onGetSlotLevel(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom6.last_page >
                              lookup_custom6.current_page
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
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotBin"
                        :options="lookup_custom7.data"
                        :filterable="false"
                        @search="onGetSlotBin"
                        v-model="item.slot_penyimpanan_id_bin"
                        @input="onSelectItem(i)"
                        disabled
                      >
                        <!-- :reduce="(item) => item.slot_penyimpanan_id" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom7.data.length || search"
                        >
                          <span
                            v-if="lookup_custom7.current_page > 1"
                            @click="onGetSlotBin(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom7.last_page >
                              lookup_custom7.current_page
                            "
                            @click="onGetSlotBin(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>

                    <td class="border border-gray-300">
                      <money
                        v-model="item.stok_real"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        @keyup.native="onChangeStok(i)"
                        disabled
                      />
                      <!-- @input="updateStokSelisih(item)" -->
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.stok_sistem"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        disabled
                      />
                      <!-- @input="updateStokSelisih(item)" -->
                    </td>
                    <td class="border border-gray-300">
                      <!-- <input
                        v-model="item.stok_selisih"
                        class="w-full pl-2 py-1 border rounded focus:outline-none bg-gray-100"
                        readonly
                        type="text"
                      /> -->
                      <!-- v-model="item.stok_selisih" -->
                      <money
                        v-model="item.stok_selisih"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        disabled
                      />
                    </td>
                    <td class="border border-gray-300">
                      <textarea
                        placeholder="Keterangan"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        v-model="item.keterangan"
                        disabled
                      ></textarea>
                    </td>
                  </tr>
                  <tr v-if="!parameters.form.stok_opname_details.length > 0">
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
          </div>
          <modal-footer-section
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
            class="m-5"
          />
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

      // isStopSearchUser: false,
      // isLoadingGetUser: false,
      // user_search: "",

      // isStopSearchJabatan: false,
      // isLoadingGetJabatan: false,
      // jabatan_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      // isStopSearchItem: false,
      // isLoadingGetItem: false,
      // item_search: "",

      isStopSearchItemZonaGudang: false,
      isLoadingGetItemZonaGudang: false,
      zonaGudang_search: "",

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

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      itemGudang_search: "",

      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

      // isStopSearchItemPelanggan: false,
      // isLoadingGetItemPelanggan: false,
      // itemPelanggan_search: "",

      // isStopSearchSupplier: false,
      // isLoadingGetSupplier: false,
      // supplier_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Stok Opname",
      parameters: {
        url: "inventory/stok-opname",
        form: {
          kode_stok_opname: "",
          tanggal: "",
          gudang_id: "",
          keterangan: "",
          status_opname: "",
          catatan_proses: "",
          catatan_selesai: "",
          catatan_batal: "",
          stok_opname_details: [],

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
        let res = await this.$axios.get(`inventory/stok-opname/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          if (item != "stok_opname_details") {
            this.parameters.form[item] = res.data[item];
          }
        });
        this.parameters.form.gudang_id = res.data.gudang;

        this.parameters.form.stok_opname_details =
          res.data.stok_opname_details.map((item) => {
            return {
              ...item,
              stok_opname_details_id: item.stok_opname_details_id,
              item_gudang_id: item.item_gudang,
              zona_gudang_id: item.zona_gudang,
              valuation_id: item.valuation,
              slot_penyimpanan_id_aisle: item.slot_penyimpanan_aisle,
              slot_penyimpanan_id_rack: item.slot_penyimpanan_rack,
              slot_penyimpanan_id_level: item.slot_penyimpanan_level,
              slot_penyimpanan_id_bin: item.slot_penyimpanan_bin,
            };
          });
        this.isLoadingPage = false;
      }
    } catch (error) {
      console.log("error", error);
      //this.$router.back()
    }
  },

  async mounted() {
    // await this.onSearchUser();
    // await this.onSearchJabatan();
    await this.onSearchGudang();

    // await this.onSearchItem();
    await this.onSearchItemGudang();
    // await this.onSearchItemPelanggan();
    // await this.onSearchSupplier();
    await this.onSearchValuation();
    await this.onSearchZonaGudang();
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
      "lookup_custom1", //gudang
      // "lookup_custom2", //item
      "lookup_custom3", //zona gudang
      "lookup_custom4", //slot aisle
      "lookup_custom5", //slot rack
      "lookup_custom6", //slot level
      "lookup_custom7", //slot bin
      "lookup_custom8", //item gudang
      "lookup_custom9", //valuation
      // "lookup_custom10", //item pelanggan
      // "lookup_suppliers", //supplier
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.parameters.form.user_agent = navigator.userAgent;
      if (this.parameters.form.user_agent.includes("Mobile")) {
        this.form.device = "Mobile";
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
          },
          (error) => {
            this.isLoadingForm = false;
            this.$toaster.error(error.message);
          }
        );
      } else {
        this.$toaster.error("geolocation not supported");
      }
    },

    // updateStokSelisih(item) {
    //   this.$nextTick(() => {
    //     const stokReal = parseFloat(item.stok_real) || 0;
    //     const stokSistem = parseFloat(item.stok_sistem) || 0;
    //     item.stok_selisih = stokReal - stokSistem;
    //   });
    // },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;
      this.isLoadingForm = true;
      let url = "inventory/stok-opname";
      let formData = {
        ...this.parameters.form,
        gudang_id:
          typeof this.parameters.form.gudang_id == "object"
            ? this.parameters.form.gudang_id.gudang_id
            : this.parameters.form.gudang_id,
        stok_opname_details: this.parameters.form.stok_opname_details.map(
          (item) => {
            return {
              ...item,
              // stok_opname_details_id: item.stok_opname_details_id
              //   ? item.stok_opname_details_id
              //   : "",
              item_id:
                typeof item.item_gudang_id === "object"
                  ? item.item_gudang_id.item_id || item.item.item_id
                  : item.item_id,
              item_gudang_id:
                typeof item.item_gudang_id === "object"
                  ? item.item_gudang_id.item_gudang_id
                  : item.item_gudang_id,
              slot_penyimpanan_id_aisle:
                typeof item.slot_penyimpanan_id_aisle === "object"
                  ? item.slot_penyimpanan_id_aisle.slot_penyimpanan_id
                  : item.slot_penyimpanan_id_aisle,
              slot_penyimpanan_id_bin:
                typeof item.slot_penyimpanan_id_bin === "object"
                  ? item.slot_penyimpanan_id_bin.slot_penyimpanan_id
                  : item.slot_penyimpanan_id_bin,
              slot_penyimpanan_id_level:
                typeof item.slot_penyimpanan_id_level === "object"
                  ? item.slot_penyimpanan_id_level.slot_penyimpanan_id
                  : item.slot_penyimpanan_id_level,
              slot_penyimpanan_id_rack:
                typeof item.slot_penyimpanan_id_rack === "object"
                  ? item.slot_penyimpanan_id_rack.slot_penyimpanan_id
                  : item.slot_penyimpanan_id_rack,
              valuation_id:
                typeof item.valuation_id === "object"
                  ? item.valuation_id.valuation_id
                  : item.valuation_id,
              zona_gudang_id:
                typeof item.zona_gudang_id === "object"
                  ? item.zona_gudang_id.zona_gudang_id
                  : item.zona_gudang_id,
            };
          }
        ),
      };

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        method: this.isEditable ? "PUT" : "POST",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " + (this.isEditable ? "Diedit" : "Tambah")
          );
          if (!this.isEditable) {
            this.parameters.form = {
              kode_stok_opname: "",
              tanggal: "",
              gudang_id: "",
              keterangan: "",
              status_opname: "",
              catatan_proses: "",
              catatan_selesai: "",
              catatan_batal: "",
              stok_opname_details: [],

              //Tracking
              user_agent: "",
              device: "",
              longitude: "",
              latitude: "",
            };
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          // this.formValidate.reset();
        });
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

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

    onSelectGudang(item) {
      if (item) {
        // this.parameters.form.gudang_id = item;
        this.parameters.form.stok_opname_details.forEach((_, index) => {
          this.onGetSystemStok(index);
        });
      } else {
        this.parameters.form.gudang_id = "";
      }
    },

    AddDetailItem() {
      this.parameters.form.stok_opname_details.push({
        item_id: "",
        // item_pelanggan_id: "",
        item_gudang_id: "",
        // supplier_id: "",
        valuation_id: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle: "",
        slot_penyimpanan_id_rack: "",
        slot_penyimpanan_id_level: "",
        slot_penyimpanan_id_bin: "",
        stok_real: 0.0,
        stok_sistem: 0.0,
        stok_selisih: 0.0,
        keterangan: "",
      });
    },

    onDeleteItem(index) {
      this.parameters.form.stok_opname_details =
        this.parameters.form.stok_opname_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    // onGetItem(search, isNext) {
    //   if (!search.length && typeof isNext === "function") return;

    //   clearTimeout(this.isStopSearchItem);

    //   this.isStopSearchItem = setTimeout(() => {
    //     this.item_search = search;

    //     if (typeof isNext !== "function") {
    //       this.lookup_custom2.current_page = isNext
    //         ? this.lookup_custom2.current_page + 1
    //         : this.lookup_custom2.current_page - 1;
    //     } else {
    //       this.lookup_custom2.current_page = 1;
    //     }
    //     this.onSearchItem();
    //   }, 600);
    // },

    // async onSearchItem() {
    //   if (!this.isLoadingGetItem) {
    //     this.isLoadingGetItem = true;

    //     await this.lookUp({
    //       url: "master/item/get-item",
    //       lookup: "custom2",
    //       query:
    //         "?search=" +
    //         this.item_search +
    //         "&page=" +
    //         this.lookup_custom2.current_page +
    //         "&per_page=10",
    //     });
    //     this.isLoadingGetItem = false;
    //   }
    // },

    onGetZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchZonaGudang);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.zonaGudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }
        this.onSearchZonaudang();
      }, 600);
    },

    async onSearchZonaGudang() {
      if (!this.isLoadingGetZonaGudang) {
        this.isLoadingGetZonaGudang = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom3",
          query:
            "?search=" +
            this.zonaGudang_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });
        this.isLoadingGetZonaGudang = false;
      }
    },

    onGetSlotAisle(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotAisle);

      this.isStopSearchSlotAisle = setTimeout(() => {
        this.slot_aisle_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchSlotAisle();
      }, 600);
    },

    async onSearchSlotAisle() {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom4",
          query:
            "?search=" +
            this.slot_aisle_search +
            "&level=1" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    onGetSlotRack(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotRack);

      this.isStopSearchSlotRack = setTimeout(() => {
        this.slot_rack_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchSlotRack();
      }, 600);
    },

    async onSearchSlotRack() {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom5",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=2" +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    onGetSlotLevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotLevel);

      this.isStopSearchSlotLevel = setTimeout(() => {
        this.slot_level_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchSlotLevel();
      }, 600);
    },

    async onSearchSlotLevel() {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom6",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=3" +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    onGetSlotBin(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotBin);

      this.isStopSearchSlotBin = setTimeout(() => {
        this.slot_bin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchSlotBin();
      }, 600);
    },

    async onSearchSlotBin() {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom7",
          query:
            "?search=" +
            this.slot_bin_search +
            "&level=4" +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.itemGudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }
        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "custom8",
          query:
            "?search=" +
            this.itemGudang_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });
        this.isLoadingGetItemGudang = false;
      }
    },

    onGetValuation(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchValuation);

      this.isStopSearchValuation = setTimeout(() => {
        this.valuation_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }
        this.onSearchValuation();
      }, 600);
    },

    async onSearchValuation() {
      if (!this.isLoadingGetValuation) {
        this.isLoadingGetValuation = true;

        await this.lookUp({
          url: "master/valuation/get-valuation",
          lookup: "custom9",
          query:
            "?search=" +
            this.valuation_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });
        this.isLoadingGetValuation = false;
      }
    },

    // onGetItemPelanggan(search, isNext) {
    //   if (!search.length && typeof isNext === "function") return;

    //   clearTimeout(this.isStopSearchItemPelanggan);

    //   this.isStopSearchItemPelanggan = setTimeout(() => {
    //     this.itemPelanggan_search = search;

    //     if (typeof isNext !== "function") {
    //       this.lookup_custom10.current_page = isNext
    //         ? this.lookup_custom10.current_page + 1
    //         : this.lookup_custom10.current_page - 1;
    //     } else {
    //       this.lookup_custom10.current_page = 1;
    //     }
    //     this.onSearchItemPelanggan();
    //   }, 600);
    // },

    // async onSearchItemPelanggan() {
    //   if (!this.isLoadingGetItemPelanggan) {
    //     this.isLoadingGetItemPelanggan = true;

    //     await this.lookUp({
    //       url: "master/item-pelanggan/get-item-pelanggan",
    //       lookup: "custom10",
    //       query:
    //         "?search=" +
    //         this.itemPelanggan_search +
    //         "&page=" +
    //         this.lookup_custom9.current_page +
    //         "&per_page=10",
    //     });
    //     this.isLoadingGetItemPelanggan = false;
    //   }
    // },

    // onGetSupplier(search, isNext) {
    //   if (!search.length && typeof isNext === "function") return;

    //   clearTimeout(this.isStopSearchSupplier);

    //   this.isStopSearchSupplier = setTimeout(() => {
    //     this.supplier_search = search;

    //     if (typeof isNext !== "function") {
    //       this.lookup_suppliers.current_page = isNext
    //         ? this.lookup_suppliers.current_page + 1
    //         : this.lookup_suppliers.current_page - 1;
    //     } else {
    //       this.lookup_suppliers.current_page = 1;
    //     }
    //     this.onSearchSupplier();
    //   }, 600);
    // },

    // async onSearchSupplier() {
    //   if (!this.isLoadingGetSupplier) {
    //     this.isLoadingGetSupplier = true;

    //     await this.lookUp({
    //       url: "master/supplier/get-supplier",
    //       lookup: "suppliers",
    //       query:
    //         "?search=" +
    //         this.supplier_search +
    //         "&page=" +
    //         this.lookup_suppliers.current_page +
    //         "&per_page=10",
    //     });
    //     this.isLoadingGetSupplier = false;
    //   }
    // },

    onSelectItemGudang(item, index) {
      this.self.parameters.form.konversi_stok_detail_bahan[
        index
      ].item_gudang_id = item ? item : "";
      this.self.parameters.form.konversi_stok_detail_bahan[index].item_id = item
        ? item.item_id
        : "";
    },

    onSelectItem(index) {
      let details = [...this.parameters.form.stok_opname_details];

      let itemDetail = {
        ...this.parameters.form.stok_opname_details[index],
      };

      if (!itemDetail.item_gudang_id) {
        this.parameters.form.stok_opname_details[index].item_gudang_id = "";
        return;
      }

      let itemGudang = itemDetail.item_gudang_id;

      let itemGudangs = details.filter(
        (item) =>
          (item.item_gudang_id ? item.item_gudang_id.item_gudang_id : 0) ===
          itemGudang.item_gudang_id
      );

      if (itemGudangs.length > 1) {
        this.$toaster.error("Item gudang sudah ada");
        this.parameters.form.stok_opname_details = details.filter(
          (_, indexItem) => index != indexItem
        );
      } else {
        this.onGetSystemStok(index);
      }
    },

    onChangeStok(index) {
      this.parameters.form.stok_opname_details[index].stok_selisih =
        this.parameters.form.stok_opname_details[index].stok_real -
        this.parameters.form.stok_opname_details[index].stok_sistem;
    },

    onGetSystemStok(index) {
      // let gudang_id = this.parameters.form.gudang_id;
      let item_gudang_id =
        this.parameters.form.stok_opname_details[index].item_gudang_id;
      let zona_gudang_id =
        this.parameters.form.stok_opname_details[index].zona_gudang_id;
      let valuation_id =
        this.parameters.form.stok_opname_details[index].valuation_id;
      let aisle =
        this.parameters.form.stok_opname_details[index]
          .slot_penyimpanan_id_aisle;
      let rack =
        this.parameters.form.stok_opname_details[index]
          .slot_penyimpanan_id_rack;
      let level =
        this.parameters.form.stok_opname_details[index]
          .slot_penyimpanan_id_level;
      let bin =
        this.parameters.form.stok_opname_details[index].slot_penyimpanan_id_bin;

      if (
        typeof this.parameters.form.gudang_id == "object" &&
        typeof item_gudang_id == "object"
      ) {
        this.parameters.form.stok_opname_details[index].stok_sistem = 0.0;
        this.onChangeStok(index);
        this.$axios
          .get(
            `/inventory/stok_opname/get-stock/${this.parameters.form.gudang_id.gudang_id}/${item_gudang_id.item_gudang_id}/${zona_gudang_id.zona_gudang_id}/${valuation_id.valuation_id}?slot_penyimpanan_id_aisle=${aisle.slot_penyimpanan_id}&slot_penyimpanan_id_bin=${bin.slot_penyimpanan_id}&slot_penyimpanan_id_level=${level.slot_penyimpanan_id}&slot_penyimpanan_id_rack=${rack.slot_penyimpanan_id}`
          )
          .then((res) => {
            if (res.data) {
              this.parameters.form.stok_opname_details[index].stok_sistem =
                res.data.quantity || 0.0;
            }
            this.onChangeStok(index);
          });
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_stok_opname: "",
        tanggal: "",
        gudang_id: "",
        keterangan: "",
        status_opname: "",
        catatan_proses: "",
        catatan_selesai: "",
        catatan_batal: "",
        stok_opname_details: [],

        //Tracking
        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      };
    },
  },
};
</script>
