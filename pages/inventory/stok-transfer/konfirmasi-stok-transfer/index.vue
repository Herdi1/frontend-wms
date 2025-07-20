<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline"
          >Inventory</a
        >
      </li>
      <li>
        <a
          href="javascript:;"
          class="text-primary hover:underline before:content-['/']"
        >
          Stok Transfer</a
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
        <div class="card-body">
          <div class="card-title">
            <list-option-section :self="this" ref="form-option" />
          </div>

          <div class="w-full mt-3 mb-7">
            <div
              class="flex w-full gap-5 justify-between items-baseline p-2 border border-gray-300 rounded-md"
            >
              <div class="grid grid-cols-1 gap-5 w-full">
                <div class="form-group">
                  <input-horizontal
                    label="Periode Awal"
                    type="date"
                    name="kode_sap"
                    :isHorizontal="true"
                    v-model="parameters.params.start_date"
                    :required="false"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-5 w-full">
                <div class="form-group">
                  <input-horizontal
                    label="Periode Akhir"
                    type="date"
                    name="periode_akhir"
                    :isHorizontal="true"
                    v-model="parameters.params.end_date"
                    :required="false"
                  />
                </div>
              </div>

              <div class="flex gap-3 ml-5">
                <button
                  @click="onLoad"
                  class="bg-blue-500 hover:bg-blue-500 p-2 text-white rounded-md flex"
                >
                  <i class="fa fa-filter text-white font-bold mr-2"></i>
                  <div>Filter</div>
                </button>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <table class="mb-5 border border-gray-300" ref="formContainer">
              <thead>
                <tr class="text-base uppercase text-nowrap">
                  <th class="w-[5%] border border-gray-300">Edit</th>
                  <th class="w-[5%] border border-gray-300">Detail</th>
                  <th class="w-[5%] border border-gray-300">No</th>
                  <th class="border border-gray-300">Kode Stok Transfer</th>
                  <th class="border border-gray-300">Tanggal</th>
                  <th class="border border-gray-300">Gudang Penerima</th>
                  <th class="border border-gray-300">Gudang Asal</th>
                  <th class="border border-gray-300">Status Konfirmasi</th>
                  <th class="border border-gray-300">Tanggal Konfirmasi</th>
                  <th class="w-[5%] border border-gray-300">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data" :key="i">
                  <td class="text-center border border-gray-300">
                    <small-edit-button @click="onEdit(item)" />
                  </td>
                  <td class="text-center border border-gray-300">
                    <small-edit-button @click="onEdit(item)" />
                  </td>
                  <td class="border border-gray-300">
                    {{
                      (parameters.params.page - 1) *
                        parameters.params.per_page +
                      i +
                      1
                    }}
                  </td>
                  <td class="border border-gray-300">
                    <div>
                      {{ item.kode_stok_transfer }}
                      <p v-if="item.user_input" class="text-blue-500">
                        <i>Dibuat oleh: {{ item.user_input.username }}</i>
                      </p>
                      <p v-else class="text-blue-500">
                        <i>Dibuat oleh: Sistem</i>
                      </p>
                    </div>
                  </td>
                  <td class="border border-gray-300">{{ item.tanggal }}</td>
                  <td class="border border-gray-300">
                    {{
                      item.gudang_penerima
                        ? item.gudang_penerima.nama_gudang
                        : "-"
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.gudang_asal ? item.gudang_asal.nama_gudang : "-" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.status_konfirmasi }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.tanggal_approve }}
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
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Konfirmasi Stok Transfer",
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
      title: "Konfirmasi Stok Transfer",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "inventory/konfirmasi-stok-transfer",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "konfirmasi_stok_transfer_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_data: "",
        },
        form: {
          kode_stok_transfer: "",
          tanggal: "",
          gudang_id_penerima: "",
          gudang_id_asal: "",
          keterangan: "",
          status_konfirmasi: "",
          tanggal_approve: "",
          catatan_approve: "",
          detail_stok_transfer: [],

          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
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
          (item) => item.rute == "konfirmasi-stok-transfer"
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
      this.$router.push(
        "/inventory/stok-transfer/konfirmasi-stok-transfer/add"
      );
    },

    onEdit(item) {
      this.$router.push(
        "/inventory/stok-transfer/konfirmasi-stok-transfer/" +
          item.permintaan_stok_transfer_id
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
              id: item.konfirmasi_stok_transfer_id,
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
