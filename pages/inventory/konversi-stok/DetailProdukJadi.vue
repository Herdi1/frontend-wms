<template>
  <div>
    <div class="w-full flex justify-between items-center">
      <h1 class="text-xl font-bold">Detail Produk Jadi</h1>
      <div class=" ">
        <button
          type="button"
          @click="addDetailProdukJadi"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Detail</p>
        </button>
      </div>
    </div>
    <div class="table-responsive overflow-y-hidden mb-7">
      <table
        class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
        :class="
          this.self.parameters.form.konversi_stok_detail_jadi.length
            ? 'mb-[300px]'
            : ''
        "
      >
        <thead>
          <tr class="text-sm uppercase text-nowrap">
            <th class="w-[200px] border border-gray-300">Item</th>
            <th class="w-[200px] border border-gray-300">Quantity</th>
            <th class="w-[200px] border border-gray-300">Zona</th>
            <th class="w-[200px] border border-gray-300">Aisle</th>
            <th class="w-[200px] border border-gray-300">Rack</th>
            <th class="w-[200px] border border-gray-300">Level</th>
            <th class="w-[200px] border border-gray-300">Bin</th>
            <th class="w-[300px] border border-gray-300">Keterangan</th>
            <th class="w-[100px] border border-gray-300">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in this.self.parameters.form
              .konversi_stok_detail_jadi"
            :key="index"
            class="align-top"
          >
            <td class="border border-gray-300 text-center"></td>
            <td class="border border-gray-300 text-center"></td>
            <td class="border border-gray-300 text-center"></td>
            <td class="border border-gray-300 text-center"></td>
            <td class="border border-gray-300 text-center"></td>
            <td class="border border-gray-300 text-center"></td>
            <td class="border border-gray-300 text-center"></td>
            <td class="border border-gray-300 text-center"></td>
            <td class="border border-gray-300 text-center">
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="deleteDetailProdukBahan(index)"
              ></i>
            </td>
          </tr>
          <tr
            v-if="
              !this.self.parameters.form.konversi_stok_detail_jadi.length > 0
            "
          >
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
  </div>
</template>

<script>
export default {
  props: ["self"],

  methods: {
    addDetailProdukJadi() {
      this.self.parameters.form.konversi_stok_detail_jadi.push({
        item_id: "",
        item_pelanggan_id: "",
        item_gudang_id: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle: "",
        slot_penyimpanan_id_rack: "",
        slot_penyimpanan_id_level: "",
        slot_penyimpanan_id_bin: "",
        kode_lokasi_terakhir: "",
        quantity: "",
        valuation_id: "",
        keterangan: "",
      });
    },

    deleteDetailProdukJadi(index) {
      this.self.parameters.form.konversi_stok_detail_jadi =
        this.self.parameters.form.konversi_stok_detail_jadi.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },
  },
};
</script>
