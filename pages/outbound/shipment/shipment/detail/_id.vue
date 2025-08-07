<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Shipment</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <div class="w-full">
        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full"
          ></div>
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
      detail_shipment: {
        kode_shipment: "",
        staff_id: "",
        gudang_id: "",
        tanggal: "",
        kendaraan_id: "",
        jenis_kendaraan_id: "",
        pengemudi_id: "",
        keterangan: "",
        no_referensi: "",
        status_muat: "",
        catatan_muat: "",

        shipment_details: [],
        rute_shipments: [],
        biaya_lastmiles: [],

        staff: {},
        gudang: {},
        kendaraan: {},
        jenis_kendaraan: {},
        pengemudi: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`outbound/shipment/${this.id}`);
      Object.keys(this.detail_shipment).forEach((item) => {
        if (
          item != "shipment_details" &&
          item != "rute_shipments" &&
          item != "biaya_lastmiles"
        ) {
          this.detail_shipment[item] = res.data[item];
        }
      });
      this.detail_shipment.shipment_details = res.data.shipment_details
        ? res.data.shipment_details
        : [];
      this.detail_shipment.rute_shipments = res.data.rute_shipments
        ? res.data.rute_shipments
        : [];
      this.detail_shipment.biaya_lastmiles = res.data.biaya_lastmiles
        ? res.data.biaya_lastmiles
        : [];
      this.isLoadingPage = false;
      // console.log("data", this.detail_shipment);
    } catch (error) {
      this.$router.back();
    }
  },
};
</script>
