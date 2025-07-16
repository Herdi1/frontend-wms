<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Palet
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Palet
        </h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div class="modal-body mt-4">
            <div class="form-group">
              <input-form
                label="Kode Palet"
                type="text"
                name="kode_palet"
                v-model="parameters.form.kode_palet"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Nama Palet"
                type="text"
                name="nama_palet"
                v-model="parameters.form.nama_palet"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-form
                label="RFID"
                type="text"
                name="rfid"
                v-model="parameters.form.rfid"
                :required="true"
              />
            </div>
            <ValidationProvider
              name="status_palet"
              rules="required"
              ref="ruteProvider"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <label for="status_palet">
                  Status Palet <span class="text-danger">*</span>
                </label>
                <select
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.status_palet"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <option value="a">Aktif</option>
                  <option value="n">Nonaktif</option>
                </select>
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
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
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

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      // this.$router.back();
      console.log("error", error);
    }
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

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        // this.self.onLoad(this.self.parameters.params.page);
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
        this.$refs.formValidate.reset();
        this.$refs.ruteProvider.reset();
        this.$router.back();
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
