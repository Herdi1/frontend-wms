<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Master</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Item Produk Master</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="gap-5">
      <div
        class="relative p-4 w-12/12 bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
      >
        <div class="card-body">
          <div class="card-title">
            <list-option-section :self="this" ref="form-option" />
          </div>

          <div class="w-full mt-3 mb-7">
            <div
              class="flex w-full justify-between items-end p-2 border border-gray-300 rounded-md"
            >
              <div class="grid grid-flow-col grid-rows-3 gap-2">
                <div class="flex w-[400px]">
                  <label class="w-[40%]" for="group_item_id_1"
                    >Group Item Level 1</label
                  >
                  <v-select
                    label="nama_group_item"
                    :loading="isLoadingGetGroupItem1"
                    :options="lookup_grade.data"
                    :filterable="false"
                    @search="onGetGroupItem1"
                    v-model="filter_params.group_item_id_1"
                    :reduce="(item) => item.group_item_id"
                    class="w-[60%] bg-white"
                    @input="onSearchGroupItem2"
                  >
                    <!-- <template #search="{ attributes, events }">
                              <input
                                class="w-full outline-none active:outline-none"
                                :required="!form.vendor_id"
                                v-bind="attributes"
                                v-on="events"
                              />
                            </template> -->
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_grade.data.length || search"
                    >
                      <span
                        v-if="lookup_grade.current_page > 1"
                        @click="onGetGroupItem1(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_grade.last_page > lookup_grade.current_page
                        "
                        @click="onGetGroupItem1(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>

                <div class="flex">
                  <label class="w-[40%]" for="group_item_id_2"
                    >Group Item Level 2</label
                  >
                  <v-select
                    label="nama_group_item"
                    :loading="isLoadingGetGroupItem2"
                    :options="lookup_beam.data"
                    :filterable="false"
                    @search="onGetGroupItem2"
                    v-model="filter_params.group_item_id_2"
                    :reduce="(item) => item.group_item_id"
                    class="w-[60%] bg-white"
                    @input="onSearchGroupItem3"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_beam.data.length || search"
                    >
                      <span
                        v-if="lookup_beam.current_page > 1"
                        @click="onGetGroupItem2(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="lookup_beam.last_page > lookup_beam.current_page"
                        @click="onGetGroupItem2(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>

                <div class="flex">
                  <label class="w-[40%]" for="group_item_id_3"
                    >Group Item Level 3</label
                  >
                  <v-select
                    label="nama_group_item"
                    :loading="isLoadingGetGroupItem3"
                    :options="lookup_packing.data"
                    :filterable="false"
                    @search="onGetGroupItem3"
                    v-model="filter_params.group_item_id_3"
                    :reduce="(item) => item.group_item_id"
                    class="w-[60%] bg-white"
                    @input="onSearchGroupItem4"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_packing.data.length || search"
                    >
                      <span
                        v-if="lookup_packing.current_page > 1"
                        @click="onGetGroupItem3(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_packing.last_page > lookup_packing.current_page
                        "
                        @click="onGetGroupItem3(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>

                <div class="flex w-[400px]">
                  <label class="w-[40%]" for="group_item_id_4"
                    >Group Item Level 4</label
                  >
                  <v-select
                    label="nama_group_item"
                    :loading="isLoadingGetGroupItem4"
                    :options="lookup_defects.data"
                    :filterable="false"
                    @search="onGetGroupItem4"
                    v-model="filter_params.group_item_id_4"
                    :reduce="(item) => item.group_item_id"
                    class="w-[60%] bg-white"
                    @input="onSearchGroupItem5"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_defects.data.length || search"
                    >
                      <span
                        v-if="lookup_defects.current_page > 1"
                        @click="onGetGroupItem4(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_defects.last_page > lookup_defects.current_page
                        "
                        @click="onGetGroupItem4(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>

                <div class="flex">
                  <label class="w-[40%]" for="group_item_id_5"
                    >Group Item Level 5</label
                  >
                  <v-select
                    label="nama_group_item"
                    :loading="isLoadingGetGroupItem5"
                    :options="lookup_department.data"
                    :filterable="false"
                    @search="onGetGroupItem5"
                    v-model="filter_params.group_item_id_5"
                    :reduce="(item) => item.group_item_id"
                    class="w-[60%] bg-white"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_department.data.length || search"
                    >
                      <span
                        v-if="lookup_department.current_page > 1"
                        @click="onGetGroupItem5(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_department.last_page >
                          lookup_department.current_page
                        "
                        @click="onGetGroupItem5(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </div>
              <div class="flex gap-3 ml-5 items-self-end">
                <button
                  @click="onLoad"
                  class="bg-blue-500 hover:bg-blue-500 p-2 text-white rounded-md"
                >
                  <i class="fa fa-filter text-white font-bold mr-2"></i>
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <table class="mb-5" ref="formContainer">
              <thead>
                <tr class="text-base uppercase text-nowrap">
                  <th class="w-[5%]">Edit</th>
                  <th class="w-[5%]">Delete</th>
                  <th class="w-[5%]">No</th>
                  <th
                    @click="
                      onSort(
                        'kode_wms',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pinter"
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Kode Item</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'kode_wms' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'kode_wms' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th
                    @click="
                      onSort(
                        'nama_item',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pinter"
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
                  <th
                    @click="
                      onSort(
                        'satuan_id',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pinter"
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Satuan</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'satuan_id' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'satuan_id' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th>Berat Bersih</th>
                  <th>Berat Kotor</th>
                  <th>Volume</th>
                  <th>Stocklevel</th>
                  <th>Group Item 1</th>
                  <th>Group Item 2</th>
                  <th>Group Item 3</th>
                  <th>Group Item 4</th>
                  <th>Group Item 5</th>
                  <th>Batas Atas</th>
                  <th>Batas Bawah</th>
                  <th>Kategori Item 1</th>
                  <th>Kategori Item 2</th>
                  <th>Kategori Item 3</th>
                  <th>Kategori Item 4</th>
                  <th>Kategori Item 5</th>
                  <th>Jumlah Palet</th>
                  <th>Kebutuhan Palet</th>
                  <th>Kapasitas Palet</th>
                  <th>Maksimal Tumpukan</th>
                  <th>Supplier</th>
                  <th class="w-[5%]">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data" :key="i">
                  <td class="text-center">
                    <small-edit-button @click="onEdit(item)" />
                  </td>
                  <td class="text-center">
                    <small-delete-button
                      @click="onTrashed(item)"
                      v-if="!item.deleted_at"
                    />
                  </td>
                  <td>
                    {{
                      (parameters.params.page - 1) *
                        parameters.params.per_page +
                      i +
                      1
                    }}
                  </td>
                  <td>{{ item.kode_wms }}</td>
                  <td>{{ item.nama_item }}</td>
                  <td>
                    {{
                      item.satuan ? item.satuan.nama_satuan : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>
                    {{
                      item.berat_bersih + " " + item.satuan_berat.nama_satuan
                    }}
                  </td>
                  <td>
                    {{ item.berat_kotor + " " + item.satuan_berat.nama_satuan }}
                  </td>
                  <td>
                    {{ item.volume + " " + item.satuan_volume.nama_satuan }}
                  </td>
                  <td>
                    {{
                      item.value_stocklevel +
                      " " +
                      item.satuan_stocklevel.nama_satuan
                    }}
                  </td>
                  <td>
                    {{
                      item.group_item_1
                        ? item.group_item_1.nama_group_item
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>
                    {{
                      item.group_item_2
                        ? item.group_item_2.nama_group_item
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>
                    {{
                      item.group_item_3
                        ? item.group_item_3.nama_group_item
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>
                    {{
                      item.group_item_4
                        ? item.group_item_4.nama_group_item
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>
                    {{
                      item.group_item_5
                        ? item.group_item_5.nama_group_item
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>{{ item.batas_atas }}</td>
                  <td>{{ item.batas_bawah }}</td>
                  <td>
                    {{
                      item.kategori_1
                        ? item.kategori_1.nama_kategori
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>
                    {{
                      item.kategori_2
                        ? item.kategori_2.nama_kategori
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>
                    {{
                      item.kategori_3
                        ? item.kategori_3.nama_kategori
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>
                    {{
                      item.kategori_4
                        ? item.kategori_4.nama_kategori
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>
                    {{
                      item.kategori_5
                        ? item.kategori_5.nama_kategori
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>{{ item.jumlah_palet }}</td>
                  <td>{{ item.kapasitas_palet }}</td>
                  <td>{{ item.kebutuhan_palet }}</td>
                  <td>{{ item.maksimal_tumpukan }}</td>
                  <td>
                    {{
                      item.supplier
                        ? item.supplier.nama_supplier
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td class="text-center">
                    <small-detail-button @click="onDetail(item)" />
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
    </div>
    <ModalDetail :self="this" ref="modalDetail" />
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
// import FormInput from "./form.vue";
import ModalDetail from "./detail.vue";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Item Produk Master",
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
    this.$refs["form-option"].isExport = false;
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
      this.$refs["form-option"].isExportFile = false;

      this.$refs["form-option"].isExportFilePdf = false;
      this.$refs["form-option"].isExportFileExcel = false;

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
    await this.onSearchGroupItem2();
    await this.onSearchGroupItem3();
    await this.onSearchGroupItem4();
    await this.onSearchGroupItem5();
  },

  data() {
    return {
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

      title: "Item Produk Master",
      isLoadingData: false,
      isPaginate: true,
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
        form: {
          item_id: "",
          kode_wms: "",
          kode_alternatif: "",
          kode_alternatif_2: "",
          nama_item: "",
          satuan_id: "",
          satuan_id_berat: "",
          berat_bersih: "",
          berat_kotor: "",
          satuan_id_volume: "",
          volume: "",
          satuan_id_stocklevel: "",
          value_stocklevel: "",
          keterangan: "",
          group_item_id_1: "",
          group_item_id_2: "",
          group_item_id_3: "",
          group_item_id_4: "",
          group_item_id_5: "",
          batas_bawah: "",
          batas_atas: "",
          kategori_id_1: "",
          kategori_id_2: "",
          kategori_id_3: "",
          kategori_id_4: "",
          kategori_id_5: "",
          kapasitas_palet: "",
          maksimum_tumpukan: "",
          supplier_id: "",
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
      selectList: [],

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
      user: this.$auth.user,
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_grade",
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
          (item) => item.rute == "item"
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
      this.$router.push("/master/item-produk-master/add");
    },

    onEdit(item) {
      this.$router.push("/master/item-produk-master/" + item.item_id);
    },

    onDetail(item) {
      this.$refs.modalDetail.form = {
        item_id: item.item_id,
      };
      this.$refs.modalDetail.fetchItemDetail();
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
              id: item.item_id,
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

      this.parameters.form.checkboxs = [];
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

    //group item
    onGetGroupItem1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem1);

      this.isStopSearchGroupItem1 = setTimeout(() => {
        this.group_item_1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchGroupItem1();
      }, 600);
    },

    async onSearchGroupItem1() {
      if (!this.isLoadingGetGroupItem1) {
        this.isLoadingGetGroupItem1 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "grade",
          query:
            "?search=" +
            this.group_item_1_search +
            "&status=1" +
            "&page=" +
            this.lookup_grade.current_page +
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
  },
};
</script>
