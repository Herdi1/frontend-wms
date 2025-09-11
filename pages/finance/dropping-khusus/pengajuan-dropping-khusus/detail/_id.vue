<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">
          Detail Pengajuan Dropping Khusus
        </h1>

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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
              <div class="flex w-full items-center">
                <label class="w-1/2">Kode Pengajuan</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                >
                  {{ form.kode_pengajuan ? form.kode_pengajuan : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-1/2">Tanggal</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                >
                  {{ form.tanggal ? formatDate(form.tanggal) : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-1/2">Gudang</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                >
                  {{ form.gudang_id ? form.gudang_id.nama_gudang : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-1/2">Plafon Dropping</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                >
                  {{ form.plafon_dropping | formatPrice }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-1/2">Permintaan Dropping</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                >
                  {{ form.permintaan_dropping | formatPrice }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-1/2">No Referensi</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                >
                  {{ form.no_referensi ? form.no_referensi : "-" }}
                </div>
              </div>
              <div class="flex w-full items-start">
                <label class="w-1/2">Keterangan</label>
                <textarea
                  disabled
                  name="keterangan"
                  v-model="form.keterangan"
                  class="w-1/2 border border-gray-300 rounded-md bg-gray-50 outline-none p-1 active:outline-none"
                ></textarea>
              </div>
            </div>
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
      url: "finance/pengajuan-dropping-khusus",
      form: {
        kode_pengajuan: "",
        gudang_id: "",
        keterangan: "",
        file_name_lampiran: "",
        tanggal: "",
        plafon_dropping: "",
        permintaan_dropping: "",
        no_referensi: "",
        gudang: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`${this.url}/${this.id}`);
      Object.keys(this.form).forEach((item) => {
        this.form[item] = res.data[item];
      });
      this.form.gudang = res.data.gudang;
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
    }
  },

  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },
  },
};
</script>
