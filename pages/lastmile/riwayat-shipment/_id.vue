<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">Rute Shipment</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div class="w-full">
        <div class="w-full gap-3">
          <div class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
              <div>
                <input-horizontal
                  label="Kode Shipment"
                  type="text"
                  name="kode_pick_order"
                  :isHorizontal="true"
                  v-model="parameters.form.shipment.kode_shipment"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Tanggal"
                  type="date"
                  name="tanggal"
                  :isHorizontal="true"
                  v-model="parameters.form.shipment.tanggal"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Kendaraan"
                  type="text"
                  name="kendaraan"
                  :isHorizontal="true"
                  v-model="parameters.form.shipment.kendaraan.nama_kendaraan"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Jenis Kendaraan"
                  type="text"
                  name="jenis_kendaraan"
                  :isHorizontal="true"
                  v-model="
                    parameters.form.shipment.jenis_kendaraan
                      .nama_jenis_kendaraan
                  "
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Pengemudi"
                  type="text"
                  name="staff"
                  :isHorizontal="true"
                  v-model="parameters.form.shipment.staff.nama_lengkap"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Gudang"
                  type="text"
                  name="gudang"
                  :isHorizontal="true"
                  v-model="parameters.form.gudang.nama_gudang"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Lokasi Asal"
                  type="text"
                  name="lokasi_asal"
                  :isHorizontal="true"
                  v-model="parameters.form.lokasi_asal.nama_lokasi"
                  :required="false"
                  :disabled="true"
                />
              </div>
              <div>
                <input-horizontal
                  label="Lokasi Tujuan"
                  type="text"
                  name="lokasi_tujuan"
                  :isHorizontal="true"
                  v-model="parameters.form.lokasi_tujuan.nama_lokasi"
                  :required="false"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="table-responsive overflow-y-hidden mb-7">
              <div
                class="mb-3 mt-5 text-xl font-bold uppercase flex justify-between items-start w-full"
              >
                <h1>Riwayat Rute Shipment</h1>
                <div class="flex justify-end gap-2">
                  <button
                    v-if="this.parameters.status !== 'SELESAI'"
                    type="button"
                    @click="show"
                    class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
                  >
                    <i class="fas fa-plus"></i>
                    <p class="text-xs font-medium">Tambah Riwayat</p>
                  </button>
                </div>
              </div>
              <table
                class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <th class="w-60 border border-gray-300">Lokasi Tujuan</th>
                    <th class="w-40 border border-gray-300">Status</th>
                    <th class="w-40 border border-gray-300">Tanggal</th>
                    <th class="w-40 border border-gray-300">Latitude</th>
                    <th class="w-40 border border-gray-300">Longitude</th>
                    <th class="w-60 border border-gray-300">Catatan</th>
                    <th class="w-40 border border-gray-300">File</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in parameters.form.riwayat_rute_shipments"
                    :key="i"
                    class="border-t border-gray-400 align-top"
                  >
                    <td class="border border-gray-300">
                      {{ item.lokasi_tujuan.nama_lokasi }}
                    </td>
                    <td class="border border-gray-300">
                      <div
                        v-if="item.status === 'MENUNGGU'"
                        class="p-1 w-1/2 mx-auto rounded-md bg-orange-500 font-semibold text-white text-center"
                      >
                        <p>Menunggu</p>
                      </div>
                      <div
                        v-if="item.status === 'SAMPAI'"
                        class="bg-blue-500 mx-auto p-1 w-1/2 rounded-md font-semibold text-white text-center"
                      >
                        <p>Sampai</p>
                      </div>
                      <div
                        v-if="item.status === 'PROSES'"
                        class="bg-blue-500 mx-auto p-1 w-1/2 rounded-md font-semibold text-white text-center"
                      >
                        <p>Proses</p>
                      </div>
                      <div
                        v-if="item.status === 'SELESAI'"
                        class="bg-green-500 mx-auto p-1 w-1/2 rounded-md font-semibold text-white text-center"
                      >
                        <p>Selesai</p>
                      </div>
                      <div
                        v-if="item.status === 'BATAL'"
                        class="bg-red-500 mx-auto p-1 w-1/2 rounded-md font-semibold text-white text-center"
                      >
                        <p>Batal</p>
                      </div>
                    </td>
                    <td class="border border-gray-300">
                      {{ item.tanggal }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.latitude }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.longitude }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.catatan }}
                    </td>
                    <td class="border border-gray-300">
                      <button
                        v-if="item.file"
                        @click="onShowPicture(item)"
                        type="button"
                        class="flex p-2 my-1 max-w-full rounded-md bg-blue-500 text-white hover:bg-blue-400 items-center"
                      >
                        <i class="fa fa-file mx-2"></i>
                        <span class="font-bold text-ellipsis">File</span>
                      </button>
                      <p v-else>File Tidak Ditemukan</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" to="modal-riwayat">
      <div
        @click="hide"
        class="fixed inset-0 bg-black bg-opacity-50 z-50"
      ></div>
      <div
        class="modal w-[600px] fade fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
        aria-hidden="true"
        id="modal-riwayat"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div
              class="modal-header flex justify-between text-xl font-bold mb-3"
            >
              <h5 class="modal-title">Tambah Riwayat</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="hide()"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <ValidationObserver
              v-slot="{ invalid, validate }"
              ref="formValidate"
            >
              <form
                @submit.prevent="validate().then(() => onSubmit(invalid))"
                enctype="multipart/form-data"
              >
                <div class="grid grid-cols-1 w-full gap-2 mt-10">
                  <div>
                    <div class="form-group flex items-center">
                      <label for="" class="w-1/2"
                        >Status <span class="text-danger">*</span></label
                      >
                      <select
                        name=""
                        id=""
                        v-model="parameters.form.status"
                        class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                      >
                        <option value="MENUNGGU">Menunggu</option>
                        <option value="SAMPAI">Sampai</option>
                        <option value="PROSES">Proses</option>
                        <option value="SELESAI">Selesai</option>
                        <option value="BATAL">Batal</option>
                      </select>
                    </div>
                  </div>
                  <div
                    v-if="parameters.form.status === 'SELESAI'"
                    class="flex items-center justify-between"
                  >
                    <label for="" class="w-1/2"
                      >File
                      <span
                        v-if="parameters.form.status === 'SELESAI'"
                        class="text-danger"
                        >*</span
                      ></label
                    >
                    <input
                      :required="parameters.form.status === 'SELESAI'"
                      type="file"
                      name="file"
                      id="file"
                      @change="handleFileChange"
                      class="w-1/2 p-1 rounded-sm border border-gray-300 outline-none"
                    />
                  </div>
                  <div class="form-group flex items-start mb-5">
                    <label for="keterangan" class="w-1/2 pt-1">Catatan</label>
                    <textarea
                      placeholder="Catatan"
                      class="w-1/2 pl-2 py-1 border border-gray-300 rounded focus:outline-none"
                      v-model="parameters.form.catatan"
                    ></textarea>
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
      </div>
    </div>
    <ShowPictureModal ref="pictureModal" />
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
import ShowPictureModal from "../../../components/transaksional/ShowPictureModal.vue";

