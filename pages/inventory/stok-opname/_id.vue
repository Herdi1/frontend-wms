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
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap2 w-full">
              <!-- <div class="form-group">
                <input-horiontal
                  label="Nomor Stok Opname"
                  type="text"
                  name="nomor_stok_opname"
                  v-model="parameters.form.no_stok_opname"
                  :required="true"
                />
              </div> -->
              <div class="form-group">
                <input-horiontal
                  label="Tanggal Stok Opname"
                  type="date"
                  name="tanggal_stok_opname"
                  v-model="parameters.form.tanggal_stok_opname"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Status Stok Opname"
                  type="text"
                  name="status_stok_opname"
                  v-model="parameters.form.status_stok_opname"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label=" Tanggal Status Stok Opname"
                  type="date"
                  name="tanggal_status_stok_opname"
                  v-model="parameters.form.tanggal_status_stok_opname"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Status Adjusment"
                  type="text"
                  name="status_adjusment"
                  v-model="parameters.form.status_adjusment"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Tanggal Status Adjusment"
                  type="date"
                  name="tanggal_status_adjusment"
                  v-model="parameters.form.tanggal_status_adjusment"
                  :required="false"
                />
              </div>
              <ValidationProvider name="user_id">
                <select-button
                  :self="{
                    label: 'User',
                    optionLabel: 'nama_lengkap',
                    lookup: lookup_custom1,
                    value: parameters.form.user_id_input,
                    onGet: onGetUser,
                    isLoadingL: isLoadingGetUser,
                    input: onSelectUser,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <ValidationProvider name="jabatan_id">
                <select-button
                  :self="{
                    label: 'Jabatan',
                    optionLabel: 'nama_jabatan',
                    lookup: lookup_custom2,
                    value: parameters.form.jabatan_id_input,
                    onGet: onGetJabatan,
                    isLoadingL: isLoadingGetJabatan,
                    input: onSelectJabatan,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <ValidationProvider name="zona_gudang_id" class="mt-2">
                <select-button
                  :self="{
                    label: 'Zona Gudang',
                    optionLabel: 'nama_zona_gudang',
                    lookup: lookup_custom3,
                    value: parameters.form.zona_gudang_id,
                    onGet: onGetZonaGudang,
                    isLoadingL: isLoadingGetZonaGudang,
                    input: onSelectZona,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <ValidationProvider name="aisle_id" class="mt-2">
                <select-button
                  :self="{
                    label: 'Lokasi Aisle',
                    optionLabel: 'nama_slot_penyimpanan',
                    lookup: lookup_custom4,
                    value: parameters.form.slot_penyimpanan_id_aisle_plan,
                    onGet: onGetSlotAisle,
                    isLoadingL: isLoadingGetSlotAisle,
                    input: onSelectAisle,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <ValidationProvider name="rack_id" class="mt-2">
                <select-button
                  :self="{
                    label: 'Lokasi Rack',
                    optionLabel: 'nama_slot_penyimpanan',
                    lookup: lookup_custom5,
                    value: parameters.form.slot_penyimpanan_id_rack_plan,
                    onGet: onGetSlotRack,
                    isLoadingL: isLoadingGetSlotRack,
                    input: onSelectRack,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <ValidationProvider name="level_id" class="mt-2">
                <select-button
                  :self="{
                    label: 'Lokasi Level',
                    optionLabel: 'nama_slot_penyimpanan',
                    lookup: lookup_custom6,
                    value: parameters.form.slot_penyimpanan_id_level_plan,
                    onGet: onGetSlotLevel,
                    isLoadingL: isLoadingGetSlotLevel,
                    input: onSelectLevel,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
              <ValidationProvider name="bin_id" class="mt-2">
                <select-button
                  :self="{
                    label: 'Lokasi Bin',
                    optionLabel: 'nama_slot_penyimpanan',
                    lookup: lookup_custom7,
                    value: parameters.form.slot_penyimpanan_id_bin_plan,
                    onGet: onGetSlotBin,
                    isLoadingL: isLoadingGetSlotBin,
                    input: onSelectBin,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                />
              </ValidationProvider>
            </div>
          </div>
          <div class="w-full flex justify-between items-center mt-5">
            <h1 class="text-xl font-bold uppercase">Detail Produk Opname</h1>

            <div>
              <button
                type="button"
                @click="AddDetailItem"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Tambah Produk Opname</p>
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
                  parameters.form.stok_opname_details.length ? 'mb-[300px]' : ''
                "
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <th class="w-[200px] border border-gray-300">Nama Item</th>
                    <th class="w-[200px] border border-gray-300">Zona</th>
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
                    <th class="w-[200px] border border-gray-300">Valuation</th>
                    <th class="w-[200px] border border-gray-300">
                      Stok Sistem
                    </th>
                    <th class="w-[200px] border border-gray-300">Stok Fisik</th>
                    <th class="w-[200px] border border-gray-300">Selisih</th>
                    <th class="w-[100px] border border-gray-300 text-center">
                      Hapus
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in parameters.form.stok_opname_details"
                    :key="i"
                    class="align-top border-t"
                  >
                    <td class="border border-gray-300">
                      <div class="w-full">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                          label="nama_item"
                          :loading="isLoadingGetItemGudang"
                          :options="lookup_custom8.data"
                          :filterable="false"
                          @search="onGetItemGudang"
                          v-model="item.item_gudang_id"
                        >
                          <!-- @input="(item) => onSelectItemGudang(item, index)" -->
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
                      </div>
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_zona_gudang"
                        :loading="isLoadingGetZonaGudang"
                        :options="lookup_custom3.data"
                        :filterable="false"
                        @search="onGetZonaGudang"
                        :reduce="(item) => item.zona_gudang_id"
                        v-model="item.zona_gudang_id"
                      >
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
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_slot_penyimpanan"
                        :loading="isLoadingGetSlotAisle"
                        :options="lookup_custom4.data"
                        :filterable="false"
                        @search="onGetSlotAisle"
                        :reduce="(item) => item.slot_penyimpanan_id_aisle_plan"
                        v-model="item.slot_penyimpanan_id_aisle_plan"
                      >
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
                        :reduce="(item) => item.slot_penyimpanan_id_rack_plan"
                        v-model="item.slot_penyimpanan_id_rack_plan"
                      >
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
                        :reduce="(item) => item.slot_penyimpanan_id_level_plan"
                        v-model="item.slot_penyimpanan_id_level_plan"
                      >
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
                        :reduce="(item) => item.slot_penyimpanan_id_bin_plan"
                        v-model="item.slot_penyimpanan_id_bin_plan"
                      >
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
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                        label="nama_valuation"
                        :loading="isLoadingGetValuation"
                        :options="lookup_custom9.data"
                        :filterable="false"
                        @search="onGetValuation"
                        v-model="item.valuation_id"
                      >
                        <!-- @input="(item) => onSelectItemGudang(item, index)" -->
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
                      <money
                        v-model="item.stok_sistem"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.stok_real"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="border border-gray-300">
                      <money
                        :value="stokSelisih(index)"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td
                      class="text-center text-gray-600 border border-gray-300"
                    >
                      <i
                        class="fas fa-trash mx-auto"
                        style="cursor: pointer"
                        @click="onDeleteItem(i)"
                      ></i>
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

      isStopSearchUser: false,
      isLoadingGetUser: false,
      user_search: "",

      isStopSearchJabatan: false,
      isLoadingGetJabatan: false,
      jabatan_search: "",

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

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Stok Opname",
      parameters: {
        url: "inventory/stok-opname",
        form: {
          no_stok_opname: "",
          tanggal_stok_opname: "",
          status_stok_opname: "",
          tanggal_status_stok_opname: "",
          status_adjusment: "",
          tanggal_status_adjusment: "",
          user_id_input: "",
          jabatan_id_input: "",
          zona_gudang_id: "",
          slot_penyimpanan_id_aisle_plan: "",
          slot_penyimpanan_id_rack_plan: "",
          slot_penyimpanan_id_level_plan: "",
          slot_penyimpanan_id_bin_plan: "",
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
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`inventory/stok-opname/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.user_id_input = res.data.user_id_input;
        this.parameters.form.jabatan_id_input = res.data.jabatan_id_input;
        this.parameters.form.zona_gudang_id = res.data.zona_gudang_id;
        this.parameters.form.slot_penyimpanan_id_aisle_plan =
          res.data.slot_penyimpanan_id_aisle_plan;
        this.parameters.form.slot_penyimpanan_id_rack_plan =
          res.data.slot_penyimpanan_id_rack_plan;
        this.parameters.form.slot_penyimpanan_id_level_plan =
          res.data.slot_penyimpanan_id_level_plan;
        this.parameters.form.slot_penyimpanan_id_bin_plan =
          res.data.slot_penyimpanan_id_bin_plan;

        this.parameters.form.stok_opname_details =
          res.data.stok_opname_details.map((item) => {
            return {
              ...item,
              stok_opname_details_id: item,
              item_gudang_id: item.item_gudang_id,
              zona_gudang_id: item.zona_gudang_id,
              slot_penyimpanan_id_aisle_plan:
                item.slot_penyimpanan_id_aisle_plan,
              slot_penyimpanan_id_rack_plan: item.slot_penyimpanan_id_rack_plan,
              slot_penyimpanan_id_level_plan:
                item.slot_penyimpanan_id_level_plan,
              slot_penyimpanan_id_bin_plan: item.slot_penyimpanan_id_bin_plan,
              valuation_id: item.valuation_id,
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
    await this.onSearchUser();
    await this.onSearchJabatan();
    await this.onSearchZonaGudang();
    await this.onSearchSlotAisle();
    await this.onSearchSlotRack();
    await this.onSearchSlotLevel();
    await this.onSearchSlotBin();

    await this.onSearchItemGudang();
    await this.onSearchValuation();

    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //user
      "lookup_custom2", //jabatan
      "lookup_custom3", //zona gudang
      "lookup_custom4", //slot aisle
      "lookup_custom5", //slot rack
      "lookup_custom6", //slot level
      "lookup_custom7", //slot bin
      "lookup_custom8", //item gudang
      "lookup_custom9", //valuation
    ]),

    stokSelisih(index) {
      this.parameters.form.stok_opname_details[index].stok_selisih =
        this.parameters.form.stok_opname_details[index].stok_sistem -
        this.parameters.form.stok_opname_details[index].stok_real;

      return this.parameters.form.stok_opname_details[index].stok_selisih;
    },
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

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;
      this.isLoadingForm = true;
      let url = "inventory/stok-opname";
      let formData = {
        ...this.parameters.form,
        stok_opname_details: this.parameters.form.stok_opname_details.map(
          (item) => {
            return {
              ...item,
              stok_opname_details_id: item,
              item_gudang_id: item.item_gudang_id,
              zona_gudang_id: item.zona_gudang_id,
              slot_penyimpanan_id_aisle_plan:
                item.slot_penyimpanan_id_aisle_plan,
              slot_penyimpanan_id_rack_plan: item.slot_penyimpanan_id_rack_plan,
              slot_penyimpanan_id_level_plan:
                item.slot_penyimpanan_id_level_plan,
              slot_penyimpanan_id_bin_plan: item.slot_penyimpanan_id_bin_plan,
              valuation_id: item.valuation_id,
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
              no_stok_opname: "",
              tanggal_stok_opname: "",
              status_stok_opname: "",
              tanggal_status_stok_opname: "",
              status_adjusment: "",
              tanggal_status_adjusment: "",
              user_id_input: "",
              jabatan_id_input: "",
              zona_gudang_id: "",
              slot_penyimpanan_id_aisle_plan: "",
              slot_penyimpanan_id_rack_plan: "",
              slot_penyimpanan_id_level_plan: "",
              slot_penyimpanan_id_bin_plan: "",
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
          this.formValidate.reset();
        });
    },

    AddDetailItem() {
      this.parameters.form.stok_opname_details.push({
        stok_opname_details_id: "",
        item_gudang_id: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle_plan: "",
        slot_penyimpanan_id_rack_plan: "",
        slot_penyimpanan_id_level_plan: "",
        slot_penyimpanan_id_bin_plan: "",
        valuation_id: "",
        stok_sistem: 0,
        stok_real: 0,
        stok_selisih: 0,
      });
    },

    onDeleteItem(index) {
      this.parameters.form.stok_opname_details =
        this.parameters.form.stok_opname_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetUser(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchUser);

      this.isStopSearchUser = setTimeout(() => {
        this.user_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }
        this.onSearchUser();
      }, 600);
    },

    async onSearchUser() {
      if (!this.isLoadingGetUser) {
        this.isLoadingGetUser = true;

        await this.lookUp({
          url: "setting/user",
          lookup: "custom1",
          query:
            "?search=" +
            this.user_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });
        this.isLoadingGetUser = false;
      }
    },

    onGetJabatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchJabatan);

      this.isStopSearchJabatan = setTimeout(() => {
        this.jabatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }
        this.onSearchJabatan();
      }, 600);
    },

    async onSearchJabatan() {
      if (!this.isLoadingGetJabatan) {
        this.isLoadingGetJabatan = true;

        await this.lookUp({
          url: "setting/jabatan",
          lookup: "custom2",
          query:
            "?search=" +
            this.jabatan_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });
        this.isLoadingGetJabatan = false;
      }
    },

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

    onSelectUser(item) {
      if (item) {
        this.parameters.form.user_id_input = item;
      } else {
        this.parameters.form.user_id_input = "";
      }
    },

    onSelectJabatan(item) {
      if (item) {
        this.parameters.form.jabatan_id_input = item;
      } else {
        this.parameters.form.jabatan_id_input = "";
      }
    },

    onSelectZona(item) {
      if (item) {
        this.parameters.form.zona_gudang_id = item;
      } else {
        this.parameters.form.zona_gudang_id = "";
      }
    },

    onSelectAisle(item) {
      if (item) {
        this.parameters.form.slot_penyimpanan_id_aisle_plan = item;
      } else {
        this.parameters.form.slot_penyimpanan_id_aisle_plan = "";
      }
    },

    onSelectRack(item) {
      if (item) {
        this.parameters.form.slot_penyimpanan_id_rack_plan = item;
      } else {
        this.parameters.form.slot_penyimpanan_id_rack_plan = "";
      }
    },

    onSelectLevel(item) {
      if (item) {
        this.parameters.form.slot_penyimpanan_id_level_plan = item;
      } else {
        this.parameters.form.slot_penyimpanan_id_level_plan = "";
      }
    },

    onSelectBin(item) {
      if (item) {
        this.parameters.form.slot_penyimpanan_id_bin_plan = item;
      } else {
        this.parameters.form.slot_penyimpanan_id_bin_plan = "";
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        no_stok_opname: "",
        tanggal_stok_opname: "",
        status_stok_opname: "",
        tanggal_status_stok_opname: "",
        status_adjusment: "",
        tanggal_status_adjusment: "",
        user_id_input: "",
        jabatan_id_input: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle_plan: "",
        slot_penyimpanan_id_rack_plan: "",
        slot_penyimpanan_id_level_plan: "",
        slot_penyimpanan_id_bin_plan: "",
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
