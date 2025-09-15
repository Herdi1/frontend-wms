<template>
  <div>
    <div class="py-2 flex justify-between items-center">
      <div class="w-1/2">
        <select-button
          :self="{
            label: 'Pick Request',
            optionLabel: 'nama_pick_request',
            lookup: lookup_custom4,
            value: form.pick_request_id,
            onGet: onGetPickRequest,
            isLoadingL: isLoadingGetPickRequest,
            input: onSelectPickRequest,
          }"
          width="w-[50%]"
          class="mb-5"
        />
      </div>
      <div class="w-full relative flex justify-end gap-2">
        <button
          type="button"
          @click="addPickOrderDetails"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Pick Order Detail</p>
        </button>
      </div>
    </div>
    <div class="mt-4 py-2">
      <table
        class="table border-collapse border border-gray-300 mt-5 table-fixed"
      >
        <thead>
          <tr class="text-sm uppercase">
            <th class="w-full border border-gray-300">Data Pick Request</th>
            <th class="w-full border border-gray-300">Item Gudang</th>
            <th class="w-full border border-gray-300">Rekomendasi Zona Asal</th>
            <th class="w-full border border-gray-300">Serial Number</th>
            <th class="w-full border border-gray-300">Quantity</th>
            <th class="w-full border border-gray-300">Keterangan Detail</th>
            <th class="w-full border border-gray-300">Zona Tujuan</th>
            <th class="w-20 border border-gray-300 text-center">Delete</th>
            <!-- <th class="w-40 border border-gray-300">Detail Pick Order</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in form.detail_pick_order_stok_transfer"
            :key="i"
            class="border-t border-gray-400 align-top"
          >
            <td class="border border-gray-300"></td>
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
                      lookup_custom3.last_page > lookup_custom3.current_page
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
              <textarea
                placeholder="Zona Transit"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                v-model="item.zona_transit"
              ></textarea>
            </td>
            <td class="text-center text-gray-600 border border-gray-300">
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="onDeleteItem(i)"
              ></i>
            </td>
            <!-- <td class="border border-gray-300">
                    <textarea
                      placeholder="Detail Pick Order"
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      v-model="item.detail_pick_order"
                    ></textarea>
                  </td> -->
          </tr>
          <tr v-if="!form.detail_pick_order_stok_transfer.length > 0">
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
        </tbody>
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
      isStopSearchPickRequest: false,
      isLoadingGetPickRequest: false,
      pick_request_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      gudang_search: "",

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

      form: this.self.form,

      formPickOrder: {
        detail_pick_order_stok_transfer_id: "",
        item_gudang_id: "",
        zona_gudang_id: "",
        serial_number: "",
        quantity: "",
        keterangan_detail: "",
        zona_tujuan_id: "",
        // detail_pick_order: "",
      },
    };
  },

  async mounted() {
    await this.onSearchPickRequest();
    await this.onSearchItemGudang();
    await this.onSearchZonaGudang();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom2", //item gudang
      "lookup_custom3", //zona gudang
      "lookup_custom4", //pick request
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    addPickOrderDetails() {
      this.form.detail_pick_order_stok_transfer.push({
        ...this.formPickOrder,
      });
      // this.resetFormPickOrder();
    },

    addPickOrderDetails() {
      this.form.detail_pick_order_stok_transfer.push({
        detail_pick_order_stok_transfer_id: "",
        item_gudang_id: "",
        zona_gudang_id: "",
        serial_number: "",
        quantity: "",
        keterangan_detail: "",
        zona_tujuan_id: "",
        // detail_pick_order: "",
      });
    },

    onDeleteItem(index) {
      this.form.detail_pick_order_stok_transfer =
        this.form.detail_pick_order_stok_transfer.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.gudang_search = search;

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
            this.gudang_search +
            "&page=" +
            this.lookup_custom2.current_page +
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
            this.zona_gudang_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });
        this.isLoadingGetZonaGudang = false;
      }
    },

    onGetPickRequest(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchPickRequest);

      this.isStopSearchPickRequest = setTimeout(() => {
        this.pick_request_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }
        this.onSearchPickRequest();
      }, 600);
    },

    async onSearchPickRequest() {
      if (!this.isLoadingGetPickRequest) {
        this.isLoadingGetPickRequest = true;

        await this.lookUp({
          url: "outbound/pick-request/get-pick-request",
          lookup: "custom4",
          query:
            "?search=" +
            this.pick_request_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });
        this.isLoadingGetPickRequest = false;
      }
    },

    onSelectPickRequest(item) {
      if (item) {
        this.form.pick_request_id = item;
      } else {
        this.form.pick_request_id = "";
      }
    },
  },
};
</script>
