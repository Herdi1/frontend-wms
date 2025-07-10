<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Gudang
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
            enctype="multipart/form-data"
          >
            <!-- autocomplete="off" -->
            <div class="w-full gap-3">
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-top w-full"
                >
                  <ValidationProvider name="lokasi_id" class="w-full">
                    <div slot-scope="{ errors, valid }">
                      <label for="lokasi_id">Lokasi</label>
                      <v-select
                        label="nama_lokasi"
                        :loading="isLoadingGetLokasi"
                        :options="lookup_location.data"
                        :filterable="false"
                        @search="onGetLokasi"
                        v-model="form.lokasi_id"
                        class="w-full"
                        @input="onSelectLokasi"
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

                  <div class="w-full form-group">
                    <input-form
                      label="Kode Gudang SAP"
                      type="text"
                      name="kode_gudang_sap"
                      v-model="form.kode_gudang_sap"
                    />
                  </div>

                  <div class="w-full form-group">
                    <input-form
                      label="Kode Gudang"
                      type="text"
                      name="kode_gudang"
                      v-model="form.kode_gudang"
                    />
                  </div>

                  <div class="w-full form-group">
                    <input-form
                      label="Nama Gudang"
                      type="text"
                      name="nama_gudang"
                      :required="true"
                      v-model="form.nama_gudang"
                    />
                  </div>

                  <!-- <ValidationProvider
                    name="profit_cost_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="profit_cost_id"
                        >Profit Cost Center<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <v-select
                        :loading="isLoadingGetProfitCost"
                        :options="lookup_operator.data"
                        :filterable="false"
                        @search="onGetProfitCost"
                        v-model="form.profit_cost_id"
                        :reduce="(item) => item.profit_cost_id"
                        class="w-full"
                      >
                        <template slot="option" slot-scope="option">
                          {{
                            option.nama_wilayah +
                            " (" +
                            option.profit_center +
                            "-" +
                            option.cost_center +
                            ")"
                          }}
                        </template>
                        <template slot="selected-option" slot-scope="option">
                          {{
                            option.nama_wilayah +
                            " (" +
                            option.profit_center +
                            "-" +
                            option.cost_center +
                            ")"
                          }}
                        </template>
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_operator.data.length || search"
                        >
                          <span
                            v-if="lookup_operator.current_page > 1"
                            @click="onGetProfitCost(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_operator.last_page >
                              lookup_operator.current_page
                            "
                            @click="onGetProfitCost(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                      <div v-if="errors[0]" class="text-danger">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider> -->

                  <div class="grid grid-cols-2 w-full gap-2">
                    <ValidationProvider
                      name="profit_center_id"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="profit_center_id"
                          >Profit Center<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <v-select
                          label="kode_profit_center"
                          :loading="isLoadingGetProfit"
                          :options="lookup_custom4.data"
                          :filterable="false"
                          @search="onGetProfit"
                          v-model="form.profit_center_id"
                          :reduce="(item) => item.profit_center_id"
                          class="w-full"
                        >
                          <!-- <template slot="option" slot-scope="option">
                          {{
                            option.wilayah.nama_wilayah +
                            " -" +
                            option.profit_center +
                            "-" +
                            option.cost_center +
                            ")"
                          }}
                        </template>
                        <template slot="selected-option" slot-scope="option">
                          {{
                            option.nama_wilayah +
                            " (" +
                            option.profit_center +
                            "-" +
                            option.cost_center +
                            ")"
                          }}
                        </template> -->
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom4.data.length || search"
                          >
                            <span
                              v-if="lookup_custom4.current_page > 1"
                              @click="onGetProfit(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom4.last_page >
                                lookup_custom4.current_page
                              "
                              @click="onGetProfit(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                        <div v-if="errors[0]" class="text-danger">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider
                      name="cost_center_id"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="cost_center_id"
                          >Cost Center<span class="text-danger">*</span></label
                        >
                        <v-select
                          label="kode_cost_center"
                          :loading="isLoadingGetCost"
                          :options="lookup_custom5.data"
                          :filterable="false"
                          @search="onGetCost"
                          v-model="form.cost_center_id"
                          :reduce="(item) => item.cost_center_id"
                          class="w-full"
                        >
                          <!-- <template slot="option" slot-scope="option">
                          {{
                            option.wilayah.nama_wilayah +
                            " -" +
                            option.profit_center +
                            "-" +
                            option.cost_center +
                            ")"
                          }}
                        </template>
                        <template slot="selected-option" slot-scope="option">
                          {{
                            option.nama_wilayah +
                            " (" +
                            option.profit_center +
                            "-" +
                            option.cost_center +
                            ")"
                          }}
                        </template> -->
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom5.data.length || search"
                          >
                            <span
                              v-if="lookup_custom5.current_page > 1"
                              @click="onGetCost(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom5.last_page >
                                lookup_custom5.current_page
                              "
                              @click="onGetCost(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                        <div v-if="errors[0]" class="text-danger">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="w-full form-group">
                    <input-form
                      label="Nomor Rekening"
                      type="text"
                      name="nomor_rekening"
                      v-model="form.nomor_rekening"
                    />
                  </div>

                  <div class="w-full form-group">
                    <input-form
                      label="Atas Nama Rekening"
                      type="text"
                      name="atas_nama_rekening"
                      v-model="form.atas_nama_rekening"
                    />
                  </div>

                  <ValidationProvider
                    name="group_gudang_id_1"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="group_gudang_id_1"
                        >Group Gudang 1<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_group_gudang"
                        :loading="isLoadingGetGroupGudang1"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetGroupGudang1"
                        v-model="form.group_gudang_id_1"
                        :reduce="(item) => item.group_gudang_id"
                        class="w-full"
                        @input="onSelectGroup1"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom1.data.length || search"
                        >
                          <span
                            v-if="lookup_custom1.current_page > 1"
                            @click="onGetGroupGudang1(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetGroupGudang1(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                      <div v-if="errors[0]" class="text-danger">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <div class="grid grid-cols-2 w-full gap-2">
                    <ValidationProvider name="group_gudang_id_2" class="w-full">
                      <div slot-scope="{ errors, valid }">
                        <label for="group_gudang_id_2">Group Gudang 2</label>
                        <v-select
                          label="nama_group_gudang"
                          :loading="isLoadingGetGroupGudang2"
                          :options="lookup_custom2.data"
                          :filterable="false"
                          @search="onGetGroupGudang2"
                          v-model="form.group_gudang_id_2"
                          :reduce="(item) => item.group_gudang_id"
                          class="w-full"
                          @input="onSelectGroup2"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom2.data.length || search"
                          >
                            <span
                              v-if="lookup_custom2.current_page > 1"
                              @click="onGetGroupGudang2(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom2.last_page >
                                lookup_custom2.current_page
                              "
                              @click="onGetGroupGudang2(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider name="group_gudang_id_3" class="w-full">
                      <div slot-scope="{ errors, valid }">
                        <label for="group_gudang_id_3">Group Gudang 3</label>
                        <v-select
                          label="nama_group_gudang"
                          :loading="isLoadingGetGroupGudang3"
                          :options="lookup_custom3.data"
                          :filterable="false"
                          @search="onGetGroupGudang3"
                          v-model="form.group_gudang_id_3"
                          :reduce="(item) => item.group_gudang_id"
                          class="w-full"
                          @input="onSelectGroup3"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_custom3.data.length || search"
                          >
                            <span
                              v-if="lookup_custom3.current_page > 1"
                              @click="onGetGroupGudang3(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_custom3.last_page >
                                lookup_custom3.current_page
                              "
                              @click="onGetGroupGudang3(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="grid grid-cols-2 w-full gap-2">
                    <ValidationProvider name="group_gudang_id_4" class="w-full">
                      <div slot-scope="{ errors, valid }">
                        <label for="group_gudang_id_4">Group Gudang 4</label>
                        <v-select
                          label="nama_group_gudang"
                          :loading="isLoadingGetGroupGudang4"
                          :options="lookup_suppliers.data"
                          :filterable="false"
                          @search="onGetGroupGudang2"
                          v-model="form.group_gudang_id_4"
                          :reduce="(item) => item.group_gudang_id"
                          class="w-full"
                          @input="onSelectGroup4"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_suppliers.data.length || search"
                          >
                            <span
                              v-if="lookup_suppliers.current_page > 1"
                              @click="onGetGroupGudang4(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_suppliers.last_page >
                                lookup_suppliers.current_page
                              "
                              @click="onGetGroupGudang4(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider name="group_gudang_id_5" class="w-full">
                      <div slot-scope="{ errors, valid }">
                        <label for="group_gudang_id_5">Group Gudang 5</label>
                        <v-select
                          label="nama_group_gudang"
                          :loading="isLoadingGetGroupGudang5"
                          :options="lookup_resellers.data"
                          :filterable="false"
                          @search="onGetGroupGudang5"
                          v-model="form.group_gudang_id_5"
                          :reduce="(item) => item.group_gudang_id"
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
                              @click="onGetGroupGudang5(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_resellers.last_page >
                                lookup_resellers.current_page
                              "
                              @click="onGetGroupGudang5(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                      </div>
                    </ValidationProvider>
                  </div>

                  <ValidationProvider
                    name="vendor_id_pemilik"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="vendor_id_pemilik"
                        >Vendor Pemilik<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_vendor"
                        :loading="isLoadingGetVendorPemilik"
                        :options="lookup_defects.data"
                        :filterable="false"
                        @search="onGetVendorPemilik"
                        v-model="form.vendor_id_pemilik"
                        :reduce="(item) => item.vendor_id"
                        class="w-full"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_defects.data.length || search"
                        >
                          <span
                            v-if="lookup_defects.current_page > 1"
                            @click="onGetVendorPemilik(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_defects.last_page >
                              lookup_defects.current_page
                            "
                            @click="onGetVendorPemilik(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                      <div v-if="errors[0]" class="text-danger">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider name="vendor_id_operator" class="w-full">
                    <div slot-scope="{ errors, valid }">
                      <label for="vendor_id_operator">Vendor Operator</label>
                      <v-select
                        label="nama_vendor"
                        :loading="isLoadingGetVendorOperator"
                        :options="lookup_department.data"
                        :filterable="false"
                        @search="onGetVendorOperator"
                        v-model="form.vendor_id_operator"
                        :reduce="(item) => item.vendor_id"
                        class="w-full"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_department.data.length || search"
                        >
                          <span
                            v-if="lookup_department.current_page > 1"
                            @click="onGetVendorOperator(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_department.last_page >
                              lookup_department.current_page
                            "
                            @click="onGetVendorOperator(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>

                  <div class="w-full form-group">
                    <input-form
                      label="No Handphone"
                      type="text"
                      name="no_hp"
                      v-model="form.no_hp"
                    />
                  </div>

                  <div class="w-full form-group">
                    <input-form
                      label="No WhatsApp"
                      type="text"
                      name="no_wa"
                      v-model="form.no_wa"
                    />
                  </div>

                  <ValidationProvider
                    name="fungsi_gudang_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="fungsi_gudang_id"
                        >Fungsi Gudang<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_fungsi"
                        :loading="isLoadingGetFungsiGudang"
                        :options="lookup_mesin.data"
                        :filterable="false"
                        @search="onGetFungsiGudang"
                        v-model="form.fungsi_gudang_id"
                        :reduce="(item) => item.fungsi_gudang_id"
                        class="w-full"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_mesin.data.length || search"
                        >
                          <span
                            v-if="lookup_mesin.current_page > 1"
                            @click="onGetFungsiGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_mesin.last_page > lookup_mesin.current_page
                            "
                            @click="onGetFungsiGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                      <div v-if="errors[0]" class="text-danger">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="fisik_gudang_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="fisik_gudang_id"
                        >Fisik Gudang<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_fisik"
                        :loading="isLoadingGetFisikGudang"
                        :options="lookup_pengawas.data"
                        :filterable="false"
                        @search="onGetFisikGudang"
                        v-model="form.fisik_gudang_id"
                        :reduce="(item) => item.fisik_gudang_id"
                        class="w-full"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_pengawas.data.length || search"
                        >
                          <span
                            v-if="lookup_pengawas.current_page > 1"
                            @click="onGetFisikGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_pengawas.last_page >
                              lookup_pengawas.current_page
                            "
                            @click="onGetFisikGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                      <div v-if="errors[0]" class="text-danger">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="ukuran_gudang_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="ukuran_gudang_id"
                        >Ukuran Gudang<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_ukuran"
                        :loading="isLoadingGetUkuranGudang"
                        :options="lookup_parents.data"
                        :filterable="false"
                        @search="onGetUkuranGudang"
                        v-model="form.ukuran_gudang_id"
                        :reduce="(item) => item.ukuran_gudang_id"
                        class="w-full"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_parents.data.length || search"
                        >
                          <span
                            v-if="lookup_parents.current_page > 1"
                            @click="onGetUkuranGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_parents.last_page >
                              lookup_parents.current_page
                            "
                            @click="onGetUkuranGudang(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                      <div v-if="errors[0]" class="text-danger">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <div class="grid grid-cols-2 gap-3">
                    <div class="form-group">
                      <label for="status_gudang"
                        >Status Gudang<span class="text-danger">*</span></label
                      >
                      <select
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        name="status_gudang"
                        id="status_gudang"
                        v-model="form.status_gudang"
                      >
                        <option value="">Pilih</option>
                        <option value="1">Aktif</option>
                        <option value="0">Non Akitf</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for="status_konfig_outbound_sap"
                        >Status Konfig<span class="text-danger">*</span></label
                      >
                      <select
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        name="status_konfig_outbound_sap"
                        id="status_konfig_outbound_sap"
                        v-model="form.status_konfig_outbound_sap"
                      >
                        <option value="">Pilih</option>
                        <option value="1">Aktif</option>
                        <option value="0">Non Akitf</option>
                      </select>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-2">
                    <div class="form-group">
                      <label for="status_sewa"
                        >Status Sewa<span class="text-danger">*</span></label
                      >
                      <select
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        name="status_sewa"
                        id="status_sewa"
                        v-model="form.status_sewa"
                      >
                        <option value="">Pilih</option>
                        <option value="1">Sendiri</option>
                        <option value="0">Sewa</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="status_satpam"
                        >Status Satpam<span class="text-danger">*</span></label
                      >
                      <select
                        class="w-full pl-2 py-1 border rounded focus:outline-none"
                        name="status_satpam"
                        id="status_satpam"
                        v-model="form.status_satpam"
                      >
                        <option value="">Pilih</option>
                        <option value="1">Memiliki Satpam</option>
                        <option value="0">Tidak Memiliki Satpam</option>
                      </select>
                    </div>
                  </div>

                  <div class="w-full form-group">
                    <input-form
                      label="Kapasitas"
                      type="text"
                      name="kapasitas"
                      v-model="form.kapasitas"
                    />
                  </div>

                  <div class="w-full form-group">
                    <input-form
                      label="Kapasitas Bongkar"
                      type="text"
                      name="kapasitas_bongkar"
                      v-model="form.kapasitas_bongkar"
                    />
                  </div>

                  <div class="grid grid-cols-2 gap-2 w-full">
                    <div class="w-full form-group">
                      <input-form
                        label="Luas Gudang"
                        type="text"
                        name="luas_gudang"
                        :required="true"
                        v-model="form.luas_gudang"
                      />
                    </div>
                    <ValidationProvider
                      name="satuan_id_luas"
                      rules="required"
                      class="w-full"
                    >
                      <div slot-scope="{ errors, valid }">
                        <label for="satuan_id_luas"
                          >Satuan Luas<span class="text-danger">*</span></label
                        >
                        <v-select
                          label="nama_satuan"
                          :loading="isLoadingGetSatuanLuas"
                          :options="lookup_proces.data"
                          :filterable="false"
                          @search="onGetSatuanLuas"
                          v-model="form.satuan_id_luas"
                          :reduce="(item) => item.satuan_id"
                          class="w-full"
                        >
                          <li
                            slot-scope="{ search }"
                            slot="list-footer"
                            class="p-1 border-t flex justify-between"
                            v-if="lookup_proces.data.length || search"
                          >
                            <span
                              v-if="lookup_proces.current_page > 1"
                              @click="onGetSatuanLuas(search, false)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Sebelumnya</span
                            >
                            <span
                              v-if="
                                lookup_proces.last_page >
                                lookup_proces.current_page
                              "
                              @click="onGetSatuanLuas(search, true)"
                              class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                              >Selanjutnya</span
                            >
                          </li>
                        </v-select>
                        <div v-if="errors[0]" class="text-danger">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="w-full form-group">
                    <input-form
                      label="Radius"
                      type="text"
                      name="radius"
                      :required="true"
                      v-model="form.radius"
                    />
                  </div>

                  <div class="form-group">
                    <label
                      for="file_layout"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >File Layout Gudang
                    </label>
                    <input
                      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="small_size"
                      type="file"
                      @change="handleFileChange"
                    />
                    <button
                      v-if="form.file_layout && isEditable"
                      class="p-1 my-1 rounded-md bg-blue-500 text-white hover:bg-blue-400"
                    >
                      File Saat Ini :
                      <span class="font-bold">{{ form.file_layout }}</span>
                    </button>
                  </div>
                </div>

                <div
                  class="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5"
                >
                  <div class="w-full form-group">
                    <input-form
                      label="Longitude"
                      type="text"
                      name="longitude"
                      :required="true"
                      v-model="form.longitude"
                    />
                  </div>
                  <div class="w-full form-group">
                    <input-form
                      label="Latitude"
                      type="text"
                      name="latitude"
                      :required="true"
                      v-model="form.latitude"
                    />
                  </div>

                  <ValidationProvider
                    name="negara_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="negara_id"
                        >Negara<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_negara"
                        :loading="isLoadingGetNegara"
                        :options="lookup_packing.data"
                        :filterable="false"
                        @search="onGetNegara"
                        v-model="form.negara_id"
                        :reduce="(item) => item.negara_id"
                        class="w-full"
                        @input="onSelectNegara"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_packing.data.length || search"
                        >
                          <span
                            v-if="lookup_packing.current_page > 1"
                            @click="onGetNegara(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_packing.last_page >
                              lookup_packing.current_page
                            "
                            @click="onGetNegara(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                      <div v-if="errors[0]" class="text-danger">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="provinsi_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="peovinsi_id"
                        >Provinsi<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_provinsi"
                        :loading="isLoadingGetProvinsi"
                        :options="lookup_beam.data"
                        :filterable="false"
                        @search="onGetProvinsi"
                        v-model="form.provinsi_id"
                        :reduce="(item) => item.provinsi_id"
                        class="w-full"
                        @input="onSelectProvinsi"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_beam.data.length || search"
                        >
                          <span
                            v-if="lookup_beam.current_page > 1"
                            @click="onGetProvinsi(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_beam.last_page > lookup_beam.current_page
                            "
                            @click="onGetProvinsi(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                      <div v-if="errors[0]" class="text-danger">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="kota_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="kota_id"
                        >Kota<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_kota"
                        :loading="isLoadingGetKota"
                        :options="lookup_grade.data"
                        :filterable="false"
                        @search="onGetKota"
                        v-model="form.kota_id"
                        :reduce="(item) => item.kota_id"
                        class="w-full"
                        @input="onSelectKota"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_grade.data.length || search"
                        >
                          <span
                            v-if="lookup_grade.current_page > 1"
                            @click="onGetKota(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_grade.last_page > lookup_grade.current_page
                            "
                            @click="onGetKota(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                      <div v-if="errors[0]" class="text-danger">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    name="kecamatan_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="kecamatan_id"
                        >Kecamatan<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_kecamatan"
                        :loading="isLoadingGetKecamatan"
                        :options="lookup_regus.data"
                        :filterable="false"
                        @search="onGetKecamatan"
                        v-model="form.kecamatan_id"
                        :reduce="(item) => item.kecamatan_id"
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
                            @click="onGetKecamatan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_regus.last_page > lookup_regus.current_page
                            "
                            @click="onGetKecamatan(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                      <div v-if="errors[0]" class="text-danger">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    name="kode_pos_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="kode_pos_id"
                        >Kode Pos<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_kode_pos"
                        :loading="isLoadingGetKodePos"
                        :options="lookup_users.data"
                        :filterable="false"
                        @search="onGetKodePos"
                        v-model="form.kode_pos_id"
                        :reduce="(item) => item.kode_pos_id"
                        class="w-full"
                      >
                        <template slot="option" slot-scope="option">
                          {{ option.nama_kode_pos + " " + option.kode_pos }}
                        </template>
                        <template slot="selected-option" slot-scope="option">
                          {{ option.nama_kode_pos + " " + option.kode_pos }}
                        </template>
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_users.data.length || search"
                        >
                          <span
                            v-if="lookup_users.current_page > 1"
                            @click="onGetKodePos(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_users.last_page > lookup_users.current_page
                            "
                            @click="onGetKodePos(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                      <div v-if="errors[0]" class="text-danger">
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider ref="inputProvider" name="wilayah_id">
                    <div class="form-group w-full items-center mb-5">
                      <label for="" class="w-4/12">Regional</label>
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_wilayah"
                        :loading="isLoadingGetWilayah"
                        :options="lookup_custom6.data"
                        :filterable="false"
                        @search="onGetWilayah"
                        :reduce="(item) => item.wilayah_id"
                        v-model="form.wilayah_id"
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom6.data.length || search"
                        >
                          <span
                            v-if="lookup_custom6.current_page > 1"
                            @click="onGetWilayah(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom6.last_page >
                              lookup_custom6.current_page
                            "
                            @click="onGetWilayah(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                  </ValidationProvider>

                  <div class="form-group md:col-span-2 lg:col-span-3">
                    <label>Alamat</label>
                    <textarea
                      name="alamat"
                      v-model="form.alamat"
                      class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div class="w-full mb-5">
                <!-- <div>
                  <ul class="flex gap-1">
                    <li
                      class="bg-white p-2 rounded-t-md border border-gray-300"
                    >
                      Item Gudang
                    </li>
                    <li
                      class="bg-white p-2 rounded-t-md border border-gray-300"
                    >
                      Status Transaksi
                    </li>
                    <li
                      class="bg-white p-2 rounded-t-md border border-gray-300"
                    >
                      Kendaraan Gudang
                    </li>
                  </ul>
                </div> -->
                <TabComponent :tabs="tabs">
                  <template #ItemGudang>
                    <ItemGudang :self="{ form, parameters, isEditable }" />
                  </template>
                  <template #StatusTransaksi>
                    <StatusTransaksi :self="{ form, isEditable }" />
                  </template>
                  <template #KendaraanGudang>
                    <p>Kendaraan Gudang</p>
                  </template>
                </TabComponent>
              </div>
              <modal-footer-section
                :isLoadingForm="isLoadingForm"
                @reset="formReset()"
              />
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
import ItemGudang from "./itemGudang.vue";
import StatusTransaksi from "./statusTransaksi.vue";
import TabComponent from "./tabComponent.vue";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Gudang",
    };
  },

  components: {
    ItemGudang,
    StatusTransaksi,
    TabComponent,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        { name: "ItemGudang" },
        { name: "StatusTransaksi" },
        { name: "KendaraanGudang" },
      ],

      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      title: "Gudang",

      url: "master/gudang",
      form: {
        gudang_id: "",
        lokasi_id: "",
        kode_gudang_sap: "",
        // profit_cost_id: "",
        profit_center_id: "",
        cost_center_id: "",
        kode_gudang: "",
        nama_gudang: "",
        status_konfig_outbound_sap: "",
        nomor_rekening: "",
        atas_nama_rekening: "",
        status_gudang: "",
        group_gudang_id_1: "",
        group_gudang_id_2: "",
        group_gudang_id_3: "",
        group_gudang_id_4: "",
        group_gudang_id_5: "",
        longitude: "",
        latitude: "",
        alamat: "",
        kecamatan_id: "",
        kota_id: "",
        provinsi_id: "",
        negara_id: "",
        kode_pos_id: "",
        wilayah_id: "",
        vendor_id_pemilik: "",
        vendor_id_operator: "",
        fungsi_gudang_id: "",
        no_hp: "",
        no_wa: "",
        kapasitas: 0,
        kapasitas_bongkar: 0,
        fisik_gudang_id: "",
        ukuran_gudang_id: "",
        file_layout: "",
        status_sewa: "",
        status_satpam: "",
        luas_gudang: "",
        satuan_id_luas: "",
        radius: "",
        item_gudang: [],
        status_transaksis: [],
      },

      default_form: {
        gudang_id: "",
        lokasi_id: "",
        kode_gudang_sap: "",
        // profit_cost_id: "",
        profit_center_id: "",
        cost_center_id: "",
        kode_gudang: "",
        nama_gudang: "",
        status_konfig_outbound_sap: "",
        nomor_rekening: "",
        atas_nama_rekening: "",
        status_gudang: "",
        group_gudang_id_1: "",
        group_gudang_id_2: "",
        group_gudang_id_3: "",
        group_gudang_id_4: "",
        group_gudang_id_5: "",
        longitude: "",
        latitude: "",
        alamat: "",
        kecamatan_id: "",
        kota_id: "",
        provinsi_id: "",
        negara_id: "",
        wilayah_id: "",
        vendor_id_pemilik: "",
        vendor_id_operator: "",
        fungsi_gudang_id: "",
        no_hp: "",
        no_wa: "",
        kapasitas: 0,
        kapasitas_bongkar: 0,
        fisik_gudang_id: "",
        ukuran_gudang_id: "",
        file_layout: "",
        status_sewa: "",
        status_satpam: "",
        luas_gudang: "",
        satuan_id_luas: "",
        radius: "",
        kode_pos_id: "",
        item_gudang: [],
        status_transaksis: [],
      },

      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",

      isStopSearchProfitCost: false,
      isLoadingGetProfitCost: false,
      profit_cost_search: "",

      isStopSearchGroupGudang1: false,
      isLoadingGetGroupGudang1: false,
      group_gudang_1_search: "",

      isStopSearchGroupGudang2: false,
      isLoadingGetGroupGudang2: false,
      group_gudang_2_search: "",

      isStopSearchGroupGudang3: false,
      isLoadingGetGroupGudang3: false,
      group_gudang_3_search: "",

      isStopSearchGroupGudang4: false,
      isLoadingGetGroupGudang4: false,
      group_gudang_4_search: "",

      isStopSearchGroupGudang5: false,
      isLoadingGetGroupGudang5: false,
      group_gudang_5_search: "",

      isStopSearchKecamatan: false,
      isLoadingGetKecamatan: false,
      kecamatan_search: "",

      isStopSearchKota: false,
      isLoadingGetKota: false,
      kota_search: "",

      isStopSearchProvinsi: false,
      isLoadingGetProvinsi: false,
      provinsi_search: "",

      isStopSearchNegara: false,
      isLoadingGetNegara: false,
      negara_search: "",

      isStopSearchVendorPemilik: false,
      isLoadingGetVendorPemilik: false,
      vendor_pemilik_search: "",

      isStopSearchVendorOperator: false,
      isLoadingGetVendorOperator: false,
      vendor_operator_search: "",

      isStopSearchFisikGudang: false,
      isLoadingGetFisikGudang: false,
      fisik_gudang_search: "",

      isStopSearchFungsiGudang: false,
      isLoadingGetFungsiGudang: false,
      fungsi_gudang_search: "",

      isStopSearchUkuranGudang: false,
      isLoadingGetUkuranGudang: false,
      ukuran_gudang_search: "",

      isStopSearchSatuanLuas: false,
      isLoadingGetSatuanLuas: false,
      satuan_luas_search: "",

      isStopSearchKodePos: false,
      isLoadingGetKodePos: false,
      kode_pos_search: "",

      isStopSearchProfit: false,
      isLoadingGetProfit: false,
      profit_search: "",

      isStopSearchCost: false,
      isLoadingGetCost: false,
      cost_search: "",

      isStopSearchWilayah: false,
      isLoadingGetWilayah: false,
      wilayah_search: "",

      //list item gudang
      isLoadingData: false,
      isPaginate: true,
      itemData: [],
      parameters: {
        url: "master/item-pelanggan",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "item_pelanggan_id",
          sort: "desc",
          all: "",
          per_page: 10,
          page: 1,
          group_item_id_1: "",
          group_item_id_2: "",
          group_item_id_3: "",
          group_item_id_4: "",
          group_item_id_5: "",
        },
      },

      filter_params: {
        group_item_id_1: "",
        group_item_id_2: "",
        group_item_id_3: "",
        group_item_id_4: "",
        group_item_id_5: "",
      },

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

      //checkbox
      checkboxs: [],
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("master/gudang/" + this.id);

        Object.keys(this.form).forEach((item) => {
          // if (item !== "item_gudang") {
          this.form[item] = response.data[item];
          // }
        });

        // response.data.item_gudangs.forEach((item) => {
        //   this.form.item_gudang.push(item);
        // });

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
    // this.set_data([]);
    // this.onLoad();
  },

  async mounted() {
    await this.onSearchLokasi();
    // await this.onSearchProfitCost();
    await this.onSearchGroupGudang1();
    await this.onSearchGroupGudang2();
    await this.onSearchGroupGudang3();
    await this.onSearchGroupGudang4();
    await this.onSearchGroupGudang5();
    await this.onSearchKecamatan();
    await this.onSearchKota();
    await this.onSearchProvinsi();
    await this.onSearchNegara();
    await this.onSearchVendorPemilik();
    await this.onSearchVendorOperator();
    await this.onSearchFungsiGudang();
    await this.onSearchFisikGudang();
    await this.onSearchUkuranGudang();
    await this.onSearchSatuanLuas();
    await this.onSearchKodePos();
    await this.onSearchCost();
    await this.onSearchProfit();
    await this.onSearchWilayah();
  },

  computed: {
    ...mapState("moduleApi", [
      "data",
      "error",
      "result",
      "lookup_location",
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
      "lookup_roles",
      "lookup_sellers",
      "lookup_quotations",
      "lookup_customers",
      "lookup_users",

      "lookup_custom4",
      "lookup_custom5",
      "lookup_custom6",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp", "getData"]),
    ...mapMutations("moduleApi", ["set_data"]),

    handleFileChange(e) {
      let file = e.target.files[0];
      this.form.file_layout = file;
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "master/gudang";

      this.form.luas_gudang = parseFloat(this.form.luas_gudang);
      this.form.radius = parseFloat(this.form.radius);

      let formData = new FormData();

      Object.entries(this.form).forEach(([key, value]) => {
        if (key !== "item_gudang") {
          if (key != "file_layout") {
            formData.append(key, value ?? "");
          }
        }
      });

      console.log("sampe sini", formData);

      this.form.item_gudang.forEach((item, index) => {
        if (item.item_gudang_id) {
          formData.append(
            `item_gudangs[${index}][item_gudang_id]`,
            item.item_gudang_id ?? ""
          );
        }
        formData.append(`item_gudangs[${index}][item_id]`, item.item_id ?? "");
        formData.append(
          `item_gudangs[${index}][vendor_id]`,
          item.vendor_id ?? ""
        );
        formData.append(
          `item_gudangs[${index}][berat_bersih]`,
          item.berat_bersih ?? ""
        );
        formData.append(
          `item_gudangs[${index}][berat_kotor]`,
          item.berat_kotor ?? ""
        );
        formData.append(`item_gudangs[${index}][panjang]`, item.panjang ?? "");
        formData.append(`item_gudangs[${index}][lebar]`, item.lebar ?? "");
        formData.append(`item_gudangs[${index}][tebal]`, item.tebal ?? "");
        formData.append(`item_gudangs[${index}][volume]`, item.volume ?? "");
        formData.append(`item_gudangs[${index}][warna]`, item.warna ?? "");
        formData.append(
          `item_gudangs[${index}][biaya_gaji_sopir]`,
          item.biaya_gaji_sopir ?? ""
        );
        formData.append(
          `item_gudangs[${index}][biaya_bongkartoko]`,
          item.biaya_bongkartoko ?? ""
        );
        formData.append(
          `item_gudangs[${index}][biaya_bongkar]`,
          item.biaya_bongkar ?? ""
        );
        formData.append(
          `item_gudangs[${index}][biaya_muat]`,
          item.biaya_muat ?? ""
        );
        formData.append(
          `item_gudangs[${index}][biaya_pok]`,
          item.biaya_pok ?? ""
        );
      });

      if (this.form.status_transaksis) {
        let statusTransaksi = this.form.status_transaksis.map(
          (item) => item.master_status_transaksi_id
        );
        formData.append("status_transaksis", statusTransaksi);
      }

      if (this.form.file_layout instanceof File) {
        formData.append("file_layout", this.form.file_layout);
      }

      if (this.isEditable) {
        url += "/" + this.id;
        formData.append("_method", "PUT");
      }

      this.$axios({
        url: url,
        method: "post",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Gudang"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.default_form,
            };
          }

          this.$router.push("/master/gudang");
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    //lokasi
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

    //profit cost
    onGetProfitCost(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProfitCost);

      this.isStopSearchProfitCost = setTimeout(() => {
        this.profit_cost_search = search;

        if (typeof isNext !== "function") {
          this.lookup_operator.current_page = isNext
            ? this.lookup_operator.current_page + 1
            : this.lookup_operator.current_page - 1;
        } else {
          this.lookup_operator.current_page = 1;
        }

        this.onSearchProfitCost();
      }, 600);
    },

    async onSearchProfitCost() {
      if (!this.isLoadingGetProfitCost) {
        this.isLoadingGetProfitCost = true;

        await this.lookUp({
          url: "master/profit-cost/get-profit-cost",
          lookup: "operator",
          query:
            "?search=" +
            this.profit_cost_search +
            "&page=" +
            this.lookup_operator.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProfitCost = false;
      }
    },

    //group gudang 1
    onGetGroupGudang1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupGudang1);

      this.isStopSearchGroupGudang1 = setTimeout(() => {
        this.group_gudang_1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchGroupGudang1();
      }, 600);
    },

    async onSearchGroupGudang1() {
      if (!this.isLoadingGetGroupGudang1) {
        this.isLoadingGetGroupGudang1 = true;

        await this.lookUp({
          url: "master/group-gudang/get-group-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.group_gudang_1_search +
            "&status=1" +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupGudang1 = false;
      }
    },
    //group gudang 2
    onGetGroupGudang2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupGudang2);

      this.isStopSearchGroupGudang2 = setTimeout(() => {
        this.group_gudang_2_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchGroupGudang2();
      }, 600);
    },

    async onSearchGroupGudang2() {
      if (!this.isLoadingGetGroupGudang2) {
        this.isLoadingGetGroupGudang2 = true;

        await this.lookUp({
          url: "master/group-gudang/get-group-gudang",
          lookup: "custom2",
          query:
            "?search=" +
            this.group_gudang_2_search +
            "&status=2" +
            "&group_gudang_id_induk=" +
            this.form.group_gudang_id_1 +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupGudang2 = false;
      }
    },
    //group gudang 3
    onGetGroupGudang3(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupGudang3);

      this.isStopSearchGroupGudang3 = setTimeout(() => {
        this.group_gudang_3_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchGroupGudang3();
      }, 600);
    },

    async onSearchGroupGudang3() {
      if (!this.isLoadingGetGroupGudang3) {
        this.isLoadingGetGroupGudang3 = true;

        await this.lookUp({
          url: "master/group-gudang/get-group-gudang",
          lookup: "custom3",
          query:
            "?search=" +
            this.group_gudang_3_search +
            "&status=3" +
            "&group_gudang_id_induk=" +
            this.form.group_gudang_id_2 +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupGudang3 = false;
      }
    },
    //group gudang 4
    onGetGroupGudang4(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupGudang4);

      this.isStopSearchGroupGudang4 = setTimeout(() => {
        this.group_gudang_4_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchGroupGudang4();
      }, 600);
    },

    async onSearchGroupGudang4() {
      if (!this.isLoadingGetGroupGudang4) {
        this.isLoadingGetGroupGudang4 = true;

        await this.lookUp({
          url: "master/group-gudang/get-group-gudang",
          lookup: "suppliers",
          query:
            "?search=" +
            this.group_gudang_4_search +
            "&status=4" +
            "&group_gudang_id_induk=" +
            this.form.group_gudang_id_3 +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupGudang4 = false;
      }
    },
    //group gudang 5
    onGetGroupGudang5(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupGudang5);

      this.isStopSearchGroupGudang5 = setTimeout(() => {
        this.group_gudang_5_search = search;

        if (typeof isNext !== "function") {
          this.lookup_resellers.current_page = isNext
            ? this.lookup_resellers.current_page + 1
            : this.lookup_resellers.current_page - 1;
        } else {
          this.lookup_resellers.current_page = 1;
        }

        this.onSearchGroupGudang5();
      }, 600);
    },

    async onSearchGroupGudang5() {
      if (!this.isLoadingGetGroupGudang5) {
        this.isLoadingGetGroupGudang5 = true;

        await this.lookUp({
          url: "master/group-gudang/get-group-gudang",
          lookup: "resellers",
          query:
            "?search=" +
            this.group_gudang_5_search +
            "&status=5" +
            "&group_gudang_id_induk=" +
            this.form.group_gudang_id_4 +
            "&page=" +
            this.lookup_resellers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupGudang5 = false;
      }
    },

    //kecamatan
    onGetKecamatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKecamatan);

      this.isStopSearchKecamatan = setTimeout(() => {
        this.kecamatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }

        this.onSearchKecamatan();
      }, 600);
    },

    async onSearchKecamatan() {
      if (!this.isLoadingGetKecamatan) {
        this.isLoadingGetKecamatan = true;

        await this.lookUp({
          url: "master/kecamatan/get-kecamatan",
          lookup: "regus",
          query:
            "?search=" +
            this.kecamatan_search +
            "&kota_id=" +
            this.form.kota_id +
            "&page=" +
            this.lookup_regus.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKecamatan = false;
      }
    },

    //kota
    onGetKota(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKota);

      this.isStopSearchKota = setTimeout(() => {
        this.kota_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchKota();
      }, 600);
    },

    async onSearchKota() {
      if (!this.isLoadingGetKota) {
        this.isLoadingGetKota = true;

        await this.lookUp({
          url: "master/kota/get-kota",
          lookup: "grade",
          query:
            "?search=" +
            this.kota_search +
            "&provinsi_id=" +
            this.form.provinsi_id +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKota = false;
      }
    },

    //provinsi
    onGetProvinsi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProvinsi);

      this.isStopSearchProvinsi = setTimeout(() => {
        this.provinsi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchProvinsi();
      }, 600);
    },

    async onSearchProvinsi() {
      if (!this.isLoadingGetProvinsi) {
        this.isLoadingGetProvinsi = true;

        await this.lookUp({
          url: "master/provinsi/get-provinsi",
          lookup: "beam",
          query:
            "?search=" +
            this.provinsi_search +
            "&negara_id=" +
            this.form.negara_id +
            "&page=" +
            this.lookup_beam.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProvinsi = false;
      }
    },

    //negara
    onGetNegara(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchNegara);

      this.isStopSearchNegara = setTimeout(() => {
        this.negara_search = search;

        if (typeof isNext !== "function") {
          this.lookup_packing.current_page = isNext
            ? this.lookup_packing.current_page + 1
            : this.lookup_packing.current_page - 1;
        } else {
          this.lookup_packing.current_page = 1;
        }

        this.onSearchNegara();
      }, 600);
    },

    async onSearchNegara() {
      if (!this.isLoadingGetNegara) {
        this.isLoadingGetNegara = true;

        await this.lookUp({
          url: "master/negara/get-negara",
          lookup: "packing",
          query:
            "?search=" +
            this.negara_search +
            "&page=" +
            this.lookup_packing.current_page +
            "&per_page=10",
        });

        this.isLoadingGetNegara = false;
      }
    },

    //vendor_pemilik
    onGetVendorPemilik(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendorPemilik);

      this.isStopSearchVendorPemilik = setTimeout(() => {
        this.vendor_pemilik_search = search;

        if (typeof isNext !== "function") {
          this.lookup_defects.current_page = isNext
            ? this.lookup_defects.current_page + 1
            : this.lookup_defects.current_page - 1;
        } else {
          this.lookup_defects.current_page = 1;
        }

        this.onSearchVendorPemilik();
      }, 600);
    },

    async onSearchVendorPemilik() {
      if (!this.isLoadingGetVendorPemilik) {
        this.isLoadingGetVendorPemilik = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "defects",
          query:
            "?search=" +
            this.vendor_pemilik_search +
            // "&tipe_vendor=v" +
            "&page=" +
            this.lookup_defects.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendorPemilik = false;
      }
    },

    //vendor_operator
    onGetVendorOperator(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendorOperator);

      this.isStopSearchVendorOperator = setTimeout(() => {
        this.vendor_operator_search = search;

        if (typeof isNext !== "function") {
          this.lookup_department.current_page = isNext
            ? this.lookup_department.current_page + 1
            : this.lookup_department.current_page - 1;
        } else {
          this.lookup_department.current_page = 1;
        }

        this.onSearchVendorOperator();
      }, 600);
    },

    async onSearchVendorOperator() {
      if (!this.isLoadingGetVendorOperator) {
        this.isLoadingGetVendorOperator = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "department",
          query:
            "?search=" +
            this.vendor_operator_search +
            "&tipe_vendor_id=1" +
            "&page=" +
            this.lookup_department.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendorOperator = false;
      }
    },

    //fungsi_gudang
    onGetFungsiGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchFungsiGudang);

      this.isStopSearchFungsiGudang = setTimeout(() => {
        this.fungsi_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_mesin.current_page = isNext
            ? this.lookup_mesin.current_page + 1
            : this.lookup_mesin.current_page - 1;
        } else {
          this.lookup_mesin.current_page = 1;
        }

        this.onSearchFungsiGudang();
      }, 600);
    },

    async onSearchFungsiGudang() {
      if (!this.isLoadingGetFungsiGudang) {
        this.isLoadingGetFungsiGudang = true;

        await this.lookUp({
          url: "master/fungsi-gudang/get-fungsi-gudang",
          lookup: "mesin",
          query:
            "?search=" +
            this.fungsi_gudang_search +
            "&page=" +
            this.lookup_mesin.current_page +
            "&per_page=10",
        });

        this.isLoadingGetFungsiGudang = false;
      }
    },

    //fisik_gudang
    onGetFisikGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchFisikGudang);

      this.isStopSearchFisikGudang = setTimeout(() => {
        this.fisik_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_pengawas.current_page = isNext
            ? this.lookup_pengawas.current_page + 1
            : this.lookup_pengawas.current_page - 1;
        } else {
          this.lookup_pengawas.current_page = 1;
        }

        this.onSearchFisikGudang();
      }, 600);
    },

    async onSearchFisikGudang() {
      if (!this.isLoadingGetFisikGudang) {
        this.isLoadingGetFisikGudang = true;

        await this.lookUp({
          url: "master/fisik-gudang/get-fisik-gudang",
          lookup: "pengawas",
          query:
            "?search=" +
            this.fisik_gudang_search +
            "&page=" +
            this.lookup_pengawas.current_page +
            "&per_page=10",
        });

        this.isLoadingGetFisikGudang = false;
      }
    },

    //ukuran_gudang
    onGetUkuranGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchUkuranGudang);

      this.isStopSearchUkuranGudang = setTimeout(() => {
        this.ukuran_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_parents.current_page = isNext
            ? this.lookup_parents.current_page + 1
            : this.lookup_parents.current_page - 1;
        } else {
          this.lookup_parents.current_page = 1;
        }

        this.onSearchUkuranGudang();
      }, 600);
    },

    async onSearchUkuranGudang() {
      if (!this.isLoadingGetUkuranGudang) {
        this.isLoadingGetUkuranGudang = true;

        await this.lookUp({
          url: "master/ukuran-gudang/get-ukuran-gudang",
          lookup: "parents",
          query:
            "?search=" +
            this.ukuran_gudang_search +
            "&page=" +
            this.lookup_parents.current_page +
            "&per_page=10",
        });

        this.isLoadingGetUkuranGudang = false;
      }
    },

    //satuan_luas
    onGetSatuanLuas(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuanLuas);

      this.isStopSearchSatuanLuas = setTimeout(() => {
        this.satuan_luas_search = search;

        if (typeof isNext !== "function") {
          this.lookup_proces.current_page = isNext
            ? this.lookup_proces.current_page + 1
            : this.lookup_proces.current_page - 1;
        } else {
          this.lookup_proces.current_page = 1;
        }

        this.onSearchSatuanLuas();
      }, 600);
    },

    async onSearchSatuanLuas() {
      if (!this.isLoadingGetSatuanLuas) {
        this.isLoadingGetSatuanLuas = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "proces",
          query:
            "?search=" +
            this.satuan_luas_search +
            "&jenis_satuan=V" +
            "&page=" +
            this.lookup_proces.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuanLuas = false;
      }
    },

    //kode pos
    onGetKodePos(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKodePos);

      this.isStopSearchKodePos = setTimeout(() => {
        this.kode_pos_search = search;

        if (typeof isNext !== "function") {
          this.lookup_users.current_page = isNext
            ? this.lookup_users.current_page + 1
            : this.lookup_users.current_page - 1;
        } else {
          this.lookup_users.current_page = 1;
        }

        this.onSearchKodePos();
      }, 600);
    },

    async onSearchKodePos() {
      if (!this.isLoadingGetKodePos) {
        this.isLoadingGetKodePos = true;

        await this.lookUp({
          url: "master/kode-pos/get-kode-pos",
          lookup: "users",
          query:
            "?search=" +
            this.kode_pos_search +
            "&page=" +
            this.lookup_users.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKodePos = false;
      }
    },

    //profit
    onGetProfit(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProfit);

      this.isStopSearchProfit = setTimeout(() => {
        this.profit_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchProfit();
      }, 600);
    },

    async onSearchProfit() {
      if (!this.isLoadingGetProfit) {
        this.isLoadingGetProfit = true;

        await this.lookUp({
          url: "master/profit-center/get-profit-center",
          lookup: "custom4",
          query:
            "?search=" +
            this.profit_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProfit = false;
      }
    },

    // cost
    onGetCost(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCost);

      this.isStopSearchCost = setTimeout(() => {
        this.cost_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchCost();
      }, 600);
    },

    async onSearchCost() {
      if (!this.isLoadingGetCost) {
        this.isLoadingGetCost = true;

        await this.lookUp({
          url: "master/cost-center/get-cost-center",
          lookup: "custom5",
          query:
            "?search=" +
            this.cost_search +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCost = false;
      }
    },

    onGetWilayah(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchWilayah);

      this.isStopSearchWilayah = setTimeout(() => {
        this.wilayah_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchWilayah();
      }, 600);
    },

    async onSearchWilayah() {
      if (!this.isLoadingGetWilayah) {
        this.isLoadingGetWilayah = true;

        await this.lookUp({
          url: "master/wilayah/get-wilayah",
          lookup: "custom6",
          query:
            "?search=" +
            this.wilayah_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetWilayah = false;
      }
    },

    onSelectGroup1() {
      this.form.group_gudang_id_2 = "";
      this.onSearchGroupGudang2();
    },
    onSelectGroup2() {
      this.form.group_gudang_id_3 = "";
      this.onSearchGroupGudang3();
    },
    onSelectGroup3() {
      this.form.group_gudang_id_4 = "";
      this.onSearchGroupGudang4();
    },
    onSelectGroup4() {
      this.form.group_gudang_id_5 = "";
      this.onSearchGroupGudang5();
    },

    onSelectNegara() {
      this.form.provinsi_id = "";
      this.form.kota_id = "";
      this.form.kecamatan_id = "";
      this.onSearchProvinsi();
    },
    onSelectProvinsi() {
      this.form.kota_id = "";
      this.form.kecamatan_id = "";
      this.onSearchKota();
    },
    onSelectKota() {
      this.kecamatan_id = "";
      this.onSearchKecamatan();
    },

    formReset() {
      this.$refs.formValidate.reset();
      this.form = this.default_form;
    },

    //this is for filter item pelanggan
    //alamak banyaknye
    //group item
    onGetGroupItem1(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupItem1);

      this.isStopSearchGroupItem1 = setTimeout(() => {
        this.group_item_1_search = search;

        if (typeof isNext !== "function") {
          this.lookup_sellings.current_page = isNext
            ? this.lookup_sellings.current_page + 1
            : this.lookup_sellings.current_page - 1;
        } else {
          this.lookup_sellings.current_page = 1;
        }

        this.onSearchGroupItem1();
      }, 600);
    },

    async onSearchGroupItem1() {
      if (!this.isLoadingGetGroupItem1) {
        this.isLoadingGetGroupItem1 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "sellings",
          query:
            "?search=" +
            this.group_item_1_search +
            "&status=1" +
            "&page=" +
            this.lookup_sellings.current_page +
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
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }

        this.onSearchGroupItem2();
      }, 600);
    },

    async onSearchGroupItem2() {
      if (!this.isLoadingGetGroupItem2) {
        this.isLoadingGetGroupItem2 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "roles",
          query:
            "?search=" +
            this.group_item_2_search +
            "&status=2" +
            "&page=" +
            this.lookup_roles.current_page +
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
          this.lookup_sellers.current_page = isNext
            ? this.lookup_sellers.current_page + 1
            : this.lookup_sellers.current_page - 1;
        } else {
          this.lookup_sellers.current_page = 1;
        }

        this.onSearchGroupItem3();
      }, 600);
    },

    async onSearchGroupItem3() {
      if (!this.isLoadingGetGroupItem3) {
        this.isLoadingGetGroupItem3 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "sellers",
          query:
            "?search=" +
            this.group_item_3_search +
            "&status=3" +
            "&page=" +
            this.lookup_sellers.current_page +
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
          this.lookup_quotations.current_page = isNext
            ? this.lookup_quotations.current_page + 1
            : this.lookup_quotations.current_page - 1;
        } else {
          this.lookup_quotations.current_page = 1;
        }

        this.onSearchGroupItem4();
      }, 600);
    },

    async onSearchGroupItem4() {
      if (!this.isLoadingGetGroupItem4) {
        this.isLoadingGetGroupItem4 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "customer_groups",
          query:
            "?search=" +
            this.group_item_4_search +
            "&status=4" +
            "&page=" +
            this.lookup_quotations.current_page +
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
          this.lookup_customers.current_page = isNext
            ? this.lookup_customers.current_page + 1
            : this.lookup_customers.current_page - 1;
        } else {
          this.lookup_customers.current_page = 1;
        }

        this.onSearchGroupItem5();
      }, 600);
    },

    async onSearchGroupItem5() {
      if (!this.isLoadingGetGroupItem5) {
        this.isLoadingGetGroupItem5 = true;

        await this.lookUp({
          url: "master/kategori-item/get-kategori-item",
          lookup: "customers",
          query:
            "?search=" +
            this.group_item_5_search +
            "&status=5" +
            "&page=" +
            this.lookup_customers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupItem5 = false;
      }
    },

    //onSelectLokasi
    onSelectLokasi(item) {
      if (item) {
        this.form.longitude = item.longitude;
        this.form.latitude = item.latitude;
        this.form.negara_id = item.negara_id;
        this.form.provinsi_id = item.provinsi_id;
        this.form.kota_id = item.kota_id;
        this.form.kecamatan_id = item.kecamatan_id;
        this.form.kode_pos_id = item.kode_pos_id;
      } else {
        this.form.longitude = "";
        this.form.latitude = "";
        this.form.negara_id = "";
        this.form.provinsi_id = "";
        this.form.kota_id = "";
        this.form.kecamatan_id = "";
        this.form.kode_pos_id = "";
      }
    },

    async onLoad(page = 1) {
      if (this.isLoadingData) return;

      this.isLoadingData = true;
      this.parameters.params.page = page;

      // this.parameters.form.checkboxs = [];
      // if (document.getElementById("checkAll")) {
      //   document.getElementById("checkAll").checked = false;
      // }

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      this.parameters.params.group_item_id_1 =
        this.filter_params.group_item_id_1;
      this.parameters.params.group_item_id_2 =
        this.filter_params.group_item_id_2;
      this.parameters.params.group_item_id_3 =
        this.filter_params.group_item_id_3;
      this.parameters.params.group_item_id_4 =
        this.filter_params.group_item_id_4;
      this.parameters.params.group_item_id_5 =
        this.filter_params.group_item_id_5;

      await this.getData(this.parameters);
      // console.log(await this.getData(this.parameters));

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

    inserCheckbox() {
      if (!this.form.item_gudang?.length) {
        this.form.item_gudang = [];
      }
      this.checkboxs.forEach((item) => {
        this.form.item_gudang.push(item);
      });
      console.log(this.form.item_gudang);
    },
  },
};
</script>
