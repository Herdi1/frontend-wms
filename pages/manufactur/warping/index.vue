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
                      <th style="width: 5%">No</th>
                      <th style="width: 10%">Kode Kain</th>
                      <th style="width: 10%">Nama Kain</th>
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
                          class="
                            d-flex
                            flex-row
                            justify-content-between
                            align-items-baseline
                          "
                        >
                          <div>Tgl</div>
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
                      <th style="width: 10%">No Batch</th>
                      <th style="Width: 10%">Jumlah</th>
                      <th class="text-center">Options</th>
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
                        {{ ((parameters.params.page-1) * parameters.params.per_page)+i  + 1 }}
                      </td>
                      <td>
                        <!-- {{ item.product.code }} <br /> -->
                        
                        <div
                          class="text-left m-0 p-0"
                          style="font-size: 12px !important"
                        >
                          
                        </div>
                      </td>
                      <td>
                        <!-- {{ item.product.name }} -->
                      </td>                      
                      <td>
                        <!-- {{ item.product.name }} -->
                      </td>                      

                      <!-- <td>{{ item.date }}</td>                       -->
                      <td>
                        {{ item.no_batch ? item.no_batch : "-" }}
                        <!-- <br/>                       
                        <hr class="m-0 mt-1 p-0"/>                        
                        <div
                          class="text-left m-0 p-0"
                          style="font-size: 12px !important"
                        >
                          <i>Keterangan : {{ item.description }}</i>
                        </div> -->
                      </td>             
                      <td>
                        Jumlah Produksi : {{ item.quantity }}
                        <!-- <br/>
                        Jumlah Selesai {{ item.production_details_sum_quantity_finish }} -->
                      </td>            
                      <td class="text-center">
                        <div class="btn-group border border-success">
                          <button
                            class="btn btn-sm"
                            v-if="!item.deleted_at"
                            @click="onPrintDetail(item)"
                          >
                            <i class="fas fa-print text-primary"></i>
                          </button>
                          <button
                            class="btn btn-sm"
                            @click="onEdit(item.id)"
                            v-if="
                              !item.deleted_at && 
                              // item.sent_to_warehouses_count == 0 &&
                              getRoles.update
                            "
                          >
                            <i class="fas fa-pen text-warning"></i>
                          </button>
                          <!-- <button
                            class="btn btn-sm"
                            @click="onTrashed(item)"
                            v-if="
                              !item.deleted_at && 
                              item.sent_to_warehouses_count == 0 &&
                              getRoles.destroy
                            "
                          >
                            <i class="fas fa-trash text-danger"></i>
                          </button>                          -->
                          <button
                            class="btn btn-sm"
                            @click="onDetail(item)"
                            v-if="getRoles.show"
                          >
                            <i class="fas fa-info-circle text-info"></i>
                          </button>                        
                        </div>
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
        </div>
      </div>
    </div>

    <ModalDetail :self="this" ref="modal-detail" />
    <FormInput
        :self="this"
        ref="form-input"
      />

    <!-- <filter-section :self="this" ref="form-filter">
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
    </filter-section> -->
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import FormInput from "./form";
import ModalDetail from "./detail";


export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Proses Warping",
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
      title: "PROSES WARPING",
      isLoadingData: false,
      isPaginate: true,
      ActiveRow: null,
      parameters: {

        url: "manufactur/productionproses",
        // url: "manufactur/productionproses/get-konstruksi",

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
          master_proces_id:'2',
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
    FormInput,
    ModalDetail,
  },

  computed: {
    ...mapState("moduleApi", [
      "data", 
      "error", 
      "result"
    ]),

    getRoles() {
      if (!this.user.parent_id) {
        return this.default_roles;
      } else {
        let main_role = this.user.group_role.roles.find(
          (item) => item.name == "warping"
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
    ]),

    ...mapMutations("moduleApi", [
      "set_data"
    ]),

    onFormShow() {
      // this.$refs["form-input"].parameters.form = {
      //   code: '',
      //   name: '',
      //   vendor_machine_id: "",
      //   tahun: "",
      // };
      this.$refs["form-input"].isEditable = false;
      window.$("#modal-form").modal("show")
      this.$refs["form-input"].$refs['form-validate'].reset();
      // this.$refs["form-input"].setCode();
      // this.$router.push("/manufactur/warping/add");
    },

    onEdit(id) {
      this.$router.push("/manufactur/warping/" + id);
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
          "/manufactur/production/get-print-detail/" +
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
    }
  },
};
</script>