<template>
  <div class="table-responsive overflow-y-hidden mb-7 min-h-[300px]">
    <table
      class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
    >
      <thead>
        <tr class="text-sm uppercase text-nowrap">
          <th class="w-[250px] border border-gray-300">Jenis Biaya</th>
          <!-- <th class="w-[200px] border border-gray-300">Divisi</th> -->
          <th class="w-[200px] flex-1 border border-gray-300">COA</th>
          <th class="w-[200px] border border-gray-300">Quantity</th>
          <!-- <th class="w-[200px] border border-gray-300">Berat</th>
            <th class="w-[200px] border border-gray-300">Volume</th> -->
          <th class="w-[200px] border border-gray-300">Nominal Satuan</th>
          <th class="w-[200px] border border-gray-300">Sub Total</th>
          <th class="w-[300px] border border-gray-300">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.detail_item.biaya_konversi_details"
          :key="i"
          class="align-top"
        >
          <td class="border border-gray-300">
            {{ item.jenis_biaya?.nama_jenis_biaya ?? "" }}
          </td>
          <td class="border border-gray-300">
            {{ item.coa?.kode_coa ?? "" }} - {{ item.coa?.nama_coa ?? "" }}
          </td>
          <td class="border border-gray-300">{{ item.jumlah ?? "-" }}</td>
          <td class="border border-gray-300">
            {{ item.nominal_satuan ?? "-" }}
          </td>
          <td class="border border-gray-300">{{ item.total ?? "-" }}</td>
          <td class="border border-gray-300">{{ item.keterangan ?? "-" }}</td>
        </tr>
        <tr v-if="!this.self.detail_item.biaya_konversi_details">
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
