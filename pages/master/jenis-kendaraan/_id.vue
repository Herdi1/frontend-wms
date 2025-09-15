<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Jenis Kendaraan
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Jenis Kendaraan
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
              name="nama_jenis_kendaraan"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Nama Jenis Kendaraan"
                  type="text"
                  name="nama_jenis_kendaraan"
                  :required="true"
                  v-model="parameters.form.nama_jenis_kendaraan"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="kode_jenis_kendaraan"
              rules="required"
            >
              <div class="form-group" slot-scope="{ errors, valid }">
                <input-form
                  label="Kode Jenis Kendaraan"
                  type="text"
                  name="kode_jenis_kendaraan"
                  :required="true"
                  v-model="parameters.form.kode_jenis_kendaraan"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              ref="inputProvider"
              name="standar_ritase_hari"
              rules="required"
            >
              <div class="form-group">
                <label for="">Standar Ritase Harian</label>
                <input
                  type="number"
                  min="0"
                  v-model="parameters.form.standar_ritase_hari"
                  class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                />
                <!-- <input-form
                  label="Standar Ritase Harian"
                  type="number"
                  name="standar_ritase_hari"
                  :required="true"
                  v-model="parameters.form.standar_ritase_hari"
                  :inputClass="
                    errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                  "
                /> -->
              </div>
            </ValidationProvider>
            <!-- <div>
              <label for="">Standar Muat</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.standar_muat"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div>
              <label for="">Minimal Muat</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.minimal_muat"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div>
              <label for="">Maksimal Muat</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.maksimal_muat"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div>
              <label for="">Kecepatan Muat</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.kecepatan_muat"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div>
              <label for="">Kecepatan Kosong</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.kecepatan_kosong"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div>
              <label for="">Standar Waktu Muat</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.standar_waktu_muat"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div>
              <label for="">Standar Waktu Bongkar</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.standar_waktu_bongkar"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div>
              <label for="">Standar Waktu Istirahat</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.standar_waktu_istirahat"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div>
              <label for="">Maksimal Panjang</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.maksimal_panjang"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div>
              <label for="">Maksimal Lebar</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.maksimal_lebar"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div>
              <label for="">Maksimal Tinggi</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.maksimal_tinggi"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
            <div>
              <label for="">Maksimal Volume</label>
              <input
                type="number"
                min="0"
                v-model="parameters.form.maksimal_volume"
                class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div> -->
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
      title: "Jenis Kendaraan",
      parameters: {
        url: "master/jenis-kendaraan",
        form: {
          kode_jenis_kendaraan: "",
          nama_jenis_kendaraan: "",
          standar_ritase_hari: "",
          // standar_muat: "",
          // minimal_muat: "",
          // maksimal_muat: "",
          // kecepatan_muat: "",
          // kecepatan_kosong: "",
          // standar_waktu_muat: "",
          // standar_waktu_bongkar: "",
          // standar_waktu_istirahat: "",
          // maksimal_panjang: "",
          // maksimal_lebar: "",
          // maksimal_tinggi: "",
          // maksimal_volume: "",
          // satuan_dimensi_id: "",
          // satuan_volume_id: "",
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
          id: this.parameters.form.jenis_kendaraan_id
            ? this.parameters.form.jenis_kendaraan_id
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
          kode_jenis_kendaraan: "",
          nama_jenis_kendaraan: "",
          standar_ritase_hari: "",
          // standar_muat: "",
          // minimal_muat: "",
          // maksimal_muat: "",
          // kecepatan_muat: "",
          // kecepatan_kosong: "",
          // standar_waktu_muat: "",
          // standar_waktu_bongkar: "",
          // standar_waktu_istirahat: "",
          // maksimal_panjang: "",
          // maksimal_lebar: "",
          // maksimal_tinggi: "",
          // maksimal_volume: "",
          // satuan_dimensi_id: "",
          // satuan_volume_id: "",
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
        kode_jenis_kendaraan: "",
        nama_jenis_kendaraan: "",
        standar_ritase_hari: "",
        // standar_muat: "",
        // minimal_muat: "",
        // maksimal_muat: "",
        // kecepatan_muat: "",
        // kecepatan_kosong: "",
        // standar_waktu_muat: "",
        // standar_waktu_bongkar: "",
        // standar_waktu_istirahat: "",
        // maksimal_panjang: "",
        // maksimal_lebar: "",
        // maksimal_tinggi: "",
        // maksimal_volume: "",
        // satuan_dimensi_id: "",
        // satuan_volume_id: "",
      };
    },
  },
};
</script>
