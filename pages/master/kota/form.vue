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
                <ValidationProvider name="id_negara" rules="required">
                  <div class="form-group w-full items-center mb-5">
                    <label for="" class="w-4/12">Negara</label>
                    <v-select
                      v-if="
                        lookup_custom1.data && lookup_custom1.data.length > 0
                      "
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
                            lookup_custom1.last_page >
                            lookup_custom1.current_page
                          "
                          @click="onGetNegara(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li>
                    </v-select>
                    <span v-else>Loading Negara...</span>
                  </div>
                </ValidationProvider>

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
                      :options="lookup_custom2.data"
                      :filterable="false"
                      @search="onGetProvinsi"
                      :reduce="(item) => item.provinsi_id"
                      v-model="parameters.form.provinsi_id"
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
                    <div v-if="errors[0]" class="text-danger">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  name="nama_kota"
                  rules="required"
                  ref="ruteProvider"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Nama Kota"
                      type="text"
                      name="nama_kota"
                      v-model="parameters.form.nama_kota"
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
                  name="koordinat"
                  rules="required"
                  ref="ruteProvider"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Koordinat"
                      type="text"
                      name="koordinat"
                      v-model="parameters.form.koordinat"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
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
      isStopSearchNegara: false,
      isLoadingGetNegara: false,
      negara_search: "",

      isStopSearchProvinsi: false,
      isLoadingGetProvinsi: false,
      provinsi_search: "",

      isEditable: false,
      isLoadingForm: false,
      title: "Kota",
      parameters: {
        url: "master/kota",
        form: {
          negara_id: "",
          provinsi_id: "",
          nama_kota: "",
          koordinat: "",
        },
      },
    };
  },

  async mounted() {
    // await Promise.all([
    //   ]);
    await this.onSearchNegara();
    await this.onSearchProvinsi();
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
          id: this.parameters.form.kota_id ? this.parameters.form.kota_id : "",
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
          negara_id: "",
          provinsi_id: "",
          nama_kota: "",
          koordinat: "",
        };
        this.$refs.ruteProvider.reset();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
        console.log("error", this.error);
      }

      this.isLoadingForm = false;
    },

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

        try {
          const response = await this.lookUp({
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
        } catch (error) {
          this.isLoadingGetNegara = false;
          console.error("Error", error);
        }
      }
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
        console.log(this.lookup_custom2.data);
      }
    },

    changeStatus() {
      this.parameters.provinsi_id = "";
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        negara_id: "",
        provinsi_id: "",
        nama_kota: "",
        koordinat: "",
      };
    },

    onSelectNegara() {
      this.parameters.form.provinsi_id = "";
      this.onSearchProvinsi();
    },
  },
};
</script>
