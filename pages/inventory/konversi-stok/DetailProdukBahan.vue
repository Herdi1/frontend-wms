<template>
  <div>
    <div class="w-full flex justify-between items-center">
      <h1 class="text-xl font-bold">Detail Produk Bahan</h1>
      <div class=" ">
        <button
          type="button"
          @click="addDetailProdukBahan"
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
        :class="
          this.self.parameters.form.konversi_stok_detail_bahan.length
            ? 'mb-[300px]'
            : ''
        "
      >
        <thead>
          <tr class="text-sm uppercase text-nowrap">
            <th class="w-[200px] border border-gray-300">Item</th>
            <th class="w-[200px] border border-gray-300">Quantity</th>
            <th class="w-[200px] border border-gray-300">Zona</th>
            <th class="w-[200px] border border-gray-300">Aisle</th>
            <th class="w-[200px] border border-gray-300">Rack</th>
            <th class="w-[200px] border border-gray-300">Level</th>
            <th class="w-[200px] border border-gray-300">Bin</th>
            <th class="w-[300px] border border-gray-300">Keterangan</th>
            <th class="w-[100px] border border-gray-300">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in this.self.parameters.form
              .konversi_stok_detail_bahan"
            :key="index"
            class="align-top"
          >
            <td class="border border-gray-300 text-center">
              <v-select
                label="nama_item"
                :loading="isLoadingGetItemGudang"
                :options="lookup_custom7.data"
                :filterable="false"
                v-model="item.item_gudang_id"
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
                    @click="onGetItemGudang(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom7.last_page > lookup_custom7.current_page
                    "
                    @click="onGetItemGudang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
                <template #list-footer="{ search }">
                  <button
                    v-if="search"
                    type="button"
                    @click="self.onGetItemGudang(search, false)"
                    class="bg-blue-500 p-1 w-full text-sm text-white"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </template>
              </v-select>
            </td>
            <td class="border border-gray-300 text-start">
              <p class="mb-2">Quantity</p>
              <money
                v-model="item.quantity"
                class="w-full mb-2 pl-2 py-1 border rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
              <p class="mb-2">Valuation</p>
              <v-select
                label="nama_valuation"
                :loading="isLoadingGetValuation"
                :options="lookup_custom6.data"
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
                  v-if="lookup_custom6.data.length || search"
                >
                  <span
                    v-if="lookup_custom6.current_page > 1"
                    @click="onGetValuation(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom6.last_page > lookup_custom6.current_page
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
                label="nama_zona_gudang"
                :loading="isLoadingGetZonaPlan"
                :options="lookup_custom1.data"
                :filterable="false"
                @search="onGetZonaPlan"
                v-model="item.zona_gudang_id"
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
                <template slot="selected-option" slot-scope="option">
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
                      lookup_custom2.last_page > lookup_custom2.current_page
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
                <template slot="selected-option" slot-scope="option">
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
                      lookup_custom3.last_page > lookup_custom3.current_page
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
                <template slot="selected-option" slot-scope="option">
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
                    @click="onGetSlotLevel(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom4.last_page > lookup_custom4.current_page
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
                <template slot="selected-option" slot-scope="option">
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
            <td class="border border-gray-300 text-center">
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="deleteDetailProdukBahan(index)"
              ></i>
            </td>
          </tr>
          <tr
            v-if="
              !this.self.parameters.form.konversi_stok_detail_bahan.length > 0
            "
          >
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
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    return {
      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

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

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_custom4",
      "lookup_custom5",
      "lookup_custom6",
      "lookup_custom7",
    ]),
  },

  methods: {
    addDetailProdukBahan() {
      this.self.parameters.form.konversi_stok_detail_bahan.push({
        item_id: "",
        item_pelanggan_id: "",
        item_gudang_id: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle: "",
        slot_penyimpanan_id_rack: "",
        slot_penyimpanan_id_level: "",
        slot_penyimpanan_id_bin: "",
        kode_lokasi_terakhir: "",
        quantity: "",
        valuation_id: "",
        keterangan: "",
      });
    },

    deleteDetailProdukBahan(index) {
      this.self.parameters.form.konversi_stok_detail_bahan =
        this.self.parameters.form.konversi_stok_detail_bahan.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetValuation(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchValuation);

      this.isStopSearchValuation = setTimeout(() => {
        this.valuation_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchValuation();
      }, 600);
    },

    async onSearchValuation() {
      if (!this.isLoadingGetValuation) {
        this.isLoadingGetValuation = true;

        await this.lookUp({
          url: "master/valuation/get-valuation",
          lookup: "custom6",
          query:
            "?search=" +
            this.valuation_search +
            "&page=" +
            this.lookup_custom6.current_page +
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
            "&gudang_id=" +
            this.parameters.form.gudang_id +
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
            "&gudang_id=" +
            this.parameters.form.gudang_id +
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
            "&gudang_id=" +
            this.parameters.form.gudang_id +
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
            "&gudang_id=" +
            this.parameters.form.gudang_id +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    // get item gudang
    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "custom7",
          query:
            "?search=" +
            this.item_gudang_search +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },
  },
};
</script>
