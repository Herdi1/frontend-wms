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

          <div class="w-full mt-3 mb-7">
            <div
              class="w-full gap-5 items-baseline p-2 border border-gray-300 rounded-md"
            >
              <div class="grid grid-cols-2 gap-2">
                <div class="grid grid-cols-1 gap-5 w-full">
                  <div class="form-group">
                    <input-horizontal
                      label="Periode Awal"
                      type="date"
                      name="kode_sap"
                      :isHorizontal="true"
                      v-model="parameters.params.start_date"
                      :required="false"
                      :max="parameters.params.end_date"
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
                      :min="parameters.params.start_date"
                    />
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2 mb-1">
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2">Status Opname</div>
                  <select
                    name=""
                    id=""
                    v-model="parameters.params.status_opname"
                    class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                  >
                    <option value="MENUNGGU">Menunggu</option>
                    <option value="PROSES">Proses</option>
                    <option value="SELESAI">Selesai</option>
                    <option value="BATAL">Batal</option>
                  </select>
                </div>
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2">Status Adjustment</div>
                  <select
                    name=""
                    id=""
                    v-model="parameters.params.status_adjustment"
                    class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                  >
                    <option value="0">Menunggu</option>
                    <option value="1">Approved</option>
                  </select>
                </div>
              </div>
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
                    v-model="parameters.params.gudang"
                    @input="onSelectGudang"
                    :disabled="lookup_custom1.data.length == 1"
                  >
                    <template slot="selected-option" slot-scope="option">
                      <div
                        class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                      >
                        {{ option.nama_gudang }}
                      </div>
                    </template>
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom1.data.length || search"
                    >
                      <span
                        v-if="lookup_custom1.current_page > 1"
                        @click="onGetGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        style="cursor: pointer"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
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
                <tr class="uppercase">
                  <th class="w-20 text-center border border-gray-300">Edit</th>
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
                        'tanggal_adjustment',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Tanggal Adjustment</div>
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
                  <th class="w-20 border border-gray-300 text-center">Print</th>

                  <th class="w-20 text-center border border-gray-300">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data" :key="i">
                  <td class="place-items-center border border-gray-300">
                    <small-edit-button
                      @click="onEdit(item)"
                      :disabled="
                        item.status_adjustment === '1' ||
                        item.status_opname === 'BATAL'
                      "
                    />
                  </td>
                  <td
                    class="text-center place-items-center border border-gray-300"
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
                    <div
                      v-if="item.status_adjustment === '0'"
                      class="p-1 w-1/2 rounded-md bg-orange-500 font-semibold text-white text-center"
                    >
                      <p>MENUNGGU</p>
                    </div>
                    <div
                      v-if="item.status_adjustment === '1'"
                      class="bg-green-500 p-1 w-1/2 rounded-md font-semibold text-white text-center"
                    >
                      <p>APPROVE</p>
                    </div>
                  </td>
                  <td class="border border-gray-300">
                    {{ formatDate(item.tanggal) }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.gudang.nama_gudang }}
                  </td>
                  <td class="border border-gray-300">
                    <div>
                      <span v-if="item.status_opname === 'MENUNGGU'">
                        <p
                          class="p-1 w-1/2 rounded-md bg-orange-500 font-semibold text-white text-center"
                        >
                          {{ item.status_opname }}
                        </p>
                      </span>
                      <span v-if="item.status_opname === 'PROSES'">
                        <p
                          class="bg-purple-500 p-1 w-1/2 rounded-md font-semibold text-white text-center"
                        >
                          {{ item.status_opname }}
                        </p>
                      </span>
                      <span v-if="item.status_opname === 'SELESAI'">
                        <p
                          class="bg-green-500 p-1 w-1/2 rounded-md font-semibold text-white text-center"
                        >
                          {{ item.status_opname }}
                        </p>
                      </span>
                      <span v-if="item.status_opname === 'BATAL'">
                        <p
                          class="bg-red-500 p-1 w-1/2 rounded-md font-semibold text-white text-center"
                        >
                          {{ item.status_opname }}
                        </p>
                      </span>
                    </div>
                  </td>
                  <td class="border border-gray-300">
                    {{
                      item.tanggal_adjustment
                        ? formatDate(item.tanggal_adjustment.split(" ")[0])
                        : "-"
                    }}
                  </td>
                  <td class="border border-gray-300">{{ item.keterangan }}</td>
                  <td
                    class="text-center border border-gray-300 place-items-center"
                  >
                    <button
                      class="btn btn-sm"
                      v-if="!item.deleted_at"
                      title="Print Invoice Jurnal"
                      @click="onPrintDetail(item)"
                    >
                      <i class="fas fa-print text-primary"></i>
                    </button>
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
      title: "Adjustment Stok Opname",
    };
  },

  async created() {
    await this.onSearchGudang();
    if (this.lookup_custom1.data.length > 0) {
      this.onSelectGudang(this.lookup_custom1.data[0]);
    }
    this.set_data([]);
    this.onLoad();
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
      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      title: "Adjustment Stok Opname",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "inventory/adjustment-stok-opname",
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
          gudang_id: "",
          gudang: "",
          status_opname: "",
          status_adjustment: "",
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
          catatan_adjustment: "",
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
    ...mapState("moduleApi", ["data", "error", "result", "lookup_custom1"]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "adjustment-stok-opname"
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

    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },

    onFormShow() {
      this.$router.push("/inventory/stok-opname/adjustment-stok-opname/add");
    },

    onEdit(item) {
      this.$router.push(
        "/inventory/stok-opname/adjustment-stok-opname/" + item.stok_opname_id
      );
    },

    onDetail(item) {
      this.$router.push(
        "/inventory/stok-opname/adjustment-stok-opname/detail/" +
          item.stok_opname_id
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

    onSelectGudang(item) {
      if (item) {
        this.parameters.params.gudang = item;
        this.parameters.params.gudang_id = item.gudang_id;
      } else {
        this.parameters.params.gudang = "";
        this.parameters.params.gudang_id = "";
      }
    },

    onPrintDetail(item) {
      let token = this.$cookiz.get("auth._token.local").replace("Bearer ", "");
      window.open(
        process.env.API_URL +
          "inventory/stok-opname/get-print-detail/" +
          item.stok_opname_id +
          "?token=" +
          token,
        "_blank"
      );
    },
  },
};
</script>
