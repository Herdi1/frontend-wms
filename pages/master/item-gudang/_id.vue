<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Item Gudang
        </h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div class="w-full">
        <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
          <form @submit.prevent="validate().then(() => onSubmit(invalid))">
            <div class="w-full gap-3">
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-top w-full"
                >
                  <div class="form-group">
                    <input-horizontal
                      label="Kode item"
                      type="text"
                      name="kode_item"
                      :required="true"
                      v-model="form.kode_item"
                    />
                  </div>
                  <ValidationProvider
                    name="item_id"
                    rules="required"
                    class="w-full mb-2"
                  >
                    <div class="flex items-center">
                      <label for="item_id" class="w-1/2"
                        >Item <span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_item"
                        :loading="isLoadingGetItem"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetItem"
                        v-model="form.item_id"
                        class="w-1/2 bg-white"
                        @input="onSelectItem"
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_item }}
                          </div>
                               </template
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
                  </ValidationProvider>
                  <ValidationProvider
                    name="vendor_id"
                    rules="required"
                    class="w-full mb-2"
                  >
                    <div class="flex items-center">
                      <label for="vendor_id" class="w-1/2"
                        >Vendor <span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_vendor"
                        :loading="isLoadingGetVendor"
                        :options="lookup_custom2.data"
                        :filterable="false"
                        @search="onGetVendor"
                        v-model="form.vendor_id"
                        class="w-1/2 bg-white"
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_vendor }}
                          </div>
                               </template
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
                  </ValidationProvider>
                  <ValidationProvider
                    name="supplier_id"
                    rules="required"
                    class="w-full mb-2"
                  >
                    <div
                      slot-scope="{ errors, valid }"
                      class="flex items-center"
                    >
                      <label for="supplier_id" class="w-1/2"
                        >Supplier <span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_supplier"
                        :loading="isLoadingGetSuppliers"
                        :options="lookup_suppliers.data"
                        :filterable="false"
                        @search="onGetSuppliers"
                        v-model="form.supplier_id"
                        class="w-1/2 bg-white"
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_supplier }}
                          </div>
                               </template
                        >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_suppliers.data.length || search"
                        >
                          <span
                            v-if="lookup_suppliers.current_page > 1"
                            @click="onGetSuppliers(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_suppliers.last_page >
                              lookup_suppliers.current_page
                            "
                            @click="onGetSuppliers(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <div class="form-group">
                    <input-horizontal
                      label="Kode Supplier"
                      type="text"
                      name="supplier_code"
                      :required="true"
                      v-model="form.supplier_code"
                    />
                  </div>
                  <ValidationProvider
                    name="gudang_id"
                    rules="required"
                    class="w-full mb-2"
                  >
                    <div class="flex items-center">
                      <label for="gudang_id" class="w-1/2"
                        >Gudang <span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_gudang"
                        :loading="isLoadingGetGudang"
                        :options="lookup_custom4.data"
                        :filterable="false"
                        @search="onGetGudang"
                        v-model="form.gudang_id"
                        class="w-1/2 bg-white"
                        @input="(item) => onSelectGudang(item)"
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_gudang }}
                          </div>
                               </template
                        >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom4.data.length || search"
                        >
                          <span
                            v-if="lookup_custom4.current_page > 1"
                            @click="onGetGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom4.last_page >
                              lookup_custom4.current_page
                            "
                            @click="onGetGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    name="zona_id"
                    rules="required"
                    class="w-full mb-2"
                  >
                    <div
                      slot-scope="{ errors, valid }"
                      class="flex items-center"
                    >
                      <label for="zona_id" class="w-1/2"
                        >Zona Gudang <span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_zona_gudang"
                        :loading="isLoadingGetZona"
                        :options="lookup_custom5.data"
                        :filterable="false"
                        @search="onGetZona"
                        v-model="form.zona_id"
                        class="w-1/2 bg-white"
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_zona_gudang }}
                          </div>
                               </template
                        >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom5.data.length || search"
                        >
                          <span
                            v-if="lookup_custom5.current_page > 1"
                            @click="onGetZona(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom5.last_page >
                              lookup_custom5.current_page
                            "
                            @click="onGetZona(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>

                  <div class="form-group">
                    <input-horizontal
                      label="Nama Item"
                      type="text"
                      name="nama_item"
                      :required="true"
                      v-model="form.nama_item"
                    />
                  </div>

                  <ValidationProvider
                    name="satuan_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }" class="flex">
                      <label for="satuan_id" class="w-[50%]"
                        >Satuan<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_satuan"
                        :loading="isLoadingGetSatuan"
                        :options="lookup_operator.data"
                        :filterable="false"
                        @search="onGetSatuan"
                        v-model="form.satuan_id"
                        class="w-[50%] bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_satuan }}
                          </div>
                               </template
                        >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_operator.data.length || search"
                        >
                          <span
                            v-if="lookup_operator.current_page > 1"
                            @click="onGetSatuan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_operator.last_page >
                              lookup_operator.current_page
                            "
                            @click="onGetSatuan(search, true)"
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

                  <div class="form-group flex justify-between">
                    <label for="batas_bawah" class="w-1/2">Batas Bawah </label>
                    <money
                      v-model="form.batas_bawah"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>

                  <div class="form-group flex justify-between">
                    <label for="batas_atas" class="w-1/2">Batas Atas </label>
                    <money
                      v-model="form.batas_atas"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>

                  <div class="flex mb-2">
                    <label class="w-[50%]" for="group_item_id_1"
                      >Group Item Level 1</label
                    >
                    <v-select
                      label="nama_group_item"
                      :loading="isLoadingGetGroupItem1"
                      :options="lookup_custom6.data"
                      :filterable="false"
                      @search="onGetGroupItem1"
                      v-model="form.group_item_id_1"
                      class="w-[50%] bg-white"
                      @input="onSelectGroupItem1"
                    >
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_group_item }}
                        </div>
                             </template
                      >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom6.data.length || search"
                      >
                        <span
                          v-if="lookup_custom6.current_page > 1"
                          @click="onGetGroupItem1(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom6.last_page >
                            lookup_custom6.current_page
                          "
                          @click="onGetGroupItem1(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>

                  <div class="flex mb-2">
                    <label class="w-[50%]" for="group_item_id_2"
                      >Group Item Level 2</label
                    >
                    <v-select
                      label="nama_group_item"
                      :loading="isLoadingGetGroupItem2"
                      :options="lookup_custom7.data"
                      :filterable="false"
                      @search="onGetGroupItem2"
                      v-model="form.group_item_id_2"
                      class="w-[50%] bg-white"
                      @input="onSelectGroupItem2"
                    >
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_group_item }}
                        </div>
                             </template
                      >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom7.data.length || search"
                      >
                        <span
                          v-if="lookup_custom7.current_page > 1"
                          @click="onGetGroupItem2(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom7.last_page >
                            lookup_custom7.current_page
                          "
                          @click="onGetGroupItem2(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>

                  <div class="flex mb-2">
                    <label class="w-[50%]" for="group_item_id_3"
                      >Group Item Level 3</label
                    >
                    <v-select
                      label="nama_group_item"
                      :loading="isLoadingGetGroupItem3"
                      :options="lookup_custom8.data"
                      :filterable="false"
                      @search="onGetGroupItem3"
                      v-model="form.group_item_id_3"
                      class="w-[50%] bg-white"
                      @input="onSelectGroupItem3"
                    >
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_group_item }}
                        </div>
                             </template
                      >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom8.data.length || search"
                      >
                        <span
                          v-if="lookup_custom8.current_page > 1"
                          @click="onGetGroupItem3(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom8.last_page >
                            lookup_custom8.current_page
                          "
                          @click="onGetGroupItem3(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>

                  <div class="flex mb-2">
                    <label class="w-[50%]" for="group_item_id_4"
                      >Group Item Level 4</label
                    >
                    <v-select
                      label="nama_group_item"
                      :loading="isLoadingGetGroupItem4"
                      :options="lookup_custom9.data"
                      :filterable="false"
                      @search="onGetGroupItem4"
                      v-model="form.group_item_id_4"
                      class="w-[50%] bg-white"
                      @input="onSelectGroupItem4"
                    >
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_group_item }}
                        </div>
                             </template
                      >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom9.data.length || search"
                      >
                        <span
                          v-if="lookup_custom9.current_page > 1"
                          @click="onGetGroupItem4(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom9.last_page >
                            lookup_custom9.current_page
                          "
                          @click="onGetGroupItem4(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>

                  <div class="flex mb-2">
                    <label class="w-[50%]" for="group_item_id_5"
                      >Group Item Level 5</label
                    >
                    <v-select
                      label="nama_group_item"
                      :loading="isLoadingGetGroupItem5"
                      :options="lookup_custom10.data"
                      :filterable="false"
                      @search="onGetGroupItem5"
                      v-model="form.group_item_id_5"
                      class="w-[50%] bg-white"
                    >
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_group_item }}
                        </div>
                             </template
                      >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom10.data.length || search"
                      >
                        <span
                          v-if="lookup_custom10.current_page > 1"
                          @click="onGetGroupItem5(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom10.last_page >
                            lookup_custom10.current_page
                          "
                          @click="onGetGroupItem5(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>

                  <div class="flex mb-2">
                    <label class="w-[50%]" for="kategori_id_1"
                      >Kategori Item Level 1</label
                    >
                    <v-select
                      label="nama_kategori_item"
                      :loading="isLoadingGetKategoriItem1"
                      :options="lookup_mesin.data"
                      :filterable="false"
                      @search="onGetKategoriItem1"
                      v-model="form.kategori_id_1"
                      class="w-[50%] bg-white"
                      @input="onSearchKategoriItem2"
                    >
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_kategori_item }}
                        </div>
                             </template
                      >
                      <li
                        :required="!form.kategori_id_1"
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_mesin.data.length || search"
                      >
                        <span
                          v-if="lookup_mesin.current_page > 1"
                          @click="onGetKategoriItem1(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_mesin.last_page > lookup_mesin.current_page
                          "
                          @click="onGetKategoriItem1(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>

                  <div class="flex mb-2">
                    <label class="w-[50%]" for="kategori_id_2"
                      >Kategori Item Level 2</label
                    >
                    <v-select
                      label="nama_kategori_item"
                      :loading="isLoadingGetKategoriItem2"
                      :options="lookup_pengawas.data"
                      :filterable="false"
                      @search="onGetKategoriItem2"
                      v-model="form.kategori_id_2"
                      class="w-[50%] bg-white"
                      @input="onSearchKategoriItem3"
                    >
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_kategori_item }}
                        </div>
                             </template
                      >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_pengawas.data.length || search"
                      >
                        <span
                          v-if="lookup_pengawas.current_page > 1"
                          @click="onGetKategoriItem2(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_pengawas.last_page >
                            lookup_pengawas.current_page
                          "
                          @click="onGetKategoriItem2(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="flex mb-2">
                    <label class="w-[50%]" for="kategori_id_3"
                      >Kategori Item Level 3</label
                    >
                    <v-select
                      label="nama_kategori_item"
                      :loading="isLoadingGetKategoriItem3"
                      :options="lookup_proces.data"
                      :filterable="false"
                      @search="onGetKategoriItem3"
                      v-model="form.kategori_id_3"
                      class="w-[50%] bg-white"
                      @input="onSearchKategoriItem4"
                    >
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_kategori_item }}
                        </div>
                             </template
                      >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_proces.data.length || search"
                      >
                        <span
                          v-if="lookup_proces.current_page > 1"
                          @click="onGetKategoriItem3(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_proces.last_page > lookup_proces.current_page
                          "
                          @click="onGetKategoriItem3(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="flex mb-2">
                    <label class="w-[50%]" for="kategori_id_4"
                      >Kategori Item Level 4</label
                    >
                    <v-select
                      label="nama_kategori_item"
                      :loading="isLoadingGetKategoriItem4"
                      :options="lookup_parents.data"
                      :filterable="false"
                      @search="onGetKategoriItem4"
                      v-model="form.kategori_id_4"
                      class="w-[50%] bg-white"
                      @input="onSearchKategoriItem5"
                    >
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_kategori_item }}
                        </div>
                             </template
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
                            lookup_parents.last_page >
                            lookup_parents.current_page
                          "
                          @click="onGetKategoriItem4(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div class="flex mb-2">
                    <label class="w-[50%]" for="kategori_id_5"
                      >Kategori Item Level 5</label
                    >
                    <v-select
                      label="nama_kategori_item"
                      :loading="isLoadingGetKategoriItem5"
                      :options="lookup_sellings.data"
                      :filterable="false"
                      @search="onGetKategoriItem5"
                      v-model="form.kategori_id_5"
                      class="w-[50%] bg-white"
                    >
                      <template slot="selected-option" slot-scope="option">
                        <div
                          class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                        >
                          {{ option.nama_kategori_item }}
                        </div>
                             </template
                      >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_sellings.data.length || search"
                      >
                        <span
                          v-if="lookup_sellings.current_page > 1"
                          @click="onGetKategoriItem5(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_sellings.last_page >
                            lookup_sellings.current_page
                          "
                          @click="onGetKategoriItem5(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>

                  <div class="form-group flex justify-between">
                    <label for="biaya_gaji_sopir" class="w-1/2"
                      >Biaya Gaji Sopir
                    </label>
                    <money
                      v-model="form.biaya_gaji_sopir"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="biaya_bongkartoko" class="w-1/2"
                      >Biaya Bongkar Toko
                    </label>
                    <money
                      v-model="form.biaya_bongkartoko"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="biaya_bongkar" class="w-1/2"
                      >Biaya Bongkar
                    </label>
                    <money
                      v-model="form.biaya_bongkar"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="biaya_muat" class="w-1/2">Biaya Muat </label>
                    <money
                      v-model="form.biaya_muat"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="biaya_pok" class="w-1/2">Biaya Pok </label>
                    <money
                      v-model="form.biaya_pok"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="jumlah_palet" class="w-1/2"
                      >Jumlah Palet
                    </label>
                    <money
                      v-model="form.jumlah_palet"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="kapasitas_palet" class="w-1/2"
                      >Kapasitas Palet
                    </label>
                    <money
                      v-model="form.kapasitas_palet"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="kebutuhan_palet" class="w-1/2"
                      >Kebutuhan Palet
                    </label>
                    <money
                      v-model="form.kebutuhan_palet"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="maksimal_tumpukan" class="w-1/2"
                      >Maksimal Tumpukan
                    </label>
                    <money
                      v-model="form.maksimal_tumpukan"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="berat_bersih" class="w-1/2"
                      >Berat Bersih
                    </label>
                    <money
                      v-model="form.berat_bersih"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="berat_kotor" class="w-1/2">Berat Kotor </label>
                    <money
                      v-model="form.berat_kotor"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <ValidationProvider
                    name="satuan_id_berat"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }" class="flex">
                      <label for="satuan_id_berat" class="w-[50%]"
                        >Satuan Berat<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_satuan"
                        :loading="isLoadingGetSatuanBerat"
                        :options="lookup_warehouses.data"
                        :filterable="false"
                        @search="onGetSatuanBerat"
                        v-model="form.satuan_id_berat"
                        class="w-[50%] bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_satuan }}
                          </div>
                               </template
                        >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_warehouses.data.length || search"
                        >
                          <span
                            v-if="lookup_warehouses.current_page > 1"
                            @click="onGetSatuanBerat(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_warehouses.last_page >
                              lookup_warehouses.current_page
                            "
                            @click="onGetSatuanBerat(search, true)"
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
                  <div class="form-group flex justify-between">
                    <label for="panjang" class="w-1/2">Panjang </label>
                    <money
                      v-model="form.panjang"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="lebar" class="w-1/2">Lebar </label>
                    <money
                      v-model="form.lebar"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="tebal" class="w-1/2">Tebal </label>
                    <money
                      v-model="form.tebal"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="volume" class="w-1/2">Volume </label>
                    <money
                      v-model="form.volume"
                      class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>
                  <ValidationProvider
                    name="satuan_id_volume"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }" class="flex">
                      <label for="satuan_id_volume" class="w-[50%]"
                        >Satuan Volume<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_satuan"
                        :loading="isLoadingGetSatuanVolume"
                        :options="lookup_beam.data"
                        :filterable="false"
                        @search="onGetSatuanVolume"
                        v-model="form.satuan_id_volume"
                        class="w-[50%] bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_satuan }}
                          </div>
                               </template
                        >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_beam.data.length || search"
                        >
                          <span
                            v-if="lookup_beam.current_page > 1"
                            @click="onGetSatuanVolume(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_beam.last_page > lookup_beam.current_page
                            "
                            @click="onGetSatuanVolume(search, true)"
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
                  <div class="form-group">
                    <input-horizontal
                      label="Warna"
                      type="text"
                      name="warna"
                      v-model="form.warna"
                      :required="false"
                    />
                  </div>
                  <ValidationProvider
                    name="satuan_id_stocklevel"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }" class="flex">
                      <label for="satuan_id_stocklevel" class="w-[50%]"
                        >Satuan Stocklevel<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <v-select
                        label="nama_satuan"
                        :loading="isLoadingGetSatuanStocklevel"
                        :options="lookup_resellers.data"
                        :filterable="false"
                        @search="onGetSatuanStockLevel"
                        v-model="form.satuan_id_stocklevel"
                        class="w-[50%] bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_satuan }}
                          </div>
                               </template
                        >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_resellers.data.length || search"
                        >
                          <span
                            v-if="lookup_resellers.current_page > 1"
                            @click="onGetSatuanStockLevel(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_resellers.last_page >
                              lookup_resellers.current_page
                            "
                            @click="onGetSatuanStockLevel(search, true)"
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
                  <div class="form-group md:col-span-2 lg:col-span-3">
                    <label for="keterangan">Keterangan</label>
                    <textarea
                      name="keterangan"
                      v-model="form.keterangan"
                      class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                    ></textarea>
                  </div>
                </div>
                <modal-footer-section
                  :isLoadingForm="isLoadingForm"
                  @reset="formReset()"
                />
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
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

      isStopSearchSuppliers: false,
      isLoadingGetSuppliers: false,
      suppliers_search: "",

      isStopSearchGroup: false,
      isLoadingGetGroup: false,
      group_search: "",

      isStopSearchCategory: false,
      isLoadingGetCategory: false,
      category_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchZona: false,
      isLoadingGetZona: false,
      zona_search: "",

      isStopSearchGroupItem1: false,
      isLoadingGetGroupItem1: false,
      group_item_1_search: "",

      isStopSearchGroupItem2: false,
      isLoadingGetGroupItem2: false,
      group_item_2_search: "",

      isStopSearchGroupItem3: false,
      isLoadingGetGroupItem3: false,
      group_item_3_search: "",

      isStopSearchGroupItem4: false,
      isLoadingGetGroupItem4: false,
      group_item_4_search: "",

      isStopSearchGroupItem5: false,
      isLoadingGetGroupItem5: false,
      group_item_5_search: "",

      isStopSearchKategoriItem1: false,
      isLoadingGetKategoriItem1: false,
      kategori_1_search: "",

      isStopSearchKategoriItem2: false,
      isLoadingGetKategoriItem2: false,
      kategori_2_search: "",

      isStopSearchKategoriItem3: false,
      isLoadingGetKategoriItem3: false,
      kategori_3_search: "",

      isStopSearchKategoriItem4: false,
      isLoadingGetKategoriItem4: false,
      kategori_4_search: "",

      isStopSearchKategoriItem5: false,
      isLoadingGetKategoriItem5: false,
      kategori_5_search: "",

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
      },
      form: {
        item_id: "",
        vendor_id: "",
        gudang_id: "",
        zona_id: "",
        supplier_id: "",
        supplier_code: "",
        nama_item: "",
        group_item_id_1: "",
        group_item_id_2: "",
        group_item_id_3: "",
        group_item_id_4: "",
        group_item_id_5: "",
        batas_atas: "",
        kode_item: "",
        batas_bawah: "",
        kategori_id_1: "",
        kategori_id_2: "",
        kategori_id_3: "",
        kategori_id_4: "",
        kategori_id_5: "",
        biaya_gaji_sopir: "",
        biaya_bongkartoko: "",
        biaya_bongkar: "",
        biaya_muat: "",
        biaya_pok: "",
        jumlah_palet: "",
        kapasitas_palet: "",
        kebutuhan_palet: "",
        maksimal_tumpukan: "",
        berat_bersih: "",
        berat_kotor: "",
        panjang: "",
        lebar: "",
        tebal: "",
        volume: "",
        warna: "",
        satuan_id: "",
        satuan_id_berat: "",
        satuan_id_volume: "",
        satuan_id_stocklevel: "",
        value_stocklevel: "",
        keterangan: "",
      },
      default_form: {
        item_id: "",
        vendor_id: "",
        gudang_id: "",
        zona_id: "",
        supplier_id: "",
        supplier_code: "",
        nama_item: "",
        group_item_id_1: "",
        group_item_id_2: "",
        group_item_id_3: "",
        group_item_id_4: "",
        group_item_id_5: "",
        batas_atas: "",
        kode_item: "",
        batas_bawah: "",
        kategori_id_1: "",
        kategori_id_2: "",
        kategori_id_3: "",
        kategori_id_4: "",
        kategori_id_5: "",
        biaya_gaji_sopir: "",
        biaya_bongkartoko: "",
        biaya_bongkar: "",
        biaya_muat: "",
        biaya_pok: "",
        jumlah_palet: "",
        kapasitas_palet: "",
        kebutuhan_palet: "",
        maksimal_tumpukan: "",
        berat_bersih: "",
        berat_kotor: "",
        panjang: "",
        lebar: "",
        tebal: "",
        volume: "",
        warna: "",
        satuan_id: "",
        satuan_id_berat: "",
        satuan_id_volume: "",
        satuan_id_stocklevel: "",
        value_stocklevel: "",
        keterangan: "",
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get("master/item-gudang/" + this.id);
        Object.keys(this.form).forEach((item) => {
          this.form[item] = res.data[item];
        });
        this.form.item_id = res.data.item;
        this.form.group_item_id_1 = res.data.group_item_1 ?? "";
        this.form.group_item_id_2 = res.data.group_item_2 ?? "";
        this.form.group_item_id_3 = res.data.group_item_3 ?? "";
        this.form.group_item_id_4 = res.data.group_item_4 ?? "";
        this.form.group_item_id_5 = res.data.group_item_5 ?? "";
        this.form.kategori_id_1 = res.data.kategori_1 ?? "";
        this.form.kategori_id_2 = res.data.kategori_2 ?? "";
        this.form.kategori_id_3 = res.data.kategori_3 ?? "";
        this.form.kategori_id_4 = res.data.kategori_4 ?? "";
        this.form.kategori_id_5 = res.data.kategori_5 ?? "";
        this.form.vendor_id = res.data.vendor ?? "";
        this.form.supplier_id = res.data.supplier ?? "";
        this.form.gudang_id = res.data.gudang ?? "";
        this.form.zona_id = res.data.zona_gudang ?? "";
        this.form.satuan_id = res.data.satuan ?? "";
        this.form.satuan_id_berat = res.data.satuan_berat ?? "";
        this.form.satuan_id_volume = res.data.satuan_volume ?? "";
        this.form.satuan_id_stocklevel = res.data.satuan_stocklevel ?? "";
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/master/item-gudang");
    }
  },

  async mounted() {
    await this.onSearchItem();
    await this.onSearchVendor();
    await this.onSearchGroup();
    await this.onSearchSuppliers();
    await this.onSearchCategory();
    await this.onSearchGudang();
    // await this.onSearchZona();

    await this.onSearchGroupItem1();
    await this.onSearchKategoriItem1();
    await this.onSearchKategoriItem2();
    await this.onSearchKategoriItem3();
    await this.onSearchKategoriItem4();
    await this.onSearchKategoriItem5();

    await this.onSearchSatuanBerat();
    await this.onSearchSatuanVolume();
    await this.onSearchSatuan();
    await this.onSearchSatuanStocklevel();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //item
      "lookup_custom2", //vendor
      "lookup_custom3", //grup
      "lookup_suppliers", //supplier
      "lookup_grade", //kategori
      "lookup_custom4", //gudang
      "lookup_custom5", //zona
      "lookup_custom6", //group item
      "lookup_custom7", //group item
      "lookup_custom8", //group item
      "lookup_custom9", //group item
      "lookup_custom10", //group item
      "lookup_mesin", //kategori item
      "lookup_pengawas",
      "lookup_proces",
      "lookup_parents",
      "lookup_sellings",

      "lookup_resellers",
      "lookup_warehouses",
      "lookup_operator",
      "lookup_beam",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "master/item-gudang";

      let formData = {
        ...this.form,
        item_id:
          typeof this.form.item_id === "object"
            ? this.form.item_id.item_id
            : this.form.item_id,
        group_item_id_1:
          typeof this.form.group_item_id_1 === "object"
            ? this.form.group_item_id_1.group_item_id
            : this.form.group_item_id_1,
        group_item_id_2:
          typeof this.form.group_item_id_2 === "object"
            ? this.form.group_item_id_2.group_item_id
            : this.form.group_item_id_2,
        group_item_id_3:
          typeof this.form.group_item_id_3 === "object"
            ? this.form.group_item_id_3.group_item_id
            : this.form.group_item_id_3,
        group_item_id_4:
          typeof this.form.group_item_id_4 === "object"
            ? this.form.group_item_id_4.group_item_id
            : this.form.group_item_id_4,
        group_item_id_5:
          typeof this.form.group_item_id_5 === "object"
            ? this.form.group_item_id_5.group_item_id
            : this.form.group_item_id_5,
        kategori_id_1:
          typeof this.form.kategori_id_1 === "object"
            ? this.form.kategori_id_1.kategori_item_id
            : this.form.kategori_id_1,
        kategori_id_2:
          typeof this.form.kategori_id_2 === "object"
            ? this.form.kategori_id_2.kategori_item_id
            : this.form.kategori_id_2,
        kategori_id_3:
          typeof this.form.kategori_id_3 === "object"
            ? this.form.kategori_id_3.kategori_item_id
            : this.form.kategori_id_3,
        kategori_id_4:
          typeof this.form.kategori_id_4 === "object"
            ? this.form.kategori_id_4.kategori_item_id
            : this.form.kategori_id_4,
        kategori_id_5:
          typeof this.form.kategori_id_5 === "object"
            ? this.form.kategori_id_5.kategori_item_id
            : this.form.kategori_id_5,
        vendor_id:
          typeof this.form.vendor_id === "object"
            ? this.form.vendor_id.vendor_id
            : this.form.vendor_id,
        gudang_id:
          typeof this.form.gudang_id === "object"
            ? this.form.gudang_id.gudang_id
            : this.form.gudang_id,
        zona_id:
          typeof this.form.zona_id === "object"
            ? this.form.zona_id.zona_gudang_id
            : this.form.zona_id,
        supplier_id:
          typeof this.form.supplier_id === "object"
            ? this.form.supplier_id.supplier_id
            : this.form.supplier_id,
        satuan_id:
          typeof this.form.satuan_id === "object"
            ? this.form.satuan_id.satuan_id
            : this.form.satuan_id,
        satuan_id_berat:
          typeof this.form.satuan_id_berat === "object"
            ? this.form.satuan_id_berat.satuan_id
            : this.form.satuan_id_berat,
        satuan_id_volume:
          typeof this.form.satuan_id_volume === "object"
            ? this.form.satuan_id_volume.satuan_id
            : this.form.satuan_id_volume,
        satuan_id_stocklevel:
          typeof this.form.satuan_id_stocklevel === "object"
            ? this.form.satuan_id_stocklevel.satuan_id
            : this.form.satuan_id_stocklevel,
      };

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        url: url,
        method: this.isEditable ? "put" : "post",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Berhasil " +
              (this.isEditable ? "Update" : "Tambah") +
              " Item Gudang"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
            };
          }

          this.$router.push("/master/item-gudang");
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
        this.form.nama_item = item.nama_item;
        this.form.supplier_id = item.supplier ?? "";
        this.form.batas_atas = item.batas_atas ?? 0;
        this.form.batas_bawah = item.batas_bawah ?? 0;
        this.form.jumlah_palet = item.jumlah_palet ?? 0;
        this.form.kapasitas_palet = item.kapasitas_palet ?? 0;
        this.form.kebutuhan_palet = item.kebutuhan_palet ?? 0;
        this.form.maksimal_tumpukan = item.maksimal_tumpukan ?? 0;
        this.form.volume = item.volume ?? 0;
        this.form.berat_bersih = item.berat_bersih ?? 0;
        this.form.berat_kotor = item.berat_kotor ?? 0;
        this.form.group_item_id_1 = item.group_item_1 ?? "";
        this.form.group_item_id_2 = item.group_item_2 ?? "";
        this.form.group_item_id_3 = item.group_item_3 ?? "";
        this.form.group_item_id_4 = item.group_item_4 ?? "";
        this.form.group_item_id_5 = item.group_item_5 ?? "";
        this.form.kategori_id_1 = item.kategori_1 ?? "";
        this.form.kategori_id_2 = item.kategori_2 ?? "";
        this.form.kategori_id_3 = item.kategori_3 ?? "";
        this.form.kategori_id_4 = item.kategori_4 ?? "";
        this.form.kategori_id_5 = item.kategori_5 ?? "";
        this.form.satuan_id = item.satuan ?? "";
        this.form.satuan_id_berat = item.satuan_berat ?? "";
        this.form.satuan_id_volume = item.satuan_volume ?? "";
        this.form.satuan_id_stocklevel = item.satuan_stocklevel ?? "";
        this.form.keterangan = item.keterangan ?? "";
      }
      // else {
      // this.form.nama_item = "";
      //   this.form.supplier_id =  "";
      //   this.form.batas_atas = 0;
      //   this.form.batas_bawah = 0;
      //   this.form.jumlah_palet = 0;
      //   this.form.kapasitas_palet = 0;
      //   this.form.kebutuhan_palet = 0;
      //   this.form.maksimal_tumpukan = 0;
      //   this.form.volume = 0;
      //   this.form.berat_bersih = 0;
      //   this.form.berat_kotor = 0;
      //   this.form.group_item_id_1 = "";
      //   this.form.group_item_id_2 = "";
      //   this.form.group_item_id_3 = "";
      //   this.form.group_item_id_4 = "";
      //   this.form.group_item_id_5 = "";
      //   this.form.kategori_id_1 = "";
      //   this.form.kategori_id_2 = "";
      //   this.form.kategori_id_3 = "";
      //   this.form.kategori_id_4 = "";
      //   this.form.kategori_id_5 = "";
      //   this.form.satuan_id = "";
      //   this.form.satuan_id_berat = "";
      //   this.form.satuan_id_volume = "";
      //   this.form.satuan_id_stocklevel = "";
      //   this.form.keterangan = "";
      // }
      console.log(item);
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

    onGetGroup(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchGroup);
      this.isStopSearchGroup = setTimeout(() => {
        this.group_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }
        this.onSearchGroup();
      }, 600);
    },

    async onSearchGroup() {
      if (!this.isLoadingGetGrup) {
        this.isLoadingGetGroup = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom3",
          query:
            "?search=" +
            this.group_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGroup = false;
        // console.log("item", this.lookup_custom3.data);
      }
    },

    onGetSuppliers(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchSuppliers);
      this.isStopSearchSuppliers = setTimeout(() => {
        this.suppliers_search = search;

        if (typeof isNext === "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }
        this.onSearchSuppliers();
      }, 600);
    },

    async onSearchSuppliers() {
      if (!this.isLoadingGetSuppliers) {
        this.isLoadingGetSuppliers = true;

        await this.lookUp({
          url: "master/supplier/get-supplier",
          lookup: "suppliers",
          query:
            "?search=" +
            this.suppliers_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });
        this.isLoadingGetSuppliers = false;
        // console.log("item", this.lookup_suppliers.data);
      }
    },

    onGetCategory(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchCategory);
      this.isStopSearchCategory = setTimeout(() => {
        this.category_search = search;

        if (typeof isNext === "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }
        this.onSearchCategory();
      }, 600);
    },

    async onSearchCategory() {
      if (!this.isLoadingGetCategory) {
        this.isLoadingGetCategory = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori",
          lookup: "grade",
          query:
            "?search=" +
            this.category_search +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });
        this.isLoadingGetCategory = false;
        // console.log("item", this.lookup_grade.data);
      }
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchGudang);
      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }
        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom4",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGudang = false;
        // console.log("item", this.lookup_grade.data);
      }
    },

    async onSelectGudang(item) {
      if (item) {
        this.form.gudang_id = item;
        await this.onSearchZona();
      } else {
        this.form.gudang_id = "";
      }
    },

    onGetZona(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;
      clearTimeout(this.isStopSearchZona);
      this.isStopSearchZona = setTimeout(() => {
        this.zona_search = search;

        if (typeof isNext === "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }
        this.onSearchZona();
      }, 600);
    },

    async onSearchZona() {
      if (!this.isLoadingGetZona) {
        this.isLoadingGetZona = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom5",
          query:
            "?search=" +
            this.zona_search +
            "&gudang_id=" +
            this.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });
        this.isLoadingGetZona = false;
        // console.log("item", this.lookup_grade.data);
      }
    },

    onGetGroupItem1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem1);

      this.isStopSearchGroupItem1 = setTimeout(() => {
        this.group_item_1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchGroupItem1();
      }, 600);
    },

    async onSearchGroupItem1() {
      if (!this.isLoadingGetGroupItem1) {
        this.isLoadingGetGroupItem1 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom6",
          query:
            "?search=" +
            this.group_item_1_search +
            "&status=1" +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem1 = false;
      }
    },

    onGetGroupItem2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem2);

      this.isStopSearchGroupItem2 = setTimeout(() => {
        this.group_item_2_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchGroupItem2();
      }, 600);
    },

    async onSearchGroupItem2() {
      this.lookup_roles = {};
      if (!this.isLoadingGetGroupItem2) {
        this.isLoadingGetGroupItem2 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom7",
          query:
            "?search=" +
            this.group_item_2_search +
            "&status=2" +
            "&group_item_id_induk=" +
            this.form.group_item_id_1.group_item_id +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem2 = false;
      }
    },

    onGetGroupItem3(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem3);

      this.isStopSearchGroupItem3 = setTimeout(() => {
        this.group_item_3_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }

        this.onSearchGroupItem3();
      }, 600);
    },

    async onSearchGroupItem3() {
      if (!this.isLoadingGetGroupItem3) {
        this.isLoadingGetGroupItem3 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom8",
          query:
            "?search=" +
            this.group_item_3_search +
            "&status=3" +
            "&group_item_id_induk=" +
            this.form.group_item_id_2.group_item_id +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem3 = false;
      }
    },

    onGetGroupItem4(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem4);

      this.isStopSearchGroupItem4 = setTimeout(() => {
        this.group_item_4_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }

        this.onSearchGroupItem4();
      }, 600);
    },

    async onSearchGroupItem4() {
      if (!this.isLoadingGetGroupItem4) {
        this.isLoadingGetGroupItem4 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom9",
          query:
            "?search=" +
            this.group_item_4_search +
            "&status=4" +
            "&group_item_id_induk=" +
            this.form.group_item_id_3.group_item_id +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem4 = false;
      }
    },

    onGetGroupItem5(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem5);

      this.isStopSearchGroupItem5 = setTimeout(() => {
        this.group_item_5_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom10.current_page = isNext
            ? this.lookup_custom10.current_page + 1
            : this.lookup_custom10.current_page - 1;
        } else {
          this.lookup_custom10.current_page = 1;
        }

        this.onSearchGroupItem5();
      }, 600);
    },

    async onSearchGroupItem5() {
      if (!this.isLoadingGetGroupItem5) {
        this.isLoadingGetGroupItem5 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "custom10",
          query:
            "?search=" +
            this.group_item_5_search +
            "&status=5" +
            "&group_item_id_induk=" +
            this.form.group_item_id_4.group_item_id +
            "&page=" +
            this.lookup_custom10.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem5 = false;
      }
    },

    async onSelectGroupItem1() {
      await this.onSearchGroupItem2();
      this.form.group_item_id_2 = "";
    },
    async onSelectGroupItem2() {
      await this.onSearchGroupItem3();
      this.form.group_item_id_3 = "";
    },
    async onSelectGroupItem3() {
      await this.onSearchGroupItem4();
      this.form.group_item_id_4 = "";
    },
    async onSelectGroupItem4() {
      await this.onSearchGroupItem5();
      this.form.group_item_id_5 = "";
    },

    //kategori item
    onGetKategoriItem1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategoriItem1);

      this.isStopSearchKategoriItem1 = setTimeout(() => {
        this.kategori_1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_mesin.current_page = isNext
            ? this.lookup_mesin.current_page + 1
            : this.lookup_mesin.current_page - 1;
        } else {
          this.lookup_mesin.current_page = 1;
        }

        this.onSearchKategoriItem1();
      }, 600);
    },

    async onSearchKategoriItem1() {
      if (!this.isLoadingGetKategoriItem1) {
        this.isLoadingGetKategoriItem1 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "mesin",
          query:
            "?search=" +
            this.kategori_1_search +
            "&status=1" +
            "&page=" +
            this.lookup_mesin.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKategoriItem1 = false;
      }
    },

    onGetKategoriItem2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategoriItem2);

      this.isStopSearchKategoriItem2 = setTimeout(() => {
        this.kategori_2_search = search;

        if (typeof isNext !== "function") {
          this.lookup_pengawas.current_page = isNext
            ? this.lookup_pengawas.current_page + 1
            : this.lookup_pengawas.current_page - 1;
        } else {
          this.lookup_pengawas.current_page = 1;
        }

        this.onSearchKategoriItem2();
      }, 600);
    },

    async onSearchKategoriItem2() {
      if (!this.isLoadingGetKategoriItem2) {
        this.isLoadingGetKategoriItem2 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "pengawas",
          query:
            "?search=" +
            this.kategori_2_search +
            "&status=2" +
            "&page=" +
            this.lookup_pengawas.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKategoriItem2 = false;
      }
    },

    onGetKategoriItem3(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategoriItem3);

      this.isStopSearchKategoriItem3 = setTimeout(() => {
        this.kategori_3_search = search;

        if (typeof isNext !== "function") {
          this.lookup_proces.current_page = isNext
            ? this.lookup_proces.current_page + 1
            : this.lookup_proces.current_page - 1;
        } else {
          this.lookup_proces.current_page = 1;
        }

        this.onSearchKategoriItem3();
      }, 600);
    },

    async onSearchKategoriItem3() {
      if (!this.isLoadingGetKategoriItem3) {
        this.isLoadingGetKategoriItem3 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "proces",
          query:
            "?search=" +
            this.kategori_3_search +
            "&status=3" +
            "&page=" +
            this.lookup_proces.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKategoriItem3 = false;
      }
    },

    onGetKategoriItem4(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategoriItem4);

      this.isStopSearchKategoriItem4 = setTimeout(() => {
        this.kategori_4_search = search;

        if (typeof isNext !== "function") {
          this.lookup_parents.current_page = isNext
            ? this.lookup_parents.current_page + 1
            : this.lookup_parents.current_page - 1;
        } else {
          this.lookup_parents.current_page = 1;
        }

        this.onSearchKategoriItem4();
      }, 600);
    },

    async onSearchKategoriItem4() {
      if (!this.isLoadingGetKategoriItem4) {
        this.isLoadingGetKategoriItem4 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "parents",
          query:
            "?search=" +
            this.kategori_4_search +
            "&status=4" +
            "&page=" +
            this.lookup_parents.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKategoriItem4 = false;
      }
    },

    onGetKategoriItem5(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKategoriItem5);

      this.isStopSearchKategoriItem5 = setTimeout(() => {
        this.kategori_5_search = search;

        if (typeof isNext !== "function") {
          this.lookup_sellings.current_page = isNext
            ? this.lookup_sellings.current_page + 1
            : this.lookup_sellings.current_page - 1;
        } else {
          this.lookup_sellings.current_page = 1;
        }

        this.onSearchKategoriItem5();
      }, 600);
    },

    async onSearchKategoriItem5() {
      if (!this.isLoadingGetKategoriItem5) {
        this.isLoadingGetKategoriItem5 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "sellings",
          query:
            "?search=" +
            this.kategori_5_search +
            "&status=5" +
            "&page=" +
            this.lookup_sellings.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKategoriItem5 = false;
      }
    },

    //satuan
    onGetSatuan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuan);

      this.isStopSearchSatuan = setTimeout(() => {
        this.satuan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_operator.current_page = isNext
            ? this.lookup_operator.current_page + 1
            : this.lookup_operator.current_page - 1;
        } else {
          this.lookup_operator.current_page = 1;
        }

        this.onSearchSatuan();
      }, 600);
    },

    async onSearchSatuan() {
      if (!this.isLoadingGetSatuan) {
        this.isLoadingGetSatuan = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "operator",
          query:
            "?search=" +
            this.satuan_search +
            "&page=" +
            this.lookup_operator.current_page +
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
          this.lookup_warehouses.current_page = isNext
            ? this.lookup_warehouses.current_page + 1
            : this.lookup_warehouses.current_page - 1;
        } else {
          this.lookup_warehouses.current_page = 1;
        }

        this.onSearchSatuanBerat();
      }, 600);
    },

    async onSearchSatuanBerat() {
      if (!this.isLoadingGetSatuanBerat) {
        this.isLoadingGetSatuanBerat = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "warehouses",
          query:
            "?search=" +
            this.satuan_berat_search +
            "&jenis_satuan=B" +
            "&page=" +
            this.lookup_warehouses.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuanBerat = false;
      }
    },

    //satuan berat
    onGetSatuanVolume(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuanVolume);

      this.isStopSearchSatuanVolume = setTimeout(() => {
        this.satuan_volume_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchSatuanVolume();
      }, 600);
    },

    async onSearchSatuanVolume() {
      if (!this.isLoadingGetSatuanVolume) {
        this.isLoadingGetSatuanVolume = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "beam",
          query:
            "?search=" +
            this.satuan_volume_search +
            "&jenis_satuan=V" +
            "&page=" +
            this.lookup_beam.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuanVolume = false;
      }
    },

    //vendor operator
    onGetSatuanStockLevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuanStocklevel);

      this.isStopSearchSatuanStocklevel = setTimeout(() => {
        this.satuan_stocklevel_search = search;

        if (typeof isNext !== "function") {
          this.lookup_resellers.current_page = isNext
            ? this.lookup_resellers.current_page + 1
            : this.lookup_resellers.current_page - 1;
        } else {
          this.lookup_resellers.current_page = 1;
        }

        this.onSearchSatuanStocklevel();
      }, 600);
    },

    async onSearchSatuanStocklevel() {
      if (!this.isLoadingGetSatuanStocklevel) {
        this.isLoadingGetSatuanStocklevel = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "resellers",
          query:
            "?search=" +
            this.satuan_stocklevel_search +
            "&jenis_satuan=S" +
            "&page=" +
            this.lookup_resellers.current_page +
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
        gudang_id: "",
        zona_id: "",
        supplier_id: "",
        supplier_code: "",
        nama_item: "",
        group_item_id_1: "",
        group_item_id_2: "",
        group_item_id_3: "",
        group_item_id_4: "",
        group_item_id_5: "",
        batas_atas: "",
        kode_item: "",
        batas_bawah: "",
        kategori_id_1: "",
        kategori_id_2: "",
        kategori_id_3: "",
        kategori_id_4: "",
        kategori_id_5: "",
        jumlah_palet: "",
        kapasitas_palet: "",
        kebutuhan_palet: "",
        maksimal_tumpukan: "",
        berat_bersih: "",
        berat_kotor: "",
        panjang: "",
        lebar: "",
        tebal: "",
        volume: "",
        warna: "",
      };
    },
  },
};
</script>
