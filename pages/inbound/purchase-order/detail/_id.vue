<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Purchase Order</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <div class="w-full">
        <div class="w-full md:flex gap-3">
          <div
            class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 w-full">
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kode PO</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_po.kode_po ? this.detail_po.kode_po : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Referensi External</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_po.kode_sap ? this.detail_po.kode_sap : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Gudang</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.gudang_id
                      ? this.detail_po.gudang_id.nama_gudang
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Doc Type External</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.doc_type_sap
                      ? this.detail_po.doc_type_sap
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Lokasi Asal Muat</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.lokasi_id_asal_muat
                      ? this.detail_po.lokasi_id_asal_muat.nama_lokasi
                      : "-"
                  }}
                </div>
              </div>
              <div
                class="flex w-full items-center"
                v-if="!this.detail_po.lokasi_id_asal_muat"
              >
                <label class="w-[40%]">Asal Muat</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.asal_muat ? this.detail_po.asal_muat : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Vendor Transporter</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.vendor_id_transporter
                      ? this.detail_po.vendor_id_transporter.nama_vendor
                      : "-"
                  }}
                </div>
              </div>
              <div
                class="flex w-full items-center"
                v-if="!this.detail_po.vendor_id_transporter"
              >
                <label class="w-[40%]">Nama Transporter</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.nama_transporter
                      ? this.detail_po.nama_transporter
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Surat Jalan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.surat_jalan
                      ? this.detail_po.surat_jalan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor Referensi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.no_referensi
                      ? this.detail_po.no_referensi
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor Referensi 2</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.no_referensi_2
                      ? this.detail_po.no_referensi_2
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kendaraan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.kendaraan_id
                      ? this.detail_po.kendaraan_id.nama_kendaraan
                      : "-"
                  }}
                </div>
              </div>
              <div
                class="flex w-full items-center"
                v-if="!this.detail_po.kendaraan_id"
              >
                <label class="w-[40%]">Nama Kendaraan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.nama_kendaraan
                      ? this.detail_po.nama_kendaraan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Pengemudi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.pengemudi_id
                      ? this.detail_po.pengemudi_id.nama_pengemudi
                      : "-"
                  }}
                </div>
              </div>
              <div
                class="flex w-full items-center"
                v-if="!this.detail_po.pengemudi_id"
              >
                <label class="w-[40%]">Nama Pengemudi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.nama_pengemudi
                      ? this.detail_po.nama_pengemudi
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Supplier</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.supplier_id
                      ? this.detail_po.supplier_id.nama_supplier
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Perkiraan Tiba</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.perkiraan_tiba
                      ? this.detail_po.perkiraan_tiba
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kebutuhan Peralatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.kebutuhan_peralatan
                      ? this.detail_po.kebutuhan_peralatan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Handling Instruction</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_po.handling_instruction
                      ? this.detail_po.handling_instruction
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Catatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_po.catatan ? this.detail_po.catatan : "-" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h1 class="text-xl font-bold mb-2 uppercase">Detail Purchase Order</h1>
      </div>
      <div
        class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
      >
        <div class="w-full relative overflow-x-auto">
          <table
            class="mb-5 table-fixed border border-collapse border-gray-300"
          >
            <thead>
              <tr class="uppercase">
                <th class="w-40 border border-gray-300">Item Gudang</th>
                <th class="w-40 border border-gray-300">Quantity</th>
                <th class="w-40 border border-gray-300">Serial Number</th>
                <th class="w-40 border border-gray-300">Nomor Referensi</th>
                <th class="w-40 border border-gray-300">Dimensi</th>
                <th class="w-40 border border-gray-300">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in detail_po.purchase_order_details"
                :key="i"
                class="border-t border-gray-400 align-top"
              >
                <td class="border border-gray-300">
                  {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.quantity ? item.quantity : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.serial_number ? item.serial_number : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.no_referensi ? item.no_referensi : "-" }}
                </td>
                <td class="border border-gray-300">
                  <div class="flex justify-between">
                    <h2>Panjang</h2>
                    <span>
                      {{ item.panjang }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <h2>Lebar</h2>
                    <span>
                      {{ item.lebar }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <h2>Tinggi</h2>
                    <span>
                      {{ item.tinggi }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <h2>Berat</h2>
                    <span>
                      {{ item.berat }}
                    </span>
                  </div>
                </td>
                <td class="border border-gray-300">
                  {{ item.note ? item.note : "-" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_po: {
        gudang_id: "",
        kode_po: "",
        kode_sap: "",
        doc_type_sap: "",
        tanggal: "",
        lokasi_id_asal_muat: "",
        asal_muat: "",
        vendor_id_transporter: "",
        nama_transporter: "",
        surat_jalan: "",
        no_referensi: "",
        no_referensi_2: "",
        kendaraan_id: "",
        nama_kendaraan: "",
        pengemudi_id: "",
        nama_pengemudi: "",
        supplier_id: "",
        perkiraan_tiba: "",
        kebutuhan_peralatan: "",
        handling_instruction: "",
        catatan: "",
        purchase_order_details: [],
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`inbound/purchase-order/${this.id}`);
      Object.keys(this.detail_po).forEach((item) => {
        if (item != "purchase_order_details") {
          this.detail_po[item] = res.data[item];
        }
      });
      this.detail_po.gudang_id = res.data.gudang;
      this.detail_po.lokasi_id_asal_muat = res.data.lokasi_asal_muat;
      this.detail_po.vendor_id_transporter = res.data.vendor_transporter;
      this.detail_po.kendaraan_id = res.data.kendaraan;
      this.detail_po.pengemudi_id = res.data.pengemudi;
      this.detail_po.supplier_id = res.data.supplier;
      this.detail_po.purchase_order_details =
        res.data.purchase_order_details.map((item) => {
          return {
            ...item,
            item_gudang_id: item.item_gudang,
          };
        });
      this.isLoadingPage = false;
      console.log(this.detail_po);
    } catch (error) {
      this.$router.back();
      // console.log("erorr", error);
    }
  },
};
</script>
