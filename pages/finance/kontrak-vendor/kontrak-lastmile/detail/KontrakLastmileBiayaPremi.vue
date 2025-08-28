<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="w-60 border border-gray-300">Jenis Kontrak</th>
          <th class="w-60 border border-gray-300">Divisi</th>
          <th class="w-60 border border-gray-300">Jenis Biaya</th>
          <th class="w-60 border border-gray-300">Gudang</th>
          <th class="w-60 border border-gray-300">Mata Uang</th>
          <th class="w-60 border border-gray-300">Pembayaran</th>
          <th class="w-60 border border-gray-300">Term Pembayaran</th>
          <th class="w-60 border border-gray-300">Payable To</th>
          <th class="w-60 border border-gray-300">Group Item</th>
          <th class="w-60 border border-gray-300">Item Gudang</th>
          <th class="w-60 border border-gray-300">Nilai Kontrak</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.detail_lastmile
            .kontrak_lastmile_premi_details"
          :key="i"
        >
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
            {{ item.gudang ? item.gudang.nama_gudang : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.mata_uang ? item.mata_uang.nama_mata_uang : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.pembayaran ? item.pembayaran.nama_pembayaran : "-" }}
          </td>
          <td class="border border-gray-300">
            {{
              item.term_pembayaran
                ? item.term_pembayaran.nama_term_pembayaran
                : "-"
            }}
          </td>
          <td class="border border-gray-300">
            {{ item.payable_to ? item.payable_to : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.group_item ? item.group_item.nama_group_item : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
          </td>

          <td class="border border-gray-300 text-right">
            {{ item.nilai_kontrak ? item.nilai_kontrak : 0 | formatPrice }}
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
