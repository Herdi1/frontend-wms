<template>
  <div>
    <div class="w-full flex justify-end gap-3">
      <button
        type="button"
        @click="onLoad"
        class="bg-blue-500 hover:bg-blue-600 p-2 text-white rounded-md mb-3 text-center"
      >
        <i class="fa fa-plus text-white font-bold"></i>
        Tambah Detail Produk
      </button>
    </div>
  </div>
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
      isLoadingData: false,
      isPaginate: true,
      parameters: {
        form: {
          item_gudang_id: "",
          zona_gudang_id: "",
          serial_number: "",
          quantity: "",
          keterangan_detail: "",
          nomor_surat_perintah_jalan: "",
          tujuan_kiriman: "",
        },
      },
    };
  },
};
</script>
