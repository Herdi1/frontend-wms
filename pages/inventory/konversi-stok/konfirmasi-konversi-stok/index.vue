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
          Konversi Stok</a
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
    <div class="flex sm:flex-col md:flex-row gap-5">
      <!-- <div
        class="sm:w-full md:w-4/12 bg-white dark:bg-slate-800 rounded-md p-2 px-4"
      >
        <FormInput :self="this" ref="formInput" />
      </div> -->
      <div class="w-full bg-white dark:bg-slate-800 rounded-md p-2 px-4">
        <div>
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
            </div>

            <div class="grid grid-cols-2 gap-2 mb-1">
              <div class="w-full flex justify-between items-center px-1">
                <label for="">Status Konversi</label>
                <select
                  class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                  name="status_konversi"
                  id="status_konversi"
                  v-model="parameters.params.status_konversi"
                >
                  <option value="MENUNGGU">Menunggu</option>
                  <option value="PROSES">Proses</option>
                  <option value="SELESAI">Selesai</option>
                  <option value="BATAL">Batal</option>
                </select>
              </div>
              <div class="w-full flex justify-between items-center px-1">
                <label for="">Status Approve</label>
                <select
                  class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                  name="status_approve"
                  id="status_approve"
                  v-model="parameters.params.status_approve"
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
            ref="formContainer"
            class="mb-5 overflow-auto table-fixed border border-gray-300"
          >
            <thead>
              <tr class="uppercase text-nowrap">
                <th class="w-20 text-center border border-gray-300">Detail</th>
                <th class="w-20 text-center border border-gray-300">No</th>
                <th class="w-52 border border-gray-300">Kode Konversi Stok</th>
                <th class="w-52 border border-gray-300">Gudang</th>
                <th class="w-52 border border-gray-300">Status Transaksi</th>
                <th class="w-52 border border-gray-300">Status Approve</th>
                <th class="w-52 border border-gray-300">Tanggal</th>
                <th class="w-52 border border-gray-300">Tanggal Mulai</th>
                <th class="w-52 border border-gray-300">Tanggal Selesai</th>
                <th class="w-52 border border-gray-300">Lama Pengerjaan</th>
                <th class="w-20 text-center border border-gray-300">Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td class="border border-gray-300 place-items-center">
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
                  {{ item.kode_konversi_stok }}
                  <p v-if="item.user_input" class="text-blue-500">
                    <i>Dibuat oleh: {{ item.user_input.username }}</i>
                  </p>
                  <p v-else class="text-blue-500">
                    <i>Dibuat oleh: Sistem</i>
                  </p>
                </td>
                <td class="border border-gray-300">
                  {{ item.gudang ? item.gudang.nama_gudang : "-" }}
                </td>
                <td class="border border-gray-300">
                  <div
                    v-if="item.status_konversi === 'MENUNGGU'"
                    class="p-1 w-1/2 rounded-md bg-orange-500 text-white text-center"
                  >
                    <p>Menunggu</p>
                  </div>
                  <div
                    v-if="item.status_konversi === 'PROSES'"
                    class="p-1 w-1/2 rounded-md bg-blue-500 text-white text-center"
                  >
                    <p>Proses</p>
                  </div>
                  <div
                    v-if="item.status_konversi === 'SELESAI'"
                    class="p-1 w-1/2 rounded-md bg-green-500 text-white text-center"
                  >
                    <p>Selesai</p>
                  </div>
                  <div
                    v-if="item.status_konversi === 'BATAL'"
                    class="p-1 w-1/2 rounded-md bg-red-500 text-white text-center"
                  >
                    <p>Batal</p>
                  </div>
                </td>
                <td class="border border-gray-300">
                  <div
                    v-if="item.status_approve === '0'"
                    class="p-1 w-1/2 rounded-md bg-orange-500 text-white text-center"
                  >
                    <p>Menunggu</p>
                  </div>
                  <div
                    v-if="item.status_approve === '1'"
                    class="p-1 w-1/2 rounded-md bg-green-500 text-white text-center"
                  >
                    <p>Approved</p>
                  </div>
                </td>
                <td class="border border-gray-300">{{ item.tanggal }}</td>
                <td class="border border-gray-300">{{ item.tanggal_mulai }}</td>
                <td class="border border-gray-300">
                  {{ item.tanggal_selesai }}
                </td>
                <td class="border border-gray-300">
                  {{ item.lama_pengerjaan }}
                </td>
                <td class="border border-gray-300 place-items-center">
                  <small-edit-button
                    @click="onEdit(item)"
                    :disabled="
                      item.status_approve == 1 ||
                      item.status_konversi === 'BATAL'
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
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Konfirmasi Konversi Stok",
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
      this.$refs["form-option"].isAddData = false;
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
      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      title: "Konfirmasi Konversi Stok",
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
        url: "inventory/konfirmasi-konversi-stok",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "konversi_stok_id",
          sort: "desc",
          all: "",
          start_date: "",
          end_date: "",
          status_approve: "",
          status_konversi: "",
          gudang_id: "",
          per_page: 10,
          page: 1,
          form: {
            status_konversi: "",
            tanggal_konversi: "",
            catatan_konversi: "",

            kode_konversi_stok: "",
            tanggal: "",
            tanggal_mulai: "",
            tanggal_selesai: "",
            lama_pengerjaan: "",
            gudang_id: "",
            status_approve: "",
            keterangan: "",
            konversi_stok_detail_bahan: [],
            konversi_stok_detail_jadi: [],
            biaya_konversi: [],
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
    ...mapState("moduleApi", ["data", "error", "result", "lookup_custom1"]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "konfirmasi-konversi-stok"
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
      this.$router.push(
        `/inventory/konversi-stok/konfirmasi-konversi-stok/add`
      );
      // this.$refs.formInput.parameters.form = {
      //   nama_jenis_kontrak: "",
      //   kode_jenis_kontrak: "",
      //   status: "",
      //   keterangan: "",
      // };
      // this.$refs.formInput.isEditable = false;
      // this.$nextTick(() => {
      //   this.$refs.formInput?.$refs?.formValidate?.reset();
      // });
    },

    onEdit(item) {
      this.$router.push(
        `/inventory/konversi-stok/konfirmasi-konversi-stok/${item.konversi_stok_id}`
      );
    },

    onDetail(item) {
      this.$router.push(
        `/inventory/konversi-stok/permohonan-konversi-stok/detail/${item.konversi_stok_id}`
      );
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
              id: item.konversi_stok_id,
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
        id: item.konversi_stok_id,
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
  },
};
</script>
