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
            @submit.prevent="validate().then(() => onsubmit(invalid))"
            autocomplete="off"
          >
            <div class="w-full md:flex gap-3">
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-top w-full"
                >
                  <div class="w-full">
                    <input-form
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
                        :reduce="(item) => item.satuan_id"
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
                    </div>
                  </ValidationProvider>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <input-form
                      label="Berat"
                      type="text"
                      name="berat"
                      :required="true"
                      v-model="form.berat"
                    />
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
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
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
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <input-form
                      label="Volume"
                      type="text"
                      name="volume"
                      :required="true"
                      v-model="form.volume"
                    />
                    <ValidationProvider
                      name="satuan_id_volume"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_volume"
                          >Satuan Volume<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <v-select
                          label="nama_satuan"
                          :loading="isLoadingGetSatuanVolume"
                          :options="lookup_regus.data"
                          :filterable="false"
                          @search="onGetSatuanVolume"
                          v-model="form.satuan_id_volume"
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
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
                                lookup_regus.last_page >
                                lookup_regus.current_page
                              "
                              @click="onGetSatuanVolume(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <input-form
                      label="Stocklevel"
                      type="text"
                      name="value_stocklevel"
                      :required="true"
                      v-model="form.value_stocklevel"
                    />
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
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
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
                      </div>
                    </ValidationProvider>
                  </div>

                  <ValidationProvider
                    name="vendor_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="group_item_id_1"
                        >Supplier<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_vendor"
                        :loading="isLoadingGetVendor"
                        :options="lookup_operator.data"
                        :filterable="false"
                        @search="onGetVendor"
                        v-model="form.vendor_id"
                        :reduce="(item) => item.vendor_id"
                        class="w-full"
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
                          :required="!form.vendor_id"
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
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="vendor_id"
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
                        label="nama_vendor"
                        :loading="isLoadingGetVendor"
                        :options="lookup_operator.data"
                        :filterable="false"
                        @search="onGetVendor"
                        v-model="form.vendor_id"
                        :reduce="(item) => item.vendor_id"
                        class="w-full"
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
                          :required="!form.vendor_id"
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
                    </div>
                  </ValidationProvider>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <ValidationProvider
                      name="satuan_id_stocklevel"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_stocklevel"
                          >Group Item Level 2<span class="text-danger"
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
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
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
                      </div>
                    </ValidationProvider>
                    <ValidationProvider
                      name="satuan_id_stocklevel"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_stocklevel"
                          >Group Item Level 3<span class="text-danger"
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
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
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
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <ValidationProvider
                      name="satuan_id_stocklevel"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_stocklevel"
                          >Group Item Level 4<span class="text-danger"
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
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
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
                      </div>
                    </ValidationProvider>
                    <ValidationProvider
                      name="satuan_id_stocklevel"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_stocklevel"
                          >Group Item Level 5<span class="text-danger"
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
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
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
                      </div>
                    </ValidationProvider>
                  </div>

                  <ValidationProvider
                    name="vendor_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="group_item_id_1"
                        >Kategori Item Level 1<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <v-select
                        label="nama_vendor"
                        :loading="isLoadingGetVendor"
                        :options="lookup_operator.data"
                        :filterable="false"
                        @search="onGetVendor"
                        v-model="form.vendor_id"
                        :reduce="(item) => item.vendor_id"
                        class="w-full"
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
                          :required="!form.vendor_id"
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
                    </div>
                  </ValidationProvider>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <ValidationProvider
                      name="satuan_id_stocklevel"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_stocklevel"
                          >Kategori Item Level 2<span class="text-danger"
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
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
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
                      </div>
                    </ValidationProvider>
                    <ValidationProvider
                      name="satuan_id_stocklevel"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_stocklevel"
                          >Kategori Item Level 3<span class="text-danger"
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
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
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
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="grid grid-flow-col grid-cols-2 gap-2">
                    <ValidationProvider
                      name="satuan_id_stocklevel"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_stocklevel"
                          >Kategori Item Level 4<span class="text-danger"
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
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
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
                      </div>
                    </ValidationProvider>
                    <ValidationProvider
                      name="satuan_id_stocklevel"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_stocklevel"
                          >Kategori Item Level 5<span class="text-danger"
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
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
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
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="form-group">
                    <input-form
                      label="Batas Atas"
                      type="text"
                      name="batas_atas"
                      :required="true"
                      v-model="form.batas_atas"
                    />
                  </div>

                  <div class="form-group">
                    <input-form
                      label="Batas Bawah"
                      type="text"
                      name="batas_bawah"
                      :required="true"
                      v-model="form.batas_bawah"
                    />
                  </div>

                  <div class="form-group">
                    <input-form
                      label="Jumlah Palet"
                      type="text"
                      name="jumlah_palet"
                      :required="true"
                      v-model="form.jumlah_palet"
                    />
                  </div>

                  <div class="form-group">
                    <input-form
                      label="kapasitas Palet"
                      type="text"
                      name="kapasitas_palet"
                      :required="true"
                      v-model="form.kapasitas_palet"
                    />
                  </div>

                  <div class="form-group">
                    <input-form
                      label="Kebutuhan Palet"
                      type="text"
                      name="kebutuhan_palet"
                      :required="true"
                      v-model="form.kebutuhan_palet"
                    />
                  </div>

                  <div class="form-group">
                    <input-form
                      label="Maksimal Tumpukan"
                      type="text"
                      name="maksimal_tumpukan"
                      :required="true"
                      v-model="form.maksimal_tumpukan"
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

      isStopSearchStandarJenis: false,
      isLoadingGetStandarJenis: false,
      standar_jenis_search: "",

      isStopSearchDriver: false,
      isLoadingGetDriver: false,
      driver_search: "",

      title: "Item Produk Master",

      url: "master/kendaraan",
      form: {
        kendaraan_id: "",
        satuan_id: "",
        satuan_id_berat: "",
        berat: "",
        satuan_id_volume: "",
        volume: "",
        satuan_id_stocklevel: "",
        value_stocklevel: "",
        vendor_id: "",
        vendor_id_operator: "",
        standar_satuan_id: "",
        nama_kendaraan: "",
        keterangan_pindah_gudang: "",
        plat_nomor: "",
        cc: "",
        nomor_mesin: "",
        tahun_buat: "",
        nomor_sasis: "",
        stnk: "",
        kir: "",
        status_digunakan: "",
        status_normal: "",
        status_driver: "",
        pengemudi_kendaraan: [],
      },

      default_form: {
        item_id: "",
        satuan_id: "",
        satuan_id_berat: "",
        vendor_id: "",
        vendor_id_operator: "",
        standar_satuan_id: "",
        nama_kendaraan: "",
        keterangan_pindah_gudang: "",
        plat_nomor: "",
        cc: "",
        nomor_mesin: "",
        tahun_buat: "",
        nomor_sasis: "",
        stnk: "",
        kir: "",
        status_digunakan: "",
        status_normal: "",
        pengemudi_kendaraan: [],
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("master/kendaraan/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "pengemudi_kendaraan") {
            this.form[item] = response.data[item];
          }
        });

        this.form.pengemudi_kendaraan = response.data.pengemudi_kendaraan.map(
          (item) => {
            return {
              ...item,
              pengemudi_kendaraan_id: item.pengemudi_kendaraan || null,
            };
          }
        );

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/master/kendaraan");
    }
  },

  async mounted() {
    await this.onSearchSatuanBerat();
    await this.onSearchSatuanVolume();
    await this.onSearchSatuan();
    await this.onSearchSatuanStocklevel();
    // await this.onSearchVendor();
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
    ]),
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
          url: "master/vendor/get-vendor",
          lookup: "operator",
          query:
            "?search=" +
            this.vendor_search +
            "&tipe_vendor=e" +
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
            "&jenis_satuan=Q" +
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

      if (!this.form.pengemudi_kendaraan.length) {
        this.$toaster.error("Pengemudi Kendaraan Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "master/kendaraan";

      let formData = {
        ...this.form,
      };

      formData.pengemudi_kendaraan = formData.pengemudi_kendaraan.map(
        (item) => {
          return {
            pengemudi_kendaraan_id:
              typeof item.pengemudi_kendaraan_id == "object"
                ? item.pengemudi_kendaraan_id.pengemudi_kendaraan_id
                : "",
          };
        }
      );

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
            "Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Kendaraan"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
              pengemudi_kendaraan: [],
            };
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

    onFormShow() {
      this.$refs.formInput.show();
    },

    addPengemudiKendaraan() {
      this.form.pengemudi_kendaraan.push({
        pengemudi_kendaraan_id: null,
        pengemudi_id: null,
        status: null,
      });
    },

    onChangeStatusDriver() {
      if (this.form.status_driver === "dedicated") {
        this.form.pengemudi_kendaraan = [];
      }
    },

    onDeleteItem(index) {
      this.form.pengemudi_kendaraan = this.form.pengemudi_kendaraan.filter(
        (_, itemIndex) => index != itemIndex
      );
    },

    formReset() {
      this.$refs.formValidate.reset();
      this.form = this.default_form;
      this.form.pengemudi_kendaraan = [];
    },
  },
};
</script>
