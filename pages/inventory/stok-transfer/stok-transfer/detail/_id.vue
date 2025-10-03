<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Permintaan Stok</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <div class="w-full">
        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Kode Stok Transfer</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_permintaan_stok.kode_stok_transfer
                    ? this.detail_permintaan_stok.kode_stok_transfer
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Tanggal</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_permintaan_stok.tanggal
                    ? this.detail_permintaan_stok.tanggal
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Tanggal Request Kirim</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_permintaan_stok.tanggal_request_kirim
                    ? this.detail_permintaan_stok.tanggal_request_kirim
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Gudang Pengirim</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_permintaan_stok.gudang_pengirim
                    ? this.detail_permintaan_stok.gudang_pengirim.nama_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Gudang Penerima</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_permintaan_stok.gudang
                    ? this.detail_permintaan_stok.gudang.nama_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Keterangan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_permintaan_stok.keterangan
                    ? this.detail_permintaan_stok.keterangan
                    : "-"
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="mt-7">
          <h1 class="text-xl font-bold uppercase">Detail Permintaan Stok</h1>
        </div>
        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <div class="table-responsive overflow-y-hidden mb-7">
            <table
              class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
            >
              <thead>
                <tr class="text-sm uppercase">
                  <th class="w-60 border border-gray-300">Item</th>
                  <th class="w-60 border border-gray-300">Valuation</th>
                  <th class="w-60 border border-gray-300">Quantity</th>
                  <th class="w-60 border border-gray-300">keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(
                    item, i
                  ) in detail_permintaan_stok.stok_transfer_details"
                  :key="i"
                >
                  <td class="border border-gray-300">
                    {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.valuation ? item.valuation.nama_valuation : "-" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.quantity ? item.quantity : "-" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.keterangan ? item.keterangan : "-" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_permintaan_stok: {
        kode_stok_transfer: "",
        tanggal: "",
        tanggal_request_kirim: "",
        no_referensi: "",
        gudang_id: "",
        gudang_id_pengirim: "",
        status_approve: "0",
        keterangan: "",
        stok_transfer_details: [],

        gudang: {},
        gudang_pengirim: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`inventory/stok-transfer/${this.id}`);
      Object.keys(this.detail_permintaan_stok).forEach((item) => {
        if (item != "stok_transfer_details") {
          this.detail_permintaan_stok[item] = res.data[item];
        }
      });
      this.detail_permintaan_stok.stok_transfer_details =
        res.data.stok_transfer_details;
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
    }
  },
};
</script>
