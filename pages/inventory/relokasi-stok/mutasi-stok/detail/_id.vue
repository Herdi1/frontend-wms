<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Relokasi Stok</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <div class="w-full">
        <div
          class="mb-3 p-4 w-full space-y-2 bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <div class="flex w-full items-center">
            <label class="w-[40%] font-bold">Tanggal</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{ this.form.tanggal ? this.form.tanggal : "-" }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%] font-bold">Gudang</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{ this.form.gudang_id ? this.form.gudang_id.nama_gudang : "-" }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%] font-bold">Keterangan</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{ this.form.keterangan ? this.form.keterangan : "-" }}
            </div>
          </div>
        </div>

        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <h1 class="text-xl font-bold uppercase">Detail Mutasi Stok</h1>
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
      form: {
        gudang_id: "",
        no_transaksi: "",
        tanggal: "",
        mutasi_stok_details: [],
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`inventory/mutasi-stok/${this.id}`);
      Object.keys(this.form).forEach((item) => {
        this.form[item] = res.data[item];
      });
      this.form.gudang_id = res.data.gudang;
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
    }
  },
};
</script>
