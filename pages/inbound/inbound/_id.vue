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
            class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="w-full pt-3">
              <!-- inbound -->
              <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-bold">Inbound</h1>
                <div class=" ">
                  <!-- <button
                    type="button"
                    @click="AddBiayaInbound"
                    class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Detail ASN</p>
                  </button> -->
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3 w-full mb-7">
                <div class="form-group flex items-center">
                  <label for="" class="w-[40%]">ASN</label>
                  <v-select
                    label="tanggal"
                    :loading="isLoadingGetAsn"
                    :options="lookup_custom6.data"
                    :filterable="false"
                    @search="onGetAsn"
                    v-model="form.asn_id"
                    class="w-[60%]"
                    @input="onSelectAsn"
                  >
                    <template slot="option" slot-scope="option">
                      {{ option.kode_asn + " - " + option.tanggal }}
                    </template>
                    <template slot="selected-option" slot-scope="option">
                      {{ option.kode_asn + " - " + option.tanggal }}
                    </template>
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom6.data.length || search"
                    >
                      <span
                        v-if="lookup_custom6.current_page > 1"
                        @click="onGetAsn(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom6.last_page > lookup_custom6.current_page
                        "
                        @click="onGetAsn(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
                <div class="form-group">
                  <input-horizontal
                    label="Tipe Dokumen External"
                    type="text"
                    name="doc_type_sap"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.doc_type_sap"
                    :required="false"
                  />
                </div>
                <!-- <div class="form-group">
                  <input-horizontal
                    label="Kode Inbound"
                    type="text"
                    name="kode_inbound"
                    labelWidth="w-[30%]"
                    inputWidth="w-[70%]"
                    :isHorizontal="true"
                    v-model="form.kode_inbound"
                    :required="false"
                  />
                </div> -->
                <div class="form-group">
                  <input-horizontal
                    label="Surat Jalan"
                    type="text"
                    name="surat_jalan"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.surat_jalan"
                    :required="false"
                  />
                </div>
                <div class="form-group">
                  <input-horizontal
                    label="Nomor Referensi 1"
                    type="text"
                    name="no_referensi_1"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.no_referensi_1"
                    :required="false"
                  />
                </div>
                <div class="form-group">
                  <input-horizontal
                    label="Nomor Referensi 2"
                    type="text"
                    name="no_referensi_2"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.no_referensi_2"
                    :required="false"
                  />
                </div>
                <div class="form-group">
                  <input-horizontal
                    label="Nomor Referensi 3"
                    type="text"
                    name="no_referensi_3"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.no_referensi_3"
                    :required="false"
                  />
                </div>
                <div class="form-group">
                  <input-horizontal
                    label="Tanggal"
                    type="date"
                    name="tanggal"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.tanggal"
                    :required="false"
                  />
                </div>
                <!-- <div class="form-group">
                  <input-horizontal
                    label="Tanggal Approve"
                    type="date"
                    name="tanggal_approve"
                    labelWidth="w-[40%]"
                    inputWidth="w-[60%]"
                    :isHorizontal="true"
                    v-model="form.tanggal_approve"
                    :required="false"
                  />
                </div> -->
              </div>

              <tab-component :tabs="tabs">
                <template #DetailInbound>
                  <div class="w-full flex justify-between items-center">
                    <h1 class="text-xl font-bold">Detail Inbound</h1>
                    <div class=" ">
                      <!-- <button
                        type="button"
                        @click="AddBiayaInbound"
                        class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                      >
                        <i class="fas fa-plus"></i>
                        <p class="text-xs font-medium">Tambah Detail ASN</p>
                      </button> -->
                    </div>
                  </div>
                  <div class="table-responsive overflow-y-hidden mb-7">
                    <table
                      class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                      :class="form.inbound_details.length ? 'mb-[300px]' : ''"
                    >
                      <thead>
                        <tr class="text-sm uppercase text-nowrap">
                          <!-- <th class="w-[200px] border border-gray-300">ASN</th> -->
                          <!-- <th class="w-[200px] border border-gray-300">Gudang</th> -->
                          <!-- <th class="w-[200px] border border-gray-300">Item</th> -->
                          <!-- <th class="w-[200px] border border-gray-300">
                            Item Pelanggan
                          </th> -->
                          <th class="w-[200px] border border-gray-300">Item</th>
                          <th class="w-[200px] border border-gray-300">
                            Nomor
                          </th>
                          <!-- <th class="w-[200px] border border-gray-300">
                            Nomor Referensi
                          </th> -->
                          <th class="w-[200px] border border-gray-300">
                            Quantity
                          </th>
                          <th class="w-[200px] border border-gray-300">
                            Tanggal Expired
                          </th>
                          <th class="w-[200px] border border-gray-300">
                            Dimensi
                          </th>
                          <th class="w-[200px] border border-gray-300">
                            Lokasi Plan
                          </th>
                          <th class="w-[200px] border border-gray-300">Zona</th>
                          <th class="w-[200px] border border-gray-300">
                            Aisle
                          </th>
                          <th class="w-[200px] border border-gray-300">Rack</th>
                          <th class="w-[200px] border border-gray-300">
                            Level
                          </th>
                          <th class="w-[200px] border border-gray-300">Bin</th>
                          <th class="w-[300px] border border-gray-300">
                            Keterangan
                          </th>
                          <th class="w-[300px] border border-gray-300">
                            Alasan Beda Plan
                          </th>
                          <!-- <th class="w-[100px] border border-gray-300">Delete</th> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in form.inbound_details"
                          :key="index"
                          style="border-top: 0.5px solid lightgray"
                          class="align-top mx-0"
                        >
                          <!-- <td class="border border-gray-300">
                            {{ item.asn ? item.asn : "-" }}
                          </td> -->
                          <td class="border border-gray-300">
                            {{ item.item ? item.item.nama_item : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            <div>
                              <p>
                                Serial Number:
                                {{
                                  item.serial_number ? item.serial_number : "-"
                                }}
                              </p>
                              <p>
                                Nomor Referensi:
                                {{
                                  item.no_referensi ? item.no_referensi : "-"
                                }}
                              </p>
                            </div>
                          </td>

                          <td class="border border-gray-300">
                            <p>
                              Quantity:
                              {{ item.quantity ? item.quantity : "-" }}
                            </p>
                            <span>
                              <label for="" class="text-[10px]">Bagus</label>

                              <money
                                v-model="item.quantity_bagus"
                                class="w-full pl-2 py-1 border rounded focus:outline-none"
                                @keydown.native="
                                  $event.key === '-'
                                    ? $event.preventDefault()
                                    : null
                                "
                              />
                            </span>
                            <span>
                              <label for="" class="text-[10px]"
                                >Rusak Membatu</label
                              >

                              <money
                                v-model="item.quantity_rusak_membatu"
                                class="w-full pl-2 py-1 border rounded focus:outline-none"
                                @keydown.native="
                                  $event.key === '-'
                                    ? $event.preventDefault()
                                    : null
                                "
                              />
                            </span>
                            <span>
                              <label for="" class="text-[10px]"
                                >Rusak Pecah</label
                              >

                              <money
                                v-model="item.quantity_rusak_pecah"
                                class="w-full pl-2 py-1 border rounded focus:outline-none"
                                @keydown.native="
                                  $event.key === '-'
                                    ? $event.preventDefault()
                                    : null
                                "
                              />
                            </span>
                          </td>
                          <td class="border border-gray-300">
                            <input
                              class="w-full p-1 rounded-md border border-gray-300"
                              type="date"
                              v-model="item.tanggal_expired"
                            />
                          </td>
                          <td class="border border-gray-300">
                            <div>
                              <p v-if="item.panjang">
                                Panjang: {{ item.panjang }}
                              </p>
                              <p v-if="item.lebar">Lebar: {{ item.lebar }}</p>
                              <p v-if="item.tinggi">
                                Tinggi: {{ item.tinggi }}
                              </p>
                              <p v-if="item.berat">Berat: {{ item.berat }}</p>
                            </div>
                          </td>
                          <td class="border border-gray-300">
                            <p v-if="item.zona_gudang_plan">
                              Zona Plan:
                              {{ item.zona_gudang_plan.nama_zona_gudang }}
                            </p>
                            <p
                              class="mt-2"
                              v-if="item.slot_penyimpanan_aisle_plan"
                            >
                              Aisle Plan:
                              {{
                                item.slot_penyimpanan_aisle_plan
                                  .nama_slot_penyimpanan
                              }}
                            </p>
                            <p
                              class="mt-2"
                              v-if="item.slot_penyimpanan_rack_plan"
                            >
                              Rack Plan:
                              {{
                                item.slot_penyimpanan_rack_plan
                                  .nama_slot_penyimpanan
                              }}
                            </p>
                            <p
                              class="mt-2"
                              v-if="item.slot_penyimpanan_level_plan"
                            >
                              Level Plan:
                              {{
                                item.slot_penyimpanan_level_plan
                                  .nama_slot_penyimpanan
                              }}
                            </p>
                            <p
                              class="mt-2"
                              v-if="item.slot_penyimpanan_bin_plan"
                            >
                              Bin Plan:
                              {{
                                item.slot_penyimpanan_bin_plan
                                  .nama_slot_penyimpanan
                              }}
                            </p>
                          </td>
                          <td class="border border-gray-300">
                            <v-select
                              label="nama_zona_gudang"
                              :loading="isLoadingGetZonaPlan"
                              :options="lookup_custom1.data"
                              :filterable="false"
                              @search="onGetZonaPlan"
                              v-model="item.zona_gudang_id"
                              :reduce="(item) => item.zona_gudang_id"
                              class="w-full"
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
                              @search="onGetSlotAisle"
                              v-model="item.slot_penyimpanan_id_aisle"
                              :reduce="(item) => item.slot_penyimpanan_id"
                              class="w-full"
                            >
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_custom2.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom2.current_page > 1"
                                  @click="onGetSlotAisle(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom2.last_page >
                                    lookup_custom2.current_page
                                  "
                                  @click="onGetSlotAisle(search, true)"
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
                              @search="onGetSlotRack"
                              v-model="item.slot_penyimpanan_id_rack"
                              :reduce="(item) => item.slot_penyimpanan_id"
                              class="w-full"
                            >
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_custom3.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom3.current_page > 1"
                                  @click="onGetSlotRack(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom3.last_page >
                                    lookup_custom3.current_page
                                  "
                                  @click="onGetSlotRack(search, true)"
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
                              @search="onGetSlotLevel"
                              v-model="item.slot_penyimpanan_id_level"
                              :reduce="(item) => item.slot_penyimpanan_id"
                              class="w-full"
                            >
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_custom4.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom4.current_page > 1"
                                  @click="onGetSlotLevel(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom4.last_page >
                                    lookup_custom4.current_page
                                  "
                                  @click="onGetSlotLevel(search, true)"
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
                              @search="onGetSlotBin"
                              v-model="item.slot_penyimpanan_id_bin"
                              :reduce="(item) => item.slot_penyimpanan_id"
                              class="w-full"
                            >
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_custom5.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom5.current_page > 1"
                                  @click="onGetSlotBin(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom5.last_page >
                                    lookup_custom5.current_page
                                  "
                                  @click="onGetSlotBin(search, true)"
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
                              :loading="isLoadingGetAlasan"
                              :options="lookup_grade.data"
                              :filterable="false"
                              @search="onGetAlasan"
                              v-model="item.alasan_beda_plan_id"
                              :reduce="(item) => item.alasan_beda_plan_id"
                              class="w-full"
                            >
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_grade.data.length || search"
                              >
                                <span
                                  v-if="lookup_grade.current_page > 1"
                                  @click="onGetAlasan(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_grade.last_page >
                                    lookup_grade.current_page
                                  "
                                  @click="onGetAlasan(search, true)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Selanjutnya</span
                                >
                              </li>
                            </v-select>
                          </td>
                          <!-- <td class="border border-gray-300 text-center">
                            <i
                              class="fas fa-trash mx-auto"
                              style="cursor: pointer"
                              @click="onDeleteItem(index)"
                            ></i>
                          </td> -->
                        </tr>
                        <tr v-if="!form.inbound_details.length > 0">
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
                <template #BiayaInbound>
                  <div class="w-full flex justify-between items-center">
                    <h1 class="text-xl font-bold">Biaya Inbound</h1>
                    <div class=" ">
                      <button
                        type="button"
                        @click="AddBiayaInbound"
                        class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                      >
                        <i class="fas fa-plus"></i>
                        <p class="text-xs font-medium">Tambah Biaya Inbound</p>
                      </button>
                    </div>
                  </div>
                  <div class="table-responsive overflow-y-hidden mb-7">
                    <table
                      class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                      :class="form.biaya_inbounds.length ? 'mb-[300px]' : ''"
                    >
                      <thead>
                        <tr class="text-sm uppercase text-nowrap">
                          <th class="w-[200px] border border-gray-300">
                            Jenis Biaya
                          </th>
                          <th class="w-[200px] border border-gray-300">
                            Nominal Satuan
                          </th>
                          <th class="w-[200px] border border-gray-300">
                            Jumlah
                          </th>
                          <th class="w-[200px] border border-gray-300">
                            Total
                          </th>
                          <th class="w-[200px] border border-gray-300">COA</th>
                          <th class="w-[200px] border border-gray-300">
                            Divisi
                          </th>
                          <th class="w-[200px] border border-gray-300">
                            Vendor
                          </th>
                          <th class="w-[300px] border border-gray-300">
                            Keterangan
                          </th>
                          <th class="w-20 border border-gray-300 text-center">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in form.biaya_inbounds"
                          :key="index"
                          style="border-top: 0.5px solid lightgray"
                          class="align-top mx-0"
                        >
                          <td class="border border-gray-300">
                            <v-select
                              label="nama_jenis_biaya"
                              :loading="isLoadingGetJenisBiaya"
                              :options="lookup_custom7.data"
                              :filterable="false"
                              @search="onGetJenisBiaya"
                              v-model="item.jenis_biaya_id"
                              :reduce="(item) => item.jenis_biaya_id"
                              class="w-full"
                            >
                              <li
                                slot-scope="{ search }"
                                slot="list-footer"
                                class="p-1 border-t flex justify-between"
                                v-if="lookup_custom7.data.length || search"
                              >
                                <span
                                  v-if="lookup_custom7.current_page > 1"
                                  @click="onGetJenisBiaya(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom7.last_page >
                                    lookup_custom7.current_page
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
                              :options="lookup_custom8.data"
                              :filterable="false"
                              @search="onGetCoa"
                              v-model="item.coa_id"
                              :reduce="(item) => item.coa_id"
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
                                  @click="onGetCoa(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom8.last_page >
                                    lookup_custom8.current_page
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
                              label="nama_divisi"
                              :loading="isLoadingGetDivisi"
                              :options="lookup_custom9.data"
                              :filterable="false"
                              @search="onGetDivisi"
                              v-model="item.divis_id"
                              :reduce="(item) => item.divis_id"
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
                                  @click="onGetDivisi(search, false)"
                                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                  >Sebelumnya</span
                                >
                                <span
                                  v-if="
                                    lookup_custom9.last_page >
                                    lookup_custom9.current_page
                                  "
                                  @click="onGetDivisi(search, true)"
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
                              :reduce="(item) => item.vendor_id"
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
                          <td>
                            <textarea
                              placeholder="Keterangan"
                              class="w-full pl-2 py-1 border rounded focus:outline-none"
                              v-model="item.keterangan"
                            ></textarea>
                          </td>
                          <td
                            class="text-center text-gray-600 border border-gray-300"
                          >
                            <i
                              class="fas fa-trash mx-auto"
                              style="cursor: pointer"
                              @click="onDeleteItem(index)"
                            ></i>
                          </td>
                        </tr>
                        <tr v-if="!form.biaya_inbounds.length > 0">
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
              </tab-component>
            </div>
            <modal-footer-section
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
              class="m-5"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [{ name: "DetailInbound" }, { name: "BiayaInbound" }],

      id,

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

      isStopSearchAsn: false,
      isLoadingGetAsn: false,
      asn_search: "",

      isStopSearchJenisBiaya: false,
      isLoadingGetJenisBiaya: false,
      jenis_biaya_search: "",

      isStopSearchCoa: false,
      isLoadingGetCoa: false,
      coa_search: "",

      isStopSearchDivisi: false,
      isLoadingGetDivisi: false,
      divisi_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearchAlasan: false,
      isLoadingGetAlasan: false,
      alasan_search: "",

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Inbound",
      url: "inbound/inbound",

      form: {
        inbound_id: "",
        asn_id: "",
        surat_jalan: "",
        doc_type_sap: "",
        kode_inbound: "",
        no_referensi_1: "",
        no_referensi_2: "",
        no_referensi_3: "",
        tanggal: "",

        tanggal_approve: "",
        gudang_id: "",

        inbound_details: [],
        biaya_inbounds: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      default_form: {
        inbound_id: "",
        asn_id: "",
        surat_jalan: "",
        doc_type_sap: "",
        kode_inbound: "",
        no_referensi_1: "",
        no_referensi_2: "",
        no_referensi_3: "",
        tanggal: "",

        tanggal_approve: "",
        gudang_id: "",

        inbound_details: [],
        biaya_inbounds: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`inbound/inbound/${this.id}`);
        Object.keys(this.form).forEach((item) => {
          if (item !== "inbound_details") {
            this.form[item] = res.data[item];
          }
        });

        this.form.inbound_details = res.data.inbound_details.map((item) => {
          return {
            ...item,
            detail_inbound_id: item || "",
          };
        });

        this.form.biaya_inbounds = res.data.biaya_inbounds.map((item) => {
          return { ...item, biaya_inbound_id: item || "" };
        });

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/inbound/inbound");
    }
  },

  async mounted() {
    await this.onSearchAsn();
    await this.onSearchZonaPlan();
    await this.onSearchSlotAisle();
    await this.onSearchSlotRack();
    await this.onSearchSlotLevel();
    await this.onSearchSlotBin();

    await this.onSearchJenisBiaya();
    await this.onSearchCoa();
    await this.onSearchDivisi();
    await this.onSearchVendor();
    await this.onSearchAlasan();

    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_custom4",
      "lookup_custom5",
      "lookup_custom6",
      "lookup_custom7",
      "lookup_custom8",
      "lookup_custom9",
      "lookup_custom10",
      "lookup_grade",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.form.user_agent = navigator.userAgent;
      if (this.form.user_agent.includes("Mobile")) {
        this.form.device = "Mobile";
      } else if (this.form.user_agent.includes("Tablet")) {
        this.form.device = "Tablet";
      } else {
        this.form.device = "Desktop";
      }
      console.log("user agent", this.form.user_agent);
      console.log("device", this.form.device);
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.longitude = position.coords.longitude.toString();
            this.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
            console.log(
              "latitude",
              this.form.latitude,
              "longitude",
              this.form.longitude
            );
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
      let url = "inbound/inbound";

      let formData = {
        ...this.form,
        asn_id:
          typeof this.form.asn_id === "object"
            ? this.form.asn_id.asn_id
            : this.form.asn_id,
        gudang_id: this.form.asn_id.gudang_id,
        supplier_id: this.form.asn_id.supplier_id,
      };

      // today's date
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      formData.tanggal_approve = formattedDate;

      formData.inbound_details = formData.inbound_details.map((item) => {
        return {
          ...item,
          detail_inbound_id: item.detail_inbound_id
            ? item.detail_inbound_id.detail_inbound_id
            : "",
        };
      });

      formData.biaya_inbounds = formData.biaya_inbounds.map((item) => {
        return {
          ...item,
          biaya_inbound_id: item.biaya_inbound_id
            ? item.biaya_inbound_id.biaya_inbound_id
            : "",
        };
      });

      if (this.user.gudang_id) {
        this.form.gudang_id = this.user.gudang_id;
      }

      // console.log("form", this.parameters.form);

      if (this.isEditable) {
        url += "/" + this.id;
      }

      console.log(formData);

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

          if (!this.isEditable) {
            this.form = this.default_form;
            this.$router.back();
          }
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    AddBiayaInbound() {
      this.form.biaya_inbounds.push({
        biaya_inbound_id: "",
        jenis_biaya_id: "",
        nominal_satuan: "",
        jumlah: "",
        total: "",
        coa_id: "",
        divis_id: "",
        vendor_id: "",
      });
    },

    onDeleteItem(index) {
      this.form.biaya_inbounds = this.form.biaya_inbounds.filter(
        (_, itemIndex) => index !== itemIndex
      );
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
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaPlan = false;
      }
    },

    // Get slot aisle
    onGetSlotAisle(search, isNext) {
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

        this.onSearchSlotAisle();
      }, 600);
    },

    async onSearchSlotAisle() {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom2",
          query:
            "?search=" +
            this.slot_aisle_search +
            "&level=1" +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    // Get slot rack
    onGetSlotRack(search, isNext) {
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

        this.onSearchSlotRack();
      }, 600);
    },

    async onSearchSlotRack() {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom3",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=2" +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    // Get slot level
    onGetSlotLevel(search, isNext) {
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

        this.onSearchSlotLevel();
      }, 600);
    },

    async onSearchSlotLevel() {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom4",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=3" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    // Get slot level
    onGetSlotBin(search, isNext) {
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

        this.onSearchSlotBin();
      }, 600);
    },

    async onSearchSlotBin() {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom5",
          query:
            "?search=" +
            this.slot_bin_search +
            "&level=4" +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    // get asn
    onGetAsn(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchAsn);

      this.isStopSearchAsn = setTimeout(() => {
        this.asn_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchAsn();
      }, 600);
    },

    async onSearchAsn() {
      if (!this.isLoadingGetAsn) {
        this.isLoadingGetAsn = true;

        await this.lookUp({
          url: "inbound/asn/get-asn",
          lookup: "custom6",
          query:
            "?search=" +
            this.asn_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetAsn = false;
      }
    },

    onSelectAsn(item) {
      if (item) {
        this.form.doc_type_sap = item.doc_type_sap;
        this.form.surat_jalan = item.surat_jalan;
        this.form.no_referensi_1 = item.no_referensi;
        this.form.no_referensi_2 = item.no_referensi_2;
        this.form.tanggal = item.tanggal;
        if (item.asn_details) {
          this.form.inbound_details = item.asn_details.map((data) => {
            return {
              ...data,
              zona_gudang_id: data.zona_gudang_id_plan,
              slot_penyimpanan_id_aisle: data.slot_penyimpanan_id_aisle_plan,
              slot_penyimpanan_id_rack: data.slot_penyimpanan_id_rack_plan,
              slot_penyimpanan_id_level: data.slot_penyimpanan_id_level_plan,
              slot_penyimpanan_id_bin: data.slot_penyimpanan_id_bin_plan,
            };
          });
        }
      }
    },

    // get jenis biaya
    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchJenisBiaya = setTimeout(() => {
        this.jenis_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "custom7",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisBiaya = false;
      }
    },

    // get coa
    onGetCoa(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCoa);

      this.isStopSearchCoa = setTimeout(() => {
        this.coa_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchCoa();
      }, 600);
    },

    async onSearchCoa() {
      if (!this.isLoadingGetCoa) {
        this.isLoadingGetCoa = true;

        await this.lookUp({
          url: "finance/coa/get-coa",
          lookup: "custom8",
          query:
            "?search=" +
            this.coa_search +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCoa = false;
      }
    },

    // get coa
    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom9",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDivisi = false;
      }
    },

    // get coa
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

    // get alasan
    onGetAlasan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchAlasan);

      this.isStopSearchAlasan = setTimeout(() => {
        this.alasan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchAlasan();
      }, 600);
    },

    async onSearchAlasan() {
      if (!this.isLoadingGetAlasan) {
        this.isLoadingGetAlasan = true;

        await this.lookUp({
          url: "master/alasan-beda-plan/get-alasan-beda-plan",
          lookup: "grade",
          query:
            "?search=" +
            this.alasan_search +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });

        this.isLoadingGetAlasan = false;
      }
    },
  },
};
</script>
