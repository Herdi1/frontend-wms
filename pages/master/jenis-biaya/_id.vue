<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Jenis Biaya
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Jenis Biaya
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
              name="nama_jenis_biaya"
              rules="required"
              ref="ruteProvider"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Nama Jenis Biaya"
                  type="text"
                  name="nama_jenis_biaya"
                  :required="true"
                  v-model="parameters.form.nama_jenis_biaya"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="kode_jenis_biaya"
              rules="required"
              ref="ruteProvider"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Kode Jenis Biaya"
                  type="text"
                  name="kode_jenis_biaya"
                  :required="true"
                  v-model="parameters.form.kode_jenis_biaya"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider name="status_jenis_biaya_id" rules="required">
              <div class="form-group w-full items-center mb-5">
                <label for="" class="w-4/12"
                  >Status Jenis Biaya<span class="text-danger">*</span></label
                >
                <select
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.status_jenis_biaya_id"
                >
                  <option value="">Pilih Status</option>
                  <option
                    v-for="(itemValue, i) in lookup_custom1"
                    :key="i"
                    :value="itemValue.status_jenis_biaya_id"
                  >
                    {{ itemValue.nama_status_jenis_biaya }}
                  </option>
                </select>
                <!-- <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-3"
                    id="status"
                    label="label"
                    :options="lookup_custom1"
                    :reduce="(item) => item.value"
                    v-model="parameters.form.status"
                  >
                  </v-select> -->
              </div>
            </ValidationProvider>
            <div class="form-group">
              <input-form
                label="Keterangan"
                type="text"
                name="keterangan"
                :required="true"
                v-model="parameters.form.keterangan"
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

      isStopSearchStatus: false,
      isLoadingGetStatus: false,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Jenis Biaya",
      parameters: {
        url: "master/jenis-biaya",
        form: {
          nama_jenis_biaya: "",
          kode_jenis_biaya: "",
          status_jenis_biaya_id: "",
          keterangan: "",
        },
      },
    };
  },

  async mounted() {
    await this.lookUp({
      url: "utility",
      lookup: "custom1",
      query: "?q=jenis_biaya",
    });
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
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
          id: this.parameters.form.jenis_biaya_id
            ? this.parameters.form.jenis_biaya_id
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
          "Data berhasi; di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );

        this.isEditable = false;
        this.parameters.form = {
          nama_jenis_biaya: "",
          kode_jenis_biaya: "",
          status_jenis_biaya_id: "",
          keterangan: "",
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
        nama_jenis_biaya: "",
        kode_jenis_biaya: "",
        status_jenis_biaya_id: "",
        keterangan: "",
      };
    },
  },
};
</script>
