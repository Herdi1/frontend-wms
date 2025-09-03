<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Posting TKBM</h1>

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
              <label class="w-[40%]">Kode Posting</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.kode_posting ? this.form.kode_posting : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ formatDate(this.form.tanggal) }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Periode Awal</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ formatDate(this.form.periode_awal) }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Periode Akhir</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ formatDate(this.form.periode_akhir) }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kode Referensi</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.kode_referensi ? this.form.kode_referensi : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Jenis</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.jenis ? this.form.jenis : "-" }}
              </div>
            </div>

            <div class="flex w-full items-center">
              <label class="w-[40%]">Gudang</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.gudang ? this.form.gudang.nama_gudang : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Akun Master</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.coa ? this.form.coa.kode_coa : "-" }} -
                {{ this.form.coa ? this.form.coa.nama_coa : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Akun Biaya</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.coa_biaya ? this.form.coa_biaya.kode_coa : "-" }} -
                {{ this.form.coa_biaya ? this.form.coa_biaya.nama_coa : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Divisi</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.divisi ? this.form.divisi.nama_divisi : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Pelanggan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.form.pelanggan ? this.form.pelanggan.nama_pelanggan : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Keterangan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.keterangan ? this.form.keterangan : "-" }}
              </div>
            </div>
          </div>
          <div class="w-full flex justify-between items-center mt-10">
            <h1 class="text-lg font-bold uppercase">Detail Posting TKBM</h1>
          </div>
          <div class="table-responsive mb-7">
            <table
              class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
            >
              <thead>
                <tr class="uppercase">
                  <th
                    class="w-48 border border-gray-300"
                    v-if="this.form.jenis === 'INBOUND'"
                  >
                    Kode Inbound
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="this.form.jenis === 'OUTBOUND'"
                  >
                    Kode Pick Order
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="this.form.jenis === 'OUTBOUND'"
                  >
                    Lokasi
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="this.form.jenis === 'INBOUND'"
                  >
                    Supplier
                  </th>
                  <th class="w-48 border border-gray-300">Nama Item</th>

                  <th class="w-48 border border-gray-300">Valuation</th>
                  <th class="w-48 border border-gray-300">Quantity</th>
                  <th class="w-48 border border-gray-300">Total TKBM</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in form.posting_tkbm_details" :key="i">
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'INBOUND'"
                  >
                    {{ item.inbound ? item.inbound.kode_inbound : "-" }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'OUTBOUND'"
                  >
                    {{
                      item.pick_order ? item.pick_order.kode_pick_order : "-"
                    }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'OUTBOUND'"
                  >
                    {{ item.lokasi ? item.lokasi.nama_lokasi : "-" }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'INBOUND'"
                  >
                    {{ item.supplier ? item.supplier.nama_supplier : "-" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.item_gudang ? item.item_gudang.kode_item : "-" }}
                    -
                    {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.valuation ? item.valuation.kode_valuation : "-" }}
                    -
                    {{ item.valuation ? item.valuation.nama_valuation : "-" }}
                  </td>
                  <td class="border border-gray-300">
                    <p class="text-right">
                      {{ item.quantity ? item.quantity : "-" }}
                    </p>
                  </td>
                  <td class="border border-gray-300">
                    <p class="text-right">
                      {{ item.total_tkbm ? item.total_tkbm : "0.00" }}
                    </p>
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
      form: {
        kode_posting: "",
        tanggal: "",
        periode_awal: "",
        periode_akhir: "",
        kode_referensi: "",
        jenis: "",
        gudang_id: "",
        coa_id: "",
        coa_id_biaya: "",
        divisi_id: "",
        pelanggan_id: "",
        keterangan: "",
        posting_tkbm_details: [],

        coa: {},
        coa_biaya: {},
        divisi: {},
        gudang: {},
        pelanggan: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`finance/posting-tkbm/${this.id}`);
      Object.keys(this.form).forEach((item) => {
        if (item != "posting_tkbm_details") {
          this.form[item] = res.data[item];
        }
      });
      this.form.jenis = res.data.jenis.trim();
      this.form.posting_tkbm_details = res.data.posting_tkbm_details;
      this.isLoadingPage = false;
    } catch (error) {
      console.log(error);
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
