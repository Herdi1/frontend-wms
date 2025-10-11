<template>
  <div>
    <div class="w-full flex justify-between items-center">
      <h1 class="text-xl font-bold">Detail Produk Jadi</h1>
      <div class=" ">
        <!-- <button
          type="button"
          @click="addDetailProdukJadi"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Detail</p>
        </button> -->
      </div>
    </div>
    <div class="table-responsive overflow-y-hidden mb-7 min-h-[300px]">
      <table
        class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
      >
        <thead>
          <tr class="text-sm uppercase text-nowrap">
            <th class="w-[200px] border border-gray-300">Item</th>
            <th class="w-[200px] border border-gray-300">Quantity</th>
            <th class="w-[200px] border border-gray-300">Tgl Expired</th>
            <th class="w-[200px] border border-gray-300">Serial Number</th>
            <th class="w-[200px] border border-gray-300">Zona</th>
            <th class="w-[200px] border border-gray-300">Lokasi Penyimpanan</th>
            <th class="w-[300px] border border-gray-300">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in this.self.parameters.form
              .konversi_stok_detail_jadi"
            :key="index"
            class="align-top"
          >
            <td class="border border-gray-300 text-center">
              <p class="font-bold">
                {{ item.item_gudang.nama_item }} -
                {{ item.item_gudang.kode_item }}
              </p>
            </td>
            <td class="border border-gray-300 text-start">
              <div>
                <p>Quantity</p>

                <p class="font-bold text-end">
                  {{ parseFloat(item.quantity) }}
                </p>
              </div>
              <div>
                <p>Valuation</p>
                <p class="font-semibold text-end">
                  {{ item.valuation?.kode_valuation }} -
                  {{ item.valuation?.nama_valuation }}
                </p>
              </div>
            </td>
            <td class="border border-gray-300">
              {{ formatDate(item.tanggal_expired ?? "") }}
            </td>
            <td class="border border-gray-300">
              {{ item.serial_number ?? "-" }}
            </td>
            <td class="border border-gray-300">
              <p class="font-bold">
                {{
                  item.zona_gudang.nama_zona_gudang +
                  " - " +
                  item.zona_gudang.kode_zona_gudang
                }}
              </p>
            </td>
            <td class="border border-gray-300">
              <div>
                <p>Aisle</p>

                <p
                  class="font-bold text-end"
                  v-if="item.slot_penyimpanan_aisle"
                >
                  {{
                    item.slot_penyimpanan_aisle.nama_slot_penyimpanan +
                    " - " +
                    item.slot_penyimpanan_aisle.kode_slot_penyimpanan
                  }}
                </p>
                <p v-else class="text-end">-</p>
              </div>
              <div>
                <p>Rack</p>

                <p class="font-bold text-end" v-if="item.slot_penyimpanan_rack">
                  {{
                    item.slot_penyimpanan_rack.nama_slot_penyimpanan +
                    " - " +
                    item.slot_penyimpanan_rack.kode_slot_penyimpanan
                  }}
                </p>
                <p v-else class="text-end">-</p>
              </div>
              <div>
                <p>Level</p>

                <p
                  class="font-bold text-end"
                  v-if="item.slot_penyimpanan_level"
                >
                  {{
                    item.slot_penyimpanan_level.nama_slot_penyimpanan +
                    " - " +
                    item.slot_penyimpanan_level.kode_slot_penyimpanan
                  }}
                </p>
                <p v-else class="text-end">-</p>
              </div>
              <div>
                <p>Bin</p>
                <p class="font-bold text-end" v-if="item.slot_penyimpanan_bin">
                  {{
                    item.slot_penyimpanan_bin.nama_slot_penyimpanan +
                    " - " +
                    item.slot_penyimpanan_bin.kode_slot_penyimpanan
                  }}
                </p>
                <p v-else class="text-end">-</p>
              </div>
            </td>
            <td class="border border-gray-300">
              <p>{{ item.keterangan }}</p>
            </td>
          </tr>
          <tr v-if="!this.self.parameters.form.konversi_stok_detail_jadi">
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
export default {
  props: ["self"],
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },
  },
};
</script>
