<template>
  <div>
    <div class="w-full mb-5">
      <div
        class="flex flex-col w-full justify-between p-2 border border-gray-300 rounded-md"
      >
        <div class="grid grid-flow-col grid-rows-5 md:grid-rows-3 gap-2">
          <div class="flex">
            <label for="group_item_1" class="w-1/2">
              Group Item Level 1 <span class="text-danger">*</span>
            </label>
            <v-select
              label="nama_group_item"
              :loading="isLoadingGetGroupItem1"
              :options="lookup_custom4.data"
              :filterable="false"
              @search="onGetGroupItem1"
              v-model="filter_params.group_item_id_1"
              :reduce="(item) => item.group_item_id"
              class="w-1/2"
              @input="onSelectGroupItem1"
            >
              <!-- @input="onSelectGroupItem1" -->
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_custom4.data.length || search"
              >
                <span
                  v-if="lookup_custom4.current_page > 1"
                  @click="onGetGroupItem1(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_custom4.last_page > lookup_custom4.current_page"
                  @click="onGetGroupItem1(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>
          <div class="flex">
            <label for="group_item_2" class="w-1/2"> Group Item Level 2 </label>
            <v-select
              label="nama_group_item"
              :loading="isLoadingGetGroupItem2"
              :options="lookup_custom5.data"
              :filterable="false"
              @search="onGetGroupItem2"
              v-model="filter_params.group_item_id_2"
              :reduce="(item) => item.group_item_id"
              class="w-1/2"
              @input="onSelectGroupItem2"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_custom5.data.length || search"
              >
                <span
                  v-if="lookup_custom5.current_page > 1"
                  @click="onGetGroupItem2(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_custom5.last_page > lookup_custom5.current_page"
                  @click="onGetGroupItem2(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>
          <div class="flex">
            <label for="group_item_3" class="w-1/2"> Group Item Level 3 </label>
            <v-select
              label="nama_group_item"
              :loading="isLoadingGetGroupItem3"
              :options="lookup_custom6.data"
              :filterable="false"
              @search="onGetGroupItem3"
              v-model="filter_params.group_item_id_3"
              :reduce="(item) => item.group_item_id"
              class="w-1/2"
              @input="onSelectGroupItem3"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_custom6.data.length || search"
              >
                <span
                  v-if="lookup_custom6.current_page > 1"
                  @click="onGetGroupItem3(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_custom6.last_page > lookup_custom6.current_page"
                  @click="onGetGroupItem3(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>
          <div class="flex">
            <label for="group_item_4" class="w-1/2"> Group Item Level 4 </label>
            <v-select
              label="nama_group_item"
              :loading="isLoadingGetGroupItem4"
              :options="lookup_custom7.data"
              :filterable="false"
              @search="onGetGroupItem4"
              v-model="filter_params.group_item_id_4"
              :reduce="(item) => item.group_item_id"
              class="w-1/2"
              @input="onSelectGroupItem4"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_custom7.data.length || search"
              >
                <span
                  v-if="lookup_custom7.current_page > 1"
                  @click="onGetGroupItem4(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_custom7.last_page > lookup_custom7.current_page"
                  @click="onGetGroupItem4(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>
          <div class="flex">
            <label for="group_item_5" class="w-1/2"> Group Item Level 5 </label>
            <v-select
              label="nama_group_item"
              :loading="isLoadingGetGroupItem5"
              :options="lookup_custom8.data"
              :filterable="false"
              @search="onGetGroupItem5"
              v-model="filter_params.group_item_id_5"
              :reduce="(item) => item.group_item_id"
              class="w-1/2"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_custom8.data.length || search"
              >
                <span
                  v-if="lookup_custom8.current_page > 1"
                  @click="onGetGroupItem5(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_custom8.last_page > lookup_custom8.current_page"
                  @click="onGetGroupItem5(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>
        </div>
      </div>
      <div class="flex mt-5 gap-3">
        <button
          type="button"
          @click="onLoad"
          class="bg-blue-500 flex gap-1 justify-center items-center hover:bg-blue-600 p-2 text-white rounded-md mb-3 text-center"
        >
          <i class="fa fa-plus text-white font-bold mr-2"></i>
          <p>Tambah</p>
          <!-- Tambah ke Item Gudang -->
        </button>
        <button
          type="button"
          @click="deleteSelectedItem"
          class="flex gap-1 justify-center items-center bg-red-500 hover:bg-red-600 p-2 text-white rounded-md mb-3 text-center"
        >
          <i class="fa fa-trash text-white font-bold mr-2"></i>
          <p>Hapus</p>
          <!-- Hapus Item Gudang -->
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <table
        class="mb-5 table-fixed border border-collapse border-gray-300"
        ref="formContainer"
      >
        <thead>
          <tr class="text-base uppercase text-nowrap">
            <th class="w-[50px] text-center border border-gray-300">
              <input
                type="checkbox"
                name=""
                v-model="selectAll"
                @change="toggleAllCheckboxes"
              />
            </th>
            <th class="w-[75px] border border-gray-300">Detail</th>
            <th class="w-[50px] border border-gray-300">No</th>
            <th
              @click="
                onSort(
                  'nama_item',
                  parameters.params.sort == 'asc' ? 'desc' : 'asc'
                )
              "
              class="w-[200px] border border-gray-300"
            >
              <div class="flex justify-between items-baseline">
                <div>Nama Item</div>
                <div>
                  <i
                    class="fas fa-caret-up"
                    :class="
                      parameters.params.order == 'nama_item' &&
                      parameters.params.sort == 'asc'
                        ? ''
                        : 'light-gray'
                    "
                  ></i>
                  <i
                    class="fas fa-caret-down"
                    :class="
                      parameters.params.order == 'nama_item' &&
                      parameters.params.sort == 'desc'
                        ? ''
                        : 'light-gray'
                    "
                  ></i>
                </div>
              </div>
            </th>
            <th class="w-[200px] border border-gray-300">Referensi SAP</th>
            <th class="w-[200px] border border-gray-300">Supplier</th>
            <th class="w-[200px] border border-gray-300">Vendor</th>
            <th class="w-[200px] border border-gray-300">Group Item</th>
            <th class="w-[200px] border border-gray-300">Batas Item</th>
            <th class="w-[200px] border border-gray-300">Kategori Item</th>
            <th class="w-[200px] border border-gray-300">Jumlah Palet</th>
            <th class="w-[200px] border border-gray-300">Kapasitas Palet</th>
            <th class="w-[200px] border border-gray-300">Kebutuhan Palet</th>
            <th class="w-[200px] border border-gray-300">Maksimal Tumpukan</th>
            <th class="w-[200px] border border-gray-300">Berat</th>
            <th class="w-[200px] border border-gray-300">Dimensi</th>
            <th class="w-[200px] border border-gray-300">Warna</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in this.self.form.item_pelanggans"
            :key="i"
            class="align-top"
          >
            <td class="border border-gray-300 text-center">
              <input
                type="checkbox"
                name="item"
                :value="item.item_id"
                v-model="checkboxs"
                @change="checkIfAllSelected"
                id=""
              />
            </td>
            <td class="border border-gray-300 text-center">
              <small-detail-button @click="onDetail(item)" />
            </td>
            <td class="border border-gray-300">
              {{
                (parameters.params.page - 1) * parameters.params.per_page +
                i +
                1
              }}
            </td>
            <td class="border border-gray-300">{{ item.nama_item }}</td>
            <td class="border border-gray-300">
              <input-form
                label=""
                type="text"
                name="kode_sap"
                :required="false"
                v-model="item.kode_sap"
              />
            </td>
            <td class="border border-gray-300">
              {{
                item.supplier ? item.supplier.nama_supplier : "Tidak Ditemukan"
              }}
            </td>
            <td class="border border-gray-300">
              <ValidationProvider
                name="vendor_id"
                rules="required"
                class="w-full"
              >
                <div>
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
                    >
                      <span
                        @click="onGetVendor(search, false)"
                        v-if="lookup_custom9.current_page > 1"
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
                </div>
              </ValidationProvider>
            </td>
            <td class="border border-gray-300">
              <span>
                <p v-if="item.group_item_1">
                  {{
                    item.group_item_1
                      ? item.group_item_1.nama_group_item
                      : "Tidak Ditemukan"
                  }}
                </p>
                <p v-if="item.group_item_2">
                  {{
                    item.group_item_2
                      ? item.group_item_2.nama_group_item
                      : "Tidak Ditemukan"
                  }}
                </p>
                <p v-if="item.group_item_3">
                  {{
                    item.group_item_3
                      ? item.group_item_3.nama_group_item
                      : "Tidak Ditemukan"
                  }}
                </p>
                <p v-if="item.group_item_4">
                  {{
                    item.group_item_4
                      ? item.group_item_4.nama_group_item
                      : "Tidak Ditemukan"
                  }}
                </p>
                <p v-if="item.group_item_5">
                  {{
                    item.group_item_5
                      ? item.group_item_5.nama_group_item
                      : "Tidak Ditemukan"
                  }}
                </p>
              </span>
            </td>

            <td class="border border-gray-300">
              <div class="flex gap-2">
                <i class="fa fa-caret-up text-green-300"></i>
                <p>{{ item.batas_atas }}</p>
              </div>
              <div class="flex gap-2">
                <i class="fa fa-caret-down text-red-300"></i>
                <p>{{ item.batas_bawah }}</p>
              </div>
            </td>

            <td class="border border-gray-300">
              <div>
                <p v-if="item.kategori_1">
                  {{
                    item.kategori_1
                      ? item.kategori_1.nama_kategori_item
                      : "Tidak Ditemukan"
                  }}
                </p>
                <p v-if="item.kategori_2">
                  {{
                    item.kategori_2
                      ? item.kategori_2.nama_kategori_item
                      : "Tidak Ditemukan"
                  }}
                </p>
                <p v-if="item.kategori_3">
                  {{
                    item.kategori_3
                      ? item.kategori_3.nama_kategori_item
                      : "Tidak Ditemukan"
                  }}
                </p>
                <p v-if="item.kategori_4">
                  {{
                    item.kategori_4
                      ? item.kategori_4.nama_kategori_item
                      : "Tidak Ditemukan"
                  }}
                </p>
                <p v-if="item.kategori_5">
                  {{
                    item.kategori_5
                      ? item.kategori_5.nama_kategori_item
                      : "Tidak Ditemukan"
                  }}
                </p>
              </div>
            </td>
            <td class="border border-gray-300">{{ item.jumlah_palet }}</td>
            <td class="border border-gray-300">{{ item.kapasitas_palet }}</td>
            <td class="border border-gray-300">{{ item.kebutuhan_palet }}</td>
            <td class="border border-gray-300">{{ item.maksimal_tumpukan }}</td>
            <td class="border border-gray-300">
              <div>
                <div class="form-group">
                  <label for="berat_bersih">Berat Bersih</label>
                  <money
                    v-model="item.berat_bersih"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="berat_kotor">Berat Kotor</label>
                  <money
                    v-model="item.berat_kotor"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
              </div>
            </td>
            <td class="border border-gray-300">
              <div>
                <div class="form-group">
                  <label for="panjang">Panjang</label>
                  <money
                    v-model="item.panjang"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="lebar">Lebar</label>
                  <money
                    v-model="item.lebar"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="tebal">Tebal</label>
                  <money
                    v-model="item.tebal"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group">
                  <label for="volume">Volume</label>
                  <money
                    v-model="item.volume"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
              </div>
            </td>
            <td class="border border-gray-300">
              <input-form
                label=""
                type="text"
                name="warna"
                :required="false"
                v-model="item.warna"
              />
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

  created() {
    this.set_data([]);
  },

  data() {
    return {
      //list Item Pelanggan
      isLoadingData: false,
      isPaginate: true,
      itemData: [],
      parameters: {
        url: "master/item",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "item_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          group_item_id_1: "",
          group_item_id_2: "",
          group_item_id_3: "",
          group_item_id_4: "",
          group_item_id_5: "",
        },
      },

      filter_params: {
        group_item_id_1: "",
        group_item_id_2: "",
        group_item_id_3: "",
        group_item_id_4: "",
        group_item_id_5: "",
      },

      isStopSearchGroupItem1: false,
      isLoadingGetGroupItem1: false,
      group_item_1_search: "",

      isStopSearchGroupItem2: false,
      isLoadingGetGroupItem2: false,
      group_item_2_search: "",

      isStopSearchGroupItem3: false,
      isLoadingGetGroupItem3: false,
      group_item_3_search: "",

      isStopSearchGroupItem4: false,
      isLoadingGetGroupItem4: false,
      group_item_4_search: "",

      isStopSearchGroupItem5: false,
      isLoadingGetGroupItem5: false,
      group_item_5_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      // checkbox
      selectAll: false,
      checkboxs: [],
    };
  },

  async mounted() {
    await this.onSearchGroupItem1();
    // await this.onSearchGroupItem2();
    // await this.onSearchGroupItem3();
    // await this.onSearchGroupItem4();
    // await this.onSearchGroupItem5();
    await this.onSearchVendor();
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom4",
      "lookup_custom5",
      "lookup_custom6",
      "lookup_custom7",
      "lookup_custom8",
      "lookup_custom9",
    ]),
  },

  methods: {
    ...mapMutations("moduleApi", ["set_data"]),
    ...mapActions("moduleApi", ["lookUp", "getData"]),

    onGetGroupItem1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem1);

      this.isStopSearchGroupItem1 = setTimeout(() => {
        this.group_item_1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchGroupItem1();
      }, 600);
    },

    async onSearchGroupItem1() {
      if (!this.isLoadingGetGroupItem1) {
        this.isLoadingGetGroupItem1 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom4",
          query:
            "?search=" +
            this.group_item_1_search +
            "&status=1" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroupItem1 = false;
      }
    },

    onGetGroupItem2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem2);

      this.isStopSearchGroupItem2 = setTimeout(() => {
        this.group_item_2_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchGroupItem2();
      }, 600);
    },

    async onSearchGroupItem2() {
      if (!this.isLoadingGetGroupItem2) {
        this.isLoadingGetGroupItem2 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom5",
          query:
            "?search=" +
            this.group_item_2_search +
            "&status=2" +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroupItem2 = false;
      }
    },

    onGetGroupItem3(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem3);

      this.isStopSearchGroupItem3 = setTimeout(() => {
        this.group_item_3_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchGroupItem3();
      }, 600);
    },

    async onSearchGroupItem3() {
      if (!this.isLoadingGetGroupItem3) {
        this.isLoadingGetGroupItem3 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom6",
          query:
            "?search=" +
            this.group_item_3_search +
            "&status=3" +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroupItem3 = false;
      }
    },

    onGetGroupItem4(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem4);

      this.isStopSearchGroupItem4 = setTimeout(() => {
        this.group_item_4_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchGroupItem4();
      }, 600);
    },

    async onSearchGroupItem4() {
      if (!this.isLoadingGetGroupItem4) {
        this.isLoadingGetGroupItem4 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom7",
          query:
            "?search=" +
            this.group_item_4_search +
            "&status=4" +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroupItem4 = false;
      }
    },

    onGetGroupItem5(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem5);

      this.isStopSearchGroupItem5 = setTimeout(() => {
        this.group_item_5_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchGroupItem5();
      }, 600);
    },

    async onSearchGroupItem5() {
      if (!this.isLoadingGetGroupItem5) {
        this.isLoadingGetGroupItem5 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom8",
          query:
            "?search=" +
            this.group_item_5_search +
            "&status=5" +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroupItem5 = false;
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

    //reset filter
    async onSelectGroupItem1() {
      console.log(this.filter_params);
      await this.onSearchGroupItem2();
      this.filter_params.group_item_id_2 = "";
    },
    async onSelectGroupItem2() {
      await this.onSearchGroupItem3();
      this.filter_params.group_item_id_3 = "";
    },
    async onSelectGroupItem3() {
      await this.onSearchGroupItem4();
      this.filter_params.group_item_id_4 = "";
    },
    async onSelectGroupItem4() {
      await this.onSearchGroupItem5();
      this.filter_params.group_item_id_5 = "";
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = page;

      if (document.getElementById("checkAll")) {
        document.getElementById("checkAll").checked = false;
      }

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      this.parameters.params.group_item_id_1 =
        this.filter_params.group_item_id_1;
      this.parameters.params.group_item_id_2 =
        this.filter_params.group_item_id_2;
      this.parameters.params.group_item_id_3 =
        this.filter_params.group_item_id_3;
      this.parameters.params.group_item_id_4 =
        this.filter_params.group_item_id_4;
      this.parameters.params.group_item_id_5 =
        this.filter_params.group_item_id_5;

      if (this.parameters.params.group_item_id_1) {
        await this.getData(this.parameters);
      }

      if (this.data) {
        this.data.forEach((item) => {
          if (this.self.isEditable) {
            let index = this.self.form.item_pelanggans.findIndex(
              (data) => data.item_id === item.item_id
            );
            if (index !== -1) {
              this.self.form.item_pelanggans.splice(index, 1, item);
            }
          } else {
            if (
              !this.self.form.item_pelanggans.find(
                (data) => data.item_id === item.item_id
              )
            ) {
              this.self.form.item_pelanggans.push(item);
            }
          }
        });
      }

      console.log(this.self.form.item_pelanggans);

      if (this.result == true) {
        loader.hide();

        // if (page == 1) {
        //   this.$refs["pagination"].generatePage();
        // }

        // this.$refs["pagination"].active_page = this.parameters.params.page;
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }
    },

    deleteSelectedItem() {
      this.checkboxs.forEach((item) => {
        let index = this.self.form.item_pelanggans.findIndex(
          (data) => data.item.id == item
        );
        if (index !== -1) {
          this.self.form.item_pelanggans.splice(index, 1);
        }
      });
    },

    insertCheckbox() {
      if (!this.form.item_pelanggan?.length) {
        this.form.item_pelanggan = [];
      }
      this.checkboxs.forEach((item) => {
        this.form.item_pelanggan.push(item);
      });
    },

    toggleAllCheckboxs() {
      if (this.selectAll) {
        this.checkboxs = this.self.form.item_pelanggans.map((item) => item.id);
      } else {
        this.checkboxs = [];
      }
    },

    checkIfAllSelected() {
      this.selectAll =
        this.checkboxs.length === this.self.form.item_pelanggans.length;
    },
  },
};
</script>
