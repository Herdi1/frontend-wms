<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">Detail Gudang</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <div class="w-full">
        <div class="w-full md:flex gap-3">
          <div
            class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
          >
            <div
              class="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-3 items-top w-full mb-5"
            >
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Kode Konversi Stok</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.kode_konversi_stok }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname">Tanggal</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.tanggal }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname"
                  >Tanggal Mulai</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.tanggal_mulai }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname"
                  >Tanggal Selesai</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.tanggal_selesai }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname">Gudang</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.gudang
                      ? this.detail_item.gudang.nama_gudang
                      : "-"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Keterangan</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.keterangan }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <table-data-loading-section :self="this" /> -->
        <tab-component :tabs="tabs">
          <template #DetailProdukBahan>
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                :class="
                  this.detail_item.konversi_stok_detail_bahan.length
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
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in this.detail_item
                      .konversi_stok_detail_bahan"
                    :key="index"
                    class="align-top"
                  >
                    <td class="border border-gray-300 text-center">
                      <p class="font-bold text-base">
                        {{ item.item_gudang.nama_item }}
                      </p>
                    </td>
                    <td class="border border-gray-300 text-start">
                      <p class="font-bold text-base">
                        {{ parseFloat(item.quantity) }} <span></span>
                      </p>
                    </td>
                    <td class="border border-gray-300">
                      <p class="font-bold text-base">
                        {{ item.zona_gudang.nama_zona }}
                      </p>
                    </td>
                    <td class="border border-gray-300">
                      <p class="font-bold text-base">
                        {{
                          item.slot_penyimpanan_aisle.nama_slot_penyimpanan +
                          " - " +
                          item.slot_penyimpanan_aisle.kode_slot_penyimpanan
                        }}
                      </p>
                    </td>
                    <td class="border border-gray-300">
                      <p class="font-bold text-base">
                        {{
                          item.slot_penyimpanan_rack.nama_slot_penyimpanan +
                          " - " +
                          item.slot_penyimpanan_rack.kode_slot_penyimpanan
                        }}
                      </p>
                    </td>
                    <td class="border border-gray-300">
                      <p class="font-bold text-base">
                        {{
                          item.slot_penyimpanan_level.nama_slot_penyimpanan +
                          " - " +
                          item.slot_penyimpanan_level.kode_slot_penyimpanan
                        }}
                      </p>
                    </td>
                    <td class="border border-gray-300">
                      <p class="font-bold text-base">
                        {{
                          item.slot_penyimpanan_bin.nama_slot_penyimpanan +
                          " - " +
                          item.slot_penyimpanan_bin.kode_slot_penyimpanan
                        }}
                      </p>
                    </td>
                    <td class="border border-gray-300">
                      <p>{{ item.keterangan }}</p>
                    </td>
                  </tr>
                  <tr
                    v-if="
                      !this.detail_item.konversi_stok_detail_bahan.length > 0
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
          </template>
          <template #DetailProdukJadi> </template>
        </tab-component>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      tabs: [
        { name: "DETAIL PRODUK BAHAN", slotName: "DetailProdukBahan" },
        { name: "DETAIL PRODUK JADI", slotName: "DetailProdukJadi" },
      ],

      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_item: {
        kode_konversi_stok: "",
        tanggal: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        lama_pengerjaan: "",
        gudang: {},
        status_approve: "",
        keterangan: "",
        konversi_stok_detail_bahan: [],
        konversi_stok_detail_jadi: [],
      },
      form: {
        item_id: "",
      },
    };
  },

  async mounted() {},

  async created() {
    await this.fetchDetail();
  },

  methods: {
    async fetchDetail() {
      try {
        let response = await this.$axios.get(
          "inventory/konversi-stok/" + this.id
        );
        Object.keys(this.detail_item).forEach((item) => {
          this.detail_item[item] = response.data[item];
        });

        if (response.data.konversi_stok_detail_bahans) {
          this.detail_item.konversi_stok_detail_bahan =
            response.data.konversi_stok_detail_bahans.map((item) => {
              return {
                ...item,
              };
            });
        }
        if (response.data.detail_konversi_stok_jadis) {
          this.detail_item.detail_konversi_stok_jadi =
            response.data.detail_konversi_stok_jadis.map((item) => {
              return {
                ...item,
              };
            });
        }

        console.log(response.data);
        console.log(this.detail_item);

        this.isLoadingPage = false;
      } catch (error) {
        console.log(error);
        this.$router.push("/inventory/konversi-stok/permohonan-konversi-stok");
      }
    },
  },
};
</script>
