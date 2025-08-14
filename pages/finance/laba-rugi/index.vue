<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Finance</a>
      </li>

      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>{{ this.title }}</span>
      </li>
    </ul>

    <div>
      <div
        class="relative p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
      >
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
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="d-flex justify-content-between"
                    v-if="lookup_custom1.data?.length || search"
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
            <tbody v-for="(item, i) in data" :key="i">
              <tr class="bg-gray-50">
                <td class="font-bold uppercase">{{ item.nama_coa }}</td>
                <td></td>
              </tr>
              <tr v-for="(itemChild, ic) in item.childs" :key="ic">
                <td>
                  <span class="pl-3">
                    {{ itemChild.kode_coa }} {{ itemChild.nama_coa }}
                  </span>
                </td>
                <td class="text-right">
                  <span v-if="passiva_non_real_types.includes(item.tipe)">
                    {{ itemChild.profit | formatPrice }}
                  </span>
                  <span v-else>
                    {{ itemChild.cost | formatPrice }}
                  </span>
                </td>
              </tr>
              <tr class="bg-gray-50">
                <td class="font-bold">Total</td>
                <td class="text-right">
                  <span v-if="passiva_non_real_types.includes(item.tipe)">
                    {{ item.profit | formatPrice }}
                  </span>
                  <span v-else>
                    {{ item.cost | formatPrice }}
                  </span>
                </td>
              </tr>
            </tbody>
            <tbody v-if="data.length">
              <tr class="bg-gray-50">
                <td colspan="2" class="font-bold uppercase">PROFIT/LOSE</td>
              </tr>
              <tr>
                <td>
                  <span class="pl-3"> PROFIT/LOSE </span>
                </td>
                <td class="text-right">
                  {{ real_profit_and_lose | formatPrice }}
                </td>
              </tr>
            </tbody>
            <table-data-loading-section :self="this" />

            <table-data-not-found-section :self="this" />
          </table>
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
      title: "Laba Rugi",
    };
  },

  created() {
    this.onLoad();
    this.set_data([]);
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
      data: [],
      title: "Laba Rugi",
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
        url: "finance/laba-rugi",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "laba_rugi_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_date: "",
          gudang_id: "",
        },
        form: {
          kode: "",
          nama: "",
          profit: "",
          cost: "",
          total: "",
          // checkboxs: [],
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      passiva_non_real_types: ["PENDAPATAN"],

      real_profit_and_lose: 0,
    };
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result", "lookup_custom1"]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "laba-rugi"
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

      let url =
        this.parameters.url +
        "?" +
        "&start_date=" +
        this.parameters.params.start_date +
        "&end_date=" +
        this.parameters.params.end_date +
        "&gudang_id=" +
        this.parameters.params.gudang_id;

      this.$axios
        .get(url)
        .then((res) => {
          this.data = res.data;

          let profit = 0;
          let cost = 0;

          res.data.forEach((itemParent) => {
            itemParent.childs.forEach((itemChild) => {
              if (this.passiva_non_real_types.includes(itemParent.tipe)) {
                cost += parseFloat(itemChild.cost || 0.0);
              } else {
                profit += parseFloat(itemChild.profit || 0.0);
              }
            });
          });

          this.real_profit_and_lose = parseFloat(profit) - parseFloat(cost);
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          loader.hide();
          this.isLoadingData = false;
        });
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
        console.log(this.lookup_custom1.data);
      }
    },

    onSelectGudang(item) {
      this.parameters.params.gudang_id = item ? item : "";
    },
  },
};
</script>
