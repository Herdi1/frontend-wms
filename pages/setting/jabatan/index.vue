<template>
  <section class="">
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Setting</a>
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
    <div class="flex gap-5">
      <!-- <div
        class="panel relative p-4 w-4/12 bg-white dark:bg-slate-800 rounded-md border-gray-300 mb-10"
      >
        <div class="w-full">
          <FormInput :self="this" ref="formInput" />
        </div>
      </div> -->
      <div
        class="panel relative p-4 w-full bg-white dark:bg-slate-800 rounded-md border-gray-300 mb-10"
      >
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="card-body">
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
                <table class="">
                  <thead class="text-base">
                    <tr class="">
                      <th class="w-[3%] text-center">Edit</th>
                      <!-- <th class="w-[5%]">
                        <input
                          type="checkbox"
                          id="checkAll"
                          @click="onCheckAll"
                        />
                      </th> -->
                      <th class="w-[5%]">No</th>
                      <th
                        @click="
                          onSort(
                            'kode_jabatan',
                            parameters.params.sort == 'asc' ? 'desc' : 'asc'
                          )
                        "
                        class="cursor-pointer w-[20%]"
                      >
                        <div class="flex justify-between align-baseline">
                          <div>Kode</div>
                          <div>
                            <i
                              class="fas fa-caret-up"
                              :class="
                                parameters.params.order == 'kode_jabatan' &&
                                parameters.params.sort == 'asc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                            <i
                              class="fas fa-caret-down"
                              :class="
                                parameters.params.order == 'kode_jabatan' &&
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
                            'nama_jabatan',
                            parameters.params.sort == 'asc' ? 'desc' : 'asc'
                          )
                        "
                        class="cursor-pointer w-[50%]"
                      >
                        <div class="flex justify-between align-baseline">
                          <div>Nama Jabatan</div>
                          <div>
                            <i
                              class="fas fa-caret-up"
                              :class="
                                parameters.params.order == 'nama_jabatan' &&
                                parameters.params.sort == 'asc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                            <i
                              class="fas fa-caret-down"
                              :class="
                                parameters.params.order == 'nama_jabatan' &&
                                parameters.params.sort == 'desc'
                                  ? ''
                                  : 'light-gray'
                              "
                            ></i>
                          </div>
                        </div>
                      </th>
                      <!-- <th class="w-[5%] ">Icon</th> -->

                      <th class="w-[3%] text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in data" :key="i">
                      <td class="text-center">
                        <small-edit-button @click="onEdit(item)" />
                      </td>
                      <!-- <td>
                        <input
                          type="checkbox"
                          name="checkboxs[]"
                          :value="item.menu_id"
                          v-model="parameters.form.checkboxs"
                        />
                      </td> -->
                      <td>
                        {{
                          (parameters.params.page - 1) *
                            parameters.params.per_page +
                          i +
                          1
                        }}
                      </td>
                      <td>{{ item.kode_jabatan }}</td>
                      <td>{{ item.nama_jabatan }}</td>

                      <!-- <td class="text-center">
                        <small-detail-button @click="onDetail(item)" />
                      </td> -->

                      <td class="text-center">
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
              <!-- end table -->

              <div class="mx-3 mt-2 mb-4">
                <pagination-section :self="this" ref="pagination" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalDetail ref="modalDetail" />

    <!--
    <filter-section
      :self="this"
      ref="form-filter">
      <template>
       <div class="col-md-12">
          <div class="form-group">
            <label for="role">By Role</label>
            <select name="role" class="form-control"
              v-model="parameters.params.role">
              <option value="all" selected>Pilih</option>
              <option value="0">SuperAdmin</option>
              <option value="1">Manager Area</option>
            </select>
          </div>
        </div>
      </template>
    </filter-section>
    -->
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import FormInput from "./form";
import ModalDetail from "./detail";

export default {
  middleware: ["checkRoleSuperAdmin"],

  head() {
    return {
      title: "Jabatan",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  mounted() {
    this.$refs["form-option"].isExport = false;
    this.$refs["form-option"].isFilter = false;
    this.$refs["form-option"].isMaintenancePage = true;
    this.$refs["form-option"].isAddData = true;
  },

  data() {
    return {
      title: "Jabatan",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "setting/jabatan",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "jabatan_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
        },
        form: {
          checkboxs: [],
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
      this.$router.push("/setting/jabatan/add");
      // this.$refs.formInput.parameters.form = {
      //   kode_jabatan: "",
      //   nama_jabatan: "",
      // };
      // this.$refs.formInput.isEditable = false;
      // this.$refs.formInput.show();
      // this.$nextTick(() => {
      //   this.$refs.formInput?.$refs?.formValidate?.reset();
      // });
      // this.$refs.formInput.$refs.formValidate.reset();
    },

    onEdit(item) {
      this.$router.push("/setting/jabatan/" + item.jabatan_id);

      // this.$refs.formInput.isEditable = true;
      // this.$refs.formInput.parameters.form = {
      //   ...item,
      // };
      // this.$refs.formInput.show();
      // this.$nextTick(() => {
      //   this.$refs.formInput?.$refs?.formValidate?.reset();
      // });
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
              id: item.jabatan_id,
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
        id: item.jabatan_id,
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
