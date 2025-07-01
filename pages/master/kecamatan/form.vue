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
                  name="negara_id"
                  rules="required"
                >
                  <div slot-scope="{ errors, valid }">
                    <div class="form-group w-full items-center mb-5">
                      <label for="" class="w-4/12">Negara</label>
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_negara"
                        :loading="isLoadingGetNegara"
                        :options="lookup_custom3.data"
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
                          v-if="lookup_custom3.data.length || search"
                        >
                          <span
                            v-if="lookup_custom3.current_page > 1"
                            @click="onGetNegara(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom3.last_page >
                              lookup_custom3.current_page
                            "
                            @click="onGetNegara(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>

                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  ref="inputProvider"
                  name="kota_id"
                  rules="required"
                >
                  <div slot-scope="{ errors, valid }">
                    <div class="form-group w-full items-center mb-5">
                      <label for="" class="w-4/12">Provinsi</label>
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

                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  ref="inputProvider"
                  name="kota_id"
                  rules="required"
                >
                  <div slot-scope="{ errors, valid }">
                    <div class="form-group w-full items-center mb-5">
                      <label for="" class="w-4/12">Kota</label>
                      <v-select
                        class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                        label="nama_kota"
                        :loading="isLoadingGetKota"
                        :options="lookup_custom1.data"
                        :filterable="false"
                        @search="onGetKota"
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
                            @click="onGetKota(search, false)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Sebelumnya</span
                          >
                          <span
                            v-if="
                              lookup_custom1.last_page >
                              lookup_custom1.current_page
                            "
                            @click="onGetKota(search, true)"
                            class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                            >Selanjutnya</span
                          >
                        </li>
                      </v-select>
                    </div>
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  ref="inputProvider"
                  name="nama_kecamatan"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Nama Kecamatan"
                      type="text"
                      name="nama_kecamatan"
                      v-model="parameters.form.nama_kecamatan"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  ref="inputProvider"
                  name="koordinat"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <label>Koordinat</label>
                    <textarea
                      name="koordinat"
                      v-model="parameters.form.koordinat"
                      class="w-full border border-gray-300 rounded-md bg-white outline-none active:outline-none"
                    />
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
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
      isStopSearchProvinsi: false,
      isLoadingGetProvinsi: false,
      provinsi_search: "",

      isStopSearchNegara: false,
      isLoadingGetNegara: false,
      negara_search: "",

      isStopSearchKota: false,
      isLoadingGetKota: false,
      kota_search: "",

      isEditable: false,
      isLoadingForm: false,
      title: "Kecamatan",
      parameters: {
        url: "master/kecamatan",
        form: {
          nama_kecamatan: "",
          koordinat: "",
          kota_id: "",
          provinsi_id: "",
          negara_id: "",
        },
      },
    };
  },

  async mounted() {
    await this.onSearchNegara();
    await this.onSearchProvinsi();
    await this.onSearchKota();
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
          id: this.parameters.form.kecamatan_id
            ? this.parameters.form.kecamatan_id
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
          kota_id: "",
          provinsi_id: "",
          negara_id: "",
          nama_kecamatan: "",
          koordinat: "",
        };

        this.$refs.formValidate.reset();
      } else {
        console.log(this.parameters.form);
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
        this.onSearchKota();
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
            "&negara_id=" +
            this.parameters.form.negara_id +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProvinsi = false;
      }
    },

    onGetKota(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchKota);

      this.isStopSearchKota = setTimeout(() => {
        this.kota_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchKota();
      }, 600);
    },

    async onSearchKota() {
      if (!this.isLoadingGetKota) {
        this.isLoadingGetKota = true;

        await this.lookUp({
          url: "master/kota/get-kota",
          lookup: "custom1",
          query:
            "?search=" +
            this.kota_search +
            "&provinsi_id=" +
            this.parameters.form.provinsi_id +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetKota = false;
      }
    },

    onGetNegara(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchNegara);

      this.isStopSearchNegara = setTimeout(() => {
        this.negara_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
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
          lookup: "custom3",
          query:
            "?search=" +
            this.negara_search +
            "&provinsi_id=" +
            this.parameters.form.provinsi_id +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetNegara = false;
      }
    },

    // onSelectKota(kota_id) {
    //   const item = this.lookup_custom1.data.find((a) => a.kota_id === kota_id);
    //   if (item) {
    //     this.parameters.form.negara_id = item.negara_id;
    //   }
    // },

    changeProv() {
      this.parameters.kota_id = "";
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kota_id: "",
        provinsi_id: "",
        negara_id: "",
        nama_kecamatan: "",
        koordinat: "",
      };
    },

    onSelectNegara() {
      this.parameters.form.provinsi_id = "";
      this.onSearchProvinsi();
    },
    onSelectProvinsi() {
      this.parameters.form.kota_id = "";
      this.onSearchKota();
    },
  },
};
</script>
