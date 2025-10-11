<template>
  <section class="min-h-screen">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Posting Periodik</h1>

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
                {{
                  this.form.gudang_id ? this.form.gudang_id.nama_gudang : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.tanggal ? formatDate(this.form.tanggal) : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Periode Awal</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.form.periode_awal
                    ? formatDate(this.form.periode_awal)
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Periode Akhir</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.form.periode_akhir
                    ? formatDate(this.form.periode_akhir)
                    : "-"
                }}
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
                {{ this.form.coa_id ? this.form.coa_id.kode_coa : "-" }} -
                {{ this.form.coa_id ? this.form.coa_id.nama_coa : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Akun Biaya</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.form.coa_id_biaya ? this.form.coa_id_biaya.kode_coa : "-"
                }}
                -
                {{
                  this.form.coa_id_biaya ? this.form.coa_id_biaya.nama_coa : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Divisi</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.form.divisi_id ? this.form.divisi_id.nama_divisi : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Pelanggan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.form.pelanggan_id
                    ? this.form.pelanggan_id.nama_pelanggan
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Staff</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.staff_id ? this.form.staff_id.nama_lengkap : "-" }}
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
            <h1 class="text-lg font-bold uppercase">Detail Posting Periodik</h1>
          </div>
          <div class="table-responsive mb-7">
            <table
              class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
            >
              <thead>
                <tr class="uppercase">
                  <th class="w-48 border border-gray-300">Staff</th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  >
                    Tanggal
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  >
                    Waktu Pengiriman Awal
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  >
                    Waktu Pengiriman Akhir
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  >
                    Standar Waktu Kerja
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  >
                    Jumlah Ritase
                  </th>

                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  >
                    Total Standar Waktu
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  >
                    Total Realisasi
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  >
                    Insentif Ritase
                  </th>

                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  >
                    Kode Shipment
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  >
                    Kode UJS
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  >
                    Tanggal
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  >
                    Staff
                  </th>
                  <th
                    class="w-48 border border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  >
                    Item
                  </th>
                  <th class="w-48 border border-gray-300">Quantity</th>
                  <th class="w-48 border border-gray-300">Total Biaya</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in form.posting_premi_details" :key="i">
                  <td class="border border-gray-300">
                    {{ item.staff ? item.staff.nama_lengkap : "-" }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  >
                    {{ formatDate(item.ritase_sopir_harian.tanggal) }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  >
                    {{ item.ritase_sopir_harian.jam_pengiriman_awal ?? "-" }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  >
                    {{ item.ritase_sopir_harian.jam_pengiriman_akhir ?? "-" }}
                  </td>
                  <td
                    class="border border-gray-300 text-right"
                    v-if="form.jenis === 'RITASE'"
                  >
                    {{ item.ritase_sopir_harian.standar_waktu_kerja }}
                  </td>
                  <td
                    class="border border-gray-300 text-right"
                    v-if="form.jenis === 'RITASE'"
                  >
                    {{ item.ritase_sopir_harian.jumlah_ritase }}
                  </td>
                  <td
                    class="border border-gray-300 text-right"
                    v-if="form.jenis === 'RITASE'"
                  >
                    {{ item.ritase_sopir_harian.total_standar_waktu }}
                  </td>
                  <td
                    class="border border-gray-300 text-right"
                    v-if="form.jenis === 'RITASE'"
                  >
                    {{ item.ritase_sopir_harian.total_realisasi }}
                  </td>
                  <td
                    class="border border-gray-300 text-right"
                    v-if="form.jenis === 'RITASE'"
                  >
                    {{ item.ritase_sopir_harian.nilai_insentif_ritase }}
                  </td>

                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  >
                    {{ item.kode_shipment }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  >
                    {{ item.kode_ujs }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  >
                    {{ formatDate(item.tanggal) }}
                  </td>
                  <td
                    class="border border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  >
                    {{ item.nama_lengkap }}
                  </td>
                  <td
                    class="border border-gray-300 text-right"
                    v-if="form.jenis === 'PREMI'"
                  >
                    {{
                      item.item_gudang
                        ? item.item_gudang.nama_item +
                          " - " +
                          item.item_gudang.kode_item
                        : "-"
                    }}
                  </td>
                  <td class="border border-gray-300 text-right">
                    {{ item.quantity }}
                  </td>
                  <td class="border border-gray-300 text-right">
                    {{ parseFloat(item.total_biaya) | formatPrice }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  ></td>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  ></td>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  ></td>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  ></td>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  ></td>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  ></td>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'RITASE'"
                  ></td>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  ></td>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  ></td>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  ></td>
                  <td
                    class="border-b border-gray-300"
                    v-if="form.jenis === 'PREMI'"
                  ></td>
                  <td class="border-b border-gray-300"></td>
                  <td class="border-b border-gray-300"></td>
                  <td class="border border-gray-300">Grand Total</td>
                  <td class="border border-gray-300">
                    <p class="text-right">
                      {{ totalNominal | formatPrice }}
                    </p>
                  </td>
                </tr>
                <tr v-if="!form.posting_premi_details.length > 0">
                  <td colspan="100" class="text-center">
                    <span class="flex justify-center">
                      <img
                        src="/img/data-not-found.svg"
                        style="height: 250px; object-fit: cover"
                      />
                    </span>
                    <div class="mt-3">Data Tidak Ditemukan</div>
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
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Posting Premi",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Posting Premi",

      url: "finance/posting-premi",
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
        posting_premi_details: [],
      },
      default_form: {
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
        posting_premi_details: [],
      },

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchDivisi: false,
      isLoadingGetDivisi: false,
      divisi_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchStaff: false,
      isLoadingGetStaff: false,
      staff_search: "",

      user: this.$auth.user,
    };
  },

  async created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    this.form.tanggal = formattedDate;
    try {
      let res = await this.$axios.get(`${this.url}/${this.id}`);
      Object.keys(this.form).forEach((item) => {
        if (item != "posting_premi_details") {
          this.form[item] = res.data[item];
        }
      });
      this.form.gudang_id = res.data.gudang;
      this.form.coa_id = res.data.coa;
      this.form.coa_id_biaya = res.data.coa_biaya;
      this.form.divisi_id = res.data.divisi;
      this.form.pelanggan_id = res.data.pelanggan;
      this.form.staff_id = res.data.staff;

      this.form.posting_premi_details = res.data.posting_premi_details.map(
        (item) => {
          return {
            ...item,
          };
        }
      );
      this.isLoadingPage = false;
      // console.log(this.form);
    } catch (error) {
      // console.log(error);
      // this.$router.back()
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchCoa();
    await this.onSearchDivisi();
    await this.onSearchPelanggan();
    await this.onSearchStaff();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_custom4",
      "lookup_custom5",
      "lookup_custom6",
    ]),

    totalNominal() {
      return this.form.posting_premi_details.reduce((total, item) => {
        const nominal = parseFloat(item.total_biaya) || 0;
        return total + nominal;
      }, 0);
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },

    onSelectJenis() {
      this.form.posting_premi_details = [];
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang-user",
          lookup: "custom1",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    async onSelectGudang(item) {
      this.form.gudang_id = item;
    },

    onGetCoa(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoa);

      this.isStopSearchCoa = setTimeout(() => {
        this.coa_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchCoa();
      }, 600);
    },

    async onSearchCoa() {
      if (!this.isLoadingGetCoa) {
        this.isLoadingGetCoa = true;

        await this.lookUp({
          url: "finance/jurnal/get-coa",
          lookup: "custom2",
          query:
            "?search=" +
            this.coa_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    async onSelectCoa(item) {
      this.form.coa_id = item;
      this.coa_search = "";
      await this.onSearchCoa();
    },

    async onSelectCoaBiaya(item) {
      this.form.coa_id_biaya = item;
      this.coa_search = "";
      await this.onSearchCoa();
    },

    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom3",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDivisi = false;
      }
    },

    onSelectDivisi(item) {
      this.form.divisi_id = item || "";
    },

    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchPelanggan();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "custom4",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    onSelectPelanggan(item) {
      this.form.pelanggan_id = item || "";
    },

    onGetStaff(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchStaff);

      this.isStopSearchStaff = setTimeout(() => {
        this.staff_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchStaff();
      }, 600);
    },

    async onSearchStaff() {
      if (!this.isLoadingGetStaff) {
        this.isLoadingGetStaff = true;

        await this.lookUp({
          url: "master/staff/get-staff",
          lookup: "custom6",
          query:
            "?search=" +
            this.staff_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetStaff = false;
      }
    },

    onSelectStaff(item) {
      this.form.staff_id = item || "";
    },

    async addDetailTKBM() {
      if (
        !this.form.periode_awal ||
        !this.form.periode_akhir ||
        !this.form.jenis ||
        !this.form.gudang_id ||
        !this.form.staff_id
      ) {
        this.$toaster.error(
          "Mohon Pilih Jenis, Gudang, Periode Awal dan Akhir Terlebih Dahulu!"
        );
        return;
      }
      let daftarDetail = await this.$axios.get(
        "finance/posting-premi/get-daftar-detail-tkbm",
        {
          params: {
            gudang_id: this.form.gudang_id.gudang_id,
            staff_id: this.form.staff_id.staff_id,
            periode_awal: this.form.periode_awal,
            periode_akhir: this.form.periode_akhir,
            jenis: this.form.jenis,
          },
        }
      );

      this.form.posting_premi_details = daftarDetail.data.map((item) => {
        return {
          ...item,
          staff_id:
            typeof this.form.staff_id === "object"
              ? this.form.staff_id.staff_id
              : this.form.staff_id,
          quantity:
            this.form.jenis === "RITASE" ? item.jumlah_ritase : item.total_qty,
        };
      });
    },

    onDeleteDetails(index, item) {
      this.form.posting_premi_details = this.form.posting_premi_details.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },

    async showList(item) {
      let listDetail = await this.$axios.get(
        "finance/posting-premi/get-daftar-list-tkbm",
        {
          params: {
            jenis: this.form.jenis,
            inbound_detail_id: item.inbound_detail_id ?? "",
            pick_order_detail_id: item.pick_order_detail_id ?? "",
          },
        }
      );
      console.log(listDetail.data);
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "finance/posting-premi";

      let formData = {
        ...this.form,
        gudang_id:
          typeof this.form.gudang_id === "object"
            ? this.form.gudang_id.gudang_id
            : this.form.gudang_id,
        coa_id:
          typeof this.form.coa_id === "object"
            ? this.form.coa_id.coa_id
            : this.form.coa_id,
        coa_id_biaya:
          typeof this.form.coa_id_biaya === "object"
            ? this.form.coa_id_biaya.coa_id
            : this.form.coa_id_biaya,
        divisi_id:
          typeof this.form.divisi_id === "object"
            ? this.form.divisi_id.divisi_id
            : this.form.divisi_id,
        pelanggan_id:
          typeof this.form.pelanggan_id === "object"
            ? this.form.pelanggan_id.pelanggan_id
            : this.form.pelanggan_id,
        staff_id:
          typeof this.form.staff_id === "object"
            ? this.form.staff_id.staff_id
            : this.form.staff_id,
      };

      formData.posting_premi_details = this.form.posting_premi_details.map(
        (item) => {
          return {
            ...item,
          };
        }
      );

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        url: url,
        method: this.isEditable ? "put" : "post",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Berhasil " +
              (this.isEditable ? "Update" : "Tambah") +
              " Posting Periodik"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
            };
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    formReset() {
      this.isLoadingForm = false;
      this.form = {
        ...this.default_form,
      };
    },
  },
};
</script>
