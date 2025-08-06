<template>
  <div></div>
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
      console.log(this.parameters.form);
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
  },
};
</script>
