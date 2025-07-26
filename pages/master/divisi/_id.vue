<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Divisi
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Divisi
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
              ref="inputProvider"
              name="kode_divisi"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Kode Divisi"
                  type="text"
                  name="kode_divisi"
                  :required="true"
                  v-model="parameters.form.kode_divisi"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="nama_divisi"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Nama Divisi"
                  type="text"
                  name="nama_divisi"
                  :required="true"
                  v-model="parameters.form.nama_divisi"
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
      title: "Divisi",
      parameters: {
        url: "master/divisi",
        form: {
          kode_divisi: "",
          nama_divisi: "",
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
      console.log("err", error);
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
          id: this.parameters.form.divisi_id
            ? this.parameters.form.divisi_id
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
          kode_divisi: "",
          nama_divisi: "",
        };

        this.$refs.formValidate.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        kode_divisi: "",
        nama_divisi: "",
      };
    },
  },
};
</script>