export default {
  props: ["self"],
  middleware: ["checkRoleUserDetail"],

  components: {
    ShowPictureModal,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Konfirmasi Checkpoint",
      parameters: {
        url: "lastmile/riwayat-shipment",
        form: {
          status: "",
          catatan: "",
          file: "",

          gudang: {},
          shipment: {},
          lokasi_asal: {},
          lokasi_tujuan: {},

          jarak: "",
          biaya_bbm: "",
          waktu_sampai_tujuan: "",
          jenis_routing: "",
          jenis_kiriman: "",
          waktu_berangkat: "",
          tanggal_selesai: "",
          catatan_selesai: "",
          realisasi_waktu_sampai_tujuan: "",
          file_bukti_selesai: "",
          riwayat_rute_shipments: [],

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },

      showModal: false,
    };
  },

  async created() {
    await this.getRuteShipment();
  },

  mounted() {
    this.getGeoLocation();
    this.getUserAgent();
  },

  methods: {
    async getRuteShipment() {
      try {
        if (this.isEditable) {
          let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
          Object.keys(this.parameters.form).forEach((item) => {
            this.parameters.form[item] = res.data[item];
          });
        }
      } catch (error) {
        console.log(error);
        this.$router.back;
      } finally {
        this.isLoadingPage = false;
      }
    },
    getUserAgent() {
      this.parameters.form.user_agent = navigator.userAgent;
      if (this.parameters.form.user_agent.includes("Mobile")) {
        this.parameters.form.device = "Mobile";
      } else if (this.parameters.form.user_agent.includes("Tablet")) {
        this.parameters.form.device = "Tablet";
      } else {
        this.parameters.form.device = "Desktop";
      }
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.parameters.form.longitude =
              position.coords.longitude.toString();
            this.parameters.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
            // console.log(
            //   "latitude",
            //   this.parameters.form.latitude,
            //   "longitude",
            //   this.parameters.form.longitude
            // );
          },
          (error) => {
            this.isLoadingForm = false;
            this.$toaster.error(error.message);
          }
        );
      } else {
        this.$toaster.error("Geolocation not supported");
        // console.log("geolocation not supported");
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "lastmile/riwayat-shipment";

      let formData = new FormData();

      // Object.entries(this.parameters.form).forEach(([key, value]) => {
      //   if(key !== "rute-shipment")
      // })

      formData.append("status", this.parameters.form.status);
      formData.append("catatan", this.parameters.form.catatan);
      formData.append("catatan_selesai", this.parameters.form.catatan_selesai);
      formData.append("latitude", this.parameters.form.latitude);
      formData.append("longitude", this.parameters.form.longitude);
      formData.append("user_agent", this.parameters.form.user_agent);
      formData.append("device", this.parameters.form.device);

      if (this.parameters.form.file instanceof File) {
        formData.append("file", this.parameters.form.file);
      }

      if (this.isEditable) {
        url += "/" + this.id;
        formData.append("_method", "PUT");
      }

      this.$axios({
        url: url,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success("Rute Shipment Telah Diupdate");
          // this.$router.push("/lastmile/konfirmasi-checkpoint");
          this.hide();
          this.getRuteShipment();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          // this.$refs.formValidate.reset();
        });
    },

    formReset() {
      this.parameters.form = {
        status: "",
        catatan: "",
        file: "",

        gudang: {},
        shipment: {},
        lokasi_asal: {},
        lokasi_tujuan: {},

        jarak: "",
        biaya_bbm: "",
        waktu_sampai_tujuan: "",
        jenis_routing: "",
        jenis_kiriman: "",
        waktu_berangkat: "",
        tanggal_selesai: "",
        catatan_selesai: "",
        realisasi_waktu_sampai_tujuan: "",
        file_bukti_selesai: "",
        riwayat_rute_shipments: [],
      };
    },

    handleFileChange(e) {
      let file = e.target.files[0];
      this.parameters.form.file = file;
    },

    onShowPicture(item) {
      this.$refs.pictureModal.title = "Bukti Kiriman";
      this.$refs.pictureModal.src = "file_bukti_kiriman/" + item.file;
      this.$refs.pictureModal.show();
    },

    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
    },
  },
};
</script>
