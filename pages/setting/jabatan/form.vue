<template>
  <div to="modal">
    <div class="" aria-hidden="true" id="modal-form">
      <div class="modal-dialog">
        <div class="">
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
                <ValidationProvider name="name" rules="required">
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <label for="name">Nama Jabatan</label>
                    <input
                      id="name"
                      type="text"
                      class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                      name="name"
                      v-model="parameters.form.nama_jabatan"
                      placeholder="Nama Jabatan"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div class="invalid-feedback" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <ValidationProvider name="name" rules="required">
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <label for="name" class="mt-3">Kode Jabatan</label>
                    <input
                      id="name"
                      type="text"
                      class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                      name="name"
                      v-model="parameters.form.kode_jabatan"
                      placeholder="Kode Jabatan"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div class="invalid-feedback" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>
              </div>

              <modal-footer-section
                :isLoadingForm="isLoadingForm"
                @reset="formReset()"
                class="mt-4"
              />
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    return {
      isEditable: false,
      isLoadingForm: false,
      title: "Jabatan",
      parameters: {
        url: "setting/jabatan",
        form: {
          kode_jabatan: "",
          nama_jabatan: "",
        },
      },
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_roles",
      "lookup_custom1",
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
          id: this.parameters.form.jabatan_id
            ? this.parameters.form.jabatan_id
            : "",

          // menu_id: this.parameters.form.menu_id,
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
          kode_jabatan: "",
          nama_jabatan: "",
        };
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_jabatan: "",
        nama_jabatan: "",
      };
    },
  },
};
</script>
