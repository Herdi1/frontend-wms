<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Kontrak TKBM</h1>

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
              <label class="w-[40%]">Kode Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_sewa.kode_kontrak
                    ? this.detail_sewa.kode_kontrak
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Pelanggan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_sewa.pelanggan
                    ? this.detail_sewa.pelanggan.nama_pelanggan
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Jenis Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_sewa.jenis_kontrak
                    ? this.detail_sewa.jenis_kontrak.nama_jenis_kontrak
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Status Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_sewa.status_kontrak
                    ? this.detail_sewa.status_kontrak
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_sewa.tanggal_kontrak
                    ? this.detail_sewa.tanggal_kontrak
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal Berlaku</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_sewa.tanggal_berlaku
                    ? this.detail_sewa.tanggal_berlaku
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal Berhenti</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_sewa.tanggal_berhenti
                    ? this.detail_sewa.tanggal_berhenti
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">No Referensi</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_sewa.no_referensi
                    ? this.detail_sewa.no_referensi
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Keterangan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_sewa.keterangan
                    ? this.detail_sewa.keterangan
                    : "-"
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-7">
        <tab-component :tabs="tabs">
          <template #KontrakGudang
            ><KontrakGudangDetail :self="{ detail_sewa }"
          /></template>
          <template #KontrakPeralatan>
            <KontrakPeralatanDetail :self="{ detail_sewa }" />
          </template>
        </tab-component>
      </div>
    </div>
  </section>
</template>

<script>
import KontrakGudangDetail from "./KontrakGudangDetail.vue";
import KontrakPeralatanDetail from "./KontrakPeralatanDetail.vue";
export default {
  props: ["self"],

  components: {
    KontrakGudangDetail,
    KontrakPeralatanDetail,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      tabs: [
        { name: "Kontrak Gudang", slotName: "KontrakGudang" },
        { name: "Kontrak Peralatan", slotName: "KontrakPeralatan" },
      ],

      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_sewa: {
        no_referensi: "",
        gudang_id: "",
        vendor_id: "",
        user_id_pic: "",
        tanggal_kontrak: "",
        tanggal_berlaku: "",
        tanggal_berhenti: "",
        status_kontrak: "",
        jenis_kontrak_id: "",
        keterangan: "",
        kontrak_sewa_gudang_details: [],
        kontrak_sewa_peralatan_details: [],
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(
        `finance/kontrak-sewa-pelanggan/${this.id}`
      );
      Object.keys(this.detail_sewa).forEach((item) => {
        if (item != "kontrak_sewa_pelanggan_details") {
          this.detail_sewa[item] = res.data[item];
        }
      });
      this.detail_sewa.kontrak_sewa_pelanggan_details =
        res.data.kontrak_sewa_pelanggan_details;
      this.isLoadingPage = false;
      console.log(this.detail_sewa);
    } catch (error) {
      this.$router.back();
    }
  },
};
</script>
