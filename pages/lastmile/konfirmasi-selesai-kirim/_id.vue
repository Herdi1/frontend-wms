<template>
  <section class="section">
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
          <div
            class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-2 gap-x-4">
              <div class="form-group">
                <div class="form-group flex items-center">
                  <label for="" class="w-2/5"
                    >Status Opname <span class="text-danger">*</span></label
                  >
                  <select
                    name=""
                    id=""
                    v-model="parameters.form.status_kiriman"
                    class="w-3/5 p-1 rounded-md border border-gray-300 outline-none"
                  >
                    <option value="PROSES">Proses</option>
                    <option value="SELESAI">Selesai</option>
                    <option value="BATAL">Batal</option>
                  </select>
                </div>
              </div>
              <div class="form-group flex items-start">
                <label for="keterangan" class="w-2/5 pt-1"
                  >Catatan Kiriman</label
                >
                <textarea
                  placeholder="Catatan Kiriman"
                  class="w-3/5 pl-2 py-1 border rounded focus:outline-none"
                  v-model="parameters.form.catatan_kiriman"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="mt-7">
            <h1 class="text-xl font-bold mb-2 uppercase">Data Shipment</h1>
            <div
              class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-2 gap-x-4">
                <div class="flex w-full items-center">
                  <label class="w-[40%] font-bold">Kode Shipement</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                  >
                    {{
                      parameters.form.kode_shipment
                        ? parameters.form.kode_shipment
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%] font-bold">Gudang</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                  >
                    {{
                      parameters.form.gudang_id
                        ? parameters.form.gudang_id.nama_gudang
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%] font-bold">Nomor Referensi</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                  >
                    {{
                      parameters.form.no_referensi
                        ? parameters.form.no_referensi
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%] font-bold">Tanggal Muat</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                  >
                    {{
                      parameters.form.tanggal_muat
                        ? parameters.form.tanggal_muat
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%] font-bold">Tanggal Inspeksi</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                  >
                    {{
                      parameters.form.tanggal_inspeksi
                        ? parameters.form.tanggal_inspeksi
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%] font-bold">User PIC</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                  >
                    {{
                      parameters.form.user_id_pic
                        ? parameters.form.user_id_pic.nama_lengkap
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%] font-bold">Pengemudi</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                  >
                    {{
                      parameters.form.staff_id
                        ? parameters.form.staff_id.nama_lengkap
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%] font-bold">Kendaraan</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                  >
                    {{
                      parameters.form.kendaraan_id
                        ? parameters.form.kendaraan_id.nama_kendaraan
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%] font-bold">Jenis Kendaraan</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                  >
                    {{
                      parameters.form.jenis_kendaraan_id
                        ? parameters.form.jenis_kendaraan_id
                            .nama_jenis_kendaraan
                        : "-"
                    }}
                  </div>
                </div>
                <div class="flex w-full items-center">
                  <label class="w-[40%] font-bold">Keterangan</label>
                  <div
                    class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                  >
                    {{
                      parameters.form.keterangan
                        ? parameters.form.keterangan
                        : "-"
                    }}
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5">
              <tab-component :tabs="tabs">
                <template #DetailShipment>
                  <div class="table-responsive overflow-y-hidden mb-7">
                    <table
                      class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                      :class="
                        parameters.form.shipment_details.length
                          ? 'mb-40'
                          : 'mb-5'
                      "
                    >
                      <thead>
                        <tr class="uppercase">
                          <th class="border border-gray-300 w-44">
                            Kode Delivery Order
                          </th>
                          <th class="border border-gray-300 w-44">Item</th>
                          <th class="border border-gray-300 w-44">
                            Jenis Transaksi
                          </th>
                          <th class="border border-gray-300 w-44">
                            Alamat Pengirim
                          </th>
                          <th class="border border-gray-300 w-44">Lokasi</th>
                          <th class="border border-gray-300 w-44">Urutan</th>
                          <th class="border border-gray-300 w-44">
                            Nomor Referensi
                          </th>
                          <th class="border border-gray-300 w-44">
                            Zona Gudang
                          </th>
                          <th class="border border-gray-300 w-44">Quantity</th>
                          <th class="border border-gray-300 w-44">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, i) in parameters.form.shipment_details"
                          :key="i"
                          class="border-t align-top"
                        >
                          <td class="border border-gray-300">
                            {{
                              item.kode_delivery_order
                                ? item.kode_delivery_order
                                : "-"
                            }}
                          </td>
                          <td class="border border-gray-300">
                            {{
                              item.item_gudang ? item.item_gudang.nama_item : ""
                            }}
                          </td>
                          <td class="border border-gray-300 text-center">
                            <span
                              v-if="item.jenis == 0"
                              class="p-1 text-white rounded-md bg-orange-500"
                              >Penjualan</span
                            >
                            <span
                              v-if="item.jenis == 1"
                              class="p-1 text-white rounded-md bg-green-500"
                              >Stok Transfer</span
                            >
                          </td>
                          <td class="border border-gray-300">
                            {{ item.lokasi ? item.lokasi.alamat_lokasi : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.lokasi ? item.lokasi.kode_lokasi : "-" }} -
                            {{ item.lokasi ? item.lokasi.nama_lokasi : "-" }}
                          </td>
                          <td class="border border-gray-300 text-center">
                            {{ item.urutan ? item.urutan : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.no_referensi ? item.no_referensi : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{
                              item.zona_gudang
                                ? item.zona_gudang.nama_zona_gudang
                                : "-"
                            }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.quantity ? item.quantity : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.keterangan ? item.keterangan : "-" }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>
                <template #RuteShipment>
                  <div class="table-responsive overflow-y-hidden mb-7">
                    <table
                      class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                      :class="
                        parameters.form.rute_shipments.length ? 'mb-40' : 'mb-5'
                      "
                    >
                      <thead>
                        <tr class="uppercase">
                          <th class="border border-gray-300 w-44">
                            Jenis Transaksi
                          </th>
                          <th class="border border-gray-300 w-44">
                            Lokasi Asal
                          </th>
                          <th class="border border-gray-300 w-44">
                            Lokasi Tujuan
                          </th>
                          <th class="border border-gray-300 w-44">Jarak</th>
                          <th class="border border-gray-300 w-44">
                            Waktu Sampai Tujuan (menit)
                          </th>
                          <th class="border border-gray-300 w-44">
                            Jenis Routing
                          </th>
                          <th class="border border-gray-300 w-44">
                            Jenis Kiriman
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, i) in parameters.form.rute_shipments"
                          :key="i"
                          class="border-t align-top"
                        >
                          <td class="border border-gray-300">
                            <span
                              v-if="item.jenis == 0"
                              class="p-1 text-white rounded-md bg-orange-500"
                              >Penjualan</span
                            >
                            <span
                              v-if="item.jenis == 1"
                              class="p-1 text-white rounded-md bg-green-500"
                              >Stok Transfer</span
                            >
                          </td>
                          <td class="border border-gray-300">
                            {{
                              item.lokasi_asal
                                ? item.lokasi_asal.nama_lokasi
                                : "-"
                            }}
                          </td>
                          <td class="border border-gray-300">
                            {{
                              item.lokasi_tujuan
                                ? item.lokasi_tujuan.nama_lokasi
                                : "-"
                            }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.jarak ? item.jarak : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{
                              item.waktu_sampai_tujuan
                                ? item.waktu_sampai_tujuan
                                : "-"
                            }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.jenis_routing ? item.jenis_routing : "-" }}
                          </td>
                          <td class="border border-gray-300 text-center">
                            <span
                              v-if="item.jenis_kiriman == 0"
                              class="p-1 text-white rounded-md bg-orange-500"
                              >Kembali</span
                            >
                            <span
                              v-if="item.jenis_kiriman == 1"
                              class="p-1 text-white rounded-md bg-green-500"
                              >Berangkat</span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>
                <template #BiayaLastmile>
                  <div class="table-responsive overflow-y-hidden mb-7">
                    <table
                      class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                      :class="
                        parameters.form.biaya_lastmiles.length
                          ? 'mb-40'
                          : 'mb-5'
                      "
                    >
                      <thead>
                        <tr class="uppercase">
                          <th class="border border-gray-300 w-44">
                            Jenis Transaksi
                          </th>

                          <th class="border border-gray-300 w-44">
                            Jenis Biaya
                          </th>
                          <th class="border border-gray-300 w-44">Lokasi</th>
                          <th class="border border-gray-300 w-44">
                            Term Pembayaran
                          </th>
                          <th class="border border-gray-300 w-44">Jumlah</th>
                          <th class="border border-gray-300 w-44">
                            Biaya Per Kilometer
                          </th>
                          <!-- <th class="border border-gray-300 w-44">
                            Payable To
                          </th> -->
                          <th class="border border-gray-300 w-44">Total</th>
                          <th class="border border-gray-300 w-44">COA</th>
                          <th class="border border-gray-300 w-44">Divisi</th>
                          <th class="border border-gray-300 w-44">Vendor</th>
                          <th class="border border-gray-300 w-44">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, i) in parameters.form.biaya_lastmiles"
                          :key="i"
                          class="border-t align-top"
                        >
                          <td class="border border-gray-300 text-center">
                            <span
                              v-if="item.jenis == 0"
                              class="p-1 text-white rounded-md bg-orange-500"
                              >Penjualan</span
                            >
                            <span
                              v-if="item.jenis == 1"
                              class="p-1 text-white rounded-md bg-green-500"
                              >Stok Transfer</span
                            >
                          </td>

                          <td class="border border-gray-300">
                            {{
                              item.jenis_biaya
                                ? item.jenis_biaya.nama_jenis_biaya
                                : "-"
                            }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.lokasi ? item.lokasi.nama_lokasi : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{
                              item.term_pembayaran
                                ? item.term_pembayaran.nama_term_pembayaran
                                : "-"
                            }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.jumlah ? item.jumlah : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{
                              item.nominal_satuan ? item.nominal_satuan : "-"
                            }}
                          </td>
                          <!-- <td class="border border-gray-300">
                            {{ item.payable_to ? item.payable_to : "-" }}
                          </td> -->
                          <td class="border border-gray-300">
                            {{ item.total ? item.total : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.coa ? item.coa.nama_coa : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.divisi ? item.divisi.nama_divisi : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.vendor ? item.vendor.nama_vendor : "-" }}
                          </td>
                          <td class="border border-gray-300">
                            {{ item.keterangan ? item.keterangan : "-" }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>
                <template #ReturBarang>
                  <p>Retur Barang goes here</p>
                </template>
              </tab-component>
            </div>
          </div>
          <div class="w-full flex justify-start items-center">
            <modal-footer-section
              class="mt-5"
              :isLoadingForm="isLoadingForm"
              @reset="formReset()"
            />
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  middleware: ["checkRoleUserDetail"],
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      tabs: [
        {
          name: "Detail Shipment",
          slotName: "DetailShipment",
        },
        {
          name: "Rute Shipment",
          slotName: "RuteShipment",
        },
        {
          name: "Biaya Lastmile",
          slotName: "BiayaLastmile",
        },
        {
          name: "Retur Barang",
          slotName: "ReturBarang",
        },
      ],

      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Konfirmasi Selesai Kirim",
      parameters: {
        url: "lastmile/konfirmasi-selesai-kirim",
        form: {
          kode_shipment: "",
          gudang_id: "",
          no_referensi: "",
          tanggal_muat: "",
          tanggal_inspeksi: "",
          user_id_pic: "",
          kendaraan_id: "",
          jenis_kendaraan_id: "",
          staff_id: "",
          keterangan: "",

          shipment_details: [],
          rute_shipments: [],
          biaya_lastmiles: [],

          status_kiriman: "",
          catatan_kiriman: "",

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
      Object.keys(this.parameters.form).forEach((key) => {
        this.parameters.form[key] = res.data[key];
      });
      this.parameters.form.gudang_id = res.data.gudang;
      this.parameters.form.kendaraan_id = res.data.kendaraan;
      this.parameters.form.jenis_kendaraan_id = res.data.jenis_kendaraan;
      this.parameters.form.staff_id = res.data.staff;
      this.parameters.form.user_id_pic = res.data.user_pic;

      this.parameters.form.shipment_details = res.data.shipment_details.map(
        (item) => {
          return {
            ...item,
          };
        }
      );
      this.parameters.form.rute_shipments = res.data.rute_shipments.map(
        (item) => {
          return {
            ...item,
          };
        }
      );
      this.parameters.form.biaya_lastmiles = res.data.biaya_lastmiles.map(
        (item) => {
          return {
            ...item,
          };
        }
      );
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
    }
  },

  mounted() {
    this.getGeoLocation();
    this.getUserAgent();
  },

  computed: {
    ...mapState("moduleApi", ["error", "result"]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData"]),

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
      let url = this.parameters.url;

      let formData = {
        status_kiriman: this.parameters.form.status_kiriman,
        catatan_kiriman: this.parameters.form.catatan_kiriman,
        user_agent: this.parameters.form.user_agent,
        device: this.parameters.form.device,
        longitude: this.parameters.form.longitude,
        latitude: this.parameters.form.latitude,
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
            "Data berhasil di " + (this.isEditable ? "Update" : "Tambah")
          );
          if (!this.isEditable) {
            this.parameters.form = {
              kode_shipment: "",
              staff_id: "",
              gudang_id: "",
              tanggal: "",
              kendaraan_id: "",
              jenis_kendaraan_id: "",
              pengemudi_id: "",
              keterangan: "",
              no_referensi: "",
              status_muat: "",
              catatan_muat: "",
              user_id_pic: "",

              shipment_details: [],
              rute_shipments: [],
              biaya_lastmiles: [],
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
  },
};
</script>
