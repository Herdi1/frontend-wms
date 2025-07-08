<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Setting</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Item Gudang</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="flex flex-col gap-5">
      <div class="relative w-full bg-white rounded-md p-2 px-4">
        <div>
          <list-option-section :self="this" ref="form-option" />
        </div>
        <div class="overflow-x-auto">
          <table ref="formContainer">
            <thead>
              <tr class="uppercase">
                <th class="w-[5%]">No</th>
                <th>Item</th>
                <th>Vendor</th>
                <th>Supplier</th>
                <th
                  @click="
                    onSort(
                      'nama_item',
                      parameters.params.sort == 'asc' ? 'desc' : 'asc'
                    )
                  "
                  class="cursor-pointer"
                >
                  <div class="flex justify-between align-baseline">
                    <div>Nama Item</div>
                    <div>
                      <i
                        class="fas fa-caret-up"
                        :class="
                          parameters.params.order == 'nama_item' &&
                          parameters.params.sort == 'asc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                      <i
                        class="fas fa-caret-down"
                        :class="
                          parameters.params.order == 'nama_item' &&
                          parameters.params.sort == 'desc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                    </div>
                  </div>
                </th>
                <th>Group Item 1</th>
                <th>Batas Atas</th>
                <th>Kode SAP</th>
                <th>Batas Bawah</th>
                <th>Kategori 1</th>
                <th class="w-[5%] text-center">Details</th>
                <th class="w-[5%] text-center">Edit</th>
                <th class="w-[5%] text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in data" :key="i">
                <td>
                  {{
                    (parameters.params.page - 1) * parameters.params.per_page +
                    i +
                    1
                  }}
                </td>
                <td>{{ item.item_id }}</td>
                <td>{{ item.vendor_id }}</td>
                <td>{{ item.supplier_id }}</td>
                <td>{{ item.nama_item }}</td>
                <td>{{ item.group_item_id_1 }}</td>
                <td>{{ item.batas_atas }}</td>
                <td>{{ item.kode_sap }}</td>
                <td>{{ item.batas_bawah }}</td>
                <td>{{ item.kategori_id_1 }}</td>
                <td>
                  <small-detail-button @click="onDetail(item)" />
                </td>
                <td>
                  <small-edit-button @click="onEdit(item)" />
                </td>
                <td>
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
    <!-- <ModalDetail :self="this" ref="modalDetail" /> -->
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
// import ModalDetail from "./detail";
export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Item Gudang",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  components: {
    // ModalDetail,
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
      title: "Item Gudang",
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
        url: "master/item-gudang",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "item_gudang_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          form: {
            item_id: "",
            vendor_id: "",
            supplier_id: "",
            supplier_code: "",
            nama_item: "",
            group_item_id_1: "",
            group_item_id_2: "",
            group_item_id_3: "",
            group_item_id_4: "",
            group_item_id_5: "",
            batas_atas: "",
            kode_sap: "",
            batas_bawah: "",
            kategori_id_1: "",
            kategori_id_2: "",
            kategori_id_3: "",
            kategori_id_4: "",
            kategori_id_5: "",
            jumlah_palet: "",
            kapasitas_palet: "",
            kebutuhan_palet: "",
            maksimal_tumpukan: "",
            berat_bersih: "",
            berat_kotor: "",
            panjang: "",
            lebar: "",
            tebal: "",
            volume: "",
            warna: "",
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
          (item) => item.rute == "item-pelanggan"
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
      this.$router.push("/master/item-gudang/add");
    },

    onEdit(item) {
      this.$router.push("/master/item-gudang/edit/" + item.item_pelanggan_id);
    },

    onDetail(item) {
      this.$refs.modalDetail.parameters.form = {
        ...item,
      };
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
              id: item.item_gudang_id,
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
