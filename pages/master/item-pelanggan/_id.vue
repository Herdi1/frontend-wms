<template>
  <section class="section">
    <div class="section-body mb-10 min-h-screen" v-if="!isLoadingPage">
      <div class="flex justify-between items-center">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Item Pelanggan
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Item Pelanggan
        </h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form @submit.prevent="validate().then(() => onSubmit(invalid))">
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
              <ValidationProvider name="item_id" rules="required">
                <div slot-scope="{ errors, valid }">
                  <div class="flex items-center justify-between w-full">
                    <label for="item_id" class="w-1/2"
                      >Item <span class="text-danger">*</span></label
                    >
                    <v-select
                      label="nama_item"
                      :loading="isLoadingGetItem"
                      :options="lookup_custom1.data"
                      :filterable="false"
                      @search="onGetItem"
                      v-model="parameters.form.item_id"
                      class="w-1/2 bg-white"
                      @input="onSelectItem"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom1.data.length || search"
                      >
                        <span
                          v-if="lookup_custom1.current_page > 1"
                          @click="onGetItem(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom1.last_page >
                            lookup_custom1.current_page
                          "
                          @click="onGetItem(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="w-full flex justify-end">
                    <span
                      class="text-danger text-xs pt-1 w-1/2"
                      v-if="errors[0]"
                      >{{ errors[0] }}</span
                    >
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider name="vendor_id" rules="required">
                <div slot-scope="{ errors, valid }">
                  <div class="flex items-center justify-between w-full">
                    <label for="item_id" class="w-1/2"
                      >Vendor <span class="text-danger">*</span></label
                    >
                    <v-select
                      label="nama_vendor"
                      :loading="isLoadingGetVendor"
                      :options="lookup_custom2.data"
                      :filterable="false"
                      @search="onGetVendor"
                      v-model="parameters.form.vendor_id"
                      :reduce="(item) => item.vendor_id"
                      class="w-1/2 bg-white"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom2.data.length || search"
                      >
                        <span
                          v-if="lookup_custom2.current_page > 1"
                          @click="onGetVendor(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom2.last_page >
                            lookup_custom2.current_page
                          "
                          @click="onGetVendor(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="w-full flex justify-end">
                    <span
                      class="text-danger text-xs pt-1 w-1/2"
                      v-if="errors[0]"
                      >{{ errors[0] }}</span
                    >
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider name="pelanggan_id" rules="required">
                <div slot-scope="{ errors, valid }">
                  <div class="flex items-center justify-between w-full">
                    <label for="item_id" class="w-1/2"
                      >Pelanggan <span class="text-danger">*</span></label
                    >
                    <v-select
                      label="nama_pelanggan"
                      :loading="isLoadingGetPelanggan"
                      :options="lookup_custom3.data"
                      :filterable="false"
                      @search="onGetPelanggan"
                      v-model="parameters.form.pelanggan_id"
                      :reduce="(item) => item.pelanggan_id"
                      class="w-1/2 bg-white"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom3.data.length || search"
                      >
                        <span
                          v-if="lookup_custom3.current_page > 1"
                          @click="onGetPelanggan(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom3.last_page >
                            lookup_custom3.current_page
                          "
                          @click="onGetPelanggan(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="w-full flex justify-end">
                    <span
                      class="text-danger text-xs pt-1 w-1/2"
                      v-if="errors[0]"
                      >{{ errors[0] }}</span
                    >
                  </div>
                </div>
              </ValidationProvider>
            </div>
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-3 md:mt-7"
            >
              <div class="form-group">
                <input-horizontal
                  label="Nama Item"
                  type="text"
                  name="nama_item"
                  :required="true"
                  v-model="parameters.form.nama_item"
                />
              </div>
              <div class="form-group">
                <input-horizontal
                  label="Kode Item Pelanggan"
                  type="text"
                  name="kode_item_pelanggan"
                  :required="true"
                  v-model="parameters.form.kode_item_pelanggan"
                />
              </div>
              <div class="form-group">
                <input-horizontal
                  label="Referensi External"
                  type="text"
                  name="kode_sap"
                  :required="true"
                  v-model="parameters.form.kode_sap"
                />
              </div>
            </div>

            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2 md:mt-4"
            >
              <ValidationProvider name="group1_id" rules="required">
                <div slot-scope="{ errors, valid }">
                  <div class="flex items-center justify-between w-full">
                    <label for="item_id" class="w-1/2"
                      >Group Item 1 <span class="text-danger">*</span></label
                    >
                    <v-select
                      label="nama_group_item"
                      :loading="isLoadingGetGroup1"
                      :options="lookup_custom5.data"
                      :filterable="false"
                      @search="onGetGroup1"
                      v-model="parameters.form.group_item_id_1"
                      :reduce="(item) => item.group_item_id"
                      class="w-1/2 bg-white"
                      @input="onSelectGroup1"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom5.data.length || search"
                      >
                        <span
                          v-if="lookup_custom5.current_page > 1"
                          @click="onGetGroup1(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom5.last_page >
                            lookup_custom5.current_page
                          "
                          @click="onGetGroup1(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="w-full flex justify-end">
                    <span
                      class="text-danger text-xs pt-1 w-1/2"
                      v-if="errors[0]"
                      >{{ errors[0] }}</span
                    >
                  </div>
                </div>
              </ValidationProvider>
              <div class="flex items-center justify-between w-full">
                <label for="item_id" class="w-1/2">Group Item 2</label>
                <v-select
                  label="nama_group_item"
                  :loading="isLoadingGetGroup2"
                  :options="lookup_custom6.data"
                  :filterable="false"
                  @search="onGetGroup2"
                  v-model="parameters.form.group_item_id_2"
                  :reduce="(item) => item.group_item_id"
                  class="w-1/2 bg-white"
                  @input="onSelectGroup2"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom6.data.length || search"
                  >
                    <span
                      v-if="lookup_custom6.current_page > 1"
                      @click="onGetGroup2(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom6.last_page > lookup_custom6.current_page
                      "
                      @click="onGetGroup2(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
              <div class="flex items-center justify-between w-full">
                <label for="item_id" class="w-1/2">Group Item 3</label>
                <v-select
                  label="nama_group_item"
                  :loading="isLoadingGetGroup3"
                  :options="lookup_custom7.data"
                  :filterable="false"
                  @search="onGetGroup3"
                  v-model="parameters.form.group_item_id_3"
                  :reduce="(item) => item.group_item_id"
                  class="w-1/2 bg-white"
                  @input="onSelectGroup3"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom7.data.length || search"
                  >
                    <span
                      v-if="lookup_custom7.current_page > 1"
                      @click="onGetGroup3(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom7.last_page > lookup_custom7.current_page
                      "
                      @click="onGetGroup3(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </div>
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2 md:mt-7"
            >
              <div class="flex items-center justify-between w-full">
                <label for="item_id" class="w-1/2">Group Item 4</label>
                <v-select
                  label="nama_group_item"
                  :loading="isLoadingGetGroup4"
                  :options="lookup_custom8.data"
                  :filterable="false"
                  @search="onGetGroup4"
                  v-model="parameters.form.group_item_id_4"
                  :reduce="(item) => item.group_item_id"
                  class="w-1/2 bg-white"
                  @input="onSelectGroup4"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom8.data.length || search"
                  >
                    <span
                      v-if="lookup_custom8.current_page > 1"
                      @click="onGetGroup4(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom8.last_page > lookup_custom8.current_page
                      "
                      @click="onGetGroup4(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
              <div class="flex items-center justify-between w-full">
                <label for="item_id" class="w-1/2">Group Item 5</label>
                <v-select
                  label="nama_group_item"
                  :loading="isLoadingGetGroup5"
                  :options="lookup_custom9.data"
                  :filterable="false"
                  @search="onGetGroup5"
                  v-model="parameters.form.group_item_id_5"
                  :reduce="(item) => item.group_item_id"
                  class="w-1/2 bg-white"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom9.data.length || search"
                  >
                    <span
                      v-if="lookup_custom9.current_page > 1"
                      @click="onGetGroup5(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom9.last_page > lookup_custom9.current_page
                      "
                      @click="onGetGroup5(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </div>
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2 md:mt-7"
            >
              <ValidationProvider name="kategori1_id" rules="required">
                <div slot-scope="{ errors, valid }">
                  <div class="flex items-center justify-between w-full">
                    <label for="item_id" class="w-1/2"
                      >Kategori Item 1 <span class="text-danger">*</span></label
                    >
                    <v-select
                      label="nama_kategori_item"
                      :loading="isLoadingGetKategori1"
                      :options="lookup_custom10.data"
                      :filterable="false"
                      @search="onGetKategori1"
                      v-model="parameters.form.kategori_id_1"
                      :reduce="(item) => item.kategori_item_id"
                      class="w-1/2 bg-white"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                      @input="onSearchKategori2"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom10.data.length || search"
                      >
                        <span
                          v-if="lookup_custom10.current_page > 1"
                          @click="onGetKategori1(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom10.last_page >
                            lookup_custom10.current_page
                          "
                          @click="onGetKategori1(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="w-full flex justify-end">
                    <span
                      class="text-danger text-xs pt-1 w-1/2"
                      v-if="errors[0]"
                      >{{ errors[0] }}</span
                    >
                  </div>
                </div>
              </ValidationProvider>
              <div class="flex items-center justify-between w-full">
                <label for="item_id" class="w-1/2">Kategori Item 2 </label>
                <v-select
                  label="nama_kategori_item"
                  :loading="isLoadingGetKategori2"
                  :options="lookup_mesin.data"
                  :filterable="false"
                  @search="onGetKategori2"
                  v-model="parameters.form.kategori_id_2"
                  :reduce="(item) => item.kategori_item_id"
                  class="w-1/2 bg-white"
                  @input="onSearchKategori3"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_mesin.data.length || search"
                  >
                    <span
                      v-if="lookup_mesin.current_page > 1"
                      @click="onGetKategori2(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="lookup_mesin.last_page > lookup_mesin.current_page"
                      @click="onGetKategori2(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
              <div class="flex items-center justify-between w-full">
                <label for="item_id" class="w-1/2">Kategori Item 3 </label>
                <v-select
                  label="nama_kategori_item"
                  :loading="isLoadingGetKategori3"
                  :options="lookup_grade.data"
                  :filterable="false"
                  @search="onGetKategori3"
                  v-model="parameters.form.kategori_id_3"
                  :reduce="(item) => item.kategori_item_id"
                  @input="onSearchKategori4"
                  class="w-1/2 bg-white"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_grade.data.length || search"
                  >
                    <span
                      v-if="lookup_grade.current_page > 1"
                      @click="onGetKategori3(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="lookup_grade.last_page > lookup_grade.current_page"
                      @click="onGetKategori3(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </div>
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2 md:mt-7"
            >
              <div class="flex items-center justify-between w-full">
                <label for="item_id" class="w-1/2">Kategori Item 4 </label>
                <v-select
                  label="nama_kategori_item"
                  :loading="isLoadingGetKategori4"
                  :options="lookup_roles.data"
                  :filterable="false"
                  @search="onGetKategori4"
                  v-model="parameters.form.kategori_id_4"
                  :reduce="(item) => item.kategori_item_id"
                  @input="onSearchKategori5"
                  class="w-1/2 bg-white"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_roles.data.length || search"
                  >
                    <span
                      v-if="lookup_roles.current_page > 1"
                      @click="onGetKategori4(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="lookup_roles.last_page > lookup_roles.current_page"
                      @click="onGetKategori4(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
              <div class="flex items-center justify-between w-full">
                <label for="item_id" class="w-1/2">Kategori Item 5 </label>
                <v-select
                  label="nama_kategori_item"
                  :loading="isLoadingGetKategori5"
                  :options="lookup_proces.data"
                  :filterable="false"
                  @search="onGetKategori4"
                  v-model="parameters.form.kategori_id_5"
                  :reduce="(item) => item.kategori_item_id"
                  class="w-1/2 bg-white"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_proces.data.length || search"
                  >
                    <span
                      v-if="lookup_proces.current_page > 1"
                      @click="onGetKategori5(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_proces.last_page > lookup_proces.current_page
                      "
                      @click="onGetKategori5(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </div>
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2 md:mt-7"
            >
              <div class="form-group flex justify-between items-center">
                <label for="jumlah_palet" class="w-1/2">Jumlah Palet</label>
                <money
                  v-model="parameters.form.jumlah_palet"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="form-group flex justify-between items-center">
                <label for="kapasitas_palet" class="w-1/2"
                  >Kapasitas Palet</label
                >
                <money
                  v-model="parameters.form.kapasitas_palet"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="form-group flex justify-between items-center">
                <label for="kebutuhan_palet" class="w-1/2"
                  >Kebutuhan Palet</label
                >
                <money
                  v-model="parameters.form.kebutuhan_palet"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
            </div>
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2 md:mt-7"
            >
              <div class="form-group flex justify-between items-center">
                <label for="batas_atas" class="w-1/2"
                  >Batas Atas <span class="text-danger">*</span></label
                >
                <money
                  v-model="parameters.form.batas_atas"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="form-group flex justify-between items-center">
                <label for="batas_atas" class="w-1/2"
                  >Batas Bawah <span class="text-danger">*</span></label
                >
                <money
                  v-model="parameters.form.batas_bawah"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="form-group flex justify-between items-center">
                <label for="maksimal_tumpukan" class="w-1/2"
                  >Maksimal Tumpukan</label
                >
                <money
                  v-model="parameters.form.maksimal_tumpukan"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
            </div>

            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2 md:mt-7"
            >
              <ValidationProvider name="supplier_id" rules="required">
                <div slot-scope="{ errors, valid }">
                  <div class="flex items-center justify-between w-full">
                    <label for="supplier_id" class="w-1/2"
                      >Supplier <span class="text-danger">*</span></label
                    >
                    <v-select
                      label="nama_supplier"
                      :loading="isLoadingGetSuppliers"
                      :options="lookup_custom4.data"
                      :filterable="false"
                      @search="onGetSuppliers"
                      v-model="parameters.form.supplier_id"
                      :reduce="(item) => item.supplier_id"
                      class="w-1/2 bg-white"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom4.data.length || search"
                      >
                        <span
                          v-if="lookup_custom4.current_page > 1"
                          @click="onGetSuppliers(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom4.last_page >
                            lookup_custom4.current_page
                          "
                          @click="onGetSuppliers(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="w-full flex justify-end">
                    <span
                      class="text-danger text-xs pt-1 w-1/2"
                      v-if="errors[0]"
                      >{{ errors[0] }}</span
                    >
                  </div>
                </div>
              </ValidationProvider>
              <div class="form-group">
                <input-horizontal
                  label="Kode Supplier"
                  type="text"
                  name="supplier_code"
                  :required="true"
                  v-model="parameters.form.supplier_code"
                />
              </div>
              <ValidationProvider name="satuan_id" rules="required">
                <div slot-scope="{ errors, valid }">
                  <div class="flex items-center justify-between w-full">
                    <label for="satuan_id" class="w-1/2"
                      >Satuan <span class="text-danger">*</span></label
                    >
                    <v-select
                      label="nama_satuan"
                      :loading="isLoadingGetSatuan"
                      :options="lookup_regus.data"
                      :filterable="false"
                      @search="onGetSatuan"
                      v-model="parameters.form.satuan_id"
                      :reduce="(item) => item.satuan_id"
                      class="w-1/2 bg-white"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_regus.data.length || search"
                      >
                        <span
                          v-if="lookup_regus.current_page > 1"
                          @click="onGetSatuan(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_regus.last_page > lookup_regus.current_page
                          "
                          @click="onGetSatuan(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="w-full flex justify-end">
                    <span
                      class="text-danger text-xs pt-1 w-1/2"
                      v-if="errors[0]"
                      >{{ errors[0] }}</span
                    >
                  </div>
                </div>
              </ValidationProvider>
            </div>

            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2 md:mt-7"
            >
              <div class="form-group flex justify-between items-center">
                <label for="berat_bersih" class="w-1/2">Berat Bersih</label>
                <money
                  v-model="parameters.form.berat_bersih"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="form-group flex justify-between items-center">
                <label for="berat_kotor" class="w-1/2">Berat Kotor</label>
                <money
                  v-model="parameters.form.berat_kotor"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="flex items-center justify-between w-full">
                <label for="satuan_id_berat" class="w-1/2">Satuan Berat </label>
                <v-select
                  label="nama_satuan"
                  :loading="isLoadingGetSatuanBerat"
                  :options="lookup_beam.data"
                  :filterable="false"
                  @search="onGetSatuanBerat"
                  v-model="parameters.form.satuan_id_berat"
                  :reduce="(item) => item.satuan_id"
                  class="w-1/2 bg-white"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_beam.data.length || search"
                  >
                    <span
                      v-if="lookup_beam.current_page > 1"
                      @click="onGetSatuanBerat(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="lookup_beam.last_page > lookup_beam.current_page"
                      @click="onGetSatuanBerat(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </div>

            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2 md:mt-7"
            >
              <div class="form-group flex justify-between items-center">
                <label for="panjang" class="w-1/2">Panjang</label>
                <money
                  v-model="parameters.form.panjang"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="form-group flex justify-between items-center">
                <label for="lebar" class="w-1/2">Lebar</label>
                <money
                  v-model="parameters.form.lebar"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="form-group flex justify-between items-center">
                <label for="tebal" class="w-1/2">Tebal</label>
                <money
                  v-model="parameters.form.tebal"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
            </div>
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2 md:mt-7"
            >
              <div class="form-group flex justify-between items-center">
                <label for="volume" class="w-1/2">Volume</label>
                <money
                  v-model="parameters.form.volume"
                  class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
              </div>
              <div class="flex items-center justify-between w-full">
                <label for="satuan_id_volume" class="w-1/2"
                  >Satuan Volume
                </label>
                <v-select
                  label="nama_satuan"
                  :loading="isLoadingGetSatuanVolume"
                  :options="lookup_packing.data"
                  :filterable="false"
                  @search="onGetSatuanVolume"
                  v-model="parameters.form.satuan_id_volume"
                  :reduce="(item) => item.satuan_id"
                  class="w-1/2 bg-white"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_packing.data.length || search"
                  >
                    <span
                      v-if="lookup_packing.current_page > 1"
                      @click="onGetSatuanVolume(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_packing.last_page > lookup_packing.current_page
                      "
                      @click="onGetSatuanVolume(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
              <div class="form-group">
                <input-horizontal
                  label="Warna"
                  type="text"
                  name="warna"
                  :required="false"
                  v-model="parameters.form.warna"
                />
              </div>
            </div>
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-2 md:mt-7"
            >
              <div class="form-group">
                <input-horizontal
                  label="Stocklevel"
                  type="text"
                  name="value_stocklevel"
                  :required="false"
                  v-model="parameters.form.value_stocklevel"
                />
              </div>
              <div class="flex justify-between w-full">
                <label for="satuan_id_stocklevel" class="w-1/2 pt-1"
                  >Satuan Stocklevel
                </label>
                <v-select
                  label="nama_satuan"
                  :loading="isLoadingGetSatuanStocklevel"
                  :options="lookup_defects.data"
                  :filterable="false"
                  @search="onGetSatuanStocklevel"
                  v-model="parameters.form.satuan_id_stocklevel"
                  :reduce="(item) => item.satuan_id"
                  class="w-1/2 bg-white"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_defects.data.length || search"
                  >
                    <span
                      v-if="lookup_defects.current_page > 1"
                      @click="onGetSatuanStocklevel(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_defects.last_page > lookup_defects.current_page
                      "
                      @click="onGetSatuanStocklevel(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
              <div class="form-group flex justify-between">
                <label for="keterangan" class="w-1/2 pt-1">Keterangan</label>
                <textarea
                  name="keterangan"
                  v-model="parameters.form.keterangan"
                  class="w-1/2 border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                ></textarea>
              </div>
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
      id,

      isStopSearchItem: false,
      isLoadingGetItem: false,
      item_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchSuppliers: false,
      isLoadingGetSuppliers: false,
      suppliers_search: "",

      isStopSearchGroup1: false,
      isLoadingGetGroup1: false,
      group1_search: "",

      isStopSearchGroup2: false,
      isLoadingGetGroup2: false,
      group2_search: "",

      isStopSearchGroup3: false,
      isLoadingGetGroup3: false,
      group3_search: "",

      isStopSearchGroup4: false,
      isLoadingGetGroup4: false,
      group4_search: "",

      isStopSearchGroup5: false,
      isLoadingGetGroup5: false,
      group5_search: "",

      isStopSearchKategori1: false,
      isLoadingGetKategori1: false,
      kategori1_search: "",

      isStopSearchKategori2: false,
      isLoadingGetKategori2: false,
      kategori2_search: "",

      isStopSearchKategori3: false,
      isLoadingGetKategori3: false,
      kategori3_search: "",

      isStopSearchKategori4: false,
      isLoadingGetKategori4: false,
      kategori4_search: "",

      isStopSearchKategori5: false,
      isLoadingGetKategori5: false,
      kategori5_search: "",

      isStopSearchSatuan: false,
      isLoadingGetSatuan: false,
      satuan_search: "",

      isStopSearchSatuanBerat: false,
      isLoadingGetSatuanBerat: false,
      satuan_berat_search: "",

      isStopSearchSatuanVolume: false,
      isLoadingGetSatuanVolume: false,
      satuan_volume_search: "",

      isStopSearchSatuanStocklevel: false,
      isLoadingGetSatuanStocklevel: false,
      satuan_stocklevel_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Item Pelanggan",
      parameters: {
        url: "master/item-pelanggan",
        form: {
          item_id: "",
          vendor_id: "",
          pelanggan_id: "",
          nama_item: "",
          kode_item_pelanggan: "",
          supplier_id: "",
          supplier_code: "",
          kode_sap: "",
          batas_atas: "",
          batas_bawah: "",
          group_item_id_1: "",
          group_item_id_2: "",
          group_item_id_3: "",
          group_item_id_4: "",
          group_item_id_5: "",
          kategori_id_1: "",
          kategori_id_2: "",
          kategori_id_3: "",
          kategori_id_4: "",
          kategori_id_5: "",
          jumlah_palet: "",
          kapasitas_palet: "",
          kebutuhan_palet: "",
          maksimal_tumpukan: "",
          satuan_id: "",
          berat_bersih: "",
          berat_kotor: "",
          satuan_id_berat: "",
          panjang: "",
          lebar: "",
          tebal: "",
          volume: "",
          satuan_id_volume: "",
          value_stocklevel: "",
          satuan_id_stocklevel: "",
          warna: "",
          keterangan: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get("master/item-pelanggan/" + this.id);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/master/item-pelanggan");
    }
  },

  async mounted() {
    await this.onSearchItem();
    await this.onSearchVendor();
    await this.onSearchPelanggan();
    await this.onSearchSuppliers();

    await this.onSearchGroup1();
    await this.onSearchKategori1();
    await this.onSearchKategori2();
    await this.onSearchKategori3();
    await this.onSearchKategori4();
    await this.onSearchKategori5();

    await this.onSearchSatuan();
    await this.onSearchSatuanBerat();
    await this.onSearchSatuanVolume();
    await this.onSearchSatuanStocklevel();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //item
      "lookup_custom2", //vendor
      "lookup_custom3", //pelanggan
      "lookup_custom4", //supplier
      "lookup_custom5", //group1
      "lookup_custom6", //group2
      "lookup_custom7", //group3
      "lookup_custom8", //group4
      "lookup_custom9", //group5
      "lookup_custom10", //kategori1
      "lookup_mesin", //kategori2
      "lookup_grade", //kategori3
      "lookup_roles", //kategori4
      "lookup_proces", //kategori5
      "lookup_regus", //satuan
      "lookup_beam", //satuan berat
      "lookup_packing", //satuan volume
      "lookup_defects", //satuan stocklevel
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "master/item-pelanggan";

      let formData = {
        ...this.parameters.form,
        item_id:
          typeof this.parameters.form.item_id === "object"
            ? this.parameters.form.item_id.item_id
            : this.parameters.form.item_id,
      };

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
            "Berhasil " +
              (this.isEditable ? "Update" : "Tambah") +
              " Item Pelanggan"
          );

          if (!this.isEditable) {
            this.parameters.form = {
              item_id: "",
              vendor_id: "",
              pelanggan_id: "",
              nama_item: "",
              kode_item_pelanggan: "",
              kode_sap: "",
              group_item_id_1: "",
              group_item_id_2: "",
              group_item_id_3: "",
              group_item_id_4: "",
              group_item_id_5: "",
              kategori_id_1: "",
              kategori_id_2: "",
              kategori_id_3: "",
              kategori_id_4: "",
              kategori_id_5: "",
              jumlah_palet: "",
              kapasitas_palet: "",
              kebutuhan_palet: "",
              batas_atas: "",
              batas_bawah: "",
              maksimal_tumpukan: "",
              supplier_id: "",
              supplier_code: "",
              satuan_id: "",
              berat_bersih: "",
              berat_kotor: "",
              satuan_id_berat: "",
              panjang: "",
              lebar: "",
              tebal: "",
              volume: "",
              satuan_id_volume: "",
              value_stocklevel: "",
              satuan_id_stocklevel: "",
              warna: "",
              keterangan: "",
            };
          }

          this.$router.push("/master/item-pelanggan");
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    onSelectItem(item) {
      if (item) {
        this.parameters.form.nama_item = item.nama_item;
        this.parameters.form.supplier_id = item.supplier_id;
        this.parameters.form.supplier_code = item.supplier_code;
        this.parameters.form.batas_atas = item.batas_atas;
        this.parameters.form.batas_bawah = item.batas_bawah;
        this.parameters.form.jumlah_palet = item.jumlah_palet;
        this.parameters.form.kapasitas_palet = item.kapasitas_palet;
        this.parameters.form.kebutuhan_palet = item.kebutuhan_palet;
        this.parameters.form.maksimal_tumpukan = item.maksimal_tumpukan;
        this.parameters.form.volume = item.volume;
        this.parameters.form.group_item_id_1 = item.group_item_id_1;
        this.parameters.form.group_item_id_2 = item.group_item_id_2;
        this.parameters.form.group_item_id_3 = item.group_item_id_3;
        this.parameters.form.group_item_id_4 = item.group_item_id_4;
        this.parameters.form.group_item_id_5 = item.group_item_id_5;
        this.parameters.form.kategori_id_1 = item.kategori_id_1;
        this.parameters.form.kategori_id_2 = item.kategori_id_2;
        this.parameters.form.kategori_id_3 = item.kategori_id_3;
        this.parameters.form.kategori_id_4 = item.kategori_id_4;
        this.parameters.form.kategori_id_5 = item.kategori_id_5;
        this.parameters.form.satuan_id = item.satuan_id;
        this.parameters.form.satuan_id_berat = item.satuan_id_berat;
        //   this.parameters.form.berat_bersih = item.berat_bersih;
        //   this.parameters.form.berat_kotor = item.berat_kotor;
        this.parameters.form.satuan_id_volume = item.satuan_id_volume;
        //   this.parameters.form.volume = item.volume;
        this.parameters.form.satuan_id_stocklevel = item.satuan_id_stocklevel;
        this.parameters.form.value_stocklevel = item.value_stocklevel;
        this.parameters.form.keterangan = item.keterangan;
      } else {
        this.parameters.form.nama_item = "";
        this.parameters.form.supplier_id = "";
        this.parameters.form.supplier_code = "";
        this.parameters.form.batas_atas = "";
        this.parameters.form.batas_bawah = "";
        this.parameters.form.jumlah_palet = "";
        this.parameters.form.kapasitas_palet = "";
        this.parameters.form.kebutuhan_palet = "";
        this.parameters.form.maksimal_tumpukan = "";
        this.parameters.form.volume = "";
        this.parameters.form.group_item_id_1 = "";
        this.parameters.form.group_item_id_2 = "";
        this.parameters.form.group_item_id_3 = "";
        this.parameters.form.group_item_id_4 = "";
        this.parameters.form.group_item_id_5 = "";
        this.parameters.form.kategori_id_1 = "";
        this.parameters.form.kategori_id_2 = "";
        this.parameters.form.kategori_id_3 = "";
        this.parameters.form.kategori_id_4 = "";
        this.parameters.form.kategori_id_5 = "";
        this.parameters.form.satuan_id = "";
        this.parameters.form.satuan_id_berat = "";
        this.parameters.form.berat_bersih = "";
        this.parameters.form.berat_kotor = "";
        this.parameters.form.satuan_id_volume = "";
        this.parameters.form.volume = "";
        this.parameters.form.satuan_id_stocklevel = "";
        this.parameters.form.value_stocklevel = "";
        this.parameters.form.keterangan = "";
      }
    },

    onGetItem(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchItem);
      this.isStopSearchItem = setTimeout(() => {
        this.item_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }
        this.onSearchItem();
      }, 600);
    },

    async onSearchItem() {
      if (!this.isLoadingGetItem) {
        this.isLoadingGetItem = true;

        await this.lookUp({
          url: "master/item/get-item",
          lookup: "custom1",
          query:
            "?search=" +
            this.item_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });
        this.isLoadingGetItem = false;
        // console.log("item", this.lookup_custom1.data);
      }
    },

    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchVendor);
      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }
        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom2",
          query:
            "?search=" +
            this.vendor_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });
        this.isLoadingGetVendor = false;
        // console.log("item", this.lookup_custom2.data);
      }
    },

    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchPelanggan);
      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }
        this.onSearchPelanggan();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "custom3",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });
        this.isLoadingGetPelanggan = false;
        // console.log("item", this.lookup_custom3.data);
      }
    },

    onGetSuppliers(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchSuppliers);
      this.isStopSearchSuppliers = setTimeout(() => {
        this.suppliers_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }
        this.onSearchSuppliers();
      }, 600);
    },

    async onSearchSuppliers() {
      if (!this.isLoadingGetSuppliers) {
        this.isLoadingGetSuppliers = true;

        await this.lookUp({
          url: "master/supplier/get-supplier",
          lookup: "custom4",
          query:
            "?search=" +
            this.suppliers_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });
        this.isLoadingGetSuppliers = false;
      }
    },

    onGetGroup1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchGroup1);
      this.isStopSearchGroup1 = setTimeout(() => {
        this.group1_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }
        this.onSearchGroup1();
      }, 600);
    },

    async onSearchGroup1() {
      if (!this.isLoadingGetGroup1) {
        this.isLoadingGetGroup1 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom5",
          query:
            "?search=" +
            this.group1_search +
            "&status=1" +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroup1 = false;
      }
    },

    onGetGroup2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchGroup2);
      this.isStopSearchGroup2 = setTimeout(() => {
        this.group2_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }
        this.onSearchGroup2();
      }, 600);
    },

    async onSearchGroup2() {
      if (!this.isLoadingGetGroup2) {
        this.isLoadingGetGroup2 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom6",
          query:
            "?search=" +
            this.group2_search +
            "&status=2" +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroup2 = false;
      }
    },

    onGetGroup3(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchGroup3);
      this.isStopSearchGroup3 = setTimeout(() => {
        this.group3_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }
        this.onSearchGroup3();
      }, 600);
    },

    async onSearchGroup3() {
      if (!this.isLoadingGetGroup3) {
        this.isLoadingGetGroup3 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom7",
          query:
            "?search=" +
            this.group3_search +
            "&status=3" +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroup3 = false;
      }
    },

    onGetGroup4(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchGroup4);
      this.isStopSearchGroup4 = setTimeout(() => {
        this.group4_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }
        this.onSearchGroup4();
      }, 600);
    },

    async onSearchGroup4() {
      if (!this.isLoadingGetGroup4) {
        this.isLoadingGetGroup4 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom8",
          query:
            "?search=" +
            this.group4_search +
            "&status=4" +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroup4 = false;
      }
    },

    onGetGroup5(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchGroup5);
      this.isStopSearchGroup5 = setTimeout(() => {
        this.group5_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }
        this.onSearchGroup5();
      }, 600);
    },

    async onSearchGroup5() {
      if (!this.isLoadingGetGroup5) {
        this.isLoadingGetGroup5 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom9",
          query:
            "?search=" +
            this.group5_search +
            "&status=5" +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroup5 = false;
      }
    },

    async onSelectGroup1() {
      await this.onSearchGroup2();
      this.parameters.form.group_item_id_2 = "";
    },

    async onSelectGroup2() {
      await this.onSearchGroup3();
      this.parameters.form.group_item_id_3 = "";
    },

    async onSelectGroup3() {
      await this.onSearchGroup4();
      this.parameters.form.group_item_id_4 = "";
    },

    async onSelectGroup4() {
      await this.onSearchGroup5();
      this.parameters.form.group_item_id_5 = "";
    },

    onGetKategori1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategori1);

      this.isStopSearchKategori1 = setTimeout(() => {
        this.kategori1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchKategori1();
      }, 600);
    },

    async onSearchKategori1() {
      if (!this.isLoadingGetKategori1) {
        this.isLoadingGetKategori1 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "custom10",
          query:
            "?search=" +
            this.kategori1_search +
            "&status=1" +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKategori1 = false;
      }
    },

    onGetKategori2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategori2);

      this.isStopSearchKategori2 = setTimeout(() => {
        this.kategori2_search = search;

        if (typeof isNext !== "function") {
          this.lookup_mesin.current_page = isNext
            ? this.lookup_mesin.current_page + 1
            : this.lookup_mesin.current_page - 1;
        } else {
          this.lookup_mesin.current_page = 1;
        }

        this.onSearchKategori2();
      }, 600);
    },

    async onSearchKategori2() {
      if (!this.isLoadingGetKategori2) {
        this.isLoadingGetKategori2 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "mesin",
          query:
            "?search=" +
            this.kategori2_search +
            "&status=2" +
            "&page=" +
            this.lookup_mesin.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKategori2 = false;
      }
    },

    onGetKategori3(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategori3);

      this.isStopSearchKategori3 = setTimeout(() => {
        this.kategori3_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchKategori3();
      }, 600);
    },

    async onSearchKategori3() {
      if (!this.isLoadingGetKategori3) {
        this.isLoadingGetKategori3 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "grade",
          query:
            "?search=" +
            this.kategori3_search +
            "&status=3" +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKategori3 = false;
      }
    },

    onGetKategori4(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategori4);

      this.isStopSearchKategori4 = setTimeout(() => {
        this.kategori4_search = search;

        if (typeof isNext !== "function") {
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }

        this.onSearchKategori4();
      }, 600);
    },

    async onSearchKategori4() {
      if (!this.isLoadingGetKategori4) {
        this.isLoadingGetKategori4 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "roles",
          query:
            "?search=" +
            this.kategori4_search +
            "&status=4" +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKategori4 = false;
      }
    },

    onGetKategori5(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategori5);

      this.isStopSearchKategori5 = setTimeout(() => {
        this.kategori5_search = search;

        if (typeof isNext !== "function") {
          this.lookup_proces.current_page = isNext
            ? this.lookup_proces.current_page + 1
            : this.lookup_proces.current_page - 1;
        } else {
          this.lookup_proces.current_page = 1;
        }

        this.onSearchKategori5();
      }, 600);
    },

    async onSearchKategori5() {
      if (!this.isLoadingGetKategori5) {
        this.isLoadingGetKategori5 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "proces",
          query:
            "?search=" +
            this.kategori5_search +
            "&status=5" +
            "&page=" +
            this.lookup_proces.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKategori5 = false;
      }
    },

    onGetSatuan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuan);

      this.isStopSearchSatuan = setTimeout(() => {
        this.satuan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }

        this.onSearchSatuan();
      }, 600);
    },

    async onSearchSatuan() {
      if (!this.isLoadingGetSatuan) {
        this.isLoadingGetSatuan = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "regus",
          query:
            "?search=" +
            this.satuan_search +
            "&page=" +
            this.lookup_regus.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuan = false;
      }
    },

    onGetSatuanBerat(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuanBerat);

      this.isStopSearchSatuanBerat = setTimeout(() => {
        this.satuan_berat_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchSatuanBerat();
      }, 600);
    },

    async onSearchSatuanBerat() {
      if (!this.isLoadingGetSatuanBerat) {
        this.isLoadingGetSatuanBerat = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "beam",
          query:
            "?search=" +
            this.satuan_berat_search +
            "&jenis_satuan=B" +
            "&page=" +
            this.lookup_beam.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuanBerat = false;
      }
    },

    onGetSatuanVolume(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuanVolume);

      this.isStopSearchSatuanVolume = setTimeout(() => {
        this.satuan_volume_search = search;

        if (typeof isNext !== "function") {
          this.lookup_packing.current_page = isNext
            ? this.lookup_packing.current_page + 1
            : this.lookup_packing.current_page - 1;
        } else {
          this.lookup_packing.current_page = 1;
        }

        this.onSearchSatuanVolume();
      }, 600);
    },

    async onSearchSatuanVolume() {
      if (!this.isLoadingGetSatuanVolume) {
        this.isLoadingGetSatuanVolume = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "packing",
          query:
            "?search=" +
            this.satuan_volume_search +
            "&jenis_satuan=V" +
            "&page=" +
            this.lookup_packing.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuanVolume = false;
      }
    },

    onGetSatuanStockLevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuanStocklevel);

      this.isStopSearchSatuanStocklevel = setTimeout(() => {
        this.satuan_stocklevel_search = search;

        if (typeof isNext !== "function") {
          this.lookup_defects.current_page = isNext
            ? this.lookup_defects.current_page + 1
            : this.lookup_defects.current_page - 1;
        } else {
          this.lookup_defects.current_page = 1;
        }

        this.onSearchSatuanStocklevel();
      }, 600);
    },

    async onSearchSatuanStocklevel() {
      if (!this.isLoadingGetSatuanStocklevel) {
        this.isLoadingGetSatuanStocklevel = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "defects",
          query:
            "?search=" +
            this.satuan_stocklevel_search +
            "&jenis_satuan=S" +
            "&page=" +
            this.lookup_defects.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuanStocklevel = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        item_id: "",
        vendor_id: "",
        pelanggan_id: "",
        nama_item: "",
        kode_item_pelanggan: "",
        kode_sap: "",
        group_item_id_1: "",
        group_item_id_2: "",
        group_item_id_3: "",
        group_item_id_4: "",
        group_item_id_5: "",
        kategori_id_1: "",
        kategori_id_2: "",
        kategori_id_3: "",
        kategori_id_4: "",
        kategori_id_5: "",
        jumlah_palet: "",
        kapasitas_palet: "",
        kebutuhan_palet: "",
        batas_atas: "",
        batas_bawah: "",
        maksimal_tumpukan: "",
        supplier_id: "",
        supplier_code: "",
        satuan_id: "",
        berat_bersih: "",
        berat_kotor: "",
        satuan_id_berat: "",
        panjang: "",
        lebar: "",
        tebal: "",
        volume: "",
        satuan_id_volume: "",
        value_stocklevel: "",
        satuan_id_stocklevel: "",
        warna: "",
        keterangan: "",
      };
    },
  },
};
</script>
