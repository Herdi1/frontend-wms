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
              <label class="w-[40%]">Gudang</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.gudang ? this.form.gudang.nama_gudang : "-" }}
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
                  <th class="w-20 border border-gray-300 text-center">
                    Detail
                  </th>
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
                  <th class="w-48 border border-gray-300">Kode TKBM</th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="this.form.jenis === 'OUTBOUND'"
                  >
                    Lokasi
                  </th>
                  <th class="w-48 border border-gray-300">Nama Item</th>

                  <th class="w-48 border border-gray-300">Valuation</th>
                  <th class="w-48 border border-gray-300">Jenis Biaya</th>
                  <th class="w-48 border border-gray-300">Quantity</th>
                  <th class="w-48 border border-gray-300">Total TKBM</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in form.posting_tkbm_details" :key="i">
                  <td
                    class="border border-gray-300 place-items-center text-center"
                  >
                    <div
                      class="bg-orange-500 p-1 rounded-lg w-1/2 cursor-pointer"
                      @click="showList(item)"
                    >
                      <i class="fas fa-info-circle text-white mx-auto"></i>
                    </div>
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'INBOUND'"
                  >
                    {{
                      item.inbound_detail
                        ? item.inbound_detail.inbound.kode_inbound
                        : "-"
                    }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'OUTBOUND'"
                  >
                    {{
                      item.pick_order_detail
                        ? item.pick_order_detail.pick_order.kode_pick_order
                        : "-"
                    }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'OUTBOUND'"
                  >
                    {{
                      item.pick_order_detail
                        ? item.pick_order_detail.pick_order.kode_tkbm
                        : "-"
                    }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'INBOUND'"
                  >
                    {{
                      item.inbound_detail
                        ? item.inbound_detail.inbound.kode_tkbm
                        : "-"
                    }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'OUTBOUND'"
                  >
                    {{ item.lokasi ? item.lokasi.nama_lokasi : "-" }}
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
                    {{
                      item.jenis_biaya_id
                        ? item.jenis_biaya_id.nama_jenis_biaya
                        : "-"
                    }}
                  </td>
                  <td class="border border-gray-300">
                    <p class="text-right">
                      {{ item.quantity ? item.quantity : "-" }}
                    </p>
                  </td>
                  <td class="border border-gray-300">
                    <p class="text-right">
                      {{ item.total_tkbm ?? 0 | formatPrice }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="border-b border-gray-300"></td>
                  <td class="border-b border-gray-300"></td>
                  <td class="border-b border-gray-300"></td>
                  <td class="border-b border-gray-300"></td>
                  <td class="border-b border-gray-300"></td>
                  <td class="border-b border-gray-300"></td>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'OUTBOUND'"
                  ></td>
                  <td class="border border-gray-300">Grand Total</td>
                  <td class="border border-gray-300">
                    <p class="text-right">
                      {{ totalNominal | formatPrice }}
                    </p>
                  </td>
                  <td class="border border-gray-300"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <ModalDetail :self="this" ref="modalDetail" />
  </section>
</template>

<script>
import ModalDetail from "../detail.vue";
export default {
  props: ["self"],

  components: {
    ModalDetail,
  },

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
      this.form.posting_tkbm_details = res.data.posting_tkbm_details.map(
        (item) => {
          return {
            ...item,
            jenis_biaya_id: item.jenis_biaya
              ? item.jenis_biaya
              : item.pick_order_detail
              ? item.pick_order_detail.jenis_biaya
              : item.inbound_detail.jenis_biaya,
          };
        }
      );
      this.isLoadingPage = false;
    } catch (error) {
      console.log(error);
      this.$router.back();
    }
  },

  computed: {
    totalNominal() {
      return this.form.posting_tkbm_details.reduce((total, item) => {
        const nominal = parseFloat(item.total_tkbm) || 0;
        return total + nominal;
      }, 0);
    },
  },

  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },

    async showList(item) {
      let listDetail = await this.$axios.get(
        "finance/posting-tkbm/get-daftar-list-tkbm",
        {
          params: {
            jenis: this.form.jenis,
            inbound_detail_id: item.inbound_detail_id ?? "",
            pick_order_detail_id: item.pick_order_detail_id ?? "",
          },
        }
      );
      if (listDetail.data.length === 0) {
        this.$toaster.error("Detail tidak ditemukan");
        return;
      }
      this.form.list_tkbm = listDetail.data[0];
      // this.$refs.modalDetail.form = {
      //   ...listDetail,
      // };
      this.$refs.modalDetail.show();
    },
  },
};
</script>
