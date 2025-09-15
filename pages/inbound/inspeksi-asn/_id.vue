<template>
  <section class="section">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 class="text-xl font-bold mb-2 uppercase">Inspeksi ASN</h1>
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
          <div
            class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="w-full pt-3">
              <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-bold">Data ASN</h1>
                <div class=" "></div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mb-7">
                <div>
                  <input-horizontal
                    label="Kode External"
                    type="text"
                    name="kode_sap"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.kode_sap"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Kode ASN"
                    type="text"
                    name="kode_asn"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.kode_asn"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Tanggal"
                    type="date"
                    name="tanggal"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.tanggal"
                    :required="false"
                  />
                </div>
                <div v-if="form.pelanggan">
                  <input-horizontal
                    label="Pelanggan"
                    type="text"
                    name="pelanggan"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.pelanggan.nama_pelanggan"
                    :required="false"
                  />
                </div>
                <div v-if="form.lokasi_asal_muat">
                  <input-horizontal
                    label="Asal Muat"
                    type="text"
                    name="lokasi_asal_muat"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.lokasi_asal_muat.nama_lokasi"
                    :required="false"
                  />
                </div>
                <div v-else>
                  <input-horizontal
                    label="Asal Muat"
                    type="text"
                    name="asal_muat"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.asal_muat"
                    :required="false"
                  />
                </div>
                <div v-if="form.vendor_transporter">
                  <input-horizontal
                    label="Transporter"
                    type="text"
                    name="nama_transporter"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.vendor_transporter.nama_vendor"
                    :required="false"
                  />
                </div>
                <div v-else>
                  <input-horizontal
                    label="Transporter"
                    type="text"
                    name="nama_transporter"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.nama_transporter"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Nomor Surat Jalan"
                    type="text"
                    name="surat_jalan"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.surat_jalan"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Nomor Referensi 1"
                    type="text"
                    name="no_referensi"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.no_referensi"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Nomor Referensi 2"
                    type="text"
                    name="no_referensi_2"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.no_referensi_2"
                    :required="false"
                  />
                </div>
                <div class="flex w-full items-center" v-if="form.kendaraan">
                  <label class="w-1/2">Nama Kendaraan</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.kendaraan ? form.kendaraan.nama_kendaraan : "-" }}
                  </div>
                </div>
                <div class="flex w-full items-center" v-if="form.kendaraan">
                  <label class="w-1/2">Kode Kendaraan</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.kendaraan ? form.kendaraan.kode_kendaraan : "-" }}
                  </div>
                </div>
                <div class="flex w-full items-center" v-if="form.kendaraan">
                  <label class="w-1/2">Plat Nomor</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.kendaraan ? form.kendaraan.plat_nomor : "-" }}
                  </div>
                </div>
                <div v-if="form.staff">
                  <input-horizontal
                    label="Pengemudi"
                    type="text"
                    name="pengemudi"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.staff.nama_lengkap"
                    :required="false"
                  />
                </div>
                <div v-if="form.perekiraan_tiba">
                  <input-horizontal
                    label="Perkiraan Tiba"
                    type="date"
                    name="perkiraan_tiba"
                    :disabled="true"
                    labelWidth="w-[50%]"
                    inputWidth="w-[50%]"
                    :isHorizontal="true"
                    v-model="form.perkiraan_tiba"
                    :required="false"
                  />
                </div>
                <div class="col-span-2">
                  <div class="grid grid-cols-2 gap-2">
                    <div class="flex justify-between">
                      <label for="" class="w-1/2">Kebutuhan Peralatan</label>
                      <textarea
                        disabled
                        name="kebutuhan_peralatan"
                        v-model="form.kebutuhan_peralatan"
                        class="w-1/2 border border-gray-300 rounded-md bg-gray-50 outline-none p-1 active:outline-none"
                      ></textarea>
                    </div>
                    <div class="flex justify-between">
                      <label for="" class="w-1/2">Handling Intruction</label>
                      <textarea
                        disabled
                        name="handling_instruction"
                        v-model="form.handling_instruction"
                        class="w-1/2 border border-gray-300 rounded-md bg-gray-50 outline-none p-1 active:outline-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="col-span-2">
                  <label for="">Catatan</label>
                  <textarea
                    disabled
                    name="catatan"
                    v-model="form.catatan"
                    class="w-full border bg-gray-50 border-gray-300 rounded-md outline-none p-1 active:outline-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <!-- inspeksi -->
            <!-- <div class="w-full flex justify-between items-center">
              <h1 class="text-xl font-bold">Inspeksi ASN</h1>
              <div class=" "></div>
            </div> -->
            <div class="form-group flex items-center">
              <label for="status_inspeksi" class="w-1/2">Status Inspeksi</label>
              <select
                class="w-1/2 p-1 border rounded focus:outline-none"
                name="status_inspeksi"
                id="status_inspeksi"
                v-model="form.status_inspeksi"
              >
                <option value="">Pilih</option>
                <option value="MENUNGGU">Menunggu</option>
                <option value="DITERIMA">Diterima</option>
                <option value="DITOLAK">Ditolak</option>
              </select>
            </div>

            <div
              class="form-group w-full"
              v-if="form.status_inspeksi === 'DITOLAK'"
            >
              <select-button
                :self="{
                  label: 'Alasan Penolakan',
                  optionLabel: 'nama_alasan_beda_plan',
                  lookup: lookup_custom6,
                  value: form.alasan_beda_plan_id,
                  onGet: onGetAlasan,
                  isLoadingL: isLoadingGetAlasan,
                  input: onSelectAlasan,
                }"
                width="w-[50%]"
                required="true"
              />
            </div>
          </div>
          <modal-footer-section
            :isLoadingForm="isLoadingForm"
            @reset="formReset()"
            class="mb-5"
          />
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isStopSearchZonaPlan: false,
      isLoadingGetZonaPlan: false,
      zona_plan_search: "",

      isStopSearchSlotAisle: false,
      isLoadingGetSlotAisle: false,
      slot_aisle_search: "",

      isStopSearchSlotRack: false,
      isLoadingGetSlotRack: false,
      slot_rack_search: "",

      isStopSearchSlotLevel: false,
      isLoadingGetSlotLevel: false,
      slot_level_search: "",

      isStopSearchSlotBin: false,
      isLoadingGetSlotBin: false,
      slot_bin_search: "",

      isStopSearchAlasan: false,
      isLoadingGetAlasan: false,
      alasan_search: "",

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Inspeksi ASN",
      url: "inbound/inspeksi-asn",

      form: {
        inspeksi_asn_id: "",
        gudang_id: "",
        supplier_id: "",
        kode_sap: "",
        kode_asn: "",
        tanggal: "",
        lokasi_asal_muat: {},
        asal_muat: "",
        nama_transporter: "",
        vendor_transporter: {},
        surat_jalan: "",
        no_referensi: "",
        no_referensi_2: "",
        kendaraan: {},
        pengemudi: {},
        perkiraan_tiba: "",
        kebutuhan_peralatan: "",
        handling_instruction: "",
        catatan: "",
        status_transaksi: {},
        staff: {},

        status_inspeksi: "",
        tanggal_inspeksi: "",
        catatan_inspeksi: "",
        alasan_beda_plan_id: "",
        asn_details: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
      default_form: {
        inspeksi_asn_id: "",

        status_inspeksi: "",
        tanggal_inspeksi: "",
        catatan_inspeksi: "",
        asn_details: [],

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`inbound/inspeksi-asn/${this.id}`);
        Object.keys(this.form).forEach((item) => {
          if (item !== "asn_details") {
            this.form[item] = res.data[item];
          }
        });
        this.form.alasan_beda_plan_id = res.data.alasan_beda_plan ?? "";

        this.form.asn_details = res.data.asn_details.map((item) => {
          return {
            ...item,
            asn_details_id: item || "",
          };
        });

        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/inbound/inspeksi-asn");
    }
  },

  async mounted() {
    await this.onSearchZonaPlan();
    await this.onSearchSlotAisle();
    await this.onSearchSlotRack();
    await this.onSearchSlotLevel();
    await this.onSearchSlotBin();
    await this.onSearchAlasan();
    this.getUserAgent();
    this.getGeoLocation();
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
      console.log("user agent", this.form.user_agent);
      console.log("device", this.form.device);
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.form.longitude = position.coords.longitude.toString();
            this.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
            console.log(
              "latitude",
              this.form.latitude,
              "longitude",
              this.form.longitude
            );
          },
          (error) => {
            this.isLoadingForm = false;
            this.$toaster.error(error.message);
          }
        );
      } else {
        this.$toaster.error("geolocation not supported");
        // console.log("geolocation not supported");
      }
    },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "inbound/inspeksi-asn";

      if (this.form.status_inspeksi === "DITOLAK") {
        if (this.form.alasan_beda_plan_id === "") {
          this.$toaster.error(
            "Untuk status inspeksi ditolak, catatan inspeksi tidak boleh kosong!"
          );
          return;
        }
      }

      let formData = {
        ...this.form,
        alasan_beda_plan_id:
          typeof this.form.alasan_beda_plan_id === "object"
            ? this.form.alasan_beda_plan_id.alasan_beda_plan_id
            : "",
      };

      // today's date
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      formData.tanggal_inspeksi = formattedDate;

      formData.asn_details = formData.asn_details.map((item) => {
        return {
          ...item,
          asn_detail_id: item.asn_detail_id ? item.asn_detail_id : "",
        };
      });

      if (this.user.gudang_id) {
        this.form.gudang_id = this.user.gudang_id;
      }

      // console.log("form", this.parameters.form);

      if (this.isEditable) {
        url += "/" + this.id;
      }

      console.log(formData);

      this.$axios({
        method: this.isEditable ? "put" : "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );

          if (!this.isEditable) {
            this.form = this.default_form;
          }
          this.$router.push("/inbound/inspeksi-asn");
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },

    AddAsnDetails() {
      this.form.asn_details.push({
        zona_gudang_id_plan: "",
        slot_penyimpanan_id_aisle_plan: "",
        slot_penyimpanan_id_rack_plan: "",
        slot_penyimpanan_id_level_plan: "",
        slot_penyimpanan_id_bin_plan: "",
        asn: {},
        gudang: {},
        item: {},
        pelanggan: {},
        item_gudang: {},
        setial_number: "",
        no_referensi: "",
        quantity: "",
        panjang: "",
        lebar: "",
        tinggi: "",
        berat: "",
        note: "",
      });
    },

    onDeleteItem(index) {
      this.form.asn_details = this.form.asn_details.filter(
        (_, itemIndex) => index !== itemIndex
      );
    },

    onGetAlasan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchAlasan);

      this.isStopSearchAlasan = setTimeout(() => {
        this.alasan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchAlasan();
      }, 600);
    },

    async onSearchAlasan() {
      if (!this.isLoadingGetAlasan) {
        this.isLoadingGetAlasan = true;

        await this.lookUp({
          url: "master/alasan-beda-plan/get-alasan-beda-plan",
          lookup: "custom6",
          query:
            "?search=" +
            this.alasan_search +
            "&tipe_alasan_id=3" +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetAlasan = false;
      }
    },

    onSelectAlasan(item) {
      if (item) {
        this.form.alasan_beda_plan_id = item;
      } else {
        this.form.alasan_beda_plan_id = "";
      }
    },

    // Get zona plan
    onGetZonaPlan(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchZonaPlan);

      this.isStopSearchZonaPlan = setTimeout(() => {
        this.zona_plan_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchZonaPlan();
      }, 600);
    },

    async onSearchZonaPlan() {
      if (!this.isLoadingGetZonaPlan) {
        this.isLoadingGetZonaPlan = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.zona_plan_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetZonaPlan = false;
      }
    },

    // Get slot aisle
    onGetSlotAisle(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotAisle);

      this.isStopSearchSlotAisle = setTimeout(() => {
        this.slot_aisle_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom2.current_page = isNext
            ? this.lookup_custom2.current_page + 1
            : this.lookup_custom2.current_page - 1;
        } else {
          this.lookup_custom2.current_page = 1;
        }

        this.onSearchSlotAisle();
      }, 600);
    },

    async onSearchSlotAisle() {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom2",
          query:
            "?search=" +
            this.slot_aisle_search +
            "&level=1" +
            "&page=" +
            this.lookup_custom2.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    // Get slot rack
    onGetSlotRack(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotRack);

      this.isStopSearchSlotRack = setTimeout(() => {
        this.slot_rack_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }

        this.onSearchSlotRack();
      }, 600);
    },

    async onSearchSlotRack() {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom3",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=2" +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    // Get slot level
    onGetSlotLevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotLevel);

      this.isStopSearchSlotLevel = setTimeout(() => {
        this.slot_level_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchSlotLevel();
      }, 600);
    },

    async onSearchSlotLevel() {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom4",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=3" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    // Get slot level
    onGetSlotBin(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotBin);

      this.isStopSearchSlotBin = setTimeout(() => {
        this.slot_bin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchSlotBin();
      }, 600);
    },

    async onSearchSlotBin() {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom5",
          query:
            "?search=" +
            this.slot_bin_search +
            "&level=4" +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },
  },
};
</script>
