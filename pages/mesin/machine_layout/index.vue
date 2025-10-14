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
                      <th style="width: 15%">Mesin</th>
                      <th style="width: 25%">Operator</th>
                      <th style="width: 10%">Work Center</th>
                      <th style="width: 10%">Regu</th>
                      <th style="width: 10%">Jenis</th>
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
                        {{
                          (parameters.params.page - 1) *
                            parameters.params.per_page +
                          i +
                          1
                        }}
                      </td>
                      <td>
                        {{
                          item.master_machine ? item.master_machine.name : "-"
                        }}
                      </td>
                      <td>
                        {{ item.karyawan ? item.karyawan.name : "-" }} ({{
                          item.karyawan ? item.karyawan.code : "-"
                        }})
                      </td>
                      <td>
                        {{ item.work_center ? item.work_center.name : "-" }}
                      </td>
                      <td>{{ item.regu ? item.regu.name : "-" }}</td>
                      <td>
                        {{
                          item.jenis == 0
                            ? "Operator"
                            : item.jenis == 1
                            ? "PK"
                            : item.jenis == 2
                            ? "Mekanik"
                            : "Kaur"
                        }}
                      </td>

                      <td class="text-center">
                        <div class="btn-group border border-success">
                          <button
                            class="btn btn-sm"
                            @click="onDetail(item)"
                            v-if="getRoles.show"
                          >
                            <i class="fas fa-info-circle text-info"></i>
                          </button>
                          <!-- <button
                            class="btn btn-sm"
                            v-if="!item.deleted_at"
                            @click="onPrintDetail(item)"
                          >
                            <i class="fas fa-print text-primary"></i>
                          </button> -->
                          <!-- <button
                            class="btn btn-sm"
                            @click="onEdit(item.id)"
                            v-if="
                              // !item.deleted_at &&
                              // item.is_can_update_or_delete &&
                              // parseFloat(item.material_requirement_details_sum_quantity_receive) == 0 &&
                              getRoles.update
                            "
                          >
                            <i class="fas fa-pen text-warning"></i>
                          </button> -->
                          <!-- <button
                            class="btn btn-sm"
                            @click="onTrashed(item)"
                            v-if="
                              // !item.deleted_at &&
                              // item.is_can_update_or_delete &&
                              // parseFloat(item.material_requirement_details_sum_quantity_receive) == 0 &&
                              getRoles.destroy
                            "
                          >
                            <i class="fas fa-trash text-danger"></i>
                          </button>                          -->
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
          <div class="mb-3"><b>Jenis</b></div>
          <div class="form-group">
            <select class="form-control" v-model="parameters.params.jenis">
              <option value="">Pilih</option>
              <option value="0">Operator Pegangan</option>
              <option value="1">Perbaikan Kain (PK)</option>
              <option value="2">Mekanik</option>
              <option value="3">Kaur</option>
            </select>
          </div>
          <div class="mb-3"><b>Regu</b></div>
          <div class="form-group">
            <select class="form-control" v-model="parameters.params.regu_id">
              <option value="">Pilih</option>
              <option
                v-for="item in lookup_custom1.data"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>

          <div class="mb-3"><b>Work Center</b></div>
          <div class="form-group">
            <select
              class="form-control"
              v-model="parameters.params.work_center_id"
            >
              <option value="">Pilih</option>
              <option
                v-for="item in lookup_custom2.data"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <!-- <div class="mb-3"><b>Tanggal Akhir</b></div>
          <div class="form-group">
            <input
              type="date"
              class="form-control"
              v-model="parameters.params.end_date"
            />
          </div> -->
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
      title: "Permintaan Pembelian",
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

    this.lookUp({
      url: "master/regu/get-regu",
      lookup: "custom1",
      query: "?order=id&sort=asc",
    });

    this.lookUp({
      url: "master/work_center/get-work-center",
      lookup: "custom2",
      query: "?order=id&sort=asc",
    });
  },

  data() {
    return {
      title: "MACHINE LAYOUT",
      isLoadingData: false,
      isPaginate: true,
      ActiveRow: null,
      parameters: {
        url: "machine/machine_layout",
        type: "pdf",
        params: {
          soft_deleted: "",
          jenis: "",
          regu_id: "",
          search: "",
          order: "master_machine_id",
          sort: "asc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_date: "",
          group_karyawan: "1",
          work_center_id: "",
        },
        default_params: {
          soft_deleted: "",
          search: "",
          jenis: "",
          regu_id: "",
          order: "master_machine_id",
          sort: "asc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_date: "",
          group_karyawan: "1",
          work_center_id: "",
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

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "lookup_custom2",
      "lookup_custom1",
      "result",
    ]),

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
      this.$router.push("/mesin/machine_layout/add");
    },

    onEdit(id) {
      this.$router.push("/mesin/machine_layout/" + id);
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
          "/purchaseing_module/permintaan_pembelian/get-print-detail/" +
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
