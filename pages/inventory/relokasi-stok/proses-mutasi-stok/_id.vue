<template>
  <section class="section">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">Tambah Data</h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full items-start"
            >
              <div class="form-group" v-if="isEditable">
                <input-horiontal
                  label="Kode Mutasi Stok"
                  type="text"
                  name="kode_mutasi_stok"
                  v-model="parameters.form.kode_mutasi_stok"
                  :required="true"
                  :disabled="true"
                />
              </div>
              <!-- <div class="form-group">
                <input-horiontal
                label="Nomor Transaksi"
                type="text"
                name="nomor_transaksi"
                v-model="parameters.form.no_transaksi"
                :required="true"
                />
              </div> -->
              <div class="form-group">
                <input-horiontal
                  label="Tanggal"
                  type="date"
                  name="tanggal"
                  v-model="parameters.form.tanggal"
                  :required="false"
                  disabled
                />
              </div>
              <div class="flex justify-between items-center p-1">
                <label for="gudang_id" class="w-1/2">Gudang</label>
                <v-select
                  class="w-1/2 rounded-sm bg-white text-gray-500 border-gray-300 mb-1"
                  label="nama_gudang"
                  :loading="isLoadingGetGudang"
                  :options="lookup_warehouses.data"
                  :filterable="false"
                  v-model="parameters.form.gudang_id"
                  disabled
                >
                  <!-- v-model="item.item_gudang_id" -->
                  <!-- @input="(item) => onSelectItemGudang(item, index)" -->
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_warehouses.data.length || search"
                  >
                    <span
                      v-if="lookup_warehouses.current_page > 1"
                      @click="onGetGudang(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_warehouses.last_page >
                        lookup_warehouses.current_page
                      "
                      @click="onGetGudang(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                  <template #list-footer="{ search }">
                    <button
                      v-if="search"
                      type="button"
                      @click="onGetGudang(search, false)"
                      class="bg-blue-500 p-1 w-full text-sm text-white"
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </template>
                </v-select>
              </div>
              <div class="form-group flex justify-between items-start">
                <label for="">Keterangan</label>
                <textarea
                  name="keterangan"
                  disabled
                  id="keterangan"
                  v-model="parameters.form.keterangan"
                  class="w-[50%] outline-none border border-gray-300 rounded-md p-1"
                ></textarea>
              </div>
            </div>
            <div
              class="grid grid-cols-1 md:grid-cols-2 w-full gap-2 mt-10 items-start"
            >
              <div class="form-group flex items-center">
                <label for="" class="w-1/2"
                  >Status Relokasi <span class="text-danger">*</span></label
                >
                <select
                  name=""
                  id=""
                  v-model="parameters.form.status_mutasi"
                  class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                >
                  <option value="MENUNGGU">Menunggu</option>
                  <option value="PROSES">Proses</option>
                  <option value="SELESAI">Selesai</option>
                  <option value="BATAL">Batal</option>
                </select>
              </div>
              <div class="form-group">
                <select-button
                  :self="{
                    label: 'Petugas',
                    optionLabel: 'nama_lengkap',
                    lookup: lookup_customers,
                    value: parameters.form.staff_id,
                    onGet: onGetStaff,
                    isLoadingL: isLoadingGetStaff,
                    input: onSelectStaff,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                  :required="true"
                />
              </div>
              <div class="form-group" v-if="parameters.form.vendor_id">
                <input-horizontal
                  :disabled="true"
                  :isHorizontal="true"
                  label="Vendor"
                  type="text"
                  name="vendor"
                  v-model="parameters.form.vendor_id.nama_vendor"
                  inputWidth="w-[50%]"
                  labelWidth="w-[40%]"
                />
              </div>
              <div
                class="form-group flex items-start"
                v-if="parameters.form.status_mutasi === 'PROSES'"
              >
                <label for="keterangan" class="w-1/2 pt-1"
                  >Catatan Proses</label
                >
                <textarea
                  placeholder="Catatan Proses"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.catatan_proses"
                ></textarea>
              </div>
              <div
                class="form-group flex items-start"
                v-if="parameters.form.status_mutasi === 'SELESAI'"
              >
                <label for="keterangan" class="w-1/2 pt-1"
                  >Catatan Selesai</label
                >
                <textarea
                  placeholder="Catatan Selesai"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.catatan_selesai"
                ></textarea>
              </div>
              <div
                class="form-group flex items-start"
                v-if="parameters.form.status_mutasi === 'BATAL'"
              >
                <label for="keterangan" class="w-1/2 pt-1">Catatan Batal</label>
                <textarea
                  placeholder="Catatan Batal"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.catatan_batal"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="my-10">
            <TabComponent :tabs="tabs">
              <template #DetailItem>
                <div class="w-full flex justify-between items-center mt-3">
                  <h1 class="text-xl font-bold">Detail Item</h1>

                  <div>
                    <!-- <button
                      type="button"
                      @click="onOpenModalStokGudang"
                      class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                    >
                      <i class="fas fa-plus"></i>
                      <p class="text-xs font-medium">Tambah Item</p>
                    </button> -->
                  </div>
                </div>
                <div class="table-responsive overflow-y-hidden mb-7">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                    :class="
                      parameters.form.mutasi_stok_details.length
                        ? 'mb-[100px]'
                        : ''
                    "
                  >
                    <thead>
                      <tr class="text-sm uppercase">
                        <th class="w-[200px] border border-gray-300">
                          Item Gudang
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Lokasi Penyimpanan Asal
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Zona Tujuan
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Lokasi Penyimpanan Tujuan
                        </th>

                        <th class="w-[200px] border border-gray-300">
                          Quantity
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Keterangan
                        </th>
                        <th
                          class="w-[100px] border border-gray-300 text-center"
                        >
                          Hapus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="align-top border-t"
                        v-for="(item, i) in parameters.form.mutasi_stok_details"
                        :key="i"
                      >
                        <td class="border border-gray-300">
                          <p>
                            {{ item?.kode_item ?? "" }} -
                            {{ item?.nama_item ?? "-" }}
                          </p>
                        </td>
                        <td class="border border-gray-300">
                          <p>{{ item.kode_slot_penyimpanan_terakhir_asal }}</p>
                        </td>
                        <td class="border border-gray-300">
                          {{
                            item.zona_gudang_id
                              ? item.zona_gudang_id.nama_zona_gudang
                              : ""
                          }}
                        </td>
                        <td class="border border-gray-300">
                          <div class="w-full mb-2">
                            <label for="">Aisle</label>
                            <p class="text-right">
                              {{
                                item.slot_penyimpanan_id_aisle
                                  ? item.slot_penyimpanan_id_aisle
                                      .nama_slot_penyimpanan
                                  : "-"
                              }}
                            </p>
                          </div>
                          <div class="w-full mb-2">
                            <label for="">Rack</label>
                            <p class="text-right">
                              {{
                                item.slot_penyimpanan_id_rack
                                  ? item.slot_penyimpanan_id_rack
                                      .nama_slot_penyimpanan
                                  : "-"
                              }}
                            </p>
                          </div>
                          <div class="w-full mb-2">
                            <label for="">Level</label>
                            <p class="text-right">
                              {{
                                item.slot_penyimpanan_id_level
                                  ? item.slot_penyimpanan_id_level
                                      .nama_slot_penyimpanan
                                  : "-"
                              }}
                            </p>
                          </div>
                          <div class="w-full mb-2">
                            <label for="">Bin</label>
                            <p class="text-right">
                              {{
                                item.slot_penyimpanan_id_bin
                                  ? item.slot_penyimpanan_id_bin
                                      .nama_slot_penyimpanan
                                  : "-"
                              }}
                            </p>
                          </div>
                        </td>
                        <!-- <td class="border border-gray-300">
                        </td> -->
                        <td class="border border-gray-300">
                          <div class="w-full">
                            <label for=""
                              >Valuation:
                              <span class="font-bold text-base">{{
                                item.kode_valuation
                              }}</span></label
                            >
                            <!-- <input
                              type="text"
                              disabled
                              v-model="item.kode_valuation"
                              class="pl-2 w-full py-1 border border-gray-300 rounded focus:outline-none"
                            /> -->
                          </div>
                          <div class="w-full">
                            <div class="w-full">
                              <label for="">Quantity Asal</label>
                              <p class="text-right">{{ item.quantity_asal }}</p>
                            </div>
                            <div class="w-full">
                              <label for="">Quantity Tujuan</label>
                              <p class="text-right">
                                {{ item.quantity_tujuan }}
                              </p>
                            </div>
                            <div class="w-full">
                              <label for="">Quantity Mutasi</label>
                              <p
                                class="text-right"
                                :class="
                                  item.quantity_mutasi >
                                  parseFloat(item.quantity_asal)
                                    ? 'text-danger'
                                    : ''
                                "
                              >
                                {{ item.quantity_mutasi }}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="border border-gray-300">
                          {{ item.keterangan ?? "-" }}
                        </td>
                        <td class="border border-gray-300">
                          <span class="flex justify-center">
                            <i
                              class="fas fa-trash mx-auto"
                              style="cursor: pointer"
                              @click="onDeleteItem(i)"
                            ></i>
                          </span>
                        </td>
                      </tr>
                      <tr
                        v-if="!parameters.form.mutasi_stok_details.length > 0"
                      >
                        <td colspan="100" class="text-center">
                          <span class="flex justify-center">
                            <img
                              src="/img/data-not-found.svg"
                              style="height: 250px; object-fit: cover"
                            />
                          </span>
                          <div class="mt-3">Data Tidak Ditemukan</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
              <template #Biaya>
                <div class="w-full flex justify-between items-center mt-3">
                  <h1 class="text-xl font-bold">Biaya</h1>

                  <div>
                    <button
                      type="button"
                      @click="addBiayaItem"
                      class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                    >
                      <i class="fas fa-plus"></i>
                      <p class="text-xs font-medium">Tambah Biaya</p>
                    </button>
                  </div>
                </div>
                <div class="table-responsive overflow-y-hidden mb-7">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                    :class="parameters.form.biaya.length ? 'mb-[300px]' : ''"
                  >
                    <thead>
                      <tr class="text-sm uppercase">
                        <th class="w-[200px] border border-gray-300">
                          Jenis Biaya
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Nominal Satuan
                        </th>
                        <th class="w-[200px] border border-gray-300">Jumlah</th>
                        <th class="w-[200px] border border-gray-300">Total</th>
                        <th class="w-[200px] border border-gray-300">COA</th>
                        <th class="w-[200px] border border-gray-300">Vendor</th>
                        <th class="w-[300px] border border-gray-300">
                          Keterangan
                        </th>
                        <th
                          class="w-[100px] border border-gray-300 text-center"
                        >
                          Hapus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in parameters.form.biaya"
                        :key="index"
                        class="align-top border-t"
                      >
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_jenis_biaya"
                            :loading="isLoadingGetJenisBiaya"
                            :options="lookup_custom8.data"
                            :filterable="false"
                            @search="onGetJenisBiaya"
                            v-model="item.jenis_biaya_id"
                            class="w-full"
                          >
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom8.data.length || search"
                            >
                              <span
                                v-if="lookup_custom8.current_page > 1"
                                @click="onGetJenisBiaya(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom8.last_page >
                                  lookup_custom8.current_page
                                "
                                @click="onGetJenisBiaya(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300">
                          <money
                            v-model="item.nominal_satuan"
                            class="w-full pl-2 py-1 border rounded focus:outline-none"
                            @keydown.native="
                              $event.key === '-'
                                ? $event.preventDefault()
                                : null
                            "
                          />
                        </td>
                        <td class="border border-gray-300">
                          <money
                            v-model="item.jumlah"
                            class="w-full pl-2 py-1 border rounded focus:outline-none"
                            @keydown.native="
                              $event.key === '-'
                                ? $event.preventDefault()
                                : null
                            "
                          />
                        </td>
                        <td class="border border-gray-300">
                          <money
                            v-model="item.total"
                            disabled
                            class="w-full pl-2 py-1 border rounded focus:outline-none"
                            @keydown.native="
                              $event.key === '-'
                                ? $event.preventDefault()
                                : null
                            "
                          />
                        </td>
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_coa"
                            :loading="isLoadingGetCoa"
                            :options="lookup_custom9.data"
                            :filterable="false"
                            @search="onGetCoa"
                            v-model="item.coa_id"
                            class="w-full"
                          >
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom9.data.length || search"
                            >
                              <span
                                v-if="lookup_custom9.current_page > 1"
                                @click="onGetCoa(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom9.last_page >
                                  lookup_custom9.current_page
                                "
                                @click="onGetCoa(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_vendor"
                            :loading="isLoadingGetVendor"
                            :options="lookup_custom10.data"
                            :filterable="false"
                            @search="onGetVendor"
                            v-model="item.vendor_id"
                            class="w-full"
                          >
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom10.data.length || search"
                            >
                              <span
                                v-if="lookup_custom10.current_page > 1"
                                @click="onGetVendor(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom10.last_page >
                                  lookup_custom10.current_page
                                "
                                @click="onGetVendor(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300">
                          <textarea
                            placeholder="Keterangan"
                            class="w-full pl-2 py-1 border rounded focus:outline-none"
                            v-model="item.keterangan"
                          ></textarea>
                        </td>
                        <td
                          class="text-center text-gray-600 border border-gray-300"
                        >
                          <span class="flex justify-center">
                            <i
                              @click="onDeleteBiaya(i)"
                              class="fas fa-trash mx-auto"
                              style="cursor: pointer"
                            ></i>
                          </span>
                        </td>
                      </tr>
                      <tr v-if="!parameters.form.biaya.length > 0">
                        <td colspan="100" class="text-center">
                          <span class="flex justify-center">
                            <img
                              src="/img/data-not-found.svg"
                              style="height: 250px; object-fit: cover"
                            />
                          </span>
                          <div class="mt-3">Data Tidak Ditemukan</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </TabComponent>
          </div>
          <modal-footer-section
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
            class="m-5"
          />
        </form>
      </ValidationObserver>
    </div>
    <ModalStokGudang :self="this" ref="modalStokGudang" />
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
import TabComponent from "./tabComponent.vue";
import ModalStokGudang from "../../../../components/transaksional/ModalStokGudang.vue";
export default {
  props: ["self"],

  components: {
    TabComponent,
    ModalStokGudang,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        {
          name: "Detail Item",
          slotName: "DetailItem",
        },
        {
          name: "Biaya",
          slotName: "Biaya",
        },
      ],

      id,

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      itemGudang_search: "",

      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

      isStopSearchItemZonaGudang: false,
      isLoadingGetItemZonaGudang: false,
      zonaGudang_search: "",

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

      isStopSearchJenisBiaya: false,
      isLoadingGetJenisBiaya: false,
      jenis_biaya_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchStaff: false,
      isLoadingGetStaff: false,
      staff_search: "",

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Relokasi Stok",
      parameters: {
        url: "inventory/proses-mutasi-stok",
        form: {
          gudang_id: "",
          status_mutasi: "",
          tanggal: "",
          keterangan: "",
          keterangan_proses: "",
          staff_id: "",
          vendor_id: "",
          mutasi_stok_details: [],
          biaya: [],

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },
    };
  },

  watch: {
    "parameters.form.biaya": {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          newVal.forEach((item) => {
            if (item.jumlah > 0) {
              item.total = item.jumlah * item.nominal_satuan;
            } else {
              item.total = 0;
            }
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },

  async created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    this.parameters.form.tanggal = formattedDate;
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(
          `inventory/proses-mutasi-stok/${this.id}`
        );
        // this.parameters.form = res.data;
        Object.keys(this.parameters.form).forEach((item) => {
          if (
            item !== "biaya" &&
            item !== "gudang_id" &&
            item !== "staff_id" &&
            item !== "mutasi_stok_details"
          ) {
            this.parameters.form[item] = res.data[item];
          }
        });
        this.parameters.form.gudang_id = res.data.gudang ?? "";
        await this.onSearchStaff();
        this.parameters.form.staff_id = res.data.staff ?? "";
        // this.parameters.form.biaya = [];
        this.parameters.form.mutasi_stok_details =
          res.data.mutasi_stok_details.map((item) => {
            return {
              ...item,
              nama_item: item.item_gudang
                ? item.item_gudang.nama_item
                : item.item
                ? item.item.nama_item
                : "",
              kode_item: item.item_gudang
                ? item.item_gudang.kode_item
                : item.item
                ? item.item.kode_wms
                : "",
              mutasi_stok_details_id: item,
              item_gudang_id: item.item_gudang_id,
              valuation_id: item.valuation_id,
              zona_gudang_id: item.zona_gudang ?? "",
              slot_penyimpanan_id_aisle: item.slot_penyimpanan_aisle ?? "",
              slot_penyimpanan_id_rack: item.slot_penyimpanan_rack ?? "",
              slot_penyimpanan_id_level: item.slot_penyimpanan_level ?? "",
              slot_penyimpanan_id_bin: item.slot_penyimpanan_bin ?? "",
              kode_valuation: item.valuation?.kode_valuation ?? "",
            };
          });

        if (res.data.biaya) {
          this.parameters.form.biaya = res.data.biaya.map((item) => {
            return {
              ...item,
              biaya_id: item,
              jenis_biaya_id: item.jenis_biaya ?? "",
              coa_id: item.coa ?? "",
              vendor_id: item.vendor ?? "",
            };
          });
        } else {
          this.parameters.form.biaya = [];
        }
      }
    } catch (error) {
      // console.log("error", error);
      this.$router.back();
    } finally {
      this.isLoadingPage = false;
    }
  },

  async mounted() {
    // await this.onSearchItemGudang();
    // await this.onSearchValuation();
    // await this.onSearchZonaGudang();
    // await this.onSearchSlotAisle();
    // await this.onSearchSlotRack();
    // await this.onSearchSlotLevel();
    // await this.onSearchSlotBin();

    await this.onSearchJenisBiaya();
    await this.onSearchCoa();
    await this.onSearchVendor();
    // await this.onSearchStaff();

    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //item gudang
      "lookup_custom2", //valuation
      "lookup_custom3", //zona gudang
      "lookup_custom4", //slot aisle
      "lookup_custom5", //slot rack
      "lookup_custom6", //slot level
      "lookup_custom7", //slot bin
      "lookup_custom8", //jenis biaya
      "lookup_custom9", //coa
      "lookup_custom10", //vendor
      "lookup_warehouses", //gudang
      "lookup_customers",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.parameters.form.user_agent = navigator.userAgent;
      if (this.parameters.form.user_agent.includes("Mobile")) {
        this.form.device = "Mobile";
      } else if (this.parameters.form.user_agent.includes("Tablet")) {
        this.parameters.form.device = "Tablet";
      } else {
        this.parameters.form.device = "Desktop";
      }
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.parameters.form.longitude =
              position.coords.longitude.toString();
            this.parameters.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
          },
          (error) => {
            this.isLoadingForm = false;
            this.$toaster.error(error.message);
          }
        );
      } else {
        this.$toaster.error("geolocation not supported");
        // console.log("geolocation not supported");
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;
      this.isLoadingForm = true;
      let url = "inventory/proses-mutasi-stok";
      console.log(this.parameters.form);
      let formData = {
        ...this.parameters.form,
        gudang_id: this.parameters.form.gudang_id.gudang_id,
        staff_id: typeof this.parameters.form.staff_id
          ? this.parameters.form.staff_id.staff_id
          : this.parameters.form.staff_id,
        vendor_id: typeof this.parameters.form.vendor_id
          ? this.parameters.form.vendor_id.vendor_id
          : this.parameters.form.vendor_id,
        mutasi_stok_details: this.parameters.form.mutasi_stok_details.map(
          (item) => {
            return {
              ...item,
              mutasi_stok_detail_id:
                typeof item.mutasi_stok_detail_id === "object"
                  ? item.mutasi_stok_detail_id.mutasi_stok_detail_id ?? ""
                  : "",
              item_gudang_id: item.item_gudang_id ?? "",
              valuation_id: item.valuation_id ?? "",
              zona_gudang_id:
                typeof item.zona_gudang_id === "object"
                  ? item.zona_gudang_id.zona_gudang_id ?? ""
                  : item.zona_gudang_id ?? "",
              slot_penyimpanan_id_aisle:
                typeof item.slot_penyimpanan_id_aisle === "object"
                  ? item.slot_penyimpanan_id_aisle.slot_penyimpanan_id ?? ""
                  : item.slot_penyimpanan_id_aisle ?? "",
              slot_penyimpanan_id_rack:
                typeof item.slot_penyimpanan_id_rack === "object"
                  ? item.slot_penyimpanan_id_rack.slot_penyimpanan_id ?? ""
                  : item.slot_penyimpanan_id_rack ?? "",
              slot_penyimpanan_id_level:
                typeof item.slot_penyimpanan_id_level === "object"
                  ? item.slot_penyimpanan_id_level.slot_penyimpanan_id ?? ""
                  : item.slot_penyimpanan_id_level ?? "",
              slot_penyimpanan_id_bin:
                typeof item.slot_penyimpanan_id_bin === "object"
                  ? item.slot_penyimpanan_id_bin.slot_penyimpanan_id ?? ""
                  : item.slot_penyimpanan_id_bin ?? "",
              staff_id:
                typeof item.staff_id === "object"
                  ? item.staff_id.staff_id ?? ""
                  : item.staff_id ?? "",
              vendor_id:
                typeof item.vendor_id === "object"
                  ? item.vendor_id.vendor_id ?? ""
                  : item.vendor_id ?? "",
            };
          }
        ),
        biaya: this.parameters.form.biaya.map((item) => {
          return {
            ...item,
            biaya_id:
              typeof item.biaya_id === "object"
                ? item.biaya_id.biaya_id ?? ""
                : "",
            jenis_biaya_id:
              typeof item.jenis_biaya_id === "object"
                ? item.jenis_biaya_id.jenis_biaya_id ?? ""
                : item.jenis_biaya_id ?? "",
            coa_id:
              typeof item.coa_id === "object"
                ? item.coa_id.coa_id ?? ""
                : item.coa_id ?? "",
            vendor_id:
              typeof item.vendor_id === "object"
                ? item.vendor_id.vendor_id ?? ""
                : item.vendor_id ?? "",
          };
        }),
      };

      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      if (this.parameters.form.status_mutasi === "PROSES") {
        formData.tanggal_proses = formattedDate;
      }
      if (this.parameters.form.status_mutasi === "SELESAI") {
        formData.tanggal_selesai = formattedDate;
      }

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        method: this.isEditable ? "put" : "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " + (this.isEditable ? "Diedit" : "Tambah")
          );
          if (!this.isEditable) {
            this.parameters.form = {
              no_transaksi: "",
              tanggal: "",
              mutasi_stok_details: [],
              biaya: [],

              //Tracking
              user_agent: "",
              device: "",
              longitude: "",
              latitude: "",
            };
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err.message);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.formValidate.reset();
        });
    },

    addDetailItem() {
      this.parameters.form.mutasi_stok_details.push({
        mutasi_stok_details_id: "",
        item_gudang_id: "",
        status: "",
        valuation_id: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle: "",
        slot_penyimpanan_id_rack: "",
        slot_penyimpanan_id_level: "",
        slot_penyimpanan_id_bin: "",
      });
    },

    onDeleteItem(index) {
      this.parameters.form.mutasi_stok_details =
        this.parameters.form.mutasi_stok_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    addBiayaItem() {
      if (!this.parameters.form.biaya) {
        this.$set(this.parameters.form, "biaya", []);
      }
      this.parameters.form.biaya.push({
        biaya_id: "",
        jenis_biaya_id: "",
        coa_id: "",
        vendor_id: "",
        nominal_satuan: 0,
        jumlah: 0,
        total: 0,
        keterangan: "",
      });
    },

    onDeleteBiaya(index) {
      this.parameters.form.biaya = this.parameters.form.biaya.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },

    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.itemGudang_search = search;

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
            this.itemGudang_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });
        this.isLoadingGetItemGudang = false;
      }
    },

    onGetValuation(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

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
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchZonaGudang);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.zonaGudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }
        this.onSearchZonaudang();
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
            this.zonaGudang_search +
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
            this.slot_rack_search +
            "&level=3" +
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
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchJenisBiaya = setTimeout(() => {
        this.jenis_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "custom8",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisBiaya = false;
      }
    },

    onGetCoa(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoa);

      this.isStopSearchCoa = setTimeout(() => {
        this.coa_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchCoa();
      }, 600);
    },

    async onSearchCoa() {
      if (!this.isLoadingGetCoa) {
        this.isLoadingGetCoa = true;

        await this.lookUp({
          url: "finance/coa/get-coa",
          lookup: "custom9",
          query:
            "?search=" +
            this.coa_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom10",
          query:
            "?search=" +
            this.vendor_search +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
      }
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_warehouses.current_page = isNext
            ? this.lookup_warehouses.current_page + 1
            : this.lookup_warehouses.current_page - 1;
        } else {
          this.lookup_warehouses.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "warehouses",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_warehouses.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        no_transaksi: "",
        tanggal: "",
        mutasi_stok_details: [],
        biaya: [],

        //Tracking
        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      };
    },

    async onOpenModalStokGudang() {
      if (this.parameters.form.gudang_id) {
        this.$refs.modalStokGudang.show();
        await this.$refs.modalStokGudang.onLoad();
      } else {
        this.$toaster.error("Gudang Belum Dipilih");
      }
    },

    addItem(item) {
      if (
        !this.parameters.form.mutasi_stok_details.find(
          (data) => data.stok_gudang_id === item.stok_gudang_id
        )
      ) {
        let detailItem = {
          ...item,
          nama_item: item.nama_item,
          kode_item: item.kode_item,
          quantity_asal: item.quantity,
          zona_gudang_id_asal: item.zona_gudang_id,
          slot_penyimpanan_id_aisle_asal: item.slot_penyimpanan_id_aisle,
          slot_penyimpanan_id_rack_asal: item.slot_penyimpanan_id_rack,
          slot_penyimpanan_id_level_asal: item.slot_penyimpanan_id_level,
          slot_penyimpanan_id_bin_asal: item.slot_penyimpanan_id_bin,
          kode_slot_penyimpanan_terakhir_asal:
            item.kode_slot_penyimpanan_terakhir,

          zona_gudang_id: "",
          slot_penyimpanan_id_aisle: "",
          slot_penyimpanan_id_rack: "",
          slot_penyimpanan_id_level: "",
          slot_penyimpanan_id_bin: "",
          kode_slot_penyimpanan_terakhir: "",
        };
        this.parameters.form.mutasi_stok_details.push(detailItem);
      } else {
        this.$toaster.error("Item Sudah Ditambahkan");
      }
    },

    onGetSystemStok(index) {
      // let gudang_id = this.parameters.form.gudang_id;
      console.log(this.parameters.form.mutasi_stok_details);
      let item_gudang_id =
        this.parameters.form.mutasi_stok_details[index].item_gudang_id;
      let zona_gudang_id =
        this.parameters.form.mutasi_stok_details[index].zona_gudang_id;
      let valuation_id =
        this.parameters.form.mutasi_stok_details[index].valuation_id;
      let aisle =
        this.parameters.form.mutasi_stok_details[index]
          .slot_penyimpanan_id_aisle;
      let rack =
        this.parameters.form.mutasi_stok_details[index]
          .slot_penyimpanan_id_rack;
      let level =
        this.parameters.form.mutasi_stok_details[index]
          .slot_penyimpanan_id_level;
      let bin =
        this.parameters.form.mutasi_stok_details[index].slot_penyimpanan_id_bin;

      if (
        typeof this.parameters.form.gudang_id == "object" &&
        typeof item_gudang_id == "object"
      ) {
      }
      this.parameters.form.mutasi_stok_details[index].quantity_tujuan = 0.0;
      this.$axios
        .get(
          `/inventory/stok_opname/get-stock/${this.parameters.form.gudang_id.gudang_id}/${item_gudang_id}/${zona_gudang_id}/${valuation_id}?slot_penyimpanan_id_aisle=${aisle}&slot_penyimpanan_id_bin=${bin}&slot_penyimpanan_id_level=${level}&slot_penyimpanan_id_rack=${rack}`
        )
        .then((res) => {
          if (res.data) {
            this.parameters.form.mutasi_stok_details[index].quantity_tujuan =
              res.data.quantity || 0.0;
          }
          this.onChangeStok(index);
        });
    },

    //staff
    onGetStaff(search, isNext) {
      if (!search?.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchStaff);

      this.isStopSearchStaff = setTimeout(() => {
        this.staff_search = search;

        if (typeof isNext !== "function") {
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }
        this.onSearchStaff();
      }, 600);
    },

    async onSearchStaff() {
      if (!this.isLoadingGetStaff) {
        this.isLoadingGetStaff = true;

        await this.lookUp({
          url: "master/staff/get-staff",
          lookup: "customers",
          query:
            "?search=" +
            this.staff_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_customers.current_page +
            "&per_page=10",
        });
        this.isLoadingGetStaff = false;
      }
    },

    onSelectStaff(item) {
      if (item) {
        this.parameters.form.staff_id = item || "";
        this.parameters.form.vendor_id = item.vendor_operator || "";
      } else {
        this.parameters.form.staff_id = "";
        this.parameters.form.vendor_id = "";
      }
    },
  },
};
</script>
