<template>
  <section
    class="section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm min-h-screen"
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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
              <div class="form-group" v-if="isEditable">
                <input-form
                  label="Kode Lokasi Gudang"
                  type="text"
                  name="kode_lokasi_gudang"
                  v-model="parameters.form.kode_lokasi_gudang"
                  :disabled="true"
                />
              </div>

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
                    v-model="parameters.form.gudang_id"
                    @input="(item) => onSelectGudang(item)"
                    :disabled="lookup_custom2.data.length > 0"
                  >
                    <!-- :reduce="(item) => item.gudang_id" -->
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
              <ValidationProvider name="lokasi" rules="required">
                <div class="form-group w-full items-center mb-5">
                  <label for="" class="w-4/12"
                    >Lokasi <span class="text-danger">*</span></label
                  >
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_lokasi"
                    :loading="isLoadingGetLokasi"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetLokasi"
                    v-model="parameters.form.lokasi_id"
                  >
                    <!-- :reduce="(item) => item.lokasi_id" -->
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom1.data.length || search"
                    >
                      <span
                        v-if="lookup_custom1.current_page > 1"
                        @click="onGetLokasi(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetLokasi(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>

              <ValidationProvider name="gudang">
                <div class="form-group w-full items-center mb-5">
                  <label for="" class="w-4/12">Jalur Lokasi</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="nama_jalur"
                    :loading="isLoadingGetJalurLokasi"
                    :options="lookup_custom3.data"
                    :filterable="false"
                    @search="onGetJalurLokasi"
                    v-model="parameters.form.jalur_lokasi_id"
                  >
                    <!-- :reduce="(item) => item.jalur_lokasi_id" -->
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-1 border-t flex justify-between"
                      v-if="lookup_custom3.data.length || search"
                    >
                      <span
                        v-if="lookup_custom3.current_page > 1"
                        @click="onGetJalurLokasi(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom3.last_page > lookup_custom3.current_page
                        "
                        @click="onGetJalurLokasi(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                </div>
              </ValidationProvider>
              <div class="form-group">
                <label for=""
                  >Status Plant <span class="text-danger">*</span></label
                >
                <select
                  required
                  name=""
                  id=""
                  v-model="parameters.form.is_plant"
                  class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                >
                  <option value="0">Bukan Plant</option>
                  <option value="1">Plant</option>
                </select>
              </div>

              <div class="form-group">
                <label for=""
                  >Status Shipto <span class="text-danger">*</span></label
                >
                <select
                  required
                  name=""
                  id=""
                  v-model="parameters.form.is_shipto"
                  class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                >
                  <option value="0">Bukan Shipto</option>
                  <option value="1">Shipto</option>
                </select>
              </div>
              <div class="form-group">
                <label for=""
                  >Status Warehouse <span class="text-danger">*</span></label
                >
                <select
                  required
                  name=""
                  id=""
                  v-model="parameters.form.is_warehouse"
                  class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                >
                  <option value="0">Bukan Warehouse</option>
                  <option value="1">Warehouse</option>
                </select>
              </div>
              <div>
                <label for="keterangan" class="mb-2">Keterangan</label>
                <textarea
                  class="p-1 rounded-md border border-gray-300 outline-none w-full"
                  name="keterangan"
                  id="keterangan"
                  v-model="parameters.form.keterangan"
                ></textarea>
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
      title: "Lokasi Gudang",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      user: this.$auth.user,

      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      isStopSearchJalurLokasi: false,
      isLoadingGetJalurLokasi: false,
      jalur_lokasi_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Lokasi Gudang",
      parameters: {
        url: "master/lokasi-gudang",
        form: {
          kode_lokasi_gudang: "",
          gudang_id: "",
          lokasi_id: "",
          jalur_lokasi_id: "",
          is_plant: "0",
          is_shipto: "1",
          is_warehouse: "0",
          keterangan: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`master/lokasi-gudang/${this.id}`);
        this.parameters.form = res.data;
        this.parameters.form.gudang_id = res.data.gudang;
        this.parameters.form.lokasi_id = res.data.lokasi;
        this.parameters.form.jalur_lokasi_id = res.data.jalur_lokasi;
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
    await this.onSearchLokasi();
    await this.onSearchGudang();
    if (this.lookup_custom2.data.length > 0) {
      await this.onSelectGudang(this.lookup_custom2.data[0]);
    }
    // await this.onSearchJalurLokasi();
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

      let url = this.parameters.url;

      let formData = {
        ...this.parameters.form,
        gudang_id:
          typeof this.parameters.form.gudang_id === "object"
            ? this.parameters.form.gudang_id.gudang_id
            : this.parameters.form.gudang_id,
        lokasi_id:
          typeof this.parameters.form.lokasi_id === "object"
            ? this.parameters.form.lokasi_id.lokasi_id
            : this.parameters.form.lokasi_id,
        jalur_lokasi_id:
          typeof this.parameters.form.jalur_lokasi_id === "object"
            ? this.parameters.form.jalur_lokasi_id.jalur_lokasi_id
            : this.parameters.form.jalur_lokasi_id,
      };

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        url: url,
        method: this.isEditable ? "PUT" : "POST",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );
          if (!this.isEditable) {
            this.parameters.form = {
              kode_lokasi_gudang: "",
              gudang_id: "",
              lokasi_id: "",
              jalur_lokasi_id: "",
              is_plant: "0",
              is_shipto: "1",
              is_warehouse: "0",
              keterangan: "",
            };
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err.message);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
          // this.$refs.ruteProvider.reset();
        });
    },

    onGetLokasi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchLokasi);

      this.isStopSearchLokasi = setTimeout(() => {
        this.lokasi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchLokasi();
      }, 600);
    },

    async onSearchLokasi() {
      if (!this.isLoadingGetLokasi) {
        this.isLoadingGetLokasi = true;

        await this.lookUp({
          url: "master/lokasi/get-lokasi",
          lookup: "custom1",
          query:
            "?search=" +
            this.lokasi_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetLokasi = false;
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
          url: "master/gudang/get-gudang-user",
          lookup: "custom2",
          query:
            "?search=" +
            this.gudang_search +
            "&user_id=" +
            this.user.user_id +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    async onSelectGudang(item) {
      if (item) {
        this.parameters.form.gudang_id = item;
        this.parameters.form.jalur_lokasi_id = "";
        await this.onSearchJalurLokasi();
      } else {
        this.parameters.form.gudang_id = "";
        this.parameters.form.jalur_lokasi_id = "";
      }
    },

    onGetJalurLokasi(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchJalurLokasi);

      this.isStopSearchJalurLokasi = setTimeout(() => {
        this.jalur_lokasi_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchJalurLokasi();
      }, 600);
    },

    async onSearchJalurLokasi() {
      if (!this.isLoadingGetJalurLokasi) {
        this.isLoadingGetJalurLokasi = true;

        await this.lookUp({
          url: "master/jalur-lokasi/get-jalur-lokasi",
          lookup: "custom3",
          query:
            "?search=" +
            this.jalur_lokasi_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id.gudang_id +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetJalurLokasi = false;
      }
    },

    // async onSelectGudang() {
    //   await this.onSearchLokasi();
    //   await this.onSearchJalurLokasi();
    //   this.parameters.form.lokasi_id = "";
    //   this.lokasi_search = "";
    //   this.parameters.form.lokasi_gudang_id_induk = "";
    //   this.jalur_lokasi_search = "";
    // },

    formReset() {
      this.parameters.form = {
        kode_lokasi_gudang: "",
        gudang_id: "",
        lokasi_id: "",
        jalur_lokasi_id: "",
        is_plant: "0",
        is_shipto: "1",
        is_warehouse: "0",
        keterangan: "",
      };
      this.$refs.formValidate.reset();
    },
  },
};
</script>
