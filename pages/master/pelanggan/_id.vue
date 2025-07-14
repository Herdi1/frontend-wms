<template>
  <section class="section">
    <div class="">
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
          <div class="modal-body my-4 bg-white rounded-md px-4 py-2 shadow-sm">
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group w-full items-center mb-5">
                <label for="">Pelanggan Induk</label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  v-model="form.pelanggan_id_induk"
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
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
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
                    v-model="form.tipe_badan_hukum_id"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
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
                  <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </div>
              </ValidationProvider>
              <div class="form-group w-full items-center mb-5">
                <label for="">User Sales</label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_lengkap"
                  :loading="isLoadingGetUserPIC"
                  :options="lookup_users.data"
                  :filterable="false"
                  @search="onGetUserPIC"
                  :reduce="(item) => item.user_id"
                  v-model="form.user_id_sales"
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
                  v-model="form.kode_referensi"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Kode Pelanggan"
                  type="text"
                  name="kode_pelanggan"
                  :required="true"
                  v-model="form.kode_pelanggan"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Nomor NPWP Pelanggan"
                  type="text"
                  name="no_npwp"
                  :required="false"
                  v-model="form.no_npwp"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Nama Pelanggan"
                  type="text"
                  name="nama_pelanggan"
                  :required="true"
                  v-model="form.nama_pelanggan"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Alias / Singkatan"
                  type="text"
                  name="alias"
                  :required="true"
                  v-model="form.alias"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Email"
                  type="email"
                  name="email"
                  :required="false"
                  v-model="form.email"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="No Telpone"
                  type="text"
                  name="no_telp"
                  :required="false"
                  v-model="form.no_telp"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="No HP"
                  type="text"
                  name="no_hp"
                  :required="false"
                  v-model="form.no_hp"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <ValidationProvider name="id_negara" rules="required">
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
                  <label for=""
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
                    v-model="form.negara_id"
                    @input="onSelectNegara"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
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
                  <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider name="id_provinsi" rules="required">
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
                  <label for=""
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
                    v-model="form.provinsi_id"
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
                  <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </div>
              </ValidationProvider>
              <ValidationProvider name="id_kota" rules="required">
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
                  <label for="">Kota <span class="text-danger">*</span></label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_kota"
                    :loading="isLoadingGetKota"
                    :options="lookup_custom3.data"
                    :filterable="false"
                    @search="onGetKota"
                    :reduce="(item) => item.kota_id"
                    v-model="form.kota_id"
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
                  <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <ValidationProvider name="id_kecamatan" rules="required">
                <div
                  class="form-group w-full items-center mb-5"
                  slot-scope="{ errors, valid }"
                >
                  <label for=""
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
                    v-model="form.kecamatan_id"
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
                  <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </div>
              </ValidationProvider>
              <div class="form-group w-full items-center mb-5">
                <label for="">Kelurahan</label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_kelurahan"
                  :loading="isLoadingGetKelurahan"
                  :options="lookup_grade.data"
                  :filterable="false"
                  @search="onGetKelurahan"
                  :reduce="(item) => item.kelurahan_id"
                  v-model="form.kelurahan_id"
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
              <div class="form-group w-full items-center mb-5">
                <label for="">Kode Pos</label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_kode_pos"
                  :loading="isLoadingGetKodePos"
                  :options="lookup_roles.data"
                  :filterable="false"
                  @search="onGetKodePos"
                  :reduce="(item) => item.kode_pos_id"
                  v-model="form.kode_pos_id"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_roles.data.length || search"
                  >
                    <span
                      v-if="lookup_roles.current_page > 1"
                      @click="onGetKodePos(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="lookup_roles.last_page > lookup_roles.current_page"
                      @click="onGetKodePos(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
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
                    v-model="form.longitude"
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
                    v-model="form.latitude"
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider name="radius" rules="required">
                <div class="form-group col-12" slot-scope="{ errors, valid }">
                  <label for="radius"
                    >Radius <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="form.radius"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                  />
                  <div class="text-muted text-small">* Meter</div>
                  <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                    errors[0]
                  }}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Nomor SIUP"
                  type="text"
                  name="nomor_siup"
                  :required="false"
                  v-model="form.nomor_siup"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Rentang Retur Penjualan"
                  type="number"
                  name="rentang_retur_penjualan"
                  :required="false"
                  v-model="form.rentang_retur_penjualan"
                />
              </div>
              <div class="form-group col-12">
                <label for="nilai_plafon">Nilai Plafon</label>
                <money
                  v-model="form.nilai_plafon"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <!-- <div class="text-muted text-small">* Meter</div> -->
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Nama Contact Person"
                  type="text"
                  name="nama_cp"
                  :required="false"
                  v-model="form.nama_cp"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="No Telepon Contact Person"
                  type="text"
                  name="telp_cp"
                  :required="false"
                  v-model="form.telp_cp"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="No HP Contact Person"
                  type="text"
                  name="hp_cp"
                  :required="false"
                  v-model="form.hp_cp"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="alamat_pelanggan"
                >Alamat Pelanggan <span class="text-danger">*</span></label
              >
              <textarea
                placeholder="Alamat Pelanggan"
                required
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                v-model="form.alamat_pelanggan"
              ></textarea>
            </div>
          </div>
          <div class="mt-4">
            <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
              Edit Data Pemilik
            </h1>
            <h1 v-else class="text-xl font-bold mb-2 uppercase">
              Tambah Data Pemilik
            </h1>
          </div>
          <div class="my-4 bg-white rounded-md px-4 py-2 shadow-sm">
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Nama Pemilik"
                  type="text"
                  name="nama_pemilik"
                  :required="true"
                  v-model="form.nama_pemilik"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="NIK Pemilik"
                  type="text"
                  name="nik_pemilik"
                  :required="false"
                  v-model="form.nik_pemilik"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="No NPWP Pemilik"
                  type="text"
                  name="no_npwp_pemilik"
                  :required="false"
                  v-model="form.no_npwp_pemilik"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <ValidationProvider name="id_negara_pemilik">
                <div class="form-group w-full items-center mb-5">
                  <label for="">Negara Pemilik</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_negara"
                    :loading="isLoadingGetNegaraPemilik"
                    :options="lookup_mesin.data"
                    :filterable="false"
                    @search="onGetNegaraPemilik"
                    :reduce="(item) => item.negara_id"
                    v-model="form.negara_id_pemilik"
                    @input="onSelectNegaraPemilik"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_mesin.data.length || search"
                    >
                      <span
                        v-if="lookup_mesin.current_page > 1"
                        @click="onGetNegaraPemilik(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_mesin.last_page > lookup_mesin.current_page
                        "
                        @click="onGetNegaraPemilik(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <ValidationProvider name="id_provinsi_pemilik">
                <div class="form-group w-full items-center mb-5">
                  <label for="">Provinsi Pemilik</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_provinsi"
                    :loading="isLoadingGetProvinsiPemilik"
                    :options="lookup_sellings.data"
                    :filterable="false"
                    @search="onGetProvinsiPemilik"
                    :reduce="(item) => item.provinsi_id"
                    v-model="form.provinsi_id_pemilik"
                    @input="onSelectProvinsiPemilik"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_sellings.data.length || search"
                    >
                      <span
                        v-if="lookup_sellings.current_page > 1"
                        @click="onGetProvinsiPemilik(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_sellings.last_page >
                          lookup_sellings.current_page
                        "
                        @click="onGetProvinsiPemilik(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <ValidationProvider name="id_kota_pemilik">
                <div class="form-group w-full items-center mb-5">
                  <label for="">Kota Pemilik</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_kota"
                    :loading="isLoadingGetKotaPemilik"
                    :options="lookup_resellers.data"
                    :filterable="false"
                    @search="onGetKotaPemilik"
                    :reduce="(item) => item.kota_id"
                    v-model="form.kota_id_pemilik"
                    @input="onSelectKotaPemilik"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_resellers.data.length || search"
                    >
                      <span
                        v-if="lookup_resellers.current_page > 1"
                        @click="onGetKotaPemilik(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_resellers.last_page >
                          lookup_resellers.current_page
                        "
                        @click="onGetKotaPemilik(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
            </div>
            <div class="grid grid-cols-2 gap-2 w-full">
              <ValidationProvider name="id_kecamatan_pemilik">
                <div class="form-group w-full items-center mb-5">
                  <label for="">Kecamatan Pemilik</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_kecamatan"
                    :loading="isLoadingGetKecamatanPemilik"
                    :options="lookup_pengawas.data"
                    :filterable="false"
                    @search="onGetKecamatanPemilik"
                    :reduce="(item) => item.kecamatan_id"
                    v-model="form.kecamatan_id_pemilik"
                    @input="onSelectKecamatanPemilik"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_pengawas.data.length || search"
                    >
                      <span
                        v-if="lookup_pengawas.current_page > 1"
                        @click="onGetKecamatanPemilik(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_pengawas.last_page >
                          lookup_pengawas.current_page
                        "
                        @click="onGetKecamatanPemilik(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <div class="form-group w-full items-center mb-5">
                <label for="">Kelurahan Pemilik</label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_kelurahan"
                  :loading="isLoadingGetKelurahanPemilik"
                  :options="lookup_operator.data"
                  :filterable="false"
                  @search="onGetKelurahanPemilik"
                  :reduce="(item) => item.kelurahan_id"
                  v-model="form.kelurahan_id_pemilik"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_operator.data.length || search"
                  >
                    <span
                      v-if="lookup_operator.current_page > 1"
                      @click="onGetKelurahanPemilik(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_operator.last_page > lookup_regus.current_page
                      "
                      @click="onGetKelurahanPemilik(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </div>
            <div class="form-group">
              <label for="alamat_pemilik"
                >Alamat Pemilik <span class="text-danger">*</span></label
              >
              <textarea
                placeholder="Alamat Pemilik"
                required
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                v-model="form.alamat_pemilik"
              ></textarea>
            </div>
          </div>
          <div class="w-full mb-5">
            <TabComponent :tabs="tabs">
              <template #ItemPelanggan>
                <ItemPelanggan :self="{ form, parameters }" />
              </template>
              <template #Shipto>
                <p>Shipto</p>
              </template>
            </TabComponent>
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
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState, mapMutations } from "vuex";
import ItemPelanggan from "./itemPelanggan.vue";
import Lokasi from "./lokasi.vue";
import TabComponent from "./tabComponent.vue";
export default {
  // props: ["self"],
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Item Pelanggan",
    };
  },

  components: {
    ItemPelanggan,
    TabComponent,
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      tabs: [{ name: "ItemPelanggan" }, { name: "Shipto" }],

      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      title: "Pelanggan",
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
        kode_pos_id: "",
        no_telp: "",
        no_hp: "",
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
        nama_pemilik: "",
        alamat_pemilik: "",
        nik_pemilik: "",
        no_npwp_pemilik: "",
        negara_id_pemilik: "",
        provinsi_id_pemilik: "",
        kota_id_pemilik: "",
        kecamatan_id_pemilik: "",
        kelurahan_id_pemilik: "",
        item_pelanggans: [],
      },

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

      isStopSearchKodePos: false,
      isLoadingGetKodePos: false,
      kodePos_search: "",

      isStopSearchNegaraPemilik: false,
      isLoadingGetNegaraPemilik: false,
      negaraPemilik_search: "",

      isStopSearchProvinsiPemilik: false,
      isLoadingGetProvinsiPemilik: false,
      provinsiPemilik_search: "",

      isStopSearchKotaPemilik: false,
      isLoadingGetKotaPemilik: false,
      kotaPemilik_search: "",

      isStopSearchKecamatanPemilik: false,
      isLoadingGetKecamatanPemilik: false,
      kecamatanPemilik_search: "",

      isStopSearchKelurahanPemilik: false,
      isLoadingGetKelurahanPemilik: false,
      kelurahanPemilik_search: "",
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get("master/pelanggan/" + this.id);

        Object.keys(this.form).forEach((item) => {
          this.form[item] = res.data[item];
        });
        console.log(res.data);

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/master/pelanggan");
    }
    // this.set_data([]);
    // this.onLoad();
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
    await this.onSearchKodePos();
    await this.onSearchNegaraPemilik();
    await this.onSearchProvinsiPemilik();
    await this.onSearchKotaPemilik();
    await this.onSearchKecamatanPemilik();
    await this.onSearchKelurahanPemilik();
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
      "lookup_roles", //kode_pos
      "lookup_mesin", //negara pemilik
      "lookup_sellings", //provinsi pemilik
      "lookup_resellers", //kota pemilik
      "lookup_pengawas", //kecamatan pemilik
      "lookup_operator", //kelurahan pemilik
    ]),
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

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "master/pelanggan";

      let formData = {
        ...this.form,
      };

      formData.item_pelanggans = formData.item_pelanggans.map((item) => {
        return {
          ...item,
          item_pelanggan_id: item.item_pelanggan_id,
        };
      });

      console.log("formdata", formData);

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        url: url,
        method: this.isEditable ? "PUT" : "POST",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Gudang"
          );

          if (!this.isEditable) {
            this.form = {
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
              kode_pos_id: "",
              no_telp: "",
              no_hp: "",
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
              nama_pemilik: "",
              alamat_pemilik: "",
              nik_pemilik: "",
              no_npwp_pemilik: "",
              negara_id_pemilik: "",
              provinsi_id_pemilik: "",
              kota_id_pemilik: "",
              kecamatan_id_pemilik: "",
              kelurahan_id_pemilik: "",
              item_pelanggans: [],
            };
          }
          this.$router.push("/master/pelanggan");
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
          this.$refs.ruteProvider.reset();
        });
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
            this.form.negara_id +
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
            this.form.provinsi_id +
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
            this.form.kota_id +
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
            this.form.kecamatan_id +
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

    //Get Kode Pos
    onGetKodePos(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKodePos);

      this.isStopSearchKodePos = setTimeout(() => {
        this.kodePos_search = search;

        if (typeof isNext !== "function") {
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }

        this.onSearchKodePos();
      }, 600);
    },

    async onSearchKodePos() {
      if (!this.isLoadingGetKodePos) {
        this.isLoadingGetKodePos = true;

        await this.lookUp({
          url: "master/kode-pos/get-kode-pos",
          lookup: "roles",
          query:
            "?search=" +
            this.kodePos_search +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKodePos = false;
      }
    },

    onSelectNegara() {
      this.form.provinsi_id = "";
      this.form.kota_id = "";
      this.form.kecamatan_id = "";
      this.form.kelurahan_id = "";
      this.onSearchProvinsi();
    },

    onSelectProvinsi() {
      this.form.kota_id = "";
      this.form.kecamatan_id = "";
      this.form.kelurahan_id = "";
      this.onSearchKota();
    },

    onSelectKota() {
      this.form.kecamatan_id = "";
      this.form.kelurahan_id = "";
      this.onSearchKecamatan();
    },

    onSelectKecamatan() {
      this.form.kelurahan_id = "";
      this.onSearchKelurahan();
    },

    //Negara Pemilik Methods Start
    onGetNegaraPemilik(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchNegaraPemilik);

      this.isStopSearchNegaraPemilik = setTimeout(() => {
        this.negaraPemilik_search = search;

        if (typeof isNext !== "function") {
          this.lookup_mesin.current_page = isNext
            ? this.lookup_mesin.current_page + 1
            : this.lookup_mesin.current_page - 1;
        } else {
          this.lookup_mesin.current_page = 1;
        }

        this.onSearchNegaraPemilik();
      }, 600);
      // this.onSearchProvinsiPemilik();
    },

    async onSearchNegaraPemilik() {
      if (!this.isLoadingGetNegaraPemilik) {
        this.isLoadingGetNegaraPemilik = true;

        await this.lookUp({
          url: "master/negara/get-negara",
          lookup: "mesin",
          query:
            "?search=" +
            this.negaraPemilik_search +
            "&page=" +
            this.lookup_mesin.current_page +
            "&per_page=10",
        });

        this.isLoadingGetNegaraPemilik = false;
      }
    },

    //Provinsi Pemilik Methods Start
    onGetProvinsiPemilik(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProvinsiPemilik);

      this.isStopSearchProvinsiPemilik = setTimeout(() => {
        this.provinsiPemilik_search = search;

        if (typeof isNext !== "function") {
          this.lookup_sellings.current_page = isNext
            ? this.lookup_sellings.current_page + 1
            : this.lookup_sellings.current_page - 1;
        } else {
          this.lookup_sellings.current_page = 1;
        }

        this.onSearchProvinsiPemilik();
      }, 600);
      this.onSearchKotaPemilik();
    },

    async onSearchProvinsiPemilik() {
      if (!this.isLoadingGetProvinsiPemilik) {
        this.isLoadingGetProvinsiPemilik = true;

        await this.lookUp({
          url: "master/provinsi/get-provinsi",
          lookup: "sellings",
          query:
            "?search=" +
            this.provinsiPemilik_search +
            "&negara_id=" +
            this.form.negara_id_pemilik +
            "&page=" +
            this.lookup_sellings.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProvinsiPemilik = false;
      }
    },

    //Kota Pemilik Methods Start
    onGetKotaPemilik(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKotaPemilik);

      this.isStopSearchKotaPemilik = setTimeout(() => {
        this.kotaPemilik_search = search;

        if (typeof isNext !== "function") {
          this.lookup_resellers.current_page = isNext
            ? this.lookup_resellers.current_page + 1
            : this.lookup_resellers.current_page - 1;
        } else {
          this.lookup_resellers.current_page = 1;
        }

        this.onSearchKotaPemilik();
      }, 600);
      this.onSearchKecamatanPemilik();
    },

    async onSearchKotaPemilik() {
      if (!this.isLoadingGetKotaPemilik) {
        this.isLoadingGetKotaPemilik = true;

        await this.lookUp({
          url: "master/kota/get-kota",
          lookup: "resellers",
          query:
            "?search=" +
            this.kotaPemilik_search +
            "&provinsi_id=" +
            this.form.provinsi_id_pemilik +
            "&page=" +
            this.lookup_resellers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKotaPemilik = false;
      }
    },

    //Kecamatan Methods Start
    onGetKecamatanPemilik(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKecamatanPemilik);

      this.isStopSearchKecamatanPemilik = setTimeout(() => {
        this.kecamatanPemilik_search = search;

        if (typeof isNext !== "function") {
          this.lookup_pengawas.current_page = isNext
            ? this.lookup_pengawas.current_page + 1
            : this.lookup_pengawas.current_page - 1;
        } else {
          this.lookup_pengawas.current_page = 1;
        }

        this.onSearchKecamatanPemilik();
      }, 600);
      // this.onSearchKelurahanPemilik();
    },

    async onSearchKecamatanPemilik() {
      if (!this.isLoadingGetKecamatanPemilik) {
        this.isLoadingGetKecamatanPemilik = true;

        await this.lookUp({
          url: "master/kecamatan/get-kecamatan",
          lookup: "pengawas",
          query:
            "?search=" +
            this.kecamatanPemilik_search +
            "&kota_id=" +
            this.form.kota_id_pemilik +
            "&page=" +
            this.lookup_pengawas.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKecamatanPemilik = false;
      }
    },

    //Kelurahan Pemilik Methods Start
    onGetKelurahanPemilik(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKelurahanPemilik);

      this.isStopSearchKelurahanPemilik = setTimeout(() => {
        this.kelurahanPemilik_search = search;

        if (typeof isNext !== "function") {
          this.lookup_operator.current_page = isNext
            ? this.lookup_operator.current_page + 1
            : this.lookup_operator.current_page - 1;
        } else {
          this.lookup_operator.current_page = 1;
        }

        this.onSearchKelurahanPemilik();
      }, 600);
    },

    async onSearchKelurahanPemilik() {
      if (!this.isLoadingGetKelurahanPemilik) {
        this.isLoadingGetKelurahanPemilik = true;

        await this.lookUp({
          url: "master/kelurahan/get-kelurahan",
          lookup: "operator",
          query:
            "?search=" +
            this.kelurahanPemilik_search +
            "&kecamatan_id=" +
            this.form.kecamatan_id_pemilik +
            "&page=" +
            this.lookup_operator.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKelurahanPemilik = false;
      }
    },

    onSelectNegaraPemilik() {
      this.form.provinsi_id_pemilik = "";
      this.form.kota_id_pemilik = "";
      this.form.kecamatan_id_pemilik = "";
      this.form.kelurahan_id_pemilik = "";
      this.onSearchProvinsiPemilik();
    },

    onSelectProvinsiPemilik() {
      this.form.kota_id_pemilik = "";
      this.form.kecamatan_id_pemilik = "";
      this.form.kelurahan_id_pemilik = "";
      this.onSearchKotaPemilik();
    },

    onSelectKotaPemilik() {
      this.form.kecamatan_id_pemilik = "";
      this.form.kelurahan_id_pemilik = "";
      this.onSearchKecamatanPemilik();
    },

    onSelectKecamatanPemilik() {
      this.form.kelurahan_id_pemilik = "";
      this.onSearchKelurahanPemilik();
    },

    formReset() {
      this.isEditable = false;
      this.form = {
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
        kode_pos_id: "",
        no_telp: "",
        no_hp: "",
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
        nama_pemilik: "",
        alamat_pemilik: "",
        nik_pemilik: "",
        no_npwp_pemilik: "",
        negara_id_pemilik: "",
        provinsi_id_pemilik: "",
        kota_id_pemilik: "",
        kecamatan_id_pemilik: "",
        kelurahan_id_pemilik: "",
      };
    },
  },
};
</script>
