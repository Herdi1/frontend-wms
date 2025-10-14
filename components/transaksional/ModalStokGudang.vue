<template>
  <portal v-if="visible" to="modal-detail">
    <div @click="hide" class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="modal fade fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-detail"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header flex justify-between text-xl font-bold mb-3">
            <h5 class="modal-title"></h5>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hide()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="card-title">
              <list-option-section :self="this" ref="form-option" />
              <!-- @form-option-mounted="onFormOptionReady" -->
            </div>

            <div class="table-responsive">
              <table class="mb-5 border border-gray-300" ref="formContainer">
                <thead>
                  <tr class="uppercase">
                    <th
                      class="min-w-[100px] cursor-pointer"
                      @click="
                        onSort(
                          'kode_item',
                          parameters.params.sort == 'asc' ? 'desc' : 'asc'
                        )
                      "
                    >
                      <div class="flex justify-between align-baseline">
                        <div>Kode Item</div>
                        <div>
                          <i
                            class="fas fa-caret-up"
                            :class="
                              parameters.params.order == 'kode_item' &&
                              parameters.params.sort == 'asc'
                                ? ''
                                : 'light-gray'
                            "
                          ></i>
                          <i
                            class="fas fa-caret-down"
                            :class="
                              parameters.params.order == 'kode_item' &&
                              parameters.params.sort == 'desc'
                                ? ''
                                : 'light-gray'
                            "
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th
                      class="min-w-[100px] cursor-pointer"
                      @click="
                        onSort(
                          'nama_item',
                          parameters.params.sort == 'asc' ? 'desc' : 'asc'
                        )
                      "
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
                    <th class="min-w-[120px]">Lokasi Penyimpanan</th>
                    <!-- <th class="min-w-[150px]">Lokasi Penyimpanan</th>
                    <th class="min-w-[200px]">Item</th> -->
                    <th class="min-w-[100px]">Valuation</th>
                    <!-- <th class="text-info min-w-[100px]">Saldo Awal</th> -->
                    <th class="text-primary min-w-[100px]">Saldo Sisa</th>
                    <th class="min-w-[100px]">Options</th>
                  </tr>
                </thead>
                <tbody class="max-h-[500px]">
                  <tr
                    v-for="(item, index) in data"
                    :key="index"
                    class="items-start"
                  >
                    <td class="whitespace-nowrap">{{ item.kode_item }}</td>
                    <td class="whitespace-nowrap">
                      {{ item.nama_item || "-" }}
                    </td>
                    <td class="whitespace-nowrap">
                      {{
                        item.zona_gudang
                          ? item.zona_gudang.nama_zona_gudang +
                            " - " +
                            item.zona_gudang.kode_zona_gudang
                          : "-"
                      }}
                      <!-- {{ item.kode_slot_penyimpanan_terakhir }} -->
                    </td>
                    <!-- <td class="whitespace-nowrap">
                      {{ item.kode_slot_penyimpanan_terakhir }}
                    </td>
                    <td class="whitespace-nowrap">
                      {{
                        item.item_gudang
                          ? item.item_gudang.nama_item +
                            " - " +
                            item.item_gudang.kode_item
                          : "-"
                      }}
                    </td> -->
                    <td class="whitespace-nowrap">
                      {{ item.valuation ? item.valuation.kode_valuation : "-" }}
                    </td>
                    <td class="text-primary whitespace-nowrap">
                      {{ item.quantity | formatPrice }}
                    </td>
                    <td class="whitespace-nowrap">
                      <button
                        class="btn btn-sm btn-primary"
                        @click="self.addItem(item)"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
                <table-data-loading-section :self="this" />

                <table-data-not-found-section :self="this" />
              </table>
            </div>
            <div class="mx-3 mt-2 mb-4">
              <pagination-component :self="this" ref="pagination" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    return {
      title: "Stok Gudang",
      visible: false,
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "stock_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_data: "",
        },
      },
      form: {
        kartu_stok_id: "",
        gudang_id: "",
      },
    };
  },

  created() {
    this.set_data([]);
  },

  mounted() {
    // this.$emit("form-option-mounted");
    // this.$refs["form-option"].isExport = false;
    // this.$refs["form-option"].isFilter = false;
    // this.$refs["form-option"].isMaintenancePage = true;
    // this.$refs["form-option"].isAddData = false;
    // if (visible) {
    //   this.$nextTick(() => {
    //     const formOption = this.$refs["form-option"];
    //     if (formOption) {
    //       formOption.isExport = false;
    //       formOption.isFilter = false;
    //       formOption.isMaintenancePage = true;
    //       formOption.isAddData = false;
    //     }
    //   });
    // }
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result"]),
    onFormOptionReady() {
      const formOption = this.$refs["form-option"];
      if (formOption) {
        formOption.isExport = false;
        formOption.isFilter = false;
        formOption.isMaintenancePage = true;
        formOption.isAddData = false;
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

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = parseInt(page) || 1;

      this.parameters.url = `inventory/stock/get-stok-item/${this.self.parameters.form.gudang_id.gudang_id}`;

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      await this.getData(this.parameters);

      if (this.result == true) {
        loader.hide();

        if (page == 1) {
          //this.$refs["pagination"].generatePage();
        }

        this.$refs["pagination"].active_page = this.parameters.params.page;
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingData = false;
    },

    show() {
      this.visible = true;

      this.$nextTick(() => {
        const formOption = this.$refs["form-option"];
        if (formOption) {
          formOption.isExport = false;
          formOption.isFilter = false;
          formOption.isMaintenancePage = true;
          formOption.isAddData = false;
        }
      });
    },
    hide() {
      this.visible = false;
    },
    formatPrice(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);
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
