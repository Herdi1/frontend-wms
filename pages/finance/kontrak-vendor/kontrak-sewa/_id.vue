<template>
  <section class="section min-h-screen">
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
      <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div
            class="mt-4 mb-7 grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="form-group">
              <input-horiontal
                label="No Referensi"
                type="text"
                name="no_referensi"
                v-model="parameters.form.no_referensi"
                :required="false"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'Vendor',
                  optionLabel: 'nama_vendor',
                  lookup: lookup_custom1,
                  value: parameters.form.vendor_id,
                  onGet: onGetVendor,
                  isLoadingL: isLoadingGetVendor,
                  input: onSelectVendor,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'PIC Kontrak',
                  optionLabel: 'nama_lengkap',
                  lookup: lookup_custom2,
                  value: parameters.form.user_id_pic,
                  onGet: onGetUser,
                  isLoadingL: isLoadingGetUser,
                  input: onSelectPIC,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="form-group">
              <select-button
                :self="{
                  label: 'Jenis Kontrak',
                  optionLabel: 'nama_jenis_kontrak',
                  lookup: lookup_custom3,
                  value: parameters.form.jenis_kontrak_id,
                  onGet: onGetJenisKontrak,
                  isLoadingL: isLoadingGetJenisKontrak,
                  input: onSelectJenisKontrak,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div>
            <div class="form-group">
              <input-horiontal
                label="Tanggal Kontrak"
                type="date"
                name="tanggal_kontrak"
                v-model="parameters.form.tanggal_kontrak"
                :required="false"
              />
            </div>
            <!-- <div class="form-group">
              <select-button
                :self="{
                  label: 'Approver Kontrak',
                  optionLabel: 'nama_lengkap',
                  lookup: lookup_custom2,
                  value: parameters.form.user_id_approve,
                  onGet: onGetUser,
                  isLoadingL: isLoadingGetUser,
                  input: onSelectApprove,
                }"
                width="w-[50%]"
                class="mb-5"
              />
            </div> -->
            <div class="form-group">
              <input-horiontal
                label="Tanggal Berlaku"
                type="date"
                name="tanggal_berlaku"
                v-model="parameters.form.tanggal_berlaku"
                :required="false"
              />
            </div>
            <!-- <div class="form-group">
              <input-horiontal
                label="Tanggal Berhenti"
                type="date"
                name="tanggal_aktif"
                v-model="parameters.form.tanggal_aktif"
                :required="false"
              />
            </div> -->
            <div class="form-group">
              <input-horiontal
                label="Tanggal Expired"
                type="date"
                name="tanggal_berhenti"
                v-model="parameters.form.tanggal_berhenti"
                :required="false"
              />
            </div>
            <div class="form-group flex items-center">
              <label for="" class="w-1/2">Status </label>
              <select
                name=""
                id=""
                v-model="parameters.form.status_kontrak"
                class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
              >
                <option value="FISIK">Fisik</option>
                <option value="VIRTUAL">Virtual</option>
              </select>
            </div>
            <div class="form-group flex items-center">
              <label for="keterangan" class="w-1/2">Keterangan</label>
              <textarea
                placeholder="Keterangan"
                class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                v-model="parameters.form.keterangan"
              ></textarea>
            </div>
          </div>
          <tab-component :tabs="tabs">
            <template #DetailSewaGudang>
              <!-- <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-bold">Detail Sewa Gudang</h1>
                <div class=" ">
                  <button
                    type="button"
                    @click="addDetailGudang"
                    class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Detail</p>
                  </button>
                </div>
              </div>
              <div class="table-responsive overflow-y-hidden mb-7">
                <table
                  class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                  :class="
                    parameters.form.kontrak_sewa_gudang_details.length
                      ? 'mb-[300px]'
                      : ''
                  "
                >
                  <thead>
                    <tr class="uppercase">
                      <th class="w-52 border border-gray-300">Jenis Kontrak</th>
                      <th class="w-52 border border-gray-300">Divisi</th>
                      <th class="w-52 border border-gray-300">Jenis Biaya</th>
                      <th class="w-52 border border-gray-300">Gudang</th>
                      <th class="w-52 border border-gray-300">
                        Info Pembayaran
                      </th>
                      <th class="w-52 border border-gray-300">Luas</th>
                      <th class="w-20 border border-gray-300">Hapus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in parameters.form
                        .kontrak_sewa_gudang_details"
                      :key="i"
                      class="border-t"
                    >
                      <td class="border border-gray-300">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_jenis_kontrak"
                          :loading="isLoadingGetJenisKontrak"
                          :options="lookup_custom3.data"
                          :filterable="false"
                          @search="onGetJenisKontrak"
                          :reduce="(item) => item.jenis_kontrak_id"
                          v-model="item.jenis_kontrak_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom3.data.length || search"
                          >
                            <span
                              v-if="lookup_custom3.current_page > 1"
                              @click="onGetJenisKontrak(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom3.last_page >
                                lookup_custom3.current_page
                              "
                              @click="onGetJenisKontrak(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_divisi"
                          :loading="isLoadingGetDivisi"
                          :options="lookup_custom4.data"
                          :filterable="false"
                          @search="onGetDivisi"
                          :reduce="(item) => item.divisi_id"
                          v-model="item.divisi_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom4.data.length || search"
                          >
                            <span
                              v-if="lookup_custom4.current_page > 1"
                              @click="onGetDivisi(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom4.last_page >
                                lookup_custom4.current_page
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
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_jenis_biaya"
                          :loading="isLoadingGetJenisBiaya"
                          :options="lookup_custom5.data"
                          :filterable="false"
                          @search="onGetJenisBiaya"
                          :reduce="(item) => item.jenis_biaya_id"
                          v-model="item.jenis_biaya_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom5.data.length || search"
                          >
                            <span
                              v-if="lookup_custom5.current_page > 1"
                              @click="onGetJenisBiaya(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom5.last_page >
                                lookup_custom5.current_page
                              "
                              @click="onGetJenisBiaya(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_gudang"
                          :loading="isLoadingGetGudang"
                          :options="lookup_custom6.data"
                          :filterable="false"
                          @search="onGetGudang"
                          :reduce="(item) => item.gudang_id"
                          v-model="item.gudang_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom6.data.length || search"
                          >
                            <span
                              v-if="lookup_custom6.current_page > 1"
                              @click="onGetGudang(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom6.last_page >
                                lookup_custom6.current_page
                              "
                              @click="onGetGudang(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_term_pembayaran"
                          :loading="isLoadingGetTerm"
                          :options="lookup_custom7.data"
                          :filterable="false"
                          @search="onGetTerm"
                          :reduce="(item) => item.term_pembayaran_id"
                          v-model="item.term_pembayaran_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom7.data.length || search"
                          >
                            <span
                              v-if="lookup_custom7.current_page > 1"
                              @click="onGetTerm(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom7.last_page >
                                lookup_custom7.current_page
                              "
                              @click="onGetTerm(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_satuan"
                          :loading="isLoadingGetSatuan"
                          :options="lookup_custom8.data"
                          :filterable="false"
                          @search="onGetSatuan"
                          :reduce="(item) => item.satuan_id"
                          v-model="item.satuan_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom8.data.length || search"
                          >
                            <span
                              v-if="lookup_custom8.current_page > 1"
                              @click="onGetSatuan(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom8.last_page >
                                lookup_custom8.current_page
                              "
                              @click="onGetSatuan(search, true)"
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
                          @click="onDeleteGudang(i)"
                        ></i>
                      </td>
                    </tr>
                    <tr
                      v-if="
                        !parameters.form.kontrak_sewa_gudang_details.length > 0
                      "
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
              </div> -->
              <KontrakGudangDetail :self="{ parameters }" />
            </template>
            <template #DetailSewaPeralatan>
              <!-- <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-bold">Detail Sewa Peralatan</h1>
                <div class=" ">
                  <button
                    type="button"
                    @click="addDetailPeralatan"
                    class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Detail</p>
                  </button>
                </div>
              </div>
              <div class="table-responsive overflow-y-hidden mb-7">
                <table
                  class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                  :class="
                    parameters.form.kontrak_sewa_peralatan_details.length
                      ? 'mb-[300px]'
                      : ''
                  "
                >
                  <thead>
                    <tr class="uppercase">
                      <th class="w-52 border border-gray-300">Jenis Kontrak</th>
                      <th class="w-52 border border-gray-300">Divisi</th>
                      <th class="w-52 border border-gray-300">Jenis Biaya</th>
                      <th class="w-52 border border-gray-300">Gudang</th>
                      <th class="w-52 border border-gray-300">
                        Info Pembayaran
                      </th>
                      <th class="w-52 border border-gray-300">
                        Tipe Peralatan
                      </th>
                      <th class="w-20 border border-gray-300">Hapus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in parameters.form
                        .kontrak_sewa_peralatan_details"
                      :key="i"
                      class="border-t"
                    >
                      <td class="border border-gray-300">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_jenis_kontrak"
                          :loading="isLoadingGetJenisKontrak"
                          :options="lookup_custom3.data"
                          :filterable="false"
                          @search="onGetJenisKontrak"
                          :reduce="(item) => item.jenis_kontrak_id"
                          v-model="item.jenis_kontrak_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom3.data.length || search"
                          >
                            <span
                              v-if="lookup_custom3.current_page > 1"
                              @click="onGetJenisKontrak(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom3.last_page >
                                lookup_custom3.current_page
                              "
                              @click="onGetJenisKontrak(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_divisi"
                          :loading="isLoadingGetDivisi"
                          :options="lookup_custom4.data"
                          :filterable="false"
                          @search="onGetDivisi"
                          :reduce="(item) => item.divisi_id"
                          v-model="item.divisi_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom4.data.length || search"
                          >
                            <span
                              v-if="lookup_custom4.current_page > 1"
                              @click="onGetDivisi(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom4.last_page >
                                lookup_custom4.current_page
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
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_jenis_biaya"
                          :loading="isLoadingGetJenisBiaya"
                          :options="lookup_custom5.data"
                          :filterable="false"
                          @search="onGetJenisBiaya"
                          :reduce="(item) => item.jenis_biaya_id"
                          v-model="item.jenis_biaya_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom5.data.length || search"
                          >
                            <span
                              v-if="lookup_custom5.current_page > 1"
                              @click="onGetJenisBiaya(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom5.last_page >
                                lookup_custom5.current_page
                              "
                              @click="onGetJenisBiaya(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_gudang"
                          :loading="isLoadingGetGudang"
                          :options="lookup_custom6.data"
                          :filterable="false"
                          @search="onGetGudang"
                          :reduce="(item) => item.gudang_id"
                          v-model="item.gudang_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom6.data.length || search"
                          >
                            <span
                              v-if="lookup_custom6.current_page > 1"
                              @click="onGetGudang(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom6.last_page >
                                lookup_custom6.current_page
                              "
                              @click="onGetGudang(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_term_pembayaran"
                          :loading="isLoadingGetTerm"
                          :options="lookup_custom7.data"
                          :filterable="false"
                          @search="onGetTerm"
                          :reduce="(item) => item.term_pembayaran_id"
                          v-model="item.term_pembayaran_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom7.data.length || search"
                          >
                            <span
                              v-if="lookup_custom7.current_page > 1"
                              @click="onGetTerm(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom7.last_page >
                                lookup_custom7.current_page
                              "
                              @click="onGetTerm(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </td>
                      <td class="border border-gray-300">
                        <v-select
                          class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                          label="nama_jenis_peralatan"
                          :loading="isLoadingGetPeralatan"
                          :options="lookup_custom9.data"
                          :filterable="false"
                          @search="onGetPeralatan"
                          :reduce="(item) => item.jenis_peralatan_id"
                          v-model="item.jenis_peralatan_id"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom9.data.length || search"
                          >
                            <span
                              v-if="lookup_custom9.current_page > 1"
                              @click="onGetPeralatan(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom9.last_page >
                                lookup_custom9.current_page
                              "
                              @click="onGetPeralatan(search, true)"
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
                          @click="onDeletePeralatan(i)"
                        ></i>
                      </td>
                    </tr>
                    <tr
                      v-if="
                        !parameters.form.kontrak_sewa_peralatan_details.length >
                        0
                      "
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
              </div> -->
              <KontrakPeralatanDetail :self="{ parameters }" />
            </template>
          </tab-component>
          <modal-footer-section
            class="mt-5"
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
          />
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapState } from "vuex";
import KontrakGudangDetail from "./KontrakGudangDetail.vue";
import KontrakPeralatanDetail from "./KontrakPeralatanDetail.vue";
export default {
  props: ["self"],

  components: {
    KontrakGudangDetail,
    KontrakPeralatanDetail,
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      tabs: [
        { name: "DETAIL KONTRAK SEWA GUDANG", slotName: "DetailSewaGudang" },
        {
          name: "DETAIL KONTRAK SEWA PERALATAN",
          slotName: "DetailSewaPeralatan",
        },
      ],
      id,

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearchUser: false,
      isLoadingGetUser: false,
      user_search: "",

      isStopSearchJenisKontrak: false,
      isLoadingGetJenisKontrak: false,
      jenis_kontrak_search: "",

      isStopSearchDivisi: false,
      isLoadingGetDivisi: false,
      divisi_search: "",

      isStopSearchJenisBiaya: false,
      isLoadingGetJenisBiaya: false,
      jenis_biaya_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchTerm: false,
      isLoadingGetTerm: false,
      term_search: "",

      isStopSearchSatuan: false,
      isLoadingGetSatuan: false,
      satuan_search: "",

      isStopSearchPeralatan: false,
      isLoadingGetPeralatan: false,
      peralatan_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Kontrak Vendor Sewa",
      parameters: {
        url: "finance/kontrak-sewa",
        form: {
          no_referensi: "",
          gudang_id: "",
          vendor_id: "",
          user_id_pic: "",
          tanggal_kontrak: "",
          tanggal_berlaku: "",
          tanggal_berhenti: "",
          status_kontrak: "",
          jenis_kontrak_id: "",
          keterangan: "",
          kontrak_sewa_gudang_details: [],
          kontrak_sewa_peralatan_details: [],

          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },
      default_form: {
        no_referensi: "",
        gudang_id: "",
        vendor_id: "",
        user_id_pic: "",
        tanggal_kontrak: "",
        tanggal_berlaku: "",
        tanggal_berhenti: "",
        status_kontrak: "",
        jenis_kontrak_id: "",
        keterangan: "",
        kontrak_sewa_gudang_details: [],
        kontrak_sewa_peralatan_details: [],

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
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          if (
            item != "kontrak_sewa_gudang_details" &&
            item != "kontrak_sewa_peralatan_details"
          ) {
            this.parameters.form[item] = res.data[item];
          }
        });
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
      // console.log("error", error);
    }
  },

  async mounted() {
    await this.onSearchVendor();
    await this.onSearchUser();

    this.getUserAgent();
    this.getGeoLocation();

    await this.onSearchJenisKontrak();
    await this.onSearchDivisi();
    await this.onSearchJenisBiaya();
    await this.onSearchGudang();
    await this.onSearchTerm();
    await this.onSearchSatuan();
    await this.onSearchPeralatan();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //vendor
      "lookup_custom2", //user pic & approver
      "lookup_custom3", //jenis kontrak
      "lookup_custom4", //divisi
      "lookup_custom5", //jenis biaya
      "lookup_custom6", //gudang
      "lookup_custom7", //term
      "lookup_custom8", //satuan
      "lookup_custom9", //peralatan
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
      // console.log("user agent", this.form.user_agent);
      // console.log("device", this.form.device);
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
            //   this.form.latitude,
            //   "longitude",
            //   this.form.longitude
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

    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom1",
          query:
            "?search=" +
            this.vendor_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
      }
    },

    onGetUser(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchUser);

      this.isStopSearchUser = setTimeout(() => {
        this.user_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchUser();
      }, 600);
    },

    async onSearchUser() {
      if (!this.isLoadingGetUser) {
        this.isLoadingGetUser = true;

        await this.lookUp({
          url: "setting/user",
          lookup: "custom2",
          query:
            "?search=" +
            this.user_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetUser = false;
      }
    },

    onSelectVendor(item) {
      if (item) {
        this.parameters.form.vendor_id = item;
      } else {
        this.parameters.form.vendor_id = "";
      }
    },

    onSelectPIC(item) {
      if (item) {
        this.parameters.form.user_id_pic = item;
      } else {
        this.parameters.form.user_id_pic = "";
      }
    },

    onSelectApprove(item) {
      if (item) {
        this.parameters.form.user_id_approve = item;
      } else {
        this.parameters.form.user_id_approve = "";
      }
    },

    onSelectJenisKontrak(item) {
      if (item) {
        this.parameters.form.jenis_kontrak_id = item;
      } else {
        this.parameters.form.jenis_kontrak_id = "";
      }
    },

    addDetailGudang() {
      this.parameters.form.kontrak_sewa_gudang_details.push({
        jenis_kontrak_id: "",
        divisi_id: "",
        jenis_biaya_id: "",
        gudang_id: "",
        term_pembayaran_id: "",
        satuan_id: "",
      });
    },

    onDeleteGudang(index) {
      this.parameters.form.kontrak_sewa_gudang_details =
        this.parameters.form.kontrak_sewa_gudang_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    addDetailPeralatan() {
      this.parameters.form.kontrak_sewa_peralatan_details.push({
        jenis_kontrak_id: "",
        divisi_id: "",
        jenis_biaya_id: "",
        gudang_id: "",
        term_pembayaran_id: "",
        jenis_peralatan_id: "",
      });
    },

    onDeletePeralatan(index) {
      this.parameters.form.kontrak_sewa_peralatan_details =
        this.parameters.form.kontrak_sewa_peralatan_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    onGetJenisKontrak(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKontrak);

      this.isStopSearchJenisKontrak = setTimeout(() => {
        this.jenis_kontrak_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchJenisKontrak();
      }, 600);
    },

    async onSearchJenisKontrak() {
      if (!this.isLoadingGetJenisKontrak) {
        this.isLoadingGetJenisKontrak = true;

        await this.lookUp({
          url: "master/jenis-kontrak/get-jenis-kontrak",
          lookup: "custom3",
          query:
            "?search=" +
            this.jenis_kontrak_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisKontrak = false;
      }
    },

    onGetDivisi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDivisi);

      this.isStopSearchDivisi = setTimeout(() => {
        this.divisi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchDivisi();
      }, 600);
    },

    async onSearchDivisi() {
      if (!this.isLoadingGetDivisi) {
        this.isLoadingGetDivisi = true;

        await this.lookUp({
          url: "master/divisi/get-divisi",
          lookup: "custom4",
          query:
            "?search=" +
            this.divisi_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDivisi = false;
      }
    },

    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchJenisBiaya = setTimeout(() => {
        this.jenis_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "custom5",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisBiaya = false;
      }
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom6",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    onGetTerm(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTerm);

      this.isStopSearchTerm = setTimeout(() => {
        this.term_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchTerm();
      }, 600);
    },

    async onSearchTerm() {
      if (!this.isLoadingGetTerm) {
        this.isLoadingGetTerm = true;

        await this.lookUp({
          url: "master/term-pembayaran/get-term-pembayaran",
          lookup: "custom7",
          query:
            "?search=" +
            this.term_search +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTerm = false;
      }
    },

    onGetSatuan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuan);

      this.isStopSearchSatuan = setTimeout(() => {
        this.satuan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchSatuan();
      }, 600);
    },

    async onSearchSatuan() {
      if (!this.isLoadingGetSatuan) {
        this.isLoadingGetSatuan = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "custom8",
          query:
            "?search=" +
            this.satuan_search +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuan = false;
      }
    },

    onGetPeralatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPeralatan);

      this.isStopSearchPeralatan = setTimeout(() => {
        this.peralatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchPeralatan();
      }, 600);
    },

    async onSearchPeralatan() {
      if (!this.isLoadingGetPeralatan) {
        this.isLoadingGetPeralatan = true;

        await this.lookUp({
          url: "master/jenis-peralatan/get-jenis-peralatan",
          lookup: "custom9",
          query:
            "?search=" +
            this.peralatan_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPeralatan = false;
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "finance/kontrak-sewa";

      let formData = {
        ...this.parameters.form,
        vendor_id:
          typeof this.parameters.form.vendor_id == "object"
            ? this.parameters.form.vendor_id.vendor_id
            : "",
        user_id_pic:
          typeof this.parameters.form.user_id_pic == "object"
            ? this.parameters.form.user_id_pic.user_id
            : "",
        jenis_kontrak_id:
          typeof this.parameters.form.jenis_kontrak_id == "object"
            ? this.parameters.form.jenis_kontrak_id.jenis_kontrak_id
            : "",
      };

      formData.kontrak_sewa_gudang_details =
        this.parameters.form.kontrak_sewa_gudang_details.map((item) => {
          return {
            ...item,
            kontrak_sewa_gudang_detail_id:
              typeof item.kontrak_sewa_gudang_detail_id === "object"
                ? item.kontrak_sewa_gudang_detail_id
                    .kontrak_sewa_gudang_detail_id
                : "",
            jenis_kontrak_id:
              typeof item.jenis_kontrak_id === "object"
                ? item.jenis_kontrak_id.jenis_kontrak_id
                : item.jenis_kontrak_id,
            divisi_id:
              typeof item.divisi_id === "object"
                ? item.divisi_id.divisi_id
                : item.divisi_id,
            jenis_biaya_id:
              typeof item.jenis_biaya_id === "object"
                ? item.jenis_biaya_id.jenis_biaya_id
                : item.jenis_biaya_id,
            gudang_id:
              typeof item.gudang_id === "object"
                ? item.gudang_id.gudang_id
                : item.gudang_id,
            mata_uang_id:
              typeof item.mata_uang_id === "object"
                ? item.mata_uang_id.mata_uang_id
                : item.mata_uang_id,
            pembayaran_id:
              typeof item.pembayaran_id === "object"
                ? item.pembayaran_id.pembayaran_id
                : item.pembayaran_id,
            term_pembayaran_id:
              typeof item.term_pembayaran_id === "object"
                ? item.term_pembayaran_id.term_pembayaran_id
                : item.term_pembayaran_id,
            satuan_id_luas:
              typeof item.satuan_id === "object"
                ? item.satuan_id.satuan_id
                : item.satuan_id,
          };
        });

      formData.kontrak_sewa_peralatan_details =
        this.parameters.form.kontrak_sewa_peralatan_details.map((item) => {
          return {
            ...item,
            kontrak_sewa_peralatan_detail_id:
              typeof item.kontrak_sewa_peralatan_detail_id === "object"
                ? item.kontrak_sewa_peralatan_detail_id
                    .kontrak_sewa_peralatan_detail_id
                : "",
            jenis_kontrak_id:
              typeof item.jenis_kontrak_id === "object"
                ? item.jenis_kontrak_id.jenis_kontrak_id
                : item.jenis_kontrak_id,
            divisi_id:
              typeof item.divisi_id === "object"
                ? item.divisi_id.divisi_id
                : item.divisi_id,
            jenis_biaya_id:
              typeof item.jenis_biaya_id === "object"
                ? item.jenis_biaya_id.jenis_biaya_id
                : item.jenis_biaya_id,
            gudang_id:
              typeof item.gudang_id === "object"
                ? item.gudang_id.gudang_id
                : item.gudang_id,
            mata_uang_id:
              typeof item.mata_uang_id === "object"
                ? item.mata_uang_id.mata_uang_id
                : item.mata_uang_id,
            pembayaran_id:
              typeof item.pembayaran_id === "object"
                ? item.pembayaran_id.pembayaran_id
                : item.pembayaran_id,
            term_pembayaran_id:
              typeof item.term_pembayaran_id === "object"
                ? item.term_pembayaran_id.term_pembayaran_id
                : item.term_pembayaran_id,
            satuan_id_luas:
              typeof item.satuan_id === "object"
                ? item.satuan_id.satuan_id
                : item.satuan_id,
          };
        });

      if (this.isEditable) {
        url += `/${this.id}`;
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
          if (!this.isEditable) {
            this.parameters.form = this.default_form;
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

    formReset() {
      this.isEditable = false;
      this.parameters.form = this.default_form;
    },
  },
};
</script>
