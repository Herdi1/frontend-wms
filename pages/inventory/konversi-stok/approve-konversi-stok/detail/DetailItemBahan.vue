<template>
  <div class="table-responsive overflow-y-hidden mb-7 min-h-[300px]">
    <table
      class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
    >
      <thead>
        <tr class="text-sm uppercase text-nowrap">
          <th class="w-[200px] border border-gray-300">Item</th>
          <th class="w-[200px] border border-gray-300">Quantity</th>
          <th class="w-[200px] border border-gray-300">Zona</th>
          <!-- <th class="w-[200px] border border-gray-300">Lokasi Penyimpanan</th> -->

          <!-- <th class="w-[200px] border border-gray-300">Aisle</th>
          <th class="w-[200px] border border-gray-300">Rack</th>
          <th class="w-[200px] border border-gray-300">Level</th>
          <th class="w-[200px] border border-gray-300">Bin</th> -->
          <th class="w-[300px] border border-gray-300">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in this.self.detail_item
            .konversi_stok_detail_bahan"
          :key="index"
          class="align-top"
        >
          <td class="border border-gray-300 text-center">
            <p class="font-bold">
              {{ item.item_gudang.nama_item }}
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
            <p class="font-bold">
              {{
                item.zona_gudang.nama_zona_gudang +
                " - " +
                item.zona_gudang.kode_zona_gudang
              }}
            </p>
          </td>
          <!-- <td class="border border-gray-300">
            <div>
              <p>Aisle</p>

              <p class="font-bold text-end" v-if="item.slot_penyimpanan_aisle">
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

              <p class="font-bold text-end" v-if="item.slot_penyimpanan_level">
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
          </td> -->
          <td class="border border-gray-300">
            <p>{{ item.keterangan }}</p>
          </td>
        </tr>
        <tr v-if="!this.self.detail_item.konversi_stok_detail_bahan">
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

<script>
export default {
  props: ["self"],
};
</script>
