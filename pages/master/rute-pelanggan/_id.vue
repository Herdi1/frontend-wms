<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm min-h-screen"
  >
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data Jalur Lokasi
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">
          Tambah Data Jalur Lokasi
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
              label="Kode Jalur"
              type="text"
              name="kode_jalur"
              v-model="parameters.form.kode_jalur"
              :required="true"
            />
          </div>
          <div class="form-group">
            <input-form
              label="Nama Jalur"
              type="text"
              name="nama_jalur"
              v-model="parameters.form.nama_jalur"
              :required="true"
            />
          </div>

          <div>
            <label for="gudang_id"
              >Gudang<span class="text-danger">*</span></label
            >
            <v-select
              label="nama_gudang"
              :loading="isLoadingGetGudang"
              :options="lookup_location.data"
              :filterable="false"
              @search="onGetGudang"
              v-model="parameters.form.gudang_id"
              class="w-full mb-2 bg-white"
            >
              <li
                slot-scope="{ search }"
                slot="list-footer"
                class="p-1 border-t flex justify-between"
                v-if="lookup_location.data.length || search"
              >
                <span
                  v-if="lookup_location.current_page > 1"
                  @click="onGetGudang(search, false)"
                  class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                  >Sebelumnya</span
                >
                <span
                  v-if="
                    lookup_location.last_page > lookup_location.current_page
                  "
                  @click="onGetGudang(search, true)"
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
      title: "Jalur Lokasi",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      parameters: {
        url: "master/jalur-lokasi",
        form: {
          kode_jalur: "",
          nama_jalur: "",
          gudang_id: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/jalur-lokasi/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.gudang_id = res.data.gudang ?? "";
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchGudang();
  },

  computed: {
    ...mapState("moduleApi", ["error", "result", "lookup_location"]),
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
          id: this.parameters.form.jalur_lokasi_id
            ? this.parameters.form.jalur_lokasi_id
            : "",
          gudang_id:
            typeof this.parameters.form.gudang_id === "object"
              ? this.parameters.form.gudang_id.gudang_id
              : this.parameters.form.gudang_id,
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
          kode_jalur: "",
          nama_jalur: "",
          gudang_id: "",
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
        kode_jalur: "",
        nama_jalur: "",
        gudang_id: "",
      };
    },

    //gudang
    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_location.current_page = isNext
            ? this.lookup_location.current_page + 1
            : this.lookup_location.current_page - 1;
        } else {
          this.lookup_location.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "location",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_location.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },
  },
};
</script>
