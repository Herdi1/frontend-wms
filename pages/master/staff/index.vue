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
                      class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                      {{ option.nama_gudang }}
                    </div>
                         </template
                  >
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
                <div class="mb-3 w-1/2">Jabatan</div>

                <v-select
                  class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_jabatan"
                  :loading="isLoadingGetJabatan"
                  :options="lookup_custom2.data"
                  :filterable="false"
                  @search="onGetJabatan"
                  v-model="parameters.params.jabatan_id"
                  :reduce="(item) => item.jabatan_id"
                >
                  <template slot="selected-option" slot-scope="option">
                    <div
                      class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                      {{ option.nama_jabatan }}
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
                      @click="onGetJabatan(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      style="cursor: pointer"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom2.last_page > lookup_custom2.current_page
                      "
                      @click="onGetJabatan(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      style="cursor: pointer"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
              <div class="form-group w-full flex">
                <div class="mb-3 w-1/2">Vendor</div>

                <v-select
                  class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_vendor"
                  :loading="isLoadingGetVendor"
                  :options="lookup_custom3.data"
                  :filterable="false"
                  @search="onGetVendor"
                  v-model="parameters.params.vendor_id_operator"
                  :reduce="(item) => item.vendor_id"
                >
                  <template slot="selected-option" slot-scope="option">
                    <div
                      class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                    >
                      {{ option.nama_vendor }}
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
                      @click="onGetVendor(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      style="cursor: pointer"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom3.last_page > lookup_custom3.current_page
                      "
                      @click="onGetVendor(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      style="cursor: pointer"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
              <div class="form-group flex w-full items-center">
                <label for="jenis_staff" class="w-1/2"> Jenis Staff </label>
                <select
                  class="border border-gray-300 rounded md p-1 outline-none w-1/2 text-gray-500"
                  v-model="parameters.params.jenis_user"
                >
                  <option value="staff">Staff</option>
                  <option value="pengemudi">Pengemudi</option>
                  <option value="operator">Operator</option>
                </select>
              </div>
              <div class="form-group flex w-full items-center">
                <label for="status" class="w-1/2"> Status </label>
                <select
                  class="border border-gray-300 rounded md p-1 outline-none w-1/2 text-gray-500"
                  v-model="parameters.params.status_aktif"
                >
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
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

        <div class="overflow-x-auto">
          <table ref="formContainer" class="border border-gray-300">
            <thead>
              <tr class="uppercase">
                <th class="w-[5%] text-center border border-gray-300">Edit</th>

                <th class="w-[5%] text-center border border-gray-300">
                  Detail
                </th>
                <th class="w-[5%] border border-gray-300 text-center">No</th>
                <th class="min-w-28 border border-gray-300">Kode Staff</th>
                <th
                  @click="
                    onSort(
                      'nama_lengkap',
                      parameters.params.sort == 'asc' ? 'desc' : 'asc'
                    )
                  "
                  class="cursor-pointer min-w-40 border border-gray-300"
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
                <th class="min-w-28 border border-gray-300">Email</th>
                <th class="min-w-28 border border-gray-300">Gudang</th>
                <th class="min-w-28 border border-gray-300">Jabatan</th>
                <th class="min-w-28 border border-gray-300">NIK</th>
                <th class="min-w-28 border border-gray-300">No KTP</th>
                <th class="min-w-28 border border-gray-300">No BPJS</th>
                <th class="min-w-28 border border-gray-300">Jenis Kelamin</th>
                <th class="min-w-28 border border-gray-300">Status</th>
                <th class="min-w-28 border border-gray-300">Jenis Staff</th>
                <th class="min-w-36 border border-gray-300">Alamat</th>
                <th class="w-[5%] text-center border border-gray-300">Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td class="place-items-center border border-gray-300">
                  <small-edit-button @click="onEdit(item)" />
                </td>
                <td class="place-items-center border border-gray-300">
                  <small-detail-button @click="onDetail(item)" />
                </td>
                <td class="border border-gray-300 text-center">
                  {{
                    (parameters.params.page - 1) * parameters.params.per_page +
                    i +
                    1
                  }}
                </td>
                <td class="border border-gray-300">{{ item.kode_staff }}</td>
                <td class="border border-gray-300">{{ item.nama_lengkap }}</td>
                <td class="border border-gray-300">{{ item.email }}</td>
                <td class="border border-gray-300">
                  {{ item.gudang ? item.gudang.nama_gudang : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.jabatan ? item.jabatan.nama_jabatan : "-" }}
                </td>
                <td class="border border-gray-300">{{ item.nik }}</td>
                <td class="border border-gray-300">{{ item.no_ktp }}</td>
                <td class="border border-gray-300">{{ item.no_bpjs }}</td>
                <td class="border border-gray-300">
                  {{
                    item.jenis_kelamin === "l"
                      ? "Laki Laki"
                      : item.jenis_kelamin === "p"
                      ? "Perempuan"
                      : "-"
                  }}
                </td>
                <td class="border border-gray-300">
                  {{
                    item.status_aktif === "1"
                      ? "Aktif"
                      : item.status_aktif === "0"
                      ? "Tidak Aktif"
                      : "-"
                  }}
                </td>
                <td class="border border-gray-300">{{ item.jenis_user }}</td>
                <td class="border border-gray-300">{{ item.alamat }}</td>

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
      title: "Staff",
    };
  },

  created() {},

  async mounted() {
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
    await this.onSearchGudang();
    if (this.user.gudang_id) {
      this.parameters.params.gudang_id = this.user.gudang_id;
    } else {
      this.parameters.params.gudang_id =
        this.lookup_custom1.data[0]?.gudang_id ?? "";
    }
    await this.onSearchJabatan();
    await this.onSearchVendor();
    this.set_data([]);
    this.onLoad();
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
          gudang_id: "",
          per_page: 10,
          page: 1,
          gudang_id: "",
          jabatan_id: "",
          vendor_id_operator: "",
          jenis_user: "",
          status_aktif: "",
        },
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

          rekening_staffs: [],
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchJabatan: false,
      isLoadingGetJabatan: false,
      jabatan_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",
    };
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
      "lookUp",
    ]),
    ...mapMutations("moduleApi", ["set_data"]),

    onFormShow() {
      this.$router.push("/master/staff/add");
    },

    onEdit(item) {
      this.$router.push("/master/staff/" + item.staff_id);
    },

    onDetail(item) {
      this.$router.push("/master/staff/detail/" + item.staff_id);
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

    onGetJabatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJabatan);

      this.isStopSearchJabatan = setTimeout(() => {
        this.jabatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchJabatan();
      }, 600);
    },

    async onSearchJabatan() {
      if (!this.isLoadingGetJabatan) {
        this.isLoadingGetJabatan = true;

        await this.lookUp({
          url: "setting/jabatan",
          lookup: "custom2",
          query:
            "?search=" +
            this.jabatan_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJabatan = false;
      }
    },

    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom3",
          query:
            "?search=" +
            this.vendor_search +
<<<<<<< HEAD
            // "&tipe_vendor_id=1" +
=======
>>>>>>> e5119c29dab6493d141ed4c2313853618acce69c
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
      }
    },
  },
};
</script>
