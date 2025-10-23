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
                      <td class="border border-gray-300 text-right">
                        {{ item.saldo_awal | formatPrice }}
                      </td>
                      <td class="border border-gray-300 text-right">
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
                  <td class="font-bold border-y border-l border-gray-300">
                    Informasi Saldo Kas Awal
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="border-y border-r border-gray-300"></td>
                </tr>
                <tr
                  v-for="(item, i) in form.pengajuan_dropping_details"
                  :key="i"
                >
                  <td class="border border-gray-300">
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
                  <td class="text-right border border-gray-300">
                    {{ parseFloat(item.saldo_awal ?? 0) | formatPrice }}
                  </td>
                  <td class="border border-gray-300"></td>
                </tr>
                <tr v-for="(item, i) in form.dropping" :key="i">
                  <td class="border border-gray-300">
                    <p class="pl-3">
                      Dropping ({{ formatDate(item.periode_awal) }} -
                      {{ formatDate(item.periode_akhir) }})
                    </p>
                  </td>
                  <td class="border border-gray-300"></td>
                  <td class="border border-gray-300">
                    {{
                      parseFloat(item.permintaan_dropping ?? 0) | formatPrice
                    }}
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Total Dropping Sebelumnya
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="border-y border-r border-gray-300 text-right">
                    {{ totalDropping | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Total
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="border-y border-r border-gray-300 text-right">
                    {{ totalSaldoAwal | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Plafon Dropping
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="text-right border-y border-r border-gray-300">
                    {{ parseFloat(form.plafon_dropping ?? 0) | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50 text-red-600">
                  <td class="font-bold border-y border-l border-gray-300">
                    Control
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td
                    class="text-right font-bold border-y border-r border-gray-300"
                  >
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
                  <td class="font-bold border-y border-l border-gray-300">
                    Informasi Biaya Operasional
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="border-y border-r border-gray-300"></td>
                </tr>
                <tr
                  v-for="(
                    item, i
                  ) in form.pengajuan_dropping_biaya_details.filter(
                    (item) => item.jenis_jurnal.trim() === 'UMUM'
                  )"
                  :key="i"
                >
                  <td class="border border-gray-300">
                    <span class="pl-3 flex gap-x-1">
                      Biaya Operasional ({{ formatDate(item.tanggal) }})
                    </span>
                  </td>
                  <td class="text-right border border-gray-300">
                    {{ parseFloat(item.nominal ?? 0) | formatPrice }}
                  </td>
                  <td class="border border-gray-300"></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Total Biaya Operasional
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="text-right border-y border-r border-gray-300">
                    {{ parseFloat(totalBiayaOperasional ?? 0) | formatPrice }}
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Informasi PJK Dropping Khusus
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="border-y border-r border-gray-300"></td>
                </tr>
                <tr v-for="(item, i) in form.dropping_khusus" :key="i">
                  <td class="border border-r-gray-300">
                    Dropping Khusus ({{ formatDate(item.tanggal) }})
                  </td>
                  <td class="border border-r-gray-300 text-right">
                    {{ parseFloat(item.nominal ?? 0) | formatPrice }}
                  </td>
                  <td class="border border-r-gray-300"></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Total Dropping Khusus
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="text-right border-y border-r border-gray-300">
                    {{ parseFloat(totalDroppingKhusus ?? 0) | formatPrice }}
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Informasi Biaya Bank
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="border-y border-r border-gray-300"></td>
                </tr>
                <tr
                  v-for="(
                    item, i
                  ) in form.pengajuan_dropping_biaya_details.filter(
                    (item) => item.jenis_jurnal.trim() === 'BANK'
                  )"
                  :key="i"
                >
                  <td class="border border-gray-300">
                    <span class="pl-3 flex gap-x-1">
                      {{ item.coa?.nama_coa ?? "" }}
                      ({{ formatDate(item.tanggal) }})
                    </span>
                  </td>
                  <td class="text-right border border-gray-300">
                    {{ parseFloat(item.nominal ?? 0) | formatPrice }}
                  </td>
                  <td class="border border-gray-300"></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Total Biaya Bank
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="text-right border-y border-r border-gray-300">
                    {{ parseFloat(totalBiayaBank ?? 0) | formatPrice }}
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Informasi Saldo Akhir
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="border-y border-r border-gray-300"></td>
                </tr>
                <tr
                  v-for="(item, i) in form.pengajuan_dropping_details"
                  :key="i"
                >
                  <td class="border border-gray-300">
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
                  <td class="text-right border border-gray-300">
                    {{ item.saldo_akhir | formatPrice }}
                  </td>
                  <td class="border border-gray-300"></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Total Saldo Akhir
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="text-right border-y border-r border-gray-300">
                    {{ parseFloat(form.total_saldo_akhir ?? 0) | formatPrice }}
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Pengajuan Dropping
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="border-y border-r border-gray-300"></td>
                </tr>
                <tr class="bg-gray-50 text-green-600">
                  <td class="font-bold border-y border-l border-gray-300">
                    Permintaan Dropping
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td
                    class="text-right font-bold border-y border-r border-gray-300"
                  >
                    {{
                      parseFloat(form.permintaan_dropping ?? 0) | formatPrice
                    }}
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Total Saldo Akhir
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="text-right border-y border-r border-gray-300">
                    {{ parseFloat(form.total_saldo_akhir ?? 0) | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="font-bold border-y border-l border-gray-300">
                    Plafon Dropping
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="text-right border-y border-r border-gray-300">
                    {{ parseFloat(form.plafon_dropping ?? 0) | formatPrice }}
                  </td>
                </tr>
                <tr class="bg-gray-50 text-red-600">
                  <td class="font-bold border-y border-l border-gray-300">
                    Control
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td
                    class="text-right font-bold border-y border-r border-gray-300"
                  >
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
        dropping_khusus: [],
        dropping: [],

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
      this.form.dropping = res.data.pengajuan_dropping_sebelumnya;
      this.form.dropping_khusus =
        res.data.pengajuan_dropping_umum_khusus_details;
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
      // console.log(error);
    }
  },

  computed: {
    totalBiayaOperasional() {
      if (
        !this.form.pengajuan_dropping_biaya_details ||
        this.form.pengajuan_dropping_biaya_details.length === 0
      ) {
        return 0;
      }

      return this.form.pengajuan_dropping_biaya_details
        .filter((item) => item.jenis_jurnal.trim() === "UMUM")
        .reduce((total, item) => {
          return total + parseFloat(item.nominal) || 0;
        }, 0);
    },

    totalBiayaBank() {
      if (
        !this.form.pengajuan_dropping_biaya_details ||
        this.form.pengajuan_dropping_biaya_details.length === 0
      ) {
        return 0;
      }

      return this.form.pengajuan_dropping_biaya_details
        .filter((item) => item.jenis_jurnal.trim() === "BANK")
        .reduce((total, item) => {
          return total + parseFloat(item.nominal) || 0;
        }, 0);
    },

    totalDropping() {
      if (!this.form.dropping || this.form.dropping.length === 0) {
        return 0;
      }

      return this.form.dropping.reduce((total, item) => {
        return total + parseFloat(item.permintaan_dropping) || 0;
      }, 0);
    },

    totalSaldoAwal() {
      if (
        !this.form.pengajuan_dropping_details ||
        this.form.pengajuan_dropping_details.length === 0
      ) {
        return 0;
      }

      let saldoAwal = this.form.pengajuan_dropping_details.reduce(
        (total, item) => {
          return total + parseFloat(item.saldo_awal) || 0;
        },
        0
      );
      let dropping = this.totalDropping;
      return saldoAwal + dropping;
    },

    totalDroppingKhusus() {
      if (
        !this.form.dropping_khusus ||
        this.form.dropping_khusus.length === 0
      ) {
        return 0;
      }

      return this.form.dropping_khusus.reduce((total, item) => {
        return total + parseFloat(item.nominal) || 0;
      }, 0);
    },
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
