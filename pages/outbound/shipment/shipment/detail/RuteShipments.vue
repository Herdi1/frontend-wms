<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="w-[200px] border border-gray-300">Lokasi Asal</th>
          <th class="w-[200px] border border-gray-300">Lokasi Tujuan</th>
          <th class="w-[200px] border border-gray-300">Jarak</th>
          <th class="w-[200px] border border-gray-300">
            Waktu Sampai Tujuan (menit)
          </th>
          <th class="w-[200px] border border-gray-300">Biaya Lain-lain</th>
          <th class="w-[200px] border border-gray-300">Jenis Routing</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.detail_shipment.rute_shipments"
          :key="i"
        >
          <td class="border border-gray-300">
            {{ item.lokasi_asal ? item.lokasi_asal.nama_lokasi : "" }}
          </td>
          <td class="border border-gray-300">
            {{ item.lokasi_tujuan ? item.lokasi_tujuan.nama_lokasi : "" }}
          </td>
          <td class="border border-gray-300">
            {{ item.jarak ? item.jarak : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.waktu_sampai_tujuan ? item.waktu_sampai_tujuan : "-" }}
          </td>
          <td class="border border-gray-300 text-right">
            {{ parseFloat(item.total_lain) | formatPrice }}
          </td>
          <td class="border border-gray-300">
            {{ item.jenis_routing ? item.jenis_routing : "-" }}
          </td>
        </tr>
        <tr v-if="self.detail_shipment.rute_shipments.length > 0">
          <td colspan="4" class="border border-gray-300 text-right">
            Grand Total
          </td>
          <td class="border border-gray-300 text-right">
            <p>
              {{ calculateGrandTotal | formatPrice }}
            </p>
          </td>
          <td colspan="3" class="border border-gray-300 text-right"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["self"],

  computed: {
    calculateGrandTotal() {
      let total = 0;
      this.self.detail_shipment.rute_shipments.forEach((item) => {
        total += parseFloat(item.total_lain);
      });

      return total;
    },
  },
};
</script>
