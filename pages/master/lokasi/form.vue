<template>
  <div>
    <div id="modal-form">
      <div class="modal-dialog">
        <div>
          <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
            Edit Data
          </h1>
          <h1 v-else class="text-xl font-bold mb-2 uppercase">Tambah Data</h1>
          <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
            <form
              @submit.prevent="validate().then(() => onSubmit(invalid))"
              autocomplete="off"
            >
              <div class="modal-body mt-4">
                <!-- Lokasi Id Induk -->
                <div class="form-group">
                  <input-form
                    label="Lokasi Id Induk"
                    type="text"
                    name="lokasi_id_induk"
                    v-model="parameters.form.lokasi_id_induk"
                  />
                </div>

                <!-- Kode Lokasi -->
                <ValidationProvider
                  name="kode_lokasi"
                  rules="required"
                  ref="ruteProvider"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Kode Lokasi"
                      type="text"
                      name="kode_lokasi"
                      v-model="parameters.form.kode_lokasi"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <!-- Nama Lokasi -->
                <ValidationProvider
                  name="nama_lokasi"
                  rules="required"
                  ref="ruteProvider"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Nama Lokasi"
                      type="text"
                      name="nama_lokasi"
                      v-model="parameters.form.nama_lokasi"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <!-- Alamat Lokasi -->
                <div class="form-group">
                  <label for="alamat_lokasi">Alamat Lokasi</label>
                  <textarea
                    placeholder="Alamat Lokasi"
                    v-model="parameters.form.alamat_lokasi"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                  ></textarea>
                </div>

                <!-- Provinsi -->
                <ValidationProvider name="id_provinsi" rules="required">
                  <div
                    class="form-group w-full items-center mb-5"
                    slot-scope="{ errors, valid }"
                  >
                    <label for="" class="w-4/12">Provinsi</label>
                    <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_provinsi"
                      :loading="isLoadingGetProvinsi"
                      :options="lookup_custom1.data"
                      :filterable="false"
                      @search="onGetProvinsi"
                      :reduce="(item) => item.provinsi_id"
                      v-model="parameters.form.provinsi_id"
                      @input="onSelectProvinsi"
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
                          @click="onGetProvinsi(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom1.last_page >
                            lookup_custom1.current_page
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

                <!-- Kota -->
                <div class="form-group w-full items-center mb-5">
                  <label for="" class="w-4/12">Kota</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_kota"
                    :loading="isLoadingGetKota"
                    :options="lookup_custom2.data"
                    :filterable="false"
                    @search="onGetKota"
                    :reduce="(item) => item.kota_id"
                    v-model="parameters.form.kota_id"
                    @input="onSelectKota"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom2.data.length || search"
                    >
                      <span
                        v-if="lookup_custom2.current_page > 1"
                        @click="onGetKota(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom2.last_page > lookup_custom2.current_page
                        "
                        @click="onGetKota(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>

                <!-- Kecamatan -->
                <div class="form-group w-full items-center mb-5">
                  <label for="" class="w-4/12">Kecamatan</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_kecamatan"
                    :loading="isLoadingGetKecamatan"
                    :options="lookup_custom3.data"
                    :filterable="false"
                    @search="onGetKecamatan"
                    :reduce="(item) => item.kecamatan_id"
                    v-model="parameters.form.kecamatan_id"
                    @input="onSelectKecamatan"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom3.data.length || search"
                    >
                      <span
                        v-if="lookup_custom3.current_page > 1"
                        @click="onGetKecamatan(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom3.last_page > lookup_custom3.current_page
                        "
                        @click="onGetKecamatan(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>

                <!-- Kelurahan -->
                <div class="form-group w-full items-center mb-5">
                  <label for="" class="w-4/12">Kelurahan</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_kelurahan"
                    :loading="isLoadingGetKelurahan"
                    :options="lookup_beam.data"
                    :filterable="false"
                    @search="onGetKelurahan"
                    :reduce="(item) => item.kelurahan_id"
                    v-model="parameters.form.kelurahan_id"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_beam.data.length || search"
                    >
                      <span
                        v-if="lookup_beam.current_page > 1"
                        @click="onGetKelurahan(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="lookup_beam.last_page > lookup_beam.current_page"
                        @click="onGetKelurahan(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>

                <!-- Kode Pos -->
                <ValidationProvider
                  name="kode_pos"
                  rules="required"
                  ref="ruteProvider"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Kode Pos"
                      type="text"
                      name="kode_pos"
                      v-model="parameters.form.kode_pos"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <!-- Nama Pemilik -->
                <ValidationProvider
                  name="nama_pemilik"
                  rules="required"
                  ref="ruteProvider"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Nama Pemilik"
                      type="text"
                      name="nama_pemilik"
                      v-model="parameters.form.nama_pemilik"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <!-- Alamat Pemilik -->
                <div class="form-group">
                  <label for="alamat_pemilik">Alamat Pemilik</label>
                  <textarea
                    placeholder="Alamat Pemilik"
                    v-model="parameters.form.alamat_pemilik"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                  ></textarea>
                </div>

                <!-- No Telepon -->
                <ValidationProvider
                  name="no_telp"
                  rules="required"
                  ref="ruteProvider"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Nomor Telepon"
                      type="text"
                      name="no_telp"
                      v-model="parameters.form.no_telp"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <!-- No HP -->
                <ValidationProvider
                  name="no_hp"
                  rules="required"
                  ref="ruteProvider"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Nomor HP"
                      type="text"
                      name="no_hp"
                      v-model="parameters.form.no_hp"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <!-- Nilai Plafon -->
                <div class="form-group col-12">
                  <label for="nilai_plafon">Nilai Plafon</label>
                  <money
                    v-model="parameters.form.nilai_plafon"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-small">* Rupiah</div>
                </div>

                <!-- No NPWP -->
                <div class="form-group">
                  <input-form
                    label="Nomor NPWP"
                    type="text"
                    name="no_npwp"
                    v-model="parameters.form.no_npwp"
                  />
                </div>

                <!-- Email -->
                <div class="form-group">
                  <input-form
                    label="Email"
                    type="email"
                    name="email"
                    v-model="parameters.form.email"
                  />
                </div>

                <!-- Longitude -->
                <ValidationProvider
                  name="longitude"
                  rules="required"
                  ref="ruteProvider"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Longitude"
                      type="text"
                      name="longitude"
                      v-model="parameters.form.longitude"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <!-- Latitude -->
                <ValidationProvider
                  name="latitude"
                  rules="required"
                  ref="ruteProvider"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Latitude"
                      type="text"
                      name="latitude"
                      v-model="parameters.form.latitude"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <!-- Radius (belom ada error message kalo belom ke isi) -->
                <ValidationProvider name="radius" rules="required">
                  <div class="form-group col-12" slot-scope="{ errors, valid }">
                    <label for="radius">Radius</label>
                    <money
                      v-model="parameters.form.radius"
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      @keydown.native="
                        $event.key === '-' ? $event.preventDefault() : null
                      "
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div class="text-muted text-small">* Meter</div>
                    <div class="text-sm text-danger" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <!-- Longitude 2 -->
                <div class="form-group">
                  <input-form
                    label="Longitude 2"
                    type="text"
                    name="longitude2"
                    v-model="parameters.form.longitude2"
                  />
                </div>

                <!-- Latitude 2 -->
                <div class="form-group">
                  <input-form
                    label="Latitude 2"
                    type="text"
                    name="latitude2"
                    v-model="parameters.form.latitude2"
                  />
                </div>

                <!-- Radius 2 -->
                <div class="form-group col-12">
                  <label for="radius2">Radius 2</label>
                  <money
                    v-model="parameters.form.radius2"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-small">* Meter</div>
                </div>

                <!-- Longitude 3 -->
                <div class="form-group">
                  <input-form
                    label="Longitude 3"
                    type="text"
                    name="longitude3"
                    v-model="parameters.form.longitude3"
                  />
                </div>

                <!-- Latitude 3 -->
                <div class="form-group">
                  <input-form
                    label="Latitude 3"
                    type="text"
                    name="latitude3"
                    v-model="parameters.form.latitude3"
                  />
                </div>

                <!-- Radius 3 -->
                <div class="form-group col-12">
                  <label for="radius3">Radius 3</label>
                  <money
                    v-model="parameters.form.radius3"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-small">* Meter</div>
                </div>

                <!-- Alamat -->
                <div class="form-group">
                  <input-form
                    label="Alamat"
                    type="text"
                    name="alamat"
                    v-model="parameters.form.alamat"
                  />
                </div>

                <!-- Tipe Lokasi -->
                <div class="form-group"></div>
              </div>
              <modal-footer-section
                class="mt-5"
                :isLoadingForm="isLoadingForm"
                @reset="formReset()"
              />
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    return {
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

      isEditable: false,
      isLoadingForm: false,
      title: "Lokasi Toko",
      parameters: {
        url: "master/lokasi",
        form: {
          lokasi_id_induk: "",
          kode_referensi: "",
          kode_lokasi: "",
          nama_lokasi: "",
          alamat_lokasi: "",
          kelurahan_id: "",
          kecamatan_id: "",
          kota_id: "",
          provinsi_id: "",
          kode_pos: "",
          nama_pemilik: "",
          alamat_pemilik: "",
          no_telp: "",
          no_hp: "",
          nilai_plafon: "",
          no_npwp: "",
          email: "",
          longitude: "",
          latitude: "",
          radius: "",
          longitude2: "",
          latitude2: "",
          radius2: "",
          longitude3: "",
          latitude3: "",
          radius3: "",
          alamat: "",
          tipe_lokasi: "",
        },
      },
    };
  },

  async mounted() {
    await this.onSearchProvinsi();
    await this.onSearchKota();
    await this.onSearchKecamatan();
    await this.onSearchKelurahan();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_beam",
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
          id: this.parameters.form.lokasi_id
            ? this.parameters.form.lokasi_id
            : "",
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.self.onLoad(this.self.parameters.params.page);
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );

        this.isEditable = false;
        this.parameters.form = {
          lokasi_id_induk: "",
          kode_referensi: "",
          nama_lokasi: "",
          alamat_lokasi: "",
          kelurahan_id: "",
          kecamatan_id: "",
          kota_id: "",
          provinsi_id: "",
          kode_pos: "",
          nama_pemilik: "",
          alamat_pemilik: "",
          no_telp: "",
          no_hp: "",
          nilai_plafon: "",
          no_npwp: "",
          email: "",
          longitude: "",
          latitude: "",
          radius: "",
          longitude2: "",
          latitude2: "",
          radius2: "",
          longitude3: "",
          latitude3: "",
          radius3: "",
          alamat: "",
          tipe_lokasi: "",
        };
        this.$refs.ruteProvider.reset();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
        console.log("error", this.error);
      }

      this.isLoadingForm = false;
    },

    onGetProvinsi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProvinsi);

      this.isStopSearchProvinsi = setTimeout(() => {
        this.provinsi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
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
          lookup: "custom1",
          query:
            "?search=" +
            this.provinsi_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProvinsi = false;
        console.log(this.lookup_custom1.data);
      }
    },

    onGetKota(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKota);

      this.isStopSearchKota = setTimeout(() => {
        this.kota_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
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
          lookup: "custom2",
          query:
            "?search=" +
            this.kota_search +
            "&provinsi_id=" +
            this.parameters.form.provinsi_id +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKota = false;
        console.log(this.lookup_custom2.data);
      }
    },

    onGetKecamatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKecamatan);

      this.isStopSearchKecamatan = setTimeout(() => {
        this.kecamatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
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
          lookup: "custom3",
          query:
            "?search=" +
            this.kecamatan_search +
            "&kota_id=" +
            this.parameters.form.kota_id +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKecamatan = false;
        console.log(this.lookup_custom3.data);
      }
    },

    onGetKelurahan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKelurahan);

      this.isStopSearchKelurahan = setTimeout(() => {
        this.kelurahan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_beam.current_page = isNext
            ? this.lookup_beam.current_page + 1
            : this.lookup_beam.current_page - 1;
        } else {
          this.lookup_beam.current_page = 1;
        }

        this.onSearchKelurahan();
      }, 600);
    },

    async onSearchKelurahan() {
      if (!this.isLoadingGetKelurahan) {
        this.isLoadingGetKelurahan = true;

        await this.lookUp({
          url: "master/kelurahan",
          lookup: "beam",
          query:
            "?search=" +
            this.kelurahan_search +
            "&kecamatan_id=" +
            this.parameters.form.kecamatan_id +
            "&page=" +
            this.lookup_beam.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKelurahan = false;
        console.log(this.lookup_beam.data);
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        lokasi_id_induk: "",
        kode_referensi: "",
        nama_lokasi: "",
        alamat_lokasi: "",
        kelurahan_id: "",
        kecamatan_id: "",
        kota_id: "",
        provinsi_id: "",
        kode_pos: "",
        nama_pemilik: "",
        alamat_pemilik: "",
        no_telp: "",
        no_hp: "",
        nilai_plafon: "",
        no_npwp: "",
        email: "",
        longitude: "",
        latitude: "",
        radius: "",
        longitude2: "",
        latitude2: "",
        radius2: "",
        longitude3: "",
        latitude3: "",
        radius3: "",
        alamat: "",
        tipe_lokasi: "",
      };
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

    changeStatus() {
      this.parameters.form.kelurahan_id = "";
    },
  },
};
</script>
