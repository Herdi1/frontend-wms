<template>
  <section class="min-h-screen">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">
          {{ isEditable ? "Edit" : "Tambah" }} Post Saldo Akun SAP
        </h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div class="w-full">
        <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
          <form
            @submit.prevent="validate().then(() => onSubmit(invalid))"
            autocomplete="off"
          >
            <div class="w-full">
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full"
                >
                  <div class="form-group" v-if="isEditable">
                    <input-horizontal
                      label="Kode Post"
                      type="text"
                      name="kode_post"
                      :required="true"
                      v-model="form.kode_post"
                      :disabled="true"
                    />
                  </div>
                  <div class="form-group">
                    <select-button
                      :self="{
                        label: 'Gudang',
                        optionLabel: 'nama_gudang',
                        lookup: lookup_custom6,
                        value: form.gudang_id,
                        onGet: onGetGudang,
                        isLoading: isLoadingGetGudang,
                        input: onSelectGudang,
                      }"
                      :required="true"
                      width="w-[50%]"
                      class="mb-5"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Tanggal"
                      type="date"
                      name="tanggal"
                      :required="true"
                      v-model="form.tanggal"
                      :disabled="true"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Periode Awal"
                      type="date"
                      name="periode_awal"
                      :required="true"
                      v-model="form.periode_awal"
                      :max="form.periode_akhir"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Periode Akhir"
                      type="date"
                      name="periode_akhir"
                      :required="true"
                      v-model="form.periode_akhir"
                      :min="form.periode_awal"
                    />
                  </div>
                  <div class="form-group">
                    <input-horizontal
                      label="Kode Post Eksternal"
                      type="text"
                      name="kode_post_eksternal"
                      :required="true"
                      v-model="form.kode_post_eksternal"
                    />
                  </div>
                  <div class="form-group flex justify-between">
                    <label for="keterangan" class="w-1/2">Keterangan</label>
                    <textarea
                      name="keterangan"
                      id="keterangan"
                      v-model="form.keterangan"
                      placeholder="Keterangan"
                      class="w-1/2 p-1 rounded-md outline-none border border-gray-300"
                    ></textarea>
                  </div>
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
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  middleware: ["checkRoleUserDetail"],

  head() {
    return {
      title: "Post Saldo Akun SAP",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Post Saldo Akun SAP",
      url: "finance/post-eksternal-saldo-akun",
      form: {
        tanggal: "",
        periode_awal: "",
        periode_akhir: "",
        kode_post: "",
        kode_post_eksternal: "",
        gudang_id: "",
        keterangan: "",
      },
      defaultForm: {
        tanggal: "",
        periode_awal: "",
        periode_akhir: "",
        kode_post: "",
        kode_post_eksternal: "",
        gudang_id: "",
        keterangan: "",
      },

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",
    };
  },

  async created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    this.form.tanggal = formattedDate;
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`${this.url}/${this.id}`);
        Object.keys(this.form).forEach((item) => {
          this.form[item] = res.data[item];
        });
        this.form.gudang_id = res.data.gudang ?? "";
      }
      this.isLoadingPage = false;
    } catch (error) {
      console.log(error);
    }
  },

  async mounted() {
    await this.onSearchGudang();
    if (this.lookup_custom6.data.length > 0) {
      this.form.gudang_id = this.lookup_custom6.data[0];
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      "lookup_custom2",
      "lookup_custom3",
      "lookup_custom4",
      "lookup_custom5",
      "lookup_custom6",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    formattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = this.url;
      let formData = {
        ...this.form,
        gudang_id:
          typeof this.form.gudang_id === "object"
            ? this.form.gudang_id.gudang_id
            : "",
      };

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        url: url,
        method: this.isEditable ? "put" : "post",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Berhasil " + (this.isEditable ? "Update" : "Tambah") + " Data"
          );

          if (!this.isEditable) {
            this.form = {
              ...this.defaultForm,
            };
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    formReset() {
      this.isLoadingForm = false;
      this.form = {
        tanggal: this.formattedDate(),
        periode_awal: "",
        periode_akhir: "",
        kode_post: "",
        kode_post_eksternal: "",
        keterangan: "",
      };
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang-user",
          lookup: "custom6",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },
  },
};
</script>
