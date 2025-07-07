<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Term Pembayaran
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Term Pembayaran
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
          <div class="form-group">
            <input-form
              label="Kode Term Pembayaran"
              type="text"
              name="kode_term_pembayaran"
              v-model="parameters.form.kode_term_pembayaran"
              :required="true"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Nama Term Pembayaran"
              type="text"
              name="nama_term_pembayaran"
              v-model="parameters.form.nama_term_pembayaran"
              :required="true"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Keterangan"
              type="text"
              name="keterangan"
              v-model="parameters.form.keterangan"
              :required="false"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Durasi"
              type="number"
              name="durasi"
              v-model="parameters.form.durasi"
              :required="true"
            />
            <span class="text-sm text-gray-500 pl-1">*Hari</span>
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
      title: "Term Pembayaran",
      parameters: {
        url: "master/term-pembayaran",
        form: {
          nama_term_pembayaran: "",
          kode_term_pembayaran: "",
          keterangan: "",
          durasi: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/term-pembayaran/${this.id}`);
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
          id: this.parameters.form.term_pembayaran_id
            ? this.parameters.form.term_pembayaran_id
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
          nama_term_pembayaran: "",
          kode_term_pembayaran: "",
          keterangan: "",
          durasi: "",
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
        nama_term_pembayaran: "",
        kode_term_pembayaran: "",
        keterangan: "",
        durasi: "",
      };
    },
  },
};
</script>
