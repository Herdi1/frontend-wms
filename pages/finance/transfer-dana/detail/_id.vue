<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Transfer Dana</h1>

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
              <label class="w-[40%] font-bold">Kode Transfer Dana</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  this.form.kode_transfer_dana
                    ? this.form.kode_transfer_dana
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Tanggal</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ this.form.tanggal ? formatDate(this.form.tanggal) : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">COA</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  this.form.coa
                    ? this.form.coa.kode_coa + " - " + this.form.coa.nama_coa
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">No Referensi</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ this.form.no_referensi ? this.form.no_referensi : "-" }}
              </div>
            </div>
            <div class="flex justify-between w-full">
              <label for="" class="w-[40%]">Keterangan</label>
              <textarea
                disabled
                name="keterangan"
                v-model="form.keterangan"
                class="w-[60%] border border-gray-300 rounded-md bg-gray-50 outline-none p-1 active:outline-none"
              ></textarea>
            </div>
          </div>
        </div>
        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <div class="w-full flex justify-between items-center">
            <h1 class="text-xl font-bold uppercase">Transfer Dana Detail</h1>
          </div>
          <div class="table-responsive w-full relative overflow-y-auto">
            <table
              class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
              :class="form.transfer_dana_details.length ? 'mb-20' : ''"
            >
              <thead>
                <tr class="text-sm uppercase">
                  <th class="w-[250px] border border-gray-300">COA</th>
                  <th class="w-[200px] border border-gray-300">Gudang</th>
                  <th class="w-[200px] border border-gray-300">Nominal</th>
                  <th class="w-[200px] border border-gray-300">No Referensi</th>
                  <th class="w-[200px] border border-gray-300">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in form.transfer_dana_details" :key="i">
                  <td class="border border-gray-300">
                    {{
                      item.coa
                        ? item.coa.kode_coa + " - " + item.coa.nama_coa
                        : "-"
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.gudang ? item.gudang.nama_gudang : "-" }}
                  </td>
                  <td class="border border-gray-300 text-right">
                    {{ parseFloat(item.nominal ?? 0) | formatPrice }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.no_referensi }}
                  </td>
                  <td class="border border-gray-300">{{ item.keterangan }}</td>
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
      form: {},
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`finance/transfer-dana/${this.id}`);
      this.form = res.data;
      this.isLoadingPage = false;
    } catch (error) {
      console.log(error);
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
