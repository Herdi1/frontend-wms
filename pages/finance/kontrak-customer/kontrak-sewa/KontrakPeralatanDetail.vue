<template>
  <div>
    <div class="w-full flex justify-between items-center">
      <h1 class="text-xl font-bold">Detail Sewa Peralatan</h1>
      <div class=" ">
        <button
          type="button"
          @click="addDetailPeralatan"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Detail</p>
        </button>
      </div>
    </div>
    <div class="table-responsive overflow-y-hidden mb-7">
      <table
        class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
        :class="
          self.parameters.form.kontrak_sewa_peralatan_details.length
            ? 'mb-[300px]'
            : ''
        "
      >
        <thead>
          <tr class="uppercase">
            <th class="w-52 border border-gray-300">Nilai Kontrak</th>
            <th class="w-52 border border-gray-300">Jenis Kontrak</th>
            <th class="w-52 border border-gray-300">Divisi</th>
            <th class="w-52 border border-gray-300">Jenis Biaya</th>
            <th class="w-52 border border-gray-300">Pembayaran</th>
            <th class="w-52 border border-gray-300">Gudang</th>
            <th class="w-52 border border-gray-300">Term Pembayaran</th>
            <th class="w-52 border border-gray-300">Jenis Peralatan</th>
            <th class="w-52 border border-gray-300">Luas</th>
            <th class="w-52 border border-gray-300">Dasar Perhitungan</th>
            <th class="w-20 border border-gray-300">Hapus</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in self.parameters.form
              .kontrak_sewa_peralatan_details"
            :key="i"
            class="border-t align-top"
          >
            <td class="border border-gray-300">
              <money
                v-model="item.nilai_kontrak"
                class="w-full mb-2 pl-2 py-1 border rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="kode_mata_uang"
                :loading="isLoadingGetMataUang"
                :options="lookup_customers.data"
                :filterable="false"
                @search="onGetMataUang"
                v-model="item.mata_uang_id"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_customers.data.length || search"
                >
                  <span
                    v-if="lookup_customers.current_page > 1"
                    @click="onGetMataUang(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_customers.last_page > lookup_customers.current_page
                    "
                    @click="onGetMataUang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_jenis_kontrak"
                :loading="isLoadingGetJenisKontrak"
                :options="lookup_custom3.data"
                :filterable="false"
                @search="onGetJenisKontrak"
                v-model="item.jenis_kontrak_id"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom3.data.length || search"
                >
                  <span
                    v-if="lookup_custom3.current_page > 1"
                    @click="onGetJenisKontrak(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom3.last_page > lookup_custom3.current_page
                    "
                    @click="onGetJenisKontrak(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_divisi"
                :loading="isLoadingGetDivisi"
                :options="lookup_custom4.data"
                :filterable="false"
                @search="onGetDivisi"
                v-model="item.divisi_id"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom4.data.length || search"
                >
                  <span
                    v-if="lookup_custom4.current_page > 1"
                    @click="onGetDivisi(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom4.last_page > lookup_custom4.current_page
                    "
                    @click="onGetDivisi(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_jenis_biaya"
                :loading="isLoadingGetJenisBiaya"
                :options="lookup_custom5.data"
                :filterable="false"
                @search="onGetJenisBiaya"
                v-model="item.jenis_biaya_id"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom5.data.length || search"
                >
                  <span
                    v-if="lookup_custom5.current_page > 1"
                    @click="onGetJenisBiaya(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom5.last_page > lookup_custom5.current_page
                    "
                    @click="onGetJenisBiaya(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <p>Dibayarkan Kepada:</p>
              <select
                name="payable_to"
                id="payable_to"
                v-model="item.payable_to"
                class="w-full p-1 mb-2 rounded-sm border border-gray-300 outline-none"
              >
                <option value="DRIVER">Driver</option>
                <option value="VENDOR">Vendor</option>
                <option value="PIC">PIC</option>
              </select>
              <p>Pembayaran:</p>
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_pembayaran"
                :loading="isLoadingGetPembayaran"
                :options="lookup_suppliers.data"
                :filterable="false"
                @search="onGetpembayaran"
                v-model="item.pembayaran_id"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_suppliers.data.length || search"
                >
                  <span
                    v-if="lookup_suppliers.current_page > 1"
                    @click="onGetPembayaran(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_suppliers.last_page > lookup_suppliers.current_page
                    "
                    @click="onGetPembayaran(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_gudang"
                :loading="isLoadingGetGudang"
                :options="lookup_custom6.data"
                :filterable="false"
                @search="onGetGudang"
                v-model="item.gudang_id"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom6.data.length || search"
                >
                  <span
                    v-if="lookup_custom6.current_page > 1"
                    @click="onGetGudang(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom6.last_page > lookup_custom6.current_page
                    "
                    @click="onGetGudang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_term_pembayaran"
                :loading="isLoadingGetTerm"
                :options="lookup_custom7.data"
                :filterable="false"
                @search="onGetTerm"
                v-model="item.term_pembayaran_id"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom7.data.length || search"
                >
                  <span
                    v-if="lookup_custom7.current_page > 1"
                    @click="onGetTerm(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom7.last_page > lookup_custom7.current_page
                    "
                    @click="onGetTerm(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_jenis_peralatan"
                :loading="isLoadingGetPeralatan"
                :options="lookup_custom9.data"
                :filterable="false"
                @search="onGetPeralatan"
                v-model="item.jenis_peralatan_id"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom9.data.length || search"
                >
                  <span
                    v-if="lookup_custom9.current_page > 1"
                    @click="onGetPeralatan(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom9.last_page > lookup_custom9.current_page
                    "
                    @click="onGetPeralatan(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <p>Luas:</p>
              <money
                v-model="item.luas"
                class="w-full mb-2 pl-2 py-1 border rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
              <p>Satuan Luas:</p>
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_satuan"
                :loading="isLoadingGetSatuan"
                :options="lookup_custom8.data"
                :filterable="false"
                @search="onGetSatuan"
                v-model="item.satuan_id_luas"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom8.data.length || search"
                >
                  <span
                    v-if="lookup_custom8.current_page > 1"
                    @click="onGetSatuan(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom8.last_page > lookup_custom8.current_page
                    "
                    @click="onGetSatuan(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300 text-center">
              <select
                name="dasar_perhitungan"
                id="dasar_perhitungan"
                v-model="item.dasar_perhitungan"
                class="w-full p-1 mb-2 rounded-sm border border-gray-300 outline-none"
              >
                <option value="LUAS">Luas</option>
                <option value="FLAT">Flat</option>
              </select>
            </td>
            <td class="border border-gray-300 text-center">
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="onDeletePeralatan(i)"
              ></i>
            </td>
          </tr>
          <tr
            v-if="
              !self.parameters.form.kontrak_sewa_peralatan_details.length > 0
            "
          >
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
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["self"],

  data() {
    return {
      isStopSearchJenisKontrak: false,
      isLoadingGetJenisKontrak: false,
      jenis_kontrak_search: "",

      isStopSearchDivisi: false,
      isLoadingGetDivisi: false,
      divisi_search: "",

      isStopSearchJenisBiaya: false,
      isLoadingGetJenisBiaya: false,
      jenis_biaya_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchTerm: false,
      isLoadingGetTerm: false,
      term_search: "",

      isStopSearchSatuan: false,
      isLoadingGetSatuan: false,
      satuan_search: "",

      isStopSearchPeralatan: false,
      isLoadingGetPeralatan: false,
      peralatan_search: "",

      isStopSearchPembayaran: false,
      isLoadingGetPembayaran: false,
      pembayaran_search: "",

      isStopSearchMataUang: false,
      isLoadingGetMataUang: false,
      mata_uang_search: "",
    };
  },

  async mounted() {
    await this.onSearchDivisi();
    await this.onSearchGudang();
    await this.onSearchJenisBiaya();
    await this.onSearchJenisKontrak();
    await this.onSearchTerm();
    await this.onSearchSatuan();
    await this.onSearchPeralatan();
    await this.onSearchPembayaran();
    await this.onSearchMataUang();
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom3", //jenis kontrak
      "lookup_custom4", //divisi
      "lookup_custom5", //jenis biaya
      "lookup_custom6", //gudang
      "lookup_custom7", //term
      "lookup_custom8", //satuan
      "lookup_custom9", //peralatan
      "lookup_suppliers", //pembayaran
      "lookup_customers", //mata uang
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    addDetailPeralatan() {
      this.self.parameters.form.kontrak_sewa_peralatan_details.push({
        jenis_kontrak_id: "",
        divisi_id: "",
        jenis_biaya_id: "",
        gudang_id: "",
        term_pembayaran_id: "",
        jenis_peralatan_id: "",
        dasar_perhitungan: "",
        luas: "",
        satuan_id_luas: "",
        nilai_kontrak: "",
        payable_to: "",
        mata_uang_id: "",
        pembayaran_id: "",
      });
    },

    onDeletePeralatan(index) {
      this.self.parameters.form.kontrak_sewa_peralatan_details =
        this.self.parameters.form.kontrak_sewa_peralatan_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetJenisKontrak(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKontrak);

      this.isStopSearchJenisKontrak = setTimeout(() => {
        this.jenis_kontrak_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchJenisKontrak();
      }, 600);
    },

    async onSearchJenisKontrak() {
      if (!this.isLoadingGetJenisKontrak) {
        this.isLoadingGetJenisKontrak = true;

        await this.lookUp({
          url: "master/jenis-kontrak/get-jenis-kontrak",
          lookup: "custom3",
          query:
            "?search=" +
            this.jenis_kontrak_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisKontrak = false;
      }
    },

    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom4",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDivisi = false;
      }
    },

    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchJenisBiaya = setTimeout(() => {
        this.jenis_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "custom5",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisBiaya = false;
      }
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom6",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    onGetTerm(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTerm);

      this.isStopSearchTerm = setTimeout(() => {
        this.term_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchTerm();
      }, 600);
    },

    async onSearchTerm() {
      if (!this.isLoadingGetTerm) {
        this.isLoadingGetTerm = true;

        await this.lookUp({
          url: "master/term-pembayaran/get-term-pembayaran",
          lookup: "custom7",
          query:
            "?search=" +
            this.term_search +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTerm = false;
      }
    },

    onGetSatuan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuan);

      this.isStopSearchSatuan = setTimeout(() => {
        this.satuan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchSatuan();
      }, 600);
    },

    async onSearchSatuan() {
      if (!this.isLoadingGetSatuan) {
        this.isLoadingGetSatuan = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "custom8",
          query:
            "?search=" +
            this.satuan_search +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuan = false;
      }
    },

    onGetPeralatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPeralatan);

      this.isStopSearchPeralatan = setTimeout(() => {
        this.peralatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchPeralatan();
      }, 600);
    },

    async onSearchPeralatan() {
      if (!this.isLoadingGetPeralatan) {
        this.isLoadingGetPeralatan = true;

        await this.lookUp({
          url: "master/jenis-peralatan/get-jenis-peralatan",
          lookup: "custom9",
          query:
            "?search=" +
            this.peralatan_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPeralatan = false;
      }
    },

    onGetPembayaran(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPembayaran);

      this.isStopSearchPembayaran = setTimeout(() => {
        this.pembayaran_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchPembayaran();
      }, 600);
    },

    async onSearchPembayaran() {
      if (!this.isLoadingGetPembayaran) {
        this.isLoadingGetPembayaran = true;

        await this.lookUp({
          url: "master/pembayaran/get-pembayaran",
          lookup: "suppliers",
          query:
            "?search=" +
            this.pembayaran_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPembayaran = false;
      }
    },

    onGetMataUang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchMataUang);

      this.isStopSearchMataUang = setTimeout(() => {
        this.mata_uang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }

        this.onSearchMataUang();
      }, 600);
    },

    async onSearchMataUang() {
      if (!this.isLoadingGetMataUang) {
        this.isLoadingGetMataUang = true;

        await this.lookUp({
          url: "master/mata-uang/get-mata-uang",
          lookup: "customers",
          query:
            "?search=" +
            this.mata_uang_search +
            "&page=" +
            this.lookup_customers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetMataUang = false;
      }
    },
  },
};
</script>
