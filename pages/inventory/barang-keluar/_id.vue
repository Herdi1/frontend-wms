<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Barang Keluar
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Barang Keluar
        </h1>
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
          <div class="w-full grid grid-cols-2 grid-flow-row gap-2 mb-5">
            <div class="form-group" v-if="isEditable">
              <input-horizontal
                :isHorizontal="true"
                label="Kode Barang Keluar"
                type="text"
                name="kode_barang_keluar"
                :required="true"
                v-model="parameters.form.kode_barang_keluar"
                :disabled="true"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
              />
            </div>
            <select-button
              :self="{
                label: 'Gudang',
                optionLabel: 'nama_gudang',
                isLoading: isLoadingGetGudang,
                lookup: lookup_custom8,
                onGet: onGetGudang,
                value: parameters.form.gudang_id,
                input: onSelectGudang,
              }"
              width="w-[60%]"
              :required="true"
            />
            <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="Tanggal"
                type="date"
                name="tanggal"
                :required="true"
                v-model="parameters.form.tanggal"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
              />
            </div>
            <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="No Referensi 1"
                type="text"
                name="no_referensi_1"
                v-model="parameters.form.no_referensi_1"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
              />
            </div>
            <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="No Referensi 2"
                type="text"
                name="no_referensi_2"
                v-model="parameters.form.no_referensi_2"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
              />
            </div>

            <select-button
              :self="{
                label: 'Supplier',
                optionLabel: 'nama_supplier',
                isLoading: isLoadingGetSupplier,
                lookup: lookup_custom9,
                onGet: onGetSupplier,
                value: parameters.form.supplier_id,
                input: onSelectSupplier,
              }"
              width="w-[60%]"
              :required="true"
            />
            <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="Nama Supplier"
                type="text"
                name="nama_supplier"
                v-model="parameters.form.nama_supplier"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
              />
            </div>
            <!-- <select-button
              :self="{
                label: 'Pelanggan',
                optionLabel: 'nama_pelanggan',
                isLoading: isLoadingGetPelanggan,
                lookup: lookup_customers,
                onGet: onGetPelanggan,
                value: parameters.form.pelanggan_id,
                input: onSelectPelanggan,
              }"
              width="w-[60%]"
              :required="true"
            /> -->
            <!-- <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="Lokasi"
                type="text"
                name="nama_lokasi"
                :required="true"
                v-model="parameters.form.nama_lokasi"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
              />
            </div> -->
            <select-button
              :self="{
                label: 'Pengemudi',
                optionLabel: 'nama_lengkap',
                isLoading: isLoadingGetStaff,
                lookup: lookup_custom10,
                onGet: onGetStaff,
                value: parameters.form.staff_id,
                input: onSelectStaff,
              }"
              width="w-[60%]"
            />
            <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="Nama Pengemudi"
                type="text"
                name="nama_pengemudi"
                v-model="parameters.form.nama_pengemudi"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
              />
            </div>
            <select-button
              :self="{
                label: 'Kendaraan',
                optionLabel: 'nama_kendaraan',
                isLoading: isLoadingGetKendaraan,
                lookup: lookup_grade,
                onGet: onGetKendaraan,
                value: parameters.form.kendaraan_id,
                input: onSelectKendaraan,
              }"
              width="w-[60%]"
            />
            <div class="form-group">
              <input-horizontal
                :isHorizontal="true"
                label="Nama Kendaraan"
                type="text"
                name="nama_kendaraan"
                v-model="parameters.form.nama_kendaraan"
                inputWidth="w-[60%]"
                labelWidth="w-[40%]"
              />
            </div>
            <div
              class="form-group col-span-2 flex w-full justify-between items-start"
            >
              <label for="">Keterangan</label>
              <textarea
                name="keterangan"
                id="keterangan"
                placeholder="Keterangan"
                v-model="parameters.form.keterangan"
                class="w-[60%] p-1 rounded-md border border-gray-300 outline-none"
              ></textarea>
            </div>
          </div>

          <tab-component :tabs="tabs">
            <template #DetailBarangKeluar>
              <div>
                <div class="w-full flex justify-between items-center">
                  <h1 class="text-xl font-bold">Detail Barang Keluar</h1>
                  <div class="flex gap-2">
                    <!-- <button
          type="button"
          @click="addDetailProdukBahan"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Detail</p>
        </button>
        <button
          type="button"
          @click="self.onOpenModal"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Kartu Stok</p>
        </button> -->
                    <button
                      type="button"
                      @click="addBarangKeluarDetail"
                      class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                    >
                      <i class="fas fa-plus"></i>
                      <p class="text-xs font-medium">Tambah Stok Gudang</p>
                    </button>
                  </div>
                </div>
                <div class="table-responsive overflow-y-hidden mb-7">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                    :class="
                      parameters.form.barang_keluar_details.length
                        ? 'mb-[300px]'
                        : ''
                    "
                  >
                    <thead>
                      <tr class="text-sm uppercase text-nowrap">
                        <th class="w-[200px] border border-gray-300">Item</th>
                        <th class="w-[200px] border border-gray-300">Nomor</th>
                        <th class="w-[200px] border border-gray-300">
                          Quantity
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Tanggal Expired
                        </th>
                        <th class="w-[200px] border border-gray-300">Zona</th>
                        <th class="w-[200px] border border-gray-300">Aisle</th>
                        <th class="w-[200px] border border-gray-300">Rack</th>
                        <th class="w-[200px] border border-gray-300">Level</th>
                        <th class="w-[200px] border border-gray-300">Bin</th>
                        <th class="w-[300px] border border-gray-300">
                          Keterangan
                        </th>
                        <th class="w-[200px] border border-gray-300">
                          Alasan Retur
                        </th>
                        <th class="w-[100px] border border-gray-300">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in parameters.form
                          .barang_keluar_details"
                        :key="index"
                        class="align-top"
                      >
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_item"
                            :loading="isLoadingGetItemGudang"
                            :options="lookup_custom7.data"
                            :filterable="false"
                            @search="onGetItemGudang"
                            v-model="item.item_gudang_id"
                            @input="(item) => onSelectItemGudang(item, index)"
                            class="w-full mb-2"
                          >
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom7.data.length || search"
                            >
                              <span
                                v-if="lookup_custom7.current_page > 1"
                                @click="onGetItemGudang(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom7.last_page >
                                  lookup_custom7.current_page
                                "
                                @click="onGetItemGudang(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300 text-start">
                          <p>Serial Number:</p>
                          <div>
                            <input
                              v-model="item.serial_number"
                              class="w-full pl-2 py-1 border rounded focus:outline-none"
                            />
                          </div>
                        </td>
                        <td class="border border-gray-300 text-start">
                          <p class="mb-2">Quantity</p>
                          <money
                            v-model="item.quantity"
                            class="w-full mb-2 pl-2 py-1 border rounded focus:outline-none"
                            :class="
                              item.quantity > parseFloat(item.quantity_sisa)
                                ? 'text-danger'
                                : ''
                            "
                            @keydown.native="
                              $event.key === '-'
                                ? $event.preventDefault()
                                : null
                            "
                          />
                          <p class="mb-2">
                            Quantity Tersedia :
                            <span class="text-primary">{{
                              item.quantity_sisa
                            }}</span>
                          </p>
                          <p class="mb-2">
                            Valuation :
                            <!-- <span class="text-primary">{{
                              item.kode_valuation
                            }}</span> -->
                          </p>
                          <select
                            name="valuation_id"
                            id="valuation_id"
                            v-model="item.valuation_id"
                            class="w-full p-1 rounded-sm outline-none border border-gray-300"
                          >
                            <option
                              v-for="(item, index) in lookup_custom6.data"
                              :key="index"
                              :value="item.valuation_id"
                            >
                              {{ item.nama_valuation }}
                            </option>
                          </select>
                          <!-- <v-select
                            label="nama_valuation"
                            :loading="isLoadingGetValuation"
                            :options="lookup_custom6.data"
                            :filterable="false"
                            @search="onGetValuation"
                            v-model="item.valuation_id"
                            @input="(item) => onSelectValuation(item, index)"
                            class="w-full mb-2"
                          >
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom6.data.length || search"
                            >
                              <span
                                v-if="lookup_custom6.current_page > 1"
                                @click="onGetValuation(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom6.last_page >
                                  lookup_custom6.current_page
                                "
                                @click="onGetValuation(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select> -->
                        </td>
                        <td class="border border-gray-300">
                          <input
                            class="w-full p-1 rounded-md border border-gray-300"
                            type="date"
                            v-model="item.tanggal_expired"
                          />
                        </td>
                        <!-- <td class="border border-gray-300">
                          {{ item.lokasi_penyimpanan }}
                        </td> -->
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_zona_gudang"
                            :loading="isLoadingGetZonaPlan"
                            :options="lookup_custom1.data"
                            :filterable="false"
                            @search="onGetZonaPlan"
                            v-model="item.zona_gudang_id"
                            class="w-full"
                            @input="(item) => onSelectZonaPlan(item, index)"
                          >
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom1.data.length || search"
                            >
                              <span
                                v-if="lookup_custom1.current_page > 1"
                                @click="onGetZonaPlan(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom1.last_page >
                                  lookup_custom1.current_page
                                "
                                @click="onGetZonaPlan(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_slot_penyimpanan"
                            :loading="isLoadingGetSlotAisle"
                            :options="lookup_custom2.data"
                            :filterable="false"
                            @search="onGetSlotAisle(index)"
                            v-model="item.slot_penyimpanan_id_aisle"
                            @input="(item) => onSelectAislePlan(item, index)"
                            class="w-full"
                          >
                            <template slot="option" slot-scope="option">
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <template
                              slot="selected-option"
                              slot-scope="option"
                            >
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom2.data.length || search"
                            >
                              <span
                                v-if="lookup_custom2.current_page > 1"
                                @click="onGetSlotAisle(index, search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom2.last_page >
                                  lookup_custom2.current_page
                                "
                                @click="onGetSlotAisle(index, search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_slot_penyimpanan"
                            :loading="isLoadingGetSlotRack"
                            :options="lookup_custom3.data"
                            :filterable="false"
                            @search="onGetSlotRack(index)"
                            v-model="item.slot_penyimpanan_id_rack"
                            @input="(item) => onSelectRackPlan(item, index)"
                            class="w-full"
                          >
                            <template slot="option" slot-scope="option">
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <template
                              slot="selected-option"
                              slot-scope="option"
                            >
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom3.data.length || search"
                            >
                              <span
                                v-if="lookup_custom3.current_page > 1"
                                @click="onGetSlotRack(index, search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom3.last_page >
                                  lookup_custom3.current_page
                                "
                                @click="onGetSlotRack(index, search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_slot_penyimpanan"
                            :loading="isLoadingGetSlotLevel"
                            :options="lookup_custom4.data"
                            :filterable="false"
                            @search="onGetSlotLevel(index)"
                            v-model="item.slot_penyimpanan_id_level"
                            @input="(item) => onSelectLevelPlan(item, index)"
                            class="w-full"
                          >
                            <template slot="option" slot-scope="option">
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <template
                              slot="selected-option"
                              slot-scope="option"
                            >
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom4.data.length || search"
                            >
                              <span
                                v-if="lookup_custom4.current_page > 1"
                                @click="onGetSlotLevel(index, search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom4.last_page >
                                  lookup_custom4.current_page
                                "
                                @click="onGetSlotLevel(index, search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_slot_penyimpanan"
                            :loading="isLoadingGetSlotBin"
                            :options="lookup_custom5.data"
                            :filterable="false"
                            @search="onGetSlotBin(index)"
                            v-model="item.slot_penyimpanan_id_bin"
                            class="w-full"
                          >
                            <template slot="option" slot-scope="option">
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <template
                              slot="selected-option"
                              slot-scope="option"
                            >
                              {{
                                option.nama_slot_penyimpanan +
                                " - " +
                                option.kode_slot_penyimpanan
                              }}
                            </template>
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_custom5.data.length || search"
                            >
                              <span
                                v-if="lookup_custom5.current_page > 1"
                                @click="onGetSlotBin(index, search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_custom5.last_page >
                                  lookup_custom5.current_page
                                "
                                @click="onGetSlotBin(index, search, true)"
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
                        <td class="border border-gray-300">
                          <v-select
                            label="nama_alasan_beda_plan"
                            :loading="isLoadingGetAlasanBedaPlan"
                            :options="lookup_beam.data"
                            :filterable="false"
                            @search="onGetAlasanBedaPlan(index)"
                            v-model="item.alasan_beda_plan_id"
                            class="w-full"
                          >
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_beam.data.length || search"
                            >
                              <span
                                v-if="lookup_beam.current_page > 1"
                                @click="
                                  onGetAlasanBedaPlan(index, search, false)
                                "
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_beam.last_page >
                                  lookup_beam.current_page
                                "
                                @click="
                                  onGetAlasanBedaPlan(index, search, true)
                                "
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td class="border border-gray-300 text-center">
                          <i
                            class="fas fa-trash mx-auto"
                            style="cursor: pointer"
                            @click="deleteDetailBarangKeluar(index)"
                          ></i>
                        </td>
                      </tr>
                      <tr
                        v-if="!parameters.form.barang_keluar_details.length > 0"
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
              </div>
            </template>
            <!-- <template #DetailProdukJadi>
              <DetailProdukJadi :self="{ parameters }" />
            </template> -->
          </tab-component>

          <modal-footer-section
            class="mt-5"
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
          />
        </form>
      </ValidationObserver>
    </div>
    <!-- <ModalKartuStok :self="this" ref="modalKartuStok" />
    <ModalStokGudang :self="this" ref="modalStokGudang" /> -->
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";

