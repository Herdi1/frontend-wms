<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Outbound</a>
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
            <div class="w-full gap-5 p-2 border border-gray-300 rounded-md">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
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
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Gudang</b></div>

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
                    <!-- <template v-slot:option="option">
                      <div class="flex">
                        <div class="col-md-5 p-1 m-0 w-8/12">
                          {{ option.nama_gudang }}
                        </div>
                      </div>
                    </template> -->

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
              <div class="flex gap-3 mt-5">
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
                  <th class="w-20 text-center border border-gray-300">No</th>
                  <th
                    class="w-52 border border-gray-300 cursor-pointer"
                    @click="
                      onSort(
                        'kode_pick_order',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Kode Pick Order</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'kode_pick_order' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'kode_pick_order' &&
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
                        'gudang',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Gudang</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'gudang' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'gudang' &&
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
                        'status_pick_order',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Status Pick Order</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'status_pick_order' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'status_pick_order' &&
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

                  <th class="w-52 border border-gray-300">No Referensi 1</th>
                  <th class="w-52 border border-gray-300">No Referensi 2</th>
                  <th class="w-52 border border-gray-300">No Referensi 3</th>
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
                    <div>
                      {{ item.kode_pick_order }}
                      <p v-if="item.user_id_input" class="text-blue-500">
                        <i>Dibuat oleh: {{ item.user_input.username }}</i>
                      </p>
                      <p v-else class="text-blue-500">
                        <i>Dibuat oleh: Sistem</i>
                      </p>
                    </div>
                  </td>
                  <td class="border border-gray-300">
                    {{ item.gudang ? item.gudang.nama_gudang : "-" }}
                  </td>
                  <td class="border border-gray-300">
                    <div>
                      <span v-if="item.status_pick_order === 'MENUNGGU'">
                        <p
                          class="p-1 w-1/2 rounded-md bg-orange-500 font-semibold text-white text-center"
                        >
                          {{ item.status_pick_order }}
                        </p>
                      </span>
                      <span v-if="item.status_pick_order === 'PROSES'">
                        <p
                          class="bg-purple-500 p-1 w-1/2 rounded-md font-semibold text-white text-center"
                        >
                          {{ item.status_pick_order }}
                        </p>
                      </span>
                      <span v-if="item.status_pick_order === 'SELESAI'">
                        <p
                          class="bg-green-500 p-1 w-1/2 rounded-md font-semibold text-white text-center"
                        >
                          {{ item.status_pick_order }}
                        </p>
                      </span>
                      <span v-if="item.status_pick_order === 'BATAL'">
                        <p
                          class="bg-red-500 p-1 w-1/2 rounded-md font-semibold text-white text-center"
                        >
                          {{ item.status_pick_order }}
                        </p>
                      </span>
                    </div>
                  </td>
                  <td class="border border-gray-300">{{ item.tanggal }}</td>
                  <td class="border border-gray-300">
                    {{ item.no_referensi_1 }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.no_referensi_2 }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.no_referensi_3 }}
                  </td>
                  <td class="place-items-center border border-gray-300">
                    <small-edit-button
                      @click="onEdit(item)"
                      :disabled="
                        item.status_pick_order === 'BATAL' ||
                        item.status_pick_order === 'SELESAI'
                      "
                    />
                  </td>
                  <td class="place-items-center border border-gray-300">
                    <small-delete-button
                      @click="onTrashed(item)"
                      v-if="!item.deleted_at"
                      :disabled="
                        item.status_pick_order === 'BATAL' ||
                        item.status_pick_order === 'SELESAI'
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
      title: "Pick Order",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  async mounted() {
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

    await this.onSearchGudang();
  },

  data() {
    return {
      title: "Pick Order",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "outbound/pick-order",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "pick_order_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_date: "",
          gudang_id: "",
        },
        form: {
          kode_pick_order: "",
          user_id_pic: "",
          tanggal: "",
          no_referensi_1: "",
          no_referensi_2: "",
          no_referensi_3: "",
          detail_pick_order: [],

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
          (item) => item.rute == "pick-order"
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
      this.$router.push("/outbound/pick-order/pick-order/add");
    },

    onEdit(item) {
      this.$router.push(
        "/outbound/pick-order/pick-order/" + item.pick_order_id
      );
    },

    onDetail(item) {
      this.$router.push(
        "/outbound/pick-order/pick-order/detail/" + item.pick_order_id
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
              id: item.pick_order_id,
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
      this.parameters.params.gudang_id = item ? item : "";
    },
  },
};
</script>
