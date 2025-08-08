<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="w-[200px] border border-gray-300">Jenis Biaya</th>
          <th class="w-[200px] border border-gray-300">Lokasi</th>
          <th class="w-[200px] border border-gray-300">Term Pembayaran</th>
          <th class="w-[200px] border border-gray-300">Nominal Satuan</th>
          <th class="w-[200px] border border-gray-300">Jumlah</th>
          <th class="w-[200px] border border-gray-300">Total</th>
          <th class="w-[200px] border border-gray-300">COA</th>
          <th class="w-[200px] border border-gray-300">Divisi</th>
          <th class="w-[200px] border border-gray-300">Vendor</th>
          <th class="w-[200px] border border-gray-300">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.detail_shipment.biaya_lastmiles"
          :key="i"
        >
          <td class="border border-gray-300">
            {{ item.jenis_biaya ? item.jenis_biaya.nama_jenis_biaya : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.lokasi ? item.lokasi.nama_lokasi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{
              item.term_pembayaran
                ? item.term_pembayaran.nama_term_pembayaran
                : "-"
            }}
          </td>
          <td class="border border-gray-300">
            {{ item.nominal_satuan ? item.nominal_satuan : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.jumlah ? item.jumlah : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.total ? item.total : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.coa ? item.coa.nama_coa : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.divisi ? item.divisi.nama_divisi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.vendor ? item.vendor.nama_vendor : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.keterangan ? item.keterangan : "-" }}
          </td>
        </tr>
        <tr v-if="!this.self.detail_shipment.biaya_lastmiles.length > 0">
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
