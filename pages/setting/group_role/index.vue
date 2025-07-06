<template>
  <section class="section">
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Setting</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Role</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="section-body">
      <div class="flex flex-col gap-5">
        <div class="panel w-full bg-white rounded-md p-2 px-4">
          <AddForm :self="this" ref="AddForm" />
        </div>
        <div class="panel w-full bg-white rounded-md p-5">
          <div class="card-title">
            <list-option-section :self="this" ref="form-option" />
          </div>

          <div v-if="parameters.form.checkboxs.length">
            <button
              class="btn btn-sm btn-danger"
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Hapus Semua Data"
              @click="onDeleteAll()"
              v-if="parameters.params.soft_deleted != 'deleted'"
            >
              Hapus <i class="fas fa-trash"></i>
            </button>
            <button
              class="btn btn-sm btn-success"
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Restore Semua Data"
              @click="onRestoreAll()"
              v-if="parameters.params.soft_deleted"
            >
              Pulihkan <i class="fas fa-redo"></i>
            </button>
          </div>

          <!-- start table -->
          <div class="table-responsive">
            <table
              class="table table-striped table-sm vld-parent"
              ref="formContainer"
            >
              <thead>
                <tr>
                  <th class="w-[5%]">No</th>
                  <th
                    @click="
                      onSort(
                        'nama_role',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pointer w-[80%]"
                  >
                    <div class="flex flex-row justify-between items-baseline">
                      <div>Nama</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'nama_role' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'nama_role' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th class="text-center w-[5%]">Detail</th>
                  <th class="text-center w-[5%]">Edit</th>
                  <th class="text-center w-[5%]">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data" :key="i">
                  <td>
                    {{
                      (parameters.params.page - 1) *
                        parameters.params.per_page +
                      i +
                      1
                    }}
                  </td>
                  <td>{{ item.nama_role }}</td>
                  <td>
                    <span class="flex items-center justify-center">
                      <small-detail-button @click="onDetail(item)" />
                    </span>
                  </td>
                  <td>
                    <span class="flex items-center justify-center">
                      <small-edit-button @click="onEdit(item)" />
                    </span>
                  </td>
                  <td>
                    <span class="flex items-center justify-center">
                      <small-delete-button @click="onTrashed(item)" />
                    </span>
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

    <ModalDetail :self="this" ref="modalDetail" />
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import FormInput from "./form";
import ModalDetail from "./detail";
import AddForm from "./AddRoleForm.vue";

export default {
  middleware: ["checkRoleSuperAdmin"],

  head() {
    return {
      title: "Role",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  mounted() {
    this.$refs["form-option"].isExport = false;
    this.$refs["form-option"].isFilter = false;
    this.$refs["form-option"].isMaintenancePage = false;
    this.$refs["form-option"].isAddData = false;
  },

  data() {
    return {
      title: "Role",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "setting/role",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "role_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
        },
        form: {
          nama_role: "",
          type_option: "multiselect",
          grants: [],
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
    };
  },

  components: {
    FormInput,
    ModalDetail,
    AddForm,
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result"]),
  },

  methods: {
    ...mapActions("setting", ["setSetting"]),

    ...mapActions("moduleApi", [
      "getData",
      "deleteData",
      "restoreData",
      "deleteAllData",
      "restoreAllData",
    ]),

    ...mapMutations("moduleApi", ["set_data"]),

    onFormShow() {
      this.$refs.AddForm.parameters.form = {
        name: "",
        type_option: "multiselect",
        grants: [],
      };
      this.$refs.AddForm.isEditable = false;
      this.$nextTick(() => {
        this.$refs.AddForm?.$refs?.formValidate?.reset();
      });
    },

    onEdit(item) {
      this.$refs.AddForm.isEditable = true;
      this.$refs.AddForm.parameters.form = {
        ...item,
        type_option: "multiselect",
        grants: item.menu_grants.map((item) => {
          return {
            id: item.role_id,
            operators: item.operators,
            menu_id: item.menu,
          };
        }),
      };

      this.$nextTick(() => {
        this.$refs.AddForm?.$refs?.formValidate?.reset();
      });
    },

    onDetail(item) {
      this.$refs.modalDetail.parameters.form = {
        ...item,
      };
      this.$refs.modalDetail.show();
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

      this.setSetting();

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
              id: item.role_id,
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
  },
};
</script>
