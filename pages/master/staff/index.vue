<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Master</a>
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
    <div class="flex sm:flex-col md:flex-row gap-5">
      <div
        class="w-full relative bg-white dark:bg-slate-800 rounded-md p-2 px-4"
      >
        <div>
          <list-option-section :self="this" ref="form-option" />
        </div>
        <div class="overflow-x-auto">
          <table ref="formContainer">
            <thead>
              <tr class="uppercase">
                <th class="w-[5%] text-center">Detail</th>
                <th class="w-[5%]">No</th>
                <th class="min-w-28">Kode Staff</th>
                <th
                  @click="
                    onSort(
                      'nama_lengkap',
                      parameters.params.sort == 'asc' ? 'desc' : 'asc'
                    )
                  "
                  class="cursor-pointer min-w-40"
                >
                  <div class="flex justify-between align-baseline">
                    <div>Nama Lengkap</div>
                    <div>
                      <i
                        class="fas fa-caret-up"
                        :class="
                          parameters.params.order == 'nama_lengkap' &&
                          parameters.params.sort == 'asc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                      <i
                        class="fas fa-caret-down"
                        :class="
                          parameters.params.order == 'nama_lengkap' &&
                          parameters.params.sort == 'desc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                    </div>
                  </div>
                </th>
                <th class="min-w-28">Email</th>
                <th class="min-w-28">Jabatan</th>
                <th class="min-w-28">NIK</th>
                <th class="min-w-28">No KTP</th>
                <th class="min-w-28">No BPJS</th>
                <th class="min-w-28">Jenis Kelamin</th>
                <th class="min-w-28">Status</th>
                <th class="min-w-28">Jenis Staff</th>
                <th class="min-w-36">Alamat</th>
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
                <td>{{ item.kode_staff }}</td>
                <td>{{ item.nama_lengkap }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.jabatan ? item.jabatan.nama_jabatan : "-" }}</td>
                <td>{{ item.nik }}</td>
                <td>{{ item.no_ktp }}</td>
                <td>{{ item.no_bpjs }}</td>
                <td>
                  {{
                    item.jenis_kelamin === "l"
                      ? "Laki Laki"
                      : item.jenis_kelamin === "p"
                      ? "Perempuan"
                      : "-"
                  }}
                </td>
                <td>
                  {{
                    item.status_aktif === "1"
                      ? "AKtif"
                      : item.status_aktif === "0"
                      ? "Tidak Aktif"
                      : "-"
                  }}
                </td>
                <td>{{ item.jenis_user }}</td>
                <td>{{ item.alamat }}</td>
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
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Staff",
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
      title: "Staff",
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
        url: "master/staff",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "staff_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          form: {
            kode_staff: "",
            nama_lengkap: "",
            email: "",
            tanggal_lahir: "",
            jabatan_id: "",
            pelanggan_id: "",
            tipe_sim_id: "",
            vendor_id_operator: "",
            no_hp: "",
            nik: "",
            no_ktp: "",
            no_npwp: "",
            no_sim: "",
            sim_expired: "",
            no_bpjs: "",
            skck: "",
            tanggal_gabung: "",
            jenis_kelamin: "",
            status_aktif: "",
            jenis_user: "",
            alamat: "",
            keterangan: "",
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
          (item) => item.rute == "staff"
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
      this.$router.push("/master/staff/add");
    },

    onEdit(item) {
      this.$router.push("/master/staff/" + item.staff_id);
    },

    onDetail(item) {
      this.$router.push("/master/staff/detail" + item.staff_id);
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = page;

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
              id: item.staff_id,
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
        id: item.staff_id,
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
