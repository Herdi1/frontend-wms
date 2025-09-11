<template>
  <section>
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
            <div class="w-full gap-3">
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full"
                >
                  <div class="flex w-full items-center">
                    <label class="w-1/2">Kode Pengajuan</label>
                    <div
                      class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                    >
                      {{ form.kode_pengajuan ? form.kode_pengajuan : "-" }}
                    </div>
                  </div>
                  <div class="flex w-full items-center">
                    <label class="w-1/2">Tanggal</label>
                    <div
                      class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                    >
                      {{ form.tanggal ? formatDate(form.tanggal) : "-" }}
                    </div>
                  </div>
                  <div class="flex w-full items-center">
                    <label class="w-1/2">Gudang</label>
                    <div
                      class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                    >
                      {{ form.gudang_id ? form.gudang_id.nama_gudang : "-" }}
                    </div>
                  </div>
                  <div class="flex w-full items-center">
                    <label class="w-1/2">Plafon Dropping</label>
                    <div
                      class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                    >
                      {{ form.plafon_dropping | formatPrice }}
                    </div>
                  </div>
                  <div class="flex w-full items-center">
                    <label class="w-1/2">Permintaan Dropping</label>
                    <div
                      class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                    >
                      {{ form.permintaan_dropping | formatPrice }}
                    </div>
                  </div>
                  <div class="flex w-full items-center">
                    <label class="w-1/2">No Referensi</label>
                    <div
                      class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                    >
                      {{ form.no_referensi ? form.no_referensi : "-" }}
                    </div>
                  </div>
                  <div class="flex w-full items-start">
                    <label class="w-1/2">Keterangan</label>
                    <textarea
                      disabled
                      name="keterangan"
                      v-model="form.keterangan"
                      class="w-1/2 border border-gray-300 rounded-md bg-gray-50 outline-none p-1 active:outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div
                class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
              >
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full"
                >
                  <div class="flex items-start w-full m-1 pr-1">
                    <label for="" class="w-1/2">Status Pengajuan</label>
                    <select
                      name=""
                      id=""
                      v-model="form.status_pengajuan"
                      class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                    >
                      <option value="MENUNGGU">Menunggu</option>
                      <option value="PROSES">Proses</option>
                      <option value="SETUJU">Setuju</option>
                      <option value="BATAL">Batal</option>
                    </select>
                  </div>
                  <div class="flex w-full items-start">
                    <label class="w-1/2">Catatan</label>
                    <textarea
                      name="catatan"
                      v-model="form.catatan"
                      class="w-1/2 border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                    ></textarea>
                  </div>
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
      title: "Approve Pengajuan Dropping Khusus",
    };
  },

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Approve Pengajuan Dropping Khusus",
      url: "finance/approve-pengajuan-dropping-khusus",
      form: {
        kode_pengajuan: "",
        gudang_id: "",
        keterangan: "",
        file_name_lampiran: "",
        tanggal: "",
        plafon_dropping: "",
        permintaan_dropping: "",
        no_referensi: "",

        status_pengajuan: "",
        catatan: "",

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`${this.url}/${this.id}`);
      Object.keys(this.form).forEach((item) => {
        this.form[item] = res.data[item];
      });
      this.form.gudang_id = res.data.gudang;
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
    }
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      // "lookup_custom1",
      // "lookup_custom2",
    ]),
  },

  mounted() {
    this.getUserAgent();
    this.getGeoLocation();
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    formatDate(dateString) {
      if (!dateString) return "";
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    },

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

    onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let url = this.url;

      let formData = {
        status_pengajuan: this.form.status_pengajuan,
        catatan: this.form.catatan,
        user_agent: this.form.user_agent,
        device: this.form.device,
        longitude: this.form.longitude,
        latitude: this.form.latitude,
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
            "Berhasil " + (this.isEditable ? "Update" : "Tambah")
          );

          if (!this.isEditable) {
            this.form = {
              ...this.formReset(),
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
      this.isEditable = false;
      this.form = {
        gudang_id: "",
        keterangan: "",
        file_name_lampiran: "",
        tanggal: "",
        plafon_dropping: "",
        permintaan_dropping: "",
        no_referensi: "",

        status_pengajuan: "",
        catatan: "",

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      };
    },
  },
};
</script>
