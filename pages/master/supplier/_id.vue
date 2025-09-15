<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Supplier
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Supplier
        </h1>
        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
        <form @submit.prevent="validate().then(() => onSubmit(invalid))">
          <div class="modal-body mt-4">
            <div class="form-group">
              <input-form
                label="Kode Supplier"
                type="text"
                name="kode_supplier"
                :required="true"
                v-model="parameters.form.kode_supplier"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Nama Supplier"
                type="text"
                name="nama_supplier"
                :required="true"
                v-model="parameters.form.nama_supplier"
              />
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
      title: "Supplier",
      parameters: {
        url: "master/supplier",
        form: {
          supplier_id: "",
          kode_supplier: "",
          nama_supplier: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/supplier/${this.id}`);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = "master/supplier";

      let formData = this.parameters.form;

      if (this.isEditable) {
        url += `/${this.id}`;
      }

      this.$axios({
        url: url,
        method: this.isEditable ? "put" : "post",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );
          this.isEditable = false;
          this.parameters.form = {
            supplier_id: "",
            kode_supplier: "",
            nama_supplier: "",
          };
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
          this.$router.back();
        });
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        supplier_id: "",
        kode_supplier: "",
        nama_supplier: "",
      };
    },
  },
};
</script>
