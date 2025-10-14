<template>
  <portal v-if="visible" to="modal-detail">
    <div @click="hide" class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="modal fade fixed top-6 left-1/2 -translate-x-1/2 w-[1000px] bg-white rounded shadow-lg p-6 z-50 overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-detail"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header flex justify-between text-xl font-bold mb-3">
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

          <div class="modal-body max-h-[600px] mb-5">
            <div class="card-title">
              <list-option-section :self="this" ref="form-option" />
            </div>
            <div class="table-responsive">
              <table
                class="mb-5 border border-gray-300 table-fixed"
                ref="formContainer"
              >
                <thead>
                  <tr class="uppercase">
                    <th
                      class="w-48 cursor-pointer border border-gray-300"
                      @click="
                        onSort(
                          'kode_pick_request',
                          parameters.params.sort == 'asc' ? 'desc' : 'asc'
                        )
                      "
                    >
                      <div class="flex justify-between align-baseline">
                        <div>Kode Pick Request</div>
                        <div>
                          <i
                            class="fas fa-caret-up"
                            :class="
                              parameters.params.order == 'kode_pick_request' &&
                              parameters.params.sort == 'asc'
                                ? ''
                                : 'light-gray'
                            "
                          ></i>
                          <i
                            class="fas fa-caret-down"
                            :class="
                              parameters.params.order == 'kode_pick_request' &&
                              parameters.params.sort == 'desc'
                                ? ''
                                : 'light-gray'
                            "
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th class="border border-gray-300 w-36">Jenis Transaksi</th>
                    <th class="border border-gray-300 w-36">
                      Kode Stok Transfer
                    </th>
                    <th class="border border-gray-300 w-36">Jenis Kiriman</th>
                    <th
                      @click="
                        onSort(
                          'tanggal',
                          parameters.params.sort == 'asc' ? 'desc' : 'asc'
                        )
                      "
                      class="cursor-pinter w-32 border border-gray-300"
                    >
                      <div class="flex justify-between items-baseline">
                        <div>Tanggal</div>
                        <div>
                          <i
                            class="fas fa-caret-up"
                            :class="
                              parameters.params.order == 'tanggal' &&
                              parameters.params.sort == 'asc'
                                ? ''
                                : 'light-gray'
                            "
                          ></i>
                          <i
                            class="fas fa-caret-down"
                            :class="
                              parameters.params.order == 'tanggal' &&
                              parameters.params.sort == 'desc'
                                ? ''
                                : 'light-gray'
                            "
                          ></i>
                        </div>
                      </div>
                    </th>
                    <th
                      class="w-32 cursor-pointer border border-gray-300"
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
                      class="w-40 cursor-pointer"
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

                    <th class="border border-gray-300 w-32">Shipto</th>
                    <!-- <th class="border border-gray-300 w-32">Pelanggan</th> -->
                    <th class="border border-gray-300 w-32">Quantity</th>
                    <th class="w-20">Options</th>
                  </tr>
                </thead>
                <tbody class="min-h-[500px]">
                  <tr v-for="(item, i) in data" :key="i">
                    <td class="border border-gray-300">
                      <div>
                        {{ item.kode_pick_request }}
                        <p v-if="item.user_id_input" class="text-blue-500">
                          <i>Dibuat oleh: {{ item.user_id_input.username }}</i>
                        </p>
                        <p v-else class="text-blue-500">
                          <i>Dibuat oleh: Sistem</i>
                        </p>
                      </div>
                    </td>
                    <td class="border border-gray-300 text-center">
                      <span
                        v-if="item.jenis == 0"
                        class="p-1 text-white rounded-md bg-orange-500"
                        >Penjualan</span
                      >
                      <span
                        v-if="item.jenis == 1"
                        class="p-1 text-white rounded-md bg-green-500"
                        >Stok Transfer</span
                      >
                    </td>
                    <td class="border border-gray-300">
                      {{
                        item.stok_transfer_detail
                          ? item.stok_transfer_detail.stok_transfer
                              .kode_stok_transfer
                          : "-"
                      }}
                    </td>
                    <td class="border border-gray-300">
                      <div v-if="item.jenis_kiriman">
                        <p v-if="item.jenis_kiriman.trim() === 'FRC'">Franco</p>
                        <p v-if="item.jenis_kiriman.trim() === 'LCO'">Locco</p>
                        <p v-if="item.jenis_kiriman.trim() === 'SWC'">Switch</p>
                      </div>
                      <div v-else>-</div>
                    </td>
                    <td class="border border-gray-300">{{ item.tanggal }}</td>
                    <td class="border border-gray-300">
                      {{ item.kode_item ? item.kode_item : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.nama_item ? item.nama_item : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.nama_lokasi ?? "-" }}
                    </td>
                    <!-- <td class="border border-gray-300">
                      {{ item.pelanggan ? item.pelanggan.nama_pelanggan : "-" }}
                    </td> -->
                    <td class="border border-gray-300">
                      {{ item.sisa_quantity ? item.sisa_quantity : "-" }}
                    </td>
                    <td
                      class="border border-gray-300 text-center place-items-center"
                    >
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
      title: "Pick Request",
      visible: false,
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        url: "",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "pick_request_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          start_date: "",
          end_data: "",
        },
      },
    };
  },

  created() {
    this.set_data([]);
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

      this.parameters.url = `outbound/pick-request/get-pick-request-detail/${this.self.parameters.form.gudang_id.gudang_id}`;

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
