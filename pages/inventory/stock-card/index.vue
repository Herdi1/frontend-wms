<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline"
          >Inventory</a
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
    <div class="gap-5">
      <div
        class="relative w-full p-4 w-12/12 bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
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
                    :loading="isLoadingGetChartOfAccount"
                    :options="lookup_chart_of_accounts.data"
                    :filterable="false"
                    @search="onGetChartOfAccount"
                    @input="onSetChartOfAccount"
                    v-model="parameters.params.gudang_id"
                  >
                    <template v-slot:option="option">
                      <div class="flex">
                        <div class="col-md-5 p-1 m-0 w-8/12">
                          {{ option.nama_gudang }}
                        </div>
                        <!-- <div class="col-md-7 p-1 m-0 text-right w-4/12">
                        {{ option.kode_coa }}
                      </div> -->
                      </div>
                    </template>
                    <!-- <template #search="{ attributes, events }">
                    <input
                      class="vs__search"
                      :required="!coa_id"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template> -->
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
                  <div class="mb-3 w-1/2"><b>Item</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_item"
                    :loading="isLoadingGetItemGudang"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetItemGudang"
                    v-model="parameters.params.item_gudang_id"
                  >
                    <template v-slot:option="option">
                      <div class="flex">
                        <div class="col-md-5 p-1 m-0 w-8/12">
                          {{ option.nama_item }}
                        </div>
                        <!-- <div class="col-md-7 p-1 m-0 text-right w-4/12">
                        {{ option.kode_coa }}
                      </div> -->
                      </div>
                    </template>
                    <!-- <template #search="{ attributes, events }">
                    <input
                      class="vs__search"
                      :required="!coa_id"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template> -->
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_custom1.data.length || search"
                    >
                      <span
                        v-if="lookup_custom1.current_page > 1"
                        @click="onGetItemGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetItemGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-2">
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Valuation</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_valuation"
                    :loading="isLoadingGetValuation"
                    :options="lookup_custom2.data"
                    :filterable="false"
                    @search="onGetValuation"
                    v-model="parameters.params.valuation_id"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_custom2.data.length || search"
                    >
                      <span
                        v-if="lookup_custom2.current_page > 1"
                        @click="onGetValuation(search, false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom2.last_page > lookup_custom2.current_page
                        "
                        @click="onGetValuation(search, true)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Zona Gudang</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_zona_gudang"
                    :loading="isLoadingGetZonaGudang"
                    :options="lookup_custom3.data"
                    :filterable="false"
                    @search="onGetZonaGudang"
                    v-model="parameters.params.zona_gudang_id"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="d-flex justify-content-between"
                      v-if="lookup_custom3.data.length || search"
                    >
                      <span
                        v-if="lookup_custom3.current_page > 1"
                        @click="onGetZonaGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom3.last_page > lookup_custom3.current_page
                        "
                        @click="onGetZonaGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center"
                        style="cursor: pointer"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
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
          <div class="table-fixed relative w-full overflow-x-auto">
            <table class="table table-sm min-w-full" ref="formContainer">
              <thead>
                <tr class="uppercase">
                  <th class="min-w-[100px]">Tgl</th>
                  <th class="min-w-[150px]">Lokasi Penyimpanan</th>
                  <th class="min-w-[200px]">Item</th>
                  <th class="min-w-[100px]">Valuation</th>
                  <th class="min-w-[120px]">Kode Transaksi</th>
                  <!-- <th class="text-info min-w-[100px]">Saldo Awal</th> -->
                  <th class="text-primary min-w-[100px]">Masuk</th>
                  <th class="text-danger min-w-[100px]">Keluar</th>
                  <th class="text-primary min-w-[100px]">Saldo Akhir</th>
                  <th class="min-w-[100px]">Options</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="data.length">
                  <td>
                    {{ data[0] ? data[0].tanggal : "-" }}
                  </td>
                  <td>
                    <!-- {{ coa_id ? coa_id.kode_coa : "-" }} -->
                  </td>
                  <td style="font-size: 10px !important">
                    <!-- {{ coa_id ? coa_id.nama_coa : "-" }} -->
                  </td>
                  <td></td>
                  <td></td>
                  <!-- <td class="text-info">
                    {{
                      raw_data.first_balance
                        ? raw_data.first_balance.saldo
                        : "" | formatPrice
                    }}
                  </td> -->
                  <td class="text-success"></td>
                  <td class="text-danger"></td>
                  <td class="text-primary">
                    {{
                      raw_data.first_balance
                        ? raw_data.first_balance.saldo
                        : "" | formatPrice
                    }}
                  </td>
                  <td>-</td>
                </tr>

                <!-- :class="{ 'table-active': ActiveRow == i }" -->
                <tr v-for="(item, i) in data" :key="i">
                  <!-- @click="onRowSelected(i)" -->
                  <td class="whitespace-nowrap">{{ item.tanggal }}</td>
                  <td class="whitespace-nowrap">
                    {{ item.kode_slot_penyimpanan_terakhir ?? "-" }}
                  </td>
                  <td class="whitespace-nowrap">
                    {{ item.item_gudang ? item.item_gudang.kode_item : "-" }} -
                    {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
                  </td>
                  <td class="whitespace-nowrap">
                    {{ item.kode_valuation ? item.kode_valuation : "-" }}
                  </td>
                  <td class="whitespace-nowrap">
                    {{ item.kode_referensi ? item.kode_referensi : "-" }}
                  </td>
                  <!-- <td class="text-info whitespace-nowrap">
                    {{
                      item.saldo_awal > 0 ? item.saldo_awal : "" | formatPrice
                    }}
                  </td> -->
                  <td class="text-success whitespace-nowrap">
                    {{ item.masuk > 0 ? item.masuk : "" | formatPrice }}
                  </td>
                  <td class="text-danger whitespace-nowrap">
                    {{ item.keluar > 0 ? item.keluar : "" | formatPrice }}
                  </td>
                  <td class="text-primary whitespace-nowrap">
                    {{ item.last_balance | formatPrice }}
                  </td>
                  <td class="whitespace-nowrap">
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
                  <td>
                    {{
                      data[data.length - 1]
                        ? data[data.length - 1].tanggal
                        : "-"
                    }}
                  </td>
                  <td>
                    <!-- {{ coa_id ? coa_id.kode_coa : "-" }} -->
                  </td>
                  <td>
                    <!-- {{ coa_id ? coa_id.nama_coa : "-" }} -->
                  </td>
                  <td></td>
                  <!-- <td></td> -->
                  <td class="text-info"></td>
                  <td class="text-success"></td>
                  <td class="text-danger"></td>
                  <td class="text-primary">
                    {{ last_balance | formatPrice }}
                  </td>
                  <td>-</td>
                </tr>
              </tbody>

              <table-data-loading-section :self="this" />

              <table-data-not-found-section :self="this" />

              <tr v-if="data && raw_data.current_page != raw_data.last_page">
                <td colspan="11" class="text-center">
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
      title: "Stock Card",
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

    await this.onSearchChartOfAccount();
    await this.onSearchItemGudang();
    await this.onSearchValuation();
    await this.onSearchZonaGudang();
  },

  data() {
    return {
      data: [],
      raw_data: [],
      ActiveRow: null,
      title: "Stock Card",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "inventory/stock-card",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "stock_card_id",
          sort: "asc",
          all: "",
          per_page: 30,
          page: 1,

          start_date: "",
          end_date: "",
          gudang_id: {
            gudang_id: "",
          },
          item_gudang_id: {
            item_gudang_id: "",
          },
          valuation_id: {
            valuation_id: "",
          },
          zona_gudang_id: {
            zona_gudang_id: "",
          },
        },
        default_params: {
          soft_deleted: "",
          search: "",
          order: "stock_card_id",
          sort: "asc",
          all: "",
          per_page: 30,
          page: 1,

          start_date: "",
          end_date: "",
          gudang_id: "",
          item_gudang_id: "",
          valuation_id: "",
          zona_gudang_id: "",
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

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

      coa_id: "",

      passiva_types: ["MODAL", "KEWAJIBAN", "PENDAPATAN"],
    };
  },

  components: {
    ModalDetail,
  },

  computed: {
    ...mapState("moduleApi", [
      "lookup_chart_of_accounts",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
    ]),

    getRoles() {
      if (!this.user.parent_id) {
        return this.default_roles;
      } else {
        let main_role = this.user.group_role.roles.find(
          (item) => item.name == "stock-card"
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
      let creditAndDebit = this.data.reduce((itemPrev, itemNext) => {
        // if (this.chart_of_account_id && this.chart_of_account_id.parent) {
        //   if (
        //     this.passiva_types.includes(this.chart_of_account_id.parent.type)
        //   ) {
        //     itemPrev +=
        //       parseFloat(itemNext.credit) - parseFloat(itemNext.debit);
        //   } else {
        //     itemPrev +=
        //       parseFloat(itemNext.debit) - parseFloat(itemNext.credit);
        //   }
        // } else {
        //   itemPrev += 0;
        // }
        itemPrev += parseFloat(itemNext.masuk) - parseFloat(itemNext.keluar);

        return itemPrev;
      }, 0.0);

      let last_balance =
        parseFloat(
          this.raw_data.first_balance ? this.raw_data.first_balance.saldo : 0.0
        ) + parseFloat(creditAndDebit);

      return last_balance;
    },
  },

  watch: {
    "parameters.params.chart_of_account_id": function (newValue, oldValue) {
      if (!newValue) {
        this.chart_of_account_id = "";
      }
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

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
        "&gudang_id=" +
        this.parameters.params.gudang_id.gudang_id +
        "&item_gudang_id=" +
        this.parameters.params.item_gudang_id.item_gudang_id +
        "&valuation_id=" +
        this.parameters.params.valuation_id.valuation_id +
        "&zona_gudang_id=" +
        this.parameters.params.zona_gudang_id.zona_gudang_id +
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
              parseFloat(item.masuk) -
              parseFloat(item.keluar);

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
        "&gudang_id=" +
        this.parameters.params.gudang_id.gudang_id +
        "&item_gudang_id=" +
        this.parameters.params.item_gudang_id.item_gudang_id +
        "&valuation_id=" +
        this.parameters.params.valuation_id.valuation_id +
        "&zona_gudang_id=" +
        this.parameters.params.zona_gudang_id.zona_gudang_id +
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
          url: "master/gudang/get-gudang",
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

    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.item_gudang_search +
            "&gudang_id=" +
            this.parameters.params.gudang_id +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },

    onGetValuation(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchValuation);

      this.isStopSearchValuation = setTimeout(() => {
        this.valuation_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchValuation();
      }, 600);
    },

    async onSearchValuation() {
      if (!this.isLoadingGetValuation) {
        this.isLoadingGetValuation = true;

        await this.lookUp({
          url: "master/valuation/get-valuation",
          lookup: "custom2",
          query:
            "?search=" +
            this.valuation_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetValuation = false;
      }
    },

    onGetZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchZonaGudang);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.zona_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchZonaGudang();
      }, 600);
    },

    async onSearchZonaGudang() {
      if (!this.isLoadingGetZonaGudang) {
        this.isLoadingGetZonaGudang = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom3",
          query:
            "?search=" +
            this.zona_gudang_search +
            "&gudang_id=" +
            this.parameters.params.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaGudang = false;
      }
    },

    async onSetChartOfAccount(item) {
      this.parameters.params.gudang_id = item ? item : "";
      await this.onSearchItemGudang();
      await this.onSearchZonaGudang();
    },

    onDetail(item) {
      // this.$refs["modal-detail"].parameters.form = {
      //   ...item
      // };

      // window.$("#modal-detail").modal("show");

      this.$refs.modalDetail.parameters.form = {
        ...item,
        kartu_stok_id: item.kartu_stok_id,
      };

      // this.$refs.modalDetail.form = {
      //   stock_card_id: item.kartu_stok_id,
      // };

      // this.$refs.modalDetail.fetchItemDetail();
      this.$refs.modalDetail.fetchStockCardDetail();
      this.$refs.modalDetail.show();
      console.log("the modal should show");
    },

    onRowSelected(index) {
      this.ActiveRow = index;
    },
  },
};
</script>
