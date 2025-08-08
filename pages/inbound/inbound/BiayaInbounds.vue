<template>
  <div>
    <div class="w-full flex justify-between items-center">
      <h1 class="text-xl font-bold">Biaya Inbound</h1>
      <div class=" ">
        <!-- <button
          type="button"
          @click="AddBiayaInbound"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Biaya Inbound</p>
        </button> -->
      </div>
    </div>
    <div class="table-responsive overflow-y-hidden mb-7">
      <table
        class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
        :class="self.form.biaya_inbounds.length ? 'mb-[300px]' : ''"
      >
        <thead>
          <tr class="text-sm uppercase text-nowrap">
            <th class="w-[200px] border border-gray-300">Item</th>
            <th class="w-[200px] border border-gray-300">Jenis Biaya</th>
            <th class="w-[200px] border border-gray-300">Nominal Satuan</th>
            <th class="w-[200px] border border-gray-300">Jumlah</th>
            <th class="w-[200px] border border-gray-300">Total</th>
            <th class="w-[200px] border border-gray-300">COA</th>
            <th class="w-[200px] border border-gray-300">Divisi</th>
            <th class="w-[200px] border border-gray-300">Vendor</th>
            <th class="w-[300px] border border-gray-300">Keterangan</th>
            <!-- <th class="w-20 border border-gray-300 text-center">Delete</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in self.form.biaya_inbounds"
            :key="index"
            style="border-top: 0.5px solid lightgray"
            class="align-top mx-0"
          >
            <td class="border border-gray-300">
              {{ item.item_gudang.nama_item }}
              {{ item.item_gudang.kode_item }}
            </td>
            <td class="border border-gray-300">
              <v-select
                label="nama_jenis_biaya"
                :loading="isLoadingGetJenisBiaya"
                :options="lookup_custom7.data"
                :filterable="false"
                @search="onGetJenisBiaya"
                v-model="item.jenis_biaya_id"
                :reduce="(item) => item.jenis_biaya_id"
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
                    @click="onGetJenisBiaya(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom7.last_page > lookup_custom7.current_page
                    "
                    @click="onGetJenisBiaya(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <money
                v-model="item.nominal_satuan"
                @change="totalValue(item, index)"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </td>
            <td class="border border-gray-300">
              <money
                v-model="item.jumlah"
                @change="totalValue(item, index)"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </td>
            <td class="border border-gray-300">
              <!-- :value="this.totalValue(item, index)" -->
              <money
                disabled
                :value="item.nominal_satuan * item.jumlah"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </td>
            <td class="border border-gray-300">
              <v-select
                label="nama_coa"
                :loading="isLoadingGetCoa"
                :options="lookup_custom8.data"
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
                  v-if="lookup_custom8.data.length || search"
                >
                  <span
                    v-if="lookup_custom8.current_page > 1"
                    @click="onGetCoa(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom8.last_page > lookup_custom8.current_page
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
                :options="lookup_custom9.data"
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
                  v-if="lookup_custom9.data.length || search"
                >
                  <span
                    v-if="lookup_custom9.current_page > 1"
                    @click="onGetDivisi(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom9.last_page > lookup_custom9.current_page
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
                :options="lookup_custom10.data"
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
                  v-if="lookup_custom10.data.length || search"
                >
                  <span
                    v-if="lookup_custom10.current_page > 1"
                    @click="onGetVendor(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom10.last_page > lookup_custom10.current_page
                    "
                    @click="onGetVendor(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </td>
            <td class="border border-gray-300">
              <textarea
                placeholder="Keterangan"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                v-model="item.keterangan"
              ></textarea>
            </td>
            <!-- <td class="text-center text-gray-600 border border-gray-300">
              <i
                class="fas fa-trash mx-auto"
                style="cursor: pointer"
                @click="onDeleteItem(index)"
              ></i>
            </td> -->
          </tr>
          <tr v-if="!self.form.biaya_inbounds.length > 0">
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
    };
  },

  async mounted() {
    await this.onSearchJenisBiaya();
    await this.onSearchCoa();
    await this.onSearchDivisi();
    await this.onSearchVendor();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",

      "lookup_custom6",
      "lookup_custom7",
      "lookup_custom8",
      "lookup_custom9",
      "lookup_custom10",

      "lookup_beam",

      "lookup_suppliers",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    AddBiayaInbound() {
      this.self.form.biaya_inbounds.push({
        biaya_inbound_id: "",
        jenis_biaya_id: "",
        jenis: 0,
        nominal_satuan: "",
        jumlah: "",
        total: "",
        coa_id: "",
        divis_id: "",
        vendor_id: "",
      });
    },

    onDeleteItem(index) {
      this.self.form.biaya_inbounds = this.self.form.biaya_inbounds.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },

    // get jenis biaya
    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchJenisBiaya = setTimeout(() => {
        this.jenis_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "custom7",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisBiaya = false;
      }
    },

    // get coa
    onGetCoa(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoa);

      this.isStopSearchCoa = setTimeout(() => {
        this.coa_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchCoa();
      }, 600);
    },

    async onSearchCoa() {
      if (!this.isLoadingGetCoa) {
        this.isLoadingGetCoa = true;

        await this.lookUp({
          url: "finance/coa/get-coa",
          lookup: "custom8",
          query:
            "?search=" +
            this.coa_search +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    // get coa
    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom9",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDivisi = false;
      }
    },

    // get coa
    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom10",
          query:
            "?search=" +
            this.vendor_search +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
      }
    },

    totalValue(item, index) {
      const total = item.jumlah * item.nominal_satuan;
      this.self.form.biaya_inbounds[index].total = total;

      console.log(total);
    },
  },
};
</script>
