<template>
  <section class="section">
    <div class="section-body">
      <div class="row">
        <div class="col-12 col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <list-option-section :self="this" ref="form-option">
                  <template v-if="getRoles.import">
                    <button
                      class="btn btn-sm btn-primary btn-block"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-original-title="Import"
                      @click="$router.push('/master/product/import')">
                      <i class="fas fa-file"></i> Import
                    </button>
                  </template>
                </list-option-section>
              </div>

              <div v-if="parameters.form.checkboxs.length" class="p-1">
                <button
                  class="btn btn-sm btn-danger"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="Hapus Semua Data"
                  @click="onDeleteAll()"
                  v-if="
                    parameters.params.soft_deleted != 'deleted' &&
                    getRoles.destroy_all
                  "
                >
                  Hapus <i class="fas fa-trash"></i>
                </button>
                <button
                  class="btn btn-sm btn-success"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="Restore Semua Data"
                  @click="onRestoreAll()"
                  v-if="parameters.params.soft_deleted && getRoles.restore_all"
                >
                  Pulihkan <i class="fas fa-redo"></i>
                </button>
              </div>

              <!-- start table -->
              <div class="table-responsive">
                <table
                  class="table table-striped table-sm vld-parent table-hover"
                  ref="formContainer">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          id="checkAll"
                          @click="onCheckAll"
                          v-if="getRoles.destroy_all || getRoles.restore_all"
                        />
                      </th>
                      <th style="width: 3%">No</th>
                      <th
                        @click="onSort('tanggal',parameters.params.sort == 'asc' ? 'desc' : 'asc')"
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
                          <div style="width: 25%">Date</div>
                          <div>
                            <i
                              class="fas fa-caret-up"
                              :class="
                                parameters.params.order == 'tanggal' &&
                                parameters.params.sort == 'asc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                            <i
                              class="fas fa-caret-down"
                              :class="
                                parameters.params.order == 'tanggal' &&
                                parameters.params.sort == 'desc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                          </div>
                        </div>
                      </th>
                      <th style="width: 5%">Group</th>
                      <th style="width: 5%">Speed</th>
                        <th style="width: 5%">Set</th>
                        <th style="width: 10%">RefNo</th>
                        <th style="width: 15%">Batch</th>
                        <th style="width: 10%">ProductID</th>
                        <th style="width: 15%">ProductName</th>
                        <th style="width: 15%">SPK Qty</th>
                        <th style="width: 5%">Beam</th>

                      <th style="width: 5%">MchNo</th>
                      
                      <th style="width: 5%">Length</th>
                      <th style="width: 5%">GrossWeight</th>
                      <th style="width: 5%">BeamWeight</th>
                      <th style="width: 5%">NettWeight</th>
                      <th style="width: 5%">TotalEnds</th>

                      <th class="text-center">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in data"
                      :class="{'table-active' : ActiveRow == i}"
                      :key="i"
                      @click="onRowSelected(i)">
                      <td>
                        <input
                          type="checkbox"
                          name="checkboxs[]"
                          :value="item.id"
                          v-model="parameters.form.checkboxs"
                          v-if="getRoles.destroy_all || getRoles.restore_all"
                        />
                      </td>
                      <td>
                        {{
                          (parameters.params.page - 1) * parameters.params.per_page + i + 1
                        }}
                      </td>
                      <td>
                        {{ item.tanggal }}
                      </td>
                      <td>{{ item.regu.code }}</td> 
                      <td>{{ item.speed }}</td>  
                      <td>{{ item.no_set }}</td>  
                        <td>{{ item.code }}</td>
                        <td>{{ item.production_detail.no_batch }}</td>  
                        <td>{{ item.production_detail.product.code }}</td>                  
                        <td>{{ item.production_detail.product.name }}</td> 
                      <td></td>                  
                      <td>{{ item.master_beam.code }}</td>                  
                      <td>{{ item.master_machine.code }}</td> 
                      <td>{{ item.length }}</td>  
                      <td>{{ item.gross_weight }}</td>  
                      <td>{{ item.beam_weight }}</td>  
                      <td>{{ item.nett_weight }}</td>  
                      <td>{{ item.counter }}</td>  
                      
                  
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
                            @click="onEdit(item)"
                            v-if="!item.deleted_at && getRoles.update"
                          >
                            <i class="fas fa-pen text-warning"></i>
                          </button>
                          <button
                            class="btn btn-sm"
                            @click="onTrashed(item)"
                            v-if="!item.deleted_at && getRoles.destroy"
                          >
                            <i class="fas fa-trash text-danger"></i>
                          </button>
                          <button
                            class="btn btn-sm"
                            @click="onRestored(item)"
                            v-if="item.deleted_at && getRoles.restore"
                          >
                            <i class="fas fa-redo text-success"></i>
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

    
    <filter-section
      :self="this"
      ref="form-filter">
      <template>
  
        <div class="col-md-12">
          <div class="form-group">
            <label for="role">Group</label>
            <input type="text" 
              class="form-control"
              v-model="parameters.params.product_spesifiaction_group"/>
          </div>
        </div>

        <div class="col-md-12">
          <div class="form-group">
            <label for="role">Properties</label>
            <input type="text" 
              class="form-control"
              v-model="parameters.params.product_spesification_propertie"/>
          </div>
        </div>

        <div class="col-md-12">
          <div class="form-group">
            <label for="role">Value</label>
            <input type="text" 
              class="form-control"
              v-model="parameters.params.product_spesification_value"/>
          </div>
        </div>
        
      </template>
    </filter-section>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Production Activity",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  components: {
    CoolLightBox,
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
      title: "Production Activity",
      ActiveRow: null,
      isLoadingData: false,
      isPaginate: true,
      indexPreviewImages: null,
      parameters: {
        url: "manufactur/production_activity",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "id",
          sort: "desc",
          all: "",
          per_page: 10,
          master_proces_id: 36,

          page: 1,      
          product_spesification_id: '1',
          product_spesifiaction_group : '',
          product_spesification_propertie : '',
          product_spesification_value : ''
        },
        default_params: {
          soft_deleted: "",
          search: "",
          order: "id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,   
          master_proces_id: 36,

          product_spesification_id: '1',
          product_spesifiaction_group : '',
          product_spesification_propertie : '',
          product_spesification_value : ''
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
      user: this.$auth.user,
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "data", 
      "error", 
      "result",
    ]),

    getRoles() {
      if (!this.user.parent_id) {
        return this.default_roles;
      } else {
        let main_role = this.user.group_role.roles.find(
          (item) => item.name == "production_activity"
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
      "lookUp"
    ]),

    ...mapMutations("moduleApi", [
      "set_data"
    ]),

    onFormShow() {
      this.$router.push("/manufactur/production_activity/folding/add");
    },

    onEdit(item) {
      this.$router.push("/manufactur/production_activity/folding/" + item.id);
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

    onPrintDetail(item) {
      var token = this.$cookiz.get("auth._token.local").replace("Bearer ", "");

      window.open(
        process.env.API_URL +
        "/manufactur/production_activity/get-folding/" +
        item.id +
        "?token=" +
        token,
        "_blank"
      );
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

    onRowSelected(index) {
      this.ActiveRow = index;
    },

    product_picture(image) {
      return (
        process.env.IMAGES_API_URL + "products/" + image || "/img/" + image
      );
    },

    stentecase(value){
      if(value){
        return value[0].toUpperCase() + value.slice(1).toLowerCase();
      }else{
        return '-';
      }
    }
  },
};
</script>