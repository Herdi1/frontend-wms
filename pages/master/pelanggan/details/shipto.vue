<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="w-52 border border-gray-300">Kode Lokasi</th>
          <th class="w-52 border border-gray-300">Nama Lokasi</th>
          <th class="w-52 border border-gray-300">Kode Pos</th>
          <th class="w-52 border border-gray-300">Kecamatan</th>
          <th class="w-52 border border-gray-300">Kota</th>
          <th class="w-52 border border-gray-300">Provinsi</th>
          <th class="w-52 border border-gray-300">Negara</th>
          <th class="w-52 border border-gray-300">Nama Pemilik</th>
          <th class="w-52 border border-gray-300">Tipe Lokasi</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.detail_item.lokasi_pelanggans"
          :key="i"
          class="align-top"
        >
          <td class="border border-gray-300">
            {{ item.kode_lokasi ? item.kode_lokasi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.nama_lokasi ? item.nama_lokasi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.kode_pos ? item.kode_pos.nama_kode_pos : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.kecamatan ? item.kecamatan.nama_kecamatan : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.kota ? item.kota.nama_kota : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.provinsi ? item.provinsi.nama_provinsi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.negara ? item.negara.nama_negara : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.nama_pemilik ? item.nama_pemilik : "-" }}
          </td>
          <td class="border border-gray-300">
            {{
              item.tipe_lokasi === "T"
                ? "Toko"
                : item.tipe_lokasi === "P"
                ? "Project"
                : item.tipe_lokasi === "V"
                ? "Vendor"
                : item.tipe_lokasi === "G"
                ? "Gudang"
                : ""
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["self"],

  // data() {
  //   return {
  //     isStopSearchLokasi: false,
  //     isLoadingGetLokasi: false,
  //     lokasi_search: "",
  //   };
  // },

  // async mounted() {
  //   await this.lookUp({
  //     url: "master/lokasi/get-lokasi",
  //     lookup: "custom10",
  //   });
  //   console.log(this.lookup_custom10);
  // },

  // computed: {
  //   ...mapState("moduleApi", ["data", "error", "result", "lookup_custom10"]),
  // },
};
</script>
