<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Zona Gudang
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
                  class="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-top w-full mb-5"
                >
                  <ValidationProvider
                    name="gudang_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="gudang_id"
                        >Gudang<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_gudang"
                        :loading="isLoadingGetGudang"
                        :options="lookup_location.data"
                        :filterable="false"
                        @search="onGetGudang"
                        v-model="form.gudang_id"
                        :reduce="(item) => item.gudang_id"
                        class="w-full bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_location.data.length || search"
                        >
                          <span
                            v-if="lookup_location.current_page > 1"
                            @click="onGetGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_location.last_page >
                              lookup_location.current_page
                            "
                            @click="onGetGudang(search, true)"
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
                  <div class="w-full">
                    <input-form
                      label="Kode Zona Gudang"
                      type="text"
                      name="kode_zona_gudang"
                      :required="true"
                      v-model="form.kode_zona_gudang"
                    />
                  </div>
                  <div class="w-full">
                    <input-form
                      label="Nama Zona Gudang"
                      type="text"
                      name="nama_zona_gudang"
                      :required="true"
                      v-model="form.nama_zona_gudang"
                    />
                  </div>
                  <ValidationProvider
                    name="vendor_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="vendor_id"
                        >Vendor<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_vendor"
                        :loading="isLoadingGetVendorPemilik"
                        :options="lookup_defects.data"
                        :filterable="false"
                        @search="onGetVendorPemilik"
                        v-model="form.vendor_id"
                        :reduce="(item) => item.vendor_id"
                        class="w-full bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
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
                      <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
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
                        class="w-full bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
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
                      <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    name="pelanggan_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="pelanggan_id"
                        >Pelanggan<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_pelanggan"
                        :loading="isLoadingGetPelanggan"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetPelanggan"
                        v-model="form.pelanggan_id"
                        :reduce="(item) => item.pelanggan_id"
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
                            @click="onGetPelanggan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetPelanggan(search, true)"
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
                  <ValidationProvider
                    name="jenis_zona_gudang_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="jenis_zona_gudang_id"
                        >Jenis Zona Gudang<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <v-select
                        label="nama_jenis_zona_gudang"
                        :loading="isLoadingGetJenisZonaGudang"
                        :options="lookup_custom2.data"
                        :filterable="false"
                        @search="onGetJenisZonaGudang"
                        v-model="form.jenis_zona_gudang_id"
                        :reduce="(item) => item.jenis_zona_gudang_id"
                        class="w-full bg-white"
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
                            @click="onGetJenisZonaGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom2.last_page >
                              lookup_custom2.current_page
                            "
                            @click="onGetJenisZonaGudang(search, true)"
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
                  <ValidationProvider
                    name="satuan_id_stoklevel"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="satuan_id_stoklevel"
                        >Satuan Stocklevel<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <v-select
                        label="nama_satuan"
                        :loading="isLoadingGetSatuanStoklevel"
                        :options="lookup_custom3.data"
                        :filterable="false"
                        @search="onGetSatuanStoklevel"
                        v-model="form.satuan_id_stoklevel"
                        :reduce="(item) => item.satuan_id"
                        class="w-full bg-white"
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
                            @click="onGetSatuanStoklevel(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom3.last_page >
                              lookup_custom3.current_page
                            "
                            @click="onGetSatuanStoklevel(search, true)"
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
                  <ValidationProvider
                    name="satuan_id_suhu"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="satuan_id_suhu"
                        >Satuan Suhu<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_satuan"
                        :loading="isLoadingGetSatuanSuhu"
                        :options="lookup_suppliers.data"
                        :filterable="false"
                        @search="onGetSatuanSuhu"
                        v-model="form.satuan_id_suhu"
                        :reduce="(item) => item.satuan_id"
                        class="w-full bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_suppliers.data.length || search"
                        >
                          <span
                            v-if="lookup_suppliers.current_page > 1"
                            @click="onGetSatuanSuhu(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_suppliers.last_page >
                              lookup_suppliers.current_page
                            "
                            @click="onGetSatuanSuhu(search, true)"
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
                    <label for="status_zona"
                      >Status Zona<span class="text-danger">*</span></label
                    >
                    <select
                      class="w-full pl-2 py-1 border bg-white rounded focus:outline-none"
                      name="status_zona"
                      id="status_zona"
                      v-model="form.status_zona"
                    >
                      <option value="">Pilih</option>
                      <option value="f ">Fisik</option>
                      <option value="v ">Virtual</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="allow_overstock"
                      >Allow Overstock<span class="text-danger">*</span></label
                    >
                    <select
                      class="w-full pl-2 py-1 border bg-white rounded focus:outline-none"
                      name="allow_overstock"
                      id="allow_overstock"
                      v-model="form.allow_overstock"
                    >
                      <option value="">Pilih</option>
                      <option value="1">Ijinkan</option>
                      <option value="0">Tidak Diijinkan</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="status_zona_aktif"
                      >Status Zona Aktif<span class="text-danger"
                        >*</span
                      ></label
                    >
                    <select
                      class="w-full pl-2 py-1 border bg-white rounded focus:outline-none"
                      name="status_zona_aktif"
                      id="status_zona_aktif"
                      v-model="form.status_zona_aktif"
                    >
                      <option value="">Pilih</option>
                      <option value="1">Aktif</option>
                      <option value="0">Non Aktif</option>
                    </select>
                  </div>

                  <ValidationProvider
                    name="metode_pengambilan_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="metode_pengambilan_id"
                        >Metode Pengambilan<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <v-select
                        label="nama_metode"
                        :loading="isLoadingGetMetodePengambilan"
                        :options="lookup_resellers.data"
                        :filterable="false"
                        @search="onGetMetodePengambilan"
                        v-model="form.metode_pengambilan_id"
                        :reduce="(item) => item.metode_pengambilan_id"
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
                            @click="onGetMetodePengambilan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_resellers.last_page >
                              lookup_resellers.current_page
                            "
                            @click="onGetMetodePengambilan(search, true)"
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

                  <ValidationProvider
                    name="fungsi_zona_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="fungsi_zona_id"
                        >Fungsi Zona<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_fungsi_zona"
                        :loading="isLoadingGetFungsiZona"
                        :options="lookup_regus.data"
                        :filterable="false"
                        @search="onGetFungsiZona"
                        v-model="form.fungsi_zona_id"
                        :reduce="(item) => item.fungsi_zona_id"
                        class="w-full bg-white"
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
                            @click="onGetFungsiZona(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_regus.last_page > lookup_regus.current_page
                            "
                            @click="onGetFungsiZona(search, true)"
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

                  <ValidationProvider
                    name="group_zona_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="group_zona_id"
                        >Group Zona<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_group_zona"
                        :loading="isLoadingGetGroupZona"
                        :options="lookup_grade.data"
                        :filterable="false"
                        @search="onGetGroupZona"
                        v-model="form.group_zona_id"
                        :reduce="(item) => item.group_zona_id"
                        class="w-full bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_grade.data.length || search"
                        >
                          <span
                            v-if="lookup_grade.current_page > 1"
                            @click="onGetGroupZona(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_grade.last_page > lookup_grade.current_page
                            "
                            @click="onGetGroupZona(search, true)"
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

                  <ValidationProvider
                    name="metode_penyimpanan_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="metode_penyimpanan_id"
                        >Metode Penyimpanan<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <v-select
                        label="nama_metode_penyimpanan"
                        :loading="isLoadingGetMetodePenyimpanan"
                        :options="lookup_beam.data"
                        :filterable="false"
                        @search="onGetMetodePenyimpanan"
                        v-model="form.metode_penyimpanan_id"
                        :reduce="(item) => item.metode_penyimpanan_id"
                        class="w-full bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_beam.data.length || search"
                        >
                          <span
                            v-if="lookup_beam.current_page > 1"
                            @click="onGetMetodePenyimpanan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_beam.last_page > lookup_beam.current_page
                            "
                            @click="onGetMetodePenyimpanan(search, true)"
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
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Zona Gudang",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchVendorPemilik: false,
      isLoadingGetVendorPemilik: false,
      vendor_pemilik_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchProfitCost: false,
      isLoadingGetProfitCost: false,
      profit_cost_search: "",

      isStopSearchJenisZonaGudang: false,
      isLoadingGetJenisZonaGudang: false,
      jenis_zona_gudang_search: "",

      isStopSearchSatuanStoklevel: false,
      isLoadingGetSatuanStoklevel: false,
      satuan_stoklevel_search: "",

      isStopSearchSatuanSuhu: false,
      isLoadingGetSatuanSuhu: false,
      satuan_suhu_search: "",

      isStopSearchMetodePengambilan: false,
      isLoadingGetMetodePengambilan: false,
      metode_pengambilan_search: "",

      isStopSearchFungsiZona: false,
      isLoadingGetFungsiZona: false,
      fungsi_zona_search: "",

      isStopSearchGroupZona: false,
      isLoadingGetGroupZona: false,
      group_zona_search: "",

      isStopSearchMetodePenyimpanan: false,
      isLoadingGetMetodePenyimpanan: false,
      metode_penyimpanan_search: "",

      title: "Zona Gudang",

      url: "master/zona-gudang",
      form: {
        zona_gudang_id: "",
        gudang_id: "",
        kode_zona_gudang: "",
        nama_zona_gudang: "",
        vendor_id: "",
        profit_cost_id: "",
        pelanggan_id: "",
        jenis_zona_gudang_id: "",
        satuan_id_stoklevel: "",
        satuan_id_suhu: "",
        status_zona: "",
        allow_overstock: "",
        status_zona_aktif: "",
        metode_pengambilan_id: "",
        fungsi_zona_id: "",
        group_zona_id: "",
        metode_penyimpanan_id: "",
        last_audit: "",
        last_in: "",
        last_out: "",
      },
      default_form: {
        zona_gudang_id: "",
        gudang_id: "",
        kode_zona_gudang: "",
        nama_zona_gudang: "",
        vendor_id: "",
        profit_cost_id: "",
        pelanggan_id: "",
        jenis_zona_gudang_id: "",
        satuan_id_stoklevel: "",
        satuan_id_suhu: "",
        status_zona: "",
        allow_overstock: "",
        status_zona_aktif: "",
        metode_pengambilan_id: "",
        fungsi_zona_id: "",
        group_zona_id: "",
        metode_penyimpanan_id: "",
        last_audit: "",
        last_in: "",
        last_out: "",
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("master/zona-gudang/" + this.id);

        Object.keys(this.form).forEach((item) => {
          this.form[item] = response.data[item];
        });

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchVendorPemilik();
    await this.onSearchPelanggan();
    await this.onSearchProfitCost();
    await this.onSearchJenisZonaGudang();
    await this.onSearchSatuanStoklevel();
    await this.onSearchSatuanSuhu();
    await this.onSearchMetodePengambilan();
    await this.onSearchFungsiZona();
    await this.onSearchGroupZona();
    await this.onSearchMetodePenyimpanan();
  },

  computed: {
    ...mapState("moduleApi", [
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
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "master/zona-gudang";

      let formData = {
        ...this.form,
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

    //gudang
    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_location.current_page = isNext
            ? this.lookup_location.current_page + 1
            : this.lookup_location.current_page - 1;
        } else {
          this.lookup_location.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "location",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_location.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
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

    //pelanggan
    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchPelanggan();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "custom1",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    //jenis zona gudang
    onGetJenisZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisZonaGudang);

      this.isStopSearchJenisZonaGudang = setTimeout(() => {
        this.jenis_zona_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchJenisZonaGudang();
      }, 600);
    },

    async onSearchJenisZonaGudang() {
      if (!this.isLoadingGetJenisZonaGudang) {
        this.isLoadingGetJenisZonaGudang = true;

        await this.lookUp({
          url: "master/jenis-zona-gudang/get-jenis-zona-gudang",
          lookup: "custom2",
          query:
            "?search=" +
            this.jenis_zona_gudang_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisZonaGudang = false;
      }
    },

    //satuan stoklevel
    onGetSatuanStoklevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuanStoklevel);

      this.isStopSearchSatuanStoklevel = setTimeout(() => {
        this.satuan_stoklevel_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchSatuanStoklevel();
      }, 600);
    },

    async onSearchSatuanStoklevel() {
      if (!this.isLoadingGetSatuanStoklevel) {
        this.isLoadingGetSatuanStoklevel = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "custom3",
          query:
            "?search=" +
            this.satuan_stoklevel_search +
            "&jenis_satuan=S" +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuanStoklevel = false;
      }
    },

    //satuan suhu
    onGetSatuanSuhu(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSatuanSuhu);

      this.isStopSearchSatuanSuhu = setTimeout(() => {
        this.satuan_suhu_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchSatuanSuhu();
      }, 600);
    },

    async onSearchSatuanSuhu() {
      if (!this.isLoadingGetSatuanSuhu) {
        this.isLoadingGetSatuanSuhu = true;

        await this.lookUp({
          url: "master/satuan/get-satuan",
          lookup: "suppliers",
          query:
            "?search=" +
            this.satuan_suhu_search +
            "&jenis_satuan=T" +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSatuanSuhu = false;
      }
    },

    //metode pengambilan
    onGetMetodePengambilan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchMetodePengambilan);

      this.isStopSearchMetodePengambilan = setTimeout(() => {
        this.metode_pengambilan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_resellers.current_page = isNext
            ? this.lookup_resellers.current_page + 1
            : this.lookup_resellers.current_page - 1;
        } else {
          this.lookup_resellers.current_page = 1;
        }

        this.onSearchMetodePengambilan();
      }, 600);
    },

    async onSearchMetodePengambilan() {
      if (!this.isLoadingGetMetodePengambilan) {
        this.isLoadingGetMetodePengambilan = true;

        await this.lookUp({
          url: "master/metode-pengambilan/get-metode-pengambilan",
          lookup: "resellers",
          query:
            "?search=" +
            this.metode_pengambilan_search +
            "&page=" +
            this.lookup_resellers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetMetodePengambilan = false;
      }
    },

    //fungsi zona
    onGetFungsiZona(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchFungsiZona);

      this.isStopSearchFungsiZona = setTimeout(() => {
        this.fungsi_zona_search = search;

        if (typeof isNext !== "function") {
          this.lookup_regus.current_page = isNext
            ? this.lookup_regus.current_page + 1
            : this.lookup_regus.current_page - 1;
        } else {
          this.lookup_regus.current_page = 1;
        }

        this.onSearchFungsiZona();
      }, 600);
    },

    async onSearchFungsiZona() {
      if (!this.isLoadingGetFungsiZona) {
        this.isLoadingGetFungsiZona = true;

        await this.lookUp({
          url: "master/fungsi-zona/get-fungsi-zona",
          lookup: "regus",
          query:
            "?search=" +
            this.fungsi_zona_search +
            "&page=" +
            this.lookup_regus.current_page +
            "&per_page=10",
        });

        this.isLoadingGetFungsiZona = false;
      }
    },

    //group zona
    onGetGroupZona(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGroupZona);

      this.isStopSearchGroupZona = setTimeout(() => {
        this.group_zona_search = search;

        if (typeof isNext !== "function") {
          this.lookup_grade.current_page = isNext
            ? this.lookup_grade.current_page + 1
            : this.lookup_grade.current_page - 1;
        } else {
          this.lookup_grade.current_page = 1;
        }

        this.onSearchGroupZona();
      }, 600);
    },

    async onSearchGroupZona() {
      if (!this.isLoadingGetGroupZona) {
        this.isLoadingGetGroupZona = true;

        await this.lookUp({
          url: "master/group-zona/get-group-zona",
          lookup: "grade",
          query:
            "?search=" +
            this.group_zona_search +
            "&page=" +
            this.lookup_grade.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGroupZona = false;
      }
    },

    //metode penyimpanan
    onGetMetodePenyimpanan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchMetodePenyimpanan);

      this.isStopSearchMetodePenyimpanan = setTimeout(() => {
        this.metode_penyimpanan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchMetodePenyimpanan();
      }, 600);
    },

    async onSearchMetodePenyimpanan() {
      if (!this.isLoadingGetMetodePenyimpanan) {
        this.isLoadingGetMetodePenyimpanan = true;

        await this.lookUp({
          url: "master/metode-penyimpanan/get-metode-penyimpanan",
          lookup: "beam",
          query:
            "?search=" +
            this.metode_penyimpanan_search +
            "&page=" +
            this.lookup_beam.current_page +
            "&per_page=10",
        });

        this.isLoadingGetMetodePenyimpanan = false;
      }
    },

    //stop right here
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
            "&tipe_vendor=e" +
            "&page=" +
            this.lookup_defects.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendorPemilik = false;
      }
    },
  },
};
</script>
