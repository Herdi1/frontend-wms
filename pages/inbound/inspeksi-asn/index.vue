<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Inbound</a>
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
                <div class="flex w-full m-1 pr-1">
                  <label for="" class="w-1/2">Status Inspeksi</label>
                  <select
                    name=""
                    id=""
                    v-model="parameters.params.status_inspeksi"
                    class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                  >
                    <option value="MENUNGGU">Menunggu</option>
                    <option value="DITERIMA">Diterima</option>
                    <option value="DITOLAK">Ditolak</option>
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

          <div class="table-responsive">
            <table class="mb-5 border border-gray-300" ref="formContainer">
              <thead>
                <tr class="text-base uppercase">
                  <th class="w-[5%] border border-gray-300">Inspeksi</th>
                  <th class="w-[5%] border text-center border-gray-300">No</th>
                  <!-- <th
                    @click="
                      onSort(
                        'nama_provinsi',
                        parameters.params.sort == 'asc' ? 'desc' : 'asc'
                      )
                    "
                    class="cursor-pinter w-[30%]"
                  >
                    <div class="flex justify-between items-baseline">
                      <div>Nama Provinsi</div>
                      <div>
                        <i
                          class="fas fa-caret-up"
                          :class="
                            parameters.params.order == 'nama_provinsi' &&
                            parameters.params.sort == 'asc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                        <i
                          class="fas fa-caret-down"
                          :class="
                            parameters.params.order == 'nama_provinsi' &&
                            parameters.params.sort == 'desc'
                              ? ''
                              : 'light-gray'
                          "
                        ></i>
                      </div>
                    </div>
                  </th> -->
                  <th class="border border-gray-300">Kode ASN</th>
                  <th class="border border-gray-300">Gudang</th>
                  <th class="border border-gray-300">Tanggal Inspeksi</th>
                  <th class="border border-gray-300">Status Inspeksi</th>
                  <th class="border border-gray-300">Catatan inspeksi</th>
                  <!-- <th>Kendaraan</th>
                  <th>Pengemudi</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in data" :key="i">
                  <td
                    class="text-center border border-gray-300 place-items-center"
                  >
                    <small-edit-button
                      @click="onEdit(item)"
                      :disabled="
                        item.status_inspeksi === 'DITERIMA' ||
                        item.status_inspeksi === 'DITOLAK'
                      "
                    />
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
                    <div>
                      {{ item.kode_asn }}
                      <p v-if="item.user_id_input" class="text-blue-500">
                        <i>Dibuat oleh: {{ item.user_id_input.username }}</i>
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
                    {{ formatDate(item.tanggal_inspeksi) }}
                  </td>
                  <td class="border border-gray-300">
                    <!-- <p
                      class="text-green-500"
                      v-if="item.status_konfirmasi == 1"
                    >
                      Dikonfirmasi
                    </p>
                    <p class="text-red-500" v-else>Pending</p> -->
                    <span v-if="item.status_inspeksi === 'MENUNGGU'">
                      <p
                        class="bg-orange-500 p-1 rounded-lg w-fit font-semibold text-white"
                      >
                        {{ item.status_inspeksi }}
                      </p>
                    </span>
                    <span v-if="item.status_inspeksi === 'DITERIMA'">
                      <p
                        class="bg-green-500 p-1 rounded-lg w-fit font-semibold text-white"
                      >
                        {{ item.status_inspeksi }}
                      </p>
                    </span>
                    <span v-if="item.status_inspeksi === 'DITOLAK'">
                      <p
                        class="bg-red-500 p-1 rounded-lg w-fit font-semibold text-white"
                      >
                        {{ item.status_inspeksi }}
                      </p>
                    </span>
                    <span v-if="item.status_inspeksi === null">
                      <p
                        class="bg-orange-500 p-1 rounded-lg w-fit font-semibold text-white"
                      >
                        {{ item.status_inspeksi }}
                      </p>
                    </span>
                  </td>
                  <td class="border border-gray-300">
                    {{ item.catatan_inspeksi }}
                  </td>
                  <!-- <td>{{ item.kendaraan_id }}</td>
                  <td>{{ item.pengemudi_id }}</td> -->
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
      title: "Inspeksi ASN",
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

    await this.onSearchGudang();
  },

  data() {
    return {
      title: "Inspeksi ASN",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "inbound/inspeksi-asn",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "asn_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_data: "",
          gudang_id: "",
          status_inspeksi: "",
        },
        form: {
          status_inspeksi: "",
          tanggal_inspeksi: "",
          catatan_inspeksi: "",
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
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
          (item) => item.rute == "inspeksi-asn"
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

    // onFormShow() {
    //   this.$router.push("/inbound/inspeksi-asn/add");
    // },

    onEdit(item) {
      this.$router.push("/inbound/inspeksi-asn/" + item.asn_id);
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
              id: item.asn_id,
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
      this.parameters.params.gudang_id = item ? item : "";
    },
  },
};
</script>
