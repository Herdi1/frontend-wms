<template>
  <div></div>
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
            kode_referensi: "",
            kode_lokasi: "",
            nama_lokasi: "",
          },
        },
      },
    };
  },
};
</script>
