<template>
  <section class="section">
    <div class="bg-white rounded-md px-4 py-2 shadow-sm mb-10">
      <div class="section-body mb-4" v-if="!isLoadingPage">
        <div class="flex justify-between items-center w-full">
          <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
            Edit Data Pelanggan
          </h1>
          <h1 v-else class="text-xl font-bold mb-2 uppercase">
            Tambah Data Pelanggan
          </h1>
          <button class="btn btn-primary my-2" @click="$router.back()">
            <i class="fas fa-arrow-left mr-2"></i>
            Kembali
          </button>
        </div>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form @submit.prevent="validate().then(() => onSubmit(invalid))">
          <div class="modal-body mt-4">
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group w-full items-center mb-5">
                <label for="">Pelanggan Induk</label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  v-model="parameters.form.pelanggan_id_induk"
                  :loading="isLoadingGetPelangganInduk"
                  :filterable="false"
                  @search="onGetPelangganInduk"
                  label="nama_pelanggan"
                  :reduce="(item) => item.pelanggan_id"
                  :options="lookup_regus.data"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_regus.data.length || search"
                  >
                    <span
                      v-if="lookup_regus.current_page > 1"
                      @click="onGetPelangganInduk(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="lookup_regus.last_page > lookup_regus.current_page"
                      @click="onGetPelangganInduk(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
              <ValidationProvider name="tipe_badan_hukum" rules="required">
                <div class="form-group w-full items-center mb-5">
                  <label for=""
                    >Tipe Badan Hukum <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_tipe_badan_hukum"
                    :loading="isLoadingGetTBH"
                    :options="lookup_department.data"
                    :filterable="false"
                    @search="onGetTBH"
                    :reduce="(item) => item.tipe_badan_hukum_id"
                    v-model="parameters.form.tipe_badan_hukum_id"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_department.data.length || search"
                    >
                      <span
                        v-if="lookup_department.current_page > 1"
                        @click="onGetTBH(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_department.last_page >
                          lookup_department.current_page
                        "
                        @click="onGetTBH(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <div class="form-group w-full items-center mb-5">
                <label for="" class="w-4/12">User Sales</label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_lengkap"
                  :loading="isLoadingGetUserPIC"
                  :options="lookup_users.data"
                  :filterable="false"
                  @search="onGetUserPIC"
                  :reduce="(item) => item.user_id"
                  v-model="parameters.form.user_id_sales"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_users.data.length || search"
                  >
                    <span
                      v-if="lookup_users.current_page > 1"
                      @click="onGetUserPIC(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="lookup_users.last_page > lookup_users.current_page"
                      @click="onGetUserPIC(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Kode Referensi"
                  type="text"
                  name="kode_referensi"
                  :required="true"
                  v-model="parameters.form.kode_referensi"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Kode Pelanggan"
                  type="text"
                  name="kode_pelanggan"
                  :required="true"
                  v-model="parameters.form.kode_pelanggan"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Nomor NPWP Pelanggan"
                  type="text"
                  name="no_npwp"
                  :required="false"
                  v-model="parameters.form.no_npwp"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Nama Pelanggan"
                  type="text"
                  name="nama_pelanggan"
                  :required="true"
                  v-model="parameters.form.nama_pelanggan"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Alias / Singkatan"
                  type="text"
                  name="alias"
                  :required="true"
                  v-model="parameters.form.alias"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Email"
                  type="email"
                  name="email"
                  :required="false"
                  v-model="parameters.form.email"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <ValidationProvider name="id_negara" rules="required">
                <div class="form-group w-full items-center mb-5">
                  <label for="" class="w-4/12"
                    >Negara <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_negara"
                    :loading="isLoadingGetNegara"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetNegara"
                    :reduce="(item) => item.negara_id"
                    v-model="parameters.form.negara_id"
                    @input="onSelectNegara"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom1.data.length || search"
                    >
                      <span
                        v-if="lookup_custom1.current_page > 1"
                        @click="onGetNegara(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetNegara(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <ValidationProvider name="id_provinsi" rules="required">
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
                  <label for="" class="w-4/12"
                    >Provinsi <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_provinsi"
                    :loading="isLoadingGetProvinsi"
                    :options="lookup_custom2.data"
                    :filterable="false"
                    @search="onGetProvinsi"
                    :reduce="(item) => item.provinsi_id"
                    v-model="parameters.form.provinsi_id"
                    @input="onSelectProvinsi"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom2.data.length || search"
                    >
                      <span
                        v-if="lookup_custom2.current_page > 1"
                        @click="onGetProvinsi(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom2.last_page > lookup_custom2.current_page
                        "
                        @click="onGetProvinsi(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <ValidationProvider name="id_kota" rules="required">
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
                  <label for="" class="w-4/12"
                    >Kota <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_kota"
                    :loading="isLoadingGetKota"
                    :options="lookup_custom3.data"
                    :filterable="false"
                    @search="onGetKota"
                    :reduce="(item) => item.kota_id"
                    v-model="parameters.form.kota_id"
                    @input="onSelectKota"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom3.data.length || search"
                    >
                      <span
                        v-if="lookup_custom3.current_page > 1"
                        @click="onGetKota(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom3.last_page > lookup_custom3.current_page
                        "
                        @click="onGetKota(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <ValidationProvider name="id_kecamatan" rules="required">
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
                  <label for="" class="w-4/12"
                    >Kecamatan <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_kecamatan"
                    :loading="isLoadingGetKecamatan"
                    :options="lookup_beam.data"
                    :filterable="false"
                    @search="onGetKecamatan"
                    :reduce="(item) => item.kecamatan_id"
                    v-model="parameters.form.kecamatan_id"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                    @input="onSelectKecamatan"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_beam.data.length || search"
                    >
                      <span
                        v-if="lookup_beam.current_page > 1"
                        @click="onGetKecamatan(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="lookup_beam.last_page > lookup_beam.current_page"
                        @click="onGetKecamatan(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <div class="form-group w-full items-center mb-5">
                <label for="" class="w-4/12">Kelurahan</label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_kelurahan"
                  :loading="isLoadingGetKelurahan"
                  :options="lookup_grade.data"
                  :filterable="false"
                  @search="onGetKelurahan"
                  :reduce="(item) => item.kelurahan_id"
                  v-model="parameters.form.kelurahan_id"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_grade.data.length || search"
                  >
                    <span
                      v-if="lookup_grade.current_page > 1"
                      @click="onGetKelurahan(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="lookup_grade.last_page > lookup_grade.current_page"
                      @click="onGetKelurahan(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
              <div class="form-group">
                <input-form
                  label="Kode Pos"
                  type="text"
                  name="kode_pos"
                  :required="false"
                  v-model="parameters.form.kode_pos"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Rentang Retur Penjualan"
                  type="number"
                  name="rentang_retur_penjualan"
                  :required="false"
                  v-model="parameters.form.rentang_retur_penjualan"
                />
              </div>
              <div class="form-group col-12">
                <label for="nilai_plafon">Nilai Plafon</label>
                <money
                  v-model="parameters.form.nilai_plafon"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <!-- <div class="text-muted text-small">* Meter</div> -->
              </div>
              <ValidationProvider name="tipe_badan_hukum" rules="required">
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
                  <label for="" class="w-4/12"
                    >Lokasi <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_lokasi"
                    :loading="isLoadingGetLokasi"
                    :options="lookup_location.data"
                    :filterable="false"
                    @search="onGetLokasi"
                    :reduce="(item) => item.lokasi_id"
                    v-model="parameters.form.lokasi_id"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_location.data.length || search"
                    >
                      <span
                        v-if="lookup_location.current_page > 1"
                        @click="onGetLokasi(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_location.last_page >
                          lookup_location.current_page
                        "
                        @click="onGetLokasi(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Nama Pemilik"
                  type="text"
                  name="nama_pemilik"
                  :required="true"
                  v-model="parameters.form.nama_pemilik"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="No Telpone"
                  type="text"
                  name="no_telp"
                  :required="false"
                  v-model="parameters.form.no_telp"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="No HP"
                  type="text"
                  name="no_hp"
                  :required="false"
                  v-model="parameters.form.no_hp"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="NIK Pemilik"
                  type="text"
                  name="nik_pemilik"
                  :required="false"
                  v-model="parameters.form.nik_pemilik"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="No NPWP Pemilik"
                  type="text"
                  name="no_npwp_pemilik"
                  :required="false"
                  v-model="parameters.form.no_npwp_pemilik"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Nomor SIUP"
                  type="text"
                  name="nomor_siup"
                  :required="false"
                  v-model="parameters.form.nomor_siup"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Nama Contact Person"
                  type="text"
                  name="nama_cp"
                  :required="false"
                  v-model="parameters.form.nama_cp"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="No Telepon Contact Person"
                  type="text"
                  name="telp_cp"
                  :required="false"
                  v-model="parameters.form.telp_cp"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="No HP Contact Person"
                  type="text"
                  name="hp_cp"
                  :required="false"
                  v-model="parameters.form.hp_cp"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <ValidationProvider
                name="longitude"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group">
                  <input-form
                    label="Longitude"
                    type="text"
                    name="longitude"
                    :required="true"
                    v-model="parameters.form.longitude"
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider
                name="latitude"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group">
                  <input-form
                    label="Latitude"
                    type="text"
                    name="latitude"
                    :required="true"
                    v-model="parameters.form.latitude"
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider name="radius" rules="required">
                <div class="form-group col-12" slot-scope="{ errors, valid }">
                  <label for="radius"
                    >Radius <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.radius"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                  />
                  <div class="text-muted text-small">* Meter</div>
                </div>
              </ValidationProvider>
            </div>
            <div class="grid grid-cols-2 gap-2 w-full">
              <div class="form-group">
                <label for="alamat_pelanggan"
                  >Alamat Pelanggan <span class="text-danger">*</span></label
                >
                <textarea
                  placeholder="Alamat Pelanggan"
                  required
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.alamat_pelanggan"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="alamat_pemilik"
                  >Alamat Pemilik <span class="text-danger">*</span></label
                >
                <textarea
                  placeholder="Alamat Pemilik"
                  required
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.alamat_pemilik"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-start">
            <modal-footer-section
              class="mt-5"
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>

    <div
      class="relative p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
    >
      <div class="card-title">
        <list-option-section :self="this" ref="form-option" />
      </div>
      <div class="w-full mt-3 mb-7">
        <div
          class="flex w-full justify-between items-end p-2 border border-gray-300 rounded-md"
        >
          <div class="grid grid-flow-col grid-rows-3 gap-2">
            <div class="flex w-[400px]">
              <label class="w-[40%]" for="kategori_item_id_1"
                >Kategori Item Level 1</label
              >
              <v-select
                label="nama_kategori_item"
                :loading="isLoadingGetKategoriItem1"
                :options="lookup_products.data"
                :filterable="false"
                @search="onGetKategoriItem1"
                v-model="filter_params.kategori_item_id_1"
                :reduce="(item) => item.kategori_item_id"
                class="w-[60%]"
                @input="onSearchKategoriItem1"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_products.data.length || search"
                >
                  <span
                    v-if="lookup_products.current_page > 1"
                    @click="onGetKategoriItem1(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_products.last_page > lookup_products.current_page
                    "
                    @click="onGetKategoriItem1(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="flex">
              <label class="w-[40%]" for="kategori_item_id_2"
                >Kategori Item Level 2</label
              >
              <v-select
                label="nama_kategori_item"
                :loading="isLoadingGetKategoriItem2"
                :options="lookup_packing.data"
                :filterable="false"
                @search="onGetKategoriItem2"
                v-model="filter_params.kategori_item_id_2"
                :reduce="(item) => item.kategori_item_id"
                class="w-[60%]"
                @input="onSearchKategoriItem2"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_packing.data.length || search"
                >
                  <span
                    v-if="lookup_packing.current_page > 1"
                    @click="onGetKategoriItem2(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_packing.last_page > lookup_packing.current_page
                    "
                    @click="onGetKategoriItem2(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="flex">
              <label class="w-[40%]" for="kategori_item_id_3"
                >Kategori Item Level 3</label
              >
              <v-select
                label="nama_kategori_item"
                :loading="isLoadingGetKategoriItem3"
                :options="lookup_defects.data"
                :filterable="false"
                @search="onGetKategoriItem3"
                v-model="filter_params.kategori_item_id_3"
                :reduce="(item) => item.kategori_item_id"
                class="w-[60%]"
                @input="onSearchKategoriItem3"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_defects.data.length || search"
                >
                  <span
                    v-if="lookup_defects.current_page > 1"
                    @click="onGetKategoriItem3(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_defects.last_page > lookup_defects.current_page
                    "
                    @click="onGetKategoriItem3(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="flex w-[400px]">
              <label class="w-[40%]" for="kategori_item_id_4"
                >Kategori Item Level 4</label
              >
              <v-select
                label="nama_kategori_item"
                :loading="isLoadingGetKategoriItem4"
                :options="lookup_customers.data"
                :filterable="false"
                @search="onGetKategoriItem4"
                v-model="filter_params.kategori_item_id_4"
                :reduce="(item) => item.kategori_item_id"
                class="w-[60%]"
                @input="onSearchKategoriItem4"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_customers.data.length || search"
                >
                  <span
                    v-if="lookup_customers.current_page > 1"
                    @click="onGetKategoriItem4(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_customers.last_page > lookup_customers.current_page
                    "
                    @click="onGetKategoriItem4(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="flex">
              <label class="w-[40%]" for="kategori_item_id_5"
                >Kategori Item Level 5</label
              >
              <v-select
                label="nama_kategori_item"
                :loading="isLoadingGetKategoriItem5"
                :options="lookup_parents.data"
                :filterable="false"
                @search="onGetKategoriItem5"
                v-model="filter_params.kategori_item_id_5"
                :reduce="(item) => item.kategori_item_id"
                class="w-[60%]"
                @input="onSearchKategoriItem5"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_parents.data.length || search"
                >
                  <span
                    v-if="lookup_parents.current_page > 1"
                    @click="onGetKategoriItem4(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_parents.last_page > lookup_parents.current_page
                    "
                    @click="onGetKategoriItem5(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
          </div>
          <div class="flex gap-3 ml-5 items-self-end">
            <button
              @click="onLoad"
              class="bg-blue-500 hover:bg-blue-500 p-2 text-white rounded-md"
            >
              <i class="fa fa-filter text-white font-bold mr-2"></i>
              Filter
            </button>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table ref="">
          <thead>
            <tr class="uppercase">
              <th class="w-[5%] text-center">Details</th>
              <th class="w-[5%] text-center">Delete</th>
              <th class="w-[5%]">No</th>
              <th>Kode Item</th>
              <th>Referensi SAP</th>
              <th
                @click="
                  onSort(
                    'nama_item',
                    parameters.params.sort == 'asc' ? 'desc' : 'asc'
                  )
                "
                class="cursor-pinter"
              >
                <div class="flex justify-between items-baseline">
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
              <th>Satuan</th>
              <th>Berat</th>
              <th>Volume</th>
              <th>Group Item</th>
            </tr>
          </thead>
          <tbody v-if="lookup_products.data.length > 0">
            <tr v-for="item in lookup_products.data" :key="item.item_id">
              <td>
                <small-detail-button @click="onDetail(item)" />
              </td>
              <td>
                <small-delete-button
                  @click="onTrashed(item)"
                  v-if="!item.deleted_at"
                />
              </td>
              <td>
                {{
                  (parameters.params.page - 1) * parameters.params.per_page +
                  i +
                  1
                }}
              </td>
              <td>{{ item.kode_wms }}</td>
              <td></td>
              <td>{{ item.nama_item }}</td>
              <td>{{ item.satuan.nama_satuan }}</td>
              <td>{{ item.berat + " " + item.satuan_berat.nama_satuan }}</td>
              <td>{{ item.volume + " " + item.satuan_volume.nama_satuan }}</td>
              <td>{{ item.group_item_1.nama_group_item }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  props: ["self"],
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Item Pelanggan",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      isStopSearchNegara: false,
      isLoadingGetNegara: false,
      negara_search: "",

      isStopSearchProvinsi: false,
      isLoadingGetProvinsi: false,
      provinsi_search: "",

      isStopSearchKota: false,
      isLoadingGetKota: false,
      kota_search: "",

      isStopSearchKecamatan: false,
      isLoadingGetKecamatan: false,
      kecamatan_search: "",

      isStopSearchKelurahan: false,
      isLoadingGetKelurahan: false,
      kelurahan_search: "",

      isStopSearchTBH: false,
      isLoadingGetTBH: false,
      TBH_search: "",

      isStopSearchUserPIC: false,
      isLoadingGetUserPIC: false,
      userPIC_search: "",

      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",

      isStopSearchPelangganInduk: false,
      isLoadingGetPelangganInduk: false,
      pelangganInduk_search: "",

      isStopSearchKategoriItem1: false,
      isLoadingGetKategoriItem1: false,
      kategori1_search: "",

      isStopSearchKategoriItem2: false,
      isLoadingGetKategoriItem2: false,
      kategori2_search: "",

      isStopSearchKategoriItem3: false,
      isLoadingGetKategoriItem3: false,
      kategori3_search: "",

      isStopSearchKategoriItem4: false,
      isLoadingGetKategoriItem4: false,
      kategori4_search: "",

      isStopSearchKategoriItem5: false,
      isLoadingGetKategoriItem5: false,
      kategori5_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pelanggan",
      itemTitle: "Item Pelanggan",
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        kategori_item_id: "",
        params: {
          soft_deleted: "",
          search: "",
          order: "item_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          kategori_item_id_1: "",
          kategori_item_id_2: "",
          kategori_item_id_3: "",
          kategori_item_id_4: "",
          kategori_item_id_5: "",
        },
        url: "master/pelanggan",
        form: {
          pelanggan_id_induk: "",
          tipe_badan_hukum_id: "",
          user_id_sales: "",
          alias: "",
          kode_referensi: "",
          kode_pelanggan: "",
          no_npwp: "",
          nama_pelanggan: "",
          email: "",
          alamat_pelanggan: "",
          kelurahan_id: "",
          kecamatan_id: "",
          kota_id: "",
          provinsi_id: "",
          negara_id: "",
          kode_pos: "",
          nama_pemilik: "",
          alamat_pemilik: "",
          no_telp: "",
          no_hp: "",
          nik_pemilik: "",
          no_npwp_pemilik: "",
          nomor_siup: "",
          nama_cp: "",
          telp_cp: "",
          hp_cp: "",
          nilai_plafon: "",
          lokasi_id: "",
          rentang_retur_penjualan: "",
          longitude: "",
          latitude: "",
          radius: "",
        },

        formItem: {
          item_id: "",
          kode_wms: "",
          kode_alternatif: "",
          kode_alternatif_2: "",
          nama_item: "",
          satuan_id: "",
          satuan_id_berat: "",
          berat: "",
          satuan_id_volume: "",
          volume: "",
          satuan_id_stocklevel: "",
          value_stocklevel: "",
          keterangan: "",
          group_item_id_1: "",
          group_item_id_2: "",
          group_item_id_3: "",
          group_item_id_4: "",
          group_item_id_5: "",
          batas_bawah: "",
          batas_atas: "",
          kategori_id_1: "",
          kategori_id_2: "",
          kategori_id_3: "",
          kategori_id_4: "",
          kategori_id_5: "",
          kapasitas_palet: "",
          maksimum_tumpukan: "",
          supplier_id: "",
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },

      filter_params: {
        kategori_item_id_1: "",
        kategori_item_id_2: "",
        kategori_item_id_3: "",
        kategori_item_id_4: "",
        kategori_item_id_5: "",
      },
      selectList: [],

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
      user: this.$auth.user,
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get("master/pelanggan/" + this.id);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/master/pelanggan");
    }
    this.set_data([]);
    this.onLoad();
  },

  async mounted() {
    await this.onSearchNegara();
    await this.onSearchProvinsi();
    await this.onSearchKota();
    await this.onSearchKecamatan();
    await this.onSearchKelurahan();
    await this.onSearchTBH();
    await this.onSearchUserPIC();
    await this.onSearchLokasi();
    await this.onSearchPelangganInduk();
    await this.onSearchKategoriItem1();
    await this.onSearchKategoriItem2();
    await this.onSearchKategoriItem3();
    await this.onSearchKategoriItem4();
    await this.onSearchKategoriItem5();

    await this.lookUp({
      url: "master/kategori-item/get-kategori-item",
      lookup: "sellers",
    });

    this.$refs["form-option"].isExport = false;
    this.$refs["form-option"].isFilter = false;
    this.$refs["form-option"].isMaintenancePage = true;
    this.$refs["form-option"].isAddData = false;

    if (
      this.getRoles.destroy ||
      this.getRoles.destroy_all ||
      this.getRoles.restore ||
      this.getRoles.restore_all
    ) {
      this.$refs["form-option"].isMaintenancePage = true;
    }

    if (this.getRoles.store) {
      this.$refs["form-option"].isAddData = true;
    }

    if (this.getRoles.export) {
      this.$refs["form-option"].isExportFile = false;

      this.$refs["form-option"].isExportFilePdf = false;
      this.$refs["form-option"].isExportFileExcel = false;

      if ("export_pdf" in this.getRoles || "export_excel" in this.getRoles) {
        this.$refs["form-option"].isExportFilePdf = this.getRoles.export_pdf;
        this.$refs["form-option"].isExportFileExcel =
          this.getRoles.export_excel;
      }
    }

    if (this.getRoles.print) {
      this.$refs["form-option"].isExportPrint = true;
    }
  },
  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_custom1", //negara
      "lookup_custom2", //provinsi
      "lookup_custom3", //kota
      "lookup_beam", //kecamatan
      "lookup_grade", //kelurahan
      "lookup_department", //tipe badan hukum
      "lookup_users", //user pic
      "lookup_regus", //pelanggan_induk
      "lookup_location", //lokasi
      "lookup_sellers", //tipe vendor
      "lookup_products", //kategori 1
      "lookup_packing", //kategori 2
      "lookup_defects", //kategori 3
      "lookup_customers", //kategori 4
      "lookup_parents", //kategori 5
    ]),
    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "item"
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
      "addData",
      "updateData",
      "lookUp",
      "getData",
      "deleteData",
      "restoreData",
      "deleteAllData",
      "restoreAllData",
    ]),

    ...mapMutations("moduleApi", ["set_data"]),

    onFormShow() {
      this.$router.push("/master/pelanggan/item-pelanggan/add");
    },

    onEdit(item) {
      this.$router.push("/master/pelanggan/item-pelanggan/" + item.item_id);
    },

    onTrashed(item) {
      if (this.parameters.loadings.isDelete) return;

      this.$confirm({
        auth: false,
        message: "Data ini akan dipindahkan ke dalam Trash. Yakin ??",
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: async (confirm) => {
          if (confirm) {
            this.parameters.loadings.isDelete = true;

            await this.deleteData({
              url: this.parameters.url,
              id: item.item_id,
              params: this.parameters.params,
            });

            if (this.result == true) {
              this.onLoad(this.parameters.params.page);
              this.$toaster.success(
                "Data berhasil di pindahkan ke dalam Trash!"
              );
            } else {
              this.$globalErrorToaster(this.$toaster, this.error);
            }

            this.parameters.loadings.isDelete = false;
          }
        },
      });
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = page;

      this.parameters.form.checkboxs = [];
      if (document.getElementById("checkAll")) {
        document.getElementById("checkAll").checked = false;
      }

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      this.parameters.params.kategori_item_id_1 =
        this.filter_params.kategori_item_id_1;
      this.parameters.params.kategori_item_id_2 =
        this.filter_params.kategori_item_id_2;
      this.parameters.params.kategori_item_id_3 =
        this.filter_params.kategori_item_id_3;
      this.parameters.params.kategori_item_id_4 =
        this.filter_params.kategori_item_id_4;
      this.parameters.params.kategori_item_id_5 =
        this.filter_params.kategori_item_id_5;

      await this.getData(this.parameters);
      this.parameters.selectedList = this.parameters;

      if (this.result == true) {
        loader.hide();

        if (page == 1) {
          this.$refs["pagination"].generatePage();
        }

        this.$refs["pagination"].active_page = this.parameters.params.page;
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingData = false;
    },

    onSort(column, sort = "asc") {
      this.parameters.params = {
        ...this.parameters.params,
        order: column,
        sort: sort,
      };

      this.onLoad(this.parameters.params.page);
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          id: this.parameters.form.pelanggan_id
            ? this.parameters.form.pelanggan_id
            : "",
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
        this.isEditable = false;
        this.parameters.form = {
          pelanggan_id_induk: "",
          tipe_badan_hukum_id: "",
          user_id_sales: "",
          alias: "",
          kode_referensi: "",
          kode_pelanggan: "",
          no_npwp: "",
          nama_pelanggan: "",
          email: "",
          alamat_pelanggan: "",
          kelurahan_id: "",
          kecamatan_id: "",
          kota_id: "",
          provinsi_id: "",
          negara_id: "",
          kode_pos: "",
          nama_pemilik: "",
          alamat_pemilik: "",
          no_telp: "",
          no_hp: "",
          nik_pemilik: "",
          no_npwp_pemilik: "",
          nomor_siup: "",
          nama_cp: "",
          telp_cp: "",
          hp_cp: "",
          nilai_plafon: "",
          lokasi_id: "",
          rentang_retur_penjualan: "",
          longitude: "",
          latitude: "",
          radius: "",
        };
        this.$refs.formValidate.reset();
        this.$refs.ruteProvider.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }
      this.isLoadingForm = false;
    },

    //Negara Methods Start
    onGetNegara(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchNegara);

      this.isStopSearchNegara = setTimeout(() => {
        this.negara_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchNegara();
      }, 600);
      this.onSearchProvinsi();
    },

    async onSearchNegara() {
      if (!this.isLoadingGetNegara) {
        this.isLoadingGetNegara = true;

        await this.lookUp({
          url: "master/negara/get-negara",
          lookup: "custom1",
          query:
            "?search=" +
            this.negara_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });
        this.isLoadingGetNegara = false;
      }
    },

    //Provinsi Methods Start
    onGetProvinsi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProvinsi);

      this.isStopSearchProvinsi = setTimeout(() => {
        this.provinsi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchProvinsi();
      }, 600);
      this.onSearchKota();
    },

    async onSearchProvinsi() {
      if (!this.isLoadingGetProvinsi) {
        this.isLoadingGetProvinsi = true;

        await this.lookUp({
          url: "master/provinsi/get-provinsi",
          lookup: "custom2",
          query:
            "?search=" +
            this.provinsi_search +
            "&negara_id=" +
            this.parameters.form.negara_id +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProvinsi = false;
      }
    },

    //Kota Methods Start
    onGetKota(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKota);

      this.isStopSearchKota = setTimeout(() => {
        this.kota_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchKota();
      }, 600);
      this.onSearchKecamatan();
    },

    async onSearchKota() {
      if (!this.isLoadingGetKota) {
        this.isLoadingGetKota = true;

        await this.lookUp({
          url: "master/kota/get-kota",
          lookup: "custom3",
          query:
            "?search=" +
            this.kota_search +
            "&provinsi_id=" +
            this.parameters.form.provinsi_id +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKota = false;
      }
    },

    //Kecamatan Methods Start
    onGetKecamatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKecamatan);

      this.isStopSearchKecamatan = setTimeout(() => {
        this.kecamatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchKecamatan();
      }, 600);
      this.onSearchKelurahan();
    },

    async onSearchKecamatan() {
      if (!this.isLoadingGetKecamatan) {
        this.isLoadingGetKecamatan = true;

        await this.lookUp({
          url: "master/kecamatan/get-kecamatan",
          lookup: "beam",
          query:
            "?search=" +
            this.kecamatan_search +
            "&kota_id=" +
            this.parameters.form.kota_id +
            "&page=" +
            this.lookup_beam.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKecamatan = false;
      }
    },

    //Kelurahan Methods Start
    onGetKelurahan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKelurahan);

      this.isStopSearchKelurahan = setTimeout(() => {
        this.kelurahan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchKelurahan();
      }, 600);
    },

    async onSearchKelurahan() {
      if (!this.isLoadingGetKelurahan) {
        this.isLoadingGetKelurahan = true;

        await this.lookUp({
          url: "master/kelurahan/get-kelurahan",
          lookup: "grade",
          query:
            "?search=" +
            this.kelurahan_search +
            "&kecamatan_id=" +
            this.parameters.form.kecamatan_id +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKelurahan = false;
      }
    },

    //Tipe Badan Hukum Methods Start
    onGetTBH(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTBH);

      this.isStopSearchTBH = setTimeout(() => {
        this.TBH_search = search;

        if (typeof isNext !== "function") {
          this.lookup_department.current_page = isNext
            ? this.lookup_department.current_page + 1
            : this.lookup_department.current_page - 1;
        } else {
          this.lookup_department.current_page = 1;
        }

        this.onSearchTBH();
      }, 600);
    },

    async onSearchTBH() {
      if (!this.isLoadingGetTBH) {
        this.isLoadingGetTBH = true;

        await this.lookUp({
          url: "master/tipe-badan-hukum/get-tipe-badan-hukum",
          lookup: "department",
          query:
            "?search=" +
            this.TBH_search +
            "&page=" +
            this.lookup_department.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTBH = false;
      }
    },

    //User PIC Methods Start
    onGetUserPIC(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchUserPIC);

      this.isStopSearchUserPIC = setTimeout(() => {
        this.userPIC_search = search;

        if (typeof isNext !== "function") {
          this.lookup_users.current_page = isNext
            ? this.lookup_users.current_page + 1
            : this.lookup_users.current_page - 1;
        } else {
          this.lookup_users.current_page = 1;
        }

        this.onSearchUserPIC();
      }, 600);
    },

    async onSearchUserPIC() {
      if (!this.isLoadingGetUserPIC) {
        this.isLoadingGetUserPIC = true;

        await this.lookUp({
          url: "setting/user",
          lookup: "users",
          query:
            "?search=" +
            this.userPIC_search +
            "&page=" +
            this.lookup_users.current_page +
            "&per_page=10",
        });

        this.isLoadingGetUserPIC = false;
      }
    },

    //Lokasi Methods Start
    onGetLokasi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchLokasi);

      this.isStopSearchLokasi = setTimeout(() => {
        this.lokasi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_location.current_page = isNext
            ? this.lookup_location.current_page + 1
            : this.lookup_location.current_page - 1;
        } else {
          this.lookup_location.current_page = 1;
        }

        this.onSearchLokasi();
      }, 600);
    },

    async onSearchLokasi() {
      if (!this.isLoadingGetLokasi) {
        this.isLoadingGetLokasi = true;

        await this.lookUp({
          url: "master/lokasi/get-lokasi",
          lookup: "location",
          query:
            "?search=" +
            this.lokasi_search +
            "&page=" +
            this.lookup_location.current_page +
            "&per_page=10",
        });

        this.isLoadingGetLokasi = false;
      }
    },

    //Pelanggan Induk Methods Start
    onGetPelangganInduk(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelangganInduk);

      this.isStopSearchPelangganInduk = setTimeout(() => {
        this.pelangganInduk_search = search;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }

        this.onSearchPelangganInduk();
      }, 600);
    },

    async onSearchPelangganInduk() {
      if (!this.isLoadingGetPelangganInduk) {
        this.isLoadingGetPelangganInduk = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "regus",
          query:
            "?search=" +
            this.pelangganInduk_search +
            "&page=" +
            this.lookup_regus.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelangganInduk = false;
      }
    },

    //Item Methods Start
    onGetItem(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItem);

      this.isStopSearchItem = setTimeout(() => {
        this.item_search = search;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_products.current_page + 1
            : this.lookup_products.current_page - 1;
        } else {
          this.lookup_products.current_page = 1;
        }

        this.onSearchItem();
      }, 600);
    },

    //Kategori Item Methods Start
    onGetKategoriItem1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategoriItem1);

      this.isStopSearchKategoriItem1 = setTimeout(() => {
        this.kategori1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_products.current_page = isNext
            ? this.lookup_products.current_page + 1
            : this.lookup_products.current_page - 1;
        } else {
          this.lookup_products.current_page = 1;
        }

        this.onSearchKategoriItem1();
      }, 600);
    },

    async onSearchKategoriItem1() {
      if (!this.isLoadingGetKategoriItem1) {
        this.isLoadingGetKategoriItem1 = true;

        await this.lookUp({
          url: "master/item/get-item",
          lookup: "products",
          query:
            "?search=" +
            this.kategori1_search +
            "&kategori_item_id=1" +
            "&page=" +
            this.lookup_products.current_page +
            "&per_page=10",
        });
        this.isLoadingGetKategoriItem1 = false;
      }
    },

    onGetKategoriItem2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategoriItem2);

      this.isStopSearchKategoriItem2 = setTimeout(() => {
        this.kategori2_search = search;

        if (typeof isNext !== "function") {
          this.lookup_packing.current_page = isNext
            ? this.lookup_packing.current_page + 1
            : this.lookup_packing.current_page - 1;
        } else {
          this.lookup_packing.current_page = 1;
        }

        this.onSearchKategoriItem2();
      }, 600);
    },

    async onSearchKategoriItem2() {
      if (!this.isLoadingGetKategoriItem2) {
        this.isLoadingGetKategoriItem2 = true;

        await this.lookUp({
          url: "master/item/get-item",
          lookup: "packing",
          query:
            "?search=" +
            this.kategori2_search +
            "&kategori_item_id=2" +
            "&page=" +
            this.lookup_packing.current_page +
            "&per_page=10",
        });
        this.isLoadingGetKategoriItem2 = false;
      }
    },

    onGetKategoriItem3(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategoriItem3);

      this.isStopSearchKategoriItem3 = setTimeout(() => {
        this.kategori3_search = search;

        if (typeof isNext !== "function") {
          this.lookup_defects.current_page = isNext
            ? this.lookup_defects.current_page + 1
            : this.lookup_defects.current_page - 1;
        } else {
          this.lookup_defects.current_page = 1;
        }

        this.onSearchKategoriItem3();
      }, 600);
    },

    async onSearchKategoriItem3() {
      if (!this.isLoadingGetKategoriItem3) {
        this.isLoadingGetKategoriItem3 = true;

        await this.lookUp({
          url: "master/item/get-item",
          lookup: "defects",
          query:
            "?search=" +
            this.kategori3_search +
            "&kategori_item_id=3" +
            "&page=" +
            this.lookup_defects.current_page +
            "&per_page=10",
        });
        this.isLoadingGetKategoriItem3 = false;
      }
    },

    onGetKategoriItem4(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategoriItem4);

      this.isStopSearchKategoriItem4 = setTimeout(() => {
        this.kategori4_search = search;

        if (typeof isNext !== "function") {
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }

        this.onSearchKategoriItem4();
      }, 600);
    },

    async onSearchKategoriItem4() {
      if (!this.isLoadingGetKategoriItem4) {
        this.isLoadingGetKategoriItem4 = true;

        await this.lookUp({
          url: "master/item/get-item",
          lookup: "customers",
          query:
            "?search=" +
            this.kategori4_search +
            "&kategori_item_id=4" +
            "&page=" +
            this.lookup_customers.current_page +
            "&per_page=10",
        });
        this.isLoadingGetKategoriItem4 = false;
      }
    },

    onGetKategoriItem5(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategoriItem5);

      this.isStopSearchKategoriItem5 = setTimeout(() => {
        this.kategori5_search = search;

        if (typeof isNext !== "function") {
          this.lookup_parents.current_page = isNext
            ? this.lookup_parents.current_page + 1
            : this.lookup_parents.current_page - 1;
        } else {
          this.lookup_parents.current_page = 1;
        }

        this.onSearchKategoriItem5();
      }, 600);
    },

    async onSearchKategoriItem5() {
      if (!this.isLoadingGetKategoriItem5) {
        this.isLoadingGetKategoriItem5 = true;

        await this.lookUp({
          url: "master/item/get-item",
          lookup: "parents",
          query:
            "?search=" +
            this.kategori5_search +
            "&kategori_item_id=5" +
            "&page=" +
            this.lookup_parents.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKategoriItem5 = false;
      }
    },

    onSelectNegara() {
      this.parameters.form.provinsi_id = "";
      this.parameters.form.kota_id = "";
      this.parameters.form.kecamatan_id = "";
      this.parameters.form.kelurahan_id = "";
      this.onSearchProvinsi();
    },

    onSelectProvinsi() {
      this.parameters.form.kota_id = "";
      this.parameters.form.kecamatan_id = "";
      this.parameters.form.kelurahan_id = "";
      this.onSearchKota();
    },

    onSelectKota() {
      this.parameters.form.kecamatan_id = "";
      this.parameters.form.kelurahan_id = "";
      this.onSearchKecamatan();
    },

    onSelectKecamatan() {
      this.parameters.form.kelurahan_id = "";
      this.onSearchKelurahan();
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        pelanggan_id_induk: "",
        tipe_badan_hukum_id: "",
        user_id_sales: "",
        alias: "",
        kode_referensi: "",
        kode_pelanggan: "",
        no_npwp: "",
        nama_pelanggan: "",
        email: "",
        alamat_pelanggan: "",
        kelurahan_id: "",
        kecamatan_id: "",
        kota_id: "",
        provinsi_id: "",
        negara_id: "",
        kode_pos: "",
        nama_pemilik: "",
        alamat_pemilik: "",
        no_telp: "",
        no_hp: "",
        nik_pemilik: "",
        no_npwp_pemilik: "",
        nomor_siup: "",
        nama_cp: "",
        telp_cp: "",
        hp_cp: "",
        nilai_plafon: "",
        lokasi_id: "",
        rentang_retur_penjualan: "",
        longitude: "",
        latitude: "",
        radius: "",
      };
    },
  },
};
</script>
