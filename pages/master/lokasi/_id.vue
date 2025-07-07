<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Lokasi Shipto
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Lokasi Shipto
        </h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
    </div>
    <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
      <form
        @submit.prevent="validate().then(() => onSubmit(invalid))"
        autocomplete="off"
      >
        <div class="grid grid-cols-2 gap-2 w-full">
          <div class="form-group w-full items-center mb-5">
            <label for="">Lokasi Shipto Induk</label>
            <v-select
              class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
              label="nama_lokasi"
              :loading="isLoadingGetLokasi"
              :options="lookup_location.data"
              :filterable="false"
              @search="onGetLokasi"
              :reduce="(item) => item.lokasi_id"
              v-model="parameters.form.lokasi_id_induk"
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
          <div class="form-group w-full items-center mb-5">
            <label for="tipe_lokasi">Tipe Lokasi</label>
            <select
              class="w-full pl-2 py-1 border rounded focus:outline-none"
              v-model="parameters.form.tipe_lokasi"
            >
              <option
                v-for="(item, i) in lookup_sellers"
                :key="i"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 w-full">
          <ValidationProvider name="kode_referensi" rules="required">
            <div class="form-group">
              <input-form
                label="Kode Referensi"
                type="text"
                name="kode_referensi"
                :required="true"
                v-model="parameters.form.kode_referensi"
              />
            </div>
          </ValidationProvider>
          <ValidationProvider name="kode_lokasi" rules="required">
            <div class="form-group">
              <input-form
                label="Kode Lokasi"
                type="text"
                name="kode_lokasi"
                :required="true"
                v-model="parameters.form.kode_lokasi"
              />
            </div>
          </ValidationProvider>
          <ValidationProvider name="nama_lokasi" rules="required">
            <div class="form-group">
              <input-form
                label="Nama Lokasi"
                type="text"
                name="nama_lokasi"
                :required="true"
                v-model="parameters.form.nama_lokasi"
              />
            </div>
          </ValidationProvider>
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
              :required="true"
              v-model="parameters.form.kode_pos"
            />
          </div>
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
              label="Email"
              type="email"
              name="email"
              :required="false"
              v-model="parameters.form.email"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Nilai Plafon"
              type="number"
              name="nilai_plafon"
              :required="false"
              v-model="parameters.form.nilai_plafon"
            />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2 w-full">
          <div class="form-group">
            <input-form
              label="Nomor Telepon"
              type="text"
              name="no_telp"
              :required="true"
              v-model="parameters.form.no_telp"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Nomor HP"
              type="text"
              name="no_hp"
              :required="true"
              v-model="parameters.form.no_hp"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Nomor NPWP"
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
              label="Longitude"
              type="text"
              name="longitude"
              :required="true"
              v-model="parameters.form.longitude"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Latitude"
              type="text"
              name="latitude"
              :required="true"
              v-model="parameters.form.latitude"
            />
          </div>
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
        <div class="grid grid-cols-3 gap-2 w-full">
          <div class="form-group">
            <input-form
              label="Longitude 2"
              type="text"
              name="longitude2"
              :required="false"
              v-model="parameters.form.longitude2"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Latitude 2"
              type="text"
              name="latitude2"
              :required="false"
              v-model="parameters.form.latitude2"
            />
          </div>
          <ValidationProvider name="radius2" rules="required">
            <div class="form-group col-12">
              <label for="radius2">Radius 2 </label>
              <money
                v-model="parameters.form.radius2"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
              <div class="text-muted text-small">* Meter</div>
            </div>
          </ValidationProvider>
        </div>
        <div class="grid grid-cols-3 gap-2 w-full">
          <div class="form-group">
            <input-form
              label="Longitude 3"
              type="text"
              name="longitude3"
              :required="false"
              v-model="parameters.form.longitude3"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Latitude 3"
              type="text"
              name="latitude3"
              :required="false"
              v-model="parameters.form.latitude3"
            />
          </div>
          <ValidationProvider name="radius3" rules="required">
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
          </ValidationProvider>
        </div>
        <div class="grid grid-cols-3 gap-2 w-full">
          <div class="form-group">
            <label for="alamat">Alamat</label>
            <textarea
              placeholder="Alamat"
              class="w-full pl-2 py-1 border rounded focus:outline-none"
              v-model="parameters.form.alamat"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="alamat_lokasi">Alamat Lokasi</label>
            <textarea
              placeholder="Alamat Lokasi"
              class="w-full pl-2 py-1 border rounded focus:outline-none"
              v-model="parameters.form.alamat_lokasi"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="alamat_pemilik">Alamat Pemilik</label>
            <textarea
              placeholder="Alamat Pemilik"
              class="w-full pl-2 py-1 border rounded focus:outline-none"
              v-model="parameters.form.alamat_pemilik"
            ></textarea>
          </div>
        </div>
        <div class="flex w-full justify-start">
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
import { ValidationProvider } from "vee-validate";
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

      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Lokasi Toko",
      parameters: {
        url: "master/lokasi",
        form: {
          lokasi_id_induk: "",
          tipe_lokasi: "T",
          kode_referensi: "",
          kode_lokasi: "",
          nama_lokasi: "",
          negara_id: "",
          provinsi_id: "",
          kota_id: "",
          kecamatan_id: "",
          kelurahan_id: "",
          kode_pos: "",
          nama_pemilik: "",
          email: "",
          nilai_plafon: "",
          no_telp: "",
          no_hp: "",
          no_npwp: "",
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
          alamat_lokasi: "",
          alamat_pemilik: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get("master/lokasi/" + this.id);
        this.parameters.form = {
          ...res.data,
          radius: res.data.radius || 0,
          radius2: res.data.radius2 || 0,
          radius3: res.data.radius3 || 0,
        };
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchNegara();
    await this.onSearchProvinsi();
    await this.onSearchKota();
    await this.onSearchKecamatan();
    await this.onSearchKelurahan();
    await this.onSearchLokasi();
    await this.lookUp({
      url: "utility",
      lookup: "sellers",
      query: "?q=tipe_lokasi",
    });
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
      "lookup_location", //lokasi
      "lookup_sellers", //tipe lokasi
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
        this.$toaster.success(
          "Data berhasi; di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );

        this.isEditable = false;
        this.parameters.form = {
          lokasi_id_induk: "",
          tipe_lokasi: "T",
          kode_referensi: "",
          kode_lokasi: "",
          nama_lokasi: "",
          negara_id: "",
          provinsi_id: "",
          kota_id: "",
          kecamatan_id: "",
          kelurahan_id: "",
          kode_pos: "",
          nama_pemilik: "",
          email: "",
          nilai_plafon: "",
          no_telp: "",
          no_hp: "",
          no_npwp: "",
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
          alamat_lokasi: "",
          alamat_pemilik: "",
        };
        this.$refs.formValidate.reset();
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
      }
    },

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
        lokasi_id_induk: "",
        kode_referensi: "",
        kode_lokasi: "",
        nama_lokasi: "",
        alamat_lokasi: "",
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
  },
};
</script>
