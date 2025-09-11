<template>
  <section class="min-h-screen">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Posting TKBM
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
                      <option value="INBOUND">Inbound</option>
                      <option value="OUTBOUND">Outbound</option>
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
                        :loading="isLoadingGetCoaBiaya"
                        :options="lookup_custom6.data"
                        :filterable="false"
                        @search="onGetCoaBiaya"
                        v-model="form.coa_id_biaya"
                        class="w-1/2"
                        @input="(item) => onSelectCoaBiaya(item)"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom6.data.length || search"
                        >
                          <span
                            v-if="lookup_custom6.current_page > 1"
                            @click="onGetCoaBiaya(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom6.last_page >
                              lookup_custom6.current_page
                            "
                            @click="onGetCoaBiaya(search, true)"
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
                    Detail Posting TKBM
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
                    v-if="form.posting_tkbm_details.length > 0"
                  >
                    <thead>
                      <tr class="text-sm uppercase">
                        <th class="w-20 border border-gray-300 text-center">
                          Detail
                        </th>

                        <th
                          class="w-48 border border-gray-300"
                          v-if="form.jenis === 'INBOUND'"
                        >
                          Kode Inbound
                        </th>
                        <th
                          class="w-48 border border-gray-300"
                          v-if="form.jenis === 'OUTBOUND'"
                        >
                          Kode Pick Order
                        </th>
                        <th class="w-48 border border-gray-300">Kode TKBM</th>
                        <th class="w-48 border border-gray-300">Nama Item</th>
                        <th
                          class="w-48 border border-gray-300"
                          v-if="form.jenis === 'OUTBOUND'"
                        >
                          Lokasi
                        </th>
                        <!-- <th
                          class="w-48 border border-gray-300"
                          v-if="form.jenis === 'INBOUND'"
                        >
                          Supplier
                        </th> -->

                        <th class="w-48 border border-gray-300">Valuation</th>
                        <th class="w-48 border border-gray-300">Jenis Biaya</th>
                        <th class="w-48 border border-gray-300">Quantity</th>
                        <th class="w-48 border border-gray-300">Total TKBM</th>
                        <th class="w-20 border text-center border-gray-300">
                          Hapus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in form.posting_tkbm_details"
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
                          v-if="form.jenis === 'INBOUND'"
                        >
                          {{ item.inbound ? item.inbound.kode_inbound : "-" }}
                        </td>
                        <td
                          class="border border-gray-300"
                          v-if="form.jenis === 'OUTBOUND'"
                        >
                          {{
                            item.pick_order
                              ? item.pick_order.kode_pick_order
                              : "-"
                          }}
                        </td>
                        <td
                          class="border border-gray-300"
                          v-if="form.jenis === 'INBOUND'"
                        >
                          {{ item.inbound ? item.inbound.kode_tkbm : "-" }}
                        </td>
                        <td
                          class="border border-gray-300"
                          v-if="form.jenis === 'OUTBOUND'"
                        >
                          {{
                            item.pick_order ? item.pick_order.kode_tkbm : "-"
                          }}
                        </td>
                        <td class="border border-gray-300">
                          {{
                            item.item_gudang ? item.item_gudang.kode_item : "-"
                          }}
                          -
                          {{
                            item.item_gudang ? item.item_gudang.nama_item : "-"
                          }}
                        </td>
                        <td
                          class="border border-gray-300"
                          v-if="form.jenis === 'OUTBOUND'"
                        >
                          {{ item.lokasi ? item.lokasi.nama_lokasi : "-" }}
                        </td>
                        <!-- <td
                          class="border border-gray-300"
                          v-if="form.jenis === 'INBOUND'"
                        >
                          {{
                            item.supplier ? item.supplier.nama_supplier : "-"
                          }}
                        </td> -->

                        <td class="border border-gray-300">
                          {{
                            item.valuation ? item.valuation.kode_valuation : "-"
                          }}
                          -
                          {{
                            item.valuation ? item.valuation.nama_valuation : "-"
                          }}
                        </td>
                        <td class="border border-gray-300">
                          {{
                            item.jenis_biaya
                              ? item.jenis_biaya.nama_jenis_biaya
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
                      <tr v-if="!form.posting_tkbm_details.length > 0">
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
    <ModalDetail :self="this" ref="modalDetail" />
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
import ModalDetail from "./detail";

export default {
  middleware: ["checkRoleUserDetail"],

  components: {
    ModalDetail,
  },

  head() {
    return {
      title: "Posting TKBM",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Posting TKBM",

      url: "finance/posting-tkbm",
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
        posting_tkbm_details: [],
        list_tkbm: {},
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
        posting_tkbm_details: [],
      },

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchCoaBiaya: false,
      isLoadingGetCoaBiaya: false,
      coa_biaya_search: "",

      isStopSearchDivisi: false,
      isLoadingGetDivisi: false,
      divisi_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

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
          if (item != "posting_tkbm_details") {
            this.form[item] = res.data[item];
          }
        });
        this.form.gudang_id = res.data.gudang;
        this.form.coa_id = res.data.coa;
        this.form.coa_id_biaya = res.data.coa_biaya;
        this.form.divisi_id = res.data.divisi;
        this.form.pelanggan_id = res.data.pelanggan;

        this.form.posting_tkbm_details = res.data.posting_tkbm_details.map(
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
    await this.onSearchCoaBiaya();
    await this.onSearchDivisi();
    await this.onSearchPelanggan();
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
      return this.form.posting_tkbm_details.reduce((total, item) => {
        const nominal = parseFloat(item.total_tkbm) || 0;
        return total + nominal;
      }, 0);
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    onSelectJenis() {
      this.form.posting_tkbm_details = [];
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
          url: "finance/coa/get-coa",
          lookup: "custom2",
          query:
            "?search=" +
            this.coa_search +
            "&tipe=HARTA" +
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
    },

    onGetCoaBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoaBiaya);

      this.isStopSearchCoaBiaya = setTimeout(() => {
        this.coa_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchCoaBiaya();
      }, 600);
    },

    async onSearchCoaBiaya() {
      if (!this.isLoadingGetCoaBiaya) {
        this.isLoadingGetCoaBiaya = true;

        await this.lookUp({
          url: "finance/jurnal/get-coa",
          lookup: "custom6",
          query:
            "?search=" +
            this.coa_biaya_search +
            "&tipe=BIAYA" +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoaBiaya = false;
      }
    },

    async onSelectCoaBiaya(item) {
      this.form.coa_id_biaya = item;
      this.coa_biaya_search = "";
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

    async addDetailTKBM() {
      if (
        !this.form.periode_awal ||
        !this.form.periode_akhir ||
        !this.form.jenis ||
        !this.form.gudang_id
      ) {
        this.$toaster.error(
          "Mohon Pilih Jenis, Gudang, Periode Awal dan Akhir Terlebih Dahulu!"
        );
        return;
      }
      let daftarDetail = await this.$axios.get(
        "finance/posting-tkbm/get-daftar-detail-tkbm",
        {
          params: {
            gudang_id: this.form.gudang_id.gudang_id,
            periode_awal: this.form.periode_awal,
            periode_akhir: this.form.periode_akhir,
            jenis: this.form.jenis,
          },
        }
      );

      if (daftarDetail.data.length === 0) {
        this.$toaster.error("Tidak ada detail TKBM pada periode tersebut");
        return;
      }

      this.form.posting_tkbm_details = daftarDetail.data.map((item) => {
        return {
          ...item,
        };
      });
    },

    onDeleteDetails(index, item) {
      this.form.posting_tkbm_details = this.form.posting_tkbm_details.filter(
        (_, itemIndex) => index !== itemIndex
      );
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
      // console.log(listDetail.data);
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "finance/posting-tkbm";

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
      };

      formData.posting_tkbm_details = this.form.posting_tkbm_details.map(
        (item) => {
          return {
            total_tkbm: item.total_tkbm ?? 0,
            inbound_detail_id: item.inbound_detail_id ?? "",
            pick_order_detail_id: item.pick_order_detail_id ?? "",
            lokasi_id: item.lokasi_id ?? "",
            supplier_id: item.supplier_id ?? "",
            item_id: item.item_id ?? "",
            item_gudang_id: item.item_gudang_id ?? "",
            item_pelanggan_id: item.item_pelanggan_id ?? "",
            valuation_id: item.valuation_id ?? "",
            quantity: item.quantity ?? 0,
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
              " Posting TKBM"
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
