<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Staff
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Staff
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
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            <div class="form-group">
              <input-form
                label="Nama Lengkap"
                type="text"
                name="nama_lengkap"
                v-model="parameters.form.nama_lengkap"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Kode Staff"
                type="text"
                name="kode_staff"
                v-model="parameters.form.kode_staff"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Nomor HP"
                type="text"
                name="nomor_hp"
                v-model="parameters.form.no_hp"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Email"
                type="email"
                name="email"
                v-model="parameters.form.email"
                :required="true"
              />
            </div>
            <ValidationProvider
              name="jenis_kelamin"
              class="w-full"
              rules="required"
            >
              <div
                class="form-group w-full items-center"
                slot-scope="{ errors, valid }"
              >
                <label for="jenis_kelamin" class="w-4/12">
                  Jenis Kelamin <span class="text-danger">*</span>
                </label>
                <select
                  class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                  v-model="parameters.form.jenis_kelamin"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <option value="l">Laki-laki</option>
                  <option value="p">Perempuan</option>
                </select>
                <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div>
              </div>
            </ValidationProvider>
            <div class="form-group">
              <input-form
                label="Tanggal Lahir"
                type="date"
                name="tanggal_lahir"
                v-model="parameters.form.tanggal_lahir"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Nomor KTP"
                type="text"
                name="nomor_ktp"
                v-model="parameters.form.no_ktp"
                :required="true"
              />
            </div>
            <ValidationProvider
              name="jenis_staff"
              class="w-full"
              rules="required"
            >
              <div
                class="form-group w-full items-center"
                slot-scope="{ errors, valid }"
              >
                <label for="jenis_staff" class="w-4/12">
                  Jenis Staff <span class="text-danger">*</span>
                </label>
                <select
                  class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                  v-model="parameters.form.jenis_user"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <option value="staff">Staff</option>
                  <option value="pengemudi">Pengemudi</option>
                  <option value="operator">Operator</option>
                </select>
                <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div>
              </div>
            </ValidationProvider>
            <div class="form-group">
              <input-form
                label="Nomor SIM"
                type="text"
                name="nomor_sim"
                v-model="parameters.form.no_sim"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Tanggal Expired SIM"
                type="date"
                name="tanggal_expired_sim"
                v-model="parameters.form.sim_expired"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Nomor BPJS"
                type="text"
                name="nomor_bpjs"
                v-model="parameters.form.no_bpjs"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-form
                label="SKCK"
                type="text"
                name="skck"
                v-model="parameters.form.skck"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Nomor NPWP"
                type="text"
                name="nomor_npwp"
                v-model="parameters.form.no_npwp"
                :required="false"
              />
            </div>
            <div class="form-group">
              <input-form
                label="NIK"
                type="text"
                name="nik"
                v-model="parameters.form.nik"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Tanggal Gabung"
                type="date"
                name="tanggal_gabung"
                v-model="parameters.form.tanggal_gabung"
                :required="false"
              />
            </div>
            <ValidationProvider name="status" class="w-full" rules="required">
              <div
                class="form-group w-full items-center"
                slot-scope="{ errors, valid }"
              >
                <label for="status" class="w-4/12">
                  Status <span class="text-danger">*</span>
                </label>
                <select
                  class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                  v-model="parameters.form.status_aktif"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
                <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="jabatan_id"
              class="w-full"
              rules="required"
            >
              <div
                class="form-group w-full items-center"
                slot-scope="{ errors, valid }"
              >
                <label for="">Jabatan <span class="text-danger">*</span></label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_jabatan"
                  :loading="isLoadingGetJabatan"
                  :options="lookup_custom1.data"
                  :filterable="false"
                  @search="onGetJabatan"
                  :reduce="(item) => item.jabatan_id"
                  v-model="parameters.form.jabatan_id"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom1.data.length || search"
                  >
                    <span
                      v-if="lookup_custom1.current_page > 1"
                      @click="onGetJabatan(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom1.last_page > lookup_custom1.current_page
                      "
                      @click="onGetJabatan(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
                <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div>
              </div>
            </ValidationProvider>
            <div class="form-group w-full items-center">
              <label for="">Pelanggan</label>
              <v-select
                label="nama_pelanggan"
                :loading="isLoadingGetPelanggan"
                :options="lookup_custom2.data"
                :filterable="false"
                @search="onGetPelanggan"
                v-model="parameters.form.pelanggan_id"
                :reduce="(item) => item.pelanggan_id"
                class="w-full"
              >
                <!-- :aria-disabled="parameters.form.status_user == 2" -->
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom2.data.length || search"
                >
                  <span
                    v-if="lookup_custom2.current_page > 1"
                    @click="onGetPelanggan(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom2.last_page > lookup_custom2.current_page
                    "
                    @click="onGetPelanggan(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="form-group w-full items-center">
              <label for="">Tipe SIM</label>
              <v-select
                label="nama_tipe_sim"
                :loading="isLoadingGetTipeSIM"
                :options="lookup_custom3.data"
                :filterable="false"
                @search="onGetTipeSIM"
                v-model="parameters.form.tipe_sim_id"
                :reduce="(item) => item.tipe_sim_id"
                class="w-full"
              >
                <!-- :aria-disabled="parameters.form.status_user == 2" -->
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom3.data.length || search"
                >
                  <span
                    v-if="lookup_custom3.current_page > 1"
                    @click="onGetTipeSIM(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom3.last_page > lookup_custom3.current_page
                    "
                    @click="onGetTipeSIM(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <div class="form-group w-full items-center">
              <label for="">Vendor</label>
              <v-select
                label="nama_vendor"
                :loading="isLoadingGetVendor"
                :options="lookup_custom4.data"
                :filterable="false"
                @search="onGetVendor"
                v-model="parameters.form.vendor_id_operator"
                :reduce="(item) => item.vendor_id"
                class="w-full"
              >
                <!-- :aria-disabled="parameters.form.status_user == 2" -->
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom4.data.length || search"
                >
                  <span
                    v-if="lookup_custom4.current_page > 1"
                    @click="onGetVendor(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom4.last_page > lookup_custom4.current_page
                    "
                    @click="onGetVendor(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
            <ValidationProvider name="alamat" class="w-full" rules="required">
              <div class="form-group" slot-scope="{ errors, valid }">
                <label for="alamat"
                  >Alamat <span class="text-danger">*</span></label
                >
                <textarea
                  placeholder="Alamat"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.alamat"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                ></textarea>
                <div v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </div>
              </div>
            </ValidationProvider>
            <div class="form-group">
              <label for="keterangan">Keterangan</label>
              <textarea
                placeholder="Keterangan"
                class="w-full pl-2 py-1 border rounded focus:outline-none"
                v-model="parameters.form.keterangan"
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

      isStopSearchJabatan: false,
      isLoadingGetJabatan: false,
      jabatan_search: "",

      isStopSearchPelanggan: false,
      isLoadingGetPelanggan: false,
      pelanggan_search: "",

      isStopSearchTipeSIM: false,
      isLoadingGetTipeSIM: false,
      tipeSIM_search: "",

      isStopSearchVendor: false,
      isLoadingGetVendor: false,
      vendor_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Staff",
      parameters: {
        url: "master/staff",
        form: {
          nama_lengkap: "",
          kode_staff: "",
          no_hp: "",
          email: "",
          jenis_kelamin: "",
          tanggal_lahir: "",
          nik: "",
          jenis_user: "",
          no_sim: "",
          sim_expired: "",
          no_bpjs: "",
          skck: "",
          no_npwp: "",
          no_ktp: "",
          tanggal_gabung: "",
          status_aktif: "",
          jabatan_id: "",
          pelanggan_id: "",
          tipe_sim_id: "",
          vendor_id_operator: "",
          alamat: "",
          keterangan: "",
        },
      },
    };
  },

  async mounted() {
    await this.onSearchJabatan();
    await this.onSearchPelanggan();
    await this.onSearchTipeSIM();
    await this.onSearchVendor();
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.jabatan_id = res.data.jabatan_id;
        this.parameters.form.pelanggan_id = res.data.pelanggan_id;
        this.parameters.form.tipe_sim_id = res.data.tipe_sim_id;
        this.parameters.form.vendor_id_operator = res.data.vendor_id_operator;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
      //console.log("error",error);
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", // jabatan
      "lookup_custom2", // pelanggan
      "lookup_custom3", // tipe_sim
      "lookup_custom4", // vendor
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
          id: this.parameters.form.staff_id
            ? this.parameters.form.staff_id
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
          nama_lengkap: "",
          kode_staff: "",
          no_hp: "",
          email: "",
          jenis_kelamin: "",
          tanggal_lahir: "",
          nik: "",
          jenis_user: "",
          no_sim: "",
          sim_expired: "",
          no_bpjs: "",
          skck: "",
          no_npwp: "",
          no_ktp: "",
          tanggal_gabung: "",
          status_aktif: "",
          jabatan_id: "",
          pelanggan_id: "",
          tipe_sim_id: "",
          vendor_id_operator: "",
          alamat: "",
          keterangan: "",
        };
        this.$refs.formValidate.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    onGetJabatan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJabatan);

      this.isStopSearchJabatan = setTimeout(() => {
        this.jabatan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchJabatan();
      }, 600);
    },

    async onSearchJabatan() {
      if (!this.isLoadingGetJabatan) {
        this.isLoadingGetJabatan = true;

        await this.lookUp({
          url: "setting/jabatan",
          lookup: "custom1",
          query:
            "?search=" +
            this.jabatan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJabatan = false;
      }
    },

    onGetPelanggan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchPelanggan);

      this.isStopSearchPelanggan = setTimeout(() => {
        this.pelanggan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchPelanggan();
      }, 600);
    },

    async onSearchPelanggan() {
      if (!this.isLoadingGetPelanggan) {
        this.isLoadingGetPelanggan = true;

        await this.lookUp({
          url: "master/pelanggan/get-pelanggan",
          lookup: "custom2",
          query:
            "?search=" +
            this.pelanggan_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetPelanggan = false;
      }
    },

    onGetTipeSIM(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTipeSIM);

      this.isStopSearchTipeSIM = setTimeout(() => {
        this.tipeSIM_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchTipeSIM();
      }, 600);
    },

    async onSearchTipeSIM() {
      if (!this.isLoadingGetTipeSIM) {
        this.isLoadingGetTipeSIM = true;

        await this.lookUp({
          url: "master/tipe-sim/get-tipe-sim",
          lookup: "custom3",
          query:
            "?search=" +
            this.tipeSIM_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTipeSIM = false;
      }
    },

    onGetVendor(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchVendor);

      this.isStopSearchVendor = setTimeout(() => {
        this.vendor_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchVendor();
      }, 600);
    },

    async onSearchVendor() {
      if (!this.isLoadingGetVendor) {
        this.isLoadingGetVendor = true;

        await this.lookUp({
          url: "master/vendor/get-vendor",
          lookup: "custom4",
          query:
            "?search=" +
            this.vendor_search +
            "&tipe_vendor=o" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetVendor = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        nama_lengkap: "",
        kode_staff: "",
        no_hp: "",
        email: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        nik: "",
        jenis_user: "",
        no_sim: "",
        sim_expired: "",
        no_bpjs: "",
        skck: "",
        no_npwp: "",
        no_ktp: "",
        tanggal_gabung: "",
        status_aktif: "",
        jabatan_id: "",
        pelanggan_id: "",
        tipe_sim_id: "",
        vendor_id_operator: "",
        alamat: "",
        keterangan: "",
      };
    },
  },
};
</script>
