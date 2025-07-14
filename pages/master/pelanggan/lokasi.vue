<template>
  <div>Shipto</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  props: ["self"],

  async created() {
    this.set_data([]);
    if (this.self.isEditable) {
      await this.onLoad();
    }
  },

  data() {
    return {
      data: [],
      selectAll: false,
      checkboxs: [],
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        utl: "master/lokasi",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "lokasi_id",
          sort: "desc",
          all: "1",
          per_page: 10,
          page: 1,
          form: {
            lokasi_id_induk: "",
            tipe_lokasi: "",
            kode_referensi: "",
            kode_lokasi: "",
            nama_lokasi: "",
            negara_id: "",
            provinsi_id: "",
            kota_id: "",
            kecamatan_id: "",
            kelurahan_id: "",
            kode_pos_id: "",
            email: "",
            nilai_plafon: "",
            no_telp: "",
            no_hp: "",
            no_npwp: "",
            longitude: "",
            latitude: "",
            radius: "",
            longitude2: "",
            latitude2: "",
            radius2: "",
            longitude3: "",
            latitude3: "",
            radius3: "",
            alamat: "",
            alamat_lokasi: "",
            nama_pemilik: "",
            nik_pemilik: "",
            npwp_pemilik: "",
            negara_id_pemilik: "",
            provinsi_id_pemilik: "",
            kota_id_pemilik: "",
            kecamatan_id_pemilik: "",
            kelurahan_id_pemilik: "",
            alamat_pemilik: "",
          },
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
      },
    };
  },
};
</script>
