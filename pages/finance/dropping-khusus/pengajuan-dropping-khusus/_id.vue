<template>
  <section class="min-h-screen">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">
          {{ isEditable ? "Edit" : "Tambah" }} {{ title }}
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
            <div
              class="my-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
                <div class="form-group">
                  <select-button
                    :self="{
                      label: 'Gudang',
                      optionLabel: 'nama_gudang',
                      lookup: lookup_custom1,
                      value: form.gudang_id,
                      onGet: onGetGudang,
                      isLoadingL: isLoadingGetGudang,
                      input: onSelectGudang,
                    }"
                    width="w-[50%]"
                    class="mb-5"
                    :required="true"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Tanggal"
                    type="date"
                    name="tanggal"
                    :isHorizontal="true"
                    v-model="form.tanggal"
                    :required="true"
                  />
                </div>
                <div class="form-group flex justify-between">
                  <label for="" class="w-1/2">Plafon Dropping</label>
                  <money
                    disabled
                    v-model="form.plafon_dropping"
                    class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>

                <div class="form-group flex justify-between items-start">
                  <label for="permintaan_dropping" class="w-1/2"
                    >Nominal Dropping Khusus
                  </label>
                  <money
                    v-model="form.permintaan_dropping"
                    class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                    @keydown.native="
                      $event.key === '-' ? $event.preventDefault() : null
                    "
                  />
                </div>
                <div class="form-group flex justify-between">
                  <label
                    for="lampiran"
                    class="w-1/2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Lampiran
                  </label>
                  <span class="w-1/2">
                    <input
                      class="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="lampiran"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      @change="handleFileChange"
                    />
                    <p class="italic text-sm text-slate-600">
                      .png, .jpg, .jpeg
                    </p>
                  </span>
                </div>
                <div>
                  <input-horizontal
                    label="No Referensi"
                    type="text"
                    name="no_referensi"
                    :isHorizontal="true"
                    v-model="form.no_referensi"
                    :required="false"
                  />
                </div>

                <div class="form-group flex justify-between">
                  <label for="keterangan" class="w-1/2">Keterangan</label>
                  <textarea
                    name="keterangan"
                    v-model="form.keterangan"
                    class="w-1/2 border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                  ></textarea>
                </div>
              </div>
            </div>
            <modal-footer-section
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
      title: "Pengajuan Dropping Khusus",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pengajuan Dropping Khusus",
      url: "finance/pengajuan-dropping-khusus",
      form: {
        gudang_id: "",
        keterangan: "",
        file_name_lampiran: "",
        tanggal: "",
        plafon_dropping: "",
        permintaan_dropping: "",
        no_referensi: "",

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
    };
  },

  created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    this.form.tanggal = formattedDate;
  },

  async mounted() {
    await this.onSearchGudang();
    if (this.lookup_custom1.data && !this.isEditable) {
      this.onSelectGudang(this.lookup_custom1.data[0]);
    }
    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1",
      // "lookup_custom2",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.form.user_agent = navigator.userAgent;
      if (this.form.user_agent.includes("Mobile")) {
        this.form.device = "Mobile";
      } else if (this.form.user_agent.includes("Tablet")) {
        this.form.device = "Tablet";
      } else {
        this.form.device = "Desktop";
      }
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.longitude = position.coords.longitude.toString();
            this.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
          },
          (error) => {
            this.isLoadingForm = false;
            this.$toaster.error(error.message);
          }
        );
      } else {
        this.$toaster.error("geolocation not supported");
      }
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang-user",
          lookup: "custom1",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetGudang = false;
      }
    },

    onSelectGudang(item) {
      if (item) {
        this.form.gudang_id = item;
        this.form.plafon_dropping = item.budget;
        console.log(item);
      } else {
        this.form.gudang_id = "";
      }
    },

    handleFileChange(event) {
      this.form.file_name_lampiran = event.target.files[0];
    },

    async onSubmit(invalid) {
      if (invalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = this.url;

      let formData = new FormData();

      Object.entries(this.form).forEach(([key, value]) => {
        if (key !== "gudang_id" && key !== "file_name_lampiran") {
          formData.append(key, value || "");
        }
      });

      formData.append(
        "gudang_id",
        typeof this.form.gudang_id === "object"
          ? this.form.gudang_id.gudang_id
          : this.form.gudang_id
      );

      if (this.form.file_name_lampiran instanceof File) {
        formData.append("file_name_lampiran", this.form.file_name_lampiran);
      }

      if (this.isEditable) {
        url += "/" + this.parameters.form.menu_id;
        formData.append("_method", "PUT");
      }

      this.$axios({
        url: url,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );

          if (!this.isEditable) {
            this.formReset();
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
      this.isEditable = false;
      this.form = {
        gudang_id: "",
        keterangan: "",
        file_name_lampiran: "",
        tanggal: "",
        plafon_dropping: "",
        permintaan_dropping: "",
        no_referensi: "",
      };
    },
  },
};
</script>
