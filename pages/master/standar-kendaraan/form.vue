<template>
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
              <div class="flex gap-2">
                <ValidationProvider
                  name="jenis_kendaraan"
                  rules="required"
                  class="w-1/2"
                >
                  <div
                    class="form-group w-full items-center mb-5"
                    slot-scope="{ errors, valid }"
                  >
                    <label for="" class=""
                      >Jenis Kendaraan <span class="text-danger">*</span></label
                    >
                    <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_jenis_kendaraan"
                      :loading="isLoadingGetJenisKendaraan"
                      :options="lookup_custom1.data"
                      :filterable="false"
                      @search="onGetJenisKendaraan"
                      :reduce="(item) => item.jenis_kendaraan_id"
                      v-model="parameters.form.jenis_kendaraan_id"
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
                    <div v-if="errors[0]" class="text-danger text-xs">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  name="gudang"
                  rules="required"
                  class="w-1/2"
                >
                  <div
                    class="form-group w-full items-center mb-5"
                    slot-scope="{ errors, valid }"
                  >
                    <label for="" class=""
                      >Gudang <span class="text-danger">*</span></label
                    >
                    <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_gudang"
                      :loading="isLoadingGetGudang"
                      :options="lookup_custom2.data"
                      :filterable="false"
                      @search="onGetGudang"
                      :reduce="(item) => item.gudang_id"
                      v-model="parameters.form.gudang_id"
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
                          @click="onGetGudang(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom2.last_page >
                            lookup_custom2.current_page
                          "
                          @click="onGetGudang(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                    <div v-if="errors[0]" class="text-danger text-xs">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>
              </div>

              <div class="flex gap-2">
                <!-- Kecepatan Isi -->
                <div class="form-group col-12 w-1/2">
                  <label for="kecepatan_isi"
                    >Kecepatan Isi <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.kecepatan_isi"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-sm pl-1 pt-1">* km/jam</div>
                </div>

                <!-- Kecepatan Kosong -->
                <div class="form-group col-12 w-1/2">
                  <label for="kecepatan_kosong"
                    >Kecepatan Kosong <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.kecepatan_kosong"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-sm pl-1 pt-1">* km/jam</div>
                </div>
              </div>

              <div class="flex gap-2">
                <!-- Standar Muat -->
                <div class="form-group col-12 w-1/3">
                  <label for="standar_muat"
                    >Standar Muat <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.standar_muat"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-sm pl-1 pt-1">* jam</div>
                </div>

                <!-- Standar Bongkar -->
                <div class="form-group col-12 w-1/3">
                  <label for="standar_bongkar"
                    >Standar Bongkar <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.standar_bongkar"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-sm pl-1 pt-1">* jam</div>
                </div>

                <!-- Standar Istirahat -->
                <div class="form-group col-12 w-1/3">
                  <label for="standar_istirahat"
                    >Standar Istirahat <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.standar_istirahat"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-sm pl-1 pt-1">* per km</div>
                </div>
              </div>

              <div class="flex gap-2">
                <!-- Minimal Muat -->
                <div class="form-group col-12 w-1/2">
                  <label for="minimal_muat"
                    >Minimal Muat <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.minimal_muat"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-sm pl-1 pt-1">* kg</div>
                </div>

                <!-- Maksimal Muat -->
                <div class="form-group col-12 w-1/2">
                  <label for="maksimal_muat"
                    >Maksimal Muat <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.maksimal_muat"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-sm pl-1 pt-1">* kg</div>
                </div>
              </div>

              <div class="flex gap-2">
                <!-- Konsumsi BBM -->
                <div class="form-group col-12 w-1/2">
                  <label for="konsumsi_bbm"
                    >Konsumsi BBM <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.konsumsi_bbm"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-sm pl-1 pt-1">* km/liter</div>
                </div>

                <!-- Nilai / Biaya -->
                <div class="form-group col-12 w-1/2">
                  <label for="nilai"
                    >Biaya <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.nilai"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-sm pl-1 pt-1">* km/rupiah</div>
                </div>
              </div>

              <div class="flex gap-2">
                <!-- Biaya BBM Muat -->
                <div class="form-group col-12 w-1/2">
                  <label for="biaya_bbm_muat"
                    >Biaya BBM Muat <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.biaya_bbm_muat"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-sm pl-1 pt-1">* rupiah</div>
                </div>

                <!-- Biaya BBM Kosong -->
                <div class="form-group col-12 w-1/2">
                  <label for="biaya_bbm_kosong"
                    >Biaya BBM Kosong <span class="text-danger">*</span></label
                  >
                  <money
                    v-model="parameters.form.biaya_bbm_kosong"
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                  <div class="text-muted text-sm pl-1 pt-1">* rupiah</div>
                </div>
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
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    return {
      isStopSearchJenisKendaraan: false,
      isLoadingGetJenisKendaraan: false,
      jenis_kendaraan_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isEditable: false,
      isLoadingForm: false,
      title: "Standar Jenis Kendaraan",
      parameters: {
        url: "master/standar-jenis-kendaraan",
        form: {
          jenis_kendaraan_id: "",
          gudang_id: "",
          kecapatan_isi: "",
          kecepatan_kosong: "",
          standar_muat: "",
          standar_bongkar: "",
          standar_istirahat: "",
          minimal_muat: "",
          maksimal_muat: "",
          konsumsi_bbm: "",
          nilai: "",
          biaya_bbm_muat: "",
          biaya_bbm_kosong: "",
        },
      },
    };
  },

  async mounted() {
    await this.onSearchJenisKendaraan();
    await this.onSearchGudang();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
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
          id: this.parameters.form.standar_jenis_kendaraan_id
            ? this.parameters.form.standar_jenis_kendaraan_id
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
          jenis_kendaraan_id: "",
          gudang_id: "",
          kecapatan_isi: "",
          kecepatan_kosong: "",
          standar_muat: "",
          standar_bongkar: "",
          standar_istirahat: "",
          minimal_muat: "",
          maksimal_muat: "",
          konsumsi_bbm: "",
          nilai: "",
          biaya_bbm_muat: "",
          biaya_bbm_kosong: "",
        };

        this.$refs.formValidate.reset();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    onGetJenisKendaraan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisKendaraan);

      this.isStopSearchJenisKendaraan = setTimeout(() => {
        this.jenis_kendaraan_search = search;

        if (typeof isNext !== "function") {
          this.lookupcustom1.current_page = isNext
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

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }
        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom2",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },
  },
};
</script>
