<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Pengajuan Dropping</h1>

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
              <label class="w-[40%] font-bold">Kode Pengajuan</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ this.form.kode_pengajuan ? this.form.kode_pengajuan : "-" }}
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
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Tanggal</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ this.form.tanggal ? formatDate(this.form.tanggal) : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Gudang</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ this.form.gudang ? this.form.gudang.nama_gudang : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Periode Awal</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  this.form.periode_awal
                    ? formatDate(this.form.periode_awal)
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Periode Akhir</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  this.form.periode_akhir
                    ? formatDate(this.form.periode_akhir)
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Keterangan</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ this.form.periode_akhir ? this.form.keterangan : "-" }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <tab-component :tabs="tabs">
            <template #PengajuanDroppingDetail>
              <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-bold uppercase">
                  Pengajuan Dropping Detail
                </h1>
              </div>
              <div class="table-responsive w-full relative overflow-y-auto">
                <table
                  class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                  :class="form.pengajuan_dropping_details.length ? 'mb-20' : ''"
                >
                  <thead>
                    <tr class="text-sm uppercase">
                      <th class="w-44 border border-gray-300">Kode Coa</th>
                      <th class="w-44 border border-gray-300">Nama Coa</th>
                      <th class="w-44 border border-gray-300">Tanggal Ambil</th>
                      <th class="w-44 border border-gray-300">Saldo Awal</th>
                      <th class="w-44 border border-gray-300">Saldo Akhir</th>
                      <th class="w-44 border border-gray-300">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in form.pengajuan_dropping_details"
                      :key="i"
                      class="border-t border-gray-300"
                    >
                      <td class="border border-gray-300">
                        {{ item.coa ? item.coa.kode_coa ?? "" : "-" }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.coa ? item.coa.nama_coa ?? "" : "-" }}
                      </td>
                      <td class="border border-gray-300">
                        {{
                          item.tanggal_ambil
                            ? formatDate(item.tanggal_ambil)
                            : "-"
                        }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.saldo_awal | formatPrice }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.saldo_akhir | formatPrice }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.keterangan ? item.keterangan : "-" }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </tab-component>
        </div>
        <div
          v-if="form.pengajuan_dropping_biaya_details.length > 0"
          class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
        >
          <div>
            <h1 class="text-xl font-bold uppercase mb-5">
              Detail Biaya Dropping
            </h1>
          </div>
          <div class="table-responsive w-full relative overflow-y-auto">
            <table
              ref="formContainer"
              class="mb-5 overflow-auto table-fixed border border-gray-300"
            >
              <thead>
                <tr class="uppercase border-b">
                  <th class="font-bold text-center">Keterangan</th>
                  <th class="font-bold text-center">Nominal</th>
                  <th class="font-bold text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-gray-50">
                  <td class="font-bold">Informasi Saldo Kas Awal</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr
                  v-for="(item, i) in form.pengajuan_dropping_details"
                  :key="i"
                >
                  <td>
                    <span class="pl-3">
                      {{
                        item.kode_coa
                          ? item.kode_coa ?? ""
                          : item.coa.kode_coa ?? ""
                      }}
                      -
                      {{
                        item.nama_coa
                          ? item.nama_coa ?? ""
                          : item.coa.nama_coa ?? ""
                      }}
                    </span>
                  </td>
                  <td class="text-right">
                    {{ item.saldo_awal | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold">Total</td>
                  <td></td>
                  <td class="text-right">
                    {{ form.total_saldo_awal | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold">Plafon Dropping</td>
                  <td></td>
                  <td class="text-right">
                    {{ form.plafon_dropping | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50 text-red-600">
                  <td class="font-bold">Control</td>
                  <td></td>
                  <td class="text-right font-bold">
                    {{
                      (parseFloat(form.total_saldo_awal) -
                        parseFloat(form.plafon_dropping))
                        | formatPrice
                    }}
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold">Informasi Biaya Operasional</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr
                  v-for="(item, i) in form.pengajuan_dropping_biaya_details"
                  :key="i"
                >
                  <td>
                    <span class="pl-3">
                      {{ item.coa.kode_coa ?? "" }} -
                      {{ item.coa.nama_coa ?? "" }} ({{
                        formatDate(item.tanggal)
                      }})
                    </span>
                  </td>
                  <td class="text-right">
                    {{ item.nominal | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold">Total</td>
                  <td></td>
                  <td class="text-right">
                    {{ form.total_biaya | formatPrice }}
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold">Informasi Saldo Akhir</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr
                  v-for="(item, i) in form.pengajuan_dropping_details"
                  :key="i"
                >
                  <td>
                    <span class="pl-3">
                      {{
                        item.kode_coa
                          ? item.kode_coa ?? ""
                          : item.coa.kode_coa ?? ""
                      }}
                      -
                      {{
                        item.nama_coa
                          ? item.nama_coa ?? ""
                          : item.coa.nama_coa ?? ""
                      }}
                    </span>
                  </td>
                  <td class="text-right">
                    {{ item.saldo_akhir | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold">Total</td>
                  <td></td>
                  <td class="text-right">
                    {{ form.total_saldo_akhir | formatPrice }}
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold">Pengajuan Dropping</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="bg-gray-50 text-green-600">
                  <td class="font-bold">Permintaan Dropping</td>
                  <td></td>
                  <td class="text-right font-bold">
                    {{ form.permintaan_dropping | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold">Total Saldo Akhir</td>
                  <td></td>
                  <td class="text-right">
                    {{ form.total_saldo_akhir | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold">Plafon Dropping</td>
                  <td></td>
                  <td class="text-right">
                    {{ form.plafon_dropping | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50 text-red-600">
                  <td class="font-bold">Control</td>
                  <td></td>
                  <td class="text-right font-bold">
                    {{
                      (parseFloat(form.permintaan_dropping) +
                        parseFloat(form.total_saldo_akhir) -
                        parseFloat(form.plafon_dropping))
                        | formatPrice
                    }}
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
      tabs: [
        {
          name: "Pengajuan Dropping Detail",
          slotName: "PengajuanDroppingDetail",
        },
      ],

      id,

      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
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

        plafon_dropping: "",
        total_biaya: "",
        total_saldo_awal: "",
        total_saldo_akhir: "",
        permintaan_dropping: "",

        gudang: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`finance/pengajuan-dropping/${this.id}`);
      Object.keys(this.form).forEach((item) => {
        this.form[item] = res.data[item];
      });
      this.form.gudang = res.data.gudang;
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
