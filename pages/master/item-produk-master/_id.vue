<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Item
        </h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div class="w-full">
        <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
          <form
            @submit.prevent="validate().then(() => onSubmit(invalid))"
            autocomplete="off"
          >
            <div class="w-full md:flex gap-3">
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-top w-full"
                >
                  <div class="w-full" v-if="isEditable">
                    <input-form
                      label="Kode Item"
                      type="text"
                      name="kode_wms"
                      :required="true"
                      v-model="form.kode_wms"
                    />
                  </div>
                  <div class="w-full">
                    <input-form
                      label="Nama Item"
                      type="text"
                      name="nama_item"
                      :required="true"
                      v-model="form.nama_item"
                    />
                  </div>

                  <div class="w-full">
                    <input-form
                      label="Kode Alternatif"
                      type="text"
                      name="kode_alternatif"
                      :required="false"
                      v-model="form.kode_alternatif"
                    />
                  </div>

                  <div class="w-full">
                    <input-form
                      label="Kode Alternatif 2"
                      type="text"
                      name="kode_alternatif_2"
                      :required="false"
                      v-model="form.kode_alternatif_2"
                    />
                  </div>
                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <ValidationProvider
                      name="satuan_id"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id"
                          >Satuan<span class="text-danger">*</span></label
                        >
                        <v-select
                          label="nama_satuan"
                          :loading="isLoadingGetSatuan"
                          :options="lookup_custom1.data"
                          :filterable="false"
                          @search="onGetSatuan"
                          v-model="form.satuan_id"
                          class="w-full bg-white"
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
                              @click="onGetSatuan(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom1.last_page >
                                lookup_custom1.current_page
                              "
                              @click="onGetSatuan(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                        <span
                          class="text-danger text-xs pl-1"
                          v-if="errors[0]"
                          >{{ errors[0] }}</span
                        >
                      </div>
                    </ValidationProvider>
                    <div class="form-group">
                      <label for="berat_bersih"
                        >Berat Bersih <span class="text-danger">*</span></label
                      >
                      <money
                        v-model="form.berat_bersih"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </div>
                  </div>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <div class="form-group">
                      <label for="berat_kotor"
                        >Berat Kotor <span class="text-danger">*</span></label
                      >
                      <money
                        v-model="form.berat_kotor"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
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
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_berat"
                          >Satuan Berat<span class="text-danger">*</span></label
                        >
                        <v-select
                          label="nama_satuan"
                          :loading="isLoadingGetSatuanBerat"
                          :options="lookup_warehouses.data"
                          :filterable="false"
                          @search="onGetSatuanBerat"
                          v-model="form.satuan_id_berat"
                          class="w-full bg-white"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
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
                        <span
                          class="text-danger text-xs pl-1"
                          v-if="errors[0]"
                          >{{ errors[0] }}</span
                        >
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <div class="form-group">
                      <label for="volume">Volume </label>
                      <!-- <span class="text-danger">*</span> -->
                      <money
                        v-model="form.volume"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </div>

                    <div>
                      <label for="satuan_id_volume">Satuan Volume</label>
                      <v-select
                        label="nama_satuan"
                        :loading="isLoadingGetSatuanVolume"
                        :options="lookup_regus.data"
                        :filterable="false"
                        @search="onGetSatuanVolume"
                        v-model="form.satuan_id_volume"
                        class="w-full bg-white"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_regus.data.length || search"
                        >
                          <span
                            v-if="lookup_regus.current_page > 1"
                            @click="onGetSatuanVolume(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_regus.last_page > lookup_regus.current_page
                            "
                            @click="onGetSatuanVolume(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </div>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <div class="form-group">
                      <label for="kapasitas_palet">Kapasitas Palet</label>
                      <money
                        v-model="form.kapasitas_palet"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                      <!-- <input-form
                      label="kapasitas Palet"
                      type="text"
                      name="kapasitas_palet"
                      :required="true"
                      v-model="form.kapasitas_palet"
                    /> -->
                    </div>

                    <div class="form-group">
                      <label for="kebutuhan_palet">Kebutuhan Palet</label>
                      <money
                        v-model="form.kebutuhan_palet"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                      <!-- <input-form
                      label="Kebutuhan Palet"
                      type="text"
                      name="kebutuhan_palet"
                      :required="true"
                      v-model="form.kebutuhan_palet"
                    /> -->
                    </div>
                  </div>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <div class="form-group">
                      <label for="maksimal_tumpukan"
                        >Maksimal Tumpukan
                        <span class="text-danger">*</span></label
                      >
                      <money
                        v-model="form.maksimal_tumpukan"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </div>
                    <div class="form-group">
                      <label for="jumlah_palet">Jumlah Palet</label>
                      <money
                        v-model="form.jumlah_palet"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      />
                    </div>
                  </div>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <div class="form-group">
                      <label for="stocklevel"
                        >Stocklevel <span class="text-danger">*</span></label
                      >
                      <!-- <money
                        disabled
                        v-model="form.value_stocklevel"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        @keydown.native="
                          $event.key === '-' ? $event.preventDefault() : null
                        "
                      /> -->
                      <input
                        type="number"
                        v-model="calcStocklevel"
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        disabled
                      />
                    </div>
                    <ValidationProvider
                      name="satuan_id_stocklevel"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_stocklevel"
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
                          class="w-full bg-white"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
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
                        <span
                          class="text-danger text-xs pl-1"
                          v-if="errors[0]"
                          >{{ errors[0] }}</span
                        >
                      </div>
                    </ValidationProvider>
                  </div>
                  <!-- <div v-if="!isEditable"></div> -->

                  <ValidationProvider
                    name="group_item_id_1"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="group_item_id_1"
                        >Group Item Level 1<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <v-select
                        label="nama_group_item"
                        :loading="isLoadingGetGroupItem1"
                        :options="lookup_grade.data"
                        :filterable="false"
                        @search="onGetGroupItem1"
                        v-model="form.group_item_id_1"
                        class="w-full bg-white"
                        @input="(item) => onSelectGroup1(item)"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <template slot="selected-option" slot-scope="option">
                          <div
                            class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {{ option.nama_group_item }}
                          </div>
                               </template
                        >
                        <li
                          :required="!form.group_item_id_1"
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_grade.data.length || search"
                        >
                          <span
                            v-if="lookup_grade.current_page > 1"
                            @click="onGetGroupItem1(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_grade.last_page > lookup_grade.current_page
                            "
                            @click="onGetGroupItem1(search, true)"
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

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <ValidationProvider name="group_item_id_1" class="w-full">
                      <div slot-scope="{ errors, valid }">
                        <label for="group_item_id_2"
                          >Group Item Level 2<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <v-select
                          label="nama_group_item"
                          :loading="isLoadingGetGroupItem2"
                          :options="lookup_beam.data"
                          :filterable="false"
                          @search="onGetGroupItem2"
                          v-model="form.group_item_id_2"
                          class="w-full bg-white"
                          @input="(item) => onSelectGroup2(item)"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
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
                            v-if="lookup_beam.data.length || search"
                          >
                            <span
                              v-if="lookup_beam.current_page > 1"
                              @click="onGetGroupItem2(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_beam.last_page > lookup_beam.current_page
                              "
                              @click="onGetGroupItem2(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                        <span
                          class="text-danger text-xs pl-1"
                          v-if="errors[0]"
                          >{{ errors[0] }}</span
                        >
                      </div>
                    </ValidationProvider>
                    <ValidationProvider name="group_item_id_3" class="w-full">
                      <div slot-scope="{ errors, valid }">
                        <label for="group_item_id_3"
                          >Group Item Level 3<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <v-select
                          label="nama_group_item"
                          :loading="isLoadingGetGroupItem3"
                          :options="lookup_packing.data"
                          :filterable="false"
                          @search="onGetGroupItem3"
                          v-model="form.group_item_id_3"
                          class="w-full bg-white"
                          @input="(item) => onSelectGroup3(item)"
                          :class="
                            errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                          "
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
                            v-if="lookup_packing.data.length || search"
                          >
                            <span
                              v-if="lookup_packing.current_page > 1"
                              @click="onGetGroupItem3(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_packing.last_page >
                                lookup_packing.current_page
                              "
                              @click="onGetGroupItem3(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                        <span
                          class="text-danger text-xs pl-1"
                          v-if="errors[0]"
                          >{{ errors[0] }}</span
                        >
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <ValidationProvider name="group_item_id_4" class="w-full">
                      <div>
                        <label for="group_item_id_4">Group Item Level 4</label>
                        <v-select
                          label="nama_group_item"
                          :loading="isLoadingGetGroupItem4"
                          :options="lookup_defects.data"
                          :filterable="false"
                          @search="onGetGroupItem4"
                          v-model="form.group_item_id_4"
                          class="w-full bg-white"
                          @input="(item) => onSelectGroup4(item)"
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
                            v-if="lookup_defects.data.length || search"
                          >
                            <span
                              v-if="lookup_defects.current_page > 1"
                              @click="onGetGroupItem4(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_defects.last_page >
                                lookup_defects.current_page
                              "
                              @click="onGetGroupItem4(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider name="group_item_id_5" class="w-full">
                      <div>
                        <label for="group_item_id_5">Group Item Level 5</label>
                        <v-select
                          label="nama_group_item"
                          :loading="isLoadingGetGroupItem5"
                          :options="lookup_department.data"
                          :filterable="false"
                          @search="onGetGroupItem5"
                          v-model="form.group_item_id_5"
                          class="w-full bg-white"
                          @input="(item) => onSelectGroup5(item)"
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
                            v-if="lookup_department.data.length || search"
                          >
                            <span
                              v-if="lookup_department.current_page > 1"
                              @click="onGetGroupItem5(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_department.last_page >
                                lookup_department.current_page
                              "
                              @click="onGetGroupItem5(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                    </ValidationProvider>
                  </div>

                  <ValidationProvider
                    name="kategori_id_1"
                    rules="required"
                    class="w-full"
                  >
                    <div>
                      <label for="kategori_id_1"
                        >Kategori Item Level 1
                        <span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_kategori_item"
                        :loading="isLoadingGetKategoriItem1"
                        :options="lookup_mesin.data"
                        :filterable="false"
                        @search="onGetKategoriItem1"
                        v-model="form.kategori_id_1"
                        class="w-full bg-white"
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
                  </ValidationProvider>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <ValidationProvider name="kategori_id_1" class="w-full">
                      <div>
                        <label for="kategori_id_2">Kategori Item Level 2</label>
                        <v-select
                          label="nama_kategori_item"
                          :loading="isLoadingGetKategoriItem2"
                          :options="lookup_pengawas.data"
                          :filterable="false"
                          @search="onGetKategoriItem2"
                          v-model="form.kategori_id_2"
                          class="w-full bg-white"
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
                    </ValidationProvider>
                    <ValidationProvider name="kategori_id_3" class="w-full">
                      <div>
                        <label for="kategori_id_3">Kategori Item Level 3</label>
                        <v-select
                          label="nama_kategori_item"
                          :loading="isLoadingGetKategoriItem3"
                          :options="lookup_proces.data"
                          :filterable="false"
                          @search="onGetKategoriItem3"
                          v-model="form.kategori_id_3"
                          class="w-full bg-white"
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
                                lookup_proces.last_page >
                                lookup_proces.current_page
                              "
                              @click="onGetKategoriItem3(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <ValidationProvider name="kategori_id_4" class="w-full">
                      <div>
                        <label for="kategori_id_4">Kategori Item Level 4</label>
                        <v-select
                          label="nama_kategori_item"
                          :loading="isLoadingGetKategoriItem4"
                          :options="lookup_parents.data"
                          :filterable="false"
                          @search="onGetKategoriItem4"
                          v-model="form.kategori_id_4"
                          class="w-full bg-white"
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
                    </ValidationProvider>
                    <ValidationProvider name="kategori_id_5" class="w-full">
                      <div>
                        <label for="kategori_id_5">Kategori Item Level 5</label>
                        <v-select
                          label="nama_kategori_item"
                          :loading="isLoadingGetKategoriItem5"
                          :options="lookup_sellings.data"
                          :filterable="false"
                          @search="onGetKategoriItem5"
                          v-model="form.kategori_id_5"
                          class="w-full bg-white"
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
                    </ValidationProvider>
                  </div>

                  <ValidationProvider
                    name="supplier_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="supplier_id"
                        >Supplier<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_supplier"
                        :loading="isLoadingGetVendor"
                        :options="lookup_operator.data"
                        :filterable="false"
                        @search="onGetVendor"
                        v-model="form.supplier_id"
                        class="w-full bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <!-- <template #search="{ attributes, events }">
                          <input
                            class="w-full outline-none active:outline-none"
                            :required="!form.vendor_id"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template> -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_operator.data.length || search"
                        >
                          <span
                            v-if="lookup_operator.current_page > 1"
                            @click="onGetVendor(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_operator.last_page >
                              lookup_operator.current_page
                            "
                            @click="onGetVendor(search, true)"
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
                    <label for="batas_bawah"
                      >Batas Bawah <span class="text-danger">*</span></label
                    >
                    <money
                      v-model="form.batas_bawah"
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>

                  <div class="form-group">
                    <label for="batas_atas"
                      >Batas Atas <span class="text-danger">*</span></label
                    >
                    <money
                      v-model="form.batas_atas"
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                    />
                  </div>

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
              <!-- <div
                class="p-4 w-full md:w-4/12 bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <h1 class="text-xl font-bold">Pengemudi</h1>
                <div class="w-full flex gap-2">
                  <button
                    @click="onFormShow"
                    class="bg-[#21b94f] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Pengemudi Baru</p>
                  </button>
                  <button
                    :disabled="
                      form.status_driver == '' ||
                      (form.status_driver == 'dedicated' &&
                        form.pengemudi_kendaraan.length >= 1)
                    "
                    @click="addPengemudiKendaraan"
                    class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Daftar Pengemudi</p>
                  </button>
                </div>
                <div class="table-responsive">
                  <table
                    class="table mt-5 h-full"
                    v-if="form.pengemudi_kendaraan.length > 0"
                  >
                    <thead>
                      <tr>
                        <th>Pengemudi</th>
                        <th class="w-[30%] px-1">Status</th>
                        <th class="w-[15%]">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in form.pengemudi_kendaraan"
                        :key="index"
                        style="border-top: 0.5px solid lightgray"
                      >
                        <td>
                          <v-select
                            label="nama_pengemudi"
                            :loading="isLoadingGetDriver"
                            :options="lookup_suppliers.data"
                            :filterable="false"
                            @search="onGetDriver"
                            v-model="item.pengemudi_id"
                            :reduce="(item) => item.pengemudi_id"
                            class="w-full"
                          >
                            <li
                              slot-scope="{ search }"
                              slot="list-footer"
                              class="p-1 border-t flex justify-between"
                              v-if="lookup_suppliers.data.length || search"
                            >
                              <span
                                v-if="lookup_suppliers.current_page > 1"
                                @click="onGetDriver(search, false)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Sebelumnya</span
                              >
                              <span
                                v-if="
                                  lookup_suppliers.last_page >
                                  lookup_suppliers.current_page
                                "
                                @click="onGetDriver(search, true)"
                                class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                                >Selanjutnya</span
                              >
                            </li>
                          </v-select>
                        </td>
                        <td>
                          <select
                            class="w-full pl-2 py-1 border rounded focus:outline-none"
                            name="status_normal"
                            id="status_normal"
                            v-model="item.status"
                          >
                            <option value="">Pilih</option>
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                          </select>
                        </td>
                        <td class="text-center text-gray-600">
                          <i
                            class="fas fa-trash"
                            style="cursor: pointer"
                            @click="onDeleteItem(index)"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> -->
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <!-- <ModalForm ref="formInput" :self="this" /> -->
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
// import ModalForm from "./form.vue";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Item Master",
    };
  },

  // components: {
  //   ModalForm,
  // },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

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

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearchStandarJenis: false,
      isLoadingGetStandarJenis: false,
      standar_jenis_search: "",

      isStopSearchDriver: false,
      isLoadingGetDriver: false,
      driver_search: "",

      title: "Item Produk Master",

      url: "master/item",
      form: {
        item_id: "",
        kode_wms: "",
        nama_item: "",
        kode_alternatif: "",
        kode_alternatif_2: "",
        satuan_id: "",
        satuan_id_berat: "",
        berat_bersih: "",
        berat_kotor: "",
        satuan_id_volume: "",
        volume: "",
        satuan_id_stocklevel: "",
        value_stocklevel: "",
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
        batas_atas: "",
        batas_bawah: "",
        jumlah_palet: "",
        kapasitas_palet: "",
        kebutuhan_palet: "",
        maksimal_tumpukan: "",
        supplier_id: "",
        keterangan: "",
      },

      default_form: {
        item_id: "",
        kode_wms: "",
        nama_item: "",
        kode_alternatif: "",
        kode_alternatif_2: "",
        satuan_id: "",
        satuan_id_berat: "",
        berat_bersih: "",
        berat_kotor: "",
        satuan_id_volume: "",
        volume: "",
        satuan_id_stocklevel: "",
        value_stocklevel: "",
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
        batas_atas: "",
        batas_bawah: "",
        jumlah_palet: "",
        kapasitas_palet: "",
        kebutuhan_palet: "",
        maksimal_tumpukan: "",
        supplier_id: "",
        keterangan: "",
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("master/item/" + this.id);

        Object.keys(this.form).forEach((item) => {
          this.form[item] = response.data[item];
        });

        this.form.kategori_id_1 = response.data.kategori_1 ?? "";
        this.form.kategori_id_2 = response.data.kategori_2 ?? "";
        this.form.kategori_id_3 = response.data.kategori_3 ?? "";
        this.form.kategori_id_4 = response.data.kategori_4 ?? "";
        this.form.kategori_id_5 = response.data.kategori_5 ?? "";
        this.form.group_item_id_1 = response.data.group_item_1 ?? "";
        this.form.group_item_id_2 = response.data.group_item_2 ?? "";
        this.form.group_item_id_3 = response.data.group_item_3 ?? "";
        this.form.group_item_id_4 = response.data.group_item_4 ?? "";
        this.form.group_item_id_5 = response.data.group_item_5 ?? "";
        this.form.berat_bersih = response.data.berat_bersih ?? "";
        this.form.berat_kotor = response.data.berat_kotor ?? "";
        this.form.volume = response.data.volume ?? "";
        this.form.value_stocklevel = response.data.value_stocklevel ?? "";
        this.form.batas_atas = response.data.batas_atas ?? "";
        this.form.batas_bawah = response.data.batas_bawah ?? "";
        this.form.jumlah_palet = response.data.jumlah_palet ?? "";
        this.form.kapasitas_palet = response.data.kapasitas_palet ?? "";
        this.form.kebutuhan_palet = response.data.kebutuhan_palet ?? "";
        this.form.maksimal_tumpukan = response.data.maksimal_tumpukan ?? "";
        this.form.satuan_id = response.data.satuan ?? "";
        this.form.satuan_id_berat = response.data.satuan_berat ?? "";
        this.form.satuan_id_volume = response.data.satuan_volume ?? "";
        this.form.satuan_id_stocklevel = response.data.satuan_stocklevel ?? "";
        this.form.supplier_id = response.data.supplier ?? "";

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/master/item-produk-master");
    }
  },

  async mounted() {
    await this.onSearchSatuanBerat();
    await this.onSearchSatuanVolume();
    await this.onSearchSatuan();
    await this.onSearchSatuanStocklevel();
    await this.onSearchGroupItem1();
    // await this.onSearchGroupItem2();
    // await this.onSearchGroupItem3();
    // await this.onSearchGroupItem4();
    // await this.onSearchGroupItem5();
    await this.onSearchKategoriItem1();
    await this.onSearchKategoriItem2();
    await this.onSearchKategoriItem3();
    await this.onSearchKategoriItem4();
    await this.onSearchKategoriItem5();
    await this.onSearchVendor();
    // await this.onSearchStandarJenis();
    // await this.onSearchDriver();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_warehouses",
      "lookup_operator",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_suppliers",
      "lookup_resellers",
      "lookup_regus",

      "lookup_grade",
      "lookup_beam",
      "lookup_packing",
      "lookup_defects",
      "lookup_department",

      "lookup_mesin",
      "lookup_pengawas",
      "lookup_proces",
      "lookup_parents",
      "lookup_sellings",
    ]),

    calcStocklevel() {
      if (!this.form.kebutuhan_palet || !this.form.kapasitas_palet) return 0;
      this.form.value_stocklevel =
        this.form.kebutuhan_palet / this.form.kapasitas_palet;
      return this.form.value_stocklevel;
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    onGetSatuan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuan);

      this.isStopSearchSatuan = setTimeout(() => {
        this.satuan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchSatuan();
      }, 600);
    },

    async onSearchSatuan() {
      if (!this.isLoadingGetSatuan) {
        this.isLoadingGetSatuan = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "custom1",
          query:
            "?search=" +
            this.satuan_search +
            "&page=" +
            this.lookup_custom1.current_page +
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
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }

        this.onSearchSatuanVolume();
      }, 600);
    },

    async onSearchSatuanVolume() {
      if (!this.isLoadingGetSatuanVolume) {
        this.isLoadingGetSatuanVolume = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "regus",
          query:
            "?search=" +
            this.satuan_volume_search +
            "&jenis_satuan=V" +
            "&page=" +
            this.lookup_regus.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuanVolume = false;
      }
    },

    //group item
    onGetGroupItem1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem1);

      this.isStopSearchGroupItem1 = setTimeout(() => {
        this.group_item_1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchGroupItem1();
      }, 600);
    },

    async onSearchGroupItem1() {
      if (!this.isLoadingGetGroupItem1) {
        this.isLoadingGetGroupItem1 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "grade",
          query:
            "?search=" +
            this.group_item_1_search +
            "&status=1" +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem1 = false;
      }
    },

    async onSelectGroup1(item) {
      if (item) {
        this.form.group_item_id_1 = item;
        await this.onSearchGroupItem2();
      } else {
        this.form.group_item_id_1 = "";
      }
    },

    onGetGroupItem2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem2);

      this.isStopSearchGroupItem2 = setTimeout(() => {
        this.group_item_2_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchGroupItem2();
      }, 600);
    },

    async onSearchGroupItem2() {
      if (!this.isLoadingGetGroupItem2) {
        this.isLoadingGetGroupItem2 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "beam",
          query:
            "?search=" +
            this.group_item_2_search +
            "&status=2" +
            "&group_item_id_induk=" +
            this.form.group_item_id_1.group_item_id +
            "&page=" +
            this.lookup_beam.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem2 = false;
      }
    },

    async onSelectGroup2(item) {
      if (item) {
        this.form.group_item_id_2 = item;
        await this.onSearchGroupItem3();
      } else {
        this.form.group_item_id_2 = "";
      }
    },

    onGetGroupItem3(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem3);

      this.isStopSearchGroupItem3 = setTimeout(() => {
        this.group_item_3_search = search;

        if (typeof isNext !== "function") {
          this.lookup_packing.current_page = isNext
            ? this.lookup_packing.current_page + 1
            : this.lookup_packing.current_page - 1;
        } else {
          this.lookup_packing.current_page = 1;
        }

        this.onSearchGroupItem3();
      }, 600);
    },

    async onSearchGroupItem3() {
      if (!this.isLoadingGetGroupItem3) {
        this.isLoadingGetGroupItem3 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "packing",
          query:
            "?search=" +
            this.group_item_3_search +
            "&status=3" +
            "&group_item_id_induk=" +
            this.form.group_item_id_2.group_item_id +
            "&page=" +
            this.lookup_packing.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem3 = false;
      }
    },

    async onSelectGroup3(item) {
      if (item) {
        this.form.group_item_id_3 = item;
        await this.onSearchGroupItem4();
      } else {
        this.form.group_item_id_3 = "";
      }
    },

    onGetGroupItem4(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem4);

      this.isStopSearchGroupItem4 = setTimeout(() => {
        this.group_item_4_search = search;

        if (typeof isNext !== "function") {
          this.lookup_defects.current_page = isNext
            ? this.lookup_defects.current_page + 1
            : this.lookup_defects.current_page - 1;
        } else {
          this.lookup_defects.current_page = 1;
        }

        this.onSearchGroupItem4();
      }, 600);
    },

    async onSearchGroupItem4() {
      if (!this.isLoadingGetGroupItem4) {
        this.isLoadingGetGroupItem4 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "defects",
          query:
            "?search=" +
            this.group_item_4_search +
            "&status=4" +
            "&group_item_id_induk=" +
            this.form.group_item_id_3.group_item_id +
            "&page=" +
            this.lookup_defects.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem4 = false;
      }
    },

    async onSelectGroup4(item) {
      if (item) {
        this.form.group_item_id_4 = item;
        await this.onSearchGroupItem5();
      } else {
        this.form.group_item_id_4 = "";
      }
    },

    onGetGroupItem5(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem5);

      this.isStopSearchGroupItem5 = setTimeout(() => {
        this.group_item_5_search = search;

        if (typeof isNext !== "function") {
          this.lookup_department.current_page = isNext
            ? this.lookup_department.current_page + 1
            : this.lookup_department.current_page - 1;
        } else {
          this.lookup_department.current_page = 1;
        }

        this.onSearchGroupItem5();
      }, 600);
    },

    async onSearchGroupItem5() {
      if (!this.isLoadingGetGroupItem5) {
        this.isLoadingGetGroupItem5 = true;

        await this.lookUp({
          url: "master/group-item/get-group-item",
          lookup: "department",
          query:
            "?search=" +
            this.group_item_5_search +
            "&status=5" +
            "&group_item_id_induk=" +
            this.form.group_item_id_4.group_item_id +
            "&page=" +
            this.lookup_department.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem5 = false;
      }
    },

    onSelectGroup5(item) {
      if (item) {
        this.form.group_item_id_5 = item;
      } else {
        this.form.group_item_id_5 = "";
      }
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
          lookup: "units",
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

    //vendor
    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_operator.current_page = isNext
            ? this.lookup_operator.current_page + 1
            : this.lookup_operator.current_page - 1;
        } else {
          this.lookup_operator.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/supplier/get-supplier",
          lookup: "operator",
          query:
            "?search=" +
            this.vendor_search +
            "&page=" +
            this.lookup_operator.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
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

    //vendor
    onGetStandarJenis(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchStandarJenis);

      this.isStopSearchStandarJenis = setTimeout(() => {
        this.standar_jenis_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchStandarJenis();
      }, 600);
    },

    async onSearchStandarJenis() {
      if (!this.isLoadingGetStandarJenis) {
        this.isLoadingGetStandarJenis = true;

        await this.lookUp({
          url: "master/standar-jenis-kendaraan/get-standar-jenis-kendaraan",
          lookup: "custom2",
          query:
            "?search=" +
            this.standar_jenis_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetStandarJenis = false;
      }
    },

    //driver
    onGetDriver(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchDriver);

      this.isStopSearchDriver = setTimeout(() => {
        this.driver_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchDriver();
      }, 600);
    },

    async onSearchDriver() {
      if (!this.isLoadingGetDriver) {
        this.isLoadingGetDriver = true;

        await this.lookUp({
          url: "master/pengemudi/get-pengemudi",
          lookup: "custom2",
          query:
            "?search=" +
            this.driver_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDriver = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "master/item";

      let formData = {
        ...this.form,
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
        supplier_id:
          typeof this.form.supplier_id === "object"
            ? this.form.supplier_id.supplier_id
            : this.form.supplier_id,
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
            "Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Item"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
            };
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

    formReset() {
      this.$refs.formValidate.reset();
      this.form = this.default_form;
    },
  },
};
</script>
