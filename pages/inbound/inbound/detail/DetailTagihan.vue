<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="w-48 border border-gray-300">Item</th>
          <th class="w-48 border border-gray-300">Divisi</th>
          <th class="w-48 border border-gray-300">Pelanggan</th>
          <th class="w-48 border border-gray-300">Jenis Biaya</th>
          <th class="w-48 border border-gray-300">Dasar Perhitungan</th>
          <th class="w-48 border border-gray-300">Nominal Satuan</th>
          <th class="w-48 border border-gray-300">Jumlah</th>
          <th class="w-48 border border-gray-300">Berat</th>
          <th class="w-48 border border-gray-300">Volume</th>
          <th class="w-48 border border-gray-300">Total</th>
          <th class="w-48 border border-gray-300">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in self.form.tagihan_inbounds"
          :key="i"
          class="align-top"
        >
          <td class="border border-gray-300">
            {{ item.item_gudang ? item.item_gudang.kode_item : "-" }} -
            {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.divisi ? item.divisi.nama_divisi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.pelanggan ? item.pelanggan.nama_pelanggan : "-" }}
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
        <tr v-if="!self.form.tagihan_inbounds.length > 0">
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
