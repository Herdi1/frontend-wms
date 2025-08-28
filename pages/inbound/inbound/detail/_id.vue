<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">Detail Inbound</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>

      <div class="w-full">
        <div class="w-full gap-3">
          <div
            class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
          >
            <div
              class="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-3 items-top w-full mb-5"
            >
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Kode Inbound</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.kode_inbound
                      ? form.kode_inbound
                      : "Kode Inbound tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Kode TKBM</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.kode_tkbm
                      ? form.kode_tkbm
                      : "Kode TKBM tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Sumber Data</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.sumber_data
                      ? form.sumber_data
                      : "Sumber Data tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Gudang</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.gudang
                      ? form.gudang.nama_gudang
                      : "Gudang tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center" v-if="form.asn">
                <label class="w-[40%] font-bold">Kode ASN</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.asn ? form.asn.kode_asn : "Kode ASN tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center" v-if="form.purchase_order">
                <label class="w-[40%] font-bold">Kode Purchase Order</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.purchase_order
                      ? form.purchase_order.kode_po
                      : "Kode PO tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Tanggal</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ form.tanggal ? form.tanggal : "Tanggal tidak ditemukan" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Inbound",
      url: "inbound/inbound",

      form: {
        kode_inbound: "",
        kode_tkbm: "",
        sumber_data: "",
        asn_id: "",
        purchase_order_id: "",
        surat_jalan: "",
        doc_type_sap: "",
        kode_inbound: "",
        no_referensi_1: "",
        no_referensi_2: "",
        no_referensi_3: "",
        supplier_id: "",
        tanggal: "",
        jenis_transaksi: "",
        pelanggan_id: "",
        staff_id: "",
        vendor_id_transporter: "",
        peralatan_id: "",

        tanggal_approve: "",
        gudang_id: "",

        inbound_details: [],
        biaya_inbounds: [],
        tagihan_inbounds: [],

        asn: {},
        gudang: {},
        pelanggan: {},
        peralatan: {},
        purchase_order: {},
        staff: {},
        status_transaksi: {},
        supplier: {},
        vendor_transporter: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`${this.url}/${this.id}`);
      Object.keys(this.form).forEach((item) => {
        if (item !== "inbound_details") {
          this.form[item] = res.data[item];
        }
      });
      console.log(this.form);
      this.isLoadingPage = false;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
