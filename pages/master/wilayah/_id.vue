<template>
  <section class="section min-h-screen">
    <div
      class="section-body mb-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
      v-if="!isLoadingPage"
    >
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Regional
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Regional
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
                label="Nama Regional"
                type="text"
                name="nama_wilayah"
                v-model="parameters.form.nama_wilayah"
                :required="true"
              />
            </div>
            <div class="form-group">
              <input-form
                label="Kode Regional"
                type="text"
                name="kode_wilayah"
                v-model="parameters.form.kode_wilayah"
                :required="true"
              />
            </div>
            <ValidationProvider
              ref="inputProvider"
              name="provinsi_id"
              rules="required"
            >
              <div class="form-group w-full items-center mb-5">
                <label for="provinsi_id" class="w-4/12"
                  >Provinsi<span class="text-danger">*</span></label
                >
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                  label="nama_provinsi"
                  :loading="isLoadingGetProvinsi"
                  :options="lookup_custom1.data"
                  :filterable="false"
                  @search="onGetProvinsi"
                  v-model="parameters.form.provinsi_id"
                >
                  <li
                    slot-scope="{ search }"
                    slot="list-footer"
                    class="p-1 border-t flex justify-between"
                    v-if="lookup_custom1.data.length || search"
                  >
                    <span
                      v-if="lookup_custom1.current_page > 1"
                      @click="onGetProvinsi(search, false)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Sebelumnya</span
                    >
                    <span
                      v-if="
                        lookup_custom1.last_page > lookup_custom1.current_page
                      "
                      @click="onGetProvinsi(search, true)"
                      class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                      >Selanjutnya</span
                    >
                  </li>
                </v-select>
              </div>
            </ValidationProvider>
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

      isStopSearchProvinsi: false,
      isLoadingGetProvinsi: false,
      provinsi_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Regional",
      parameters: {
        url: "master/wilayah",
        form: {
          kode_wilayah: "",
          nama_wilayah: "",
          provinsi_id: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.provinsi_id = res.data.provinsi;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchProvinsi();
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
          id: this.parameters.form.wilayah_id
            ? this.parameters.form.wilayah_id
            : "",
          provinsi_id:
            typeof this.parameters.form.provinsi_id === "object"
              ? this.parameters.form.provinsi_id.provinsi_id
              : this.parameters.form.provinsi_id,
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
          kode_wilayah: "",
          nama_wilayah: "",
          provinsi_id: "",
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
        kode_wilayah: "",
        nama_wilayah: "",
        provinsi_id: "",
      };
    },

    onGetProvinsi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchProvinsi);

      this.isStopSearchProvinsi = setTimeout(() => {
        this.provinsi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchProvinsi();
      }, 600);
    },

    async onSearchProvinsi() {
      if (!this.isLoadingGetProvinsi) {
        this.isLoadingGetProvinsi = true;

        await this.lookUp({
          url: "master/provinsi/get-provinsi",
          lookup: "custom1",
          query:
            "?search=" +
            this.provinsi_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetProvinsi = false;
      }
    },
  },
};
</script>
