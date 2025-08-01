<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="w-52 border border-gray-300">Jenis Kendaraan</th>
          <th class="w-52 border border-gray-300">Gudang</th>
          <th class="w-52 border border-gray-300">Vendor</th>
          <th class="w-52 border border-gray-300">Nama Kendaraan</th>
          <th class="w-52 border border-gray-300">Kode Kendaraan</th>
          <th class="w-52 border border-gray-300">Plat Nomor</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.detail_item.kendaraan_gudang"
          :key="i"
          class="align-top"
        >
          <td class="border border-gray-300">
            {{
              item.jenis_kendaraan
                ? item.jenis_kendaraan.nama_jenis_kendaraan
                : "-"
            }}
          </td>
          <td class="border border-gray-300">
            {{ item.gudang ? item.gudang.nama_gudang : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.vendor ? item.vendor.nama_vendor : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.nama_kendaraan ? item.nama_kendaraan : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.kode_kendaraan ? item.kode_kendaraan : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.plat_nomor ? item.plat_nomor : "-" }}
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
