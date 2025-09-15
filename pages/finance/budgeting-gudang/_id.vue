<template>
  <section class="section min-h-screen">
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
      <ValidationObserver v-slot="{ invalid, validate }" ref="formVaidate">
        <form
          @submit.prevent="validate().then(() => onSubmit(invalid))"
          autocomplete="off"
        >
          <div
            class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 w-full section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="form-group flex justify-between">
              <label for="" class="w-1/2">Budget</label>
              <money
                v-model="parameters.form.budget"
                class="w-1/2 pl-2 py-1 border rounded focus:outline-none"
                @keydown.native="
                  $event.key === '-' ? $event.preventDefault() : null
                "
              />
            </div>
          </div>
          <div class="mt-7 mb-4">
            <h1 class="text-xl font-bold uppercase">Data Gudang</h1>
          </div>
          <div
            class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full section bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="flex w-full items-center">
              <label class="w-[40%]">Lokasi</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.lokasi
                    ? parameters.form.lokasi.nama_lokasi
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kode Gudang External</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.kode_gudang_sap
                    ? parameters.form.kode_gudang_sap
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kode Gudang</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.kode_gudang
                    ? parameters.form.kode_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Nama Gudang</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.nama_gudang
                    ? parameters.form.nama_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Profit Center</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.profit_center
                    ? parameters.form.profit_center.nama_profit_center
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Cost Center</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.cost_center
                    ? parameters.form.cost_center.nama_cost_center
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Nomor Rekening</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.nomor_rekening
                    ? parameters.form.nomor_rekening
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Atas Nama Rekening</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.atas_nama_rekening
                    ? parameters.form.atas_nama_rekening
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Group Gudang 1</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.group_gudang_1
                    ? parameters.form.group_gudang_1.nama_group_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Group Gudang 2</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.group_gudang_2
                    ? parameters.form.group_gudang_2.nama_group_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Group Gudang 3</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.group_gudang_3
                    ? parameters.form.group_gudang_3.nama_group_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Group Gudang 4</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.group_gudang_4
                    ? parameters.form.group_gudang_4.nama_group_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Group Gudang 5</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.group_gudang_5
                    ? parameters.form.group_gudang_5.nama_group_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Vendor Pemilik</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.vendor_pemilik
                    ? parameters.form.vendor_pemilik.nama_vendor
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Vendor Operator</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.vendor_operator
                    ? parameters.form.vendor_operator.nama_vendor
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">No Handphone</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ parameters.form.no_hp ? parameters.form.no_hp : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">No Whatsapp</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ parameters.form.no_wa ? parameters.form.no_wa : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Fungsi Gudang</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.fungsi_gudang
                    ? parameters.form.fungsi_gudang.nama_fungsi
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Fisik Gudang</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.fisik_gudang
                    ? parameters.form.fisik_gudang.nama_fisik
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Ukuran Gudang</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.ukuran_gudang
                    ? parameters.form.ukuran_gudang.nama_ukuran
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Status Gudang</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.status_gudang === "1"
                    ? "Aktif"
                    : parameters.form.status_gudang === "0"
                    ? "Non Aktif"
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Status Konfig</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.status_konfig_outbound_sap === "1"
                    ? "Aktif"
                    : parameters.form.status_konfig_outbound_sap === "0"
                    ? "Non Aktif"
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Status Sewa</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.status_sewa === "1"
                    ? "Sendiri"
                    : parameters.form.status_sewa === "0"
                    ? "Sewa"
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Status Satpam</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.status_satpam === "1"
                    ? "Memiliki Satpam"
                    : parameters.form.status_satpam === "0"
                    ? "Tidak Memiliki Satpam"
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kapasitas</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.kapasitas ? parameters.form.kapasitas : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kapasitas Bongkar</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.kapasitas_bongkar
                    ? parameters.form.kapasitas_bongkar
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Luas Gudang</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.luas_gudang
                    ? parameters.form.luas_gudang
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Satuan Luas</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.satuan_luas
                    ? parameters.form.satuan_luas.nama_satuan
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Radius</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ parameters.form.radius ? parameters.form.radius : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Min Stok</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ parameters.form.min_stok ? parameters.form.min_stok : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Max Stok</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ parameters.form.max_stok ? parameters.form.max_stok : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Longitude</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.longitude ? parameters.form.longitude : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Latitude</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ parameters.form.latitude ? parameters.form.latitude : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Negara</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.negara
                    ? parameters.form.negara.nama_negara
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Provinsi</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.provinsi
                    ? parameters.form.provinsi.nama_provinsi
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kota</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.kota ? parameters.form.kota.nama_kota : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kecamatan</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.kecamatan
                    ? parameters.form.kecamatan.nama_kecamatan
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kode Pos</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.kode_pos
                    ? parameters.form.kode_pos.nama_kode_pos
                    : parameters.form.kode_pos_id
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Regional</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{
                  parameters.form.wilayah
                    ? parameters.form.wilayah.nama_wilayah
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Alamat</label>
              <div
                class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
              >
                {{ parameters.form.alamat ? parameters.form.alamat : "-" }}
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
import { mapActions, mapState } from "vuex";

export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,
      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Budgeting Gudang",
      parameters: {
        url: "finance/budgeting-gudang",
        form: {
          budget: "",

          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",

          gudang_id: "",
          lokasi_id: "",
          kode_gudang_sap: "",
          // profit_cost_id: "",
          profit_center_id: "",
          cost_center_id: "",
          kode_gudang: "",
          nama_gudang: "",
          status_konfig_outbound_sap: "",
          nomor_rekening: "",
          atas_nama_rekening: "",
          status_gudang: "",
          group_gudang_id_1: "",
          group_gudang_id_2: "",
          group_gudang_id_3: "",
          group_gudang_id_4: "",
          group_gudang_id_5: "",
          longitude: "",
          latitude: "",
          alamat: "",
          kecamatan_id: "",
          kota_id: "",
          provinsi_id: "",
          negara_id: "",
          kode_pos_id: "",
          wilayah_id: "",
          vendor_id_pemilik: "",
          vendor_id_operator: "",
          fungsi_gudang_id: "",
          no_hp: "",
          no_wa: "",
          kapasitas: 0,
          kapasitas_bongkar: 0,
          fisik_gudang_id: "",
          ukuran_gudang_id: "",
          file_layout: "",
          status_sewa: "",
          status_satpam: "",
          luas_gudang: "",
          satuan_id_luas: "",
          radius: "",
          min_stok: "",
          max_stok: "",

          cost_center: {},
          fisik_gudang: {},
          fungsi_gudang: {},
          group_gudang_1: {},
          group_gudang_2: {},
          group_gudang_3: {},
          group_gudang_4: {},
          group_gudang_5: {},
          kecamatan: {},
          kota: {},
          lokasi: {},
          negara: {},
          profit_center: {},
          provinsi: {},
          satuan_luas: {},
          ukuran_gudang: {},
          vendor_operator: {},
          vendor_pemilik: {},
          wilayah: {},
        },
      },
      default_form: {
        budget: "",

        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",

        gudang_id: "",
        lokasi_id: "",
        kode_gudang_sap: "",
        // profit_cost_id: "",
        profit_center_id: "",
        cost_center_id: "",
        kode_gudang: "",
        nama_gudang: "",
        status_konfig_outbound_sap: "",
        nomor_rekening: "",
        atas_nama_rekening: "",
        status_gudang: "",
        group_gudang_id_1: "",
        group_gudang_id_2: "",
        group_gudang_id_3: "",
        group_gudang_id_4: "",
        group_gudang_id_5: "",
        longitude: "",
        latitude: "",
        alamat: "",
        kecamatan_id: "",
        kota_id: "",
        provinsi_id: "",
        negara_id: "",
        kode_pos_id: "",
        wilayah_id: "",
        vendor_id_pemilik: "",
        vendor_id_operator: "",
        fungsi_gudang_id: "",
        no_hp: "",
        no_wa: "",
        kapasitas: 0,
        kapasitas_bongkar: 0,
        fisik_gudang_id: "",
        ukuran_gudang_id: "",
        file_layout: "",
        status_sewa: "",
        status_satpam: "",
        luas_gudang: "",
        satuan_id_luas: "",
        radius: "",
        min_stok: "",
        max_stok: "",

        cost_center: {},
        fisik_gudang: {},
        fungsi_gudang: {},
        group_gudang_1: {},
        group_gudang_2: {},
        group_gudang_3: {},
        group_gudang_4: {},
        group_gudang_5: {},
        kecamatan: {},
        kota: {},
        lokasi: {},
        negara: {},
        profit_center: {},
        provinsi: {},
        satuan_luas: {},
        ukuran_gudang: {},
        vendor_operator: {},
        vendor_pemilik: {},
        wilayah: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`${this.parameters.url}/${this.id}`);
      Object.keys(this.parameters.form).forEach((item) => {
        this.parameters.form[item] = res.data[item];
      });
      // console.log(this.parameters.form);
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
      // console.log("error", error);
    }
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
      // console.log("user agent", this.form.user_agent);
      // console.log("device", this.form.device);
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
      let url = this.parameters.url;

      let formData = {
        budget: this.parameters.form.budget,
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
            this.parameters.form = this.default_form;
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
      this.parameters.form = this.default_form;
    },
  },
};
</script>
