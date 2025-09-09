<template>
  <div>
    <div class="w-full flex justify-between items-center">
      <h1 class="text-xl font-bold">Detail Biaya Konversi</h1>
      <div class=" ">
        <button
          type="button"
          @click="addDetailBiaya"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Biaya</p>
        </button>
      </div>
    </div>
    <div class="table-responsive overflow-y-hidden mb-7 min-h-[300px]">
      <table
        class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
        :class="
          self.parameters.form.biaya_konversi_details.length ? 'mb-[300px]' : ''
        "
      >
        <thead>
          <tr class="text-sm uppercase text-nowrap">
            <th class="w-[200px] border border-gray-300">Jenis Biaya</th>
            <!-- <th class="w-[200px] border border-gray-300">Divisi</th> -->
            <th class="w-[200px] border border-gray-300">COA</th>
            <th class="w-[200px] border border-gray-300">Quantity</th>
            <!-- <th class="w-[200px] border border-gray-300">Berat</th>
            <th class="w-[200px] border border-gray-300">Volume</th> -->
            <th class="w-[200px] border border-gray-300">Nominal Satuan</th>
            <th class="w-[200px] border border-gray-300">Sub Total</th>
            <th class="w-[300px] border border-gray-300">Keterangan</th>
            <th class="w-[60px] border border-gray-300">Hapus</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in this.self.parameters.form
              .biaya_konversi_details"
            :key="index"
            class="align-top"
          >
            <td class="border border-gray-300 text-center">
              <v-select
                label="nama_jenis_biaya"
                :loading="isLoadingGetJenisBiaya"
                :options="lookup_custom1.data"
                :filterable="false"
                @search="onGetJenisBiaya"
                v-model="item.jenis_biaya_id"
                class="w-full"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom1.data.length || search"
                >
                  <span
                    v-if="lookup_custom1.current_page > 1"
                    @click="onGetJenisBiaya(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom1.last_page > lookup_custom1.current_page
                    "
                    @click="onGetJenisBiaya(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <!-- <td class="border border-gray-300 text-center">
              <v-select
                label="nama_divisi"
                :loading="isLoadingGetDivisi"
                :options="lookup_custom3.data"
                :filterable="false"
                @search="onGetDivisi"
                v-model="item.divisi_id"
                class="w-full"
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
                      lookup_custom3.last_page > lookup_custom3.current_page
                    "
                    @click="onGetDivisi(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td> -->
            <td class="border border-gray-300">
              <v-select
                label="nama_coa"
                :loading="isLoadingGetCoa"
                :options="lookup_custom2.data"
                :filterable="false"
                @search="onGetCoa"
                v-model="item.coa_id"
                class="w-full"
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
                      lookup_custom2.last_page > lookup_custom2.current_page
                    "
                    @click="onGetCoa(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <money
                v-model="item.jumlah"
                class="w-full mb-2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </td>
            <!-- <td class="border border-gray-300">
              <money
                v-model="item.berat"
                class="w-full mb-2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </td>
            <td class="border border-gray-300">
              <money
                v-model="item.volume"
                class="w-full mb-2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </td> -->
            <td class="border border-gray-300">
              <money
                v-model="item.nominal_satuan"
                class="w-full mb-2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </td>
            <td class="border border-gray-300">
              <money
                disabled
                v-model="item.total"
                class="w-full mb-2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </td>
            <td class="border border-gray-300">
              <textarea
                placeholder="Keterangan"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                v-model="item.keterangan"
              ></textarea>
            </td>
            <td class="border border-gray-300 text-center">
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="deleteDetailBiaya(index)"
              ></i>
            </td>
          </tr>
          <tr>
            <td colspan="4" class="border border-gray-300 text-right">
              Grand Total
            </td>
            <td class="border border-gray-300 text-right">
              {{ calculateTotal ?? 0 | formatPrice }}
            </td>
            <td colspan="2" class="border border-gray-300 text-center"></td>
          </tr>
          <tr v-if="!this.self.parameters.form.biaya_konversi_details">
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
import { mapActions, mapState } from "vuex";

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
    };
  },

  watch: {
    "self.parameters.form.biaya_konversi_details": {
      handler(newVal) {
        newVal.forEach((item) => {
          item.total =
            parseFloat(item.jumlah) * parseFloat(item.nominal_satuan) || 0;
        });
      },
      immediate: true,
      deep: true,
    },
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_custom4",
    ]),

    calculateTotal() {
      let grandTotal = 0;

      this.self.parameters.form.biaya_konversi_details.forEach((item) => {
        grandTotal += parseFloat(item.total);
      });

      return grandTotal;
    },
  },

  async mounted() {
    await this.onSearchJenisBiaya();
    await this.onSearchDivisi();
    await this.onSearchCoa();
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    addDetailBiaya() {
      this.self.parameters.form.biaya_konversi_details.push({
        dasar_perhitungan: "QTY",
        jenis_biaya_id: "",
        coa_id: "",
        divisi_id: "",
        nominal_satuan: 0,
        berat: 1,
        volume: 1,
        jumlah: 0,
        total: 0,
        keterangan: "",
      });
    },

    deleteDetailBiaya(index) {
      this.self.parameters.form.biaya_konversi_details =
        this.self.parameters.form.biaya_konversi_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchJenisBiaya = setTimeout(() => {
        this.jenis_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "custom1",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_custom1.current_page +
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
            "&tipe=BIAYA" +
            "&page=" +
            this.lookup_custom2.current_page +
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
  },
};
</script>
