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
          <div class="table-responsive w-full relative overflow-y-auto">
            <table
              class="mb-5 overflow-auto table-fixed border border-gray-300"
              ref="formContainer"
            >
              <thead>
                <tr class="uppercase">
                  <th class="w-20 text-center border border-gray-300">
                    Detail
                  </th>
                  <th class="w-12 text-center border border-gray-300">No</th>
                  <th
                    class="w-52 border border-gray-300 cursor-pointer"
                    @click="
                      onSort(
                        'kode_stok_opname',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Kode Stok Opname</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'kode_stok_opname' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'kode_stok_opname' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th
                    class="w-52 border border-gray-300 cursor-pointer"
                    @click="
                      onSort(
                        'status_opname',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Status Opname</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'status_opname' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'status_opname' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th
                    class="w-52 border border-gray-300 cursor-pointer"
                    @click="
                      onSort(
                        'tanggal',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Tanggal</div>
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
                  <th class="w-52 border border-gray-300">Gudang</th>
                  <th
                    class="w-52 border border-gray-300 cursor-pointer"
                    @click="
                      onSort(
                        'status_adjustment',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Status Adjustment</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'status_adjustment' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'status_adjustment' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th
                    class="w-52 border border-gray-300 cursor-pointer"
                    @click="
                      onSort(
                        'tanggal_adjustment',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Tanggal Approve</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'tanggal_adjustment' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'tanggal_adjustment' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>

                  <th class="w-52 border border-gray-300">Keterangan</th>
                  <th class="w-20 text-center border border-gray-300">Edit</th>
                  <th class="w-20 text-center border border-gray-300">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data" :key="i">
                  <td
                    class="text-center place-content-center border border-gray-300"
                  >
                    <small-detail-button @click="onDetail(item)" />
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
                    {{ item.kode_stok_opname }}
                    <p
                      v-if="item.user_input"
                      class="text-blue-500 cursor-pointer hover:underline"
                    >
                      <i>Dibuat oleh: {{ item.user_input.username }}</i>
                    </p>
                    <p
                      v-else
                      class="text-blue-500 cursor-pointer hover:underline"
                    >
                      <i>Dibuat oleh: Sistem</i>
                    </p>
                  </td>
                  <td class="border border-gray-300">
                    <div>
                      <span v-if="item.status_opname === 'MENUNGGU'">
                        <p
                          class="bg-orange-500 p-1 rounded-lg w-fit font-semibold text-white"
                        >
                          {{ item.status_opname }}
                        </p>
                      </span>
                      <span v-if="item.status_opname === 'PROSES'">
                        <p
                          class="bg-purple-500 p-1 rounded-lg w-fit font-semibold text-white"
                        >
                          {{ item.status_opname }}
                        </p>
                      </span>
                      <span v-if="item.status_opname === 'SELESAI'">
                        <p
                          class="bg-green-500 p-1 rounded-lg w-fit font-semibold text-white"
                        >
                          {{ item.status_opname }}
                        </p>
                      </span>
                      <span v-if="item.status_opname === 'BATAL'">
                        <p
                          class="bg-red-500 p-1 rounded-lg w-fit font-semibold text-white"
                        >
                          {{ item.status_opname }}
                        </p>
                      </span>
                    </div>
                  </td>
                  <td class="border border-gray-300">{{ item.tanggal }}</td>
                  <td class="border border-gray-300">
                    {{ item.gudang.nama_gudang }}
                  </td>
                  <td class="border border-gray-300">
                    <div>
                      <span v-if="item.status_adjustment === '0'">
                        <p
                          class="bg-orange-500 p-1 rounded-lg w-fit font-semibold text-white"
                        >
                          MENUNGGU
                        </p>
                      </span>
                      <span v-if="item.status_adjustment === '1'">
                        <p
                          class="bg-green-500 p-1 rounded-lg w-fit font-semibold text-white"
                        >
                          APPROVE
                        </p>
                      </span>
                    </div>
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.tanggal_adjustment
                        ? item.tanggal_adjustment.split(" ")[0]
                        : "-"
                    }}
                  </td>
                  <td class="border border-gray-300">{{ item.keterangan }}</td>
                  <td class="place-items-center border border-gray-300">
                    <small-edit-button
                      @click="onEdit(item)"
                      :disabled="
                        item.status_adjustment === '1' ||
                        item.status_opname === 'BATAL'
                      "
                    />
                  </td>
                  <td class="place-items-center border border-gray-300">
                    <small-delete-button
                      @click="onTrashed(item)"
                      v-if="!item.deleted_at"
                      :disabled="
                        item.status_adjustment === '1' ||
                        item.status_opname === 'BATAL'
                      "
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

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Permohonan Stok Opname",
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
      title: "Permohonan Stok Opname",
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
          kode_stok_opname: "",
          tanggal: "",
          gudang_id: "",
          keterangan: "",
          status_opname: "",
          catatan_proses: "",
          catatan_selesai: "",
          catatan_batal: "",
          stok_opname_details: [],

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
          (item) => item.rute == "permohonan-stok-opname"
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
      this.$router.push("/inventory/stok-opname/stok-opname/add");
    },

    onEdit(item) {
      this.$router.push(
        "/inventory/stok-opname/stok-opname/" + item.stok_opname_id
      );
    },

    onDetail(item) {
      this.$router.push(
        "/inventory/stok-opname/stok-opname/detail/" + item.stok_opname_id
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
