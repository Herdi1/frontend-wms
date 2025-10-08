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
                    :max="parameters.params.end_date"
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
                    :min="parameters.params.start_date"
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
                    :disabled="lookup_chart_of_accounts.data.length == 1"
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
                      v-if="lookup_chart_of_accounts.data.length || search"
                    >
                      <span
                        v-if="lookup_chart_of_accounts.current_page > 1"
                        @click="onGetChartOfAccount(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_chart_of_accounts.last_page >
                          lookup_chart_of_accounts.current_page
                        "
                        @click="onGetChartOfAccount(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
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
                    <template slot="selected-option" slot-scope="option">
                      <div
                        class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                      >
                        {{ option.nama_item }}
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
                        @click="onGetItemGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetItemGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
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
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom2.data.length || search"
                    >
                      <span
                        v-if="lookup_custom2.current_page > 1"
                        @click="onGetValuation(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom2.last_page > lookup_custom2.current_page
                        "
                        @click="onGetValuation(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
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
                    @input="onSetZona"
                  >
                    <template slot="selected-option" slot-scope="option">
                      <div
                        class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                      >
                        {{ option.nama_zona_gudang }}
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
                        @click="onGetZonaGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom3.last_page > lookup_custom3.current_page
                        "
                        @click="onGetZonaGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-2">
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Aisle</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_slot_penyimpanan"
                    :loading="isLoadingGetSlotAisle"
                    :options="lookup_custom4.data"
                    :filterable="false"
                    @search="onGetSlotAisle"
                    v-model="parameters.params.slot_penyimpanan_id_aisle"
                    @input="onSetAisle"
                  >
                    <template slot="selected-option" slot-scope="option">
                      <div
                        class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                      >
                        {{ option.nama_slot_penyimpanan }}
                      </div>
                    </template>
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom4.data.length || search"
                    >
                      <span
                        v-if="lookup_custom4.current_page > 1"
                        @click="onGetSlotAisle(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom4.last_page > lookup_custom4.current_page
                        "
                        @click="onGetSlotAisle(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>

                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Rack</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_slot_penyimpanan"
                    :loading="isLoadingGetSlotRack"
                    :options="lookup_custom5.data"
                    :filterable="false"
                    @search="onGetSlotRack"
                    v-model="parameters.params.slot_penyimpanan_id_rack"
                    @input="onSetRack"
                  >
                    <template slot="selected-option" slot-scope="option">
                      <div
                        class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                      >
                        {{ option.nama_slot_penyimpanan }}
                      </div>
                    </template>
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom5.data.length || search"
                    >
                      <span
                        v-if="lookup_custom5.current_page > 1"
                        @click="onGetSlotRack(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom5.last_page > lookup_custom5.current_page
                        "
                        @click="onGetSlotRack(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-2">
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Level</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_slot_penyimpanan"
                    :loading="isLoadingGetSlotLevel"
                    :options="lookup_custom6.data"
                    :filterable="false"
                    @search="onGetSlotLevel"
                    v-model="parameters.params.slot_penyimpanan_id_level"
                    @input="onSetLevel"
                  >
                    <template slot="selected-option" slot-scope="option">
                      <div
                        class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                      >
                        {{ option.nama_slot_penyimpanan }}
                      </div>
                    </template>
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom6.data.length || search"
                    >
                      <span
                        v-if="lookup_custom6.current_page > 1"
                        @click="onGetSlotLevel(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom6.last_page > lookup_custom6.current_page
                        "
                        @click="onGetSlotLevel(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Bin</b></div>

                  <v-select
                    class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_slot_penyimpanan"
                    :loading="isLoadingGetSlotBin"
                    :options="lookup_custom7.data"
                    :filterable="false"
                    @search="onGetSlotBin"
                    v-model="parameters.params.slot_penyimpanan_id_bin"
                  >
                    <template slot="selected-option" slot-scope="option">
                      <div
                        class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                      >
                        {{ option.nama_slot_penyimpanan }}
                      </div>
                    </template>
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom7.data.length || search"
                    >
                      <span
                        v-if="lookup_custom7.current_page > 1"
                        @click="onGetSlotBin(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom7.last_page > lookup_custom7.current_page
                        "
                        @click="onGetSlotBin(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-2">
                <div class="form-group w-full flex">
                  <div class="mb-3 w-1/2"><b>Asal Data</b></div>

                  <select
                    class="p-1 w-1/2 border border-gray-300 rounded-sm outline-none"
                    name="asal_data"
                    id="asal_data"
                    v-model="parameters.params.asal_data"
                  >
                    <option value="IN">Inbound</option>
                    <option value="OU">Outbound</option>
                    <option value="KS">Konversi Stok</option>
                    <option value="RS">Relokasi Stok</option>
                    <option value="SO">Stok Opname</option>
                  </select>
                </div>
              </div>

              <div class="flex gap-3 mt-5">
                <button
                  @click="onLoad"
                  class="bg-blue-500 hover:bg-blue-600 p-2 text-white rounded-md flex"
                >
                  <i class="fa fa-filter text-white font-bold mr-2"></i>
                  <div>Filter</div>
                </button>
              </div>
            </div>
          </div>

          <!-- start table -->
          <div class="table-fixed relative w-full overflow-x-auto">
            <table
              class="table table-sm min-w-full border border-gray-300"
              ref="formContainer"
            >
              <thead>
                <tr class="uppercase">
                  <th class="min-w-[100px] border border-gray-300">Tanggal</th>
                  <th class="min-w-[150px] border border-gray-300">
                    Lokasi Penyimpanan
                  </th>
                  <th class="min-w-[50px] border border-gray-300">Kode Item</th>
                  <th class="min-w-[200px] border border-gray-300">
                    Nama Item
                  </th>
                  <th class="min-w-[100px] border border-gray-300">
                    Valuation
                  </th>
                  <th class="min-w-[120px] border border-gray-300">
                    Kode Transaksi
                  </th>
                  <th class="min-w-[120px] border border-gray-300">
                    Kode Referensi
                  </th>
                  <th class="min-w-[120px] border border-gray-300">
                    Deskripsi
                  </th>
                  <!-- <th class="text-info min-w-[100px]">Saldo Awal</th> -->
                  <th
                    class="text-green-500 min-w-[100px] border border-gray-300"
                  >
                    Masuk
                  </th>
                  <th class="text-danger min-w-[100px] border border-gray-300">
                    Keluar
                  </th>
                  <th class="text-primary min-w-[100px] border border-gray-300">
                    Saldo Akhir
                  </th>
                  <th class="min-w-[100px] border border-gray-300">Detail</th>
                </tr>
              </thead>
              <tbody class="border border-gray-300">
                <tr v-if="data.length">
                  <td class="whitespace-nowrap">
                    {{ data[0] ? formatDateTime(data[0].created_at) : "-" }}
                  </td>
                  <td>
                    <!-- {{ coa_id ? coa_id.kode_coa : "-" }} -->
                  </td>
                  <td style="font-size: 10px !important">
                    <!-- {{ coa_id ? coa_id.nama_coa : "-" }} -->
                  </td>
                  <td></td>
                  <td></td>
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
                  <td></td>
                  <td class="text-primary text-right">
                    {{
                      raw_data.first_balance
                        ? raw_data.first_balance.saldo
                        : "" | formatPrice
                    }}
                  </td>
                  <td class="text-center"></td>
                </tr>

                <!-- :class="{ 'table-active': ActiveRow == i }" -->
                <tr v-for="(item, i) in data" :key="i">
                  <!-- @click="onRowSelected(i)" -->
                  <td class="whitespace-nowrap border border-gray-300">
                    {{ formatDateTime(item.created_at) }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.kode_slot_penyimpanan_terakhir ?? "-" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.item_gudang ? item.item_gudang.kode_item : "-" }}
                  </td>
                  <td class="whitespace-nowrap border border-gray-300">
                    {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
                  </td>
                  <td
                    class="whitespace-nowrap border border-gray-300 text-center"
                  >
                    {{ item.kode_valuation ? item.kode_valuation : "-" }}
                  </td>
                  <td class="whitespace-nowrap border border-gray-300">
                    {{ item.kode_referensi }}
                  </td>
                  <td class="whitespace-nowrap border border-gray-300">
                    {{ item.kode_referensi_2 }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.deskripsi || "" }}
                  </td>
                  <!-- <td class="text-info whitespace-nowrap">
                    {{
                      item.saldo_awal > 0 ? item.saldo_awal : "" | formatPrice
                    }}
                  </td> -->
                  <td
                    class="text-success whitespace-nowrap border border-gray-300 text-right"
                  >
                    {{ item.masuk > 0 ? item.masuk : "" | formatPrice }}
                  </td>
                  <td
                    class="text-danger whitespace-nowrap border border-gray-300 text-right"
                  >
                    {{ item.keluar > 0 ? item.keluar : "" | formatPrice }}
                  </td>
                  <td
                    class="text-primary whitespace-nowrap border border-gray-300 text-right"
                  >
                    {{ item.last_balance | formatPrice }}
                  </td>
                  <td
                    class="whitespace-nowrap border border-gray-300 place-items-center"
                  >
                    <button
                      class="btn btn-sm bg-orange-500 text-white"
                      @click="onDetail(item)"
                      v-if="getRoles.show"
                    >
                      <i class="fas fa-info-circle"></i>
                    </button>
                  </td>
                </tr>

                <tr v-if="data.length">
                  <td class="whitespace-nowrap border-y border-gray-300">
                    {{
                      data[data.length - 1]
                        ? formatDateTime(data[data.length - 1].created_at)
                        : "-"
                    }}
                  </td>
                  <td class="border-y border-gray-300">
                    <!-- {{ coa_id ? coa_id.kode_coa : "-" }} -->
                  </td>
                  <td class="border-y border-gray-300">
                    <!-- {{ coa_id ? coa_id.nama_coa : "-" }} -->
                  </td>
                  <td class="border-y border-gray-300"></td>
                  <td class="border-y border-gray-300"></td>
                  <td class="border-y border-gray-300"></td>
                  <!-- <td></td> -->
                  <td class="text-info border-y border-gray-300"></td>
                  <td class="text-success border-y border-gray-300"></td>
                  <td class="text-danger border-y border-gray-300"></td>
                  <td class="border-y border-gray-300"></td>
                  <td class="text-primary border-y border-gray-300 text-right">
                    {{ last_balance | formatPrice }}
                  </td>
                  <td class="border-y border-gray-300 text-center"></td>
                </tr>
              </tbody>

              <table-data-loading-section :self="this" />

              <table-data-not-found-section :self="this" />

              <tr v-if="data && raw_data.current_page != raw_data.last_page">
                <td colspan="11" class="text-center py-5 pl-2">
                  <button
                    class="btn btn-link bg-blue-500 hover:bg-blue-500/85 transition-all duration-200 text-white"
                    @click="loadMoreStock"
                  >
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
      title: "Kartu Stok",
    };
  },

  async created() {
    await this.onSearchChartOfAccount();
    if (this.lookup_chart_of_accounts.data.length > 0) {
      await this.onSetChartOfAccount(this.lookup_chart_of_accounts.data[0]);
    }
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
    // await this.onSearchItemGudang();
    await this.onSearchValuation();
    // await this.onSearchZonaGudang();
  },

  data() {
    return {
      data: [],
      raw_data: [],
      ActiveRow: null,
      title: "Kartu Stok",
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
          asal_data: "",
          gudang_id: "",
          item_gudang_id: "",
          valuation_id: "",
          zona_gudang_id: "",
          slot_penyimpanan_id_aisle: "",
          slot_penyimpanan_id_rack: "",
          slot_penyimpanan_id_level: "",
          slot_penyimpanan_id_bin: "",
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

      isStopSearchSlotAisle: false,
      isLoadingGetSlotAisle: false,
      slot_aisle_search: "",

      isStopSearchSlotRack: false,
      isLoadingGetSlotRack: false,
      slot_rack_search: "",

      isStopSearchSlotLevel: false,
      isLoadingGetSlotLevel: false,
      slot_level_search: "",

      isStopSearchSlotBin: false,
      isLoadingGetSlotBin: false,
      slot_bin_search: "",

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

      "lookup_custom4",
      "lookup_custom5",
      "lookup_custom6",
      "lookup_custom7",
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

    // printFile() {
    //   let url =
    //     "inventory/get-print-detail?type=pdf" +
    //       "&gudang_id=" +
    //       this.parameters.params.gudang_id?.gudang_id ||
    //     "" +
    //       "&item_gudang_id=" +
    //       this.parameters.params.item_gudang_id?.item_gudang_id ||
    //     "" +
    //       "&valuation_id=" +
    //       this.parameters.params.valuation_id?.valuation_id ||
    //     "" +
    //       "&zona_gudang_id=" +
    //       this.parameters.params.zona_gudang_id?.zona_gudang_id ||
    //     "" +
    //       "&asile_id=" +
    //       this.parameters.params.slot_penyimpanan_id_aisle
    //         ?.slot_penyimpanan_id ||
    //     "";
    //   "&rack_id=" +
    //     this.parameters.params.slot_penyimpanan_id_rack?.slot_penyimpanan_id ||
    //     "";
    //   "&level_id=" +
    //     this.parameters.params.slot_penyimpanan_id_level?.slot_penyimpanan_id ||
    //     "";
    //   "&bin_id=" +
    //     this.parameters.params.slot_penyimpanan_id_bin?.slot_penyimpanan_id ||
    //     "";
    //   "&start_date=" + this.parameters.params.start_date ||
    //     "" +
    //     "&end_date=" + this.parameters.params.end_date ||
    //     "";

    //   window.open(process.env.API_URL + url);
    // },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      const params = {
        page: page,
        gudang_id: this.parameters.params.gudang_id?.gudang_id || "",
        item_gudang_id:
          this.parameters.params.item_gudang_id?.item_gudang_id || "",
        valuation_id: this.parameters.params.valuation_id?.valuation_id || "",
        zona_gudang_id:
          this.parameters.params.zona_gudang_id?.zona_gudang_id || "",
        aisle_id:
          this.parameters.params.slot_penyimpanan_id_aisle
            ?.slot_penyimpanan_id || "",
        rack_id:
          this.parameters.params.slot_penyimpanan_id_rack
            ?.slot_penyimpanan_id || "",
        level_id:
          this.parameters.params.slot_penyimpanan_id_level
            ?.slot_penyimpanan_id || "",
        bin_id:
          this.parameters.params.slot_penyimpanan_id_bin?.slot_penyimpanan_id ||
          "",
        start_date: this.parameters.params.start_date || "",
        end_date: this.parameters.params.end_date || "",
      };

      let url = `${this.parameters.url}?page=${params.page}&gudang_id=${params.gudang_id}&item_gudang_id=${params.item_gudang_id}&valuation_id=${params.valuation_id}&zona_gudang_id=${params.zona_gudang_id}&slot_penyimpanan_id_aisle=${params.aisle_id}&slot_penyimpanan_id_rack=${params.rack_id}&slot_penyimpanan_id_level=${params.level_id}&slot_penyimpanan_id_bin=${params.bin_id}&start_date=${params.start_date}&end_date=${params.end_date}`;

      this.$axios
        .get(url)
        .then((res) => {
          let newLastBalance = parseFloat(
            res.data.first_balance ? res.data.first_balance.saldo : 0.0
          );

          let newData = res.data.data.map((item) => {
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
          this.$globalErrorToaster(this.$toaster, err.message);
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

      const params = {
        page: this.parameters.params.page,
        gudang_id: this.parameters.params.gudang_id?.gudang_id || "",
        item_gudang_id:
          this.parameters.params.item_gudang_id?.item_gudang_id || "",
        valuation_id: this.parameters.params.valuation_id?.valuation_id || "",
        zona_gudang_id:
          this.parameters.params.zona_gudang_id?.zona_gudang_id || "",
        start_date: this.parameters.params.start_date || "",
        end_date: this.parameters.params.end_date || "",
      };

      let url = `${this.parameters.url}?page=${params.page}&gudang_id=${params.gudang_id}&item_gudang_id=${params.item_gudang_id}&valuation_id=${params.valuation_id}&zona_gudang_id=${params.zona_gudang_id}&start_date=${params.start_date}&end_date=${params.end_date}`;
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
          this.$globalErrorToaster(this.$toaster, err.message);
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
          url: "master/gudang/get-gudang-user",
          lookup: "chart_of_accounts",
          query:
            "?search=" +
            this.chart_of_account_search +
            "&user_id=" +
            this.user.user_id +
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
            this.parameters.params.gudang_id.gudang_id +
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

    onGetSlotAisle(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotAisle);

      this.isStopSearchSlotAisle = setTimeout(() => {
        this.slot_aisle_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchSlotAisle();
      }, 600);
    },

    async onSearchSlotAisle() {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom4",
          query:
            "?search=" +
            this.slot_aisle_search +
            "&level=1" +
            "&gudang_id=" +
            this.parameters.params.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.params.zona_gudang_id.zona_gudang_id +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    onGetSlotRack(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotRack);

      this.isStopSearchSlotRack = setTimeout(() => {
        this.slot_rack_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchSlotRack();
      }, 600);
    },

    async onSearchSlotRack() {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom5",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=2" +
            "&gudang_id=" +
            this.parameters.params.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.params.zona_gudang_id.zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.parameters.params.slot_penyimpanan_id_aisle
              .slot_penyimpanan_id +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    onGetSlotLevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotLevel);

      this.isStopSearchSlotLevel = setTimeout(() => {
        this.slot_level_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchSlotLevel();
      }, 600);
    },

    async onSearchSlotLevel() {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom6",
          query:
            "?search=" +
            this.slot_level_search +
            "&level=3" +
            "&gudang_id=" +
            this.parameters.params.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.params.zona_gudang_id.zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.parameters.params.slot_penyimpanan_id_rack
              .slot_penyimpanan_id +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    onGetSlotBin(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotBin);

      this.isStopSearchSlotBin = setTimeout(() => {
        this.slot_bin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchSlotBin();
      }, 600);
    },

    async onSearchSlotBin() {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom7",
          query:
            "?search=" +
            this.slot_bin_search +
            "&level=4" +
            "&gudang_id=" +
            this.parameters.params.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.params.zona_gudang_id.zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.parameters.params.slot_penyimpanan_id_level
              .slot_penyimpanan_id +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    async onSetChartOfAccount(item) {
      this.parameters.params.gudang_id = item ? item : "";
      await this.onSearchItemGudang();
      await this.onSearchZonaGudang();
    },

    async onSetZona(item) {
      if (item) {
        this.parameters.params.zona_gudang_id = item;
        await this.onSearchSlotAisle();
      } else {
        this.parameters.params.zona_gudang_id = "";
        this.parameters.params.slot_penyimpanan_id_aisle = "";
      }
    },

    async onSetAisle(item) {
      if (item) {
        this.parameters.params.slot_penyimpanan_id_aisle = item;
        await this.onSearchSlotRack();
      } else {
        this.parameters.params.slot_penyimpanan_id_aisle = "";
        this.parameters.params.slot_penyimpanan_id_rack = "";
      }
    },

    async onSetRack(item) {
      if (item) {
        this.parameters.params.slot_penyimpanan_id_rack = item;
        await this.onSearchSlotLevel();
      } else {
        this.parameters.params.slot_penyimpanan_id_rack = "";
        this.parameters.params.slot_penyimpanan_id_level = "";
      }
    },

    async onSetLevel(item) {
      if (item) {
        this.parameters.params.slot_penyimpanan_id_level = item;
        await this.onSearchSlotBin();
      } else {
        this.parameters.params.slot_penyimpanan_id_level = "";
        this.parameters.params.slot_penyimpanan_id_bin = "";
      }
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

    formatDateTime(dateTime) {
      const dateObject = new Date(dateTime);

      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");
      const hours = String(dateObject.getHours()).padStart(2, "0");
      const minutes = String(dateObject.getMinutes()).padStart(2, "0");
      const seconds = String(dateObject.getSeconds()).padStart(2, "0");

      const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

      return formattedDateTime;
    },
  },
};
</script>
