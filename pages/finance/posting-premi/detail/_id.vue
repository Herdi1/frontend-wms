<template>
  <section class="min-h-screen">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Posting Periodik
        </h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div class="w-full">
        <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
          <form
            @submit.prevent="validate().then(() => onSubmit(invalid))"
            autocomplete="off"
          >
            <div class="w-full">
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full"
                >
                  <ValidationProvider name="gudang_id" class="w-full mt-1 mb-2">
                    <div class="flex items-center">
                      <label for="gudang_id" class="w-1/2"
                        >Gudang <span class="text-danger">*</span></label
                      >
                      <v-select
                        :disabled="isEditable"
                        label="nama_gudang"
                        :loading="isLoadingGetGudang"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetGudang"
                        v-model="form.gudang_id"
                        class="w-1/2"
                        @input="(item) => onSelectGudang(item)"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom1.data.length || search"
                        >
                          <span
                            v-if="lookup_custom1.current_page > 1"
                            @click="onGetGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <div class="form-group">
                    <input-horizontal
                      label="Tanggal"
                      type="date"
                      name="tanggal"
                      :required="true"
                      v-model="form.tanggal"
                      :disabled="true"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Periode Awal"
                      type="date"
                      name="periode_awal"
                      :required="true"
                      v-model="form.periode_awal"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Periode Akhir"
                      type="date"
                      name="periode_akhir"
                      :required="true"
                      v-model="form.periode_akhir"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Kode Referensi"
                      type="text"
                      name="kode_referensi"
                      :required="false"
                      v-model="form.kode_referensi"
                    />
                  </div>
                  <div class="flex w-full m-1 pr-1">
                    <label for="" class="w-1/2"
                      >Jenis <span class="text-danger">*</span></label
                    >
                    <select
                      required
                      name=""
                      id=""
                      v-model="form.jenis"
                      @change="onSelectJenis"
                      class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                    >
                      <option value="RITASE">Ritase</option>
                      <option value="PREMI">Premi</option>
                    </select>
                  </div>

                  <ValidationProvider name="coa_id" class="w-full mt-1 mb-2">
                    <div class="flex items-center">
                      <label for="coa_id" class="w-1/2"
                        >Akun Master <span class="text-danger">*</span></label
                      >
                      <v-select
                        :disabled="isEditable"
                        label="nama_coa"
                        :loading="isLoadingGetCoa"
                        :options="lookup_custom2.data"
                        :filterable="false"
                        @search="onGetCoa"
                        v-model="form.coa_id"
                        class="w-1/2"
                        @input="(item) => onSelectCoa(item)"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom2.data.length || search"
                        >
                          <span
                            v-if="lookup_custom2.current_page > 1"
                            @click="onGetCoa(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom2.last_page >
                              lookup_custom2.current_page
                            "
                            @click="onGetCoa(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider name="coa_id" class="w-full mt-1 mb-2">
                    <div class="flex items-center">
                      <label for="coa_id" class="w-1/2"
                        >Akun Biaya <span class="text-danger">*</span></label
                      >
                      <v-select
                        :disabled="isEditable"
                        label="nama_coa"
                        :loading="isLoadingGetCoa"
                        :options="lookup_custom2.data"
                        :filterable="false"
                        @search="onGetCoa"
                        v-model="form.coa_id_biaya"
                        class="w-1/2"
                        @input="(item) => onSelectCoaBiaya(item)"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom2.data.length || search"
                        >
                          <span
                            v-if="lookup_custom2.current_page > 1"
                            @click="onGetCoa(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom2.last_page >
                              lookup_custom2.current_page
                            "
                            @click="onGetCoa(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider name="divisi_id" class="w-full mt-1 mb-2">
                    <div class="flex items-center">
                      <label for="divisi_id" class="w-1/2">Divisi </label>
                      <v-select
                        :disabled="isEditable"
                        label="nama_divisi"
                        :loading="isLoadingGetDivisi"
                        :options="lookup_custom3.data"
                        :filterable="false"
                        @search="onGetDivisi"
                        v-model="form.divisi_id"
                        class="w-1/2"
                        @input="(item) => onSelectDivisi(item)"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom3.data.length || search"
                        >
                          <span
                            v-if="lookup_custom3.current_page > 1"
                            @click="onGetDivisi(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom3.last_page >
                              lookup_custom3.current_page
                            "
                            @click="onGetDivisi(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    name="pelanggan_id"
                    class="w-full mt-1 mb-2"
                  >
                    <div class="flex items-center">
                      <label for="divisi_id" class="w-1/2">Pelanggan </label>
                      <v-select
                        :disabled="isEditable"
                        label="nama_pelanggan"
                        :loading="isLoadingGetPelanggan"
                        :options="lookup_custom4.data"
                        :filterable="false"
                        @search="onGetPelanggan"
                        v-model="form.pelanggan_id"
                        class="w-1/2"
                        @input="(item) => onSelectPelanggan(item)"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom4.data.length || search"
                        >
                          <span
                            v-if="lookup_custom4.current_page > 1"
                            @click="onGetPelanggan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom4.last_page >
                              lookup_custom4.current_page
                            "
                            @click="onGetPelanggan(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider name="staff_id" class="w-full mt-1 mb-2">
                    <div class="flex items-center">
                      <label for="staff_id" class="w-1/2">Staff </label>
                      <v-select
                        :disabled="isEditable"
                        label="nama_lengkap"
                        :loading="isLoadingGetStaff"
                        :options="lookup_custom6.data"
                        :filterable="false"
                        @search="onGetStaff"
                        v-model="form.staff_id"
                        class="w-1/2"
                        @input="(item) => onSelectStaff(item)"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom6.data.length || search"
                        >
                          <span
                            v-if="lookup_custom6.current_page > 1"
                            @click="onGetStaff(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom6.last_page >
                              lookup_custom6.current_page
                            "
                            @click="onGetStaff(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <div class="form-group flex justify-between">
                    <label for="keterangan" class="w-1/2">Keterangan</label>
                    <textarea
                      :disabled="isEditable"
                      name="keterangan"
                      id="keterangan"
                      v-model="form.keterangan"
                      placeholder="Keterangan"
                      class="w-1/2 p-1 rounded-md outline-none border border-gray-300"
                    ></textarea>
                  </div>
                </div>
                <div class="w-full flex justify-between items-center mt-10">
                  <h1 class="text-lg font-bold uppercase">
                    Detail Posting Periodik
                  </h1>
                  <div class=" ">
                    <button
                      type="button"
                      @click="addDetailTKBM"
                      class="bg-[#4fc47a]/90 hover:bg-[#4fc47a] shadow-md hover:shadow-none text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                    >
                      <i class="fas fa-retweet"></i>
                      <p class="text-xs font-medium">Tambah Detail</p>
                    </button>
                  </div>
                </div>

                <div class="table-responsive mb-7 max-h-72 scroll-smooth">
                  <table
                    class="table border-collapse border border-gray-300 scroll-smooth my-5 h-full overflow-auto table-fixed"
                    v-if="form.posting_premi_details.length > 0"
                  >
                    <thead>
                      <tr class="text-sm uppercase">
                        <th class="w-20 border border-gray-300 text-center">
                          Detail
                        </th>
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
                          Staff
                        </th>
                        <th
                          class="w-48 border border-gray-300"
                          v-if="form.jenis === 'PREMI'"
                        >
                          Item
                        </th>
                        <th
                          class="w-48 border border-gray-300"
                          v-if="form.jenis === 'PREMI'"
                        >
                          Quantity
                        </th>
                        <th class="w-48 border border-gray-300">Total Biaya</th>
                        <th class="w-20 border text-center border-gray-300">
                          Hapus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in form.posting_premi_details"
                        :key="i"
                      >
                        <td
                          class="border border-gray-300 place-items-center text-center"
                        >
                          <div
                            class="bg-orange-500 p-1 rounded-lg w-1/2 cursor-pointer"
                            @click="showList(item)"
                          >
                            <i
                              class="fas fa-info-circle text-white mx-auto"
                            ></i>
                          </div>
                        </td>
                        <td
                          class="border border-gray-300"
                          v-if="form.jenis === 'RITASE'"
                        >
                          {{ item.tanggal }}
                        </td>
                        <td
                          class="border border-gray-300"
                          v-if="form.jenis === 'RITASE'"
                        >
                          {{ item.jam_pengiriman_awal ?? "-" }}
                        </td>
                        <td
                          class="border border-gray-300"
                          v-if="form.jenis === 'RITASE'"
                        >
                          {{ item.jam_pengiriman_akhir ?? "-" }}
                        </td>
                        <td
                          class="border border-gray-300 text-right"
                          v-if="form.jenis === 'RITASE'"
                        >
                          {{ item.standar_waktu_kerja }}
                        </td>
                        <td
                          class="border border-gray-300 text-right"
                          v-if="form.jenis === 'RITASE'"
                        >
                          {{ item.jumlah_ritase }}
                        </td>
                        <td
                          class="border border-gray-300 text-right"
                          v-if="form.jenis === 'RITASE'"
                        >
                          {{ item.total_standar_waktu }}
                        </td>
                        <td
                          class="border border-gray-300 text-right"
                          v-if="form.jenis === 'RITASE'"
                        >
                          {{ item.total_realisasi }}
                        </td>
                        <td
                          class="border border-gray-300 text-right"
                          v-if="form.jenis === 'RITASE'"
                        >
                          {{ item.nilai_insentif_ritase }}
                        </td>

                        <td
                          class="border border-gray-300 text-right"
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
                        <td
                          class="border border-gray-300 text-right"
                          v-if="form.jenis === 'PREMI'"
                        >
                          {{ item.total_qty }}
                        </td>
                        <td class="border border-gray-300 text-right">
                          {{ parseFloat(item.total_biaya) | formatPrice }}
                        </td>

                        <td
                          class="border border-gray-300 place-items-center text-center"
                        >
                          <div class="bg-red-500 p-1 rounded-lg w-1/2">
                            <i
                              class="fas fa-trash text-white mx-auto"
                              style="cursor: pointer"
                              @click="onDeleteDetails(i, item)"
                            ></i>
                          </div>
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
                        <td class="border-b border-gray-300"></td>
                        <td class="border-b border-gray-300"></td>
                        <td class="border-b border-gray-300"></td>
                        <td class="border border-gray-300">Grand Total</td>
                        <td class="border border-gray-300">
                          <p class="text-right">
                            {{ totalNominal | formatPrice }}
                          </p>
                        </td>
                        <td class="border border-gray-300"></td>
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
            <modal-footer-section
              class="mt-5"
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
            />
          </form>
        </ValidationObserver>
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
      if (this.isEditable) {
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
      }
    } catch (error) {
      console.log(error);
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
          url: "master/gudang/get-gudang",
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
