<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Jenis Peralatan
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Jenis Peralatan
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
              label="Kode Jenis Peralatan"
              type="text"
              name="kode_jenis_peralatan"
              v-model="parameters.form.kode_jenis_peralatan"
              :required="false"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Nama Jenis Peralatan"
              type="text"
              name="nama_jenis_peralatan"
              v-model="parameters.form.nama_jenis_peralatan"
              :required="true"
            />
          </div>
          <div class="form-group">
            <label for="jenis_biaya_id">Jenis Biaya</label>
            <v-select
              label="nama_jenis_biaya"
              :loading="isLoadingGetJenisBiaya"
              :options="lookup_custom7.data"
              :filterable="false"
              @search="onGetJenisBiaya"
              v-model="parameters.form.jenis_biaya_id"
              @input="(item) => onSelectJenisBiaya(item)"
              class="w-full"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_custom7.data.length || search"
              >
                <span
                  v-if="lookup_custom7.current_page > 1"
                  @click="onGetJenisBiaya(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_custom7.last_page > lookup_custom7.current_page"
                  @click="onGetJenisBiaya(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
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
      title: "Jenis Peralatan",

      parameters: {
        url: "master/jenis-peralatan",
        form: {
          jenis_peralatan_id: "",
          kode_jenis_peralatan: "",
          nama_jenis_peralatan: "",
          jenis_biaya_id: "",
        },
      },

      isStopSearchJenisBiaya: false,
      isLoadingGetJenisBiaya: false,
      jenis_biaya_search: "",
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/jenis-peralatan/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.jenis_biaya_id = res.data.jenis_biaya ?? "";
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchJenisBiaya();
  },

  computed: {
    ...mapState("moduleApi", ["error", "result", "lookup_custom7"]),
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
          id: this.parameters.form.jenis_peralatan_id
            ? this.parameters.form.jenis_peralatan_id
            : "",
          jenis_biaya_id:
            typeof this.parameters.form.jenis_biaya_id === "object"
              ? this.parameters.form.jenis_biaya_id.jenis_biaya_id
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
          kode_jenis_peralatan: "",
          nama_jenis_peralatan: "",
          jenis_biaya_id: "",
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
        kode_jenis_peralatan: "",
        nama_jenis_peralatan: "",
        jenis_biaya_id: "",
      };
    },

    onGetJenisBiaya(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJenisBiaya);

      this.isStopSearchJenisBiaya = setTimeout(() => {
        this.jenis_biaya_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchJenisBiaya();
      }, 600);
    },

    async onSearchJenisBiaya() {
      if (!this.isLoadingGetJenisBiaya) {
        this.isLoadingGetJenisBiaya = true;

        await this.lookUp({
          url: "master/jenis-biaya/get-jenis-biaya",
          lookup: "custom7",
          query:
            "?search=" +
            this.jenis_biaya_search +
            "&jenis=TKBM" +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJenisBiaya = false;
      }
    },

    onSelectJenisBiaya(item) {
      if (item) {
        this.parameters.form.jenis_biaya_id = item;
      } else {
        this.parameters.form.jenis_biaya_id = "";
      }
    },
  },
};
</script>
