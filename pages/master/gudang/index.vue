<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Master</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Gudang</span>
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

          <div class="table-responsive w-full relative overflow-y-auto">
            <table
              class="mb-5 overflow-auto table-fixed border border-gray-300"
              ref="formContainer"
            >
              <thead>
                <tr class="text-base uppercase text-nowrap">
                  <th class="w-20 text-center border border-gray-300">Edit</th>

                  <th class="w-20 text-center border border-gray-300">
                    Detail
                  </th>

                  <th class="w-20 text-center border border-gray-300">No</th>
                  <th
                    @click="
                      onSort(
                        'lokasi_id',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pointer w-48 border border-gray-300"
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Lokasi</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'lokasi_id' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'lokasi_id' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <th class="w-48 border border-gray-300">
                    Kode Gudang External
                  </th>
                  <th class="w-48 border border-gray-300">Kode Gudang</th>
                  <th class="w-48 border border-gray-300">Profit & Cost</th>
                  <th
                    @click="
                      onSort(
                        'nama_gudang',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pointer w-48 border border-gray-300"
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Nama Gudang</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'nama_gudang' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'nama_gudang' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th>
                  <!-- <th>Status Konfig External</th>
                  <th>Nomor Rekening</th>
                  <th>Atas Nama Rekening</th> -->
                  <th class="w-48 border border-gray-300">Status Gudang</th>
                  <th class="w-48 border border-gray-300">Group Gudang</th>
                  <th class="w-48 border border-gray-300">Longitude</th>
                  <th class="w-48 border border-gray-300">Latitude</th>
                  <th class="w-48 border border-gray-300">Alamat</th>
                  <th class="w-48 border border-gray-300">Kecamatan</th>
                  <th class="w-48 border border-gray-300">Kota</th>
                  <th class="w-48 border border-gray-300">Provinsi</th>
                  <th class="w-48 border border-gray-300">Negara</th>
                  <!-- <th>Vendor Pemilik</th> -->
                  <th class="w-48 border border-gray-300">Vendor Operator</th>
                  <th class="w-48 border border-gray-300">Fungsi Gudang</th>
                  <th class="w-48 border border-gray-300">No Handphone</th>
                  <th class="w-48 border border-gray-300">No WhatsApp</th>
                  <th class="w-48 border border-gray-300">Kapasitas</th>
                  <th class="w-48 border border-gray-300">Kapasitas Bongkar</th>
                  <!-- <th>Fisik Gudang</th> -->
                  <th class="w-48 border border-gray-300">Ukuran Gudang</th>
                  <th class="w-24 border border-gray-300">File Layout</th>
                  <!-- <th>Status Sewa</th>
                  <th>Status Satpam</th> -->
                  <!-- <th>Luas Gudang</th>
                  <th>Satuan Luas</th> -->
                  <th class="w-20 text-center border border-gray-300">
                    Delete
                  </th>
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
                      (parameters.params.page - 1) *
                        parameters.params.per_page +
                      i +
                      1
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.lokasi.nama_lokasi }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.kode_gudang_sap }}
                  </td>
                  <td class="border border-gray-300">{{ item.kode_gudang }}</td>
                  <td class="border border-gray-300">
                    <!-- {{
                      item.profit_cost.nama_wilayah +
                      " (" +
                      item.profit_cost.profit_center +
                      "-" +
                      item.profit_cost.cost_center +
                      ")"
                    }} -->
                    <div>
                      Profit Center:
                      {{ item.profit_center.kode_profit_center }}
                    </div>
                    <div>
                      Cost Center:
                      {{ item.cost_center.kode_cost_center }}
                    </div>
                  </td>
                  <td class="border border-gray-300">{{ item.nama_gudang }}</td>
                  <!-- <td>
                    {{
                      item.status_konfig_outbound_sap == 1
                        ? "Aktif"
                        : "Non Aktif"
                    }}
                  </td>
                  <td>{{ item.nomor_rekening }}</td>
                  <td>{{ item.atas_nama_rekening }}</td> -->
                  <td class="border border-gray-300">
                    {{ item.status_gudang == 1 ? "Aktif" : "Non Aktif" }}
                  </td>
                  <td class="border border-gray-300">
                    <p v-if="item.group_gudang_1">
                      {{
                        item.group_gudang_1
                          ? item.group_gudang_1.nama_group_gudang
                          : "Tidak Ditemukan"
                      }}
                    </p>
                    <p v-if="item.group_gudang_2">
                      {{
                        item.group_gudang_2
                          ? item.group_gudang_2.nama_group_gudang
                          : "Tidak Ditemukan"
                      }}
                    </p>
                    <p v-if="item.group_gudang_3">
                      {{
                        item.group_gudang_3
                          ? item.group_gudang_3.nama_group_gudang
                          : "Tidak Ditemukan"
                      }}
                    </p>
                    <p v-if="item.group_gudang_4">
                      {{
                        item.group_gudang_4
                          ? item.group_gudang_4.nama_group_gudang
                          : "Tidak Ditemukan"
                      }}
                    </p>
                    <p v-if="item.group_gudang_5">
                      {{
                        item.group_gudang_5
                          ? item.group_gudang_5.nama_group_gudang
                          : "Tidak Ditemukan"
                      }}
                    </p>
                  </td>
                  <td class="border border-gray-300">{{ item.longitude }}</td>
                  <td class="border border-gray-300">{{ item.latitude }}</td>
                  <td class="border border-gray-300">
                    {{ item.alamat ?? "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.kecamatan?.nama_kecamatan ?? "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.kota?.nama_kota ?? "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.provinsi?.nama_provinsi ?? "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.negara?.nama_negara ?? "" }}
                  </td>
                  <!-- <td>{{ item.vendor_pemilik.nama_vendor }}</td> -->
                  <td class="border border-gray-300">
                    {{
                      item.vendor_operator
                        ? item.vendor_operator.nama_vendor
                        : "Tidak Ditemukan"
                    }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.fungsi_gudang.nama_fungsi }}
                  </td>
                  <td class="border border-gray-300">{{ item.no_hp }}</td>
                  <td class="border border-gray-300">{{ item.no_wa }}</td>
                  <td class="border border-gray-300">{{ item.kapasitas }}</td>
                  <td class="border border-gray-300">
                    {{ item.kapasitas_bongkar }}
                  </td>
                  <!-- <td>{{ item.fisik_gudang.nama_fisik }}</td> -->
                  <td class="border border-gray-300">
                    {{ item.ukuran_gudang.nama_ukuran }}
                  </td>
                  <td class="text-center border border-gray-300">
                    <button
                      @click="displayFile"
                      class="p-1 text-xl w-8 h-auto bg-blue-500 rounded-md"
                    >
                      <i class="fa fa-file text-white"></i>
                    </button>
                  </td>
                  <!-- <td>{{ item.status_sewa == 0 ? "Sewa" : "Sendiri" }}</td>
                  <td>
                    {{
                      item.status_satpam == 0
                        ? "Tidak Memiliki Satpam"
                        : "Memiliki Satpam"
                    }}
                  </td>
                  <td>{{ item.luas_gudang }}</td>
                  <td>{{ item.satuan_luas.nama_satuan }}</td> -->

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
      title: "Gudang",
    };
  },

  created() {
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
      this.$refs["form-option"].isExportPrint = true;
    }
  },

  data() {
    return {
      title: "Gudang",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "master/gudang",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "gudang_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
        },
        form: {
          gudang_id: "",
          lokasi_id: "",
          kode_gudang_sap: "",
          profit_cost_id: "",
          kode_gudang: "",
          nama_gudang: "",
          status_konfig_outbound_sap: "",
          nomor_rekening: "",
          atas_nama_rekening: "",
          status_gudang: "",
          group_gudang_id_1: "",
          group_gudang_id_2: "",
          group_gudang_id_3: "",
          group_gudang_id_4: "",
          group_gudang_id_5: "",
          longitude: "",
          latitude: "",
          alamat: "",
          kecamatan_id: "",
          kota_id: "",
          provinsi_id: "",
          negara_id: "",
          vendor_id_pemilik: "",
          vendor_id_operator: "",
          fungsi_gudang_id: "",
          no_hp: "",
          no_wa: "",
          kapasitas: "",
          kapasitas_bongkar: "",
          fisik_gudang_id: "",
          ukuran_gudang_id: "",
          file_layout: "",
          status_sewa: "",
          status_satpam: "",
          luas_gudang: "",
          satuan_id_luas: "",
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
    ...mapState("moduleApi", ["data", "error", "result"]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "gudang"
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
      this.$router.push("/master/gudang/add");
    },

    onEdit(item) {
      this.$router.push("/master/gudang/" + item.gudang_id);
    },

    onDetail(item) {
      this.$router.push(`/master/gudang/detail/${item.gudang_id}`);
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
              id: item.gudang_id,
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

    displayFile() {
      console.log("display file");
    },
  },
};
</script>
