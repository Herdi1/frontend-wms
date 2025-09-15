<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">
          Detail Approve Pengajuan Dropping
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
                <label class="w-[40%] font-bold">Kode Pengajuan</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.kode_pengajuan ? form.kode_pengajuan : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">No Referensi</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.no_referensi ? form.no_referensi : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Tanggal</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.tanggal ? formatDate(form.tanggal) : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Gudang</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.gudang ? form.gudang.nama_gudang : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Periode Awal</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.periode_awal ? formatDate(form.periode_awal) : "-" }}
                </div>
              </div>
              <div class="flex w-full items-start">
                <label class="w-[40%] font-bold">Periode Akhir</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{
                    form.periode_akhir ? formatDate(form.periode_akhir) : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-start">
                <label class="w-2/5 pt-1">Keterangan</label>
                <textarea
                  disabled
                  name="keterangan"
                  v-model="form.keterangan"
                  class="w-3/5 border border-gray-300 rounded-md bg-gray-50 outline-none p-1 active:outline-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div
          class="my-4 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
            <div class="flex w-full items-start">
              <label class="w-[40%] font-bold">Status Pengajuan</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ form.status_pengajuan ? form.status_pengajuan : "-" }}
              </div>
            </div>
            <div class="flex w-full items-start">
              <label class="w-2/5 pt-1">Catatan</label>
              <textarea
                disabled
                name="catatan"
                v-model="form.catatan"
                class="w-3/5 border border-gray-300 rounded-md bg-gray-50 outline-none p-1 active:outline-none"
              ></textarea>
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
      tabs: [
        {
          name: "Pengajuan Dropping Detail",
          slotName: "PengajuanDroppingDetail",
        },
      ],
      id,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      url: "finance/approve-pengajuan-dropping",
      form: {
        kode_pengajuan: "",
        no_referensi: "",
        gudang_id: "",
        tanggal: "",
        periode_awal: "",
        periode_akhir: "",
        keterangan: "",
        pengajuan_dropping_details: [],
        pengajuan_dropping_biaya_details: [],
        gudang: {},

        plafon_dropping: "",
        total_biaya: "",
        total_saldo_awal: "",
        total_saldo_akhir: "",
        permintaan_dropping: "",

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",

        status_pengajuan: "",
        catatan: "",
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`${this.url}/${this.id}`);
      Object.keys(this.form).forEach((item) => {
        this.form[item] = res.data[item];
      });
      this.form.gudang_id = res.data.gudang;
      this.form.pengajuan_dropping_details =
        res.data.pengajuan_dropping_details.map((item) => {
          return {
            ...item,
            coa: item.coa ? item.coa : "",
          };
        });
      this.form.pengajuan_dropping_biaya_details =
        res.data.pengajuan_dropping_biaya_details.map((item) => {
          return {
            ...item,
            coa: item.coa ? item.coa : "",
          };
        });
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
