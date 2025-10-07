<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Master</a>
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Lokasi Shipto</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>
    <div class="flex flex-col gap-5">
      <div
        class="w-full relative bg-white dark:bg-slate-800 rounded-md p-2 px-4"
      >
        <div>
          <list-option-section :self="this" ref="form-option" />
        </div>

        <div class="w-full mt-3 mb-7">
          <div class="w-full gap-5 p-2 border border-gray-300 rounded-md">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
              <div class="form-group w-full flex">
                <div class="mb-3 w-1/2"><b>Tipe Lokasi</b></div>

                <select
                  class="p-1 w-1/2 border border-gray-300 rounded-sm outline-none"
                  name="tipe_lokasi"
                  id="tipe_lokasi"
                  v-model="parameters.params.tipe_lokasi"
                >
                  <option
                    v-for="(item, i) in lookup_custom1.data"
                    :key="i"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </option>
                </select>
              </div>
            </div>

            <div class="flex gap-3 mt-5">
              <button
                @click="onLoad"
                class="bg-blue-500 shadow-md hover:shadow-none p-2 text-white rounded-md flex"
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
              <tr class="uppercase">
                <th class="w-20 border border-gray-300 text-center">Edit</th>

                <th class="w-20 text-center border border-gray-300">Details</th>

                <th class="w-20 border text-center border-gray-300">No</th>
                <th class="w-40 border border-gray-300">Kode Lokasi</th>
                <th
                  @click="
                    onSort(
                      'nama_lokasi',
                      parameters.params.sort == 'asc' ? 'desc' : 'asc'
                    )
                  "
                  class="cursor-pointer border border-gray-300 w-40"
                >
                  <div class="flex justify-between align-baseline">
                    <div>Nama Lokasi</div>
                    <div>
                      <i
                        class="fas fa-caret-up"
                        :class="
                          parameters.params.order == 'nama_lokasi' &&
                          parameters.params.sort == 'asc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                      <i
                        class="fas fa-caret-down"
                        :class="
                          parameters.params.order == 'nama_lokasi' &&
                          parameters.params.sort == 'desc'
                            ? ''
                            : 'light-gray'
                        "
                      ></i>
                    </div>
                  </div>
                </th>
                <th class="w-40 border border-gray-300">Kode Pos</th>
                <th class="w-40 border border-gray-300">Kecamatan</th>
                <th class="w-40 border border-gray-300">Kota</th>
                <th class="w-40 border border-gray-300">Provinsi</th>
                <th class="w-40 border border-gray-300">Negara</th>
                <th class="w-40 border border-gray-300">Nama Pemilik</th>
                <th class="w-40 border border-gray-300">No Telp</th>
                <th class="w-40 border border-gray-300">No HP</th>
                <th class="w-40 border border-gray-300">Longitude</th>
                <th class="w-40 border border-gray-300">Latitude</th>
                <th class="w-40 border border-gray-300">Radius (Meter)</th>
                <th class="w-40 border border-gray-300">Tipe Lokasi</th>
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
                <td class="border border-gray-300">{{ item.kode_lokasi }}</td>
                <td class="border border-gray-300">{{ item.nama_lokasi }}</td>
                <td class="border border-gray-300">
                  {{ item.kode_pos ? item.kode_pos.nama_kode_pos : "" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.kecamatan ? item.kecamatan.nama_kecamatan : "" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.kota ? item.kota.nama_kota : "" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.provinsi ? item.provinsi.nama_provinsi : "" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.negara ? item.negara.nama_negara : "" }}
                </td>
                <td class="border border-gray-300">{{ item.nama_pemilik }}</td>
                <td class="border border-gray-300">{{ item.no_telp }}</td>
                <td class="border border-gray-300">{{ item.no_hp }}</td>
                <td class="border border-gray-300">{{ item.longitude }}</td>
                <td class="border border-gray-300">{{ item.latitude }}</td>
                <td class="border border-gray-300">{{ item.radius }}</td>
                <td class="border border-gray-300">
                  {{
                    item.tipe_lokasi === "T"
                      ? "Toko"
                      : item.tipe_lokasi === "P"
                      ? "Project"
                      : item.tipe_lokasi === "V"
                      ? "Vendor"
                      : item.tipe_lokasi === "G"
                      ? "Gudang"
                      : ""
                  }}
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
      title: "Lokasi Shipto",
    };
  },

  created() {
    this.set_data([]);
    this.onLoad();
  },

  async mounted() {
    this.$refs["form-option"].isMaintenancePage = false;
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

    // await this.lookUp({
    //   url: "utility",
    //   lookup: "custom1",
    //   query: "?q=tipe_lokasi",
    // });

    await this.$axios.get("utility?q=tipe_lokasi").then((res) => {
      this.lookup_custom1.data = { ...res.data };
    });

    console.log(this.lookup_custom1.data);
  },

  data() {
    return {
      title: "Lokasi Shipto",
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
        url: "master/lokasi",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "lokasi_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          tipe_lokasi: "",
        },
        form: {
          lokasi_id_induk: "",
          tipe_lokasi: "T",
          kode_referensi: "",
          kode_lokasi: "",
          nama_lokasi: "",
          negara_id: "",
          provinsi_id: "",
          kota_id: "",
          kecamatan_id: "",
          kelurahan_id: "",
          kode_pos_id: "",
          email: "",
          nilai_plafon: "",
          no_telp: "",
          no_hp: "",
          no_npwp: "",
          longitude: "",
          latitude: "",
          radius: "",
          longitude2: "",
          latitude2: "",
          radius2: "",
          longitude3: "",
          latitude3: "",
          radius3: "",
          alamat: "",
          alamat_lokasi: "",
          nama_pemilik: "",
          nik_pemilik: "",
          npwp_pemilik: "",
          negara_id_pemilik: "",
          provinsi_id_pemilik: "",
          kota_id_pemilik: "",
          kecamatan_id_pemilik: "",
          kelurahan_id_pemilik: "",
          alamat_pemilik: "",
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
      isStopSearchTipe: false,
      isLoadingGetTipe: false,
      tipe_lokasi_search: "",
    };
  },

  components: {
    FormInput,
    ModalDetail,
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result", "lookup_custom1"]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "lokasi"
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
      this.$router.push("/master/lokasi/add");
    },

    onEdit(item) {
      this.$router.push("/master/lokasi/" + item.lokasi_id);
    },

    onDetail(item) {
      this.$refs.modalDetail.parameters.form = {
        ...item,
      };
      this.$refs.modalDetail.show();
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
              id: item.lokasi_id,
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
        id: item.lokasi_id,
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
