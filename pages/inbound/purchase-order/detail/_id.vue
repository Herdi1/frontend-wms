<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">Detail Purchase Order</h1>

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
                <label class="w-[40%] font-bold">Kode Purchase Order</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kode_po
                      ? this.detail_item.kode_po
                      : "Kode ASN tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Referensi External</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kode_sap
                      ? this.detail_item.kode_sap
                      : "Referensi External tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Gudang</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.gudang
                      ? this.detail_item.gudang.nama_gudang
                      : "Gudang tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Doc Type External</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.doc_type_sap
                      ? this.detail_item.doc_type_sap
                      : "Doc Type External tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Asal Muat</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.lokasi_asal_muat
                      ? this.detail_item.lokasi_asal_muat.nama_lokasi
                      : this.detail_item.asal_muat
                      ? this.detail_item.asal_muat
                      : "Asal Muat tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Nama Transporter</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.vendor_transporter
                      ? this.detail_item.vendor_transporter.nama_vendor
                      : this.detail_item.nama_transporter
                      ? this.detail_item.nama_transporter
                      : "Nama Transporter tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Surat Jalan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.surat_jalan
                      ? this.detail_item.surat_jalan
                      : "Surat Jalan tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">No Referensi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.no_referensi
                      ? this.detail_item.no_referensi
                      : "Nomor Referensi tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">No Referensi 2</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.no_referensi_2
                      ? this.detail_item.no_referensi_2
                      : "Nomor Referensi tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Nama Kendaraan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kendaraan
                      ? this.detail_item.kendaraan.nama_kendaraan
                      : this.detail_item.nama_kendaraan
                      ? this.detail_item.nama_kendaraan
                      : "Kendaraan tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Nama Pengemudi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.pengemudi
                      ? this.detail_item.pengemudi.nama_pengemudi
                      : this.detail_item.nama_pengemudi
                      ? this.detail_item.nama_pengemudi
                      : "Pengemudi tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Supplier</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.supplier
                      ? this.detail_item.supplier.nama_supplier
                      : "Supplier tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Perkiraan Tiba</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.perkiraan_tiba
                      ? this.detail_item.perkiraan_tiba
                      : "Perkiraan Tiba tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Kebutuhan Peralatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kebutuhan_peralatan
                      ? this.detail_item.kebutuhan_peralatan
                      : "Kebutuhan Peralatan tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Handling Instruction</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.handling_instruction
                      ? this.detail_item.handling_instruction
                      : "Handling Instruction tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Catatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.catatan
                      ? this.detail_item.catatan
                      : "Catatan tidak ditemukan"
                  }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <span class="mb-3 mt-7 text-xl font-bold uppercase w-full">
              <h1>ASN Detail</h1>
            </span>
            <div
              class="mt-4 overflow-auto w-full bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
            >
              <table
                class="table border-collapse border border-gray-300 mt-5 table-fixed"
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <th class="w-40 border border-gray-300">Item Gudang</th>
                    <th class="w-40 border border-gray-300">Zona Gudang</th>
                    <th class="w-40 border border-gray-300">Quantity</th>
                    <th class="w-40 border border-gray-300">Serial Number</th>
                    <th class="w-40 border border-gray-300">Nomor Referensi</th>
                    <th class="w-40 border border-gray-300">Dimensi</th>
                    <th class="w-40 border border-gray-300">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in this.detail_item.purchase_order_details"
                    :key="i"
                    class="border-t border-gray-400 align-top"
                  >
                    <td class="border border-gray-300">
                      {{ item.item ? item.item.nama_item : "Tidak Ditemukan" }}
                    </td>
                    <td class="border border-gray-300">
                      {{
                        item.zona_gudang_plan
                          ? item.zona_gudang_plan.nama_zona_gudang
                          : "Tidak Ditemukan"
                      }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.quantity ? item.quantity : "Tidak Ditemukan" }}
                    </td>
                    <td class="border border-gray-300">
                      {{
                        item.serial_number
                          ? item.serial_number
                          : "Tidak Ditemukan"
                      }}
                    </td>
                    <td class="border border-gray-300">
                      {{
                        item.no_referensi
                          ? item.no_referensi
                          : "Tidak Ditemukan"
                      }}
                    </td>
                    <td class="border border-gray-300">
                      <div>
                        <p>Panjang</p>
                        <span>{{ item.panjang }}</span>
                      </div>
                      <div>
                        <p>Lebar</p>
                        <span>{{ item.lebar }}</span>
                      </div>
                      <div>
                        <p>Tinggi</p>
                        <span>{{ item.tinggi }}</span>
                      </div>
                      <div>
                        <p>Berat</p>
                        <span>{{ item.berat }}</span>
                      </div>
                    </td>
                    <td class="border border-gray-300">
                      {{ item.note ? item.note : "Tidak Ditemukan" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- <table-data-loading-section :self="this" /> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_item: {
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
        pengemudi_id: "",
        supplier_id: "",
        perkiraan_tiba: "",
        kebutuhan_peralatan: "",
        handling_instruction: "",
        catatan: "",

        //Tracking
        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",

        // purhcase_order detail
        purhcase_order_details: [],
      },
      // form: {
      //   item_id: "",
      // },
    };
  },

  async created() {
    try {
      let response = await this.$axios.get("inbound/purchase-order/" + this.id);
      // Object.keys(this.detail_item).forEach((item) => {
      //   this.detail_item[item] = response.data[item];
      // });
      this.detail_item = response.data;
      console.log(this.detail_item);

      this.isLoadingPage = false;
    } catch (error) {
      this.$router.push("/inbound/purchase-order");
    }
  },

  methods: {},
};
</script>
