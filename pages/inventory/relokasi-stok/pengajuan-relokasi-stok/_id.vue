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
            <div class="form-group">
              <input-horiontal
                label="Nomor Transaksi"
                type="text"
                name="nomor_transaksi"
                v-model="parameters.form.no_transaksi"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal"
                type="date"
                name="tanggal"
                v-model="parameters.form.tanggal"
                :required="false"
              />
            </div>
          </div>

          <div class="mt-7">
            <TabComponent :tabs="tabs">
              <template #DetailItem>
                <div class="w-full flex justify-between items-center mt-3">
                  <h1 class="text-xl font-bold">Detail Item</h1>

                  <div>
                    <button
                      type="button"
                      @click="addDetailItem"
                      class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                    >
                      <i class="fas fa-plus"></i>
                      <p class="text-xs font-medium">Tambah Detail Item</p>
                    </button>
                  </div>
                </div>
                <div class="table-responsive overflow-y-hidden mb-7">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                    :class="
                      parameters.form.detail_item.length ? 'mb-[300px]' : ''
                    "
                  >
                    <thead>
                      <tr class="text-sm uppercase">
                        <th class="w-[200px] border border-gray-300">
                          Item Gudang
                        </th>
                        <th class="w-[200px] border border-gray-300">Status</th>
                        <th class="w-[200px] border border-gray-300">
                          Valuation
                        </th>
                        <th class="w-[200px] border border-gray-300">Zona</th>
                        <th class="w-[200px] border border-gray-300">Aisle</th>
                        <th class="w-[200px] border border-gray-300">Rack</th>
                        <th class="w-[200px] border border-gray-300">Level</th>
                        <th class="w-[200px] border border-gray-300">Bin</th>
                        <th
                          class="w-[100px] border border-gray-300 text-center"
                        >
                          Hapus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="align-top border-t"
                        v-for="(item, i) in parameters.form.detail_item"
                        :key="i"
                      >
                        <td class="border border-gray-300">
                          <div class="w-full">
                            <v-select
                              class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                              label="nama_item"
                              :loading="isLoadingGetItemGudang"
                              :options="lookup_custom1.data"
                              :filterable="false"
                              @search="onGetItemGudang"
                            >
                              <!-- v-model="item.item_gudang_id" -->
                              <!-- @input="(item) => onSelectItemGudang(item, index)" -->
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_custom1.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom1.current_page > 1"
                                  @click="onGetItemGudang(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom1.last_page >
                                    lookup_custom1.current_page
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
                          <select
                            name="status"
                            id="status"
                            class="w-full p-1 border rounded focus:outline-none"
                            v-model="item.status"
                          >
                            <option value="ASAL">Asal</option>
                            <option value="TUJUAN">Tujuan</option>
                          </select>
                        </td>
                        <td class="border border-gray-300">
                          <div class="w-full">
                            <v-select
                              class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                              label="nama_valuation"
                              :loading="isLoadingGetValuation"
                              :options="lookup_custom2.data"
                              :filterable="false"
                              @search="onGetValuation"
                              v-model="item.valuation_id"
                            >
                              <!-- @input="(item) => onSelectItemGudang(item, index)" -->
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_custom2.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom2.current_page > 1"
                                  @click="onGetValuation(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom2.last_page >
                                    lookup_custom2.current_page
                                  "
                                  @click="onGetValuation(search, true)"
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
                            label="nama_slot_penyimpanan"
                            :loading="isLoadingGetSlotAisle"
                            :options="lookup_custom4.data"
                            :filterable="false"
                            @search="onGetSlotAisle"
                            v-model="item.slot_penyimpanan_id_aisle"
                            :reduce="(item) => item.slot_penyimpanan_id"
                            class="w-full"
                          >
                            <template slot="option" slot-scope="option">
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <template
                              slot="selected-option"
                              slot-scope="option"
                            >
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
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
                            label="nama_slot_penyimpanan"
                            :loading="isLoadingGetSlotRack"
                            :options="lookup_custom5.data"
                            :filterable="false"
                            @search="onGetSlotRack"
                            v-model="item.slot_penyimpanan_id_rack"
                            :reduce="(item) => item.slot_penyimpanan_id"
                            class="w-full"
                          >
                            <template slot="option" slot-scope="option">
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <template
                              slot="selected-option"
                              slot-scope="option"
                            >
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
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
                            label="nama_slot_penyimpanan"
                            :loading="isLoadingGetSlotLevel"
                            :options="lookup_custom6.data"
                            :filterable="false"
                            @search="onGetSlotLevel"
                            v-model="item.slot_penyimpanan_id_level"
                            :reduce="(item) => item.slot_penyimpanan_id"
                            class="w-full"
                          >
                            <template slot="option" slot-scope="option">
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <template
                              slot="selected-option"
                              slot-scope="option"
                            >
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
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
                            label="nama_slot_penyimpanan"
                            :loading="isLoadingGetSlotBin"
                            :options="lookup_custom7.data"
                            :filterable="false"
                            @search="onGetSlotBin"
                            v-model="item.slot_penyimpanan_id_bin"
                            :reduce="(item) => item.slot_penyimpanan_id"
                            class="w-full"
                          >
                            <template slot="option" slot-scope="option">
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <template
                              slot="selected-option"
                              slot-scope="option"
                            >
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
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
                          <span class="flex justify-center">
                            <i
                              class="fas fa-trash mx-auto"
                              style="cursor: pointer"
                              @click="onDeleteItem(i)"
                            ></i>
                          </span>
                        </td>
                      </tr>
                      <tr v-if="!parameters.form.detail_item.length > 0">
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
              <template #Biaya>
                <div class="w-full flex justify-between items-center mt-3">
                  <h1 class="text-xl font-bold">Biaya</h1>

                  <div>
                    <button
                      type="button"
                      @click="addBiayaItem"
                      class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                    >
                      <i class="fas fa-plus"></i>
                      <p class="text-xs font-medium">Tambah Biaya</p>
                    </button>
                  </div>
                </div>
                <div class="table-responsive overflow-y-hidden mb-7">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                    :class="parameters.form.biaya.length ? 'mb-[300px]' : ''"
                  >
                    <thead>
                      <tr class="text-sm uppercase">
                        <th class="w-[200px] border border-gray-300">
                          Jenis Biaya
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Nominal Satuan
                        </th>
                        <th class="w-[200px] border border-gray-300">Jumlah</th>
                        <th class="w-[200px] border border-gray-300">Total</th>
                        <th class="w-[200px] border border-gray-300">COA</th>
                        <th class="w-[200px] border border-gray-300">Vendor</th>
                        <th class="w-[300px] border border-gray-300">
                          Keterangan
                        </th>
                        <th
                          class="w-[100px] border border-gray-300 text-center"
                        >
                          Hapus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in parameters.form.biaya"
                        :key="i"
                        class="align-top border-t"
                      >
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_jenis_biaya"
                            :loading="isLoadingGetJenisBiaya"
                            :options="lookup_custom8.data"
                            :filterable="false"
                            @search="onGetJenisBiaya"
                            v-model="item.jenis_biaya_id"
                            :reduce="(item) => item.jenis_biaya_id"
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
                                @click="onGetJenisBiaya(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom8.last_page >
                                  lookup_custom8.current_page
                                "
                                @click="onGetJenisBiaya(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300">
                          <money
                            v-model="item.nominal_satuan"
                            class="w-full pl-2 py-1 border rounded focus:outline-none"
                            @keydown.native="
                              $event.key === '-'
                                ? $event.preventDefault()
                                : null
                            "
                          />
                        </td>
                        <td class="border border-gray-300">
                          <money
                            v-model="item.jumlah"
                            class="w-full pl-2 py-1 border rounded focus:outline-none"
                            @keydown.native="
                              $event.key === '-'
                                ? $event.preventDefault()
                                : null
                            "
                          />
                        </td>
                        <td class="border border-gray-300">
                          <money
                            v-model="item.total"
                            class="w-full pl-2 py-1 border rounded focus:outline-none"
                            @keydown.native="
                              $event.key === '-'
                                ? $event.preventDefault()
                                : null
                            "
                          />
                        </td>
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_coa"
                            :loading="isLoadingGetCoa"
                            :options="lookup_custom9.data"
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
                              v-if="lookup_custom9.data.length || search"
                            >
                              <span
                                v-if="lookup_custom9.current_page > 1"
                                @click="onGetCoa(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom9.last_page >
                                  lookup_custom9.current_page
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
                            label="nama_vendor"
                            :loading="isLoadingGetVendor"
                            :options="lookup_custom10.data"
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
                              v-if="lookup_custom10.data.length || search"
                            >
                              <span
                                v-if="lookup_custom10.current_page > 1"
                                @click="onGetVendor(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom10.last_page >
                                  lookup_custom10.current_page
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
                        <td
                          class="text-center text-gray-600 border border-gray-300"
                        >
                          <span class="flex justify-center">
                            <i
                              class="fas fa-trash mx-auto"
                              style="cursor: pointer"
                              @click="onDeleteBiaya(i)"
                            ></i>
                          </span>
                        </td>
                      </tr>
                      <tr v-if="!parameters.form.biaya.length > 0">
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
import TabComponent from "./tabComponent.vue";
export default {
  props: ["self"],

  components: {
    TabComponent,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        {
          name: "Detail Item",
          slotName: "DetailItem",
        },
        {
          name: "Biaya",
          slotName: "Biaya",
        },
      ],

      id,

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      itemGudang_search: "",

      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

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

      isStopSearchJenisBiaya: false,
      isLoadingGetJenisBiaya: false,
      jenis_biaya_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Relokasi Stok",
      parameters: {
        url: "inventory/relokasi-stok",
        form: {
          no_transaksi: "",
          tanggal: "",
          detail_item: [],
          biaya: [],

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
        let res = await this.$axios.get(`inventory/relokasi-stok/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.detail_item = res.data.detail_item.map((item) => {
          return {
            ...item,
            detail_item_id: item,
            item_gudang_id: item.item_gudang_id,
            valuation_id: item.valuation_id,
            zona_gudang_id: item.zona_gudang_id,
            slot_penyimpanan_id_aisle_plan: item.slot_penyimpanan_id_aisle_plan,
            slot_penyimpanan_id_rack_plan: item.slot_penyimpanan_id_rack_plan,
            slot_penyimpanan_id_level_plan: item.slot_penyimpanan_id_level_plan,
            slot_penyimpanan_id_bin_plan: item.slot_penyimpanan_id_bin_plan,
          };
        });

        if (res.data.biaya) {
          this.parameters.form.biaya = res.data.biaya.map((item) => {
            return {
              ...item,
              biaya_id: item,
            };
          });
        }
        this.isLoadingPage = false;
      }
    } catch (error) {
      console.log("error", error);
      //this.$router.back()
    }
  },

  async mounted() {
    await this.onSearchItemGudang();
    await this.onSearchValuation();
    await this.onSearchZonaGudang();
    await this.onSearchSlotAisle();
    await this.onSearchSlotRack();
    await this.onSearchSlotLevel();
    await this.onSearchSlotBin();

    await this.onSearchJenisBiaya();
    await this.onSearchCoa();
    await this.onSearchVendor();

    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //item gudang
      "lookup_custom2", //valuation
      "lookup_custom3", //zona gudang
      "lookup_custom4", //slot aisle
      "lookup_custom5", //slot rack
      "lookup_custom6", //slot level
      "lookup_custom7", //slot bin
      "lookup_custom8", //jenis biaya
      "lookup_custom9", //coa
      "lookup_custom10", //vendor
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
        // console.log("geolocation not supported");
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;
      this.isLoadingForm = true;
      let url = "inventory/relokasi-stok";
      let formData = {
        ...this.parameters.form,
        detail_item: this.parameters.form.detail_item.map((item) => {
          return {
            ...item,
            detail_item_id: item,
            item_gudang_id: item.item_gudang_id,
            valuation_id: item.valuation_id,
            zona_gudang_id: item.zona_gudang_id,
            slot_penyimpanan_id_aisle_plan: item.slot_penyimpanan_id_aisle_plan,
            slot_penyimpanan_id_rack_plan: item.slot_penyimpanan_id_rack_plan,
            slot_penyimpanan_id_level_plan: item.slot_penyimpanan_id_level_plan,
            slot_penyimpanan_id_bin_plan: item.slot_penyimpanan_id_bin_plan,
          };
        }),
      };

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
            "Data berhasil di " + (this.isEditable ? "Diedit" : "Tambah")
          );
          if (!this.isEditable) {
            this.parameters.form = {
              no_transaksi: "",
              tanggal: "",
              detail_item: [],
              biaya: [],

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

    addDetailItem() {
      this.parameters.form.detail_item.push({
        detail_item_id: "",
        item_gudang_id: "",
        status: "",
        valuation_id: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle: "",
        slot_penyimpanan_id_rack: "",
        slot_penyimpanan_id_level: "",
        slot_penyimpanan_id_bin: "",
      });
    },

    onDeleteItem(index) {
      this.parameters.form.detail_item =
        this.parameters.form.detail_item.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    addBiayaItem() {
      this.parameters.form.biaya.push({
        biaya_id: "",
        jenis_biaya_id: "",
        coa_id: "",
        vendor_id: "",
        nominal_satuan: "",
        jumlah: "",
        total: "",
        keterangan: "",
      });
    },

    onDeleteBiaya(index) {
      this.parameters.form.biaya = this.parameters.form.biaya.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },

    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.itemGudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }
        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.itemGudang_search +
            "&page=" +
            this.lookup_custom1.current_page +
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
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }
        this.onSearchValuation();
      }, 600);
    },

    async onSearchValuation() {
      if (!this.isLoadingGetValuation) {
        this.isLoadingGetValuation = true;

        await this.lookUp({
          url: "master/valuation/get-valuation",
          lookup: "custom2",
          query:
            "?search=" +
            this.valuation_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });
        this.isLoadingGetValuation = false;
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

    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchJenisBiaya = setTimeout(() => {
        this.jenis_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "custom8",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisBiaya = false;
      }
    },

    onGetCoa(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoa);

      this.isStopSearchCoa = setTimeout(() => {
        this.coa_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchCoa();
      }, 600);
    },

    async onSearchCoa() {
      if (!this.isLoadingGetCoa) {
        this.isLoadingGetCoa = true;

        await this.lookUp({
          url: "finance/coa/get-coa",
          lookup: "custom9",
          query:
            "?search=" +
            this.coa_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom10",
          query:
            "?search=" +
            this.vendor_search +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        no_transaksi: "",
        tanggal: "",
        detail_item: [],
        biaya: [],

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
