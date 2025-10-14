<template>
  <section class="section">
    <div class="section-body">
      <div class="row">
        <div class="col-12">
          <div class="card p-5">
            <div class="row">
              <h5 class="modal-title mb-5">Dokumen Workflow</h5>

              <div class="col-12">
                <div class="row">
                  <div
                    class="col-3 p-2"
                    style="cursor: pointer"
                    v-for="item in report_tabs"
                    :class="
                      selected_report == item.condition
                        ? 'bg-success text-white'
                        : ''
                    "
                    @click="
                      selectedReport(item.condition, item.url, item.value)
                    "
                  >
                    <div class="row">
                      <div class="col-md-2 text-center">
                        <i :class="'fa fa-' + item.icon + ' fa-3x'"></i>
                      </div>
                      <div class="col-md-9">
                        <h6>{{ item.title }}</h6>
                        <!-- <p>
                         {{item.sub_title}}
                        </p> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 mt-3 p-4" v-if="selected_report">
                <div class="table-responsive">
                  <table
                    class="table table-striped table-sm vld-parent table-hover"
                    ref="formContainer"
                    v-if="selected_tab == '0' || selected_tab == '1'"
                  >
                    <thead>
                      <tr>
                        <th style="width: 10%">P/R. No</th>
                        <th style="width: 10%">Date</th>
                        <th style="width: 10%">Code</th>
                        <th style="width: 20%">Nama Peminta</th>
                        <th style="width: 20%">Department</th>
                        <th style="width: 20%">Notes</th>
                        <th
                          class="text-center"
                          style="width: 5%"
                          v-if="selected_tab == '0'"
                        >
                          Bypass
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                    <tr
                      v-for="(item, index) in form.permintaan_pembelian"
                      :key="index"
                    >
                      <td class="table-transaction-row">
                        {{ item.code ?? "-" }}
                      </td>
                      <td class="table-transaction-row">
                        {{ item.tanggal_dibutuhkan ?? "-" }}
                      </td>

                      <td class="table-transaction-row">
                        {{
                          item.permintaan_user ? item.permintaan_user.code : "-"
                        }}
                      </td>

                      <td class="table-transaction-row">
                        {{
                          item.permintaan_user
                            ? item.permintaan_user.fullname
                            : "-"
                        }}
                      </td>

                      <td class="table-transaction-row">
                        {{ item.department ? item.department.name : "-" }}
                      </td>

                      <td
                        class="table-transaction-row"
                        v-if="selected_tab == '0'"
                      >
                        {{ item.keterangan ?? "-" }}
                      </td>

                      <td
                        class="table-transaction-row"
                        v-if="selected_tab == '1'"
                      >
                        {{ item.notes ?? "-" }}
                      </td>

                      <td
                        class="table-transaction-row text-center"
                        v-if="selected_tab == '0'"
                      >
                        <button class="btn btn-sm" @click="onBypass(item.id)">
                          <i class="fas fa-check-circle fa-lg text-success"></i>
                        </button>
                      </td>
                    </tr>
                    <tr v-if="!form.permintaan_pembelian.length">
                      <td colspan="13" class="text-center pt-4 pb-4">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  </table>

                  <table
                    class="table table-striped table-sm vld-parent table-hover"
                    ref="formContainer"
                    v-if="selected_tab == '2'"
                  >
                    <thead>
                      <tr>
                        <th style="width: 10%">P/O. No</th>
                        <th style="width: 10%">Date</th>
                        <th style="width: 10%">Code</th>
                        <th style="width: 20%">Supplier Name</th>
                        <th style="width: 20%">Notes</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                    <tr v-for="(item, index) in form.pembelian" :key="index">
                      <td class="table-transaction-row">
                        {{ item.code ?? "-" }}
                      </td>
                      <td class="table-transaction-row">
                        {{ item.date ?? "-" }}
                      </td>
                      <td class="table-transaction-row">
                        {{ item.supplier ? item.supplier.code : "-" }}
                      </td>
                      <td class="table-transaction-row">
                        {{ item.supplier ? item.supplier.name : "-" }}
                      </td>
                      <td class="table-transaction-row">
                        {{ item.description ?? "-" }}
                      </td>
                    </tr>
                    <tr v-if="!form.pembelian.length">
                      <td colspan="13" class="text-center pt-4 pb-4">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  </table>
                </div>

                <div
                  class="card-title border-top"
                  style="padding-bottom: -100px !important"
                >
                  <pagination-component :self="this" ref="pagination" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Laporan Penjualaan",
    };
  },

  async mounted() {
    await this.onSearchCustomer();
    await this.onSearchUser();
    await this.onSearchProduct();
    await this.onSearchProductGroup();
  },

  computed: {
    ...mapState("moduleApi", [
      "lookup_customers",
      "lookup_custom2",
      "lookup_custom1",
      "lookup_users",
      "lookup_products",
      "lookup_product_groups",
    ]),
  },

  data() {
    return {
      isLoadingData: false,
      isPaginate: true,
      ActiveRow: null,

      form: {
        product_id: "",
        production_id: "",
        code: "",
        keterangan: "",
        tanggal: moment().format("YYYY-MM-DD"),
        tanggal_dibutuhkan: "",
        kategori: "",
        tanggal_awal: moment().startOf("month").format("YYYY-MM-DD"),
        tanggal_akhir: moment().endOf("month").format("YYYY-MM-DD"),
        order: "id",
        sort: "desc",
        quantity: 0.0,
        department_id: "",
        permintaan_user_id: "",
        jenis: "GOODS",
        date: moment().format("YYYY-MM-DD"),
        permintaan_pembelian: [],
        pembelian: [],
      },

      default_form: {
        product_id: "",
        production_id: "",
        department_id: "",
        permintaan_user_id: "",
        tanggal_awal: moment().format("YYYY-MM-DD"),
        tanggal_akhir: moment().format("YYYY-MM-DD"),
        order: "id",
        sort: "desc",
        tanggal: "",
        tanggal_dibutuhkan: "",
        kategori: "",
        code: "",
        keterangan: "",
        quantity: 0.0,
        jenis: "GOODS",
        date: moment().format("YYYY-MM-DD"),
        permintaan_pembelian: [],
        pembelian: [],
      },

      report_tabs: [
        {
          icon: "list",
          title: "Pre Permintaan Pembelian",
          sub_title: "  Menampilkan laporan penjualaan",
          condition: "selling",
          value: 0,
          url: process.env.API_URL + "/report/selling/get-preview",
        },
        {
          icon: "chart-bar",
          title: "Permintaan Pembelian",
          sub_title: "  Menampilkan laporan profit penjualaan",
          condition: "selling_profit",
          value: 1,
          url: process.env.API_URL + "/report/selling/get-preview-profit",
        },
        {
          icon: "dollar-sign",
          title: "Purchase Order",
          sub_title: "Menampilkan Laporan Penjualaan Produk Dan Pelanggan",
          condition: "selling_product_and_customer",
          value: 2,
          url:
            process.env.API_URL +
            "/report/selling/get-preview-customer-and-product",
        },
        {
          icon: "warehouse",
          title: "LPB (Gudang Akhir)",
          sub_title: "Menampilkan Laporan Penjualaan Produk Terjual",
          condition: "selling_sale",
          value: 3,
          url: process.env.API_URL + "/report/selling/get-preview-sale",
        },
      ],

      isStopSearchCustomer: false,
      isLoadingGetCustomer: false,
      customer_search: "",

      isStopSearchUser: false,
      isLoadingGetUser: false,
      user_search: "",

      isStopSearchProduct: false,
      isLoadingGetProduct: false,
      product_search: "",

      isStopSearchProductGroup: false,
      isLoadingGetProductGroup: false,
      product_group_search: "",

      selected_report: null,
      selected_tab: null,

      filters: {
        url: "",

        customer_id: "",
        user_id: "",
        product_id: "",
        product_spesification_id: "",

        customer: "",
        user: "",
        product: "",
        product_group: "",

        transaction_type: "",
        discount_type: "",
        is_paid: "",
        start_date: "",
        end_date: "",
        is_show_detail_transaction: "0",
      },

      filters_default: {
        url: "",
        customer_id: "",
        user_id: "",
        product_id: "",
        product_spesification_id: "",

        customer: "",
        user: "",
        product: "",
        product_group: "",

        transaction_type: "",
        discount_type: "",
        is_paid: "",
        start_date: "",
        end_date: "",
        is_show_detail_transaction: "0",
      },
    };
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    async onBypass(value) {
      await this.lookUp({
        url: "purchaseing_module/permintaan_pembelian/bypass-permintaan-pembelian",
        lookup: "custom1",
        query: "?id=" + value,
      });

      this.onChangeType(this.selected_tab);
    },

    selectedReport(selected_report, url, value) {
      this.filters = {
        ...this.filters_default,
        url,
      };

      if (value == 2) {
        this.onChangeType2(value);
      } else {
        this.onChangeType(value);
      }
      this.selected_tab = value;
      this.selected_report = selected_report;
    },

    async onChangeType2() {
      await this.lookUp({
        url: "purchaseing_module/purchaseing/get-po-supplier",
        lookup: "custom2",
        query: "?all=''",
      });

      this.form.pembelian = this.lookup_custom2.map((item) => {
        return {
          ...item,
        };
      });
    },

    async onChangeType(value) {
      await this.lookUp({
        url: "purchaseing_module/permintaan_pembelian/get-permintaan-pembelian",
        lookup: "custom2",
        query: "?all=''&bypass=" + value,
      });

      this.form.permintaan_pembelian = this.lookup_custom2.map((item) => {
        return {
          ...item,
          // supplier_id: item.supplier,
          // grade_id: item.grade,
          // keterangan: item.product,
        };
      });
      // this.form.permintaan_pembelian_details = this.lookup_custom2.data;
    },

    onDownload(type) {
      var token = this.$cookiz.get("auth._token.local").replace("Bearer ", "");

      let qs = "";

      Object.keys(this.filters).forEach((item) => {
        qs += "&" + item + "=" + this.filters[item];
      });

      window.open(
        this.filters.url + "/export/" + type + "?token=" + token + qs,
        "_blank"
      );
    },

    onPreview() {
      var token = this.$cookiz.get("auth._token.local").replace("Bearer ", "");

      let qs = "";

      Object.keys(this.filters).forEach((item) => {
        qs += "&" + item + "=" + this.filters[item];
      });

      window.open(this.filters.url + "?token=" + token + qs, "_blank");
    },

    onGetCustomer(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCustomer);

      this.isStopSearchCustomer = setTimeout(() => {
        this.customer_search = search;

        if (typeof isNext !== "function") {
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }

        this.onSearchCustomer();
      }, 600);
    },

    async onSearchCustomer() {
      if (!this.isLoadingGetCustomer) {
        this.isLoadingGetCustomer = true;

        await this.lookUp({
          url: "report/selling/get-customer",
          lookup: "customers",
          query:
            "?search=" +
            this.customer_search +
            "&page=" +
            this.lookup_customers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCustomer = false;
      }
    },

    onSetCustomer(item) {
      if (item) {
        this.filters.customer_id = item.id;
      } else {
        this.filters.customer_id = "";
      }
    },

    onGetUser(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchUser);

      this.isStopSearchUser = setTimeout(() => {
        this.user_search = search;

        if (typeof isNext !== "function") {
          this.lookup_users.current_page = isNext
            ? this.lookup_users.current_page + 1
            : this.lookup_users.current_page - 1;
        } else {
          this.lookup_users.current_page = 1;
        }

        this.onSearchUser();
      }, 600);
    },

    async onSearchUser() {
      if (!this.isLoadingGetUser) {
        this.isLoadingGetUser = true;

        await this.lookUp({
          url: "report/selling/get-user",
          lookup: "users",
          query:
            "?search=" +
            this.user_search +
            "&page=" +
            this.lookup_users.current_page +
            "&per_page=10",
        });

        this.isLoadingGetUser = false;
      }
    },

    onSetUser(item) {
      if (item) {
        this.filters.user_id = item.id;
      } else {
        this.filters.user_id = "";
      }
    },

    onGetProduct(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProduct);

      this.isStopSearchProduct = setTimeout(() => {
        this.product_search = search;

        if (typeof isNext !== "function") {
          this.lookup_products.current_page = isNext
            ? this.lookup_products.current_page + 1
            : this.lookup_products.current_page - 1;
        } else {
          this.lookup_products.current_page = 1;
        }

        this.onSearchProduct();
      }, 600);
    },

    async onSearchProduct() {
      if (!this.isLoadingGetProduct) {
        this.isLoadingGetProduct = true;

        await this.lookUp({
          url: "report/selling/get-product",
          lookup: "products",
          query:
            "?search=" +
            this.product_search +
            "&page=" +
            this.lookup_products.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProduct = false;
      }
    },

    onSetProduct(item) {
      if (item) {
        this.filters.product_id = item.id;
      } else {
        this.filters.product_id = "";
      }
    },

    onGetProductGroup(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProductGroup);

      this.isStopSearchProductGroup = setTimeout(() => {
        this.product_group_search = search;

        if (typeof isNext !== "function") {
          this.lookup_product_groups.current_page = isNext
            ? this.lookup_product_groups.current_page + 1
            : this.lookup_product_groups.current_page - 1;
        } else {
          this.lookup_product_groups.current_page = 1;
        }

        this.onSearchProductGroup();
      }, 600);
    },

    async onSearchProductGroup() {
      if (!this.isLoadingGetProductGroup) {
        this.isLoadingGetProductGroup = true;

        await this.lookUp({
          url: "report/selling/get-product-group",
          lookup: "product_groups",
          query:
            "?search=" +
            this.product_group_search +
            "&page=" +
            this.lookup_product_groups.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProductGroup = false;
      }
    },

    onSetProductGroup(item) {
      if (item) {
        this.filters.product_group_id = item.id;
      } else {
        this.filters.product_group_id = "";
      }
    },
  },
};
</script>
