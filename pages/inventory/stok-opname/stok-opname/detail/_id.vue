<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">
          Detail Permohonan Stok Opname
        </h1>

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
              <label class="w-[40%] font-bold">Kode Stok Opname</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_opname.kode_stok_opname
                    ? this.detail_opname.kode_stok_opname
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Tanggal</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_opname.tanggal ? this.detail_opname.tanggal : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Gudang</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_opname.gudang
                    ? this.detail_opname.gudang.nama_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Keterangan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_opname.keterangan
                    ? this.detail_opname.keterangan
                    : "-"
                }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <tab-component :tabs="tabs">
            <template #DetailOpname>
              <div class="table-responsive overflow-y-hidden mb-7">
                <table
                  class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                >
                  <thead>
                    <tr class="text-sm uppercase">
                      <th class="w-[200px] border border-gray-300">
                        Item Gudang <span class="text-danger">*</span>
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Zona <span class="text-danger">*</span>
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Valuation <span class="text-danger">*</span>
                      </th>

                      <th class="w-[200px] border border-gray-300">
                        Lokasi Aisle
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Lokasi Rack
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Lokasi Level
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Lokasi Bin
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Stok Sistem <span class="text-danger">*</span>
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Stok Real <span class="text-danger">*</span>
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Stok Selisih <span class="text-danger">*</span>
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in detail_opname.stok_opname_details"
                      :key="i"
                    >
                      <td class="border border-gray-300">
                        {{ item.item_gudang.nama_item }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.zona_gudang.nama_zona_gudang }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.valuation.nama_valuation }}
                      </td>
                      <td class="border border-gray-300">
                        {{
                          item.slot_penyimpanan_aisle
                            ? item.slot_penyimpanan_aisle.nama_slot_penyimpanan
                            : "-"
                        }}
                      </td>
                      <td class="border border-gray-300">
                        {{
                          item.slot_penyimpanan_rack
                            ? item.slot_penyimpanan_rack.nama_slot_penyimpanan
                            : "-"
                        }}
                      </td>
                      <td class="border border-gray-300">
                        {{
                          item.slot_penyimpanan_level
                            ? item.slot_penyimpanan_level.nama_slot_penyimpanan
                            : "-"
                        }}
                      </td>
                      <td class="border border-gray-300">
                        {{
                          item.slot_penyimpanan_bin
                            ? item.slot_penyimpanan_bin.nama_slot_penyimpanan
                            : "-"
                        }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.stok_sistem ? item.stok_sistem : "-" }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.stok_real ? item.stok_real : "-" }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.stok_selisih ? item.stok_selisih : "-" }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.keterangan ? item.keterangan : "-" }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
            <template #HistoryOpname>
              <div class="table-responsive overflow-y-hidden mb-7">
                <table
                  class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                >
                  <thead>
                    <tr class="text-sm uppercase">
                      <th class="w-[200px] border border-gray-300">Status</th>
                      <th class="w-[200px] border border-gray-300">Tanggal</th>
                      <th class="w-[200px] border border-gray-300">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 text-center">
                        <span class="p-1 rounded-md text-white bg-orange-500">
                          Menunggu
                        </span>
                      </td>
                      <td class="border border-gray-300 text-center">
                        {{ detail_opname.tanggal }}
                      </td>
                      <td class="border border-gray-300 text-center">
                        {{ detail_opname.user_input.nama_lengkap }}
                      </td>
                    </tr>
                    <tr v-if="detail_opname.user_proses">
                      <td class="border border-gray-300 text-center">
                        <span class="p-1 rounded-md text-white bg-purple-500">
                          Proses
                        </span>
                      </td>
                      <td class="border border-gray-300 text-center">
                        {{ detail_opname.tanggal_proses }}
                      </td>
                      <td class="border border-gray-300 text-center">
                        {{ detail_opname.user_proses.nama_lengkap }}
                      </td>
                    </tr>
                    <tr v-if="detail_opname.user_selesai">
                      <td class="border border-gray-300 text-center">
                        <span class="p-1 rounded-md text-white bg-blue-500">
                          Selesai
                        </span>
                      </td>
                      <td class="border border-gray-300 text-center">
                        {{ detail_opname.tanggal_selesai }}
                      </td>
                      <td class="border border-gray-300 text-center">
                        {{ detail_opname.user_selesai.nama_lengkap }}
                      </td>
                    </tr>
                    <tr v-if="detail_opname.user_adjustment">
                      <td class="border border-gray-300 text-center">
                        <span class="p-1 rounded-md text-white bg-green-500">
                          Adjusted
                        </span>
                      </td>
                      <td class="border border-gray-300 text-center">
                        {{ detail_opname.tanggal_adjustment }}
                      </td>
                      <td class="border border-gray-300 text-center">
                        {{ detail_opname.user_adjustment.nama_lengkap }}
                      </td>
                    </tr>
                    <tr v-if="detail_opname.user_batal">
                      <td class="border border-gray-300 text-center">
                        <span class="p-1 rounded-md text-white bg-red-500">
                          Batal
                        </span>
                      </td>
                      <td class="border border-gray-300 text-center">
                        {{ detail_opname.tanggal_batal }}
                      </td>
                      <td class="border border-gray-300 text-center">
                        {{ detail_opname.user_batal.nama_lengkap }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </tab-component>
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

      tabs: [
        { name: "Detail Stok Opname", slotName: "DetailOpname" },
        { name: "Riwayat Status Opname", slotName: "HistoryOpname" },
      ],

      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_opname: {
        kode_stok_opname: "",
        tanggal: "",
        gudang_id: "",
        keterangan: "",
        status_opname: "",
        status_adjustment: "",
        catatan_proses: "",
        catatan_selesai: "",
        catatan_batal: "",
        catatan_adjustment: "",
        stok_opname_details: [],
        gudang: {},

        user_input: {},
        user_proses: {},
        user_selesai: {},
        user_adjustment: {},
        user_batal: {},
        tanggal_proses: "",
        tanggal_selesai: "",
        tanggal_adjustment: "",
        tanggal_batal: "",
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`inventory/stok-opname/${this.id}`);
      Object.keys(this.detail_opname).forEach((item) => {
        this.detail_opname[item] = res.data[item];
      });
      this.detail_opname.gudang = res.data.gudang;
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
    }
  },
};
</script>
