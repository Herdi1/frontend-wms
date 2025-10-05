<template>
  <div>
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
          <p class="text-xs font-medium">Tambah Detail Pick Request</p>
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
            <th class="w-full border border-gray-300">Item</th>
            <th class="w-full border border-gray-300">Quantity</th>
            <th class="w-full border border-gray-300">Keterangan</th>
            <th class="w-20 border border-gray-300 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in self.parameters.form.pick_request_details"
            :key="index"
            class="border-t border-gray-400 align-top"
          >
            <td class="border border-gray-300">
              <div class="w-full">
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                  label="nama_item"
                  :loading="isLoadingGetItemGudang"
                  :options="lookup_custom2.data"
                  :filterable="false"
                  @search="onGetItemGudang"
                  v-model="item.item_gudang_id"
                  @input="(item) => onSelectItemGudang(item, index)"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom2.data.length || search"
                  >
                    <span
                      v-if="lookup_custom2.current_page > 1"
                      @click="onGetItemGudang(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom2.last_page > lookup_custom2.current_page
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
                <p v-if="item.item_gudang_id.kode_item">
                  {{ item.item_gudang_id.kode_item }}
                </p>
              </div>
            </td>
            <td class="border border-gray-300">
              <p>Quantity:</p>
              <money
                v-model="item.quantity"
                class="w-full pl-2 py-1 border rounded focus:outline-none mb-2"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
              <p>Valuation:</p>
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                label="nama_valuation"
                :loading="isLoadingGetValuation"
                :options="lookup_custom4.data"
                :filterable="false"
                @search="onGetValuation"
                v-model="item.valuation_id"
                @input="(item) => onSelectValuation(item, index)"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom4.data.length || search"
                >
                  <span
                    v-if="lookup_custom4.current_page > 1"
                    @click="onGetValuation(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom4.last_page > lookup_custom4.current_page
                    "
                    @click="onGetValuation(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>

            <td class="border border-gray-300">
              <textarea
                placeholder="keterangan"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                v-model="item.keterangan"
              ></textarea>
            </td>
            <td class="text-center text-gray-600 border border-gray-300">
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="onDeleteItem(index)"
              ></i>
            </td>
          </tr>
        </tbody>
        <tr v-if="!self.parameters.form.pick_request_details.length > 0">
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["self"],

  data() {
    return {
      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchItemValuation: false,
      isLoadingGetItemValuation: false,
      valuation_search: "",

      formPickRequest: {
        pick_request_detail_id: "",
        item_id: "",
        item_gudang_id: "",
        quantity: "",
        valuation_id: "",
        keterangan: "",
      },
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom2",
      "lookup_custom4",
    ]),
  },

  async created() {
    // await this.onSearchItemGudang();
    await this.onSearchValuation();
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    addPickRequestDetail() {
      let valuasi = {};
      if (this.lookup_custom4.data.length > 0) {
        console.log(this.lookup_custom4.data);
        valuasi = this.lookup_custom4.data.filter(
          (item) => item.kode_valuation === "N"
        );
      }
      this.self.parameters.form.pick_request_details.push({
        pick_request_detail_id: "",
        item_id: "",
        item_gudang_id: "",
        quantity: "",
        valuation_id: valuasi[0],
        keterangan: "",
      });
      // this.resetFormPickRequest();
    },

    resetFormPickRequest() {
      this.formPickRequest = {
        detail_pick_request_id: "",
        item_id: "",
        item_gudang_id: "",
        quantity: "",
        valuation_id: "",
        keterangan: "",
      };
    },

    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "custom2",
          query:
            "?search=" +
            this.item_gudang_search +
            "&gudang_id=" +
            this.self.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },

    onSelectItemGudang(item, index) {
      if (item) {
        this.self.parameters.form.pick_request_details[index].item_gudang_id =
          item;
      } else {
        this.self.parameters.form.pick_request_details[index].item_gudang_id =
          "";
      }
    },

    onGetValuation(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchValuation);

      this.isStopSearchValuation = setTimeout(() => {
        this.valuation_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchValuation();
      }, 600);
    },

    async onSearchValuation() {
      if (!this.isLoadingGetValuation) {
        this.isLoadingGetValuation = true;

        await this.lookUp({
          url: "master/valuation/get-valuation",
          lookup: "custom4",
          query:
            "?search=" +
            this.valuation_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetValuation = false;
      }
    },

    onSelectValuation(item, index) {
      if (item) {
        this.self.parameters.form.pick_request_details[index].valuation_id =
          item;
      } else {
        this.self.parameters.form.pick_request_details[index].valuation_id = "";
      }
    },
  },
};
</script>
