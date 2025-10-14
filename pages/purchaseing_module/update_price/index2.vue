<template>
  <section class="section">
    <div class="section-body">
      <div class="row">
        <div class="col-12 col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <list-option-section :self="this" ref="form-option" />
              </div>

              <!-- start table -->
              <div class="table-responsive">
                <table
                  class="table table-striped table-sm vld-parent table-hover"
                  ref="formContainer"
                >
                  <thead>
                    <tr>
                      <th
                        @click="
                          onSort(
                            'date',
                            parameters.params.sort == 'asc' ? 'desc' : 'asc'
                          )
                        "
                        class="cursor-pointer"
                        style="width: 10%"
                      >
                        <div
                          class="d-flex flex-row justify-content-between align-items-baseline"
                        >
                          <div>P/R No</div>
                          <div>
                            <i
                              class="fas fa-caret-up"
                              :class="
                                parameters.params.order == 'date' &&
                                parameters.params.sort == 'asc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                            <i
                              class="fas fa-caret-down"
                              :class="
                                parameters.params.order == 'date' &&
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
                            'date',
                            parameters.params.sort == 'asc' ? 'desc' : 'asc'
                          )
                        "
                        class="cursor-pointer"
                        style="width: 5%"
                      >
                        <div
                          class="d-flex flex-row justify-content-between align-items-baseline"
                        >
                          <div>P/R Date</div>
                          <div>
                            <i
                              class="fas fa-caret-up"
                              :class="
                                parameters.params.order == 'date' &&
                                parameters.params.sort == 'asc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                            <i
                              class="fas fa-caret-down"
                              :class="
                                parameters.params.order == 'date' &&
                                parameters.params.sort == 'desc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                          </div>
                        </div>
                      </th>
                      <th style="width: 5%">ProductID</th>

                      <th style="width: 10%">Description</th>
                      <th style="width: 5%">Qty</th>
                      <th style="width: 5%">Unit</th>
                      <th style="width: 10%">Supplier</th>
                      <th style="width: 10%">Unit Price</th>
                      <th style="width: 10%">Date Price</th>
                      <th style="width: 10%">Last PO Price</th>
                      <th style="width: 10%">Last PO</th>
                      <th style="width: 10%">Total Price</th>
                      <th style="width: 10%">Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      :class="{ 'table-active': ActiveRow == i }"
                      v-for="(item, i) in data"
                      :key="i"
                      @click="onRowSelected(i)"
                    >
                      <td>
                        {{
                          item.permintaan_pembeliaan
                            ? item.permintaan_pembeliaan.code
                            : "-"
                        }}
                      </td>
                      <td>
                        {{
                          item.permintaan_pembeliaan
                            ? item.permintaan_pembeliaan.tanggal
                            : "-"
                        }}
                      </td>
                      <td>{{ item.product ? item.product.code : "-" }}</td>
                      <td>
                        {{ item.product ? item.product.name : "-" }}
                      </td>
                      <td>
                        {{ item.quantity }}
                      </td>
                      <td class="text-center">
                        {{ item.product ? item.product.purchase_unit : "-" }}
                      </td>

                      <td class="table-transaction-row">
                        <v-select
                          label="name"
                          :loading="isLoadingGetSupplier"
                          :options="lookup_suppliers.data"
                          :filterable="false"
                          @search="onGetSupplier"
                          @input="onSetSupplier"
                          v-model="form.supplier_id"
                        >
                          <template v-slot:option="option">
                            <div class="row">
                              <div class="col-md-5 p-1 m-0">
                                {{ option.name }}
                              </div>
                              <div class="col-md-7 p-1 m-0 text-right">
                                {{ option.code }}
                              </div>
                            </div>
                          </template>
                          <template #search="{ attributes, events }">
                            <input
                              class="vs__search"
                              :required="!form.supplier_id"
                              v-bind="attributes"
                              v-on="events"
                            />
                          </template>
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="d-flex justify-content-between"
                            v-if="lookup_suppliers.data.length || search"
                          >
                            <span
                              v-if="lookup_suppliers.current_page > 1"
                              @click="onGetSupplier(search, false)"
                              class="flex-fill bg-primary text-white text-center"
                              style="cursor: pointer"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_suppliers.last_page >
                                lookup_suppliers.current_page
                              "
                              @click="onGetSupplier(search, true)"
                              class="flex-fill bg-primary text-white text-center"
                              style="cursor: pointer"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
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
                <pagination-component :self="this" ref="pagination" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalDetail :self="this" ref="modal-detail" />

    <filter-section :self="this" ref="form-filter">
      <template>
        <div class="col-md-12">
          <div class="mb-3"><b>Tanggal Awal</b></div>
          <div class="form-group">
            <input
              type="date"
              class="form-control"
              v-model="parameters.params.start_date"
            />
          </div>
          <div class="mb-3"><b>Tanggal Akhir</b></div>
          <div class="form-group">
            <input
              type="date"
              class="form-control"
              v-model="parameters.params.end_date"
            />
          </div>
        </div>
      </template>
    </filter-section>
  </section>
</template>

