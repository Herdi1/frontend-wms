<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Kendaraan
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
                class="mb-3 p-4 w-full md:w-8/12 bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-top w-full"
                >
                  <ValidationProvider
                    name="jenis_kendaraan_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="jenis_kendaraan_id"
                        >Jenis Kendaraan<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <v-select
                        label="nama_jenis_kendaraan"
                        :loading="isLoadingGetJenisKendaraan"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetJenisKendaraan"
                        v-model="form.jenis_kendaraan_id"
                        class="w-full bg-white"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                        @input="(item) => onSelectJenis(item)"
                      >
                        <!-- :reduce="(item) => item.jenis_kendaraan_id" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_custom1.data.length || search"
                        >
                          <span
                            v-if="lookup_custom1.current_page > 1"
                            @click="onGetJenisKendaraan(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetJenisKendaraan(search, true)"
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
                        :options="lookup_warehouses.data"
                        :filterable="false"
                        @search="onGetGudang"
                        v-model="form.gudang_id"
                        class="w-full bg-white"
                        @input="(item) => onSelectGudang(item)"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <!-- :reduce="(item) => item.gudang_id" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_warehouses.data.length || search"
                        >
                          <span
                            v-if="lookup_warehouses.current_page > 1"
                            @click="onGetGudang(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_warehouses.last_page >
                              lookup_warehouses.current_page
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
                  <ValidationProvider
                    name="vendor_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="vendor_id"
                        >Pemilik<span class="text-danger">*</span></label
                      >
                      <v-select
                        label="nama_vendor"
                        :loading="isLoadingGetVendor"
                        :options="lookup_operator.data"
                        :filterable="false"
                        @search="onGetVendor"
                        v-model="form.vendor_id"
                        :reduce="(item) => item.vendor_id"
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
                      <span class="text-danger text-xs pl-1" v-if="errors[0]">{{
                        errors[0]
                      }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    name="vendor_id_operator"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="vendor_id_operator"
                        >Vendor Operator<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <v-select
                        label="nama_vendor"
                        :loading="isLoadingGetVendorOperator"
                        :options="lookup_resellers.data"
                        :filterable="false"
                        @search="onGetVendorOperator"
                        v-model="form.vendor_id_operator"
                        class="w-full bg-white"
                        @input="(item) => onSelecetVendor(item)"
                        :class="
                          errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                        "
                      >
                        <!-- :reduce="(item) => item.vendor_id" -->
                        <li
                          slot-scope="{ search }"
                          slot="list-footer"
                          class="p-1 border-t flex justify-between"
                          v-if="lookup_resellers.data.length || search"
                        >
                          <span
                            v-if="lookup_resellers.current_page > 1"
                            @click="onGetVendorOperator(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_resellers.last_page >
                              lookup_resellers.current_page
                            "
                            @click="onGetVendorOperator(search, true)"
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
                    name="standar_jenis_kendaraan_id"
                    rules="required"
                    class="w-full"
                  >
                    <div slot-scope="{ errors, valid }">
                      <label for="standar_jenis_kendaraan_id"
                        >Standar Jenis Kendaraan<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <v-select
                        label="kode_standar_jenis_kendaraan"
                        :loading="isLoadingGetStandarJenis"
                        :options="lookup_custom2.data"
                        :filterable="false"
                        @search="onGetStandarJenis"
                        v-model="form.standar_jenis_kendaraan_id"
                        :reduce="(item) => item.standar_jenis_kendaraan_id"
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
                            @click="onGetStandarJenis(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom2.last_page >
                              lookup_custom2.current_page
                            "
                            @click="onGetStandarJenis(search, true)"
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
                    name="nama_kendaraan"
                    rules="required"
                    class="w-full"
                  >
                    <div>
                      <input-form
                        label="Nama Kendaraan"
                        type="text"
                        name="nama_kendaraan"
                        :required="true"
                        v-model="form.nama_kendaraan"
                      />
                    </div>
                  </ValidationProvider>

                  <div>
                    <input-form
                      label="Plat Nomor Kendaraan"
                      type="text"
                      name="plat_nomor"
                      v-model="form.plat_nomor"
                      :required="true"
                    />
                  </div>

                  <div>
                    <input-form
                      label="CC Kendaraan"
                      type="text"
                      name="cc"
                      v-model="form.cc"
                      :required="false"
                    />
                  </div>

                  <div v-if="isEditable">
                    <input-form
                      label="Kode Kendaraan"
                      type="text"
                      name="kode_kendaraan"
                      :required="true"
                      v-model="form.kode_kendaraan"
                      :disabled="true"
                    />
                  </div>
                  <div>
                    <input-form
                      label="Nomor Mesin"
                      type="text"
                      name="nomor_mesin"
                      v-model="form.nomor_mesin"
                      :required="false"
                    />
                  </div>
                  <div>
                    <input-form
                      label="Tahun Dibuat"
                      type="text"
                      name="tahun_buat"
                      v-model="form.tahun_buat"
                      :required="false"
                    />
                  </div>

                  <div>
                    <input-form
                      label="Nomor Sasis"
                      type="text"
                      name="nomor_sasis"
                      v-model="form.nomor_sasis"
                      :required="false"
                    />
                  </div>
                  <div class="form-group">
                    <label for="status_digunakan"
                      >Status Digunakan
                      <span class="text-danger">*</span></label
                    >
                    <select
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      name="status_digunakan"
                      id="status_digunakan"
                      v-model="form.status_digunakan"
                    >
                      <option value="">Pilih</option>
                      <option value="0">Tidak Digunakan</option>
                      <option value="1">Digunakan</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="status_normal"
                      >Status Normal <span class="text-danger">*</span></label
                    >
                    <select
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      name="status_normal"
                      id="status_normal"
                      v-model="form.status_normal"
                    >
                      <option value="">Pilih</option>
                      <option value="0">Rusak</option>
                      <option value="1">Prima</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="status_driver"
                      >Status Driver <span class="text-danger">*</span></label
                    >
                    <select
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      name="status_driver"
                      id="status_driver"
                      v-model="form.status_driver"
                      @change="onChangeStatusDriver()"
                    >
                      <option value="">Pilih</option>
                      <option value="dedicated">Dedicated</option>
                      <option value="shared">Share</option>
                    </select>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-2 w-full mt-2">
                  <div>
                    <input-form
                      label="Tanggal Pajak"
                      type="date"
                      name="tanggal_pajak"
                      v-model="form.tanggal_pajak"
                      :required="false"
                    />
                  </div>
                  <div>
                    <label for="tipe_plat_id"
                      >Tipe Plat <span class="text-danger">*</span></label
                    >
                    <v-select
                      label="nama_tipe_plat"
                      :loading="isLoadingGetTipePlat"
                      :options="lookup_custom4.data"
                      :filterable="false"
                      @search="onGetTipePlat"
                      v-model="form.tipe_plat_id"
                      :reduce="(item) => item.tipe_plat_id"
                      class="w-full bg-white"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom4.data.length || search"
                      >
                        <span
                          v-if="lookup_custom4.current_page > 1"
                          @click="onGetTipePlat(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom4.last_page >
                            lookup_custom4.current_page
                          "
                          @click="onGetTipePlat(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                  <div>
                    <input-form
                      label="Tanggal Beli"
                      type="date"
                      name="tanggal_beli"
                      v-model="form.tanggal_beli"
                      :required="false"
                    />
                  </div>
                  <div class="w-full">
                    <label class="" for="umur_kendaraan">Umur Kendaraan</label>
                    <div
                      class="border border-gray-300 bg-gray-50 rounded-md p-1"
                    >
                      {{ formatAge(vehicleAge) }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
                  <div>
                    <input-form
                      label="Nomor STNK"
                      type="text"
                      name="stnk"
                      v-model="form.stnk"
                      :required="false"
                    />
                  </div>
                  <div>
                    <input-form
                      label="Tanggal Expired STNK"
                      type="date"
                      name="tanggal_expired_stnk"
                      v-model="form.tanggal_stnk"
                      :required="false"
                    />
                  </div>
                  <div>
                    <input-form
                      label="Nomor KIR"
                      type="text"
                      name="kir"
                      v-model="form.kir"
                      :required="false"
                    />
                  </div>
                  <div>
                    <input-form
                      label="Tanggal Expired KIR"
                      type="date"
                      name="tanggal_expired_kir"
                      v-model="form.tanggal_kir"
                      :required="false"
                    />
                  </div>
                </div>

                <div class="form-group md:col-span-2 lg:col-span-3">
                  <label>Keterangan Pindah Gudang</label>
                  <textarea
                    name="keterangan_pindah_gudang"
                    v-model="form.keterangan_pindah_gudang"
                    class="w-full border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                  ></textarea>
                  <p>*Diisi jika terjadi perpindahan gudang</p>
                </div>
                <modal-footer-section
                  :isLoadingForm="isLoadingForm"
                  @reset="formReset()"
                />
              </div>
              <div
                class="p-4 w-full md:w-4/12 dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div class="w-full flex justify-between items-center">
                  <h1 class="text-xl font-bold">Pengemudi</h1>
                  <!-- <button
                    @click="onFormShow"
                    class="bg-[#21b94f] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                    v-if="!isEditable"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Pengemudi Baru</p>
                  </button> -->
                  <!-- :disabled="
                      form.status_driver == '' ||
                      (form.status_driver == 'dedicated' &&
                        form.pengemudi_kendaraans.length >= 1)
                    " -->
                  <button
                    type="button"
                    @click="addPengemudiKendaraan"
                    class="bg-green-600 text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Daftar Pengemudi</p>
                  </button>
                </div>
                <div
                  class="table-responsive"
                  style="max-height: 500px"
                  :style="
                    form.pengemudi_kendaraans.length ? 'min-height:500px' : ''
                  "
                >
                  <table
                    class="table mt-5 h-full"
                    v-if="form.pengemudi_kendaraans.length > 0"
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
                        v-for="(item, index) in form.pengemudi_kendaraans"
                        :key="index"
                        style="border-top: 0.5px solid lightgray"
                      >
                        <td>
                          <v-select
                            label="nama_lengkap"
                            :loading="isLoadingGetDriver"
                            :options="lookup_suppliers.data"
                            :filterable="false"
                            @search="onGetDriver"
                            v-model="item.staff_id"
                            :reduce="(item) => item.staff_id"
                            class="w-full bg-white"
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
                            name="status"
                            id="status"
                            v-model="item.status"
                          >
                            <option value="">Pilih</option>
                            <option value="1 ">Active</option>
                            <option value="0 ">Inactive</option>
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
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <ModalForm ref="formInput" :self="this" />
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import ModalForm from "./form.vue";

export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Kendaraan",
    };
  },

  components: {
    ModalForm,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      isStopSearchJenisKendaraan: false,
      isLoadingGetJenisKendaraan: false,
      jenis_kendaraan_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearchVendorOperator: false,
      isLoadingGetVendorOperator: false,
      vendor_operator_search: "",

      isStopSearchStandarJenis: false,
      isLoadingGetStandarJenis: false,
      standar_jenis_search: "",

      isStopSearchDriver: false,
      isLoadingGetDriver: false,
      driver_search: "",

      isStopSearchTipePlat: false,
      isLoadingGetTipePlat: false,
      tipe_plat_search: "",

      title: "Kendaraan",

      url: "master/kendaraan",
      form: {
        kendaraan_id: "",
        jenis_kendaraan_id: "",
        gudang_id: "",
        vendor_id: "",
        vendor_id_operator: "",
        standar_jenis_kendaraan_id: "",
        nama_kendaraan: "",
        kode_kendaraan: "",
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
        pengemudi_kendaraans: [],

        tanggal_beli: "",
        tanggal_stnk: "",
        tanggal_kir: "",
        tanggal_pajak: "",
        umur_kendaraan: "",
        tipe_plat_id: "",
        tanggal: "",
      },

      default_form: {
        kendaraan_id: "",
        jenis_kendaraan_id: "",
        gudang_id: "",
        vendor_id: "",
        vendor_id_operator: "",
        standar_jenis_kendaraan_id: "",
        nama_kendaraan: "",
        kode_kendaraan: "",
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
        pengemudi_kendaraans: [],

        tanggal_beli: "",
        tanggal_pajak: "",
        // umur_kendaraan: "",
        tipe_plat_id: "",
        tanggal_stnk: "",
        tanggal_kir: "",
        // tanggal: "",
      },
    };
  },

  async created() {
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = (today.getMonth() + 1).toString().padStart(2, "0");
    // const day = today.getDate().toString().padStart(2, "0");

    // const formattedDate = `${year}-${month}-${day}`;
    // this.form.tanggal = formattedDate;
    try {
      if (this.isEditable) {
        let response = await this.$axios.get("master/kendaraan/" + this.id);

        Object.keys(this.form).forEach((item) => {
          if (item != "pengemudi_kendaraan") {
            this.form[item] = response.data[item];
          }
        });

        this.form.gudang_id = response.data.gudang;
        this.form.vendor_id_operator = response.data.vendor_operator;
        this.form.jenis_kendaraan_id = response.data.jenis_kendaraan;

        this.form.pengemudi_kendaraans = response.data.pengemudi_kendaraan.map(
          (item) => {
            return {
              ...item,
              pengemudi_kendaraan_id: item || null,
              staff_id: item.staff,
            };
          }
        );

        this.isLoadingPage = false;
        // console.log(this.form.pengemudi_kendaraans);
      }
    } catch (error) {
      this.$router.push("/master/kendaraan");
    }
  },

  async mounted() {
    await this.onSearchGudang();
    await this.onSearchJenisKendaraan();
    await this.onSearchVendor();
    await this.onSearchVendorOperator();
    // await this.onSearchStandarJenis();
    await this.onSearchTipePlat();
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
      "lookup_custom4",
    ]),

    vehicleAge() {
      if (!this.form.tanggal_beli) return null;

      const today = new Date();
      const purchase = new Date(this.form.tanggal_beli);

      let years = today.getFullYear() - purchase.getFullYear();
      let months = today.getMonth() - purchase.getMonth();
      // let days = today.getDate() - purchase.getDate();

      // if (days < 0) {
      //   months--;
      //   const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      //   days += lastMonth.getDate();
      // }

      if (months < 0) {
        years--;
        months += 12;
      }

      return { years, months };
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    formatAge(age) {
      if (!age) return "-";

      const parts = [];
      if (age.years > 0) parts.push(`${age.years} tahun`);
      if (age.months > 0) parts.push(`${age.months} bulan`);
      // if (age.days > 0) parts.push(`${age.days} hari`);

      return parts.join(", ") || "0 hari";
    },

    //jenis kendaraan
    onGetJenisKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKendaraan);

      this.isStopSearchJenisKendaraan = setTimeout(() => {
        this.jenis_kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchJenisKendaraan();
      }, 600);
    },

    async onSearchJenisKendaraan() {
      if (!this.isLoadingGetJenisKendaraan) {
        this.isLoadingGetJenisKendaraan = true;

        await this.lookUp({
          url: "master/jenis-kendaraan/get-jenis-kendaraan",
          lookup: "custom1",
          query:
            "?search=" +
            this.jenis_kendaraan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisKendaraan = false;
      }
    },

    async onSelectJenis(item) {
      if (item) {
        this.form.jenis_kendaraan_id = item;
        await this.onSearchStandarJenis();
      } else {
        this.form.jenis_kendaraan_id = "";
      }
    },

    //gudang
    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_warehouses.current_page = isNext
            ? this.lookup_warehouses.current_page + 1
            : this.lookup_warehouses.current_page - 1;
        } else {
          this.lookup_warehouses.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "warehouses",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_warehouses.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    async onSelectGudang(item) {
      if (item) {
        this.form.gudang_id = item;
        this.form.pengemudi_kendaraans = [];
        await this.onSearchDriver();
        await this.onSearchStandarJenis();
      } else {
        this.form.gudang_id = "";
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
            "&tipe_vendor_id=2" +
            "&page=" +
            this.lookup_operator.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
      }
    },

    //vendor operator
    onGetVendorOperator(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendorOperator);

      this.isStopSearchVendorOperator = setTimeout(() => {
        this.vendor_operator_search = search;

        if (typeof isNext !== "function") {
          this.lookup_resellers.current_page = isNext
            ? this.lookup_resellers.current_page + 1
            : this.lookup_resellers.current_page - 1;
        } else {
          this.lookup_resellers.current_page = 1;
        }

        this.onSearchVendorOperator();
      }, 600);
    },

    async onSearchVendorOperator() {
      if (!this.isLoadingGetVendorOperator) {
        this.isLoadingGetVendorOperator = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "resellers",
          query:
            "?search=" +
            this.vendor_operator_search +
            "&tipe_vendor_id=1" +
            "&page=" +
            this.lookup_resellers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendorOperator = false;
      }
    },

    async onSelecetVendor(item) {
      if (item) {
        this.form.vendor_id_operator = item;
        await this.onSearchDriver();
      } else {
        this.form.vendor_id_operator = "";
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
            "&jenis_kendaraan_id=" +
            this.form.jenis_kendaraan_id.jenis_kendaraan_id +
            "&gudang_id=" +
            this.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetStandarJenis = false;
        console.log("standar", this.lookup_custom2.data);
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
          url: "master/staff/get-staff",
          lookup: "suppliers",
          query:
            "?search=" +
            this.driver_search +
            "&jenis_user=pengemudi" +
            "&gudang_id=" +
            this.form.gudang_id +
            "&vendor_id_operator=" +
            this.form.vendor_id_operator +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetDriver = false;
      }
    },

    onGetTipePlat(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTipePlat);

      this.isStopSearchTipePlat = setTimeout(() => {
        this.tipe_plat_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchTipePlat();
      }, 600);
    },

    async onSearchTipePlat() {
      if (!this.isLoadingGetTipePlat) {
        this.isLoadingGetTipePlat = true;

        await this.lookUp({
          url: "master/tipe-plat/get-tipe-plat",
          lookup: "custom4",
          query:
            "?search=" +
            this.tipe_plat_search +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTipePlat = false;
      }
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      if (!this.form.pengemudi_kendaraans.length) {
        this.$toaster.error("Pengemudi Kendaraan Masih Kosong");
        return;
      }

      this.isLoadingForm = true;

      let url = "master/kendaraan";

      let formData = {
        ...this.form,
        gudang_id:
          typeof this.form.gudang_id == "object"
            ? this.form.gudang_id.gudang_id
            : this.form.gudang_id,
        vendor_id_operator:
          typeof this.form.vendor_id_operator === "object"
            ? this.form.vendor_id_operator.vendor_id
            : this.form.vendor_id_operator,
        jenis_kendaraan_id:
          typeof this.form.jenis_kendaraan_id === "object"
            ? this.form.jenis_kendaraan_id.jenis_kendaraan_id
            : this.form.jenis_kendaraan_id,
      };

      formData.pengemudi_kendaraans = formData.pengemudi_kendaraans.map(
        (item) => {
          return {
            ...item,
            pengemudi_kendaraan_id:
              typeof item.pengemudi_kendaraan_id == "object"
                ? item.pengemudi_kendaraan_id.pengemudi_kendaraan_id
                : "",
            staff_id:
              typeof item.staff_id === "object"
                ? item.staff_id.staff_id
                : item.staff_id,
          };
        }
      );

      console.log(this.form);

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
              pengemudi_kendaraans: [],
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

    onFormShow() {
      this.$refs.formInput.show();
      // this.$router.replace("master/staff");
    },

    addPengemudiKendaraan() {
      if (this.form.status_driver === "") {
        this.$toaster.error("Status Driver harus diisi");
        return;
      } else if (
        this.form.status_driver === "dedicated" &&
        this.form.pengemudi_kendaraans.length >= 1
      ) {
        this.$toaster.error(
          "Status driver dedicated hanya dapat menambah maksimal 1 pengemudi"
        );
        return;
      } else {
        this.form.pengemudi_kendaraans.push({
          pengemudi_kendaraans_id: null,
          staff_id: null,
          status: null,
        });
      }
    },

    onChangeStatusDriver() {
      if (this.form.status_driver === "dedicated") {
        this.form.pengemudi_kendaraans = [];
      }
    },

    onDeleteItem(index) {
      this.form.pengemudi_kendaraans = this.form.pengemudi_kendaraans.filter(
        (_, itemIndex) => index != itemIndex
      );
    },

    formReset() {
      this.$refs.formValidate.reset();
      this.form = this.default_form;
      this.form.pengemudi_kendaraans = [];
    },
  },
};
</script>
