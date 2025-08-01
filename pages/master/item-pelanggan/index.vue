<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Master</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Item Pelanggan</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="flex flex-col gap-5">
      <div
        class="relative w-full bg-white dark:bg-slate-800 rounded-md p-2 px-4"
      >
        <div>
          <list-option-section :self="this" ref="form-option" />
        </div>
        <div
          class="mb-5 flex flex-col w-full justify-between p-2 border border-gray-300 rounded-md"
        >
          <div class="grid grid-flow-col grid-rows-5 md:grid-rows-3 gap-2">
            <div class="flex">
              <label for="group_item_1" class="w-1/2">
                Group Item Level 1 <span class="text-danger">*</span>
              </label>
              <v-select
                label="nama_group_item"
                :loading="isLoadingGetGroupItem1"
                :options="lookup_pengawas.data"
                :filterable="false"
                @search="onGetGroupItem1"
                v-model="filter_params.group_item_id_1"
                :reduce="(item) => item.group_item_id"
                class="w-1/2 bg-white"
                @input="onSelectGroupItem1"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_pengawas.data.length || search"
                >
                  <span
                    v-if="lookup_pengawas.current_page > 1"
                    @click="onGetGroupItem1(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_pengawas.last_page > lookup_pengawas.current_page
                    "
                    @click="onGetGroupItem1(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="flex">
              <label for="group_item_2" class="w-1/2">
                Group Item Level 2
              </label>
              <v-select
                label="nama_group_item"
                :loading="isLoadingGetGroupItem2"
                :options="lookup_beam.data"
                :filterable="false"
                @search="onGetGroupItem2"
                v-model="filter_params.group_item_id_2"
                :reduce="(item) => item.group_item_id"
                class="w-1/2 bg-white"
                @input="onSelectGroupItem2"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_beam.data.length || search"
                >
                  <span
                    v-if="lookup_beam.current_page > 1"
                    @click="onGetGroupItem2(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="lookup_beam.last_page > lookup_beam.current_page"
                    @click="onGetGroupItem2(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="flex">
              <label for="group_item_3" class="w-1/2">
                Group Item Level 3
              </label>
              <v-select
                label="nama_group_item"
                :loading="isLoadingGetGroupItem3"
                :options="lookup_packing.data"
                :filterable="false"
                @search="onGetGroupItem3"
                v-model="filter_params.group_item_id_3"
                :reduce="(item) => item.group_item_id"
                class="w-1/2 bg-white"
                @input="onSelectGroupItem3"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_packing.data.length || search"
                >
                  <span
                    v-if="lookup_packing.current_page > 1"
                    @click="onGetGroupItem3(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_packing.last_page > lookup_packing.current_page
                    "
                    @click="onGetGroupItem3(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="flex">
              <label for="group_item_4" class="w-1/2">
                Group Item Level 4
              </label>
              <v-select
                label="nama_group_item"
                :loading="isLoadingGetGroupItem4"
                :options="lookup_defects.data"
                :filterable="false"
                @search="onGetGroupItem4"
                v-model="filter_params.group_item_id_4"
                :reduce="(item) => item.group_item_id"
                class="w-1/2 bg-white"
                @input="onSelectGroupItem4"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_defects.data.length || search"
                >
                  <span
                    v-if="lookup_defects.current_page > 1"
                    @click="onGetGroupItem4(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_defects.last_page > lookup_defects.current_page
                    "
                    @click="onGetGroupItem4(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="flex">
              <label for="group_item_5" class="w-1/2">
                Group Item Level 5
              </label>
              <v-select
                label="nama_group_item"
                :loading="isLoadingGetGroupItem5"
                :options="lookup_department.data"
                :filterable="false"
                @search="onGetGroupItem5"
                v-model="filter_params.group_item_id_5"
                :reduce="(item) => item.group_item_id"
                class="w-1/2 bg-white"
                @input="onSelectGroupItem5"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_department.data.length || search"
                >
                  <span
                    v-if="lookup_department.current_page > 1"
                    @click="onGetGroupItem5(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_department.last_page >
                      lookup_department.current_page
                    "
                    @click="onGetGroupItem5(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
          </div>
          <div class="flex gap-3 my-2">
            <button
              @click="onLoad"
              class="bg-blue-500 hover:bg-blue-500 p-2 text-white rounded-md"
            >
              <i class="fa fa-filter text-white font-bold mr-2"></i>
              Filter
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table ref="formContainer">
            <thead>
              <tr class="uppercase">
                <th class="w-[5%] text-center">Details</th>

                <th class="w-[5%]">No</th>
                <!-- <th>Item</th> -->
                <th
                  @click="
                    onSort(
                      'nama_item',
                      parameters.params.sort == 'asc' ? 'desc' : 'asc'
                    )
                  "
                  class="cursor-pointer"
                >
                  <div class="flex justify-between align-baseline">
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
                <th>Vendor</th>
                <th>Supplier</th>
                <th>Group Item</th>
                <th>Kode External</th>
                <th>Batas Item</th>
                <th>Kategori Item</th>
                <th class="w-[5%] text-center">Edit</th>
                <th class="w-[5%] text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td>
                  <small-detail-button @click="onDetail(item)" />
                </td>

                <td>
                  {{
                    (parameters.params.page - 1) * parameters.params.per_page +
                    i +
                    1
                  }}
                </td>
                <td>{{ item.nama_item }}</td>
                <td>{{ item.vendor.nama_vendor }}</td>
                <td>{{ item.supplier?.nama_supplier }}</td>
                <td>
                  <div>
                    <p v-if="item.group_item_1">
                      {{
                        item.group_item_1
                          ? item.group_item_1.nama_group_item
                          : "Tidak Ditemukan"
                      }}
                    </p>
                    <p v-if="item.group_item_3">
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
                  </div>
                </td>
                <td>{{ item.kode_sap }}</td>
                <td>
                  <div class="flex items-center gap-2">
                    <i class="fa fa-caret-up text-green-300"></i>
                    <p>{{ item.batas_atas }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fa fa-caret-down text-red-300"></i>
                    <p>{{ item.batas_bawah }}</p>
                  </div>
                </td>
                <td>
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

                <td>
                  <small-edit-button @click="onEdit(item)" />
                </td>
                <td>
                  <small-delete-button
                    @click="onTrashed(item)"
                    v-if="!item.deleted_at"
                  />
                </td>
              </tr>
            </tbody>
            <table-data-loading-section :self="this" />

            <table-data-not-found-section :self="this" />
          </table>
        </div>
        <div class="mx-3 mt-2 mb-4">
          <pagination-section :self="this" ref="pagination" />
        </div>
      </div>
    </div>
    <ModalDetail :self="this" ref="modalDetail" />
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import ModalDetail from "./detail";
export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Item Pelanggan",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  components: {
    ModalDetail,
  },

  async mounted() {
    this.$refs["form-option"].isExport = true;
    this.$refs["form-option"].isFilter = false;
    this.$refs["form-option"].isMaintenancePage = true;
    this.$refs["form-option"].isAddData = false;

    if (
      this.getRoles.destroy ||
      this.getRoles.destroy_all ||
      this.getRoles.restore ||
      this.getRoles.restore_all
    ) {
      this.$refs["form-option"].isMaintenancePage = true;
    }

    if (this.getRoles.store) {
      this.$refs["form-option"].isAddData = true;
    }

    if (this.getRoles.export) {
      this.$refs["form-option"].isExportFile = true;

      this.$refs["form-option"].isExportFilePdf = true;
      this.$refs["form-option"].isExportFileExcel = true;

      if ("export_pdf" in this.getRoles || "export_excel" in this.getRoles) {
        this.$refs["form-option"].isExportFilePdf = this.getRoles.export_pdf;
        this.$refs["form-option"].isExportFileExcel =
          this.getRoles.export_excel;
      }
    }

    if (this.getRoles.print) {
      this.$refs["form-option"].isExportPrint = true;
    }

    await this.onSearchGroupItem1();
    // await this.onSearchGroupItem2();
    // await this.onSearchGroupItem3();
    // await this.onSearchGroupItem4();
    // await this.onSearchGroupItem5();
  },

  data() {
    return {
      title: "Item Pelanggan",
      isLoading: false,
      isPaginate: true,
      user: this.$auth.user,
      default_roles: {
        store: true,
        update: true,
        destroy: true,
        restore: true,
        show: true,
        export: true,
        export_excel: true,
        export_pdf: true,
        print: true,
        destroy_all: true,
        restore_all: true,
        import: true,
      },
      parameters: {
        url: "master/item-pelanggan",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "item_pelanggan_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          group_item_id_1: "",
          group_item_id_2: "",
          group_item_id_3: "",
          group_item_id_4: "",
          group_item_id_5: "",
          form: {
            nama_item: "",
            kode_item_pelanggan: "",
            kode_sap: "",
            item_id: "",
            vendor_id: "",
            pelanggan_id: "",
            supplier_id: "",
            supplier_code: "",
            group_item_id_1: "",
            group_item_id_2: "",
            group_item_id_3: "",
            group_item_id_4: "",
            group_item_id_5: "",
            kategori_id_1: "",
            kategori_id_2: "",
            kategori_id_3: "",
            kategori_id_4: "",
            kategori_id_5: "",
            jumlah_palet: "",
            kapasitas_palet: "",
            kebutuhan_palet: "",
            batas_atas: "",
            batas_bawah: "",
            maksimal_tumpukan: "",
            satuan_id: "",
            berat_bersih: "",
            berat_kotor: "",
            satuan_id_berat: "",
            panjang: "",
            lebar: "",
            tebal: "",
            volume: "",
            satuan_id_volume: "",
            value_stocklevel: "",
            satuan_id_stocklevel: "",
            warna: "",
            keterangan: "",
          },
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },

      filter_params: {
        group_item_id_1: "",
        group_item_id_2: "",
        group_item_id_3: "",
        group_item_id_4: "",
        group_item_id_5: "",
      },
      selectedList: [],

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
    };
  },
  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_pengawas",
      "lookup_beam",
      "lookup_packing",
      "lookup_defects",
      "lookup_department",
    ]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "item-pelanggan"
        );

        let roles = {};

        if (JSON.parse(main_role.pivot.operators).includes("all")) {
          return this.default_roles;
        }

        JSON.parse(main_role.pivot.operators).forEach((item) => {
          roles[item.replace("-", "_")] = true;
        });

        return roles;
      }
    },
  },

  methods: {
    ...mapActions("moduleApi", [
      "getData",
      "deleteData",
      "restoreData",
      "deleteAllData",
      "restoreAllData",
      "lookUp",
    ]),

    ...mapMutations("moduleApi", ["set_data"]),

    onFormShow() {
      this.$router.push("/master/item-pelanggan/add");
    },

    onEdit(item) {
      this.$router.push("/master/item-pelanggan/" + item.item_pelanggan_id);
    },

    onDetail(item) {
      this.$refs.modalDetail.parameters.form = {
        ...item,
      };
      this.$refs.modalDetail.show();
    },

    onTrashed(item) {
      if (this.parameters.loadings.isDelete) return;

      this.$confirm({
        auth: false,
        message: "Data ini akan dipindahkan ke dalam Trash. Yakin ??",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: async (confirm) => {
          if (confirm) {
            this.parameters.loadings.isDelete = true;

            await this.deleteData({
              url: this.parameters.url,
              id: item.item_pelanggan_id,
              params: this.parameters.params,
            });

            if (this.result == true) {
              this.onLoad(this.parameters.params.page);
              this.$toaster.success(
                "Data berhasil di pindahkan ke dalam Trash!"
              );
            } else {
              this.$globalErrorToaster(this.$toaster, this.error);
            }

            this.parameters.loadings.isDelete = false;
          }
        },
      });
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = page;

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

      await this.getData(this.parameters);

      if (this.result == true) {
        loader.hide();

        if (page == 1) {
          this.$refs["pagination"].generatePage();
        }

        this.$refs["pagination"].active_page = this.parameters.params.page;
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingData = false;
    },

    onSort(column, sort = "asc") {
      this.parameters.params = {
        ...this.parameters.params,
        order: column,
        sort: sort,
      };

      this.onLoad(this.parameters.params.page);
    },

    onGetGroupItem1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem1);

      this.isStopSearchGroupItem1 = setTimeout(() => {
        this.group_item_1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_pengawas.current_page = isNext
            ? this.lookup_pengawas.current_page + 1
            : this.lookup_pengawas.current_page - 1;
        } else {
          this.lookup_pengawas.current_page = 1;
        }

        this.onSearchGroupItem1();
      }, 600);
    },

    async onSearchGroupItem1() {
      if (!this.isLoadingGetGroupItem1) {
        this.isLoadingGetGroupItem1 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "pengawas",
          query:
            "?search=" +
            this.group_item_1_search +
            "&status=1" +
            "&page=" +
            this.lookup_pengawas.current_page +
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
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchGroupItem2();
      }, 600);
    },

    async onSearchGroupItem2() {
      if (!this.isLoadingGetGroupItem2) {
        this.isLoadingGetGroupItem2 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "beam",
          query:
            "?search=" +
            this.group_item_2_search +
            "&status=2" +
            "&group_item_id_induk=" +
            this.filter_params.group_item_id_1 +
            "&page=" +
            this.lookup_beam.current_page +
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
          this.lookup_packing.current_page = isNext
            ? this.lookup_packing.current_page + 1
            : this.lookup_packing.current_page - 1;
        } else {
          this.lookup_packing.current_page = 1;
        }

        this.onSearchGroupItem3();
      }, 600);
    },

    async onSearchGroupItem3() {
      if (!this.isLoadingGetGroupItem3) {
        this.isLoadingGetGroupItem3 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "packing",
          query:
            "?search=" +
            this.group_item_3_search +
            "&status=3" +
            "&group_item_id_induk=" +
            this.filter_params.group_item_id_2 +
            "&page=" +
            this.lookup_packing.current_page +
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
          this.lookup_defects.current_page = isNext
            ? this.lookup_defects.current_page + 1
            : this.lookup_defects.current_page - 1;
        } else {
          this.lookup_defects.current_page = 1;
        }

        this.onSearchGroupItem4();
      }, 600);
    },

    async onSearchGroupItem4() {
      if (!this.isLoadingGetGroupItem4) {
        this.isLoadingGetGroupItem4 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "defects",
          query:
            "?search=" +
            this.group_item_4_search +
            "&status=4" +
            "&group_item_id_induk=" +
            this.filter_params.group_item_id_3 +
            "&page=" +
            this.lookup_defects.current_page +
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
          this.lookup_department.current_page = isNext
            ? this.lookup_department.current_page + 1
            : this.lookup_department.current_page - 1;
        } else {
          this.lookup_department.current_page = 1;
        }

        this.onSearchGroupItem5();
      }, 600);
    },

    async onSearchGroupItem5() {
      if (!this.isLoadingGetGroupItem5) {
        this.isLoadingGetGroupItem5 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "department",
          query:
            "?search=" +
            this.group_item_5_search +
            "&status=5" +
            "&group_item_id_induk=" +
            this.filter_params.group_item_id_4 +
            "&page=" +
            this.lookup_department.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem5 = false;
      }
    },

    async onSelectGroupItem1() {
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
  },
};
</script>
