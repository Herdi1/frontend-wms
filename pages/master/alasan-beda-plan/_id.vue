<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Alasan Beda Plan
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Alasan Beda Plan
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
          <div class="form-group w-full items-center mb-5">
            <label for="" class="w-4/12"
              >Tipe Alasan<span class="text-danger">*</span></label
            >
            <v-select
              class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
              label="nama_tipe_alasan"
              :loading="isLoadingGetTipe"
              :options="lookup_custom1.data"
              :filterable="false"
              @search="onGetTipeAlasan"
              :reduce="(item) => item.tipe_alasan_id"
              v-model="parameters.form.tipe_alasan_id"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_custom1.data.length || search"
              >
                <span
                  v-if="lookup_custom1.current_page > 1"
                  @click="onGetTipeAlasan(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="lookup_custom1.last_page > lookup_custom1.current_page"
                  @click="onGetTipeAlasan(search, true)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Selanjutnya</span
                >
              </li>
            </v-select>
          </div>
          <div class="form-group">
            <input-form
              label="Kode Alasan Beda Plan"
              type="text"
              name="kode_alasan_beda_plan"
              v-model="parameters.form.kode_alasan_beda_plan"
              :required="true"
            />
          </div>
          <div class="form-group">
            <label for="nama_alasan_beda_plan">Nama Alasan Beda Plan</label>
            <textarea
              placeholder="Nama Alasan Beda Plan"
              class="w-full pl-2 py-1 border rounded focus:outline-none"
              v-model="parameters.form.nama_alasan_beda_plan"
            ></textarea>
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

      isStopSearchTipe: false,
      isLoadingGetTipe: false,
      tipe_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Alasan Beda Plan",
      parameters: {
        url: "master/alasan-beda-plan",
        form: {
          kode_alasan_beda_plan: "",
          nama_alasan_beda_plan: "",
          tipe_alasan_id: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/alasan-beda-plan/${this.id}`);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchTipeAlasan();
  },

  computed: {
    ...mapState("moduleApi", ["error", "result", "lookup_custom1"]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    onGetTipeAlasan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchTipe);

      this.isStopSearchTipe = setTimeout(() => {
        this.tipe_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchTipeAlasan();
      }, 600);
    },

    async onSearchTipeAlasan() {
      if (!this.isLoadingGetTipe) {
        this.isLoadingGetTipe = true;

        await this.lookUp({
          url: "master/tipe-alasan/get-tipe-alasan",
          lookup: "custom1",
          query:
            "?search=" +
            this.tipe_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetTipe = false;
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          id: this.parameters.form.alasan_beda_plan_id
            ? this.parameters.form.alasan_beda_plan_id
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
          kode_alasan_beda_plan: "",
          nama_alasan_beda_plan: "",
          tipe_alasan_id: "",
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
        kode_alasan_beda_plan: "",
        nama_alasan_beda_plan: "",
        tipe_alasan_id: "",
      };
    },
  },
};
</script>
