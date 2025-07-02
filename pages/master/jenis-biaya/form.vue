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
              <ValidationProvider
                name="nama_jenis_biaya"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Nama Jenis Biaya"
                    type="text"
                    name="nama_jenis_biaya"
                    v-model="parameters.form.nama_jenis_biaya"
                    :inputClass="
                      errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                    "
                  />
                  <div v-if="errors[0]" class="text-danger text-xs">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider name="status" rules="required">
                <div class="form-group w-full items-center mb-5">
                  <label for="" class="w-4/12">Status</label>
                  <select
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    v-model="parameters.form.status"
                  >
                    <option value="">Pilih Status</option>
                    <option
                      v-for="(itemValue, i) in lookup_custom1"
                      :key="i"
                      :value="itemValue.value"
                    >
                      {{ itemValue.label }}
                    </option>
                  </select>
                  <!-- <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-3"
                    id="status"
                    label="label"
                    :options="lookup_custom1"
                    :reduce="(item) => item.value"
                    v-model="parameters.form.status"
                  >
                  </v-select> -->
                </div>
              </ValidationProvider>
              <div class="form-group">
                <input-form
                  label="Keterangan"
                  type="text"
                  name="keterangan"
                  v-model="parameters.form.keterangan"
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
      isStopSearchStatus: false,
      isLoadingGetStatus: false,

      isEditable: false,
      isLoadingForm: false,
      title: "Jenis Biaya",
      parameters: {
        url: "master/jenis-biaya",
        form: {
          nama_jenis_biaya: "",
          status: "",
          keterangan: "",
        },
      },
    };
  },

  async mounted() {
    await this.lookUp({
      url: "utility",
      lookup: "custom1",
      query: "?q=jenis_biaya",
    });
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
          id: this.parameters.form.jenis_biaya_id
            ? this.parameters.form.jenis_biaya_id
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
          nama_jenis_biaya: "",
          status: "",
          keterangan: "",
        };
        this.$refs.ruteProvider.reset();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        nama_jenis_biaya: "",
        status: "",
        keterangan: "",
      };
    },
  },
};
</script>
