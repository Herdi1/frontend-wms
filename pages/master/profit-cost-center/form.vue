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
                <ValidationProvider
                  ref="inputProvider"
                  name="kode_profit_cost"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Kode Profit Cost"
                      type="text"
                      name="kode_profit_cost"
                      :required="true"
                      v-model="parameters.form.kode_profit_cost"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  ref="inputProvider"
                  name="wilayah_id"
                  rules="required"
                >
                  <div class="form-group w-full items-center mb-5">
                    <label for="" class="w-4/12"
                      >Regional<span class="text-danger">*</span></label
                    >
                    <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_wilayah"
                      :loading="isLoadingGetWilayah"
                      :options="lookup_custom3.data"
                      :filterable="false"
                      @search="onGetWilayah"
                      :reduce="(item) => item.wilayah_id"
                      v-model="parameters.form.wilayah_id"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom3.data.length || search"
                      >
                        <span
                          v-if="lookup_custom3.current_page > 1"
                          @click="onGetWilayah(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom3.last_page >
                            lookup_custom3.current_page
                          "
                          @click="onGetWilayah(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  ref="inputProvider"
                  name="cabang"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Cabang"
                      type="text"
                      name="cabang"
                      :required="true"
                      v-model="parameters.form.cabang"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  ref="inputProvider"
                  name="profit_center"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Profit Center"
                      type="text"
                      name="profit_center"
                      :required="true"
                      v-model="parameters.form.profit_center"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  ref="inputProvider"
                  name="cost_center"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Cost Center"
                      type="text"
                      name="cost_center"
                      :required="true"
                      v-model="parameters.form.cost_center"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                  </div>
                </ValidationProvider>
                <!-- <ValidationProvider
                  ref="inputProvider"
                  name="nama_wilayah"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Nama Regional"
                      type="text"
                      name="nama_wilayah"
                      v-model="parameters.form.nama_wilayah"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider> -->

                <ValidationProvider
                  ref="inputProvider"
                  name="provinsi_id"
                  rules="required"
                >
                  <div class="form-group w-full items-center mb-5">
                    <label for="" class="w-4/12"
                      >Provinsi<span class="text-danger">*</span></label
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
                            lookup_custom2.last_page >
                            lookup_custom2.current_page
                          "
                          @click="onGetProvinsi(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  ref="inputProvider"
                  name="kota_id"
                  rules="required"
                >
                  <div class="form-group w-full items-center mb-5">
                    <label for="" class="w-4/12"
                      >Kota<span class="text-danger">*</span></label
                    >
                    <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="nama_kota"
                      :loading="isLoadingGetKabupaten"
                      :options="lookup_custom1.data"
                      :filterable="false"
                      @search="onGetKabupaten"
                      :reduce="(item) => item.kota_id"
                      v-model="parameters.form.kota_id"
                    >
                      <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-1 border-t flex justify-between"
                        v-if="lookup_custom1.data.length || search"
                      >
                        <span
                          v-if="lookup_custom1.current_page > 1"
                          @click="onGetKabupaten(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom1.last_page >
                            lookup_custom1.current_page
                          "
                          @click="onGetKabupaten(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                  </div>
                </ValidationProvider>
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
      isStopSearchWilayah: false,
      isLoadingGetWilayah: false,
      wilayah_search: "",

      isStopSearchProvinsi: false,
      isLoadingGetProvinsi: false,
      provinsi_search: "",

      isStopSearchKabupaten: false,
      isLoadingGetKabupaten: false,
      kabupaten_search: "",

      isEditable: false,
      isLoadingForm: false,
      title: "Profit & Cost",
      parameters: {
        url: "master/profit-cost",
        form: {
          kode_profit_cost: "",
          wilayah_id: "",
          cabang: "",
          profit_center: "",
          cost_center: "",
          nama_wilayah: "",
          provinsi_id: "",
          kota_id: "",
        },
      },
    };
  },

  async mounted() {
    await this.onSearchWilayah();
    await this.onSearchProvinsi();
    await this.onSearchKabupaten();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
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
          id: this.parameters.form.profit_cost_id
            ? this.parameters.form.profit_cost_id
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
          "Data berhasi; di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );

        this.isEditable = false;
        this.parameters.form = {
          kode_profit_cost: "",
          wilayah_id: "",
          cabang: "",
          profit_center: "",
          cost_center: "",
          nama_wilayah: "",
          provinsi_id: "",
          kota_id: "",
        };

        this.$refs.formValidate.reset();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

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
        this.onSearchKabupaten();
      }, 600);
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
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProvinsi = false;
      }
    },

    onGetKabupaten(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKabupaten);

      this.isStopSearchKabupaten = setTimeout(() => {
        this.kabupaten_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchKabupaten();
      }, 600);
    },

    async onSearchKabupaten() {
      if (!this.isLoadingGetKabupaten) {
        this.isLoadingGetKabupaten = true;

        await this.lookUp({
          url: "master/kota/get-kota",
          lookup: "custom1",
          query:
            "?search=" +
            this.kabupaten_search +
            "&provinsi_id=" +
            this.parameters.form.provinsi_id +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKabupaten = false;
      }
    },

    onGetWilayah(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchWilayah);

      this.isStopSearchWilayah = setTimeout(() => {
        this.wilayah_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchWilayah();
      }, 600);
    },

    async onSearchWilayah() {
      if (!this.isLoadingGetWilayah) {
        this.isLoadingGetWilayah = true;

        await this.lookUp({
          url: "master/wilayah/get-wilayah",
          lookup: "custom3",
          query:
            "?search=" +
            this.wilayah_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetWilayah = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_profit_cost: "",
        wilayah_id: "",
        cabang: "",
        profit_center: "",
        cost_center: "",
        nama_wilayah: "",
        provinsi_id: "",
        kota_id: "",
      };
    },
  },
};
</script>
