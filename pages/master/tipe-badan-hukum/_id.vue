<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Tipe Badan Hukum
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Tipe Badan Hukum
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
            <ValidationProvider
              name="kode_tipe_badan_hukum"
              rules="required"
              ref="ruteProvider"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Kode Tipe Badan Hukum"
                  type="text"
                  name="kode_tipe_badan_hukum"
                  v-model="parameters.form.kode_tipe_badan_hukum"
                  :required="true"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="nama_tipe_badan_hukum"
              rules="required"
              ref="ruteProvider"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Nama Tipe Badan Hukum"
                  type="text"
                  name="nama_tipe_badan_hukum"
                  v-model="parameters.form.nama_tipe_badan_hukum"
                  :required="true"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
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
      title: "Tipe Badan Hukum",
      parameters: {
        url: "master/tipe-badan-hukum",
        form: {
          kode_tipe_badan_hukum: "",
          nama_tipe_badan_hukum: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/tipe-badan-hukum/${this.id}`);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
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
          id: this.parameters.form.tipe_badan_hukum_id
            ? this.parameters.form.tipe_badan_hukum_id
            : "",
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
        this.isEditable = false;
        this.parameters.form = {
          kode_tipe_badan_hukum: "",
          nama_tipe_badan_hukum: "",
        };
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
        kode_tipe_badan_hukum: "",
        nama_tipe_badan_hukum: "",
      };
    },
  },
};
</script>
