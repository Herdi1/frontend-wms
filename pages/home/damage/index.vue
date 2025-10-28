<template>
  <div ref="formContainer">
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">Home</a>
      </li>

      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>{{ this.title }}</span>
      </li>
    </ul>
    <div class="flex gap-2">
      <div class="w-3/4">
        <div class="bg-white p-2 rounded-lg flex gap-2 mb-2">
          <div class="form-group w-full">
            <div class="mb-1"><b>Group Item</b></div>

            <v-select
              class="rounded-sm bg-white text-gray-500 border-gray-300"
              label="nama_group_item"
              :loading="isLoadingGetGroupItem"
              :options="lookup_custom3.data"
              :filterable="false"
              @search="onGetGroupItem"
              v-model="parameters.params.group_item_id_3"
              @input="onSelectGroupItem"
            >
              <template slot="selected-option" slot-scope="option">
                <div
                  class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  {{ option.nama_group_item }}
                </div>
              </template>
              <template slot="option" slot-scope="option">
                <div
                  class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  {{ option.nama_group_item }}
                </div>
              </template>
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_custom3.data.length || search"
              >
                <span
                  v-if="lookup_custom3.current_page > 1"
                  @click="onGetGroupItem(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  style="cursor: pointer"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_custom3.last_page > lookup_custom3.current_page"
                  @click="onGetGroupItem(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  style="cursor: pointer"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>
          <div class="form-group w-full">
            <div class="mb-1"><b>Region</b></div>

            <v-select
              class="rounded-sm bg-white text-gray-500 border-gray-300"
              label="nama_wilayah"
              :loading="isLoadingGetWilayah"
              :options="lookup_custom2.data"
              :filterable="false"
              @search="onGetWilayah"
              v-model="parameters.params.wilayah_id"
              @input="onSelectWilayah"
            >
              <template slot="selected-option" slot-scope="option">
                <div
                  class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  {{ option.nama_wilayah }}
                </div>
              </template>
              <template slot="option" slot-scope="option">
                <div
                  class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  {{ option.nama_wilayah }}
                </div>
              </template>
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_custom2.data.length || search"
              >
                <span
                  v-if="lookup_custom2.current_page > 1"
                  @click="onGetWilayah(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  style="cursor: pointer"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_custom2.last_page > lookup_custom2.current_page"
                  @click="onGetWilayah(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  style="cursor: pointer"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>
          <div class="form-group w-full">
            <div class="mb-1"><b>Gudang</b></div>

            <v-select
              class="rounded-sm bg-white text-gray-500 border-gray-300"
              label="nama_gudang"
              :loading="isLoadingGetGudang"
              :options="lookup_custom1.data"
              :filterable="false"
              @search="onGetGudang"
              v-model="parameters.params.gudang_id"
              @input="onSelectGudang"
            >
              <template slot="selected-option" slot-scope="option">
                <div
                  class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  {{ option.nama_gudang }}
                </div>
              </template>
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_custom1.data.length || search"
              >
                <span
                  v-if="lookup_custom1.current_page > 1"
                  @click="onGetGudang(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  style="cursor: pointer"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_custom1.last_page > lookup_custom1.current_page"
                  @click="onGetGudang(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  style="cursor: pointer"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>
        </div>
        <div class="bg-white p-2 rounded-lg">
          <apexchart
            v-if="
              chartData.damage_stok_all &&
              chartData.damage_stok_all.series &&
              chartData.damage_stok_all.chartOptions
            "
            type="line"
            height="350"
            :options="chartData.damage_stok_all.chartOptions"
            :series="chartData.damage_stok_all.series"
          ></apexchart>
        </div>
        <div class="flex gap-3">
          <div class="w-1/2 bg-white p-2 rounded-lg mt-3">
            <apexchart
              v-if="
                chartData.damage_by_gudang &&
                chartData.damage_by_gudang.series &&
                chartData.damage_by_gudang.chartOptions
              "
              type="bar"
              height="250"
              :options="chartData.damage_by_gudang.chartOptions"
              :series="chartData.damage_by_gudang.series"
            ></apexchart>
          </div>
          <div class="w-1/2 bg-white p-2 rounded-lg mt-3">
            <apexchart
              v-if="
                chartData.damage_by_group_3 &&
                chartData.damage_by_group_3.series &&
                chartData.damage_by_group_3.chartOptions
              "
              type="bar"
              height="250"
              :options="chartData.damage_by_group_3.chartOptions"
              :series="chartData.damage_by_group_3.series"
            ></apexchart>
          </div>
        </div>
      </div>
      <div class="w-1/4">
        <div class="w-full bg-white p-2 rounded-lg">
          <apexchart
            v-if="
              chartData.damage_by_valuation &&
              chartData.damage_by_valuation.series &&
              chartData.damage_by_valuation.chartOptions
            "
            type="donut"
            height="350"
            :options="chartData.damage_by_valuation.chartOptions"
            :series="chartData.damage_by_valuation.series"
          ></apexchart>
        </div>
        <div class="w-full bg-white p-2 rounded-lg mt-2">
          <apexchart
            v-if="
              chartData.damage_by_group_1 &&
              chartData.damage_by_group_1.series &&
              chartData.damage_by_group_1.chartOptions
            "
            type="donut"
            height="350"
            :options="chartData.damage_by_group_1.chartOptions"
            :series="chartData.damage_by_group_1.series"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Dashboard Damage Stok",
    };
  },

  async created() {
    await this.onLoad();
    this.set_data([]);
  },

  async mounted() {
    await this.onSearchWilayah();
    await this.onSearchGudang();
    await this.onSearchGroupItem();
  },

  data() {
    return {
      title: "Dashboard Damage Stok",
      isLoadingData: true,
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
        url: "home/dashboard/damage",
        type: "pdf",
        params: {
          start_date: "",
          end_date: "",
          gudang_id: "",
          wilayah_id: "",
          group_item_id_3: "",
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
      chartData: {
        damage_stok_all: {},
        damage_by_valuation: {},
        damage_by_group_1: {},
        damage_by_group_3: {},
        damage_by_gudang: {},
        damage_by_wilayah: {},
      },

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchWilayah: false,
      isLoadingGetWilayah: false,
      wilayah_search: "",

      isStopSearchGroupItem: false,
      isLoadingGetGroupItem: false,
      group_item_search: "",
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
    ]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "damage"
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

    async onLoad() {
      try {
        this.isLoadingData = true;

        let loader = this.$loading.show({
          container: this.$refs.formContainer,
          canCancel: true,
          onCancel: this.onCancel,
        });

        if (
          !this.parameters.params.end_date &&
          !this.parameters.params.start_date
        ) {
          const today = new Date();
          const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

          this.parameters.params.end_date = today
            .toISOString()
            .substring(0, 10);
          this.parameters.params.start_date = sevenDaysAgo
            .toISOString()
            .substring(0, 10);
        }

        let url =
          this.parameters.url +
          "?start_date=" +
          this.parameters.params.start_date +
          "&end_date=" +
          this.parameters.params.end_date +
          "&gudang_id=" +
          (typeof this.parameters.params.gudang_id === "object"
            ? this.parameters.params.gudang_id.gudang_id
            : "") +
          "&wilayah_id=" +
          (typeof this.parameters.params.wilayah_id === "object"
            ? this.parameters.params.wilayah_id.wilayah_id
            : "") +
          "&group_item_id_3=" +
          (typeof this.parameters.params.group_item_id_3 === "object"
            ? this.parameters.params.group_item_id_3.group_item_id
            : "");

        await this.$axios
          .get(url)
          .then((res) => {
            this.chartData.damage_by_valuation = {
              series: res.data.damage_by_valuation.map(
                (item) => item.persentase
              ),
              chartOptions: {
                chart: {
                  width: 380,
                  type: "donut",
                },
                labels: res.data.damage_by_valuation.map(
                  (item) => item.nama_valuation
                ),
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              },
            };
            this.chartData.damage_by_group_1 = {
              series: res.data.damage_by_group_1.map((item) => item.persentase),
              chartOptions: {
                chart: {
                  width: 380,
                  type: "donut",
                },
                labels: res.data.damage_by_group_1.map(
                  (item) => item.nama_group_item
                ),
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              },
            };
            this.chartData.damage_stok_all = {
              series: [
                {
                  name: "Damage Stok",
                  data: res.data.damage_stok_all.map(
                    (item) => item.total_quantity
                  ),
                },
              ],
              chartOptions: {
                chart: {
                  height: 350,
                  type: "line",
                  zoom: {
                    enabled: false,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "smooth",
                },
                title: {
                  text: "Damage Stok",
                  align: "left",
                },
                grid: {
                  row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                  },
                },
                xaxis: {
                  categories: res.data.damage_stok_all.map((item) =>
                    this.getDayInDate(item.tanggal)
                  ),
                },
              },
            };
            if (res.data.damage_by_gudang) {
              this.chartData.damage_by_gudang = {
                series: [
                  {
                    data: res.data.damage_by_gudang.map(
                      (item) => item.total_quantity
                    ),
                  },
                ],
                chartOptions: {
                  chart: {
                    type: "bar",
                    height: 250,
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 4,
                      borderRadiusApplication: "end",
                      horizontal: true,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  title: {
                    text: "Gudang",
                    align: "left",
                  },
                  xaxis: {
                    categories: res.data.damage_by_gudang.map(
                      (item) => item.nama_gudang
                    ),
                  },
                },
              };
            }
            if (res.data.damage_by_group_3) {
              this.chartData.damage_by_group_3 = {
                series: [
                  {
                    data: res.data.damage_by_group_3.map(
                      (item) => item.total_quantity
                    ),
                  },
                ],
                chartOptions: {
                  chart: {
                    type: "bar",
                    height: 250,
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 4,
                      borderRadiusApplication: "end",
                      horizontal: true,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  title: {
                    text: "Group Item",
                    align: "left",
                  },
                  xaxis: {
                    categories: res.data.damage_by_group_3.map(
                      (item) => item.nama_group_item
                    ),
                  },
                },
              };
            }
            console.log(this.chartData);
          })
          .catch((err) => {
            this.$globalErrorToaster(this.$toaster, err);
          })
          .finally(() => {
            loader.hide();
            this.isLoadingData = false;
          });
      } catch (error) {
        this.$globalErrorToaster(this.$toaster, error);
      }
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
      }
    },

    async onSelectGudang(item) {
      this.parameters.params.gudang_id = item ? item : "";
      await this.onLoad();
    },

    onGetWilayah(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchWilayah);

      this.isStopSearchWilayah = setTimeout(() => {
        this.wilayah_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchWilayah();
      }, 600);
    },

    async onSearchWilayah() {
      if (!this.isLoadingGetWilayah) {
        this.isLoadingGetWilayah = true;

        await this.lookUp({
          url: "master/wilayah/get-wilayah",
          lookup: "custom2",
          query:
            "?search=" +
            this.wilayah_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetWilayah = false;
      }
    },

    async onSelectWilayah(item) {
      this.parameters.params.wilayah_id = item ? item : "";
      await this.onLoad();
    },

    onGetGroupItem(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem);

      this.isStopSearchGroupItem = setTimeout(() => {
        this.group_item_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchGroupItem();
      }, 600);
    },

    async onSearchGroupItem() {
      if (!this.isLoadingGetGroupItem) {
        this.isLoadingGetGroupItem = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom3",
          query:
            "?search=" +
            this.group_item_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem = false;
      }
    },

    async onSelectGroupItem(item) {
      this.parameters.params.group_item_id_3 = item ? item : "";
      await this.onLoad();
    },

    getDayInDate(date) {
      const day = new Date(date);
      return day.getDate().toString().padStart(2, "0");
    },
  },
};
</script>
