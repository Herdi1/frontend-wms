<template>
  <div>
    <div class="w-full flex justify-between items-center">
      <h1 class="text-xl font-bold">Biaya Lastmile</h1>
      <div class=" ">
        <!-- <button
          type="button"
          @click="AddDetailBiaya"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Detail Biaya</p>
        </button> -->
      </div>
    </div>
    <div class="table-responsive overflow-y-hidden mb-7">
      <table
        class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
        :class="
          self.parameters.form.tagihan_lastmiles.length ? 'mb-[300px]' : ''
        "
      >
        <thead>
          <tr class="text-sm uppercase text-nowrap w-full">
            <th class="w-[150px] border border-gray-300">Jenis Transaksi</th>
            <th class="w-[150px] border border-gray-300">Jenis Routing</th>
            <th class="w-[200px] border border-gray-300">Jenis Biaya</th>
            <th class="w-[200px] border border-gray-300">Lokasi</th>
            <th class="w-[200px] border border-gray-300">Term Pembayaran</th>
            <th class="w-[200px] border border-gray-300">Jumlah</th>
            <th class="w-[200px] border border-gray-300">
              Biaya Per Kilometer
            </th>
            <th class="w-[200px] border border-gray-300">Payable To</th>
            <th class="w-[200px] border border-gray-300">Total</th>
            <th class="w-[200px] border border-gray-300">COA</th>
            <th class="w-[200px] border border-gray-300">Divisi</th>
            <th class="w-[200px] border border-gray-300">Vendor</th>
            <th class="w-[200px] border border-gray-300">Pelanggan</th>
            <th class="w-[200px] border border-gray-300">Keterangan</th>
            <th class="w-[100px] border border-gray-300 text-center">Hapus</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in self.parameters.form.tagihan_lastmiles"
            :key="i"
            class="border-t align-top"
          >
            <td class="border border-gray-300 text-center">
              <span
                v-if="item.jenis == 0"
                class="p-1 text-white rounded-md bg-orange-500"
                >Penjualan</span
              >
              <span
                v-if="item.jenis == 1"
                class="p-1 text-white rounded-md bg-green-500"
                >Stok Transfer</span
              >
            </td>
            <td class="border border-gray-300 text-center">
              <span
                v-if="item.jenis_routing == 'KOSONG'"
                class="p-1 text-white rounded-md bg-orange-500"
                >Kosong</span
              >
              <span
                v-if="item.jenis_routing == 'MUAT'"
                class="p-1 text-white rounded-md bg-green-500"
                >Muat</span
              >
            </td>
            <td class="border border-gray-300">
              <div class="w-full">
                <v-select
                  disabled
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                  label="nama_jenis_biaya"
                  :loading="isLoadingGetJenisBiaya"
                  :options="lookup_custom5.data"
                  :filterable="false"
                  @search="onGetJenisBiaya"
                  v-model="item.jenis_biaya_id"
                >
                  <!-- @input="(item) => onSelectItemGudang(item, index)" -->
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

                <p v-if="item.item_gudang_id">
                  {{ item.item_gudang_id.nama_item }}
                </p>
              </div>
            </td>
            <td class="border border-gray-300">
              <v-select
                disabled
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_lokasi"
                :loading="isLoadingGetLokasi"
                :options="lookup_location.data"
                :filterable="false"
                @search="onGetLokasi"
                v-model="item.lokasi_id"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_location.data.length || search"
                >
                  <span
                    v-if="lookup_location.current_page > 1"
                    @click="onGetLokasi(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_location.last_page > lookup_location.current_page
                    "
                    @click="onGetLokasi(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <div class="w-full">
                <v-select
                  disabled
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                  label="nama_term_pembayaran"
                  :loading="isLoadingGetTermPembayaran"
                  :options="lookup_custom10.data || []"
                  :filterable="false"
                  @search="onGetTermPembayaran"
                  v-model="item.term_pembayaran_id"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom10.data.length || search"
                  >
                    <span
                      v-if="lookup_custom10.current_page > 1"
                      @click="onGetTermPembayaran(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom10.last_page > lookup_custom10.current_page
                      "
                      @click="onGetTermPembayaran(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </td>
            <td class="border border-gray-300">
              <money
                v-model="item.jumlah"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
              />
            </td>
            <td class="border border-gray-300">
              <money
                disabled
                :value="
                  item.jenis_routing === 'MUAT'
                    ? item.biaya_perkm_muat
                    : item.biaya_perkm_kosong
                "
                class="w-full pl-2 py-1 border rounded focus:outline-none"
              />
            </td>
            <td class="border border-gray-300">
              <select
                name="payable_to"
                id="payable_to"
                v-model="item.payable_to"
                class="p-1 w-full border border-gray-300 outline-none rounded-sm"
              >
                <option value="DRIVER">Driver</option>
                <option value="VENDOR">Vendor</option>
              </select>
            </td>
            <td class="border border-gray-300">
              <money
                disabled
                :value="item.total"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
              />
            </td>
            <td class="border border-gray-300">
              <v-select
                label="nama_coa"
                :loading="isLoadingGetCoa"
                :options="lookup_custom7.data"
                :filterable="false"
                @search="onGetCoa"
                v-model="item.coa_id"
                :reduce="(item) => item.coa_id"
                class="w-full"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom7.data.length || search"
                >
                  <span
                    v-if="lookup_custom7.current_page > 1"
                    @click="onGetCoa(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom7.last_page > lookup_custom7.current_page
                    "
                    @click="onGetCoa(search, true)"
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
                :options="lookup_custom8.data"
                :filterable="false"
                @search="onGetDivisi"
                v-model="item.divisi_id"
                :reduce="(item) => item.divisi_id"
                class="w-full"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom8.data.length || search"
                >
                  <span
                    v-if="lookup_custom8.current_page > 1"
                    @click="onGetDivisi(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom8.last_page > lookup_custom8.current_page
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
                label="nama_vendor"
                :loading="isLoadingGetVendor"
                :options="lookup_custom9.data"
                :filterable="false"
                @search="onGetVendor"
                v-model="item.vendor_id"
                :reduce="(item) => item.vendor_id"
                class="w-full"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom9.data.length || search"
                >
                  <span
                    v-if="lookup_custom9.current_page > 1"
                    @click="onGetVendor(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom9.last_page > lookup_custom9.current_page
                    "
                    @click="onGetVendor(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <v-select
                label="nama_pelanggan"
                :loading="isLoadingGetPelanggan"
                :options="lookup_customers.data"
                :filterable="false"
                @search="onGetPelanggan"
                v-model="item.pelanggan_id"
                :reduce="(item) => item.pelanggan_id"
                class="w-full"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_customers.data.length || search"
                >
                  <span
                    v-if="lookup_customers.current_page > 1"
                    @click="onGetPelanggan(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_customers.last_page > lookup_customers.current_page
                    "
                    @click="onGetPelanggan(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <textarea
                placeholder="Keterangan"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                v-model="item.keterangan"
              ></textarea>
            </td>
            <td class="text-center text-gray-600 border border-gray-300">
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="onDeleteDetailBiaya(i)"
              ></i>
            </td>
          </tr>
          <tr v-if="!self.parameters.form.tagihan_lastmiles.length > 0">
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
      isStopSearchJenisBiaya: false,
      isLoadingGetJenisBiaya: false,
      jenis_biaya_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchDivisi: false,
      isLoadingGetDivisi: false,
      divisi_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearchTermPembayaran: false,
      isLoadingGetTermPembayaran: false,
      term_pembayaran_search: "",

      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",
    };
  },

  async created() {
    await this.onSearchJenisBiaya();
    await this.onSearchCoa();
    await this.onSearchDivisi();
    await this.onSearchVendor();
    await this.onSearchTermPembayaran();
    await this.onSearchLokasi();
    await this.onSearchPelanggan();
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom5", //jenis_biaya
      "lookup_custom7", //coa
      "lookup_custom8", //divisi
      "lookup_custom9", //vendor
      "lookup_custom10", //term pembayaran
      "lookup_location",
      "lookup_customers",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    AddDetailBiaya() {
      this.self.parameters.form.tagihan_lastmiles.push({
        biaya_lastmile_id: "",
        lokasi_id: "",
        jenis_biaya_id: "",
        term_pembayaran_id: "",
        coa_id: "",
        divisi_id: "",
        vendor_id: "",
        pelanggan_id: "",
        nominal_satuan: "",
        jumlah: "",
        total: "",
        keterangan: "",
      });
    },

    onDeleteDetailBiaya(index) {
      this.self.parameters.form.tagihan_lastmiles =
        this.self.parameters.form.tagihan_lastmiles.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchZonaGudang = setTimeout(() => {
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

    onGetCoa(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoa);

      this.isStopSearchCoa = setTimeout(() => {
        this.coa_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchCoa();
      }, 600);
    },

    async onSearchCoa() {
      if (!this.isLoadingGetCoa) {
        this.isLoadingGetCoa = true;

        await this.lookUp({
          url: "finance/coa/get-coa",
          lookup: "custom7",
          query:
            "?search=" +
            this.coa_search +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom8",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDivisi = false;
      }
    },

    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom9",
          query:
            "?search=" +
            this.vendor_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
      }
    },

    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }

        this.onSearchPelanggan();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "customers",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_customers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    onGetTermPembayaran(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTermPembayaran);

      this.isStopSearchTermPembayaran = setTimeout(() => {
        this.term_pembayaran_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchTermPembayaran();
      }, 600);
    },

    async onSearchTermPembayaran() {
      if (!this.isLoadingGetTermPembayaran) {
        this.isLoadingGetTermPembayaran = true;

        await this.lookUp({
          url: "master/term-pembayaran/get-term-pembayaran",
          lookup: "custom10",
          query:
            "?search=" +
            this.term_pembayaran_search +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTermPembayaran = false;
      }
    },

    onGetLokasi(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchLokasi);

      this.isStopSearchLokasi = setTimeout(() => {
        this.lokasi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_location.current_page = isNext
            ? this.lookup_location.current_page + 1
            : this.lookup_location.current_page - 1;
        } else {
          this.lookup_location.current_page = 1;
        }
        this.onSearchLokasi();
      }, 600);
    },

    async onSearchLokasi() {
      if (!this.isLoadingGetLokasi) {
        this.isLoadingGetLokasi = true;

        await this.lookUp({
          url: "master/lokasi/get-lokasi",
          lookup: "location",
          query:
            "?search=" +
            this.lokasi_search +
            "&page=" +
            this.lookup_location.current_page +
            "&per_page=10",
        });
        this.isLoadingGetLokasi = false;
      }
    },
  },
};
</script>
