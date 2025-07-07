<template>
  <section class="section h-screen">
    <div
      class="section-body mb-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
      v-if="!isLoadingPage"
    >
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
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div class="mt-4">
            <div class="flex gap-2 w-full">
              <div class="form-group w-1/4">
                <input-form
                  label="Kode SAP"
                  type="text"
                  name="kode_sap"
                  v-model="parameters.form.kode_asp"
                  :required="false"
                />
              </div>
              <div v-if="lookup_beam.gudang_id === null" class="w-1/4">
                <ValidationProvider name="gudang" rules="required">
                  <div class="form-group w-full items-center">
                    <label for=""
                      >Gudang <span class="text-danger">*</span></label
                    >
                    <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_gudang"
                      :loading="isLoadingGetGudang"
                      :options="lookup_roles.data"
                      :filterable="false"
                      @search="onGetGudang"
                      :reduce="(item) => item.gudang_id"
                      v-model="parameters.form.gudang_id"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_roles.data.length || search"
                      >
                        <span
                          v-if="lookup_roles.current_page > 1"
                          @click="onGetGudang(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_roles.last_page > lookup_roles.current_page
                          "
                          @click="onGetGudang(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                </ValidationProvider>
              </div>
              <div class="form-group w-1/4">
                <input-form
                  label="Doc Type SAP"
                  type="text"
                  name="doc_type_sap"
                  v-model="parameters.form.doc_type_sap"
                  :required="false"
                />
              </div>
              <div class="form-group w-1/4">
                <input-form
                  label="Tanggal Pembuatan"
                  type="date"
                  name="tanggal"
                  v-model="parameters.form.tanggal"
                  :required="true"
                />
              </div>
            </div>
            <div class="grid grid-cols-4 gap-2 w-full">
              <ValidationProvider name="lokasi">
                <div class="form-group w-full items-center mb-5">
                  <label for="">Lokasi Asal Muat</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_lokasi"
                    :loading="isLoadingGetLokasi"
                    :options="lookup_location.data"
                    :filterable="false"
                    @search="onGetLokasi"
                    :reduce="(item) => item.lokasi_id"
                    v-model="parameters.form.lokasi_id_asal_muat"
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
              <div class="form-group">
                <input-form
                  label="Asal Muat"
                  type="text"
                  name="asal_muat"
                  v-model="parameters.form.asal_muat"
                  :required="false"
                />
              </div>
              <ValidationProvider name="vendor" rules="required">
                <div class="form-group w-full items-center mb-5">
                  <label for=""
                    >Vendor Transporter
                    <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_vendor"
                    :loading="isLoadingGetVendor"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetVendor"
                    :reduce="(item) => item.vendor_id"
                    v-model="parameters.form.vendor_id_transporter"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom1.data.length || search"
                    >
                      <span
                        v-if="lookup_custom1.current_page > 1"
                        @click="onGetVendor(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetVendor(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <div class="form-group">
                <input-form
                  label="Nama Transporter"
                  type="text"
                  name="nama_transporter"
                  v-model="parameters.form.nama_transporter"
                  :required="false"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap2 w-full">
              <div class="form-group">
                <input-form
                  label="Surat Jalan"
                  type="text"
                  name="surat_jalan"
                  v-model="parameters.form.surat_jalan"
                  :required="true"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Nomor Referensi"
                  type="text"
                  name="no_referensi"
                  v-model="parameters.form.no_referensi"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Nomor Referensi 2"
                  type="text"
                  name="no_referensi_2"
                  v-model="parameters.form.no_referensi_2"
                  :required="false"
                />
              </div>
            </div>
            <div class="grid grid-cols-4 gap-2 w-full">
              <ValidationProvider name="kendaraan" rules="required">
                <div class="form-group w-full items-center mb-5">
                  <label for=""
                    >Kendaraan <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_kendaraan"
                    :loading="isLoadingGetKendaraan"
                    :options="lookup_custom2.data"
                    :filterable="false"
                    @search="onGetKendaraan"
                    :reduce="(item) => item.kendaraan_id"
                    v-model="parameters.form.kendaraan_id"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom2.data.length || search"
                    >
                      <span
                        v-if="lookup_custom2.current_page > 1"
                        @click="onGetKendaraan(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom2.last_page > lookup_custom2.current_page
                        "
                        @click="onGetKendaraan(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <ValidationProvider name="pengemudi" rules="required">
                <div class="form-group w-full items-center mb-5">
                  <label for=""
                    >Pengemudi <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_pengemudi"
                    :loading="isLoadingGetPengemudi"
                    :options="lookup_custom3.data"
                    :filterable="false"
                    @search="onGetPengemudi"
                    :reduce="(item) => item.pengemudi_id"
                    v-model="parameters.form.pengemudi_id"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom3.data.length || search"
                    >
                      <span
                        v-if="lookup_custom3.current_page > 1"
                        @click="onGetPengemudi(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom3.last_page > lookup_custom3.current_page
                        "
                        @click="onGetPengemudi(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <ValidationProvider name="supplier">
                <div class="form-group w-full items-center mb-5">
                  <label for="">Supplier</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_supplier"
                    :loading="isLoadingGetSupplier"
                    :options="lookup_suppliers.data"
                    :filterable="false"
                    @search="onGetSupplier"
                    :reduce="(item) => item.supplier_id"
                    v-model="parameters.form.supplier_id"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_suppliers.data.length || search"
                    >
                      <span
                        v-if="lookup_suppliers.current_page > 1"
                        @click="onGetSupplier(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_suppliers.last_page >
                          lookup_suppliers.current_page
                        "
                        @click="onGetSupplier(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <div class="form-group">
                <!-- <input-form
                  label="Perkiraan Tiba"
                  type="datetime-local"
                  name="perkiraan_tiba"
                  v-model="parameters.form.perkiraan_tiba"
                  :required="false"
                /> -->
                <label for="">Perkiraan Tiba</label>
                <input
                  type="datetime-local"
                  step="1"
                  v-model="parameters.form.perkiraan_tiba"
                  class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Kebutuhan Peralatan"
                  type="text"
                  name="kebutuhan_peralatan"
                  v-model="parameters.form.kebutuhan_peralatan"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Handling Instruction"
                  type="text"
                  name="handling_instruction"
                  v-model="parameters.form.handling_instruction"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="catatan"
                  type="text"
                  name="catatan"
                  v-model="parameters.form.catatan"
                  :required="false"
                />
              </div>
            </div>
            <div class="form-group">
              <input-form
                label="Serial Number"
                type="text"
                name="serial_number"
                v-model="formAsn.serial_number"
                :required="false"
              />
            </div>
          </div>
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
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isStopSearcnKendaraan: false,
      isLoadingGetKendaraan: false,
      kendaraan_search: "",

      isStopSearchPengemudi: false,
      isLoadingGetPengemudi: false,
      pengemudi_search: "",

      isStopSearchSupplier: false,
      isLoadingGetSupplier: false,
      supplier_search: "",

      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchItem: false,
      isLoadingGetItem: false,
      item_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      item_gudang_search: "",

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Shipment Notice",
      parameters: {
        url: "inbound/asn",
        form: {
          gudang_id: "",
          kode_asp: "",
          doc_type_sap: "",
          tanggal: "",
          lokasi_id_asal_muat: "",
          asal_muat: "",
          vendor_id_transporter: "",
          nama_transporter: "",
          surat_jalan: "",
          no_referensi: "",
          no_referensi_2: "",
          kendaraan_id: "",
          pengemudi_id: "",
          supplier_id: "",
          perkiraan_tiba: "",
          kebutuhan_peralatan: "",
          handling_instruction: "",
          catatan: "",

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",

          // asn detail
          asn_detail: [],
        },
      },
      formAsn: {
        item_id: "",
        item_pelanggan_id: "",
        item_gudang_id: "",
        quantitiy: "",
        serial_number: "",
        panjang: "",
        lebar: "",
        tinggi: "",
        berat: "",
        no_referensi: "",
        note: "",
        zona_gudang_id_plan: "",
        slot_penyimpanan_id_aisle_plan: "",
        slot_penyimpanan_id_rack_plan: "",
        slot_penyimpanan_id_level_plan: "",
        slot_penyimpanan_id_bin_plan: "",
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`inbound/asn/${this.id}`);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      // console.log("error", error);
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchVendor();
    await this.onSearchKendaraan();
    await this.onSearchPengemudi();
    await this.onSearchSupplier();
    await this.onSearchLokasi();
    await this.onSearchGudang();
    await this.onSearchItem();
    await this.onSearchPelanggan();
    await this.onSearchItemGudang();
    await this.onSearchZonaGudang();
    await this.lookUp({
      url: "me",
      lookup: "beam",
    });
    // console.log("me", this.lookup_beam.gudang_id);
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //vendor
      "lookup_custom2", //kendaraan
      "lookup_custom3", //pengemudi
      "lookup_suppliers", //suppliers
      "lookup_location", //lokasi
      "lookup_roles", //gudang
      "lookup_packing", //item
      "lookup_department", //pelanggan
      "lookup_defects", //item gudang
      "lookup_regus", //zona gudang
      "lookup_beam", // get superadmin / no
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    addAsnDetail() {
      this.parameters.form.asn_detail.push({ ...this.formAsn });
      this.resetFormAsn();
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          id: this.parameters.form.asn_id ? this.parameters.form.asn_id : "",
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      this.parameters.form.asn_detail.push({ ...this.formAsn });
      // console.log("asn detail", this.parameters.form.asn_detail);

      if (this.result == true) {
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );

        this.isEditable = false;
        this.parameters.form = {
          gudang_id: "",
          kode_asp: "",
          doc_type_sap: "",
          tanggal: "",
          lokasi_id_asal_muat: "",
          asal_muat: "",
          vendor_id_transporter: "",
          nama_transporter: "",
          surat_jalan: "",
          no_referensi: "",
          no_referensi_2: "",
          kendaraan_id: "",
          pengemudi_id: "",
          supplier_id: "",
          perkiraan_tiba: "",
          kebutuhan_peralatan: "",
          handling_instruction: "",
          catatan: "",

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
          asn_detail: [],
        };
        this.$refs.formValidate.reset();
        // this.$refs.ruteProvider.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    // Get Vendor
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

    // Get Kendaraan
    onGetKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKendaraan);

      this.isStopSearchKendaraan = setTimeout(() => {
        this.kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchKendaraan();
      }, 600);
    },

    async onSearchKendaraan() {
      if (!this.isLoadingGetKendaraan) {
        this.isLoadingGetKendaraan = true;

        await this.lookUp({
          url: "master/kendaraan/get-kendaraan",
          lookup: "custom2",
          query:
            "?search=" +
            this.kendaraan_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKendaraan = false;
      }
    },

    // Get Pengemudi
    onGetPengemudi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPengemudi);

      this.isStopSearchPengemudi = setTimeout(() => {
        this.pengemudi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchPengemudi();
      }, 600);
    },

    async onSearchPengemudi() {
      if (!this.isLoadingGetPengemudi) {
        this.isLoadingGetPengemudi = true;

        await this.lookUp({
          url: "master/pengemudi/get-pengemudi",
          lookup: "custom3",
          query:
            "?search=" +
            this.pengemudi_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPengemudi = false;
      }
    },

    // Get Suppliers
    onGetSupplier(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSupplier);

      this.isStopSearchSupplier = setTimeout(() => {
        this.supplier_search = search;

        if (typeof isNext !== "function") {
          this.lookup_suppliers.current_page = isNext
            ? this.lookup_suppliers.current_page + 1
            : this.lookup_suppliers.current_page - 1;
        } else {
          this.lookup_suppliers.current_page = 1;
        }

        this.onSearchSupplier();
      }, 600);
    },

    async onSearchSupplier() {
      if (!this.isLoadingGetSupplier) {
        this.isLoadingGetSupplier = true;

        await this.lookUp({
          url: "master/supplier/get-supplier",
          lookup: "suppliers",
          query:
            "?search=" +
            this.supplier_search +
            "&page=" +
            this.lookup_suppliers.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSupplier = false;
      }
    },

    // Get Lokasi
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

    //Get Gudang
    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "roles",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    // Get Item
    onGetItem(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchItem);

      this.isStopSearchItem = setTimeout(() => {
        this.item_search = search;

        if (typeof isNext !== "function") {
          this.lookup_packing.current_page = isNext
            ? this.lookup_packing.current_page + 1
            : this.lookup_packing.current_page - 1;
        } else {
          this.lookup_packing.current_page = 1;
        }

        this.onSearchItem();
      }, 600);
    },

    async onSearchItem() {
      if (!this.isLoadingGetItem) {
        this.isLoadingGetItem = true;

        await this.lookUp({
          url: "master/item/get-item",
          lookup: "packing",
          query:
            "?search=" +
            this.item_search +
            "&page=" +
            this.lookup_packing.current_page +
            "&per_page=10",
        });

        this.isLoadingGetItem = false;
      }
    },

    //Get Pelanggan

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        gudang_id: "",
        kode_asp: "",
        doc_type_sap: "",
        tanggal: "",
        lokasi_id_asal_muat: "",
        asal_muat: "",
        vendor_id_transporter: "",
        nama_transporter: "",
        surat_jalan: "",
        no_referensi: "",
        no_referensi_2: "",
        kendaraan_id: "",
        pengemudi_id: "",
        supplier_id: "",
        perkiraan_tiba: "",
        kebutuhan_peralatan: "",
        handling_instruction: "",
        catatan: "",

        //Tracking
        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      };
    },
    resetFormAsn() {
      this.formAsn = {
        item_id: "",
        item_pelanggan_id: "",
        item_gudang_id: "",
        quantitiy: "",
        serial_number: "",
        panjang: "",
        lebar: "",
        tinggi: "",
        berat: "",
        no_referensi: "",
        note: "",
        zona_gudang_id_plan: "",
        slot_penyimpanan_id_aisle_plan: "",
        slot_penyimpanan_id_rack_plan: "",
        slot_penyimpanan_id_level_plan: "",
        slot_penyimpanan_id_bin_plan: "",
      };
    },
  },
};
</script>
