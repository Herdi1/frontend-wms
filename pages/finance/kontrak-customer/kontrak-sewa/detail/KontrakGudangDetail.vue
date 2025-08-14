<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="w-52 border border-gray-300">Nilai Kontrak</th>
          <th class="w-52 border border-gray-300">Jenis Kontrak</th>
          <th class="w-52 border border-gray-300">Divisi</th>
          <th class="w-52 border border-gray-300">Jenis Biaya</th>
          <th class="w-52 border border-gray-300">Pembayaran</th>
          <th class="w-52 border border-gray-300">Gudang</th>
          <th class="w-52 border border-gray-300">Term Pembayaran</th>
          <th class="w-52 border border-gray-300">Luas</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.detail_sewa.kontrak_sewa_gudang_details"
          :key="i"
        >
          <td class="border border-gray-300">
            {{ item.nilai_kontrak }}
          </td>
          <td class="border border-gray-300">
            {{
              item.jenis_kontrak ? item.jenis_kontrak.nama_jenis_kontrak : "-"
            }}
          </td>
          <td class="border border-gray-300">
            {{ item.divisi ? item.divisi.nama_divisi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.jenis_biaya ? item.jenis_biaya.nama_jenis_biaya : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.pembayaran ? item.pembayaran.nama_pembayaran : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.gudang ? item.gudang.nama_gudang : "-" }}
          </td>
          <td class="border border-gray-300">
            {{
              item.term_pembayaran
                ? item.term_pembayaran.nama_term_pembayaran
                : "-"
            }}
          </td>

          <td class="border border-gray-300">
            {{ item.luas ? item.luas : "-" }}
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
