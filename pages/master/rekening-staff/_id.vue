<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Rekening Staff
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Rekening Staff
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
            <ValidationProvider name="staff_id" class="w-full" rules="required">
              <div
                class="form-group w-full items-center"
                slot-scope="{ errors, valid }"
              >
                <label for="">Staff <span class="text-danger">*</span></label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_lengkap"
                  :loading="isLoadingGetStaff"
                  :options="lookup_custom1.data"
                  :filterable="false"
                  @search="onGetStaff"
                  :reduce="(item) => item.staff_id"
                  v-model="parameters.form.staff_id"
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
                      @click="onGetStaff(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom1.last_page > lookup_custom1.current_page
                      "
                      @click="onGetStaff(search, true)"
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
            <ValidationProvider name="bank_id" class="w-full" rules="required">
              <div
                class="form-group w-full items-center"
                slot-scope="{ errors, valid }"
              >
                <label for="">Bank <span class="text-danger">*</span></label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_bank"
                  :loading="isLoadingGetBank"
                  :options="lookup_custom2.data"
                  :filterable="false"
                  @search="onGetBank"
                  :reduce="(item) => item.bank_id"
                  v-model="parameters.form.bank_id"
                  :class="errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom2.data.length || search"
                  >
                    <span
                      v-if="lookup_custom2.current_page > 1"
                      @click="onGetBank(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom2.last_page > lookup_custom2.current_page
                      "
                      @click="onGetBank(search, true)"
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
            <div class="form-group">
              <input-form
                label="Nomor Rekening"
                type="text"
                name="nomor_rekening"
                v-model="parameters.form.no_rekening"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Nama Pemilik Rekening"
                type="text"
                name="nama_pemilik_rekening"
                v-model="parameters.form.nama_pemilik"
                :required="true"
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
            <div class="form-group">
              <input-form
                label="Keterangan"
                type="text"
                name="keterangan"
                v-model="parameters.form.keterangan"
                :required="false"
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

      isStopSearchBank: false,
      isLoadingGetBank: false,
      bank_search: "",

      isStopSearchStaff: false,
      isLoadingGetStaff: false,
      staff_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Rekening Staff",
      parameters: {
        url: "master/rekening-staff",
        form: {
          staff_id: "",
          bank_id: "",
          no_rekening: "",
          nama_pemilik: "",
          status_aktif: "",
          keterangan: "",
        },
      },
    };
  },

  async mounted() {
    await this.onSearchBank();
    await this.onSearchStaff();
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.bank_id = res.data.bank_id;
        this.parameters.form.staff_id = res.data.staff_id;
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
      "lookup_custom1", // staff
      "lookup_custom2", // bank
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
          id: this.parameters.form.rekening_staff_id
            ? this.parameters.form.rekening_staff_id
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
          staff_id: "",
          bank_id: "",
          no_rekening: "",
          nama_pemilik: "",
          status_aktif: "",
          keterangan: "",
        };
        this.$refs.formValidate.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    onGetStaff(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchStaff);

      this.isStopSearchStaff = setTimeout(() => {
        this.staff_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchStaff();
      }, 600);
    },

    async onSearchStaff() {
      if (!this.isLoadingGetStaff) {
        this.isLoadingGetStaff = true;

        await this.lookUp({
          url: "master/staff/get-staff",
          lookup: "custom1",
          query:
            "?search=" +
            this.staff_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetStaff = false;
      }
    },

    onGetBank(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchBank);

      this.isStopSearchBank = setTimeout(() => {
        this.bank_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchBank();
      }, 600);
    },

    async onSearchBank() {
      if (!this.isLoadingGetBank) {
        this.isLoadingGetBank = true;

        await this.lookUp({
          url: "master/bank/get-bank",
          lookup: "custom2",
          query:
            "?search=" +
            this.bank_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetBank = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        staff_id: "",
        bank_id: "",
        no_rekening: "",
        nama_pemilik: "",
        status_aktif: "",
        keterangan: "",
      };
    },
  },
};
</script>
