<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Banner
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Banner
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
                label="Judul Banner"
                type="text"
                name="judul_banner"
                :required="true"
                v-model="parameters.form.judul_banner"
              />
            </div>
            <div class="form-group">
              <input-form
                label="File"
                type="file"
                name="File"
                :required="true"
                v-model="parameters.form.file_name"
              />
              <p class="text-danger italic">*jpeg, png, jpg, gif (maks 2MB)</p>
            </div>
            <div class="form-group">
              <label for="keterangan"> Keterangan </label>
              <textarea
                name="keterangan"
                v-model="parameters.form.keterangan"
                class="w-full h-10 border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
              ></textarea>
            </div>
          </div>
          <modal-footer-section
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
      title: "Banner",
      parameters: {
        url: "master/banner",
        form: {
          judul_banner: "",
          keterangan: "",
          file_name: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/banner/${this.id}`);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {}
  },

  computed: {
    ...mapState("moduleApi", ["error", "result"]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = this.parameters.url;

      let formData = new FormData();

      formData.append("judul_banner", this.parameters.form.judul_banner);
      formData.append("keterangan", this.parameters.form.keterangan);

      if (this.parameters.form.file_name instanceof File) {
        formData.append("file_name", this.parameters.form.file_name);
      }

      if (this.isEditable) {
        url += "/" + this.id;
        formData.append("_method", "PUT");
      }

      this.$axios({
        url: url,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Berhasil " +
              (this.isEditable ? "Update" : "Tambah") +
              " Transfer Dana"
          );

          if (!this.isEditable) {
            this.form = {
              judul_banner: "",
              keterangan: "",
              file_name: "",
            };
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        judul_banner: "",
        keterangan: "",
        file_name: "",
      };
    },
  },
};
</script>
