<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Jabatan
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Jabatan
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
              name="name"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <label for="name"
                  >Nama Jabatan <span class="text-danger">*</span></label
                >
                <input
                  id="name"
                  type="text"
                  class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                  name="name"
                  v-model="parameters.form.nama_jabatan"
                  placeholder="Nama Jabatan"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                />
                <div class="invalid-feedback" v-if="errors[0]">
                  {{ errors[0] }}
                </div>
              </div>
            </ValidationProvider>

            <ValidationProvider
              ref="inputProvider"
              name="name"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <label for="name" class="mt-3"
                  >Kode Jabatan <span class="text-danger">*</span></label
                >
                <input
                  id="name"
                  type="text"
                  class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                  name="name"
                  v-model="parameters.form.kode_jabatan"
                  placeholder="Kode Jabatan"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
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

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(this.parameters.url + "/" + this.id);
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
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );

        this.isEditable = false;
        this.parameters.form = {
          kode_jabatan: "",
          nama_jabatan: "",
        };

        this.$refs.formValidate.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },
  },
};
</script>