<script>
import ModalDetail from "./detail";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Update P/R Price",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  mounted() {
    this.$refs["form-option"].isAddData = false;
    this.$refs["form-option"].isMaintenancePage = false;
    this.$refs["form-option"].isFilter = true;
    this.$refs["form-option"].isExport = true;
    this.$refs["form-option"].isExportFile = false;
    this.$refs["form-option"].isExportPrint = false;

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
  },

  data() {
    return {
      title: "UPDATE P/R PRICE",
      isLoadingData: false,

      isStopSearchSupplier: false,
      isLoadingGetSupplier: false,
      supplier_search: "",

      isPaginate: true,
      ActiveRow: null,
      parameters: {
        url: "purchaseing_module/update_price",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_date: "",
          jenis: "GOODS",
        },
        default_params: {
          soft_deleted: "",
          search: "",
          order: "id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_date: "",
          jenis: "GOODS",
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
      user: { ...this.$auth.user },
    };
  },

  components: {
    ModalDetail,
  },

  async mounted() {
    await this.onSearchSupplier();
  },

  computed: {
    ...mapState("moduleApi", ["lookup_suppliers", "data", "error", "result"]),

    getRoles() {
      if (!this.user.parent_id) {
        return this.default_roles;
      } else {
        let main_role = this.user.group_role.roles.find(
          (item) => item.name == "permintaan_pembelian"
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
      this.$router.push("/purchaseing_module/permintaan_pembelian/add");
    },

    onEdit(id) {
      this.$router.push("/purchaseing_module/permintaan_pembelian/" + id);
    },

    onGetSupplier(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSupplier);

      this.isStopSearchSupplier = setTimeout(() => {
        this.supplier_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchSupplier();
      }, 600);
    },

    async onSearchSupplier() {
      if (!this.isLoadingGetSupplier) {
        this.isLoadingGetSupplier = true;

        await this.lookUp({
          url: "purchaseing_module/po_supplier/get-supplier",
          lookup: "suppliers",
          query:
            "?search=" +
            this.supplier_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSupplier = false;
      }
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = parseInt(page) || 1;

      this.parameters.form.checkboxs = [];
      if (document.getElementById("checkAll")) {
        document.getElementById("checkAll").checked = false;
      }

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      await this.getData(this.parameters);

      if (this.result == true) {
        loader.hide();

        if (page == 1) {
          //this.$refs["pagination"].generatePage();
        }

        this.$refs["pagination"].active_page = this.parameters.params.page;
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingData = false;
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
              id: item.id,
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

    async onRestored(item) {
      if (this.parameters.loadings.isRestore) return;

      this.parameters.loadings.isRestore = true;

      await this.restoreData({
        url: this.parameters.url,
        id: item.id,
        params: this.parameters.params,
      });

      if (this.result == true) {
        this.onLoad(this.parameters.params.page);
        this.$toaster.success("Data berhail di restore");
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.parameters.loadings.isRestore = false;
    },

    async onRestoreAll() {
      if (
        !this.parameters.form.checkboxs.length ||
        this.parameters.loadings.isRestore
      )
        return;

      this.parameters.loadings.isRestore = true;

      await this.restoreAllData({
        url: this.parameters.url,
        checkboxs: this.parameters.form.checkboxs,
        params: this.parameters.params,
      });

      if (this.result == true) {
        this.onLoad(this.parameters.params.page);
        this.parameters.form.checkboxs = [];
        document.getElementById("checkAll").checked = false;
        this.$toaster.success("Data berhail di restore");
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.parameters.loadings.isRestore = false;
    },

    onDeleteAll() {
      if (
        !this.parameters.form.checkboxs.length ||
        this.parameters.loadings.isDelete
      )
        return;

      this.$confirm({
        auth: false,
        message: "Semua Data ini akan dipindahkan ke dalam Trash. Yakin ??",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: async (confirm) => {
          if (confirm) {
            this.parameters.loadings.isDelete = true;

            await this.deleteAllData({
              url: this.parameters.url,
              checkboxs: this.parameters.form.checkboxs,
              params: this.parameters.params,
            });

            if (this.result == true) {
              this.onLoad();
              this.parameters.form.checkboxs = [];
              document.getElementById("checkAll").checked = false;
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

    onCheckAll(evt) {
      let tmpCheckboxs = [];

      document.querySelectorAll("input[name='checkboxs[]']").forEach((item) => {
        item.checked = evt.target.checked;
        if (evt.target.checked) {
          tmpCheckboxs.push(item.value);
        }
      });

      this.parameters.form.checkboxs = tmpCheckboxs;
    },

    onSort(column, sort = "asc") {
      this.parameters.params = {
        ...this.parameters.params,
        order: column,
        sort: sort,
      };

      this.onLoad(this.parameters.params.page);
    },

    onPrintDetail(item) {
      var token = this.$cookiz.get("auth._token.local").replace("Bearer ", "");

      window.open(
        process.env.API_URL +
          "/manufactur/material_requirement/get-print-detail/" +
          item.id +
          "?token=" +
          token,
        "_blank"
      );
    },

    onDetail(item) {
      this.$refs["modal-detail"].parameters.form = {
        ...item,
      };

      window.$("#modal-detail").modal("show");
    },

    onRowSelected(index) {
      this.ActiveRow = index;
    },
  },
};
</script>
