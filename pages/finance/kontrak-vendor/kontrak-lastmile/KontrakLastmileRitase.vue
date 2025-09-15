<template>
  <div>
    <div class="w-full flex justify-between items-center">
      <h1 class="text-xl font-bold">Detail Insentif Ritase</h1>
      <div class=" ">
        <button
          type="button"
          @click="addDetailRitase"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Detail</p>
        </button>
      </div>
    </div>
    <div class="table-responsive overflow-y-hidden mb-7">
      <table
        class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
        :class="
          this.self.parameters.form.kontrak_lastmile_ritase_details.length
            ? 'mb-[300px]'
            : ''
        "
      >
        <thead>
          <tr class="uppercase">
            <th class="w-60 border border-gray-300">Jenis Kontrak</th>
            <th class="w-60 border border-gray-300">Divisi</th>
            <th class="w-60 border border-gray-300">Jenis Biaya</th>
            <th class="w-60 border border-gray-300">Gudang</th>
            <th class="w-60 border border-gray-300">Mata Uang</th>
            <th class="w-60 border border-gray-300">Pembayaran</th>
            <th class="w-60 border border-gray-300">Term Pembayaran</th>
            <th class="w-60 border border-gray-300">Payable To</th>
            <th class="w-60 border border-gray-300">Jenis Kendaraan</th>
            <th class="w-60 border border-gray-300">Ritase Awal</th>
            <th class="w-60 border border-gray-300">Ritase Akhir</th>
            <th class="w-60 border border-gray-300">Nilai Kontrak</th>
            <th class="w-20 border border-gray-300">Hapus</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in this.self.parameters.form
              .kontrak_lastmile_ritase_details"
            :key="i"
            class="align-top"
          >
            <td class="border border-gray-300">
              <v-select
                label="nama_jenis_kontrak"
                :loading="isLoadingGetJenisKontrak"
                :options="lookup_custom3.data"
                :filterable="false"
                v-model="item.jenis_kontrak_id"
                @input="(item) => onSelectJenisKontrak(item, i)"
                class="w-full mb-2"
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
                label="nama_divisi"
                :loading="isLoadingGetDivisi"
                :options="lookup_custom4.data"
                :filterable="false"
                v-model="item.divisi_id"
                @input="(item) => onSelectDivisi(item, i)"
                class="w-full mb-2"
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
                label="nama_jenis_biaya"
                :loading="isLoadingGetJenisBiaya"
                :options="lookup_custom5.data"
                :filterable="false"
                v-model="item.jenis_biaya_id"
                @input="(item) => onSelectJenisBiaya(item, i)"
                class="w-full mb-2"
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
              <v-select
                label="nama_gudang"
                :loading="isLoadingGetGudang"
                :options="lookup_custom6.data"
                :filterable="false"
                v-model="item.gudang_id"
                @input="(item) => onSelectGudang(item, i)"
                class="w-full mb-2"
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
                label="nama_mata_uang"
                :loading="isLoadingGetUang"
                :options="lookup_custom10.data"
                :filterable="false"
                v-model="item.mata_uang_id"
                @input="(item) => onSelectUang(item, i)"
                class="w-full mb-2"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom10.data.length || search"
                >
                  <span
                    v-if="lookup_custom10.current_page > 1"
                    @click="onGetUang(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom10.last_page > lookup_custom10.current_page
                    "
                    @click="onGetUang(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <v-select
                label="nama_pembayaran"
                :loading="isLoadingGetPembayaran"
                :options="lookup_custom7.data"
                :filterable="false"
                v-model="item.pembayaran_id"
                @input="(item) => onSelectPembayaran(item, i)"
                class="w-full mb-2"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom7.data.length || search"
                >
                  <span
                    v-if="lookup_custom7.current_page > 1"
                    @click="onGetPembayaran(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom7.last_page > lookup_custom7.current_page
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
                label="nama_term_pembayaran"
                :loading="isLoadingGetTerm"
                :options="lookup_custom8.data"
                :filterable="false"
                v-model="item.term_pembayaran_id"
                @input="(item) => onSelectTerm(item, i)"
                class="w-full mb-2"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom8.data.length || search"
                >
                  <span
                    v-if="lookup_custom8.current_page > 1"
                    @click="onGetTerm(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom8.last_page > lookup_custom8.current_page
                    "
                    @click="onGetTerm(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <select
                v-model="item.payable_to"
                name=""
                id=""
                class="pl-2 py-1 border border-gray-300 rounded focus:outline-none w-full"
              >
                <option value=""></option>
                <option value="DRIVER">Driver</option>
                <option value="VENDOR">Vendor</option>
                <option value="PIC">PIC</option>
              </select>
            </td>
            <td class="border border-gray-300">
              <v-select
                label="nama_jenis_kendaraan"
                :loading="isLoadingGetJenisKendaraan"
                :options="lookup_custom9.data"
                :filterable="false"
                v-model="item.jenis_kendaraan_id"
                @input="(item) => onSelectJenisKendaraan(item, i)"
                class="w-full mb-2"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom9.data.length || search"
                >
                  <span
                    v-if="lookup_custom9.current_page > 1"
                    @click="onGetJenisKendaraan(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom9.last_page > lookup_custom9.current_page
                    "
                    @click="onGetJenisKendaraan(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <money
                v-model="item.ritase_awal"
                class="w-full mb-2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </td>
            <td class="border border-gray-300">
              <money
                v-model="item.ritase_akhir"
                class="w-full mb-2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                :class="
                  item.ritase_awal > item.ritase_akhir ? 'text-red-500' : ''
                "
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </td>
            <td class="border border-gray-300">
              <money
                v-model="item.nilai_kontrak"
                class="w-full mb-2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </td>
            <td class="border border-gray-300 text-center">
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="deleteRitase(i)"
              ></i>
            </td>
          </tr>
          <tr
            v-if="
              !this.self.parameters.form.kontrak_lastmile_ritase_details
                .length > 0
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
import { mapActions, mapMutations, mapState } from "vuex";

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

      isStopSearchPembayaran: false,
      isLoadingGetPembayaran: false,
      pembayaran_search: "",

      isStopSearchTerm: false,
      isLoadingGetTerm: false,
      term_search: "",

      isStopSearchJenisKendaraan: false,
      isLoadingGetJenisKendaraan: false,
      jenis_kendaraan_search: "",

      isStopSearchUang: false,
      isLoadingGetUang: false,
      uang_search: "",
    };
  },

  async mounted() {
    await this.onSearchJenisKontrak();
    await this.onSearchDivisi();
    await this.onSearchJenisBiaya();
    await this.onSearchGudang();
    await this.onSearchPembayaran();
    await this.onSearchTerm();
    await this.onSearchJenisKendaraan();
    await this.onSearchUang();
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
      "lookup_custom7", //pembayaran
      "lookup_custom8", //term
      "lookup_custom9", //jenis kendaraan
      "lookup_custom10", //uang
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    addDetailRitase() {
      this.self.parameters.form.kontrak_lastmile_ritase_details.push({
        jenis_kontrak_id: "",
        divisi_id: "",
        jenis_biaya_id: "",
        gudang_id: "",
        mata_uang_id: "",
        pembayaran_id: "",
        term_pembayaran_id: "",
        ritase_awal: "",
        ritase_akhir: "",
        nilai_kontrak: "",
      });
    },

    deleteRitase(index) {
      this.self.parameters.form.kontrak_lastmile_ritase_details =
        this.self.parameters.form.kontrak_lastmile_ritase_details.filter(
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

    onGetPembayaran(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPembayaran);

      this.isStopSearchPembayaran = setTimeout(() => {
        this.pembayaran_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchPembayaran();
      }, 600);
    },

    async onSearchPembayaran() {
      if (!this.isLoadingGetPembayaran) {
        this.isLoadingGetPembayaran = true;

        await this.lookUp({
          url: "master/pembayaran/get-pembayaran",
          lookup: "custom7",
          query:
            "?search=" +
            this.pembayaran_search +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPembayaran = false;
      }
    },

    onGetTerm(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTerm);

      this.isStopSearchTerm = setTimeout(() => {
        this.term_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchTerm();
      }, 600);
    },

    async onSearchTerm() {
      if (!this.isLoadingGetTerm) {
        this.isLoadingGetTerm = true;

        await this.lookUp({
          url: "master/term-pembayaran/get-term-pembayaran",
          lookup: "custom8",
          query:
            "?search=" +
            this.term_search +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTerm = false;
      }
    },

    onGetJenisKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKendaraan);

      this.isStopSearchJenisKendaraan = setTimeout(() => {
        this.jenis_kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchJenisKendaraan();
      }, 600);
    },

    async onSearchJenisKendaraan() {
      if (!this.isLoadingGetJenisKendaraan) {
        this.isLoadingGetJenisKendaraan = true;

        await this.lookUp({
          url: "master/jenis-kendaraan/get-jenis-kendaraan",
          lookup: "custom9",
          query:
            "?search=" +
            this.jenis_kendaraan_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisKendaraan = false;
      }
    },

    onGetUang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchUang);

      this.isStopSearchUang = setTimeout(() => {
        this.uang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchUang();
      }, 600);
    },

    async onSearchUang() {
      if (!this.isLoadingGetUang) {
        this.isLoadingGetUang = true;

        await this.lookUp({
          url: "master/mata-uang/get-mata-uang",
          lookup: "custom10",
          query:
            "?search=" +
            this.uang_search +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetUang = false;
      }
    },

    onSelectJenisKontrak(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].jenis_kontrak_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].jenis_kontrak_id = "";
      }
    },

    onSelectDivisi(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].divisi_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].divisi_id = "";
      }
    },

    onSelectJenisBiaya(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].jenis_biaya_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].jenis_biaya_id = "";
      }
    },

    onSelectGudang(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].gudang_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].gudang_id = "";
      }
    },

    onSelectPembayaran(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].pembayaran_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].pembayaran_id = "";
      }
    },

    onSelectTerm(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].term_pembayaran_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].term_pembayaran_id = "";
      }
    },

    onSelectJenisKendaraan(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].jenis_kendaraan_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].jenis_kendaraan_id = "";
      }
    },

    onSelectUang(item, index) {
      if (item) {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].mata_uang_id = item;
      } else {
        this.self.parameters.form.kontrak_lastmile_ritase_details[
          index
        ].mata_uang_id = "";
      }
    },
  },
};
</script>
