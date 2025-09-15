<template>
  <div>
    <div class="w-full flex justify-between items-center">
      <h1 class="text-xl font-bold">Detail Shipment</h1>
      <div class="flex gap-3">
        <button
          type="button"
          @click="self.onOpenModal"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Detail Shipment</p>
        </button>
        <button
          type="button"
          @click="self.generateRuteShipment"
          class="bg-[#4fc47a] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-retweet"></i>
          <p class="text-xs font-medium">Generate</p>
        </button>
      </div>
    </div>
    <div class="table-responsive overflow-y-hidden mb-7">
      <table
        class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
        :class="
          self.parameters.form.shipment_details.length ? 'mb-[300px]' : ''
        "
      >
        <thead>
          <tr class="text-sm uppercase text-nowrap w-full">
            <th class="w-[200px] border border-gray-300">Urutan</th>
            <th class="w-[200px] border border-gray-300">Item</th>
            <th class="w-[150px] border border-gray-300">Jenis Transaksi</th>
            <th class="w-[200px] border border-gray-300">Alamat Pengiriman</th>
            <th class="w-[200px] border border-gray-300">Lokasi</th>
            <th class="w-[200px] border border-gray-300">
              Kode Delivery Order
            </th>
            <th class="w-[200px] border border-gray-300">Nomor Referensi</th>
            <th class="w-[200px] border border-gray-300">Zona Gudang</th>
            <!-- <th class="w-[200px] border border-gray-300">Aisle</th>
            <th class="w-[200px] border border-gray-300">Rack</th>
            <th class="w-[200px] border border-gray-300">Level</th>
            <th class="w-[200px] border border-gray-300">Bin</th> -->
            <th class="w-[200px] border border-gray-300">Quantity</th>
            <!-- <th class="w-[200px] border border-gray-300">Note</th> -->
            <th class="w-[200px] border border-gray-300">Keterangan</th>
            <th class="w-[100px] border border-gray-300 text-center">Hapus</th>
          </tr>
        </thead>
        <draggable
          v-model="self.parameters.form.shipment_details"
          @start="drag = true"
          @end="self.updateUrutan"
          class="w-full"
          tag="tbody"
        >
          <tr
            v-for="(item, i) in self.parameters.form.shipment_details"
            :key="i"
            class="border-t align-top cursor-grab"
          >
            <td class="w-[200px] border border-gray-300">{{ setUrutan(i) }}</td>
            <td class="w-[200px] border border-gray-300">
              <!-- <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                label="nama_item"
                :loading="isLoadingGetItemGudang"
                :options="lookup_custom3.data"
                :filterable="false"
                @search="onGetItemGudang"
                v-model="item.item_gudang_id"
              >
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
                      lookup_custom3.last_page > lookup_custom3.current_page
                    "
                    @click="onGetItemGudang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select> -->

              <p v-if="item.item_gudang_id">
                {{ item.item_gudang_id.nama_item }}
                {{ item.item_gudang_id.kode_item }}
              </p>
            </td>
            <td class="w-[150px] border border-gray-300 text-center">
              <span
                v-if="item.jenis == 0"
                class="p-1 text-white rounded-md bg-orange-500"
                >Penjualan</span
              >
              <span
                v-if="item.jenis == 1"
                class="p-1 text-white rounded-md bg-green-500"
                >Stok Transfer</span
              >
            </td>
            <td class="w-[200px] border border-gray-300">
              <p>
                {{
                  item.lokasi_id.alamat_lokasi
                    ? item.lokasi_id.alamat_lokasi
                    : "-"
                }}
              </p>
            </td>
            <td class="w-[200px] border border-gray-300">
              <p>{{ item.lokasi_id ? item.lokasi_id.nama_lokasi : "" }}</p>
              <p>{{ item.lokasi_id ? item.lokasi_id.kode_lokasi : "" }}</p>
            </td>
            <td class="w-[200px] border border-gray-300">
              {{ item.kode_delivery_order }}
            </td>

            <td class="w-[200px] border border-gray-300">
              <input
                type="text"
                class="w-full p-1 rounded-md border border-gray-300 outline-none"
                v-model="item.no_referensi"
              />
            </td>
            <td class="w-[200px] border border-gray-300">
              <!-- {{
                item.zona_gudang_tujuan
                  ? item.zona_gudang_tujuan.nama_zona_gudang
                  : ""
              }} -->
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_zona_gudang"
                :loading="isLoadingGetZonaGudang"
                :options="lookup_custom4.data"
                :filterable="false"
                @search="onGetZonaGudang"
                v-model="item.zona_gudang_id"
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
                      lookup_custom4.last_page > lookup_custom4.current_page
                    "
                    @click="onGetZonaGudang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <!-- <td class="border border-gray-300"></td>
              <td class="border border-gray-300"></td>
              <td class="border border-gray-300"></td> -->
            <!-- <td class="border border-gray-300"></td> -->
            <td class="w-[200px] border border-gray-300">
              {{ item.quantity }}
            </td>
            <!-- <td class="border border-gray-300">
                <textarea
                  placeholder="Note"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  v-model="item.note"
                ></textarea>
              </td> -->
            <td class="w-[200px] border border-gray-300">
              <textarea
                placeholder="Keterangan"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                v-model="item.keterangan"
              ></textarea>
            </td>
            <td
              class="w-[100px] text-center text-gray-600 border border-gray-300"
            >
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="onDeleteDetailShipment(i)"
              ></i>
            </td>
          </tr>
          <tr v-if="!self.parameters.form.shipment_details.length > 0">
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
        </draggable>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import draggable from "vuedraggable";

export default {
  props: ["self"],

  components: {
    draggable,
  },

  data() {
    return {
      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",
    };
  },

  async mounted() {
    await this.onSearchItemGudang();
    await this.onSearchZonaGudang();
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom3", //item_gudang
      "lookup_custom4", //zona_gudang
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    AddDetailShipment() {
      this.self.parameters.form.shipment_details.push({
        shipment_detail_id: "",
        pick_order_detail_id: "",
        lokasi_id: "",
        pick_request_detail_id: "",
        kode_delivery_order: "",
        no_referensi: "",
        urutan: "",
        item_id: "",
        item_pelanggan_id: "",
        item_gudang_id: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle: "",
        slot_penyimpanan_id_rack: "",
        slot_penyimpanan_id_level: "",
        slot_penyimpanan_id_bin: "",
        quantity: "",
        valuation_id: "",
        keterangan: "",
        note: "",
      });
    },

    onDeleteDetailShipment(index) {
      this.self.parameters.form.shipment_details =
        this.self.parameters.form.shipment_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    setUrutan(index) {
      if (this.self.parameters.form.shipment_details) {
        this.self.parameters.form.shipment_details[index].urutan = index + 1;
        return this.self.parameters.form.shipment_details[index].urutan;
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
  },
};
</script>
