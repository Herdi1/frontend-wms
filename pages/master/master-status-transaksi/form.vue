<template>
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
                name="modul"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <label for="modul">Modul</label>
                  <select
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    name="modul"
                    id="modul"
                    v-model="parameters.form.modul"
                    @change="onSelectModul"
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
                  <div v-if="errors[0]" class="text-danger">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider
                name="proses"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <label for="proses">Proses</label>
                  <select
                    class="w-full pl-2 py-1 border rounded focus:outline-none"
                    name="proses"
                    id="proses"
                    v-model="parameters.form.proses"
                    :disabled="!parameters.form.modul"
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
                  <div v-if="errors[0]" class="text-danger">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>
              <!-- <ValidationProvider
                name="modul"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Modul"
                    type="text"
                    name="modul"
                    v-model="parameters.form.modul"
                    :inputClass="
                      errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                    "
                  />
                  <div v-if="errors[0]" class="text-danger">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider> -->
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
                    v-model="parameters.form.kode_status_transaksi"
                    :inputClass="
                      errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                    "
                  />
                  <div v-if="errors[0]" class="text-danger">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>
              <ValidationProvider
                name="nama_status_transaksi"
                rules="required"
                ref="ruteProvider"
              >
                <div class="form-group" slot-scope="{ errors, valid }">
                  <input-form
                    label="Nama Status Transaksi"
                    type="text"
                    name="nama_status_transaksi"
                    v-model="parameters.form.nama_status_transaksi"
                    :inputClass="
                      errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                    "
                  />
                  <div v-if="errors[0]" class="text-danger">
                    {{ errors[0] }}
                  </div>
                </div>
              </ValidationProvider>
              <div class="form-group">
                <label for="keterangan_transaksi">Keterangan Transaksi</label>
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
      isLoadingGetModul: false,
      isLoadingGetProses: false,

      isEditable: false,
      isLoadingForm: false,
      title: "Master Status Transaksi",
      parameters: {
        url: "master/master-status-transaksi",
        form: {
          proses: "",
          modul: "",
          kode_status_transaksi: "",
          nama_status_transaksi: "",
          keterangan_transaksi: "",
        },
      },
    };
  },

  async mounted() {
    await this.onLoadModul();
    await this.onLoadProses();
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
        this.self.onLoad(this.self.parameters.params.page);
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
        this.isEditable = false;
        this.parameters.form = {
          proses: "",
          modul: "",
          kode_status_transaksi: "",
          nama_status_transaksi: "",
          keterangan_transaksi: "",
        };
        this.$refs.ruteProvider.reset();
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
      this.parameters.form.proses = "";
      this.onLoadProses();
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        proses: "",
        modul: "",
        kode_status_transaksi: "",
        nama_status_transaksi: "",
        keterangan_transaksi: "",
      };
    },
  },
};
</script>
