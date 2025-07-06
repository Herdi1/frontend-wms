<template>
  <section class="section bg-white rounded-md px-4 py-2 shadow-sm">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
          Edit Data
        </h1>
        <h1 v-else class="text-xl font-bold mb-2 uppercase">Tambah Data</h1>
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
            <div class="grid grid-cols-2 gap-2 w-full">
              <ValidationProvider name="zona_gudang" rules="required">
                <div class="form-group w-full items-center mb-5">
                  <label for="" class="w-4/12"
                    >Zona Gudang <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_zona_gudang"
                    :loading="isLoadingGetZonaGudang"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetZonaGudang"
                    :reduce="(item) => item.zona_gudang_id"
                    v-model="parameters.form.zona_gudang_id"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom1.data.length || search"
                    >
                      <span
                        v-if="lookup_custom1.current_page > 1"
                        @click="onGetZonaGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetZonaGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <ValidationProvider name="gudang" rules="required">
                <div class="form-group w-full items-center mb-5">
                  <label for="" class="w-4/12"
                    >Gudang <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_gudang"
                    :loading="isLoadingGetGudang"
                    :options="lookup_custom2.data"
                    :filterable="false"
                    @search="onGetGudang"
                    :reduce="(item) => item.gudang_id"
                    v-model="parameters.form.gudang_id"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom2.data.length || search"
                    >
                      <span
                        v-if="lookup_custom2.current_page > 1"
                        @click="onGetGudang(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom2.last_page > lookup_custom2.current_page
                        "
                        @click="onGetGudang(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
            </div>
            <div class="grid grid-cols-2 gap-2 w-full">
              <div class="form-group">
                <label for="">Level</label>
                <select
                  name=""
                  id=""
                  class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                >
                  <option value="1">Aisle</option>
                  <option value="2">Rack</option>
                  <option value="3">Level</option>
                  <option value="4">Bin</option>
                </select>
              </div>
              <div class="form-group">
                <input-form
                  label="History Induk"
                  type="text"
                  name="history_induk"
                  v-model="parameters.form.history_induk"
                  :required="false"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 w-full">
              <div class="form-group">
                <input-form
                  label="Kode Lokasi"
                  type="text"
                  name="kode_lokasi"
                  v-model="parameters.form.kode_lokasi"
                  :required="false"
                />
              </div>
              <div class="form-group col-12">
                <label for="kapasitas">Kapasitas</label>
                <money
                  v-model="parameters.form.kapasitas"
                  class="w-full pl-2 py-1 border rounded focus:outline-none"
                  @keydown.native="
                    $event.key === '-' ? $event.preventDefault() : null
                  "
                />
                <!-- <div class="text-muted text-small">* Meter</div> -->
              </div>
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
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Slot Penyimpanan",
      parameters: {
        url: "master/lokasi-master-gudang",
        form: {
          zona_gudang_id: "",
          gudang_id: "",
          level: "",
          history_induk: "",
          kode_lokasi: "",
          kapasitas: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(
          `master/lokasi-master-gudang/${this.id}`
        );
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      console.log("error", error);
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchZonaGudang();
    await this.onSearchGudang();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //zona gudang
      "lookup_custom2", //gudang
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
          id: this.parameters.form.slot_penyimpanan_id
            ? this.parameters.form.slot_penyimpanan_id
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
          zona_gudang_id: "",
          gudang_id: "",
          level: "",
          history_induk: "",
          kode_lokasi: "",
          kapasitas: "",
        };
        this.$refs.formValidate.reset();
        // this.$refs.ruteProvider.reset();
        this.$router.back();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    onGetZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchZonaGudang);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.zona_gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchZonaGudang();
      }, 600);
    },

    async onSearchZonaGudang() {
      if (!this.isLoadingGetZonaGudang) {
        this.isLoadingGetZonaGudang = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.zona_gudang_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaGudang = false;
      }
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom2",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },
  },
};
</script>
