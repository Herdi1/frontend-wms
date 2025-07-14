<template>
  <section class="section bg-white rounded-md px-4 py-2 shadow-sm">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Profit Center
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Profit Center
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
              label="Kode Profit Center"
              type="text"
              name="kode_profit_center"
              :required="true"
              v-model="parameters.form.kode_profit_center"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Nama Profit Center"
              type="text"
              name="nama_profit_center"
              :required="true"
              v-model="parameters.form.nama_profit_center"
            />
          </div>
          <ValidationProvider
            ref="inputProvider"
            name="wilayah_id"
            rules="required"
          >
            <div class="form-group w-full items-center mb-5">
              <label for="" class="w-4/12"
                >Regional<span class="text-danger">*</span></label
              >
              <v-select
                class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                label="nama_wilayah"
                :loading="isLoadingGetWilayah"
                :options="lookup_custom3.data"
                :filterable="false"
                @search="onGetWilayah"
                :reduce="(item) => item.wilayah_id"
                v-model="parameters.form.wilayah_id"
              >
                <li
                  slot-scope="{ search }"
                  slot="list-footer"
                  class="p-1 border-t flex justify-between"
                  v-if="lookup_custom3.data.length || search"
                >
                  <span
                    v-if="lookup_custom3.current_page > 1"
                    @click="onGetWilayah(search, false)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Sebelumnya</span
                  >
                  <span
                    v-if="
                      lookup_custom3.last_page > lookup_custom3.current_page
                    "
                    @click="onGetWilayah(search, true)"
                    class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                    >Selanjutnya</span
                  >
                </li>
              </v-select>
            </div>
          </ValidationProvider>
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
      title: "Profit Center",

      isStopSearchWilayah: false,
      isLoadingGetWilayah: false,
      wilayah_search: "",

      parameters: {
        url: "master/profit-center",
        form: {
          profit_center_id: "",
          kode_profit_center: "",
          wilayah_id: "",
          nama_profit_center: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/profit-center/${this.id}`);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchWilayah();
  },

  computed: {
    ...mapState("moduleApi", ["error", "result", "lookup_custom3"]),
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
          id: this.parameters.form.profit_center_id
            ? this.parameters.form.profit_center_id
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
          profit_center_id: "",
          kode_profit_center: "",
          wilayah_id: "",
          nama_profit_center: "",
        };
        this.$refs.formValidate.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }
      this.isLoadingForm = false;
    },

    onGetWilayah(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchWilayah);

      this.isStopSearchWilayah = setTimeout(() => {
        this.wilayah_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchWilayah();
      }, 600);
    },

    async onSearchWilayah() {
      if (!this.isLoadingGetWilayah) {
        this.isLoadingGetWilayah = true;

        await this.lookUp({
          url: "master/wilayah/get-wilayah",
          lookup: "custom3",
          query:
            "?search=" +
            this.wilayah_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetWilayah = false;
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        profit_center_id: "",
        kode_profit_center: "",
        wilayah_id: "",
        nama_profit_center: "",
      };
    },
  },
};
</script>
