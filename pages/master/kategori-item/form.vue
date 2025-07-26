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
                  name="kode_kategori_item"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Kode Kategori Item"
                      type="text"
                      name="kode_kategori_item"
                      :required="true"
                      v-model="parameters.form.kode_kategori_item"
                    />
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  ref="inputProvider"
                  name="nama_kategori_item"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <input-form
                      label="Nama Kategori Item"
                      type="text"
                      name="nama_kategori_item"
                      :required="true"
                      v-model="parameters.form.nama_kategori_item"
                    />
                  </div>
                </ValidationProvider>
                <div class="form-group">
                  <label for="status"
                    >Status Kategori Item<span class="text-danger"
                      >*</span
                    ></label
                  >
                  <select
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    name="status"
                    id="status"
                    v-model="parameters.form.status"
                  >
                    <option value="">Pilih</option>
                    <option :value="1">Level 1</option>
                    <option :value="2">Level 2</option>
                    <option :value="3">Level 3</option>
                    <option :value="4">Level 4</option>
                    <option :value="5">Level 5</option>
                  </select>
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
      title: "Kategori Item",
      parameters: {
        url: "master/kategori-item",
        form: {
          kode_kategori_item: "",
          nama_kategori_item: "",
          status: 0,
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
          id: this.parameters.form.kategori_item_id
            ? this.parameters.form.kategori_item_id
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
          kode_kategori_item: "",
          nama_kategori_item: "",
          status: 0,
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
        kode_kategori_item: "",
        nama_kategori_item: "",
        status: 0,
      };
    },
  },
};
</script>
