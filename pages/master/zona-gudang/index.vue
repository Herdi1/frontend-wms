<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Master</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Zona Gudang</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="gap-5">
      <div
        class="relative p-4 w-12/12 bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
      >
        <div class="card-body">
          <div class="card-title">
            <list-option-section :self="this" ref="form-option" />
          </div>

          <div class="w-full mt-3 mb-7">
            <div
              class="w-full gap-5 items-baseline p-2 border border-gray-300 rounded-md"
            >
              <div class="grid grid-cols-2 gap-2 mb-1">
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2">Gudang</div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_gudang"
                    :loading="isLoadingGetGudang"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetGudang"
                    v-model="parameters.params.gudang_id"
                    :reduce="(item) => item.gudang_id"
                  >
                    <!-- @input="onSelectGudang" -->
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_custom1.data.length || search"
                    >
                      <span
                        v-if="lookup_custom1.current_page > 1"
                        @click="onGetGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </div>

              <div class="flex gap-3">
                <button
                  @click="onLoad"
                  class="bg-blue-500 shadow-lg hover:shadow-none p-2 text-white rounded-md flex"
                >
                  <i class="fa fa-filter text-white font-bold mr-2"></i>
                  <div>Filter</div>
                </button>
              </div>
            </div>
          </div>

          <div class="table-responsive w-full relative overflow-y-auto">
            <table
              class="mb-5 overflow-auto table-fixed border border-gray-300"
              ref="formContainer"
            >
              <thead>
                <tr class="text-base uppercase text-nowrap">
                  <th class="border border-gray-300 w-20 text-center">
                    Detail
                  </th>
                  <th class="w-20 border border-gray-300 text-center">No</th>
                  <th
                    @click="
                      onSort(
                        'kode_zona_gudang',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pointer border border-gray-300 w-48"
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Kode Zona Gudang</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'kode_zona_gudang' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'kode_zona_gudang' &&
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
                        'nama_zona_gudang',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pointer border border-gray-300 w-48"
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Nama Zona Gudang</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'nama_zona_gudang' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'nama_zona_gudang' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th class="w-40 border border-gray-300">Gudang</th>
                  <th class="w-40 border border-gray-300">Vendor</th>
                  <th class="w-40 border border-gray-300">Pelanggan</th>
                  <!-- <th class="w-40 border border-gray-300">Profit Cost</th> -->
                  <th class="w-40 border border-gray-300">Jenis Zona Gudang</th>
                  <th class="w-40 border border-gray-300">Satuan Stocklevel</th>
                  <th class="w-40 border border-gray-300">Satuan Suhu</th>
                  <th class="w-40 border border-gray-300">Status Zona</th>
                  <th class="w-40 border border-gray-300">Allow Overstock</th>
                  <th class="w-40 border border-gray-300">Status Zona Aktif</th>
                  <th class="w-44 border border-gray-300">
                    Metode Pengambilan
                  </th>
                  <th class="w-40 border border-gray-300">Fungsi Zona</th>
                  <th class="w-40 border border-gray-300">Group Zona</th>
                  <th class="w-44 border border-gray-300">
                    Metode Penyimpanan
                  </th>
                  <th class="w-40 border border-gray-300">Last Audit</th>
                  <th class="w-40 border border-gray-300">Last In</th>
                  <th class="w-40 border border-gray-300">Last Out</th>
                  <th class="w-20 text-center border border-gray-300">Edit</th>
                  <th class="w-20 text-center border border-gray-300">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data" :key="i">
                  <td class="place-items-center border border-gray-300">
                    <small-detail-button @click="onDetail(item)" />
                  </td>
                  <td class="text-center border border-gray-300">
                    {{
                      (parameters.params.page - 1) *
                        parameters.params.per_page +
                      i +
                      1
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.kode_zona_gudang }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.nama_zona_gudang }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.gudang ? item.gudang.nama_gudang : "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.vendor ? item.vendor.nama_vendor : "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.pelanggan ? item.pelanggan.nama_pelanggan : "" }}
                  </td>

                  <td class="border border-gray-300">
                    {{
                      item.jenis_zona_gudang
                        ? item.jenis_zona_gudang.nama_jenis_zona_gudang
                        : item.jenis_zona_gudang_id
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.satuan_stoklevel
                        ? item.satuan_stoklevel.nama_satuan
                        : ""
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.satuan_suhu ? item.satuan_suhu.nama_satuan : "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.status_zona == "f "
                        ? "Fisik"
                        : item.status_zona == "v " && "Virtual"
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.allow_overstock == "1"
                        ? "Diperbolehkan"
                        : "Tidak Diperbolehkan"
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.status_zona_aktif == "1" ? "Aktif" : "Non Aktif" }}
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.metode_pengambilan
                        ? item.metode_pengambilan.nama_metode
                        : ""
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.fungsi_zona ? item.fungsi_zona.nama_fungsi_zona : ""
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.group_zona ? item.group_zona.nama_group_zona : "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.metode_penyimpanan
                        ? item.metode_penyimpanan.nama_metode_penyimpanan
                        : ""
                    }}
                  </td>
                  <td class="border border-gray-300">{{ item.last_audit }}</td>
                  <td class="border border-gray-300">{{ item.last_in }}</td>
                  <td class="border border-gray-300">{{ item.last_out }}</td>

                  <td class="place-items-center border border-gray-300">
                    <small-edit-button @click="onEdit(item)" />
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

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Zona Gudang",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  components: {},

  mounted() {
    // this.$refs["form-option"].isExport = false;
    this.$refs["form-option"].isFilter = false;
    // this.$refs["form-option"].isMaintenancePage = true;
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

    this.user_agent = navigator.userAgent;
    console.log(this.user_agent);
  },

  data() {
    return {
      title: "Zona Gudang",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "master/zona-gudang",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "zona_gudang_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          gudang_id: "",
        },
        form: {
          zona_gudang_id: "",
          gudang_id: "",
          kode_zona_gudang: "",
          nama_zona_gudang: "",
          vendor_id: "",
          profit_cost_id: "",
          jenis_zona_gudang_id: "",
          satuan_id_stoklevel: "",
          satuan_id_suhu: "",
          status_zona: "",
          allow_overstock: "",
          status_zona_aktif: "",
          metode_pengambilan_id: "",
          fungsi_zona_id: "",
          group_zona_id: "",
          metode_penyimpanan_id: "",
          last_audit: "",
          last_in: "",
          last_out: "",
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
      user_agent: "",
      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",
    };
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result", "lookup_custom1"]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "zona-gudang"
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
      "lookUp",
    ]),

    ...mapMutations("moduleApi", ["set_data"]),

    onFormShow() {
      this.$router.push("/master/zona-gudang/add");
    },

    onEdit(item) {
      this.$router.push("/master/zona-gudang/" + item.zona_gudang_id);
    },

    onDetail(item) {
      this.$refs.modalDetail.form = {
        item_id: item.item_id,
      };
      this.$refs.modalDetail.fetchItemDetail();
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
              id: item.zona_gudang_id,
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
      this.parameters.params.page = parseInt(page) || 1;

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

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudangGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudangGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang-user",
          lookup: "custom1",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },
  },
};
</script>
