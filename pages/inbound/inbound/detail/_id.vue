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
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Jenis Transaksi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.jenis_transaksi === "0"
                      ? "Inbound"
                      : form.jenis_transaksi === "1"
                      ? "Cross Docking"
                      : "Retur"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Tipe Dokumen External</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.doc_type_sap
                      ? form.doc_type_sap
                      : "Dokumen External tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Surat Jalan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.surat_jalan
                      ? form.surat_jalan
                      : "Surat Jalan tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">No Referensi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.no_referensi_1
                      ? form.no_referensi_1
                      : "No Referensi tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">No Referensi 2</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.no_referensi_2
                      ? form.no_referensi_2
                      : "No Referensi tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">No Referensi 3</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.no_referensi_3
                      ? form.no_referensi_3
                      : "No Referensi tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Supplier</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.supplier
                      ? form.supplier.nama_supplier
                      : "Supplier tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Pelanggan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.pelanggan
                      ? form.pelanggan.nama_pelanggan
                      : "Pelanggan tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Operator</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.staff
                      ? form.staff.nama_lengkap
                      : "Operator tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Vendor Operator</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.vendor_transporter
                      ? form.vendor_transporter.nama_vendor
                      : "Vendor Operator tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Keterangan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    form.keterangan
                      ? form.keterangan
                      : "Keterangan tidak ditemukan"
                  }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
          >
            <tab-component :tabs="tabs">
              <template #DetailInbound>
                <DetailInbound :self="{ form, items }" />
              </template>
              <template #DetailBiaya>
                <DetailBiaya :self="{ form, items }" />
              </template>
              <!-- <template #DetailTagihan>
                <DetailTagihan :self="{ form, items }" />
              </template> -->
              <template #DetailHistoris>
                <!-- <DetailHistoris :self="{ form, items }" /> -->
                <div>
                  <table
                    class="mb-5 table-fixed border border-collapse border-gray-300"
                  >
                    <thead>
                      <tr class="text-sm uppercase">
                        <th class="border border-gray-300">Status</th>
                        <th class="border border-gray-300">Tanggal</th>
                        <th class="border border-gray-300">User</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-t border-gray-400 align-top"
                        v-if="form.user_input"
                      >
                        <td class="border border-gray-300">
                          <p>Dibuat</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>{{ form.tanggal }}</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>
                            {{ form.user_input.nama_lengkap }}
                          </p>
                        </td>
                      </tr>
                      <tr
                        class="border-t border-gray-400 align-top"
                        v-if="form.user_approve"
                      >
                        <td class="border border-gray-300">
                          <p>Approve</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>{{ form.tanggal_approve }}</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>
                            {{ form.user_approve.nama_lengkap }}
                          </p>
                        </td>
                      </tr>
                      <tr
                        class="border-t border-gray-400 align-top"
                        v-if="form.user_put_away"
                      >
                        <td class="border border-gray-300">
                          <p>Put Away</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>{{ form.tanggal_put_away }}</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>
                            {{ form.user_put_away.nama_lengkap }}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </tab-component>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DetailInbound from "./DetailInbound.vue";
import DetailBiaya from "./DetailBiaya.vue";
import DetailTagihan from "./DetailTagihan.vue";
import DetailHistoris from "./DetailHistoris.vue";
export default {
  components: {
    DetailInbound,
    DetailBiaya,
    DetailTagihan,
    DetailHistoris,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        { name: "DETAIL INBOUND", slotName: "DetailInbound" },
        { name: "BIAYA INBOUND", slotName: "DetailBiaya" },
        // { name: "PENDAPATAN INBOUND", slotName: "DetailTagihan" },
        { name: "HISTORIS INBOUND", slotName: "DetailHistoris" },
      ],
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
        tanggal_approve: "",
        tanggal_put_away: "",
        jenis_transaksi: "",
        pelanggan_id: "",
        staff_id: "",
        vendor_id_transporter: "",
        peralatan_id: "",
        user_input: "",
        user_approve: "",
        user_put_away: "",

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
      this.form.inbound_details = res.data.inbound_details;
      this.isLoadingPage = false;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
