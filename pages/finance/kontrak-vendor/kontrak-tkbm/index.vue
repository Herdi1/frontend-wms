<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Finance</a>
      </li>
      <li>
        <a
          href="javascript:;"
          class="text-primary hover:underline before:content-['/']"
        >
          Kontrak Vendor</a
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
    <div>
      <div
        class="relative p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
      >
        <div class="card-title">
          <list-option-section :self="this" ref="form-option" />
        </div>
        <div class="overflow-x-auto">
          <table ref="formContainer">
            <thead>
              <tr class="uppercase">
                <th class="w-[5%] text-center">Detail</th>
                <th class="w-[5%]">No</th>
                <th
                  @click="
                    onSort(
                      'no_kontrak',
                      parameters.params.sort == 'asc' ? 'desc' : 'asc'
                    )
                  "
                  class="cursor-pointer min-w-40"
                >
                  <div class="flex justify-between align-baseline">
                    <div>No Kontrak</div>
                    <div>
                      <i
                        class="fas fa-caret-up"
                        :class="
                          parameters.params.order == 'no_kontrak' &&
                          parameters.params.sort == 'asc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                      <i
                        class="fas fa-caret-down"
                        :class="
                          parameters.params.order == 'no_kontrak' &&
                          parameters.params.sort == 'desc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                    </div>
                  </div>
                </th>
                <th class="min-w-32">Vendor</th>
                <th class="min-w-40">Tanggal Kontrak</th>
                <th class="min-w-32">Status</th>
                <th class="min-w-40">Tanggal Aktif</th>
                <th class="min-w-40">Tanggal Expired</th>
                <th class="min-w-32">PIC Kontrak</th>
                <th class="min-w-32">Approver Kontrak</th>
                <th class="min-w-40">Tanggal Approve</th>
                <th class="min-w-32">Keterangan</th>
                <th class="w-[5%] text-center">Edit</th>
                <th class="w-[5%] text-center">Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td class="text-center">
                  <small-detail-button @click="onDetail(item)" />
                </td>
                <td>
                  {{
                    (parameters.params.page - 1) * parameters.params.per_page +
                    i +
                    1
                  }}
                </td>
                <td>{{ item.no_kontrak }}</td>
                <td>{{ item.vendor ? item.vendor.nama_vendor : "-" }}</td>
                <td>{{ item.tanggal_kontrak }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.tanggal_aktif }}</td>
                <td>{{ item.tanggal_expired }}</td>
                <td>{{ item.pic_kontrak }}</td>
                <td>{{ item.approver_kontrak }}</td>
                <td>{{ item.keterangan }}</td>
                <td class="text-center border border-gray-300">
                  <small-edit-button @click="onEdit(item)" />
                </td>
                <td class="text-center border border-gray-300">
                  <small-delete-button @click="onTrashed(item)" />
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
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Kontrak Vendor TKBM",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  mounted() {
    // this.$refs["form-option"].isMaintenancePage = false;
    // this.$refs["form-option"].isExport = false;
    this.$refs["form-option"].isFilter = false;
    // this.$refs["form-option"].isAddData = true;
    if (
      this.getRoles.destroy ||
      this.getRoles.destroy_all ||
      this.getRoles.restore ||
      this.getRoles.restore_all
    ) {
      this.$refs["form-option"].isMaintenancePage = false;
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
      title: "Kontrak Vendor TKBM",
      isLoadingData: false,
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
        url: "finance/kontrak-vendor/kontrak-tkbm",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "kontrak_tkbm_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          form: {
            no_kontrak: "",
            vendor_id: "",
            tanggal_kontrak: "",
            status: "",
            tanggal_aktif: "",
            tanggal_expired: "",
            user_id_pic: "",
            user_id_approve: "",
            tanggal_approve: "",
            keterangan: "",
            detail_tkbm: [],

            user_agent: "",
            device: "",
            longitude: "",
            latitude: "",
          },
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
          (item) => item.rute == "kontrak-tkbm"
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
      this.$router.push(`/finance/kontrak-vendor/kontrak-tkbm/add`);
    },

    onEdit(item) {
      this.$router.push(
        `/finance/kontrak-vendor/kontrak-tkbm/${item.kontrak_tkbm_id}`
      );
    },

    onDetail(item) {
      this.$router.push(
        `/finance/kontrak-vendor/kontrak-tkbm/detail/${item.kontrak_tkbm_id}`
      );
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
              id: item.kontrak_tkbm_id,
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
