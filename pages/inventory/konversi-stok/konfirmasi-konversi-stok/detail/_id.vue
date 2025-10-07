<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">Detail Konversi Stok</h1>

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
                <label class="w-[40%] font-bold" for="fullname"
                  >Alasan Konversi</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.alasan_beda_plan
                      ? this.detail_item.alasan_beda_plan.nama_alasan_beda_plan
                      : "-"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname">Staff</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.staff
                      ? this.detail_item.staff.nama_lengkap
                      : "-"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname">Vendor</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.staff.vendor_operator
                      ? this.detail_item.staff.vendor_operator.nama_vendor
                      : "-"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname"
                  >Status Konfirmasi</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.status_konversi ?? "-" }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Keterangan</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.keterangan || "-" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <table-data-loading-section :self="this" /> -->
        <tab-component :tabs="tabs" class="border border-gray-300">
          <template #DetailProdukBahan>
            <DetailItemBahan :self="{ detail_item }" />
          </template>
          <template #DetailProdukJadi>
            <DetailItemJadi :self="{ detail_item }" />
          </template>
        </tab-component>
      </div>
    </div>
  </section>
</template>

<script>
import DetailItemBahan from "./DetailItemBahan.vue";
import DetailItemJadi from "./DetailItemJadi.vue";

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
        staff: {},
        vendor: {},
        status_konversi: "",
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

  components: {
    DetailItemBahan,
    DetailItemJadi,
  },

  async mounted() {
    await this.fetchDetail();
  },

  async created() {},

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
        if (response.data.konversi_stok_detail_jadis) {
          this.detail_item.konversi_stok_detail_jadi =
            response.data.konversi_stok_detail_jadis.map((item) => {
              return {
                ...item,
              };
            });
        }

        this.isLoadingPage = false;
      } catch (error) {
        console.log(error);
        this.$router.push("/inventory/konversi-stok/permohonan-konversi-stok");
      }
    },
  },
};
</script>
