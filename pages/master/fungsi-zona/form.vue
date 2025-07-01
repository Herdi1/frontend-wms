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
                  name="nama_fungsi_zona"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Nama Fungsi Zona"
                      type="text"
                      name="nama_fungsi_zona"
                      v-model="parameters.form.nama_fungsi_zona"
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
      isEditable: false,
      isLoadingForm: false,
      title: "Fungsi Zona",
      parameters: {
        url: "master/fungsi-zona",
        form: {
          nama_fungsi_zona: "",
        },
      },
    };
  },

  computed: {
    ...mapState("moduleApi", ["error", "result"]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          id: this.parameters.form.fungsi_zona_id
            ? this.parameters.form.fungsi_zona_id
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
          nama_fungsi_zona: "",
        };

        this.$refs.formValidate.reset();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        nama_fungsi_zona: "",
      };
    },
  },
};
</script>
