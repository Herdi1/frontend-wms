<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
  >
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
              <div class="form-group">
                <input-form
                  label="Nama Slot Penyimpanan"
                  type="text"
                  name="nama_slot_penyimpanan"
                  v-model="parameters.form.nama_slot_penyimpanan"
                  :required="false"
                />
              </div>
              <div class="form-group">
                <input-form
                  label="Kode Slot Penyimpanan"
                  type="text"
                  name="kode_slot_penyimpanan"
                  v-model="parameters.form.kode_slot_penyimpanan"
                  :required="false"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 w-full">
              <ValidationProvider name="gudang" v-if="!user.gudang_id">
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
                    @input="onSelectGudang"
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
            </div>
            <div class="grid grid-cols-2 gap-2 w-full">
              <div class="form-group">
                <label for="">Level</label>
                <select
                  name=""
                  id=""
                  v-model="parameters.form.level"
                  @change="onSearchSlotInduk"
                  class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                >
                  <option value="1">Aisle</option>
                  <option value="2">Rack</option>
                  <option value="3">Level</option>
                  <option value="4">Bin</option>
                </select>
              </div>
              <ValidationProvider name="gudang">
                <div class="form-group w-full items-center mb-5">
                  <label for="" class="w-4/12">Induk Slot Penyimpanan</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="kode_slot_penyimpanan"
                    :loading="isLoadingGetSlotInduk"
                    :options="lookup_custom3.data"
                    :filterable="false"
                    @search="onGetSlotInduk"
                    :reduce="(item) => item.slot_penyimpanan_id"
                    v-model="parameters.form.slot_penyimpanan_id_induk"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom3.data.length || search"
                    >
                      <span
                        v-if="lookup_custom3.current_page > 1"
                        @click="onGetSlotInduk(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom3.last_page > lookup_custom3.current_page
                        "
                        @click="onGetSlotInduk(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <!-- <div class="form-group">
                <input-form
                  label="History Induk"
                  type="text"
                  name="history_induk"
                  v-model="parameters.form.history_induk"
                  :required="false"
                />
              </div> -->
            </div>
            <div class="grid grid-cols-2 gap-2 w-full">
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
  middleware: ["checkRoleUser"],
  props: ["self"],

  head() {
    return {
      title: "Slot Penyimpanan",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      user: this.$auth.user,

      isStopSearchZonaGudang: false,
      isLoadingGetZonaGudang: false,
      zona_gudang_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchSlotInduk: false,
      isLoadingGetSlotInduk: false,
      slot_induk_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Slot Penyimpanan",
      parameters: {
        url: "master/slot-penyimpanan",
        form: {
          zona_gudang_id: "",
          gudang_id: "",
          level: "",
          slot_penyimpanan_id_induk: "",
          history_induk: "",
          nama_slot_penyimpanan: "",
          kode_slot_penyimpanan: "",
          kapasitas: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/slot-penyimpanan/${this.id}`);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
      if (this.user.gudang_id) {
        this.parameters.form.gudang = this.user.gudang_id;
      }
    } catch (error) {
      // console.log("error", error);
      this.$router.back();
    }
  },

  async mounted() {
    await this.onSearchZonaGudang();
    await this.onSearchGudang();
    await this.onSearchSlotInduk();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //zona gudang
      "lookup_custom2", //gudang
      "lookup_custom3",
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
          slot_penyimpanan_id_induk: "",
          level: "",
          history_induk: "",
          nama_slot_penyimpanan: "",
          kode_slot_penyimpanan: "",
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
            "&gudang_id=" +
            this.parameters.form.gudang_id +
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

    onGetSlotInduk(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotInduk);

      this.isStopSearchSlotInduk = setTimeout(() => {
        this.slot_induk_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchSlotInduk();
      }, 600);
    },

    async onSearchSlotInduk() {
      if (!this.isLoadingGetSlotInduk) {
        this.isLoadingGetSlotInduk = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom3",
          query:
            "?search=" +
            this.slot_induk_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id +
            "&level=" +
            (this.parameters.form.level - 1) +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotInduk = false;
      }
    },

    async onSelectGudang() {
      await this.onSearchZonaGudang();
      await this.onSearchSlotInduk();
      this.parameters.form.zona_gudang_id = "";
      this.zona_gudang_search = "";
      this.parameters.form.slot_penyimpanan_id_induk = "";
      this.slot_induk_search = "";
    },

    formReset() {
      this.parameters.form = {
        zona_gudang_id: "",
        gudang_id: "",
        slot_penyimpanan_id_induk: "",
        level: "",
        history_induk: "",
        nama_slot_penyimpanan: "",
        kode_slot_penyimpanan: "",
        kapasitas: "",
      };
      this.$refs.formValidate.reset();
    },
  },
};
</script>
