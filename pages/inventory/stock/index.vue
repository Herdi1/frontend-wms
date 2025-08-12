<template>
  <section class="section">
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline"
          >Inventory</a
        >
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>{{ this.title }}</span>
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
              class="w-full gap-5 items-baseline p-2 border border-gray-300 rounded-md"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-2">
                <div class="grid grid-cols-1 gap-5 w-full">
                  <div class="form-group">
                    <input-horizontal
                      label="Periode Awal"
                      type="date"
                      name="kode_sap"
                      :isHorizontal="true"
                      v-model="parameters.params.start_date"
                      :required="false"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-5 w-full">
                  <div class="form-group">
                    <input-horizontal
                      label="Periode Akhir"
                      type="date"
                      name="periode_akhir"
                      :isHorizontal="true"
                      v-model="parameters.params.end_date"
                      :required="false"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-2">
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Gudang</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_gudang"
                    :loading="isLoadingGetGudang"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetGudang"
                    @input="(item) => onSetGudang(item)"
                    v-model="filter_params.gudang_id"
                  >
                    <template v-slot:option="option">
                      <div class="flex">
                        <div class="col-md-5 p-1 m-0 w-8/12">
                          {{ option.nama_gudang }}
                        </div>
                        <!-- <div class="col-md-7 p-1 m-0 text-right w-4/12">
                    {{ option.kode_coa }}
                  </div> -->
                      </div>
                    </template>
                    <!-- <template #search="{ attributes, events }">
                <input
                  class="vs__search"
                  :required="!coa_id"
                  v-bind="attributes"
                  v-on="events"
                />
              </template> -->
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_custom1.data.length || search"
                    >
                      <span
                        v-if="lookup_custom1.current_page > 1"
                        @click="onGetGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Zona Gudang</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_zona_gudang"
                    :loading="isLoadingGetZonaGudang"
                    :options="lookup_custom3.data"
                    :filterable="false"
                    @search="onGetZonaGudang"
                    :reduce="(item) => item.zona_gudang_id"
                    v-model="filter_params.zona_gudang_id"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_custom3.data.length || search"
                    >
                      <span
                        v-if="lookup_custom3.current_page > 1"
                        @click="onGetZonaGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom3.last_page > lookup_custom3.current_page
                        "
                        @click="onGetZonaGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </div>

              <div class="flex gap-3">
                <button
                  @click="onLoad(1)"
                  class="bg-blue-500 shadow-md hover:shadow-none p-2 text-white rounded-md flex"
                >
                  <i class="fa fa-filter text-white font-bold mr-2"></i>
                  <div>Filter</div>
                </button>
              </div>
            </div>
          </div>

          <!-- start table -->
          <div class="table-responsive">
            <table
              class="table table-sm border border-gray-300"
              ref="formContainer"
            >
              <thead>
                <tr class="uppercase">
                  <th class="w-[5%] border border-gray-300">No</th>
                  <th
                    @click="
                      onSort(
                        'kode_item',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pointer border border-gray-300"
                    style="min-width: 100px"
                  >
                    <div class="flex flex-row justify-between items-baseline">
                      <div>Item</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'kode_item' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'kode_item' &&
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
                        'nama_gudang',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pointer border border-gray-300"
                    style="min-width: 100px"
                  >
                    <div class="flex flex-row justify-between items-baseline">
                      <div>Gudang</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'nama_gudang' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'nama_gudang' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <!-- <template v-if="raw_data.warehouses">
                    <th
                      v-for="(item, index) in raw_data.warehouses.data"
                      :key="index"
                      style="min-width: 120px"
                    >
                      <div>{{ item.name }}</div>
                    </th>
                  </template> -->
                  <!-- <th
                    v-if="!parameters.params.warehouse_is_last_page"
                    style="min-width: 100px"
                  >
                    <div
                      v-if="!parameters.params.warehouse_is_loading"
                      class="text-center"
                    >
                      <a href="#" @click="loadMorePivot"> Load More </a>
                    </div>
                    <div class="text-center" v-else>
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </div>
                  </th> -->
                  <!-- <th class="text-center" style="min-width: 100px">
                    Total Rusak Membatu
                  </th>
                  <th class="text-center" style="min-width: 100px">
                    Total Rusak Pecah
                  </th>
                  <th class="text-center" style="min-width: 100px">
                    Total Rusak
                  </th> -->
                  <th class="text-center border border-gray-300">
                    Zona Gudang
                  </th>
                  <th class="text-center border border-gray-300">
                    Kode Valuation
                  </th>
                  <th
                    class="text-center border border-gray-300"
                    style="min-width: 100px"
                  >
                    Quantity
                  </th>
                  <th class="text-center w-[5%] border border-gray-300">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :class="{ 'table-active': ActiveRow == i }"
                  v-for="(item, i) in data"
                  :key="i"
                >
                  <td class="border border-gray-300 text-center">
                    {{
                      (parameters.params.page - 1) *
                        parameters.params.per_page +
                      i +
                      1
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.kode_item ? item.kode_item : "" }} -
                    {{ item.nama_item }}
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.gudang.nama_gudang +
                      (item.kode_gudang ? " - " + item.gudang.kode_gudang : "")
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.zona_gudang.nama_zona_gudang +
                      " - " +
                      item.zona_gudang.kode_zona_gudang
                    }}
                  </td>
                  <!-- <td
                    v-for="(itemStock, indexStock) in item.stocks"
                    :key="indexStock"
                  >
                    {{ parseFloat(itemStock) }}
                  </td> -->
                  <!-- <td v-if="!parameters.params.warehouse_is_last_page">
                    <div
                      v-if="!parameters.params.warehouse_is_loading"
                      class="text-center"
                    >
                      <a href="#" @click="loadMorePivot"> . . . </a>
                    </div>
                    <div class="text-center" v-else>
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </div>
                  </td> -->
                  <!-- <td class="text-danger">
                    {{
                      item.total_rusak_membatu
                        ? item.total_rusak_membatu
                        : "" | formatPrice
                    }}
                  </td>
                  <td class="text-danger">
                    {{
                      item.total_rusak_pecah
                        ? item.total_rusak_pecah
                        : "" | formatPrice
                    }}
                  </td>
                  <td class="text-danger">
                    {{ item.total_rusak ? item.total_rusak : "" | formatPrice }}
                  </td> -->
                  <td class="text-center border border-gray-300">
                    {{ item.kode_valuation }}
                  </td>
                  <td class="text-success text-center border border-gray-300">
                    {{ item.quantity ? item.quantity : "" | formatPrice }}
                  </td>
                  <td
                    class="text-center border border-gray-300 place-items-center"
                  >
                    <button
                      class="btn btn-sm btn-primary"
                      @click="onDetail(item)"
                      v-if="getRoles.show"
                    >
                      <i class="fas fa-info-circle"></i>
                    </button>
                  </td>
                </tr>
              </tbody>

              <table-data-loading-section :self="this" />

              <table-data-not-found-section :self="this" />
            </table>
          </div>
          <!-- end table -->

          <div
            class="card-title border-top"
            style="padding-bottom: -100px !important"
          >
            <pagination-section :self="this" ref="pagination" />
          </div>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-12 col-md-12">
        </div>
      </div> -->
    </div>

    <!-- <filter-section :self="this" ref="form-filter">
      <template>
        <div class="col-md-12">
          <div class="form-group">
            <label>Gudang Per Page</label>
            <select
              class="form-control"
              v-model="parameters.params.warehouse_per_page"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>

          <div class="row">
            <div class="col-md-6 form-group">
              <label>Gudang Kolom</label>
              <select
                class="form-control"
                v-model="parameters.params.warehouse_order"
              >
                <option value="id">Id</option>
                <option value="name">Nama</option>
              </select>
            </div>

            <div class="col-md-6 form-group">
              <label>Gudang Kolom Order</label>
              <select
                class="form-control"
                v-model="parameters.params.warehouse_sort"
              >
                <option value="asc">Terkecil</option>
                <option value="desc">Terbesar</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="mb-3"><b>Bentuk</b></div>
              <div class="form-group">
                <select class="form-control" v-model="parameters.params.shape">
                  <option value="">Pilih</option>
                  <option
                    v-for="(item, index) in spesifications.shape"
                    :key="index"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-3"><b>Detail 1</b></div>
              <div class="form-group">
                <select
                  class="form-control"
                  v-model="parameters.params.detail_1"
                >
                  <option value="">Pilih</option>
                  <option
                    v-for="(item, index) in spesifications.detail_1"
                    :key="index"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="mb-3"><b>Detail 2</b></div>
              <div class="form-group">
                <select
                  class="form-control"
                  v-model="parameters.params.detail_2"
                >
                  <option value="">Pilih</option>
                  <option
                    v-for="(item, index) in spesifications.detail_2"
                    :key="index"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-3"><b>Finishing</b></div>
              <div class="form-group">
                <select
                  class="form-control"
                  v-model="parameters.params.finishing"
                >
                  <option value="">Pilih</option>
                  <option
                    v-for="(item, index) in spesifications.finishing"
                    :key="index"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="mb-3"><b>Dominan</b></div>
          <div class="form-group">
            <select class="form-control" v-model="parameters.params.dominant">
              <option value="">Pilih</option>
              <option
                v-for="(item, index) in spesifications.dominant"
                :key="index"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </template>
    </filter-section> -->
    <ModalDetail :self="this" ref="modalDetail" />
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import ModalDetail from "./detail.vue";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Stok",
    };
  },

  components: {
    ModalDetail,
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  async mounted() {
    this.$refs["form-option"].isAddData = false;
    this.$refs["form-option"].isMaintenancePage = false;
    this.$refs["form-option"].isFilter = false;
    this.$refs["form-option"].isExport = true;
    this.$refs["form-option"].isExportFile = false;
    this.$refs["form-option"].isExportPrint = false;

    if (
      this.getRoles.destroy ||
      this.getRoles.destroy_all ||
      this.getRoles.restore ||
      this.getRoles.restore_all
    ) {
      this.$refs["form-option"].isMaintenancePage = false;
    }

    if (this.getRoles.store) {
      this.$refs["form-option"].isAddData = false;
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

    this.$refs["form-option"].isSearching = false;
    this.$refs["form-option"].isShowingPage = false;

    await this.onSearchGudang();
    await this.onSearchZonaGudang();

    // this.$axios.get(this.parameters.url + "/get-spesification")
    // .then(res => {
    //   this.spesifications = {
    //     ...res.data
    //   };
    // });
  },

  data() {
    return {
      title: "STOK",
      isLoadingData: false,
      isPaginate: true,
      ActiveRow: null,

      isLoadingGetGudang: false,
      isStopSearchGudang: false,
      gudang_search: "",

      isLoadingGetZonaGudang: false,
      isStopSearchZonaGudang: false,
      zona_gudang_search: "",

      parameters: {
        url: "inventory/stock",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "stok_gudang_all_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,

          gudang_id: "",
          zona_gudang_id: "",
          start_date: "",
          end_date: "",

          // shape: "",
          // detail_1: "",
          // detail_2: "",
          // finishing: "",
          // dominant: "",

          // warehouse_page: 1,
          // warehouse_per_page: 10,
          // warehouse_order: "id",
          // warehouse_sort: "desc",
          // warehouse_is_loading: false,
          // warehouse_is_last_page: false,
          // warehouse_last_id: 0,
        },
        default_params: {
          soft_deleted: "",
          search: "",
          order: "id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,

          gudang_id: "",
          zona_gudang_id: "",
          // shape: "",
          // detail_1: "",
          // detail_2: "",
          // finishing: "",
          // dominant: "",

          // warehouse_page: 1,
          // warehouse_per_page: 10,
          // warehouse_order: "id",
          // warehouse_sort: "desc",
          // warehouse_is_loading: false,
          // warehouse_is_last_page: false,
          // warehouse_last_id: 0,
        },
        form: {
          checkboxs: [],
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
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

      filter_params: {
        gudang_id: "",
        zona_gudang_id: "",
      },

      user: { ...this.$auth.user },

      spesifications: {
        shape: [],
        detail_1: [],
        detail_2: [],
        finishing: [],
        dominant: [],
      },
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "raw_data",
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom3",
    ]),

    getRoles() {
      if (!this.user.parent_id) {
        return this.default_roles;
      } else {
        let main_role = this.user.group_role.roles.find(
          (item) => item.name == "stock"
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

  watch: {
    "parameters.params.gudang_id": function (newValue, oldValue) {
      if (!newValue) {
        this.gudang_id = "";
      }
    },
  },

  methods: {
    ...mapActions("moduleApi", ["getData", "lookUp"]),

    ...mapMutations("moduleApi", ["set_data"]),

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = page;

      // this.parameters.params.warehouse_page = 1;
      // this.parameters.params.warehouse_is_last_page = false;

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      let url =
        this.parameters.url +
        "?page=" +
        this.parameters.params.page +
        "&gudang_id=" +
        this.parameters.params.gudang_id +
        "&zona_gudang_id=" +
        this.parameters.params.zona_gudang_id +
        "&start_date=" +
        this.parameters.params.start_date +
        "&end_date=" +
        this.parameters.params.end_date;
      // "&item_gudang_id=" +
      // this.parameters.params.item_gudang_id +
      this.parameters.params.gudang_id = this.filter_params.gudang_id.gudang_id;
      this.parameters.params.zona_gudang_id = this.filter_params.zona_gudang_id;

      await this.getData(this.parameters);
      // await this.$axios
      //   .get(url)
      //   .then((res) => {
      //     let newData = res.data.data.map((item) => {
      //       return {
      //         ...item,
      //       };
      //     });

      //     this.raw_data = res.data;
      //     data = newData;
      //     console.log(newData);
      //     console.log(this.data);
      //   })
      //   .catch((err) => {
      //     this.$globalErrorToaster(this.$toaster, err);
      //   })
      //   .finally(() => {
      //     loader.hide();
      //     this.isLoadingData = false;
      //   });

      if (this.result == true) {
        loader.hide();

        if (page == 1) {
          this.$refs["pagination"].generatePage();
        }

        this.$refs["pagination"].active_page = this.parameters.params.page;

        // this.parameters.params.warehouse_is_last_page =
        //   this.raw_data.warehouses.current_page ==
        //   this.raw_data.warehouses.last_page;
        // this.parameters.params.warehouse_last_id =
        //   this.raw_data.warehouses.data[
        //     this.raw_data.warehouses.data.length - 1
        //   ].id;
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingData = false;
    },

    loadMorePivot() {
      if (this.parameters.params.warehouse_is_loading) return;

      let product_ids = this.data.reduce(
        (itemPrev, itemNext) =>
          (itemPrev += "product_ids[]=" + itemNext.id + "&"),
        ""
      );

      this.parameters.params.warehouse_page += 1;

      this.parameters.params.warehouse_is_loading = true;

      let url =
        this.parameters.url +
        "/get-warehouse-stock?warehouse_page=" +
        this.parameters.params.warehouse_page +
        "&warehouse_per_page=" +
        this.parameters.params.warehouse_per_page +
        "&warehouse_order=" +
        this.parameters.params.warehouse_order +
        "&warehouse_sort=" +
        this.parameters.params.warehouse_sort +
        "&" +
        product_ids;

      this.$axios
        .get(url)
        .then((res) => {
          let data = this.data.map((item) => {
            let stocks = res.data.warehouse_stocks.find(
              (itemRes) => itemRes.product_id == item.id
            );

            return {
              ...item,
              stocks: [...item.stocks, ...stocks.stocks],
            };
          });

          this.set_data(data);

          this.raw_data.warehouses.data = [
            ...this.raw_data.warehouses.data,
            ...res.data.warehouses.data,
          ];

          this.parameters.params.warehouse_last_id =
            this.raw_data.warehouses.data[
              this.raw_data.warehouses.data.length - 1
            ].id;
          this.parameters.params.warehouse_is_last_page =
            res.data.warehouses.current_page == res.data.warehouses.last_page;
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.parameters.params.warehouse_is_loading = false;
        });
    },

    onSort(column, sort = "asc") {
      this.parameters.params = {
        ...this.parameters.params,
        order: column,
        sort: sort,
      };

      this.onLoad(this.parameters.params.page);
    },
    onRowSelected(index) {
      this.ActiveRow = index;
    },

    onDetail(item) {
      // this.$refs["modal-detail"].parameters.form = {
      //   ...item
      // };

      // window.$("#modal-detail").modal("show");

      this.$refs.modalDetail.parameters.form = {
        ...item,
        stok_gudang_all_id: item.stok_gudang_all_id,
      };

      // this.$refs.modalDetail.form = {
      //   stock_card_id: item.kartu_stok_id,
      // };

      // this.$refs.modalDetail.fetchItemDetail();
      this.$refs.modalDetail.fetchStockCardDetail();
      this.$refs.modalDetail.show();
      console.log("the modal should show");
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
          url: "master/gudang/get-gudang-user",
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

    async onSetGudang(item) {
      if (item) {
        this.filter_params.gudang_id = item;
        this.filter_params.zona_gudang_id = "";
        await this.onSearchZonaGudang();
      } else {
        this.filter_params.gudang_id = "";
        this.filter_params.zona_gudang_id = "";
      }
    },

    onGetZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchZonaGudang);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.zona_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchZonaGudang();
      }, 600);
    },

    async onSearchZonaGudang() {
      if (!this.isLoadingGetZonaGudang) {
        this.isLoadingGetZonaGudang = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom3",
          query:
            "?search=" +
            this.zona_gudang_search +
            "&gudang_id=" +
            this.filter_params.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaGudang = false;
      }
    },
  },
};
</script>
