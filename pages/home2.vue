<template>
  <!-- DASHBOARD -->
  <div>
    <div class="">
      <div
        class="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4"
      >
        <!-- total produk -->
        <!-- <div class="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
          <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">
            Total Produk
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {{ data.total_product }}
            </div>
            <div class="badge bg-white/30">+ 2.35%</div>
          </div>
          <div class="mt-5 flex items-center font-semibold">
            <icon-eye class="shrink-0 ltr:mr-2 rtl:ml-2" />
            Last Week 44,700
          </div>
        </div> -->

        <!-- total pelanggan -->
        <!-- <div class="panel bg-gradient-to-r from-violet-500 to-violet-400">
          <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">
            Total Pelanggan
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {{ data.total_customer }}
            </div>
            <div class="badge bg-white/30">+ 2.35%</div>
          </div>
          <div class="mt-5 flex items-center font-semibold">
            <icon-eye class="shrink-0 ltr:mr-2 rtl:ml-2" />
            Last Week 44,700
          </div>
        </div> -->

        <!-- pembelian bulan ini -->
        <!-- <div class="panel bg-gradient-to-r from-blue-500 to-blue-400">
          <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">
            Pembelian Bulan Ini
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {{ data.purchaseing_monthly | formatPrice }}
            </div>
            <div class="badge bg-white/30">+ 2.35%</div>
          </div>
          <div class="mt-5 flex items-center font-semibold">
            <icon-eye class="shrink-0 ltr:mr-2 rtl:ml-2" />
            Last Week 44,700
          </div>
        </div> -->

        <!-- omset bulan ini -->
        <!-- <div class="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
          <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">
            Omset Bulan Ini
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {{ data.turnover_monthly | formatPrice }}
            </div>
            <div class="badge bg-white/30">+ 2.35%</div>
          </div>
          <div class="mt-5 flex items-center font-semibold">
            <icon-eye class="shrink-0 ltr:mr-2 rtl:ml-2" />
            Last Week 44,700
          </div>
        </div>
      </div> -->

        <!-- <div
        class="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-6"
      > -->
        <!-- total transaksi penjualan -->
        <!-- <div class="panel bg-gradient-to-r from-blue-500 to-blue-400">
          <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">
            Total Transaksi Penjualan
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {{ data.total_transaction_selling }}
            </div>
          </div>
        </div> -->
        <!-- total transaksi penjualan Cash-->
        <!-- <div class="panel bg-gradient-to-r from-green-500 to-green-400">
          <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">
            Total Transaksi Penjualan Cash
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {{ data.total_transaction_selling_cash }}
            </div>
          </div>
        </div> -->
        <!-- total transaksi penjualan Cash-->
        <!-- <div class="panel bg-gradient-to-r from-red-500 to-red-400">
          <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">
            Total Transaksi Penjualan Credit
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {{ data.total_transaction_selling_credit }}
            </div>
          </div>
        </div> -->

        <!-- total transaksi penjualan -->
        <!-- <div class="panel bg-gradient-to-r from-blue-500 to-blue-400">
          <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">
            Total Transaksi Pembelian
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {{ data.total_transaction_purchaseing }}
            </div>
          </div>
        </div> -->
        <!-- total transaksi penjualan Cash-->
        <!-- <div class="panel bg-gradient-to-r from-green-500 to-green-400">
          <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">
            Total Transaksi Pembelian Cash
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {{ data.total_transaction_purchaseing_cash }}
            </div>
          </div>
        </div> -->
        <!-- total transaksi penjualan Cash-->
        <!-- <div class="panel bg-gradient-to-r from-red-500 to-red-400">
          <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">
            Total Transaksi Pembelian Credit
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {{ data.total_transaction_purchaseing_credit }}
            </div>
          </div>
        </div> -->
      </div>
    </div>

    <!-- <div class="pt-5">
      <div class="mb-6 grid gap-6 xl:grid-cols-4">
        <div class="panel h-full xl:col-span-2">
          <h5 class="text-lg font-semibold mb-5">Top 10 Produk Terlaris</h5>
          <div class="table-responsive">
            <div
              v-if="isLoadingPage"
              class="d-flex align-items-center justify-content-center"
              style="height: 200px"
            >
              <div>
                <i class="fas fa-circle-notch fa-spin fa-2x"></i> Loading
              </div>
            </div>

            <div v-show="!isLoadingPage">
              <table>
                <thead>
                  <tr class="border-b-0">
                    <th class="ltr:rounded-l-md rtl:rounded-r-md">Product</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Sold</th>
                    <th class="ltr:rounded-r-md rtl:rounded-l-md">Source</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="panel h-full xl:col-span-2">
          <h5 class="text-lg font-semibold mb-5">
            Transaksi Pembelian Hari ini
          </h5>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <td><b>Kode</b></td>
                  <td><b>Supplier</b></td>
                  <td><b>Sudah Bayar/Lunas</b></td>
                  <td><b>Grand Total</b></td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in data.purchaseing_today.data"
                  :key="index"
                >
                  <td>{{ item.code }}</td>
                  <td>
                    Supplier :
                    {{ item.supplier ? item.supplier.name : "-" }} <br />
                    Pengguna : {{ item.user ? item.user.username : "-" }}
                  </td>
                  <td>
                    <span class="badge badge-success" v-if="item.is_paid">
                      Sudah
                    </span>
                    <span class="badge badge-danger" v-else> Belum </span>
                  </td>
                  <td>
                    {{ item.grand_total | formatPrice }}
                  </td>
                </tr>

                <tr
                  v-if="
                    data.purchaseing_today.current_page <
                    data.purchaseing_today.last_page
                  "
                >
                  <td colspan="4" class="text-center">
                    <div v-if="!isLoadingPurchaseingToday">
                      <button
                        class="btn btn-link"
                        @click="loadMorePurchaseingToday"
                      >
                        Tampilkan lebih banyak
                      </button>
                    </div>
                    <div v-else>
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </div>
                  </td>
                </tr>

                <tr v-if="!data.purchaseing_today.data.length">
                  <td colspan="4" class="text-center">Data tidak ditemukan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="mb-6 grid gap-6 xl:grid-cols-4">
        <div class="panel h-full xl:col-span-2">
          <h5 class="text-lg font-semibold mb-5">
            Produk Masuk/Keluar Hari Ini
          </h5>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <td><b>Produk</b></td>
                  <td class="text-success">Masuk</td>
                  <td class="text-danger">Keluar</td>
                  <td><b>Deskripsi</b></td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in data.in_out_product_today.data"
                  :key="index"
                >
                  <td>
                    Produk : {{ item.product ? item.product.name : "-" }}
                    <br />
                    Gudang :
                    {{ item.warehouse ? item.warehouse.name : "-" }}
                  </td>
                  <td class="text-success">
                    {{ item.in }}
                  </td>
                  <td class="text-danger">
                    {{ item.out }}
                  </td>
                  <td>
                    <b>{{ item.description }}</b>
                  </td>
                </tr>

                <tr
                  v-if="
                    data.in_out_product_today.current_page <
                    data.in_out_product_today.last_page
                  "
                >
                  <td colspan="4" class="text-center">
                    <div v-if="!isLoadingInOutProductToday">
                      <button
                        class="btn btn-link"
                        @click="loadMoreInOutProductToday"
                      >
                        Tampilkan lebih banyak
                      </button>
                    </div>
                    <div v-else>
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </div>
                  </td>
                </tr>

                <tr v-if="!data.in_out_product_today.data.length">
                  <td colspan="4" class="text-center">Data tidak ditemukan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="panel h-full xl:col-span-2">
          <h5 class="text-lg font-semibold mb-5">
            Transaksi Penjualan Hari ini
          </h5>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <td><b>Kode</b></td>
                  <td><b>Pelanggan</b></td>
                  <td><b>Sudah Bayar/Lunas</b></td>
                  <td><b>Grand Total</b></td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in data.selling_today.data"
                  :key="index"
                >
                  <td>{{ item.code }}</td>
                  <td>
                    Pelanggan :
                    {{ item.customer ? item.customer.name : "" }} <br />
                    Gudang :
                    {{ item.warehouse ? item.warehouse.name : "-" }} <br />
                    Pengguna : {{ item.user ? item.user.username : "-" }}
                  </td>
                  <td>
                    <span class="badge badge-success" v-if="item.is_paid">
                      Sudah
                    </span>
                    <span class="badge badge-danger" v-else> Belum </span>
                  </td>
                  <td>
                    {{ item.grand_total | formatPrice }}
                  </td>
                </tr>

                <tr
                  v-if="
                    data.selling_today.current_page <
                    data.selling_today.last_page
                  "
                >
                  <td colspan="4" class="text-center">
                    <div v-if="!isLoadingSellingToday">
                      <button
                        class="btn btn-link"
                        @click="loadMoreSellingToday"
                      >
                        Tampilkan lebih banyak
                      </button>
                    </div>
                    <div v-else>
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </div>
                  </td>
                </tr>

                <tr v-if="!data.selling_today.data.length">
                  <td colspan="4" class="text-center">Data tidak ditemukan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> -->
  </div>
  <!-- END DASHBOARD -->
