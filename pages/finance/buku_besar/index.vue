<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline"
          >Cash Management</a
        >
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>Buku Besar</span>
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

                <!-- <div class="flex w-[400px]">

              <div class="mb-3 w-[40%]"><b>Periode Awal</b></div>
          <div class="form-group w-[60%]">
            <input type="date"
              class="form-control"
              v-model="parameters.params.start_date"/>
          </div>


          </div>


          <div class="mb-3"><b>Periode Akhir</b></div>
          <div class="form-group">
            <input type="date"
              class="form-control"
              v-model="parameters.params.end_date"/>

          </div>         -->

                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Master Akun</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_coa"
                    :loading="isLoadingGetChartOfAccount"
                    :options="lookup_chart_of_accounts.data"
                    :filterable="false"
                    @search="onGetChartOfAccount"
                    @input="onSetChartOfAccount"
                    v-model="coa_id"
                  >
                    <template v-slot:option="option">
                      <div class="flex">
                        <div class="col-md-5 p-1 m-0 w-8/12">
                          {{ option.nama_coa }}
                        </div>
                        <div class="col-md-7 p-1 m-0 text-right w-4/12">
                          {{ option.kode_coa }}
                        </div>
                      </div>
                    </template>
                    <template #search="{ attributes, events }">
                      <input
                        class="vs__search"
                        :required="!coa_id"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_chart_of_accounts.data.length || search"
                    >
                      <span
                        v-if="lookup_chart_of_accounts.current_page > 1"
                        @click="onGetChartOfAccount(search, false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_chart_of_accounts.last_page >
                          lookup_chart_of_accounts.current_page
                        "
                        @click="onGetChartOfAccount(search, true)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Gudang</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_gudang"
                    :loading="isLoadingGetGudang"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetGudang"
                    @input="onSetGudang"
                    v-model="gudang_id"
                  >
                    <template v-slot:option="option">
                      <div class="flex">
                        <div class="col-md-5 p-1 m-0 w-8/12">
                          {{ option.nama_gudang }}
                        </div>
                        <div class="col-md-7 p-1 m-0 text-right w-4/12">
                          {{ option.kode_gudang }}
                        </div>
                      </div>
                    </template>
                    <template #search="{ attributes, events }">
                      <input
                        class="vs__search"
                        :required="!gudang_id"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
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

            <!-- start table -->
            <div class="table-responsive">
              <table class="mt-5" ref="formContainer">
                <!-- table table-striped table-sm vld-parent -->
                <thead class="border border-gray-300">
                  <tr class="uppercase">
                    <th class="border border-gray-300">Tanggal</th>
                    <th class="border border-gray-300">Gudang</th>
                    <th class="border border-gray-300">Kode</th>
                    <th class="border border-gray-300">Nama</th>
                    <th class="border border-gray-300">Kode Transaksi</th>
                    <th class="border border-gray-300">Kode Referensi</th>
                    <th class="border border-gray-300">Keterangan</th>
                    <!-- <th class="text-info">Saldo Awal</th> -->
                    <th class="text-primary border border-gray-300">Debit</th>
                    <th class="text-danger border border-gray-300">Kredit</th>
                    <th class="text-primary border border-gray-300">
                      Saldo Akhir
                    </th>
                    <th class="border border-gray-300 text-center">Detail</th>
                  </tr>
                </thead>
                <tbody class="border border-gray-300">
                  <tr v-if="data.length">
                    <td class="border border-gray-300">
                      {{ data[0] ? formatDate(data[0].tanggal) : "-" }}
                    </td>
                    <td></td>
                    <td class="border border-gray-300">
                      {{ coa_id ? coa_id.kode_coa : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ coa_id ? coa_id.nama_coa : "-" }}
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <!-- {{
                      raw_data.first_balance
                        ? raw_data.first_balance.saldo
                        : "" | formatPrice
                    }} -->
                    </td>
                    <td class="text-success"></td>
                    <td class="text-danger"></td>
                    <td class="text-primary border border-gray-300 text-right">
                      {{
                        raw_data.first_balance
                          ? raw_data.first_balance.saldo
                          : "" | formatPrice
                      }}
                    </td>
                    <td></td>
                  </tr>

                  <tr v-for="(item, i) in data" :key="i">
                    <!-- :class="{ 'table-active': ActiveRow == i }"
                  @click="onRowSelected(i)" -->
                    <td class="border border-gray-300">
                      {{ formatDate(item.tanggal) }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.gudang ? item.gudang.nama_gudang : "" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.coa ? item.coa.kode_coa : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.coa ? item.coa.nama_coa : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.kode_referensi }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.kode_referensi_2 }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.keterangan }}
                    </td>
                    <!-- <td class="text-info">
                    {{ item.saldo > 0 ? item.saldo : "" }}
                  </td> -->
                    <td class="text-success border border-gray-300 text-right">
                      {{ item.debit > 0 ? item.debit : "" | formatPrice }}
                    </td>
                    <td class="text-danger border border-gray-300 text-right">
                      {{ item.credit > 0 ? item.credit : "" | formatPrice }}
                    </td>
                    <td class="text-primary border border-gray-300 text-right">
                      <span class="text-right">
                        {{
                          item.last_balance
                            ? item.last_balance
                            : "" | formatPrice
                        }}
                      </span>
                    </td>
                    <td class="border border-gray-300 place-items-center">
                      <button
                        class="btn btn-sm btn-primary"
                        @click="onDetail(item)"
                        v-if="getRoles.show"
                      >
                        <i class="fas fa-info-circle"></i>
                      </button>
                    </td>
                  </tr>

                  <tr v-if="data.length">
                    <td class="border border-gray-300">
                      {{
                        data[data.length - 1]
                          ? formatDate(data[data.length - 1].tanggal)
                          : "-"
                      }}
                    </td>
                    <td class="border-b border-gray-300"></td>
                    <td class="border border-gray-300">
                      {{ coa_id ? coa_id.kode_coa : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ coa_id ? coa_id.nama_coa : "-" }}
                    </td>
                    <td class="border-b border-gray-300"></td>
                    <td class="border-b border-gray-300"></td>
                    <td class="text-info border-b border-gray-300"></td>
                    <td class="text-success border-b border-gray-300"></td>
                    <td class="text-danger border-b border-gray-300"></td>
                    <td class="text-primary border border-gray-300 text-right">
                      {{ last_balance | formatPrice }}
                    </td>
                    <td class="border-b border-gray-300"></td>
                  </tr>
                </tbody>

                <table-data-loading-section :self="this" />

                <table-data-not-found-section :self="this" />

                <tr v-if="data && raw_data.current_page != raw_data.last_page">
                  <td colspan="10" class="text-center">
                    <button class="btn btn-link" @click="loadMoreStock">
                      Selanjutnya
                    </button>
                  </td>
                </tr>
              </table>
            </div>
            <!-- end table -->
          </div>
        </div>
      </div>
    </div>
    <ModalDetail :self="this" ref="modalDetail" />
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ModalDetail from "./detail.vue";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Buku Besar",
    };
  },

  created() {
    this.onLoad();
  },

  components: {
    ModalDetail,
  },

  async mounted() {
    this.$refs["form-option"].isAddData = false;
    this.$refs["form-option"].isMaintenancePage = false;
    this.$refs["form-option"].isFilter = false;
    this.$refs["form-option"].isExport = true;
    this.$refs["form-option"].isExportFile = false;
    this.$refs["form-option"].isExportPrint = false;

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

    this.$refs["form-option"].isSearching = false;
    this.$refs["form-option"].isShowingPage = false;

    await this.onSearchGudang();
    await this.onSearchChartOfAccount();
  },

  data() {
    return {
      data: [],
      raw_data: [],
      ActiveRow: null,
      title: "BUKU BESAR",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "finance/buku_besar",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "id",
          sort: "asc",
          all: "",
          per_page: 30,
          page: 1,

          start_date: "",
          end_date: "",
          coa_id: "",
          gudang_id: "",
        },
        default_params: {
          soft_deleted: "",
          search: "",
          order: "id",
          sort: "asc",
          all: "",
          per_page: 30,
          page: 1,

          start_date: "",
          end_date: "",
          coa_id: "",
          gudang_id: "",
        },
        form: {
          checkboxs: [],
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
      user: { ...this.$auth.user },

      isStopSearchChartOfAccount: false,
      isLoadingGetChartOfAccount: false,
      chart_of_account_search: "",

      coa_id: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      gudang_id: "",

      passiva_types: ["MODAL", "KEWAJIBAN", "PENDAPATAN"],
    };
  },

  components: {
    ModalDetail,
  },

  computed: {
    ...mapState("moduleApi", ["lookup_chart_of_accounts", "lookup_custom1"]),

    getRoles() {
      if (!this.user.parent_id) {
        return this.default_roles;
      } else {
        let main_role = this.user.group_role.roles.find(
          (item) => item.name == "buku_besar"
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

    last_balance() {
      if (!this.data || !Array.isArray(this.data)) {
        return 0;
      }

      let creditAndDebit = this.data.reduce((itemPrev, itemNext) => {
        const credit = parseFloat(itemNext.credit || 0) || 0;
        const debit = parseFloat(itemNext.debit || 0) || 0;

        return itemPrev + debit - credit;
      }, 0.0);

      const firstBalance =
        parseFloat(this.raw_data?.first_balance?.saldo || 0) || 0;

      return firstBalance + creditAndDebit;
    },
  },

  watch: {
    "parameters.params.chart_of_account_id": function (newValue, oldValue) {
      if (!newValue) {
        this.chart_of_account_id = "";
      }
    },
    // "parameters.params.gudang_id": function (newValue, oldValue) {
    //   if (!newValue) {
    //     this.gudang_id = "";
    //   }
    // },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      let url =
        this.parameters.url +
        "?page=1" +
        "&coa_id=" +
        this.parameters.params.coa_id +
        "&gudang_id=" +
        this.parameters.params.gudang_id +
        "&start_date=" +
        this.parameters.params.start_date +
        "&end_date=" +
        this.parameters.params.end_date;

      this.$axios
        .get(url)
        .then((res) => {
          let newLastBalance = parseFloat(
            res.data.first_balance ? res.data.first_balance.saldo : 0.0
          );

          let newData = res.data.data.map((item) => {
            // if (this.chart_of_account_id && this.chart_of_account_id.parent) {
            //   if (
            //     this.passiva_types.includes(
            //       this.chart_of_account_id.parent.type
            //     )
            //   ) {
            //     newLastBalance =
            //       parseFloat(newLastBalance) +
            //       parseFloat(item.credit) -
            //       parseFloat(item.debit);
            //   } else {
            //     newLastBalance =
            //       parseFloat(newLastBalance) +
            //       parseFloat(item.debit) -
            //       parseFloat(item.credit);
            //   }
            // } else {
            //   newLastBalance = 0;
            // }

            newLastBalance =
              parseFloat(newLastBalance) +
              parseFloat(item.debit ?? 0) -
              parseFloat(item.credit ?? 0);

            return {
              ...item,
              last_balance: newLastBalance,
            };
          });

          this.raw_data = res.data;
          this.data = newData;
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          loader.hide();
          this.isLoadingData = false;
        });
    },

    loadMoreStock() {
      if (this.isLoadingData) return;

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      this.parameters.params.page += 1;

      this.isLoadingData = true;

      let url =
        this.parameters.url +
        "?page=" +
        this.parameters.params.page +
        "&chart_of_account_id=" +
        this.parameters.params.chart_of_account_id +
        "&start_date=" +
        this.parameters.params.start_date +
        "&end_date=" +
        this.parameters.params.end_date;

      this.$axios
        .get(url)
        .then((res) => {
          let newData = [...this.data, ...res.data.data];

          let newLastBalance = parseFloat(
            res.data.first_balance ? res.data.first_balance.saldo : 0.0
          );

          let newMapData = newData.map((item) => {
            if (this.chart_of_account_id && this.chart_of_account_id.parent) {
              if (
                this.passiva_types.includes(
                  this.chart_of_account_id.parent.type
                )
              ) {
                newLastBalance =
                  parseFloat(newLastBalance) +
                  parseFloat(item.credit) -
                  parseFloat(item.debit);
              } else {
                newLastBalance =
                  parseFloat(newLastBalance) +
                  parseFloat(item.debit) -
                  parseFloat(item.credit);
              }
            } else {
              newLastBalance = 0;
            }

            return {
              ...item,
              last_balance: newLastBalance,
            };
          });

          this.data = newMapData;
          this.raw_data.current_page += 1;
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          loader.hide();
          this.isLoadingData = false;
        });
    },

    onGetChartOfAccount(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchChartOfAccount);

      this.isStopSearchChartOfAccount = setTimeout(() => {
        this.chart_of_account_search = search;

        if (typeof isNext !== "function") {
          this.lookup_chart_of_accounts.current_page = isNext
            ? this.lookup_chart_of_accounts.current_page + 1
            : this.lookup_chart_of_accounts.current_page - 1;
        } else {
          this.lookup_chart_of_accounts.current_page = 1;
        }

        this.onSearchChartOfAccount();
      }, 600);
    },

    async onSearchChartOfAccount() {
      if (!this.isLoadingGetChartOfAccount) {
        this.isLoadingGetChartOfAccount = true;

        await this.lookUp({
          url: "finance/jurnal/get-coa",
          lookup: "chart_of_accounts",
          query:
            "?search=" +
            this.chart_of_account_search +
            "&page=" +
            this.lookup_chart_of_accounts.current_page +
            "&per_page=10",
        });

        this.isLoadingGetChartOfAccount = false;
      }
    },

    onSetChartOfAccount(item) {
      this.parameters.params.coa_id = item ? item.coa_id : "";
    },

    //gudang
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

    onSetGudang(item) {
      this.parameters.params.gudang_id = item ? item.gudang_id : "";
    },

    onDetail(item) {
      // this.$refs["modal-detail"].parameters.form = {
      //   ...item
      // };

      // window.$("#modal-detail").modal("show");

      this.$refs.modalDetail.parameters.form = {
        ...item,
      };

      // this.$refs.modalDetail.fetchItemDetail();
      this.$refs.modalDetail.show();
      console.log("the modal should show");
    },

    onRowSelected(index) {
      this.ActiveRow = index;
    },
  },
};
</script>
