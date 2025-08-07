<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="w-[200px] border border-gray-300">Lokasi Asal</th>
          <th class="w-[200px] border border-gray-300">Lokasi Tujuan</th>
          <th class="w-[200px] border border-gray-300">Jarak</th>
          <th class="w-[200px] border border-gray-300">Biaya BBM</th>
          <th class="w-[200px] border border-gray-300">
            Waktu Sampai Tujuan (menit)
          </th>
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
            {{ item.biaya_bbm ? item.biaya_bbm : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.waktu_sampai_tujuan ? item.waktu_sampai_tujuan : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.jenis_routing ? item.jenis_routing : "-" }}
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