</template>

<script>
import Chart from "chart.js";

export default {
  head() {
    return {
      title: "Dashboard",
    };
  },

  data() {
    return {
      isLoadingPage: true,

      isLoadingInOutProductToday: false,
      isLoadingPurchaseingToday: false,
      isLoadingSellingToday: false,

      data: {
        total_product: 0,
        total_customer: 0,

        purchaseing_monthly: 0,
        turnover_monthly: 0,

        total_transaction_selling: 0,
        total_transaction_selling_cash: 0,
        total_transaction_selling_credit: 0,

        total_transaction_purchaseing: 0,
        total_transaction_purchaseing_cash: 0,
        total_transaction_purchaseing_credit: 0,

        chart_top_selling_product: [],

        in_out_product_today: {
          data: [],
        },

        purchaseing_today: {
          data: [],
        },

        selling_today: {
          data: [],
        },
      },
    };
  },

  created() {
    // this.$axios
    //   .get("/dashboard")
    //   .then((res) => {
    //     this.isLoadingPage = false;
    //     this.data = res.data;
    //     this.onDrawChart();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.$globalErrorToaster(this.$toaster, err);
    //   });
  },

  methods: {
    onDrawChart() {
      var ctx = document.getElementById("myChart").getContext("2d");

      let lables = [
        ...this.data.chart_top_selling_product.map((item) => item.name),
      ];

      let datas = [
        ...this.data.chart_top_selling_product.map((item) =>
          parseFloat(item.total_quantity_selling)
        ),
      ];

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: lables,
          datasets: [
            {
              data: datas,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
            },
          ],
        },
        options: {
          legend: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                },
              },
            ],
          },
        },
      });
    },

    loadMoreInOutProductToday() {
      if (this.isLoadingInOutProductToday) return;

      this.isLoadingInOutProductToday = true;

      this.$axios
        .get("/dashboard/in-out-product-today", {
          params: {
            page: this.data.in_out_product_today.current_page + 1,
          },
        })
        .then((res) => {
          this.data.in_out_product_today.data = [
            ...this.data.in_out_product_today.data,
            ...res.data.data,
          ];

          this.data.in_out_product_today.current_page += 1;
        })
        .catch((err) => {
          console.log(err);
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingInOutProductToday = false;
        });
    },

    loadMoreSellingToday() {
      if (this.isLoadingSellingToday) return;

      this.isLoadingSellingToday = true;

      this.$axios
        .get("/dashboard/selling-today", {
          params: {
            page: this.data.selling_today.current_page + 1,
          },
        })
        .then((res) => {
          this.data.selling_today.data = [
            ...this.data.selling_today.data,
            ...res.data.data,
          ];

          this.data.selling_today.current_page += 1;
        })
        .catch((err) => {
          console.log(err);
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingSellingToday = false;
        });
    },

    loadMorePurchaseingToday() {
      if (this.isLoadingPurchaseingToday) return;

      this.isLoadingPurchaseingToday = true;

      this.$axios
        .get("/dashboard/purchaseing-today", {
          params: {
            page: this.data.purchaseing_today.current_page + 1,
          },
        })
        .then((res) => {
          this.data.purchaseing_today.data = [
            ...this.data.purchaseing_today.data,
            ...res.data.data,
          ];

          this.data.purchaseing_today.current_page += 1;
        })
        .catch((err) => {
          console.log(err);
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingPurchaseingToday = false;
        });
    },
  },
};
</script>
