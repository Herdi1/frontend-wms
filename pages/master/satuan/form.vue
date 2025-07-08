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
                  name="kode_satuan"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Kode Satuan"
                      type="text"
                      name="kode_satuan"
                      :required="true"
                      v-model="parameters.form.kode_satuan"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  ref="inputProvider"
                  name="nama_satuan"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Nama Satuan"
                      type="text"
                      name="nama_satuan"
                      :required="true"
                      v-model="parameters.form.nama_satuan"
                      :inputClass="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  ref="inputProvider"
                  name="jenis_satuan"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <label for="parent_id"
                      >Jenis Satuan <span class="text-danger">*</span></label
                    >
                    <select
                      class="w-full pl-2 py-1 border rounded focus:outline-none"
                      name="jenis_satuan_id"
                      id="jenis_satuan_id"
                      v-model="parameters.form.jenis_satuan_id"
                    >
                      <option value="">Pilih</option>
                      <option
                        v-for="(jenis_satuan, index) in lookup_custom1"
                        :key="index"
                        :value="jenis_satuan.jenis_satuan_id"
                      >
                        {{ jenis_satuan.nama_jenis_satuan }}
                      </option>
                    </select>
                    <!-- <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-3"
                      id="status"
                      label="label"
                      :options="lookup_custom1"
                      :reduce="(item) => item.value"
                      v-model="parameters.form.jenis_satuan"
                    ></v-select> -->
                    <!-- <v-select
                      class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                      label="label"
                      :options="lookup_custom1"
                      :filterable="false"
                      :reduce="(item) => item.value"
                      v-model="parameters.form.jenis_satuan"
                    > -->
                    <!-- <li
                        slot-scope="{ search }"
                        slot="list-footer"
                        class="p-2 border-t flex justify-between"
                        v-if="lookup_custom1.data.length || search"
                      >
                        <span
                          v-if="lookup_custom1.current_page > 1"
                          @click="onGetUtil(search, false)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Sebelumnya</span
                        >
                        <span
                          v-if="
                            lookup_custom1.last_page >
                            lookup_custom1.current_page
                          "
                          @click="onGetUtil(search, true)"
                          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                          >Selanjutnya</span
                        >
                      </li> -->
                    <!-- </v-select> -->
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

  async mounted() {
    await this.onSearchUtil();
  },

  data() {
    return {
      // utilOptions: [],
      isStopSearchUtil: false,
      isLoadingGetUtil: false,
      util_search: "",

      isEditable: false,
      isLoadingForm: false,
      title: "Satuan",
      parameters: {
        url: "master/satuan",
        form: {
          kode_satuan: "",
          nama_satuan: "",
          jenis_satuan_id: "",
        },
      },
    };
  },

  computed: {
    ...mapState("moduleApi", ["error", "result", "lookup_custom1"]),
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
          id: this.parameters.form.satuan_id
            ? this.parameters.form.satuan_id
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
          kode_satuan: "",
          nama_satuan: "",
          jenis_satuan_id: "",
        };

        this.$refs.formValidate.reset();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    async onSearchUtil() {
      if (!this.isLoadingGetUtil) {
        this.isLoadingGetUtil = true;

        await this.lookUp({
          url: "utility",
          lookup: "custom1",
          query: "?q=satuan",
        });

        this.isLoadingGetUtil = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_satuan: "",
        nama_satuan: "",
        jenis_satuan_id: "",
      };
    },
  },
};
</script>
