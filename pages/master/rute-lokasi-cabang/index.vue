<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Master</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Rute Lokasi Cabang</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="flex sm:flex-col md:flex-row gap-5">
      <div class="w-full bg-white dark:bg-slate-800 rounded-md p-2 px-4">
        <div>
          <list-option-section :self="this" ref="form-option" />
        </div>

        <div class="w-full mt-3 mb-7">
          <div
            class="w-full gap-5 items-baseline p-2 border border-gray-300 rounded-md"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-1">
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
              <div class="form-group w-full flex">
                <div class="mb-3 w-1/2">Status Rute</div>
                <select
                  name=""
                  id=""
                  v-model="parameters.params.status_approve"
                  class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                >
                  <option value="a">Approve</option>
                  <option value="p">Pending</option>
                  <option value="r">Reject</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-1">
              <div class="form-group w-full flex">
                <div class="mb-3 w-1/2">Lokasi Awal</div>

                <v-select
                  class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_lokasi"
                  :loading="isLoadingGetLokasi"
                  :options="lookup_custom2.data"
                  :filterable="false"
                  @search="onGetLokasi"
                  v-model="parameters.params.lokasi_id_awal"
                  :reduce="(item) => item.lokasi_id"
                >
                  <template slot="selected-option" slot-scope="option">
                    <div
                      class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                      {{ option.nama_lokasi }}
                    </div>
                         </template
                  >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom2.data.length || search"
                  >
                    <span
                      v-if="lookup_custom2.current_page > 1"
                      @click="onGetLokasi(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      style="cursor: pointer"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom2.last_page > lookup_custom2.current_page
                      "
                      @click="onGetLokasi(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      style="cursor: pointer"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>

              <div class="form-group w-full flex">
                <div class="mb-3 w-1/2">Lokasi Tujuan</div>

                <v-select
                  class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_lokasi"
                  :loading="isLoadingGetLokasiAkhir"
                  :options="lookup_custom3.data"
                  :filterable="false"
                  @search="onGetLokasiAkhir"
                  v-model="parameters.params.lokasi_id_tujuan"
                  :reduce="(item) => item.lokasi_id"
                >
                  <template slot="selected-option" slot-scope="option">
                    <div
                      class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                      {{ option.nama_lokasi }}
                    </div>
                         </template
                  >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom3.data.length || search"
                  >
                    <span
                      v-if="lookup_custom3.current_page > 1"
                      @click="onGetLokasiAkhir(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      style="cursor: pointer"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom3.last_page > lookup_custom3.current_page
                      "
                      @click="onGetLokasiAkhir(search, true)"
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
            ref="formContainer"
            class="mb-5 overflow-x-auto table-fixed border border-gray-300"
          >
            <thead>
              <tr class="uppercase">
                <th class="w-20 text-center border border-gray-300">Edit</th>
                <th class="w-16 border border-gray-300 text-center">No</th>
                <th class="w-48 border border-gray-300">Kode Rute Lokasi</th>
                <th class="w-48 border border-gray-300">Gudang</th>
                <th class="w-48 border border-gray-300">Lokasi Awal</th>
                <th class="w-48 border border-gray-300">Lokasi Tujuan</th>
                <th class="w-24 border border-gray-300">Jarak</th>
                <th class="w-48 border border-gray-300">Tanggal Request</th>
                <th class="w-48 border border-gray-300">Tanggal Approve</th>
                <th class="w-28 border border-gray-300">Status</th>
                <th class="w-20 text-center border border-gray-300">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td class="border border-gray-300 place-items-center">
                  <small-edit-button @click="onEdit(item)" />
                </td>
                <td class="border border-gray-300 text-center">
                  {{
                    (parameters.params.page - 1) * parameters.params.per_page +
                    i +
                    1
                  }}
                </td>
                <td class="border border-gray-300">
                  {{ item.kode_master_rute_lokasi }}
                  <p class="text-blue-500 italic">
                    Approved By: {{ item.user_approve?.nama_lengkap ?? "-" }}
                  </p>
                </td>
                <td class="border border-gray-300">
                  {{
                    item.gudang ? item.gudang.nama_gudang : "Tidak Ditemukan"
                  }}
                </td>
                <td class="border border-gray-300">
                  {{
                    item.lokasi_awal
                      ? item.lokasi_awal.nama_lokasi
                      : "Tidak Ditemukan"
                  }}
                </td>
                <td class="border border-gray-300">
                  {{
                    item.lokasi_tujuan
                      ? item.lokasi_tujuan.nama_lokasi
                      : "Tidak Ditemukan"
                  }}
                </td>
                <td class="border border-gray-300">{{ item.jarak }}</td>
                <td class="border border-gray-300">
                  {{ item.created_at ? formatDateTime(item.created_at) : "" }}
                </td>
                <td class="border border-gray-300">
                  {{
                    item.tanggal_approve ? formatDate(item.tanggal_approve) : ""
                  }}
                </td>
                <td class="border border-gray-300">
                  <div
                    v-if="item.status_approve === 'p'"
                    class="p-1 rounded-md bg-orange-500 font-semibold text-white text-center"
                  >
                    <p>Pending</p>
                  </div>
                  <div
                    v-if="item.status_approve === 'a'"
                    class="bg-green-500 p-1 rounded-md font-semibold text-white text-center"
                  >
                    <p>APPROVE</p>
                  </div>
                  <div
                    v-if="item.status_approve === 'r'"
                    class="bg-red-500 p-1 rounded-md font-semibold text-white text-center"
                  >
                    <p>REJECT</p>
                  </div>
                </td>

                <td class="border border-gray-300 place-items-center">
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
          <pagination-component :self="this" ref="pagination" />
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
      title: "Master Rute Lokasi Cabang",
    };
  },

  created() {},

  async mounted() {
    this.$refs["form-option"].isMaintenancePage = false;
    this.$refs["form-option"].isExport = false;
    this.$refs["form-option"].isFilter = false;
    this.$refs["form-option"].isAddData = true;
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

    await this.onSearchGudang();
    await this.onSearchLokasi();
    await this.onSearchLokasiAkhir();
    if (this.user.gudang_id) {
      this.parameters.params.gudang_id = this.user.gudang_id;
    } else {
      this.parameters.params.gudang_id =
        this.lookup_custom1.data[0]?.gudang_id ?? "";
    }
    this.set_data([]);
    this.onLoad();
    // this.parameters.form.gudang_id = this.user;
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
    ]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "rute-lokasi-cabang"
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

  data() {
    return {
      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",

      isStopSearchLokasiAkhir: false,
      isLoadingGetLokasiAkhir: false,
      akhir_search: "",

      title: "Master Rute Lokasi Cabang",
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
        url: "master/rute-lokasi-cabang",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "master_rute_lokasi_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          gudang_id: "",
          lokasi_id_awal: "",
          lokasi_id_tujuan: "",
          status_approve: "",
        },
        form: {
          kode_rute_lokasi: "",
          gudang_id: "",
          lokasi_awal_id: "",
          lokasi_tujuan_id: "",
          jarak: "",
          status_approve: "",
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
    };
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

    formatDateTime(dateTime) {
      const dateObject = new Date(dateTime);

      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");
      const hours = String(dateObject.getHours()).padStart(2, "0");
      const minutes = String(dateObject.getMinutes()).padStart(2, "0");
      const seconds = String(dateObject.getSeconds()).padStart(2, "0");

      const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

      return formattedDateTime;
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = parseInt(page) || 1;

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      await this.getData(this.parameters);

      if (this.result == true) {
        loader.hide();

        if (page == 1) {
          //this.$refs["pagination"].generatePage();
        }

        this.$refs["pagination"].active_page = this.parameters.params.page;
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingData = false;
    },

    onFormShow() {
      this.$router.push("/master/rute-lokasi-cabang/add");
    },

    onEdit(item) {
      this.$router.push(
        "/master/rute-lokasi-cabang/" + item.master_rute_lokasi_id
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
              id: item.master_rute_lokasi_id,
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

      clearTimeout(this.isStopSearchGudang);

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
      if (!this.isLoadingGetGudang) {
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

    onGetLokasi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchLokasi);

      this.isStopSearchLokasi = setTimeout(() => {
        this.lokasi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchLokasi();
      }, 600);
    },

    async onSearchLokasi() {
      if (!this.isLoadingGetLokasi) {
        this.isLoadingGetLokasi = true;

        await this.lookUp({
          url: "master/lokasi/get-lokasi",
          lookup: "custom2",
          query:
            "?search=" +
            this.lokasi_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetLokasi = false;
      }
    },

    onGetLokasiAkhir(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchLokasiAkhir);

      this.isStopSearchLokasiAkhir = setTimeout(() => {
        this.akhir_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchLokasiAkhir();
      }, 600);
    },

    async onSearchLokasiAkhir() {
      if (!this.isLoadingGetLokasiAkhir) {
        this.isLoadingGetLokasiAkhir = true;

        await this.lookUp({
          url: "master/lokasi/get-lokasi",
          lookup: "custom3",
          query:
            "?search=" +
            this.akhir_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetLokasiAkhir = false;
      }
    },
  },
};
</script>
