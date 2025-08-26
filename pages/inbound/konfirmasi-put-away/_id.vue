<template>
  <section class="section">
    <div class="section-body mb-4" v-if="!isLoadingPage">
      <div class="flex justify-between items-center w-full">
        <h1 class="text-xl font-bold mb-2 uppercase">Konfirmasi Put Away</h1>
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
          <div class="w-full pt-3">
            <div
              class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div class="flex justify-between items-center mb-5">
                <label for="status_put_away" class="w[40%]"
                  >Status Put Away</label
                >
                <select
                  name="status_put_away"
                  id="status_put_away"
                  class="w-[60%] p-1 border rounded focus:outline-none"
                  v-model="form.status_put_away"
                >
                  <option value="MENUNGGU">Menunggu</option>
                  <option value="PROSES">Proses</option>
                  <option value="SELESAI">Selesai</option>
                </select>
              </div>
              <div class="flex justify-between items-center">
                <label for="catatan_put_away" class="w-[40%]"
                  >Catatan Put Away</label
                >
                <textarea
                  name="catatan_put_away"
                  v-model="form.catatan_put_away"
                  class="w-[60%] border border-gray-300 rounded-md bg-white outline-none p-1 active:outline-none"
                ></textarea>
              </div>
            </div>

            <div>
              <h1 class="text-xl font-bold mb-2 uppercase">Data Inbound</h1>
            </div>
            <div
              class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-7">
                <div>
                  <input-horizontal
                    label="Kode Inbound"
                    type="text"
                    name="kode_inbound"
                    :disabled="true"
                    v-model="form.kode_inbound"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Kode TKBM"
                    type="text"
                    name="kode_tkbm"
                    :disabled="true"
                    v-model="form.kode_tkbm"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Tanggal"
                    type="date"
                    name="tanggal"
                    :disabled="true"
                    v-model="form.tanggal"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="Doc Type External"
                    type="text"
                    name="doc_type_sap"
                    :disabled="true"
                    v-model="form.doc_type_sap"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="No Referensi 1"
                    type="text"
                    name="no_referensi_1"
                    :disabled="true"
                    v-model="form.no_referensi_1"
                    :required="false"
                  />
                </div>
                <div>
                  <input-horizontal
                    label="No Referensi 2"
                    type="text"
                    name="no_referensi_2"
                    :disabled="true"
                    v-model="form.no_referensi_2"
                    :required="false"
                  />
                </div>
                <div class="flex w-full items-center my-1">
                  <label class="w-1/2">Gudang</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.gudang_id ? form.gudang_id.nama_gudang : "-" }}
                  </div>
                </div>
                <div class="flex w-full items-center my-1">
                  <label class="w-1/2">Pelanggan</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{
                      form.pelanggan_id ? form.pelanggan_id.nama_pelanggan : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center my-1">
                  <label class="w-1/2">Supplier</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{
                      form.supplier_id ? form.supplier_id.nama_supplier : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center my-1">
                  <label class="w-1/2">Vendor Transporter</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{
                      form.vendor_id_transporter
                        ? form.vendor_id_transporter.nama_vendor
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center my-1">
                  <label class="w-1/2">Staff</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.staff_id ? form.staff_id.nama_lengkap : "-" }}
                  </div>
                </div>
                <div class="flex w-full items-center my-1">
                  <label class="w-1/2">Keterangan</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-1/2"
                  >
                    {{ form.keterangan ? form.keterangan : "-" }}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h1 class="text-xl font-bold mb-2 uppercase">Inbound Details</h1>
            </div>
            <div
              class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div class="table-responsive overflow-y-hidden mb-7">
                <table
                  class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                >
                  <thead>
                    <tr class="text-sm uppercase text-nowrap">
                      <th class="w-[200px] border border-gray-300">Item</th>
                      <th class="w-[200px] border border-gray-300">
                        Serial Number
                      </th>
                      <th class="w-[200px] border border-gray-300">Quantity</th>
                      <th class="w-[200px] border border-gray-300">
                        Tanggal Expired
                      </th>
                      <th class="w-[200px] border border-gray-300">
                        Zona Gudang
                      </th>
                      <th class="w-[200px] border border-gray-300">Aisle</th>
                      <th class="w-[200px] border border-gray-300">Rack</th>
                      <th class="w-[200px] border border-gray-300">Level</th>
                      <th class="w-[200px] border border-gray-300">Bin</th>
                      <th class="w-[300px] border border-gray-300">
                        Keterangan
                      </th>
                      <th class="w-[300px] border border-gray-300">
                        Alasan Beda Plan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, i) in form.inbound_details"
                      :key="i"
                      class="align-top"
                    >
                      <td class="border border-gray-300">
                        {{ item.item ? item.item.nama_item : "-" }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.serial_number ? item.serial_number : "" }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.quantity ? item.quantity : "" }}
                        <p>
                          Valuation:
                          <span class="font-bold">{{
                            item.kode_valuation
                          }}</span>
                        </p>
                      </td>
                      <td class="border border-gray-300">
                        {{ item.tanggal_expired ? item.tanggal_expired : "" }}
                      </td>
                      <td class="border border-gray-300">
                        {{
                          item.zona_gudang
                            ? item.zona_gudang.nama_zona_gudang
                            : ""
                        }}
                      </td>
                      <td class="border border-gray-300">
                        {{
                          item.slot_penyimpanan_aisle
                            ? item.slot_penyimpanan_aisle.nama_slot_penyimpanan
                            : ""
                        }}
                      </td>
                      <td class="border border-gray-300">
                        {{
                          item.slot_penyimpanan_rack
                            ? item.slot_penyimpanan_rack.nama_slot_penyimpanan
                            : ""
                        }}
                      </td>
                      <td class="border border-gray-300">
                        {{
                          item.slot_penyimpanan_level
                            ? item.slot_penyimpanan_level.nama_slot_penyimpanan
                            : ""
                        }}
                      </td>
                      <td class="border border-gray-300">
                        {{
                          item.slot_penyimpanan_bin
                            ? item.slot_penyimpanan_bin.nama_slot_penyimpanan
                            : ""
                        }}
                      </td>
                      <td class="border border-gray-300">
                        {{ item.keterangan ? item.keterangan : "" }}
                      </td>
                      <td class="border border-gray-300">
                        {{
                          item.alasan_beda_plan
                            ? item.alasan_beda_plan.nama_alasan_beda_plan
                            : ""
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <modal-footer-section
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
              class="mb-5"
            />
          </div>
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

      user: this.$auth.user,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Konfirmasi Put Away",
      url: "inbound/konfirmasi-put-away",

      form: {
        gudang_id: "",
        supplier_id: "",
        pelanggan_id: "",
        peralatan_id: "",
        vendor_id_transporter: "",
        staff_id: "",
        surat_jalan: "",
        kode_tkbm: "",
        doc_type_sap: "",
        tanggal: "",
        kode_inbound: "",
        no_referensi_1: "",
        no_referensi_2: "",
        keterangan: "",
        inbound_details: [],

        status_put_away: "",
        tanggal_put_away: "",
        catatan_put_away: "",

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      },

      default_form: {
        gudang_id: "",
        supplier_id: "",
        pelanggan_id: "",
        peralatan_id: "",
        vendor_id_transporter: "",
        staff_id: "",
        surat_jalan: "",
        kode_tkbm: "",
        doc_type_sap: "",
        tanggal: "",
        kode_inbound: "",
        no_referensi_1: "",
        no_referensi_2: "",
        keterangan: "",
        inbound_details: [],

        status_put_away: "",
        tanggal_put_away: "",
        catatan_put_away: "",

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
        let res = await this.$axios.get(
          `inbound/konfirmasi-put-away/${this.id}`
        );
        Object.keys(this.form).forEach((item) => {
          if (item !== "inbound_details") {
            this.form[item] = res.data[item];
          }
        });
        this.form.gudang_id = res.data.gudang ?? "";
        this.form.pelanggan_id = res.data.pelanggan ?? "";
        this.form.peralatan_id = res.data.peralatan ?? "";
        this.form.supplier_id = res.data.supplier ?? "";
        this.form.vendor_id_transporter = res.data.vendor_transporter ?? "";
        this.form.staff_id = res.data.staff ?? "";

        this.form.inbound_details = res.data.inbound_details.map((item) => {
          return {
            ...item,
            inbound_details_id: item || "",
          };
        });
        // console.log(this.form);
        this.isLoadingPage = false;
      }
    } catch (error) {
      // this.$router.back();
      console.log("error", error);
    }
  },

  async mounted() {
    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", ["error", "result"]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData"]),

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
            // console.log(
            //   "latitude",
            //   this.form.latitude,
            //   "longitude",
            //   this.form.longitude
            // );
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
      let url = "inbound/konfirmasi-put-away";

      //today get
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      let formData = {
        status_put_away: this.form.status_put_away,
        catatan_put_away: this.form.catatan_put_away,
        tanggal_put_away: formattedDate,
      };

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        method: this.isEditable ? "put" : "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data Berhasil di " +
              (this.isEditable == true ? "Diedit" : "Tambah")
          );

          if (!this.isEditable) {
            this.form = this.default_form;
          }
          this.$router.push("/inbound/konfirmasi-put-away");
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          this.$refs.formValidate.reset();
        });
    },
  },
};
</script>
