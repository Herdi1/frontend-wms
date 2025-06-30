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
                name="kode_palet"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Kode Palet"
                    type="text"
                    name="kode_palet"
                    v-model="parameters.form.kode_palet"
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
                name="nama_palet"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Nama Palet"
                    type="text"
                    name="nama_palet"
                    v-model="parameters.form.nama_palet"
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
                name="rfid"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="RFID"
                    type="text"
                    name="rfid"
                    v-model="parameters.form.rfid"
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
                name="status_palet"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <label for="status_palet"> Status Palet </label>
                  <select
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    v-model="parameters.form.status_palet"
                    :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                  >
                    <option value="a">Aktif</option>
                    <option value="n">Nonaktif</option>
                  </select>
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
      title: "Palet",
      parameters: {
        url: "master/palet",
        form: {
          kode_palet: "",
          nama_palet: "",
          rfid: "",
          status_palet: "a",
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
          id: this.parameters.form.palet_id
            ? this.parameters.form.palet_id
            : "",
        },
      };

      console.log("Submitting Parameters:", {
        url: parameters.url,
        isEditable: this.isEditable,
        form: parameters.form,
      });

      if (this.isEditable) {
        console.log("Updating Data: ", parameters);
        await this.updateData(parameters);
      } else {
        console.log("Adding Data: ", parameters);
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.self.onLoad(this.self.parameters.params.page);
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
        this.isEditable = false;
        this.parameters.form = {
          kode_palet: "",
          nama_palet: "",
          rfid: "",
          status_palet: "a",
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
        kode_palet: "",
        nama_palet: "",
        rfid: "",
        status_palet: "a",
      };
    },
  },
};
</script>
