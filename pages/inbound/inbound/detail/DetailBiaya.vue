<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="border border-gray-300 w-48">Item</th>
          <th class="border border-gray-300 w-48">Vendor</th>
          <th class="border border-gray-300 w-48">Divisi</th>
          <th class="border border-gray-300 w-48">Jenis Biaya</th>
          <th class="border border-gray-300 w-48">Dasar Perhitungan</th>
          <th class="border border-gray-300 w-48">Nominal Satuan</th>
          <th class="border border-gray-300 w-48">Jumlah</th>
          <th class="border border-gray-300 w-48">Berat</th>
          <th class="border border-gray-300 w-48">Volume</th>
          <th class="border border-gray-300 w-48">Total</th>
          <th class="border border-gray-300 w-48">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in self.form.biaya_inbounds"
          :key="i"
          class="align-top"
        >
          <td class="border border-gray-300">
            {{ item.item_gudang ? item.item_gudang.kode_item : "-" }} -
            {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.vendor ? item.vendor.nama_vendor : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.divisi ? item.divisi.nama_divisi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.jenis_biaya ? item.jenis_biaya.nama_jenis_biaya : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.dasar_perhitungan ? item.dasar_perhitungan : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.nominal_satuan ? item.nominal_satuan : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.jumlah ? item.jumlah : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.berat ? item.berat : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.volume ? item.volume : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.total ? item.total : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.keterangan ? item.keterangan : "-" }}
          </td>
        </tr>
        <tr v-if="!self.form.biaya_inbounds.length > 0">
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
