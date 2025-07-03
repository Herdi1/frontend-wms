<template>
  <div></div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      isStopSearchNegara: false,
      isLoadingGetNegara: false,
      negara_search: "",

      isStopSearchProvinsi: false,
      isLoadingGetProvinsi: false,
      provinsi_search: "",

      isStopSearchKota: false,
      isLoadingGetKota: false,
      kota_search: "",

      isStopSearchKecamatan: false,
      isLoadingGetKecamatan: false,
      kecamatan_search: "",

      isStopSearchKelurahan: false,
      isLoadingGetKelurahan: false,
      kelurahan_search: "",

      isStopSearchTBH: false,
      isLoadingGetTBH: false,
      TBH_search: "",

      isStopSearchUserPIC: false,
      isLoadingGetUserPIC: false,
      userPIC_search: "",

      isStopSearchLokasi: false,
      isLoadingGetLokasi: false,
      lokasi_search: "",

      isStopSearchPelangganInduk: false,
      isLoadingGetPelangganInduk: false,
      pelangganInduk_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Pelanggan",
      parameters: {
        url: "master/pelanggan",
        form: {
          pelanggan_id_induk: "",
          tipe_badan_hukum_id: "",
          user_id_sales: "",
          alias: "",
          kode_referensi: "",
          kode_pelanggan: "",
          no_npwp: "",
          nama_pelanggan: "",
          email: "",
          alamat_pelanggan: "",
          kelurahan_id: "",
          kecamatan_id: "",
          kota_id: "",
          provinsi_id: "",
          negara_id: "",
          kode_pos: "",
          nama_pemilik: "",
          alamat_pemilik: "",
          no_telp: "",
          no_hp: "",
          nik_pemilik: "",
          no_npwp_pemilik: "",
          nomor_siup: "",
          nama_cp: "",
          telp_cp: "",
          hp_cp: "",
          nilai_plafon: "",
          lokasi_id: "",
          rentang_retur_penjualan: "",
          longitude: "",
          latitude: "",
          radius: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get("master/pelanggan/" + this.id);
        this.parameters.form = res.data;
        this.isLoadingPage = false;
      }
    } catch (error) {
      this.$router.push("/master/pelanggan");
    }
  },
};
</script>
