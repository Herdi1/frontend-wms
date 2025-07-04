<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
        Edit Data
      </h1>
      <h1 v-else class="text-xl font-bold mb-2 uppercase">Tambah Data</h1>
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
                        lookup_location.last_page > lookup_location.current_page
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

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pelanggan",
      parameters: {
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
      },
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
  },

  computed: {
    ...mapState("moduleApi", [
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
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

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
        console.log("negara", this.lookup_custom1.data);
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
        console.log("provinsi", this.lookup_custom2.data);
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
        console.log("kota", this.lookup_custom3.data);
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
        console.log("kecamatan", this.lookup_beam.data);
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
        console.log("kelurahan", this.lookup_grade.data);
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
        console.log("Tipe Badan Hukum", this.lookup_department.data);
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
        console.log("user", this.lookup_users.data);
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
        console.log("lokasi", this.lookup_location.data);
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
        console.log("pelanggan", this.lookup_regus.data);
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
