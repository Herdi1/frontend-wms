<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline"
          >Inventory</a
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
    <div class="flex gap-5">
      <div
        class="relative p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
      >
        <div class="card-body">
          <div class="card-title">
            <list-option-section :self="this" ref="form-option" />
          </div>
          <div class="table-responsive w-full relative">
            <table class="mb-5 overflow-auto table-fixed" ref="formContainer">
              <thead>
                <tr class="uppercase">
                  <th class="w-[100px] text-center">Detail</th>
                  <th class="w-[100px] text-center">No</th>
                  <th class="w-[150px]">Nomor Stok Opname</th>
                  <th class="w-[150px]">Tanggal Stok Opname</th>
                  <th class="w-[150px]">Status Stok Opname</th>
                  <th class="w-[150px]">Tanggal Status Stok Opname</th>
                  <th class="w-[150px]">Status Adjusment</th>
                  <th class="w-[150px]">Tanggal Status Adjusment</th>
                  <th class="w-[150px]">User Input</th>
                  <th class="w-[150px]">Jabatan Input</th>
                  <th class="w-[150px]">Zona</th>
                  <th class="w-[150px]">Lokasi Aisle</th>
                  <th class="w-[150px]">Lokasi Rack</th>
                  <th class="w-[150px]">Lokasi Level</th>
                  <th class="w-[150px]">Lokasi Bin</th>
                  <th class="w-[100px] text-center">Edit</th>
                  <th class="w-[100px] text-center">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data" :key="i">
                  <td class="text-center place-content-center">
                    <small-detail-button @click="onDetail(item)" />
                  </td>
                  <td>
                    {{
                      (parameters.params.page - 1) *
                        parameters.params.per_page +
                      i +
                      1
                    }}
                  </td>
                  <td>{{ item.no_stok_opname }}</td>
                  <td>{{ item.tanggal_stok_opname }}</td>
                  <td>{{ item.status_stok_opname }}</td>
                  <td>{{ item.tanggal_status_stok_opname }}</td>
                  <td>{{ item.status_adjusment }}</td>
                  <td>{{ item.tanggal_status_adjusment }}</td>
                  <td>{{ item.user_id_input }}</td>
                  <td>{{ item.jabatan_id_input }}</td>
                  <td>{{ item.slot_penyimpanan_id_aisle_plan }}</td>
                  <td>{{ item.slot_penyimpanan_id_rack_plan }}</td>
                  <td>{{ item.slot_penyimpanan_id_level_plan }}</td>
                  <td>{{ item.slot_penyimpanan_id_bin_plan }}</td>
                  <td class="place-content-center">
                    <small-edit-button @click="onEdit(item)" />
                  </td>
                  <td class="place-content-center">
                    <small-delete-button
                      @click="onTrashed(item)"
                      v-if="!item.deleted_at"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      title: "Stok Opname",
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
      title: "Stok Opname",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "inventory/stok-opname",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "stok_opname_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_date: "",
        },
        form: {
          no_stok_opname: "",
          tanggal_stok_opname: "",
          status_stok_opname: "",
          tanggal_status_stok_opname: "",
          status_adjusment: "",
          tanggal_status_adjusment: "",
          user_id_input: "",
          jabatan_id_input: "",
          zona_gudang_id: "",
          slot_penyimpanan_id_aisle_plan: "",
          slot_penyimpanan_id_rack_plan: "",
          slot_penyimpanan_id_level_plan: "",
          slot_penyimpanan_id_bin_plan: "",
          detail_produk_opname: [],

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
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
          (item) => item.rute == "stok-opname"
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
      this.$router.push("/inventory/stok-opname/add");
    },

    onEdit(item) {
      this.$router.push("/inventory/stok-opname/" + item.stok_opname_id);
    },

    onDetail(item) {
      this.$router.push("/inventory/stok-opname/detail" + item.stok_opname_id);
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
              id: item.stok_opname_id,
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
