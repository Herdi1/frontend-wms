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
        <div class="table-responsive w-full relative overflow-y-auto">
          <table
            ref="formContainer"
            class="mb-5 overflow-auto table-fixed border border-gray-300"
          >
            <thead>
              <tr class="uppercase">
                <th class="w-20 text-center border border-gray-300">Detail</th>
                <th class="w-20 text-center border border-gray-300">No</th>
                <th
                  @click="
                    onSort(
                      'kode_kontrak',
                      parameters.params.sort == 'asc' ? 'desc' : 'asc'
                    )
                  "
                  class="cursor-pointer w-48 border border-gray-300"
                >
                  <div class="flex justify-between align-baseline">
                    <div>Kode Kontrak</div>
                    <div>
                      <i
                        class="fas fa-caret-up"
                        :class="
                          parameters.params.order == 'kode_kontrak' &&
                          parameters.params.sort == 'asc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                      <i
                        class="fas fa-caret-down"
                        :class="
                          parameters.params.order == 'kode_kontrak' &&
                          parameters.params.sort == 'desc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                    </div>
                  </div>
                </th>
                <th class="w-48 border border-gray-300">Vendor</th>
                <th
                  @click="
                    onSort(
                      'status_kontrak',
                      parameters.params.sort == 'asc' ? 'desc' : 'asc'
                    )
                  "
                  class="cursor-pointer w-48 border border-gray-300"
                >
                  <div class="flex justify-between align-baseline">
                    <div>Status Kontrak</div>
                    <div>
                      <i
                        class="fas fa-caret-up"
                        :class="
                          parameters.params.order == 'status_kontrak' &&
                          parameters.params.sort == 'asc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                      <i
                        class="fas fa-caret-down"
                        :class="
                          parameters.params.order == 'status_kontrak' &&
                          parameters.params.sort == 'desc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                    </div>
                  </div>
                </th>
                <th class="w-48 border border-gray-300">Tanggal Kontrak</th>
                <th class="w-48 border border-gray-300">Tanggal Berlaku</th>
                <th class="w-48 border border-gray-300">Tanggal Berhenti</th>
                <!-- <th class="w-48 border border-gray-300">Jenis Kontrak</th> -->
                <th class="w-48 border border-gray-300">No Referensi</th>
                <th class="w-48 border border-gray-300">Keterangan</th>
                <th class="w-20 text-center border border-gray-300">Edit</th>
                <th class="w-20 text-center border border-gray-300">Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td
                  class="text-center border border-gray-300 place-items-center"
                >
                  <small-detail-button @click="onDetail(item)" />
                </td>
                <td class="border border-gray-300 text-center">
                  {{
                    (parameters.params.page - 1) * parameters.params.per_page +
                    i +
                    1
                  }}
                </td>
                <td class="border border-gray-300">
                  {{ item.kode_kontrak }}
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
                  {{ item.vendor ? item.vendor.nama_vendor : "-" }}
                </td>
                <td class="border border-gray-300">
                  <div>
                    <span v-if="item.status_kontrak === 'FISIK'">
                      <p
                        class="bg-green-500 p-1 w-1/2 rounded-md font-semibold text-white text-center"
                      >
                        {{ item.status_kontrak }}
                      </p>
                    </span>
                    <span v-if="item.status_kontrak === 'VIRTUAL'">
                      <p
                        class="bg-blue-500 p-1 w-1/2 rounded-md font-semibold text-white text-center"
                      >
                        {{ item.status_kontrak }}
                      </p>
                    </span>
                  </div>
                </td>
                <td class="border border-gray-300">
                  {{ formatDate(item.tanggal_kontrak) }}
                </td>
                <td class="border border-gray-300">
                  {{ formatDate(item.tanggal_berlaku) }}
                </td>
                <td class="border border-gray-300">
                  {{ formatDate(item.tanggal_berhenti) }}
                </td>
                <!-- <td class="border border-gray-300">{{ item.jenis_kontrak }}</td> -->
                <td class="border border-gray-300">{{ item.no_referensi }}</td>
                <td class="border border-gray-300">{{ item.keterangan }}</td>
                <td class="place-items-center border border-gray-300">
                  <small-edit-button @click="onEdit(item)" />
                </td>
                <td class="place-items-center border border-gray-300">
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
        url: "finance/kontrak-tkbm",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "kontrak_tkbm_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
        },
        form: {
          kode_kontrak: "",
          no_referensi: "",
          vendor_id: "",
          tanggal_kontrak: "",
          tanggal_berlaku: "",
          tanggal_berhenti: "",
          status_kontrak: "",
          jenis_kontrak_id: "",
          keterangan: "",
          kontrak_tkbm_details: [],

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

    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },

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
