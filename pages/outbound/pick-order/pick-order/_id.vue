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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
              <div v-if="isEditable">
                <input-horizontal
                  label="Kode Pick Order"
                  type="text"
                  name="kode_pick_order"
                  :isHorizontal="true"
                  v-model="parameters.form.kode_pick_order"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Tanggal"
                  type="date"
                  name="tanggal"
                  v-model="parameters.form.tanggal"
                  :required="false"
                  :disabled="true"
                />
              </div>

              <div class="form-group">
                <input-horiontal
                  label="Nomor Referensi"
                  type="text"
                  name="no_referensi_1"
                  v-model="parameters.form.no_referensi_1"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Nomor Referensi 2"
                  type="text"
                  name="no_referensi_2"
                  v-model="parameters.form.no_referensi_2"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-horiontal
                  label="Nomor Referensi 3"
                  type="text"
                  name="no_referensi_3"
                  v-model="parameters.form.no_referensi_3"
                  :required="false"
                />
              </div>
              <div>
                <select-button
                  :self="{
                    label: 'Gudang',
                    optionLabel: 'nama_gudang',
                    lookup: lookup_custom7,
                    value: parameters.form.gudang_id,
                    onGet: onGetGudang,
                    isLoadingL: isLoadingGetGudang,
                    input: onSelectGudang,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                  :required="true"
                />
              </div>
              <ValidationProvider name="user_pic">
                <select-button
                  :self="{
                    label: 'User PIC',
                    optionLabel: 'nama_lengkap',
                    lookup: lookup_custom1,
                    value: parameters.form.user_id_pic,
                    onGet: onGetUser,
                    isLoadingL: isLoadingGetUser,
                    input: onSelectUser,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                  :required="true"
                />
              </ValidationProvider>
              <div class="form-group">
                <select-button
                  :self="{
                    label: 'Staff',
                    optionLabel: 'nama_lengkap',
                    lookup: lookup_custom5,
                    value: parameters.form.staff_id_pic,
                    onGet: onGetStaff,
                    isLoadingL: isLoadingGetStaff,
                    input: onSelectStaff,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                  :required="true"
                />
              </div>
              <div class="form-group">
                <select-button
                  :self="{
                    label: 'Peralatan',
                    optionLabel: 'nama_peralatan',
                    lookup: lookup_custom6,
                    value: parameters.form.peralatan_id,
                    onGet: onGetPeralatan,
                    isLoadingL: isLoadingGetPeralatan,
                    input: onSelectPeralatan,
                  }"
                  width="w-[50%]"
                  class="mb-5"
                  :required="true"
                />
              </div>
              <div class="flex px-1">
                <label for="keterangan" class="block mb-2 w-1/2"
                  >Keterangan</label
                >
                <textarea
                  placeholder="Keterangan "
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.keterangan"
                ></textarea>
              </div>
            </div>
          </div>
          <div
            class="mb-3 mt-7 text-xl font-bold uppercase flex justify-between items-start w-full"
          >
            <span class="w-1/2"><h1>Pick Order Detail</h1></span>
            <div class="w-full relative flex justify-end gap-2">
              <button
                type="button"
                @click="onOpenModalPickRequest"
                class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
              >
                <i class="fas fa-plus"></i>
                <p class="text-xs font-medium">Pick Order Detail</p>
              </button>
            </div>
          </div>
          <!-- <div
            class="bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm flex justify-between items-center"
          >
          <div class="w-1/2">
              <select-button
                :self="{
                  label: 'Pick Request',
                  optionLabel: 'nama_peminta',
                  lookup: lookup_custom4,
                  value: parameters.form.pick_request_id,
                  onGet: onGetPickRequest,
                  isLoadingL: isLoadingGetPickRequest,
                  input: onSelectPickRequest,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
          </div> -->
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                :class="
                  parameters.form.pick_order_details.length ? 'mb-48' : ''
                "
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <!-- <th class="w-60 border border-gray-300">
                      Kode Pick Request
                    </th>
                    <th class="w-60 border border-gray-300">Tanggal</th> -->
                    <th class="w-60 border border-gray-300">Kode Item</th>
                    <th class="w-60 border border-gray-300">Nama Item</th>
                    <th class="w-40 border border-gray-300">Jenis Transaksi</th>
                    <th class="w-60 border border-gray-300">Valuation</th>
                    <th class="w-60 border border-gray-300">Zona Asal</th>
                    <th class="w-60 border border-gray-300">
                      Lokasi Penyimpanan Asal
                    </th>
                    <th class="w-60 border border-gray-300">
                      Quantity Request
                    </th>
                    <th class="w-60 border border-gray-300">Quantity</th>
                    <th class="w-60 border border-gray-300">Zona Tujuan</th>
                    <!-- <th class="w-60 border border-gray-300">
                      Lokasi Penyimpanan Tujuan
                    </th> -->
                    <th class="w-60 border border-gray-300">Keterangan</th>
                    <th class="w-20 border border-gray-300 text-center">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in parameters.form.pick_order_details"
                    :key="i"
                    class="border-t border-gray-400 align-top"
                  >
                    <!-- <td class="border border-gray-300">
                      {{ item.kode_pick_request }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.tanggal }}
                    </td> -->
                    <td class="border border-gray-300">
                      {{ item.kode_item }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.nama_item }}
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
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_valuation"
                        :loading="isLoadingGetValuation"
                        :options="lookup_custom2.data"
                        :filterable="false"
                        @search="onGetValuation"
                        v-model="item.valuation_id"
                        :reduce="(item) => item.valuation_id"
                      >
                        <!-- @input="onSelectItem(i)" -->
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
                              lookup_custom2.last_page >
                              lookup_custom2.current_page
                            "
                            @click="onGetValuation(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>

                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_zona_gudang"
                        :loading="isLoadingGetZonaGudang"
                        :options="lookup_custom3.data"
                        :filterable="false"
                        @search="onGetZonaGudang"
                        v-model="item.zona_gudang_id"
                        @input="(item) => onSelectZona(item, i)"
                      >
                        <!-- :reduce="(item) => item.zona_gudang_id" -->
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
                              lookup_custom3.last_page >
                              lookup_custom3.current_page
                            "
                            @click="onGetZonaGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>

                    <td class="border border-gray-300">
                      <div>
                        <label for="">Lokasi Aisle</label>
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotAisle"
                          :options="lookup_custom8.data"
                          :filterable="false"
                          @search="onGetSlotAisle"
                          v-model="item.slot_penyimpanan_id_aisle"
                          @input="(item) => onSelectAisle(item, i)"
                        >
                          <!-- :reduce="(item) => item.slot_penyimpanan_id" -->
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom8.data.length || search"
                          >
                            <span
                              v-if="lookup_custom8.current_page > 1"
                              @click="onGetSlotAisle(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom8.last_page >
                                lookup_custom8.current_page
                              "
                              @click="onGetSlotAisle(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                      <div class="mt-1">
                        <label for="">Lokasi Rack</label>
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotRack"
                          :options="lookup_custom9.data"
                          :filterable="false"
                          @search="onGetSlotRack"
                          v-model="item.slot_penyimpanan_id_rack"
                          @input="(item) => onSelectRack(item, i)"
                        >
                          <!-- :reduce="(item) => item.slot_penyimpanan_id" -->
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom9.data.length || search"
                          >
                            <span
                              v-if="lookup_custom9.current_page > 1"
                              @click="onGetSlotRack(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom9.last_page >
                                lookup_custom9.current_page
                              "
                              @click="onGetSlotRack(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                      <div class="mt-1">
                        <label for="">Lokasi Level</label>
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotLevel"
                          :options="lookup_custom10.data"
                          :filterable="false"
                          @search="onGetSlotLevel"
                          v-model="item.slot_penyimpanan_id_level"
                          @input="(item) => onSelectLevel(item, i)"
                        >
                          <!-- :reduce="(item) => item.slot_penyimpanan_id" -->
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom10.data.length || search"
                          >
                            <span
                              v-if="lookup_custom10.current_page > 1"
                              @click="onGetSlotLevel(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom10.last_page >
                                lookup_custom10.current_page
                              "
                              @click="onGetSlotLevel(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                      <div class="mt-1">
                        <label for="">Lokasi Bin</label>
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotBin"
                          :options="lookup_roles.data"
                          :filterable="false"
                          @search="onGetSlotBin"
                          v-model="item.slot_penyimpanan_id_bin"
                          @input="(item) => onSelectBin(item, i)"
                        >
                          <!-- :reduce="(item) => item.slot_penyimpanan_id" -->
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_roles.data.length || search"
                          >
                            <span
                              v-if="lookup_roles.current_page > 1"
                              @click="onGetSlotBin(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_roles.last_page >
                                lookup_roles.current_page
                              "
                              @click="onGetSlotBin(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                      <div class="mt-5">
                        <money
                          v-model="item.stok"
                          class="w-full pl-2 py-1 border rounded focus:outline-none"
                          @keydown.native="
                            $event.key === '-' ? $event.preventDefault() : null
                          "
                          disabled
                        />
                      </div>
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.quantity"
                        class="w-full mb-2 pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                        disabled
                      />
                    </td>
                    <td class="border border-gray-300">
                      <money
                        v-model="item.sisa_quantity"
                        class="w-full mb-2 pl-2 py-1 border rounded focus:outline-none"
                        :class="
                          item.quantity < parseFloat(item.sisa_quantity) ||
                          item.stok < parseFloat(item.sisa_quantity)
                            ? 'text-danger'
                            : ''
                        "
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </td>
                    <td class="border border-gray-300">
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_zona_gudang"
                        :loading="isLoadingGetZonaGudangVirtual"
                        :options="lookup_warehouses.data"
                        :filterable="false"
                        @search="onGetZonaGudangVirtual"
                        v-model="item.zona_gudang_id_tujuan"
                        @input="(item) => onSelectZonaVirtual(item, i)"
                      >
                        <!-- @input="onSelectItem(i)" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_warehouses.data.length || search"
                        >
                          <span
                            v-if="lookup_warehouses.current_page > 1"
                            @click="onGetZonaGudangVirtual(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_warehouses.last_page >
                              lookup_warehouses.current_page
                            "
                            @click="onGetZonaGudangVirtual(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </td>
                    <!-- <td class="border border-gray-300">
                      <div>
                        <label for="">Lokasi Aisle Tujuan</label>
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotAisle"
                          :options="lookup_custom8.data"
                          :filterable="false"
                          @search="onGetSlotAisle"
                          v-model="item.slot_penyimpanan_id_aisle_tujuan"
                          :reduce="(item) => item.slot_penyimpanan_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom8.data.length || search"
                          >
                            <span
                              v-if="lookup_custom8.current_page > 1"
                              @click="onGetSlotAisle(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom8.last_page >
                                lookup_custom8.current_page
                              "
                              @click="onGetSlotAisle(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                      <div class="mt-1">
                        <label for="">Lokasi Rack Tujuan</label>
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotRack"
                          :options="lookup_custom9.data"
                          :filterable="false"
                          @search="onGetSlotRack"
                          v-model="item.slot_penyimpanan_id_rack_tujuan"
                          :reduce="(item) => item.slot_penyimpanan_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom9.data.length || search"
                          >
                            <span
                              v-if="lookup_custom9.current_page > 1"
                              @click="onGetSlotRack(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom9.last_page >
                                lookup_custom9.current_page
                              "
                              @click="onGetSlotRack(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                      <div class="mt-1">
                        <label for="">Lokasi Level Tujuan</label>
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotLevel"
                          :options="lookup_custom10.data"
                          :filterable="false"
                          @search="onGetSlotLevel"
                          v-model="item.slot_penyimpanan_id_level_tujuan"
                          :reduce="(item) => item.slot_penyimpanan_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom10.data.length || search"
                          >
                            <span
                              v-if="lookup_custom10.current_page > 1"
                              @click="onGetSlotLevel(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom10.last_page >
                                lookup_custom10.current_page
                              "
                              @click="onGetSlotLevel(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                      <div class="mt-1">
                        <label for="">Lokasi Bin Tujuan</label>
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_slot_penyimpanan"
                          :loading="isLoadingGetSlotBin"
                          :options="lookup_roles.data"
                          :filterable="false"
                          @search="onGetSlotBin"
                          v-model="item.slot_penyimpanan_id_bin_tujuan"
                          :reduce="(item) => item.slot_penyimpanan_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_roles.data.length || search"
                          >
                            <span
                              v-if="lookup_roles.current_page > 1"
                              @click="onGetSlotBin(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_roles.last_page >
                                lookup_roles.current_page
                              "
                              @click="onGetSlotBin(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                    </td> -->

                    <td class="border border-gray-300">
                      <textarea
                        placeholder="Keterangan"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        v-model="item.keterangan"
                      ></textarea>
                    </td>
                    <td class="border border-gray-300 text-center">
                      <i
                        class="fas fa-trash mx-auto"
                        style="cursor: pointer"
                        @click="onDeleteItem(i)"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="w-full flex justify-start items-center">
            <modal-footer-section
              class="mt-5"
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
    <ModalPickRequest :self="this" ref="modalPickRequest" />
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
// import ModalPickRequest from "../../../components/transaksional/ModalPickRequest.vue";
import ModalPickRequest from "../../../../components/transaksional/ModalPickRequest.vue";
export default {
  props: ["self"],

  components: {
    ModalPickRequest,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchUser: false,
      isLoadingGetUser: false,
      user_search: "",

      // isStopSearchItemGudang: false,
      // isLoadingGetItemGudang: false,
      // gudang_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

      isStopSearchZonaGudangVirtual: false,
      isLoadingGetZonaGudangVirtual: false,
      zona_gudang_virtual_search: "",

      isStopSearchPickRequest: false,
      isLoadingGetPickRequest: false,
      pick_request_search: "",

      isStopSearchStaff: false,
      isLoadingGetStaff: false,
      staff_search: "",

      isStopSearchPeralatan: false,
      isLoadingGetPeralatan: false,
      peralatan_search: "",

      isStopSearchSlotAisle: false,
      isLoadingGetSlotAisle: false,
      aisle_search: "",

      isStopSearchSlotRack: false,
      isLoadingGetSlotRack: false,
      rack_search: "",

      isStopSearchSlotLevel: false,
      isLoadingGetSlotLevel: false,
      level_search: "",

      isStopSearchSlotBin: false,
      isLoadingGetSlotBin: false,
      bin_search: "",

      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pick Order",
      parameters: {
        url: "outbound/pick-order",
        form: {
          // pick_request_id: "",
          kode_pick_order: "",
          tanggal: "",
          no_referensi_1: "",
          no_referensi_2: "",
          no_referensi_3: "",
          gudang_id: "",
          user_id_pic: "",
          staff_id_pic: "",
          peralatan_id: "",
          keterangan: "",
          pick_order_details: [],
          biaya_pick_orders: [],

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },
      default_form: {
        kode_pick_order: "",
        tanggal: "",
        no_referensi_1: "",
        no_referensi_2: "",
        no_referensi_3: "",
        gudang_id: "",
        user_id_pic: "",
        staff_id_pic: "",
        peralatan_id: "",
        keterangan: "",
        pick_order_details: [],
        biaya_pick_orders: [],

        //Tracking
        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
    };
  },

  async created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    try {
      this.parameters.form.tanggal = formattedDate;
      if (this.isEditable) {
        let res = await this.$axios.get(`outbound/pick-order/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          this.parameters.form[item] = res.data[item];
        });
        this.parameters.form.user_id_pic = res.data.user_pic;
        this.parameters.form.gudang_id = res.data.gudang;
        this.parameters.form.staff_id_pic = res.data.staff_pic;
        this.parameters.form.peralatan_id = res.data.peralatan;
        console.log("halo mann");

        this.parameters.form.pick_order_details =
          res.data.pick_order_details.map((item) => {
            return {
              ...item,
              pick_order_details_id: item.pick_order_details_id
                ? item.pick_order_details_id
                : "",
              kode_item: item.item_gudang
                ? item.item_gudang.kode_item
                : item.kode_item,
              nama_item: item.item_gudang
                ? item.item_gudang.nama_item
                : item.nama_item,
              quantity: item.quantity_request,
              sisa_quantity: item.quantity,
              zona_gudang_id: item.zona_gudang,
              zona_gudang_id_tujuan: item.zona_gudang_tujuan,
              slot_penyimpanan_id_aisle: item.slot_penyimpanan_aisle,
              slot_penyimpanan_id_rack: item.slot_penyimpanan_rack,
              slot_penyimpanan_id_level: item.slot_penyimpanan_level,
              slot_penyimpanan_id_bin: item.slot_penyimpanan_bin,
            };
          });

        // if (!res.data.biaya_pick_orders.length) {
        // }

        this.isLoadingPage = false;
        console.log(res.data);
      }
    } catch (error) {
      // console.log("error", error);
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchUser();
    // await this.onSearchPickRequest();
    await this.onSearchGudang();
    // await this.onSearchItemGudang();
    await this.onSearchStaff();
    await this.onSearchPeralatan();
    // await this.onSearchSlotAisle();
    // await this.onSearchSlotRack();
    // await this.onSearchSlotLevel();
    // await this.onSearchSlotBin();
    await this.onSearchValuation();
    this.getGeoLocation();
    this.getUserAgent();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //user pic
      "lookup_custom3", //zona gudang
      "lookup_custom4", //pick request
      "lookup_custom5", //staff
      "lookup_custom6", //equipment
      "lookup_custom7", //gudang
      "lookup_custom8", //aisle
      "lookup_custom9", //rack
      "lookup_custom10", //level
      "lookup_roles", //bin
      "lookup_custom2", //valuation
      "lookup_warehouses", //zona virtual
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    addPickOrderDetails() {
      this.parameters.form.pick_order_details.push({
        ...this.formPickOrder,
      });
      this.resetFormPickOrder();
    },

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
            // console.log(
            //   "latitude",
            //   this.parameters.form.latitude,
            //   "longitude",
            //   this.parameters.form.longitude
            // );
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

      // Validasi pick_order_details sebelum submit
      const invalidItems = this.parameters.form.pick_order_details.filter(
        (item) => {
          return (
            item.quantity < parseFloat(item.sisa_quantity) ||
            item.stok < parseFloat(item.sisa_quantity)
          );
        }
      );

      // Jika ada item yang tidak valid, tampilkan pesan error dan hentikan submit
      if (invalidItems.length > 0) {
        this.$toaster.error(
          `Quantity Tidak Boleh Melebih i Quantity Request dan Stok`
        );
        return;
      }

      this.isLoadingForm = true;
      let url = "outbound/pick-order";

      let formData = {
        ...this.parameters.form,
        gudang_id:
          typeof this.parameters.form.gudang_id == "object"
            ? this.parameters.form.gudang_id.gudang_id
            : this.parameters.form.gudang_id,
        user_id_pic:
          typeof this.parameters.form.user_id_pic == "object"
            ? this.parameters.form.user_id_pic.user_id
            : this.parameters.form.user_id_pic,
        staff_id_pic:
          typeof this.parameters.form.staff_id_pic == "object"
            ? this.parameters.form.staff_id_pic.staff_id
            : this.parameters.form.staff_id_pic,
        peralatan_id:
          typeof this.parameters.form.peralatan_id == "object"
            ? this.parameters.form.peralatan_id.peralatan_id
            : this.parameters.form.peralatan_id,
      };

      formData.pick_order_details = formData.pick_order_details.map((item) => {
        return {
          ...item,
          pick_order_details_id: item.pick_order_details_id
            ? item.pick_order_details_id
            : "",
          item_id:
            typeof item.item_id == "object"
              ? item.item_id.item_id
              : item.item_id,
          item_gudang_id:
            typeof item.item_gudang_id == "object"
              ? item.item_gudang_id.item_gudang_id
              : item.item_gudang_id,
          zona_gudang_id:
            typeof item.zona_gudang_id == "object"
              ? item.zona_gudang_id.zona_gudang_id
              : item.zona_gudang_id,
          zona_gudang_id_tujuan:
            typeof item.zona_gudang_id_tujuan == "object"
              ? item.zona_gudang_id_tujuan.zona_gudang_id
              : item.zona_gudang_id_tujuan,
          quantity: item.sisa_quantity ? item.sisa_quantity : "",
          quantity_request: item.quantity ? item.quantity : "",
          slot_penyimpanan_id_aisle:
            typeof item.slot_penyimpanan_id_aisle == "object"
              ? item.slot_penyimpanan_id_aisle.slot_penyimpanan_id
              : item.slot_penyimpanan_id_aisle,
          slot_penyimpanan_id_rack:
            typeof item.slot_penyimpanan_id_rack == "object"
              ? item.slot_penyimpanan_id_rack.slot_penyimpanan_id
              : item.slot_penyimpanan_id_rack,
          slot_penyimpanan_id_level:
            typeof item.slot_penyimpanan_id_level == "object"
              ? item.slot_penyimpanan_id_level.slot_penyimpanan_id
              : item.slot_penyimpanan_id_level,
          slot_penyimpanan_id_bin:
            typeof item.slot_penyimpanan_id_bin == "object"
              ? item.slot_penyimpanan_id_bin.slot_penyimpanan_id
              : item.slot_penyimpanan_id_bin,
          slot_penyimpanan_id_aisle_tujuan: "",
          slot_penyimpanan_id_rack_tujuan: "",
          slot_penyimpanan_id_level_tujuan: "",
          slot_penyimpanan_id_bin_tujuan: "",
          stok_transfer_detail_id: item.stok_transfer_detail_id,
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
            "Data Berhasil di " + (this.isEditable ? "Update" : "Tambah")
          );
          if (!this.isEditable) {
            this.parameters.form = this.default_form;
          }
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

    addPickOrderDetails() {
      this.parameters.form.pick_order_details.push({
        pick_order_details_id: "",
        item_id: "",
        item_gudang_id: "",
        valuation_id: "",
        quantity_request: "",
        quantity: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle: "",
        slot_penyimpanan_id_rack: "",
        slot_penyimpanan_id_level: "",
        slot_penyimpanan_id_bin: "",
        zona_gudang_id_tujuan: "",
        slot_penyimpanan_id_aisle_tujuan: "",
        slot_penyimpanan_id_aisle_rack_tujuan: "",
        slot_penyimpanan_id_aisle_level_tujuan: "",
        slot_penyimpanan_id_aisle_bin_tujuan: "",
        keterangan: "",
        stok: "",
        // pick_order_details: "",
      });
    },

    onDeleteItem(index) {
      this.parameters.form.pick_order_details =
        this.parameters.form.pick_order_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetUser(search, isNext) {
      if (!search?.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchUser);

      this.isStopSearchUser = setTimeout(() => {
        this.user_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }
        this.onSearchUser();
      }, 600);
    },

    async onSearchUser() {
      if (!this.isLoadingGetUser) {
        this.isLoadingGetUser = true;

        await this.lookUp({
          url: "setting/user",
          lookup: "custom1",
          query:
            "?search=" +
            this.user_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });
        this.isLoadingGetUser = false;
      }
    },

    onGetValuation(search, isNext) {
      if (!search?.length && typeof isNext === "function") return;

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

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }
        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang-user",
          lookup: "custom7",
          query:
            "?search=" +
            this.gudang_search +
            "&user_id=" +
            this.user.user_id +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGudang = false;
      }
    },

    onGetZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

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
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });
        this.isLoadingGetZonaGudang = false;
      }
    },

    async onSelectZona(item, index) {
      if (item) {
        this.parameters.form.pick_order_details[index].zona_gudang_id = item;
        await this.onSearchSlotAisle(index);
        this.onGetSystemStok(index);
      } else {
        this.parameters.form.pick_order_details[index].zona_gudang_id = "";
        this.parameters.form.pick_order_details[
          index
        ].slot_penyimpanan_id_aisle = "";
      }
    },

    onGetPickRequest(search, isNext) {
      if (!search?.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchPickRequest);

      this.isStopSearchPickRequest = setTimeout(() => {
        this.pick_request_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }
        this.onSearchPickRequest();
      }, 600);
    },

    async onSearchPickRequest() {
      if (!this.isLoadingGetPickRequest) {
        this.isLoadingGetPickRequest = true;

        await this.lookUp({
          url: "outbound/pick-request",
          lookup: "custom4",
          query:
            "?search=" +
            this.pick_request_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });
        this.isLoadingGetPickRequest = false;
      }
    },

    onGetStaff(search, isNext) {
      if (!search?.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchStaff);

      this.isStopSearchStaff = setTimeout(() => {
        this.staff_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }
        this.onSearchStaff();
      }, 600);
    },

    async onSearchStaff() {
      if (!this.isLoadingGetStaff) {
        this.isLoadingGetStaff = true;

        await this.lookUp({
          url: "master/staff/get-staff",
          lookup: "custom5",
          query:
            "?search=" +
            this.staff_search +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });
        this.isLoadingGetStaff = false;
      }
    },

    onGetPeralatan(search, isNext) {
      if (!search?.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchPeralatan);

      this.isStopSearchPeralatan = setTimeout(() => {
        this.peralatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }
        this.onSearchPeralatan();
      }, 600);
    },

    async onSearchPeralatan() {
      if (!this.isLoadingGetPeralatan) {
        this.isLoadingGetPeralatan = true;

        await this.lookUp({
          url: "master/peralatan/get-peralatan",
          lookup: "custom6",
          query:
            "?search=" +
            this.peralatan_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });
        this.isLoadingGetPeralatan = false;
      }
    },

    onGetSlotAisle(search, isNext, index) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotAisle);

      this.isStopSearchSlotAisle = setTimeout(() => {
        this.aisle_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchSlotAisle(index);
      }, 600);
    },

    async onSearchSlotAisle(index) {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom8",
          query:
            "?search=" +
            this.aisle_search +
            "&level=1" +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.form.pick_order_details[index].zona_gudang_id
              .zona_gudang_id +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    async onSelectAisle(item, index) {
      if (item) {
        this.parameters.form.pick_order_details[
          index
        ].slot_penyimpanan_id_aisle = item;
        await this.onSearchSlotRack(index);
        this.onGetSystemStok(index);
      } else {
        this.parameters.form.pick_order_details[
          index
        ].slot_penyimpanan_id_aisle = "";
        this.parameters.form.pick_order_details[
          index
        ].slot_penyimpanan_id_rack = "";
      }
    },

    onGetSlotRack(search, isNext, index) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotRack);

      this.isStopSearchSlotRack = setTimeout(() => {
        this.rack_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchSlotRack(index);
      }, 600);
    },

    async onSearchSlotRack(index) {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom9",
          query:
            "?search=" +
            this.rack_search +
            "&level=2" +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.form.pick_order_details[index].zona_gudang_id
              .zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.parameters.form.pick_order_details[index]
              .slot_penyimpanan_id_aisle.slot_penyimpanan_id +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    async onSelectRack(item, index) {
      if (item) {
        this.parameters.form.pick_order_details[
          index
        ].slot_penyimpanan_id_rack = item;
        await this.onSearchSlotLevel(index);
        this.onGetSystemStok(index);
      } else {
        this.parameters.form.pick_order_details[
          index
        ].slot_penyimpanan_id_rack = "";
        this.parameters.form.pick_order_details[
          index
        ].slot_penyimpanan_id_level = "";
      }
    },

    onGetSlotLevel(search, isNext, index) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotLevel);

      this.isStopSearchSlotLevel = setTimeout(() => {
        this.level_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchSlotLevel(index);
      }, 600);
    },

    async onSearchSlotLevel(index) {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom10",
          query:
            "?search=" +
            this.level_search +
            "&level=3" +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.form.pick_order_details[index].zona_gudang_id
              .zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.parameters.form.pick_order_details[index]
              .slot_penyimpanan_id_rack.slot_penyimpanan_id +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    async onSelectLevel(item, index) {
      if (item) {
        this.parameters.form.pick_order_details[
          index
        ].slot_penyimpanan_id_level = item;
        await this.onSearchSlotBin(index);
        this.onGetSystemStok(index);
      } else {
        this.parameters.form.pick_order_details[
          index
        ].slot_penyimpanan_id_level = "";
        this.parameters.form.pick_order_details[index].slot_penyimpanan_id_bin =
          "";
      }
    },

    onGetSlotBin(search, isNext, index) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotBin);

      this.isStopSearchSlotBin = setTimeout(() => {
        this.bin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }

        this.onSearchSlotBin(index);
      }, 600);
    },

    async onSearchSlotBin(index) {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "roles",
          query:
            "?search=" +
            this.bin_search +
            "&level=4" +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&zona_gudang_id=" +
            this.parameters.form.pick_order_details[index].zona_gudang_id
              .zona_gudang_id +
            "&slot_penyimpanan_id_induk=" +
            this.parameters.form.pick_order_details[index]
              .slot_penyimpanan_id_level.slot_penyimpanan_id +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    async onSelectBin(item, index) {
      if (item) {
        this.parameters.form.pick_order_details[index].slot_penyimpanan_id_bin =
          item;
        this.onGetSystemStok(index);
      } else {
        this.parameters.form.pick_order_details[index].slot_penyimpanan_id_bin =
          "";
      }
    },

    onSelectUser(item) {
      if (item) {
        this.parameters.form.user_id_pic = item;
      } else {
        this.parameters.form.user_id_pic = "";
      }
    },

    onSelectStaff(item) {
      if (item) {
        this.parameters.form.staff_id_pic = item;
      } else {
        this.parameters.form.staff_id_pic = "";
      }
    },

    onSelectPeralatan(item) {
      if (item) {
        this.parameters.form.peralatan_id = item;
      } else {
        this.parameters.form.peralatan_id = "";
      }
    },

    onSelectPickRequest(item) {
      // this.parameters.form.pick_request_id = item;
      if (item) {
        this.parameters.form.pick_request_id = item;
      } else {
        this.parameters.form.pick_request_id = "";
      }
    },

    async onSelectGudang(item) {
      if (item) {
        this.parameters.form.gudang_id = item;
        await this.onSearchZonaGudang();
        await this.onSearchZonaGudangVirtual();
        this.parameters.form.pick_order_details = [];
      } else {
        this.parameters.form.gudang_id = "";
      }
    },

    //get zona virtual
    onGetZonaGudangVirtual(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchZonaGudangVirtual);

      this.isStopSearchZonaGudangVirtual = setTimeout(() => {
        this.zona_gudang_virtual_search = search;

        if (typeof isNext !== "function") {
          this.lookup_warehouses.current_page = isNext
            ? this.lookup_warehouses.current_page + 1
            : this.lookup_warehouses.current_page - 1;
        } else {
          this.lookup_warehouses.current_page = 1;
        }
        this.onSearchZonaGudangVirtual();
      }, 600);
    },

    async onSearchZonaGudangVirtual() {
      if (!this.isLoadingGetZonaGudangVirtual) {
        this.isLoadingGetZonaGudangVirtual = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "warehouses",
          query:
            "?search=" +
            this.zona_gudang_virtual_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&status_zona=v" +
            "&page=" +
            this.lookup_warehouses.current_page +
            "&per_page=10",
        });
        this.isLoadingGetZonaGudangVirtual = false;
      }
    },

    onSelectZonaVirtual(item, index) {
      if (item) {
        this.parameters.form.pick_order_details[index].zona_gudang_id_tujuan =
          item;
      } else {
        this.parameters.form.pick_order_details[index].zona_gudang_id_tujuan =
          "";
      }
    },

    async onOpenModalPickRequest() {
      if (this.parameters.form.gudang_id) {
        this.$refs.modalPickRequest.show();
        await this.$refs.modalPickRequest.onLoad();
        // this.$toaster.success(
        //   "Pick Request Dipilih" +
        //     this.parameters.form.pick_request_id.pick_request_id
        // );
      } else {
        this.$toaster.error("Gudang Belum Dipilih");
      }
    },

    addItem(item) {
      if (
        !this.parameters.form.pick_order_details.find(
          (data) => data.pick_request_id === item.pick_request_id
        )
      ) {
        let detailItem = {
          ...item,
        };
        this.parameters.form.pick_order_details.push(detailItem);
      } else {
        this.$toaster.error("Pick Request Sudah Ditambahkan");
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = this.default_form;
    },

    onGetSystemStok(index) {
      let item_gudang_id =
        this.parameters.form.pick_order_details[index].item_gudang_id;
      let zona_gudang_id =
        this.parameters.form.pick_order_details[index].zona_gudang_id;
      let valuation_id =
        this.parameters.form.pick_order_details[index].valuation_id;
      let aisle =
        this.parameters.form.pick_order_details[index]
          .slot_penyimpanan_id_aisle;
      let rack =
        this.parameters.form.pick_order_details[index].slot_penyimpanan_id_rack;
      let level =
        this.parameters.form.pick_order_details[index]
          .slot_penyimpanan_id_level;
      let bin =
        this.parameters.form.pick_order_details[index].slot_penyimpanan_id_bin;

      if (typeof this.parameters.form.gudang_id == "object") {
        this.$axios
          .get(
            `/inventory/stok_opname/get-stock/${this.parameters.form.gudang_id.gudang_id}/${item_gudang_id}/${zona_gudang_id.zona_gudang_id}/${valuation_id}?slot_penyimpanan_id_aisle=${aisle?.slot_penyimpanan_id}&slot_penyimpanan_id_bin=${bin?.slot_penyimpanan_id}&slot_penyimpanan_id_level=${level?.slot_penyimpanan_id}&slot_penyimpanan_id_rack=${rack?.slot_penyimpanan_id}`
          )
          .then((res) => {
            this.parameters.form.pick_order_details[index].stok =
              res.data.quantity || 0.7;
            console.log(res.data);
          });
      }
    },
  },
};
</script>
