<template>
  <div>
    <div class="w-full flex justify-between items-center">
      <h1 class="text-xl font-bold">Detail Inbound</h1>
      <div class=" ">
        <!-- v-if="self.form.sumber_data === 'NON'" -->
        <button
          type="button"
          @click="AddDetailInbound"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Detail</p>
        </button>
      </div>
    </div>
    <div class="table-responsive overflow-y-hidden mb-7">
      <table
        class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
        :class="self.form.inbound_details.length ? 'mb-[300px]' : ''"
      >
        <thead>
          <tr class="text-sm uppercase text-nowrap">
            <!-- <th class="w-[200px] border border-gray-300">ASN</th> -->
            <!-- <th class="w-[200px] border border-gray-300">Gudang</th> -->
            <!-- <th class="w-[200px] border border-gray-300">Item</th> -->
            <!-- <th class="w-[200px] border border-gray-300">
                            Item Pelanggan
                          </th> -->
            <th class="w-[200px] border border-gray-300">Item</th>
            <th class="w-[200px] border border-gray-300">Nomor</th>
            <!-- <th class="w-[200px] border border-gray-300">
                            Nomor Referensi
                          </th> -->
            <th class="w-[200px] border border-gray-300">Quantity</th>
            <th class="w-[200px] border border-gray-300">Tanggal Expired</th>
            <th
              class="w-[200px] border border-gray-300"
              v-if="self.form.sumber_data === 'ASN'"
            >
              Peralatan
            </th>
            <th
              class="w-[200px] border border-gray-300"
              v-if="self.form.sumber_data === 'ASN'"
            >
              Lokasi Plan
            </th>
            <th class="w-[200px] border border-gray-300">Zona</th>
            <th class="w-[200px] border border-gray-300">Aisle</th>
            <th class="w-[200px] border border-gray-300">Rack</th>
            <th class="w-[200px] border border-gray-300">Level</th>
            <th class="w-[200px] border border-gray-300">Bin</th>
            <th class="w-[300px] border border-gray-300">Keterangan</th>
            <th
              class="w-[300px] border border-gray-300"
              v-if="self.form.sumber_data === 'ASN'"
            >
              Alasan Beda Plan
            </th>
            <th class="w-[100px] border border-gray-300">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in self.form.inbound_details"
            :key="index"
            style="border-top: 0.5px solid lightgray"
            class="align-top mx-0"
          >
            <!-- <td class="border border-gray-300">
                            {{ item.asn ? item.asn : "-" }}
                          </td> -->
            <td class="border border-gray-300">
              <v-select
                v-if="self.form.sumber_data !== 'NON'"
                label="nama_item"
                :options="self.items"
                :filterable="false"
                v-model="item.item_gudang_id"
                class="w-full"
                @input="(item) => onSelectItemDetail(item, index)"
              >
                <template slot="selected-option" slot-scope="option">
                  <div
                    class="w-20 whitespace-nowrap text-ellipsis overflow-hidden"
                  >
                    {{ option.nama_item }}
                  </div>
                </template>
              </v-select>
              <v-select
                v-else
                label="nama_item"
                :loading="isLoadingGetItemGudang"
                :options="lookup_products.data"
                :filterable="false"
                @search="onGetItemGudang"
                v-model="item.item_gudang_id"
                class="w-full"
                @input="(item) => onSelectItemDetail(item, index)"
              >
                <template slot="selected-option" slot-scope="option">
                  <div
                    class="w-20 whitespace-nowrap text-ellipsis overflow-hidden"
                  >
                    {{ option.nama_item }}
                  </div>
                </template>
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_products.data.length || search"
                >
                  <span
                    v-if="lookup_products.current_page > 1"
                    @click="onGetItemGudang(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_products.last_page > lookup_products.current_page
                    "
                    @click="onGetItemGudang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
              <!-- {{ item.nama_item ? item.nama_item : "-" }} -->
            </td>
            <td class="border border-gray-300">
              <div>
                <p>Serial Number:</p>
                <!-- <div v-if="self.form.sumber_data !== 'NON'" class="font-bold">
                                {{
                                  item.serial_number ? item.serial_number : "-"
                                }}

                              </div> -->
                <div>
                  <input
                    v-model="item.serial_number"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                  />
                </div>
                <!-- <p>
                                Nomor Referensi:
                                <div >
                                  <input
                                    v-model="item.no_referensi"
                                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                                  />
                                </div>
                              </p> -->
              </div>
            </td>

            <td class="border border-gray-300">
              <p class="mb-2">
                Quantity Request:
                <money
                  v-model="item.quantity_request"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                  disabled
                />
              </p>
              <p class="mb-2">
                Quantity Terima:
                <money
                  v-model="item.quantity_terima"
                  @change="sumQuantity(item)"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </p>
              <div class="mb-2">
                <p class="mb-2">Valuation:</p>
                <v-select
                  label="nama_valuation"
                  :loading="isLoadingGetValuation"
                  :options="lookup_warehouses.data"
                  :filterable="false"
                  @search="onGetValuation"
                  v-model="item.valuation_id"
                  :reduce="(item) => item.valuation_id"
                  class="w-full"
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
              <div>
                <p class="mb-2">Status Terima:</p>
                <select
                  name="status_terima"
                  id="status_terima"
                  v-model="item.status_terima"
                  class="p-1 w-full rounded-sm outline-none border border-gray-300"
                >
                  <option value="FULL">Diterima Full</option>
                  <option value="SEBAGIAN">Diterima Sebagian</option>
                </select>
              </div>
            </td>
            <td class="border border-gray-300">
              <input
                class="w-full p-1 rounded-md border border-gray-300"
                type="date"
                v-model="item.tanggal_expired"
              />
            </td>
            <td class="border border-gray-300">
              <!-- <div>
                <p v-if="item.panjang">Panjang: {{ item.panjang }}</p>
                <p v-if="item.lebar">Lebar: {{ item.lebar }}</p>
                <p v-if="item.tinggi">Tinggi: {{ item.tinggi }}</p>
                <p v-if="item.berat">Berat: {{ item.berat }}</p>
              </div> -->

              <v-select
                label="nama_peralatan"
                :loading="isLoadingGetPeralatan"
                :options="lookup_mesin.data"
                :filterable="false"
                @search="onGetPeralatan"
                v-model="item.peralatan_id"
                @input="(item) => onSelectPeralatan(item, index)"
                class="w-full"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_mesin.data.length || search"
                >
                  <span
                    v-if="lookup_mesin.current_page > 1"
                    @click="onGetPeralatan(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="lookup_mesin.last_page > lookup_mesin.current_page"
                    @click="onGetPeralatan(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td
              class="border border-gray-300"
              v-if="self.form.sumber_data === 'ASN'"
            >
              <p v-if="item.zona_gudang_plan">
                Zona Plan:
                {{ item.zona_gudang_plan.nama_zona_gudang }}
              </p>
              <p class="mt-2" v-if="item.slot_penyimpanan_aisle_plan">
                Aisle Plan:
                {{ item.slot_penyimpanan_aisle_plan.nama_slot_penyimpanan }}
              </p>
              <p class="mt-2" v-if="item.slot_penyimpanan_rack_plan">
                Rack Plan:
                {{ item.slot_penyimpanan_rack_plan.nama_slot_penyimpanan }}
              </p>
              <p class="mt-2" v-if="item.slot_penyimpanan_level_plan">
                Level Plan:
                {{ item.slot_penyimpanan_level_plan.nama_slot_penyimpanan }}
              </p>
              <p class="mt-2" v-if="item.slot_penyimpanan_bin_plan">
                Bin Plan:
                {{ item.slot_penyimpanan_bin_plan.nama_slot_penyimpanan }}
              </p>
            </td>
            <td class="border border-gray-300">
              <v-select
                label="nama_zona_gudang"
                :loading="isLoadingGetZonaPlan"
                :options="lookup_custom1.data"
                :filterable="false"
                @search="onGetZonaPlan"
                v-model="item.zona_gudang_id"
                class="w-full"
                @input="(item) => onSelectZona(item, index)"
              >
                <template slot="selected-option" slot-scope="option">
                  <div
                    class="w-20 whitespace-nowrap text-ellipsis overflow-hidden"
                  >
                    {{ option.nama_zona_gudang }}
                  </div>
                </template>
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
                      lookup_custom1.last_page > lookup_custom1.current_page
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
                @search="onGetSlotAisle(index)"
                v-model="item.slot_penyimpanan_id_aisle"
                @input="(item) => onSelectAisle(item, index)"
                class="w-full"
              >
                <template slot="option" slot-scope="option">
                  {{
                    option.nama_slot_penyimpanan +
                    " - " +
                    option.kode_slot_penyimpanan
                  }}
                </template>
                <template slot="selected-option" slot-scope="option">
                  <div
                    class="w-20 whitespace-nowrap text-ellipsis overflow-hidden"
                  >
                    {{
                      option.nama_slot_penyimpanan +
                      " - " +
                      option.kode_slot_penyimpanan
                    }}
                  </div>
                </template>
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom2.data.length || search"
                >
                  <span
                    v-if="lookup_custom2.current_page > 1"
                    @click="onGetSlotAisle(index, search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom2.last_page > lookup_custom2.current_page
                    "
                    @click="onGetSlotAisle(index, search, true)"
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
                @search="onGetSlotRack(index)"
                v-model="item.slot_penyimpanan_id_rack"
                @input="(item) => onSelectRack(item, index)"
                class="w-full"
              >
                <template slot="option" slot-scope="option">
                  {{
                    option.nama_slot_penyimpanan +
                    " - " +
                    option.kode_slot_penyimpanan
                  }}
                </template>
                <template slot="selected-option" slot-scope="option">
                  <div
                    class="w-20 whitespace-nowrap text-ellipsis overflow-hidden"
                  >
                    {{
                      option.nama_slot_penyimpanan +
                      " - " +
                      option.kode_slot_penyimpanan
                    }}
                  </div>
                </template>
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom3.data.length || search"
                >
                  <span
                    v-if="lookup_custom3.current_page > 1"
                    @click="onGetSlotRack(index, search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom3.last_page > lookup_custom3.current_page
                    "
                    @click="onGetSlotRack(index, search, true)"
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
                @search="onGetSlotLevel(index)"
                v-model="item.slot_penyimpanan_id_level"
                @input="(item) => onSelectLevel(item, index)"
                class="w-full"
              >
                <template slot="option" slot-scope="option">
                  {{
                    option.nama_slot_penyimpanan +
                    " - " +
                    option.kode_slot_penyimpanan
                  }}
                </template>
                <template slot="selected-option" slot-scope="option">
                  <div
                    class="w-20 whitespace-nowrap text-ellipsis overflow-hidden"
                  >
                    {{
                      option.nama_slot_penyimpanan +
                      " - " +
                      option.kode_slot_penyimpanan
                    }}
                  </div>
                </template>
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom4.data.length || search"
                >
                  <span
                    v-if="lookup_custom4.current_page > 1"
                    @click="onGetSlotLevel(index, search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom4.last_page > lookup_custom4.current_page
                    "
                    @click="onGetSlotLevel(index, search, true)"
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
                :options="lookup_custom5.data"
                :filterable="false"
                @search="onGetSlotBin"
                v-model="item.slot_penyimpanan_id_bin"
                @input="(item) => onSelectBin(item, index)"
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
                    @click="onGetSlotBin(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom5.last_page > lookup_custom5.current_page
                    "
                    @click="onGetSlotBin(search, true)"
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
              class="border border-gray-300"
              v-if="self.form.sumber_data === 'ASN'"
            >
              <ValidationProvider name="alasan_beda_plan_id" class="w-full">
                <!-- :rules="isSameAsPlan" -->
                <div slot-scope="{ errors, valid }">
                  <v-select
                    label="nama_alasan_beda_plan"
                    :loading="isLoadingGetAlasan"
                    :options="lookup_grade.data"
                    :filterable="false"
                    @search="onGetAlasan"
                    v-model="item.alasan_beda_plan_id"
                    :reduce="(item) => item.alasan_beda_plan_id"
                    class="w-full"
                  >
                    <template slot="selected-option" slot-scope="option">
                      <div
                        class="w-20 whitespace-nowrap text-ellipsis overflow-hidden"
                      >
                        {{ option.nama_alasan_beda_plan }}
                      </div>
                    </template>
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_grade.data.length || search"
                    >
                      <span
                        v-if="lookup_grade.current_page > 1"
                        @click="onGetAlasan(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_grade.last_page > lookup_grade.current_page
                        "
                        @click="onGetAlasan(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                  <!-- <span
                                  class="text-danger text-xs pl-1"
                                  v-if="errors[0]"
                                >
                                  {{ errors[0] }}
                                </span> -->
                </div>
              </ValidationProvider>
            </td>
            <td class="border border-gray-300 text-center">
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="onDeleteDetails(index, item)"
              ></i>
            </td>
          </tr>
          <tr v-if="!self.form.inbound_details.length > 0">
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

      <!-- <div class="mb-20 ml-20" v-if="items">
                      <ul class="flex gap-2">
                        <li
                          class="mb-2 flex items-center"
                          v-for="(item, i) in items"
                          :key="i"
                        >
                          <p class="w-40">{{ item.nama_item }}</p>
                          <div
                            class="p-1 border border-gray-300 rounded-md w-[200px]"
                          >
                            {{ item.quantity || formatPrice }}
                          </div>
                        </li>
                      </ul>
                    </div> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["self"],

  data() {
    return {
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

      isStopSearchAlasan: false,
      isLoadingGetAlasan: false,
      alasan_search: "",

      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchPeralatan: false,
      isLoadingGetPeralatan: false,
      peralatan_search: "",

      items: [],
    };
  },

  async mounted() {
    await this.onSearchValuation();
    // await this.onSearchZonaPlan();
    // await this.onSearchSlotAisle();
    // await this.onSearchSlotRack();
    // await this.onSearchSlotLevel();
    // await this.onSearchSlotBin();
    await this.onSearchAlasan();
    // await this.onSearchItemGudang();
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
      "lookup_warehouses",
      "lookup_products",
      "lookup_grade",
      "lookup_mesin",
    ]),

    lookupItem() {
      let filteredItem = this.lookup_products.data.filter((item) => {
        this.self.items.includes(item.item_gudang_id);
      });
      if (this.form.sumber_data === "NON") {
        return this.lookup_products.data;
      } else {
        return filteredItem;
      }
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    AddDetailInbound() {
      this.self.form.inbound_details.push({
        detail_inbound_id: "",
        item_id: "",
        serial_number: "",
        quantity: "",
        peralatan_id: "",
        valuation_id: "",
        status_terima: "FULL",
        panjang: "",
        lebar: "",
        tinggi: "",
        berat: "",
        zona_id: "",
        slot_penyimpanan_id_aisle: "",
        slot_penyimpanan_id_rack: "",
        slot_penyimpanan_id_level: "",
        slot_penyimpanan_id_bin: "",
        keterangan: "",
        alasan_beda_plan_id: "",
      });
    },

    onDeleteDetails(index, item) {
      this.self.form.inbound_details = this.self.form.inbound_details.filter(
        (_, itemIndex) => index !== itemIndex
      );

      const notAllDeleted = this.self.form.inbound_details.some(
        (data) =>
          data.item_gudang_id.item_gudang_id ===
          item.item_gudang_id.item_gudang_id
      );

      if (!notAllDeleted) {
        this.self.form.biaya_inbounds = this.self.form.biaya_inbounds.filter(
          (data) => item.item_gudang_id.item_gudang_id !== data.item_gudang_id
        );
      }
    },

    // Get zona plan
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
            "&gudang_id=" +
            this.self.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaPlan = false;
      }
    },

    async onSelectZona(item, index) {
      if (item) {
        this.self.form.inbound_details[index].zona_gudang_id = item;
        this.self.form.inbound_details[index].slot_penyimpanan_id_aisle = "";
        await this.onSearchSlotAisle(index);
      } else {
        this.self.form.inbound_details[index].zona_gudang_id = null;
        this.self.form.inbound_details[index].slot_penyimpanan_id_aisle = "";

        // Force update UI
        this.$forceUpdate();
      }
    },

    // Get slot aisle
    onGetSlotAisle(index, search, isNext) {
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

        this.onSearchSlotAisle(index);
      }, 600);
    },

    async onSearchSlotAisle(index) {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom2",
          query:
            "?search=" +
            this.slot_aisle_search +
            "&level=1" +
            "&gudang_id=" +
            this.self.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.self.form.inbound_details[index].zona_gudang_id
              .zona_gudang_id +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    async onSelectAisle(item, index) {
      if (item) {
        this.self.form.inbound_details[index].slot_penyimpanan_id_aisle = item;
        this.self.form.inbound_details[index].slot_penyimpanan_id_rack = "";
        await this.onSearchSlotRack(index);
      } else {
        this.self.form.inbound_details[index].slot_penyimpanan_id_aisle = "";
        this.self.form.inbound_details[index].slot_penyimpanan_id_rack = "";
      }
    },

    // Get slot rack
    onGetSlotRack(index, search, isNext) {
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

        this.onSearchSlotRack(index);
      }, 600);
    },

    async onSearchSlotRack(index) {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom3",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=2" +
            "&gudang_id=" +
            this.self.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.self.form.inbound_details[index].zona_gudang_id
              .zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.self.form.inbound_details[index].slot_penyimpanan_id_aisle
              .slot_penyimpanan_id +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    async onSelectRack(item, index) {
      if (item) {
        this.self.form.inbound_details[index].slot_penyimpanan_id_rack = item;
        this.self.form.inbound_details[index].slot_penyimpanan_id_level = "";
        await this.onSearchSlotLevel(index);
      } else {
        this.self.form.inbound_details[index].slot_penyimpanan_id_rack = "";
        this.self.form.inbound_details[index].slot_penyimpanan_id_level = "";
      }
    },

    // Get slot level
    onGetSlotLevel(index, search, isNext) {
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

        this.onSearchSlotLevel(index);
      }, 600);
    },

    async onSearchSlotLevel(index) {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom4",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=3" +
            "&gudang_id=" +
            this.self.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.self.form.inbound_details[index].zona_gudang_id
              .zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.self.form.inbound_details[index].slot_penyimpanan_id_rack
              .slot_penyimpanan_id +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    async onSelectLevel(item, index) {
      if (item) {
        this.self.form.inbound_details[index].slot_penyimpanan_id_level = item;
        this.self.form.inbound_details[index].slot_penyimpanan_id_bin = "";
        await this.onSearchSlotBin(index);
      } else {
        this.self.form.inbound_details[index].slot_penyimpanan_id_level = "";
        this.self.form.inbound_details[index].slot_penyimpanan_id_bin = "";
      }
    },

    // Get slot level
    onGetSlotBin(index, search, isNext) {
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

        this.onSearchSlotBin(index);
      }, 600);
    },

    async onSearchSlotBin(index) {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom5",
          query:
            "?search=" +
            this.slot_bin_search +
            "&level=4" +
            "&gudang_id=" +
            this.self.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.self.form.inbound_details[index].zona_gudang_id
              .zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.self.form.inbound_details[index].slot_penyimpanan_id_level
              .slot_penyimpanan_id +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    async onSelectBin(item, index) {
      if (item) {
        this.self.form.inbound_details[index].slot_penyimpanan_id_bin = item;
        console.log(item);
      } else {
        this.self.form.inbound_details[index].slot_penyimpanan_id_bin = "";
      }
    },

    // get item gudang
    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_products.current_page = isNext
            ? this.lookup_products.current_page + 1
            : this.lookup_products.current_page - 1;
        } else {
          this.lookup_products.current_page = 1;
        }

        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "products",
          query:
            "?search=" +
            this.item_gudang_search +
            // "&gudang_id=1" +
            "&page=" +
            this.lookup_products.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },

    async onSelectItemDetail(item, index) {
      this.self.form.inbound_details[index] = { ...item };
      this.self.form.inbound_details[index].quantity_terima =
        item.quantity_request;
      this.self.form.inbound_details[index].quantity_request =
        item.quantity_request;
      this.self.form.inbound_details[index].item_gudang_id = {
        item_gudang_id:
          typeof item.item_gudang_id.item_gudang_id === "object"
            ? item.item_gudang_id.item_gudang_id
            : item.item_gudang_id,
        item_id: item.item_id,
        nama_item: item.nama_item,
      };
      await this.onSearchZonaPlan();
      await this.generateBiayaTagihan(index);

      if (this.self.form.sumber_data == "ASN") {
        const rekomendasiZona = await this.$axios.get(
          `inbound/asn/get-rekomendasi-zona/${this.self.form.gudang_id.gudang_id}`
        );
        if (rekomendasiZona.data.length > 0) {
          const selectedZona = rekomendasiZona.data[0];

          // PENTING: Pastikan item ada di options sebelum set
          const existingIndex = this.lookup_custom1.data.findIndex(
            (item) => item.zona_gudang_id === selectedZona.zona_gudang_id
          );

          if (existingIndex === -1) {
            // Tambahkan ke options
            this.lookup_custom1.data.unshift(selectedZona);
          }

          // Gunakan referensi yang sama dengan yang ada di options
          const itemFromOptions =
            existingIndex >= 0
              ? this.lookup_custom1.data[existingIndex]
              : this.lookup_custom1.data[0]; // yang baru saja ditambahkan

          this.onSelectZona(itemFromOptions, index);
        }
      }
    },

    // get alasan
    onGetAlasan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchAlasan);

      this.isStopSearchAlasan = setTimeout(() => {
        this.alasan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchAlasan();
      }, 600);
    },

    async onSearchAlasan() {
      if (!this.isLoadingGetAlasan) {
        this.isLoadingGetAlasan = true;

        await this.lookUp({
          url: "master/alasan-beda-plan/get-alasan-beda-plan",
          lookup: "grade",
          query:
            "?search=" +
            this.alasan_search +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });

        this.isLoadingGetAlasan = false;
      }
    },

    sumQuantity(item) {
      let quantity = 0;
      this.self.form.inbound_details.forEach((data) => {
        if (
          data.item_gudang_id.item_gudang_id ==
          item.item_gudang_id.item_gudang_id
        ) {
          quantity = quantity + data.quantity;
        }
      });
      const index = this.self.form.biaya_inbounds.findIndex(
        (data) => data.item_gudang_id == item.item_gudang_id.item_gudang_id
      );
      this.self.form.biaya_inbounds[index].jumlah = quantity;
    },

    onGetPeralatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPeralatan);

      this.isStopSearchPeralatan = setTimeout(() => {
        this.peralatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_mesin.current_page = isNext
            ? this.lookup_mesin.current_page + 1
            : this.lookup_mesin.current_page - 1;
        } else {
          this.lookup_mesin.current_page = 1;
        }

        this.onSearchPeralatan();
      }, 600);
    },

    async onSearchPeralatan() {
      if (!this.isLoadingGetPeralatan) {
        this.isLoadingGetPeralatan = true;

        await this.lookUp({
          url: "master/peralatan/get-peralatan",
          lookup: "mesin",
          query:
            "?search=" +
            this.peralatan_search +
            "&gudang_id=" +
            this.self.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_mesin.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPeralatan = false;
      }
    },

    async onSelectPeralatan(item, index) {
      if (item) {
        this.self.form.inbound_details[index].peralatan_id = item;
        await this.generateBiayaTagihan(index);
      } else {
        this.self.form.inbound_details[index].peralatan_id = "";
      }
    },

    async generateBiayaTagihan(index) {
      let itemNumber = index;

      // this.self.form.biaya_inbounds = [];

      const biaya = await this.$axios.get(
        "/finance/kontrak-tkbm/get-kontrak-tkbm",
        {
          params: {
            item_gudang_id:
              this.self.form.inbound_details[index].item_gudang_id
                .item_gudang_id ?? "",
            peralatan_id:
              typeof this.self.form.inbound_details[index].peralatan_id ===
              "object"
                ? this.self.form.inbound_details[index].peralatan_id
                    .peralatan_id
                : "",
            vendor_id: this.self.form.vendor_id_transporter.vendor_id,
            gudang_id: this.self.form.gudang_id.gudang_id,
            jenis: "inbound",
          },
        }
      );

      // const tagihan = this.$axios.get(
      //   "/finance/kontrak-tkbm-pelanggan/get-kontrak-tkbm",
      //   {
      //     params: {
      //       item_gudang_id:
      //         this.self.form.inbound_details[index].item_gudang_id
      //           .item_gudang_id ?? "",
      //       peralatan_id:
      //         typeof this.self.form.inbound_details[index].peralatan_id ===
      //         "object"
      //           ? this.self.form.inbound_details[index].peralatan_id
      //               .peralatan_id
      //           : "",
      //       gudang_id: this.self.form.gudang_id.gudang_id,
      //       jenis: "inbound",
      //     },
      //   }
      // );

      if (biaya.data.length) {
        this.self.form.biaya_inbounds = this.self.form.biaya_inbounds.filter(
          (item) => item.urutan !== itemNumber
        );
      }

      // if (
      //   !this.self.form.biaya_inbounds.find(
      //     (data) =>
      //       data.item_gudang_id ===
      //       this.self.form.inbound_details[index].item_gudang_id.item_gudang_id
      //   )
      // ) {
      // }
      biaya.data?.forEach((data) => {
        this.self.form.biaya_inbounds.push({
          ...data,
          item_gudang: data.item_gudang,
          item_id: data.item_id,
          item_gudang_id: data.item_gudang_id,
          biaya_inbound_id: "",
          jenis_biaya_id: data.jenis_biaya,
          nominal_satuan: data.nilai_kontrak,
          berat: data.item_gudang.berat_kotor,
          volume: data.item_gudang.volume,
          jumlah: parseFloat(
            this.self.form.inbound_details[index].quantity_terima
          ),
          total: 0,
          divisi_id: data.divisi,
          vendor_id: data.vendor_id,
          coa_id: "",
          dasar_perhitungan: data.dasar_perhitungan,
          payable_to: data.payable_to,
          pelanggan_id: data.pelanggan,
          peralatan_id: this.self.form.inbound_details[index].peralatan_id
            ? this.self.form.inbound_details[index].peralatan_id.peralatan_id
            : "",
          urutan: itemNumber,
        });
      });

      // if (
      //   !this.self.form.tagihan_inbounds.find(
      //     (data) =>
      //       data.item_gudang_id ===
      //       this.self.form.inbound_details[index].item_gudang_id.item_gudang_id
      //   )
      // ) {
      //   tagihan.data.forEach((data) => {
      //     this.self.form.tagihan_inbounds.push({
      //       ...data,
      //       tagihan_inbound_id: "",
      //       item_gudang: data.item_gudang,
      //       item_id: data.item_id,
      //       item_gudang_id: data.item_gudang_id,
      //       jenis_kontrak_id: data.jenis_kontrak,
      //       divisi_id: data.divisi,
      //       jenis_biaya_id: data.jenis_biaya,
      //       mata_uang_id: data.mata_uang,
      //       pembayaran_id: data.pembayaran,
      //       term_pembayaran_id: data.term_pembayaran,
      //       group_item_id: data.group_item,
      //       nominal_satuan: data.nilai_kontrak,
      //       jumlah: parseFloat(
      //         this.self.form.inbound_details[index].quantity_terima
      //       ),
      //       total: 0,
      //       jenis: 0,
      //       coa_id: "",
      //       pelanggan_id: data.pelanggan ?? "",
      //     });
      //   });
      // }
      // await Promise.all(this.self.form.inbound_details.forEach((item) => {}));
    },
  },
};
</script>