export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        { name: "Detail Barang Keluar", slotName: "DetailBarangKeluar" },
        // { name: "DETAIL PRODUK JADI", slotName: "DetailProdukJadi" },
        // { name: "BIAYA KONVERSI", slotName: "BiayaKonversi" },
      ],
      id,

      user: this.$auth.user,

      isStopSearchStatus: false,
      isLoadingGetStatus: false,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Barang Keluar",
      parameters: {
        url: "inventory/barang-keluar",
        form: {
          kode_barang_keluar: "",
          tanggal: "",
          no_referensi_1: "",
          no_referensi_2: "",
          gudang_id: "",
          supplier_id: "",
          nama_supplier: "",
          pelanggan_id: "",
          lokasi_id: "",
          staff_id: "",
          kendaraan_id: "",
          nama_lokasi: "",
          nama_pengemudi: "",
          nama_kendaraan: "",
          keterangan: "",
          barang_keluar_details: [],

          user_agent: "",
          device: "",
          latitude: "",
          longitude: "",
        },
      },

      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

      isStopSearchZonaPlan: false,
      isLoadingGetZonaPlan: false,
      zona_plan_search: "",

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

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchSupplier: false,
      isLoadingGetSupplier: false,
      supplier_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchStaff: false,
      isLoadingGetStaff: false,
      staff_search: "",

      isStopSearchKendaraan: false,
      isLoadingGetKendaraan: false,
      kendaraan_search: "",

      isStopSearchAlasanBedaPlan: false,
      isLoadingGetAlasanBedaPlan: false,
      alasan_beda_plan_search: "",
    };
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchSupplier();
    await this.onSearchPelanggan();
    await this.onSearchStaff();
    await this.onSearchKendaraan();
    await this.onSearchValuation();
    await this.onSearchAlasanBedaPlan();
    // await this.onSearchItemGudang();
    // await this.onSearchZonaPlan();
    // await this.onSearchSlotAisle();
    // await this.onSearchSlotRack();
    // await this.onSearchSlotLevel();
    // await this.onSearchSlotBin();

    this.getUserAgent();
    this.getGeoLocation();
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
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          if (item !== "barang_keluar_details") {
            this.parameters.form[item] = res.data[item];
          }
        });

        this.parameters.form.gudang_id = res.data.gudang ?? "";
        this.parameters.form.supplier_id = res.data.supplier ?? "";
        this.parameters.form.pelanggan_id = res.data.pelanggan ?? "";
        this.parameters.form.staff_id = res.data.staff ?? "";
        this.parameters.form.kendaraan_id = res.data.kendaraan ?? "";
        this.parameters.form.lokasi_id = res.data.lokasi ?? "";

        this.parameters.form.barang_keluar_details =
          res.data.barang_keluar_details.map((item) => {
            return {
              ...item,
              barang_keluar_detail_id: item,
              item_id: item.item_id,
              item_gudang_id: item.item_gudang ?? "",
              zona_gudang_id: item.zona_gudang ?? "",
              slot_penyimpanan_id_aisle: item.slot_penyimpanan_aisle ?? "",
              slot_penyimpanan_id_rack: item.slot_penyimpanan_rack ?? "",
              slot_penyimpanan_id_level: item.slot_penyimpanan_level ?? "",
              slot_penyimpanan_id_bin: item.slot_penyimpanan_bin ?? "",
              shipment_id: item.shipment ?? "",
              alasan_beda_plan_id: item.alasan_beda_plan ?? "",
              // valuation_id: item.valuation ?? "",
              kode_valuation: item.kode_valuation ?? "",
            };
          });

        this.isLoadingPage = false;
      }
    } catch (error) {
      // this.$router.back();
      console.log(error);
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //zona
      "lookup_custom2", //aisle
      "lookup_custom3", //rack
      "lookup_custom4", //level
      "lookup_custom5", //bin
      "lookup_custom6", //valuation
      "lookup_custom7", //item gudang
      "lookup_custom8", //gudang
      "lookup_custom9", //supplier
      "lookup_custom10", //lokasi
      "lookup_grade", //staff
      "lookup_beam", //kendaraan
      "lookup_customers", //pelanggan
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.parameters.form.user_agent = navigator.userAgent;
      if (this.parameters.form.user_agent.includes("Mobile")) {
        this.parameters.form.device = "Mobile";
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
      let url = "inventory/barang-keluar";

      let formData = {
        ...this.parameters.form,
        gudang_id:
          typeof this.parameters.form.gudang_id === "object"
            ? this.parameters.form.gudang_id.gudang_id
            : this.parameters.form.gudang_id,
        supplier_id:
          typeof this.parameters.form.supplier_id === "object"
            ? this.parameters.form.supplier_id.supplier_id
            : this.parameters.form.supplier_id,
        pelanggan_id:
          typeof this.parameters.form.pelanggan_id === "object"
            ? this.parameters.form.pelanggan_id.pelanggan_id
            : this.parameters.form.pelanggan_id,
        staff_id:
          typeof this.parameters.form.staff_id === "object"
            ? this.parameters.form.staff_id.staff_id
            : this.parameters.form.staff_id,
        kendaraan_id:
          typeof this.parameters.form.kendaraan_id === "object"
            ? this.parameters.form.kendaraan_id.kendaraan_id
            : this.parameters.form.kendaraan_id,
        // lokasi_id:
        //   typeof this.parameters.form.lokasi_id === "object"
        //     ? this.parameters.form.lokasi_id.lokasi_id
        //     : this.parameters.form.lokasi_id,
      };

      formData.barang_keluar_details =
        this.parameters.form.barang_keluar_details.map((item) => {
          return {
            ...item,
            barang_keluar_detail_id:
              typeof item.barang_keluar_detail_id === "object"
                ? item.barang_keluar_detail_id.barang_keluar_detail_id
                : "",
            keterangan: item.keterangan || "",
            item_id: item.item_id,
            item_pelanggan_id:
              typeof item.item_gudang_id === "object"
                ? item.item_gudang_id.item_pelanggan_id ?? ""
                : "",
            item_gudang_id:
              typeof item.item_gudang_id === "object"
                ? item.item_gudang_id.item_gudang_id
                : "",
            zona_gudang_id:
              typeof item.zona_gudang_id === "object"
                ? item.zona_gudang_id.zona_gudang_id
                : "",
            slot_penyimpanan_id_aisle:
              typeof item.slot_penyimpanan_id_aisle === "object"
                ? item.slot_penyimpanan_id_aisle.slot_penyimpanan_id
                : "",
            slot_penyimpanan_id_rack:
              typeof item.slot_penyimpanan_id_rack === "object"
                ? item.slot_penyimpanan_id_rack.slot_penyimpanan_id
                : "",
            slot_penyimpanan_id_level:
              typeof item.slot_penyimpanan_id_level === "object"
                ? item.slot_penyimpanan_id_level.slot_penyimpanan_id
                : "",
            slot_penyimpanan_id_bin:
              typeof item.slot_penyimpanan_id_bin === "object"
                ? item.slot_penyimpanan_id_bin.slot_penyimpanan_id
                : "",
            shipment_id:
              typeof item.shipment_id === "object"
                ? item.shipment_id.shipment_id
                : "",
            alasan_beda_plan_id:
              typeof item.alasan_beda_plan_id === "object"
                ? item.alasan_beda_plan_id.alasan_beda_plan_id
                : "",
            valuation_id:
              typeof item.valuation_id === "object"
                ? item.valuation_id.valuation_id
                : item.valuation_id,
          };
        });

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
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );

          this.isEditable = false;
          this.parameters.form = {
            kode_barang_keluar: "",
            tanggal: "",
            no_referensi_1: "",
            no_referensi_2: "",
            gudang_id: "",
            supplier_id: "",
            pelanggan_id: "",
            lokasi_id: "",
            staff_id: "",
            kendaraan_id: "",
            nama_lokasi: "",
            nama_pengemudi: "",
            nama_kendaraan: "",
            keterangan: "",
            barang_keluar_details: [],
          };
          this.$refs.formValidate.reset();
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_barang_keluar: "",
        tanggal: "",
        no_referensi_1: "",
        no_referensi_2: "",
        gudang_id: "",
        supplier_id: "",
        pelanggan_id: "",
        lokasi_id: "",
        staff_id: "",
        kendaraan_id: "",
        nama_lokasi: "",
        nama_pengemudi: "",
        nama_kendaraan: "",
        keterangan: "",
        barang_keluar_details: [],
      };
    },

    onGetValuation(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchValuation);

      this.isStopSearchValuation = setTimeout(() => {
        this.valuation_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchValuation();
      }, 600);
    },

    async onSearchValuation() {
      if (!this.isLoadingGetValuation) {
        this.isLoadingGetValuation = true;

        await this.lookUp({
          url: "master/valuation/get-valuation",
          lookup: "custom6",
          query:
            "?search=" +
            this.valuation_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetValuation = false;
      }
    },

    onSelectValuation(item, index) {
      if (item) {
        this.parameters.form.barang_keluar_details[index].valuation_id = item;
        this.parameters.form.barang_keluar_details[index].kode_valuation =
          item.kode_valuation;
      } else {
        this.parameters.form.barang_keluar_details[index].valuation_id = "";
        this.parameters.form.barang_keluar_details[index].kode_valuation = "";
      }
    },

    // Get zona plan
    onGetZonaPlan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchZonaPlan);

      this.isStopSearchZonaPlan = setTimeout(() => {
        this.zona_plan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchZonaPlan();
      }, 600);
    },

    async onSearchZonaPlan() {
      if (!this.isLoadingGetZonaPlan) {
        this.isLoadingGetZonaPlan = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.zona_plan_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaPlan = false;
      }
    },

    async onSelectZonaPlan(item, index) {
      if (item) {
        this.parameters.form.barang_keluar_details[index].zona_gudang_id = item;
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_aisle = "";
        await this.onSearchSlotAisle(index);
      } else {
        this.parameters.form.barang_keluar_details[index].zona_gudang_id = "";
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_aisle = "";
      }
    },

    // Get slot aisle
    onGetSlotAisle(index, search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotAisle);

      this.isStopSearchSlotAisle = setTimeout(() => {
        this.slot_aisle_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchSlotAisle(index);
      }, 600);
    },

    async onSearchSlotAisle(index) {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom2",
          query:
            "?search=" +
            this.slot_aisle_search +
            "&level=1" +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.form.barang_keluar_details[index].zona_gudang_id
              .zona_gudang_id +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    async onSelectAislePlan(item, index) {
      if (item) {
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_aisle = item;
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_rack = "";
        await this.onSearchSlotRack(index);
      } else {
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_aisle = "";
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_rack = "";
      }
    },

    // Get slot rack
    onGetSlotRack(index, search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotRack);

      this.isStopSearchSlotRack = setTimeout(() => {
        this.slot_rack_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchSlotRack(index);
      }, 600);
    },

    async onSearchSlotRack(index) {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom3",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=2" +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.form.barang_keluar_details[index].zona_gudang_id
              .zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.parameters.form.barang_keluar_details[index]
              .slot_penyimpanan_id_aisle.slot_penyimpanan_id +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    async onSelectRackPlan(item, index) {
      if (item) {
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_rack = item;
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_level = "";
        await this.onSearchSlotLevel(index);
      } else {
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_rack = "";
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_level = "";
      }
    },

    // Get slot level
    onGetSlotLevel(index, search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotLevel);

      this.isStopSearchSlotLevel = setTimeout(() => {
        this.slot_level_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchSlotLevel(index);
      }, 600);
    },

    async onSearchSlotLevel(index) {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom4",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=3" +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.form.barang_keluar_details[index].zona_gudang_id
              .zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.parameters.form.barang_keluar_details[index]
              .slot_penyimpanan_id_rack.slot_penyimpanan_id +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    async onSelectLevelPlan(item, index) {
      if (item) {
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_level = item;
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_bin = "";
        await this.onSearchSlotBin(index);
      } else {
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_level = "";
        this.parameters.form.barang_keluar_details[
          index
        ].slot_penyimpanan_id_bin = "";
      }
    },

    // Get slot level
    onGetSlotBin(index, search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotBin);

      this.isStopSearchSlotBin = setTimeout(() => {
        this.slot_bin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchSlotBin(index);
      }, 600);
    },

    async onSearchSlotBin(index) {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom5",
          query:
            "?search=" +
            this.slot_bin_search +
            "&level=4" +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.form.barang_keluar_details[index].zona_gudang_id
              .zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.parameters.form.barang_keluar_details[index]
              .slot_penyimpanan_id_level.slot_penyimpanan_id +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    // get item gudang
    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.item_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "custom7",
          query:
            "?search=" +
            this.item_gudang_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItemGudang = false;
      }
    },

    onSelectItemGudang(item, index) {
      if (item) {
        this.parameters.form.barang_keluar_details[index].item_gudang_id = item;
        this.parameters.form.barang_keluar_details[index].item_id =
          item.item_id;
      } else {
        this.parameters.form.barang_keluar_details[index].item_gudang_id = "";
      }
    },

    // get  gudang
    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang-user",
          lookup: "custom8",
          query:
            "?search=" +
            this.gudang_search +
            "&user_id=" +
            this.user.user_id +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    async onSelectGudang(item) {
      if (item) {
        this.parameters.form.gudang_id = item;
        this.parameters.form.barang_keluar_details = [];
        await this.onSearchZonaPlan();
        await this.onSearchItemGudang();
      } else {
        this.parameters.form.gudang_id = "";
      }
    },

    // get  Supplier
    onGetSupplier(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSupplier);

      this.isStopSearchSupplier = setTimeout(() => {
        this.supplier_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchSupplier();
      }, 600);
    },

    async onSearchSupplier() {
      if (!this.isLoadingGetSupplier) {
        this.isLoadingGetSupplier = true;

        await this.lookUp({
          url: "master/supplier/get-supplier",
          lookup: "custom9",
          query:
            "?search=" +
            this.supplier_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSupplier = false;
      }
    },

    onSelectSupplier(item) {
      if (item) {
        this.parameters.form.supplier_id = item;
        this.parameters.form.nama_supplier = item.nama_supplier;
      } else {
        this.parameters.form.supplier_id = "";
        this.parameters.form.nama_supplier = "";
      }
    },

    // get  Pelanggan
    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }

        this.onSearchPelanggan();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "customers",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_customers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    onSelectPelanggan(item) {
      if (item) {
        this.parameters.form.pelanggan_id = item;
        this.parameters.form.lokasi_id = item.lokasi ?? item.lokasi_id;
        this.parameters.form.nama_lokasi = item.lokasi
          ? item.lokasi.nama_lokasi
          : "";
      } else {
        this.parameters.form.pelanggan_id = "";
        this.parameters.form.lokasi_id = "";
        this.parameters.form.nama_lokasi = "";
      }
    },

    // get  staff
    onGetStaff(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchStaff);

      this.isStopSearchStaff = setTimeout(() => {
        this.staff_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchStaff();
      }, 600);
    },

    async onSearchStaff() {
      if (!this.isLoadingGetStaff) {
        this.isLoadingGetStaff = true;

        await this.lookUp({
          url: "master/staff/get-staff",
          lookup: "custom10",
          query:
            "?search=" +
            this.staff_search +
            "&jenis_user=pengemudi" +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetStaff = false;
      }
    },

    onSelectStaff(item) {
      if (item) {
        this.parameters.form.staff_id = item;
        this.parameters.form.nama_pengemudi = item.nama_lengkap ?? "";
      } else {
        this.parameters.form.staff_id = "";
        this.parameters.form.nama_pengemudi = "";
      }
    },

    // get  Kendaraan
    onGetKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKendaraan);

      this.isStopSearchKendaraan = setTimeout(() => {
        this.kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchKendaraan();
      }, 600);
    },

    async onSearchKendaraan() {
      if (!this.isLoadingGetKendaraan) {
        this.isLoadingGetKendaraan = true;

        await this.lookUp({
          url: "master/kendaraan/get-kendaraan",
          lookup: "grade",
          query:
            "?search=" +
            this.kendaraan_search +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKendaraan = false;
      }
    },

    onSelectKendaraan(item) {
      if (item) {
        this.parameters.form.kendaraan_id = item;
        this.parameters.form.nama_kendaraan = item.nama_kendaraan ?? "";
      } else {
        this.parameters.form.kendaraan_id = "";
        this.parameters.form.nama_kendaraan = "";
      }
    },

    // get  AlasanBedaPlan
    onGetAlasanBedaPlan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchAlasanBedaPlan);

      this.isStopSearchAlasanBedaPlan = setTimeout(() => {
        this.alasan_beda_plan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchAlasanBedaPlan();
      }, 600);
    },

    async onSearchAlasanBedaPlan() {
      if (!this.isLoadingGetAlasanBedaPlan) {
        this.isLoadingGetAlasanBedaPlan = true;

        await this.lookUp({
          url: "master/alasan-beda-plan/get-alasan-beda-plan",
          lookup: "beam",
          query:
            "?search=" +
            this.alasan_beda_plan_search +
            "&tipe_alasan_id=4" +
            "&page=" +
            this.lookup_beam.current_page +
            "&per_page=10",
        });

        this.isLoadingGetAlasanBedaPlan = false;
      }
    },

    //add barang detail
    addBarangKeluarDetail() {
      this.parameters.form.barang_keluar_details.push({
        item_id: "",
        item_gudang_id: "",
        item_pelanggan_id: "",
        shipment_id: "",
        shipment_detail_id: "",
        supplier_id: "",
        alasan_beda_plan_id: "",
        tanggal_expired: "",
        valuation_id: "",
        kode_valuation: "",
        serial_number: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle: "",
        slot_penyimpanan_id_rack: "",
        slot_penyimpanan_id_level: "",
        slot_penyimpanan_id_bin: "",
        quantity: "",
        keterangan: "",
      });
    },

    deleteDetailBarangKeluar(index) {
      this.parameters.form.barang_keluar_details =
        this.parameters.form.barang_keluar_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    async onOpenModal() {
      if (this.parameters.form.gudang_id) {
        this.$refs.modalKartuStok.show();
        await this.$refs.modalKartuStok.onLoad();
      } else {
        this.$toaster.error("Gudang Belum Dipilih");
      }
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
        !this.parameters.form.barang_keluar_details.find(
          (data) => data.stok_gudang_id === item.stok_gudang_id
        )
      ) {
        let detailItem = {
          ...item,
          nama_item: item.item_gudang
            ? item.item_gudang.nama_item
            : item.nama_item,
          kode_item: item.item_gudang
            ? item.item_gudang.kode_item
            : item.kode_item,
          quantity_sisa: item.quantity_sisa
            ? item.quantity_sisa
            : item.quantity,
          lokasi_penyimpanan: item.kode_slot_penyimpanan_terakhir
            ? item.kode_slot_penyimpanan_terakhir
            : `${item.zona_gudang.nama_zona_gudang} - ${item.zona_gudang.kode_zona_gudang}`,
        };
        this.parameters.form.barang_keluar_details.push(detailItem);
      } else {
        this.$toaster.error("Item Sudah Ditambahkan");
      }
    },

    getEstimasiLamaPengerjaan() {
      const start = new Date(this.parameters.form.tanggal_mulai);
      const end = new Date(this.parameters.form.tanggal_selesai);

      const diffMils = end - start;

      // const lamaPengerjaan =
      //   Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
      //   Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());

      const oneDayInMilis = 1000 * 60 * 60 * 24;
      const msInHour = 1000 * 60 * 60;
      const msInMinute = 1000 * 60;

      const days = Math.floor(diffMils / oneDayInMilis) ?? 0;
      const remainingOfDay = diffMils % oneDayInMilis;

      const hours = Math.floor(remainingOfDay / msInHour) ?? 0;
      const remainingOfHour = remainingOfDay % msInHour;

      const minutes = Math.floor(remainingOfHour / msInMinute) ?? 0;

      this.parameters.form.lama_pengerjaan = `${days} hari, ${hours} jam, ${minutes} menit`;
    },

    getEstimasiSelesai() {
      const start = new Date(this.parameters.form.tanggal_mulai);

      const lamaPengerjaanInMilis =
        (this.parameters.form.lama_pengerjaan - 1) * 1000 * 60 * 60 * 24;
      const estimasiSelesai =
        Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()) +
        lamaPengerjaanInMilis;

      const estimasiDate = new Date(estimasiSelesai);

      const year = estimasiDate.getFullYear();
      const month = (estimasiDate.getMonth() + 1).toString().padStart(2, "0");
      const day = estimasiDate.getDate().toString().padStart(2, "0");

      this.parameters.form.tanggal_selesai = `${year}-${month}-${day}`;
    },

    setTanggalMulai() {
      if (this.parameters.form.tanggal_selesai) {
        this.getEstimasiLamaPengerjaan();
      } else if (this.parameters.form.lama_pengerjaan) {
        this.getEstimasiSelesai();
      } else {
        return;
      }
    },
  },
};
</script>
