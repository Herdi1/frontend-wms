<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Master</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Vendor</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="flex flex-col gap-5">
      <div
        class="relative w-full bg-white dark:bg-slate-800 rounded-md p-2 px-4"
      >
        <div>
          <list-option-section :self="this" ref="form-option" />
        </div>
        <div class="table-responsive w-full relative overflow-y-auto">
          <table
            ref="formContainer"
            class="mb-5 overflow-auto table-fixed border border-gray-300"
          >
            <thead>
              <tr class="uppercase">
                <th class="w-20 border border-gray-300 text-center">Edit</th>

                <th class="w-20 text-center border border-gray-300">Details</th>

                <th class="w-20 text-center border border-gray-300">No</th>
                <th class="w-40 border border-gray-300">Tipe Badan Hukum</th>
                <th class="w-40 border border-gray-300">Kode Vendor</th>
                <th
                  @click="
                    onSort(
                      'nama_vendor',
                      parameters.params.sort == 'asc' ? 'desc' : 'asc'
                    )
                  "
                  class="cursor-pointer w-40 border border-gray-300"
                >
                  <div class="flex justify-between align-baseline">
                    <div>Nama Vendor</div>
                    <div>
                      <i
                        class="fas fa-caret-up"
                        :class="
                          parameters.params.order == 'nama_vendor' &&
                          parameters.params.sort == 'asc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                      <i
                        class="fas fa-caret-down"
                        :class="
                          parameters.params.order == 'nama_vendor' &&
                          parameters.params.sort == 'desc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                    </div>
                  </div>
                </th>
                <th class="w-40 border border-gray-300">Kecamatan</th>
                <th class="w-40 border border-gray-300">Kota</th>
                <th class="w-40 border border-gray-300">Provinsi</th>
                <th class="w-40 border border-gray-300">Negara</th>
                <th class="w-40 border border-gray-300">Longitude</th>
                <th class="w-40 border border-gray-300">Latitude</th>
                <th class="w-40 border border-gray-300">Radius</th>
                <th class="w-20 border border-gray-300 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td class="border border-gray-300 place-items-center">
                  <small-edit-button @click="onEdit(item)" />
                </td>
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
                  {{ item.tipebadanhukum.nama_tipe_badan_hukum }}
                </td>
                <td class="border border-gray-300">{{ item.kode_vendor }}</td>
                <td class="border border-gray-300">{{ item.nama_vendor }}</td>
                <td class="border border-gray-300">
                  {{ item.kecamatan.nama_kecamatan }}
                </td>
                <td class="border border-gray-300">
                  {{ item.kota.nama_kota }}
                </td>
                <td class="border border-gray-300">
                  {{ item.provinsi.nama_provinsi }}
                </td>
                <td class="border border-gray-300">
                  {{ item.negara.nama_negara }}
                </td>
                <td class="border border-gray-300">{{ item.longitude }}</td>
                <td class="border border-gray-300">{{ item.latitude }}</td>
                <td class="border border-gray-300">{{ item.radius }}</td>

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
          <pagination-section :self="this" ref="pagination" />
        </div>
      </div>
    </div>
    <ModalDetail :self="this" ref="modalDetail" />
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import FormInput from "./form";
import ModalDetail from "./detail";
export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Vendor",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  components: {
    FormInput,
    ModalDetail,
  },

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
  },

  data() {
    return {
      title: "Vendor",
      isLoading: false,
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
        url: "master/vendor",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "vendor_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          form: {
            vendor_id_induk: "",
            tipe_badan_hukum_id: "",
            alias: "",
            kode_referensi: "",
            kode_vendor: "",
            nama_vendor: "",
            alamat_vendor: "",
            kelurahan_id: "",
            kecamatan_id: "",
            kota_id: "",
            provinsi_id: "",
            negara_id: "",
            kode_pos_id: "",
            no_telp: "",
            no_hp: "",
            no_npwp: "",
            email: "",
            nama_cp: "",
            telp_cp: "",
            hp_cp: "",
            nomor_siup: "",
            group: "",
            user_id_pic: "",
            tipe_vendor: "",
            longitude: "",
            latitude: "",
            radius: "",
            nama_pemilik: "",
            nik_pemilik: "",
            no_npwp_pemilik: "",
            negara_id_pemilik: "",
            provinsi_id_pemilik: "",
            kota_id_pemilik: "",
            kelurahan_id_pemilik: "",
            kecamatan_id_pemilik: "",
            alamat_pemilik: "",
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
          (item) => item.rute == "vendor"
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
      this.$router.push("/master/vendor/add");
    },

    onEdit(item) {
      this.$router.push("/master/vendor/" + item.vendor_id);
    },

    onDetail(item) {
      this.$router.push("/master/vendor/details/" + item.vendor_id);
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
              id: item.vendor_id,
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
