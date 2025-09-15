<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Master</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Kecamatan</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="flex gap-5">
      <div
        class="relative p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
      >
        <div class="card-body">
          <div class="card-title">
            <list-option-section :self="this" ref="form-option" />
          </div>

          <div class="table-responsive w-full relative overflow-y-auto">
            <table
              class="mb-5 overflow-auto table-fixed border border-gray-300"
              ref="formContainer"
            >
              <thead>
                <tr class="text-base uppercase text-nowrap">
                  <th class="w-20 text-center border border-gray-300">Edit</th>

                  <th class="w-20 border border-gray-300 text-center">No</th>
                  <th
                    @click="
                      onSort(
                        'nama_provinsi',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pointer w-40 border border-gray-300"
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Nama Kecamatan</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'nama_kecamatan' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'nama_kecamatan' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th class="w-40 border border-gray-300">Kode Kecamatan</th>
                  <th class="w-40 border border-gray-300">Kode Alternatif</th>
                  <th class="w-40 border border-gray-300">Longitude</th>
                  <th class="w-40 border border-gray-300">Latitude</th>
                  <th class="w-40 border border-gray-300">Kota</th>
                  <th class="w-40 border border-gray-300">Provinsi</th>
                  <th class="w-40 border border-gray-300">Negara</th>
                  <th class="w-20 text-center border border-gray-300">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data" :key="i">
                  <td class="place-items-center border border-gray-300">
                    <small-edit-button @click="onEdit(item)" />
                  </td>
                  <td class="border border-gray-300 text-center">
                    {{
                      (parameters.params.page - 1) *
                        parameters.params.per_page +
                      i +
                      1
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.nama_kecamatan }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.kode_kecamatan }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.kode_alternatif }}
                  </td>
                  <td class="border border-gray-300">{{ item.longitude }}</td>
                  <td class="border border-gray-300">{{ item.latitude }}</td>
                  <td class="border border-gray-300">
                    {{ item.kota ? item.kota.nama_kota : "Tidak Ditemukan" }}
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.provinsi
                        ? item.provinsi.nama_provinsi
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.negara ? item.negara.nama_negara : "Tidak Ditemukan"
                    }}
                  </td>

                  <td class="place-items-center border border-gray-300">
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
import FormInput from "./form.vue";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Kecamatan",
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
    // this.$refs["form-option"].isExport = false;
    this.$refs["form-option"].isFilter = false;
    // this.$refs["form-option"].isMaintenancePage = false;
    // this.$refs["form-option"].isAddData = false;

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
      this.$refs["form-option"].isExportPrint = false;
    }
  },

  data() {
    return {
      title: "Kecamatan",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "master/kecamatan",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "kecamatan_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
        },
        form: {
          kota_id: "",
          provinsi_id: "",
          negara_id: "",
          nama_kecamatan: "",
          kode_kecamatan: "",
          kode_alternatif: "",
          longitude: "",
          latitude: "",
          ibukota: "",
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
    ...mapState("moduleApi", ["data", "error", "result"]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "kecamatan"
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
      this.$router.push("/master/kecamatan/add");
      // this.$refs.formInput.parameters.form = {
      //   kota_id: "",
      //   provinsi_id: "",
      //   negara_id: "",
      //   kode_kecamatan: "",
      //   kode_alternatif: "",
      //   nama_kecamatan: "",
      //   longitude: "",
      //   latitude: "",
      //   ibukota: "",
      // };
      // this.$refs.formInput.isEditable = false;
      // this.$nextTick(() => {
      //   this.$refs.formInput?.$refs?.formValidate?.reset();
      // });
    },

    onEdit(item) {
      this.$router.push("/master/kecamatan/" + item.kecamatan_id);
      // this.$refs.formInput.isEditable = true;
      // this.$refs.formInput.parameters.form = {
      //   ...item,
      //   kecamatan_id: item.kecamatan,
      //   kota_id: item.kota,
      //   provinsi_id: item.provinsi,
      //   negara_id: item.negara,
      // };
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
              id: item.kecamatan_id,
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
