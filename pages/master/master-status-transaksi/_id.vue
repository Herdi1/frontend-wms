<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Status Transaksi
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Status Transaksi
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
              name="modul"
              rules="required"
              ref="ruteProvider"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <label for="modul"
                  >Modul <span class="text-danger">*</span></label
                >
                <select
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  name="modul"
                  id="modul"
                  v-model="parameters.form.modul"
                  @change="onLoadProses"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <option value="">Pilih</option>
                  <option
                    v-for="(modul, index) in lookup_custom1"
                    :key="index"
                    :value="modul.value"
                  >
                    {{ modul.label }}
                  </option>
                </select>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="jenis_proses_transaksi_id"
              rules="required"
              ref="ruteProvider"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <label for="jenis_proses_transaksi_id"
                  >Proses <span class="text-danger">*</span></label
                >
                <select
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  name="jenis_proses_transaksi_id"
                  id="jenis_proses_transaksi_id"
                  v-model="parameters.form.jenis_proses_transaksi_id"
                  :disabled="!parameters.form.modul"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <option value="">Pilih</option>
                  <option
                    v-for="(proses, index) in lookup_custom2"
                    :key="index"
                    :value="proses.jenis_proses_transaksi_id"
                  >
                    {{ proses.nama_jenis_proses_tansaksi }}
                  </option>
                </select>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="kode_status_transaksi"
              rules="required"
              ref="ruteProvider"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Kode Status Transaksi"
                  type="text"
                  name="kode_status_transaksi"
                  :required="true"
                  v-model="parameters.form.kode_status_transaksi"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>

            <div class="form-group">
              <label for="keterangan_transaksi"
                >Keterangan Transaksi<span class="text-danger">*</span></label
              >
              <textarea
                placeholder="Keterangan Transaksi"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                v-model="parameters.form.keterangan_transaksi"
              ></textarea>
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

      isLoadingGetModul: false,
      isLoadingGetProses: false,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,

      title: "Status Transaksi",
      parameters: {
        url: "master/master-status-transaksi",
        form: {
          jenis_proses_transaksi_id: "",
          modul: "",
          kode_status_transaksi: "",
          nama_status_transaksi: "",
          keterangan_transaksi: "",
          progres: "",
        },
      },
    };
  },

  async mounted() {
    await this.onLoadModul();
    await this.onLoadProses();
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(
          `master/master-status-transaksi/${this.id}`
        );
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
      await this.onLoadModul();
      await this.onLoadProses();
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

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          id: this.parameters.form.master_status_transaksi_id
            ? this.parameters.form.master_status_transaksi_id
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
          jenis_proses_transaksi_id: "",
          modul: "",
          kode_status_transaksi: "",
          nama_status_transaksi: "",
          keterangan_transaksi: "",
          progres: "",
        };
        this.$refs.formValidate.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    async onLoadModul() {
      if (!this.isLoadingGetModul) {
        this.isLoadingGetModul = true;

        await this.lookUp({
          url: "utility",
          lookup: "custom1",
          query: "?q=modul_transaksi",
        });

        this.isLoadingGetModul = false;
        this.onLoadProses();
      }
    },
    async onLoadProses() {
      if (!this.isLoadingGetProses) {
        this.isLoadingGetProses = true;

        await this.lookUp({
          url: "utility",
          lookup: "custom2",
          query: "?q=modul_transaksi" + "&value=" + this.parameters.form.modul,
        });

        this.isLoadingGetProses = false;
      }
    },

    onSelectModul() {
      this.onLoadProses();
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        jenis_proses_transaksi_id: "",
        modul: "",
        kode_status_transaksi: "",
        nama_status_transaksi: "",
        keterangan_transaksi: "",
        progres: "",
      };
    },
  },
};
</script>
