<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Master</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Kota</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="flex sm:flex-col md:flex-row gap-5">
      <div
        class="relative p-4 sm:w-full md:w-4/12 bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
      >
        <FormInput :self="this" ref="formInput" />
      </div>
      <div
        class="relative p-4 sm:w-full md:w-8/12 bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
      >
        <div class="card-body">
          <div class="card-title">
            <list-option-section :self="this" ref="form-option" />
          </div>

          <div class="table-responsive">
            <table class="mb-5" ref="formContainer">
              <thead>
                <tr class="text-base uppercase">
                  <th class="w-[5%]">No</th>
                  <th
                    @click="
                      onSort(
                        'nama_kota',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pointer"
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Nama Kota</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'nama_kota' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'nama_kota' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th>Kode Kota</th>
                  <th>Longitude</th>
                  <th>Latitude</th>
                  <th>Provinsi</th>
                  <th>Negara</th>
                  <th class="w-[5%] text-center">Edit</th>
                  <th class="w-[5%] text-center">Delete</th>
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
                  <td>{{ item.nama_kota }}</td>
                  <td>{{ item.kode_kota ? item.kode_kota : "-" }}</td>
                  <td>{{ item.longitude }}</td>
                  <td>{{ item.latitude }}</td>
                  <td>
                    {{
                      item.provinsi
                        ? item.provinsi.nama_provinsi
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td>
                    {{
                      item.negara ? item.negara.nama_negara : "Tidak Ditemukan"
                    }}
                  </td>
                  <td class="text-center">
                    <small-edit-button @click="onEdit(item)" />
                  </td>
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

          <div class="mx-3 mt-2 mb-4">
            <pagination-section :self="this" ref="pagination" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import FormInput from "./form";
export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Kota",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  components: {
    FormInput,
  },

  mounted() {
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
  },

  data() {
    return {
      title: "Kota",
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
        url: "master/kota",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "kota_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
        },
        form: {
          negara_id: "",
          provinsi_id: "",
          longitude: "",
          latitude: "",
          nama_kota: "",
          kode_kota: "",
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
    };
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result"]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "kota"
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

    ...mapMutations("moduleApi", ["set_data"]),

    onFormShow() {
      this.$refs.formInput.parameters.form = {
        negara_id: "",
        provinsi_id: "",
        longitude: "",
        latitude: "",
        nama_kota: "",
        kode_kota: "",
      };
      this.$refs.formInput.isEditable = false;
      this.$nextTick(() => {
        this.$refs.formInput?.$refs?.formValidate?.reset();
      });
    },

    onEdit(item) {
      this.$refs.formInput.isEditable = true;
      this.$refs.formInput.parameters.form = {
        ...item,
        provinsi_id: item.provinsi,
        negara_id: item.negara,
      };
      // this.$refs.formInput.onSelectProvinsi(item.provinsi);
      this.$nextTick(() => {
        this.$refs.formInput?.$refs?.formValidate?.reset();
      });
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

            const res = await this.deleteData({
              url: this.parameters.url,
              id: item.kota_id,
              params: this.parameters.params,
            });

            if (this.result) {
              this.parameters.params.soft_deleted = 1;
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
  },
};
</script>
