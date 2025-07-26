<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Master</a>
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
        <div>
          <table
            ref="formContainer"
            class="border border-gray-300 overflow-x-auto"
          >
            <thead>
              <tr class="uppercase text-nowrap">
                <th class="w-[5%] border border-gray-300">Edit</th>
                <th class="w-[5%] border border-gray-300">Detail</th>
                <th class="w-[5%] border border-gray-300">No</th>
                <th class="border border-gray-300">Kode Konversi Stok</th>
                <th class="border border-gray-300">Gudang</th>
                <th class="border border-gray-300">Status Transaksi</th>
                <th class="border border-gray-300">Tanggal</th>
                <th class="border border-gray-300">Tanggal Mulai</th>
                <th class="border border-gray-300">Tanggal Selesai</th>
                <th class="border border-gray-300">Lama Pengerjaan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td class="border border-gray-300">
                  <small-edit-button
                    @click="onEdit(item)"
                    :disabled="
                      item.status_approve == 1 ||
                      item.status_konversi === 'BATAL'
                    "
                  />
                </td>
                <td class="border border-gray-300">
                  <small-detail-button @click="onDetail(item)" />
                </td>

                <td class="border border-gray-300">
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
                    class="p-1 rounded-md bg-orange-500 text-white text-center"
                  >
                    <p>Menunggu</p>
                  </div>
                  <div
                    v-if="item.status_konversi === 'PROSES'"
                    class="p-1 rounded-md bg-blue-500 text-white text-center"
                  >
                    <p>Proses</p>
                  </div>
                  <div
                    v-if="item.status_konversi === 'SELESAI'"
                    class="p-1 rounded-md bg-green-500 text-white text-center"
                  >
                    <p>Selesai</p>
                  </div>
                  <div
                    v-if="item.status_konversi === 'BATAL'"
                    class="p-1 rounded-md bg-red-500 text-white text-center"
                  >
                    <p>Batal</p>
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
    ...mapState("moduleApi", ["data", "error", "result"]),

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
  },
};
</script>
