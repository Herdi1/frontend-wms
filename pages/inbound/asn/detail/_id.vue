<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">Detail ASN</h1>

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
                <label class="w-[40%] font-bold">Kode ASN</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.kode_asn
                      ? parameters.form.kode_asn
                      : "Kode ASN tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Gudang</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.gudang
                      ? parameters.form.gudang.nama_gudang
                      : "Gudang tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Puchase Order</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.purchase_order
                      ? parameters.form.purchase_order.kode_po
                      : "Purchase Order tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Referensi External</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.kode_sap
                      ? parameters.form.kode_sap
                      : "Referensi External tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Doc Type External</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.doc_type_sap
                      ? parameters.form.doc_type_sap
                      : "Doc Type External tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Asal Muat</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.lokasi_asal_muat
                      ? parameters.form.lokasi_asal_muat.nama_lokasi
                      : parameters.form.asal_muat
                      ? parameters.form.asal_muat
                      : "Asal Muat tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Nama Transporter</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.vendor_transporter
                      ? parameters.form.vendor_transporter.nama_vendor
                      : parameters.form.nama_transporter
                      ? parameters.form.nama_transporter
                      : "Nama Transporter tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Pelanggan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.pelanggan
                      ? parameters.form.pelanggan.nama_pelanggan
                      : "Pelanggan tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Surat Jalan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.surat_jalan
                      ? parameters.form.surat_jalan
                      : "Surat Jalan tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">No Referensi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.no_referensi
                      ? parameters.form.no_referensi
                      : "Nomor Referensi tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">No Referensi 2</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.no_referensi_2
                      ? parameters.form.no_referensi_2
                      : "Nomor Referensi tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Nama Kendaraan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.kendaraan
                      ? parameters.form.kendaraan.nama_kendaraan
                      : parameters.form.nama_kendaraan
                      ? parameters.form.nama_kendaraan
                      : "Kendaraan tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Nama Staff</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.staff
                      ? parameters.form.staff.nama_lengkap
                      : "Staff tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Supplier</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.supplier
                      ? parameters.form.supplier.nama_supplier
                      : "Supplier tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Perkiraan Tiba</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.perkiraan_tiba
                      ? parameters.form.perkiraan_tiba
                      : "Perkiraan Tiba tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Kebutuhan Peralatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.kebutuhan_peralatan
                      ? parameters.form.kebutuhan_peralatan
                      : "Kebutuhan Peralatan tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Handling Instruction</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.handling_instruction
                      ? parameters.form.handling_instruction
                      : "Handling Instruction tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Catatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    parameters.form.catatan
                      ? parameters.form.catatan
                      : "Catatan tidak ditemukan"
                  }}
                </div>
              </div>
            </div>
          </div>

          <tab-component :tabs="tabs">
            <template #DetailAsn>
              <div>
                <span class="text-xl font-bold uppercase w-full">
                  <h1>ASN Detail</h1>
                </span>
                <div class="mt-4 overflow-auto w-full rounded-md px-4 py-2">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 table-fixed"
                  >
                    <thead>
                      <tr class="text-sm uppercase">
                        <th class="w-40 border border-gray-300">Item Gudang</th>
                        <!-- <th class="w-40 border border-gray-300">Zona Gudang</th> -->
                        <th class="w-40 border border-gray-300">Quantity</th>
                        <th class="w-40 border border-gray-300">
                          Serial Number
                        </th>
                        <th class="w-40 border border-gray-300">
                          Nomor Referensi
                        </th>
                        <th class="w-40 border border-gray-300">Dimensi</th>
                        <th class="w-40 border border-gray-300">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in parameters.form.asn_details"
                        :key="i"
                        class="border-t border-gray-400 align-top"
                      >
                        <td class="border border-gray-300">
                          {{
                            item.item ? item.item.nama_item : "Tidak Ditemukan"
                          }}
                        </td>
                        <!-- <td class="border border-gray-300">
                          {{
                            item.zona_gudang_plan
                              ? item.zona_gudang_plan.nama_zona_gudang
                              : "Tidak Ditemukan"
                          }}
                        </td> -->
                        <td class="border border-gray-300">
                          {{
                            item.quantity ? item.quantity : "Tidak Ditemukan"
                          }}
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
            </template>
            <template #RiwayatAsn>
              <div>
                <span class="text-xl font-bold uppercase w-full">
                  <h1>Riwayat ASN</h1>
                </span>
                <div class="mt-4 overflow-auto w-full rounded-md px-4 py-2">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 table-fixed"
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
                        v-if="parameters.form.user_id_input"
                      >
                        <td class="border border-gray-300">
                          <p>Dibuat</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>{{ parameters.form.tanggal }}</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>
                            {{ parameters.form.user_id_input.nama_lengkap }}
                          </p>
                        </td>
                      </tr>
                      <tr
                        class="border-t border-gray-400 align-top"
                        v-if="parameters.form.user_konfirmasi"
                      >
                        <td class="border border-gray-300">
                          <p>Dikonfirmasi</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>{{ parameters.form.tanggal_konfirmasi }}</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>
                            {{ parameters.form.user_konfirmasi.nama_lengkap }}
                          </p>
                        </td>
                      </tr>
                      <tr
                        class="border-t border-gray-400 align-top"
                        v-if="parameters.form.user_inspeksi"
                      >
                        <td class="border border-gray-300">
                          <p>Diinspeksi</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>{{ parameters.form.tanggal_inspeksi }}</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>
                            {{ parameters.form.user_inspeksi.nama_lengkap }}
                          </p>
                        </td>
                      </tr>
                      <tr
                        class="border-t border-gray-400 align-top"
                        v-if="parameters.form.user_bongkar"
                      >
                        <td class="border border-gray-300">
                          <p>Dibongkar</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>{{ parameters.form.tanggal_bongkar }}</p>
                        </td>
                        <td class="border border-gray-300">
                          <p>{{ parameters.form.user_bongkar.nama_lengkap }}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
          </tab-component>
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
      tabs: [
        { name: "Detail ASN", slotName: "DetailAsn" },
        { name: "Riwayat ASN", slotName: "RiwayatAsn" },
      ],

      id,

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      parameters: {
        form: {
          purchase_order_id: "",
          gudang_id: "",
          kode_asn: "",
          kode_sap: "",
          doc_type_sap: "",
          tanggal: "",
          tanggal_bongkar: "",
          tanggal_delete: "",
          tanggal_inspeksi: "",
          tanggal_konfirmasi: "",
          lokasi_id_asal_muat: "",
          asal_muat: "",
          vendor_id_transporter: "",
          nama_transporter: "",
          surat_jalan: "",
          no_referensi: "",
          no_referensi_2: "",
          kendaraan_id: "",
          nama_kendaraan: "",
          staff_id: "",
          nama_pengemudi: "",
          supplier_id: "",
          perkiraan_tiba: "",
          kebutuhan_peralatan: "",
          handling_instruction: "",
          catatan: "",
          pelanggan_id: "",
          user_id_input: "",
          user_konfirmasi: "",
          user_inspeksi: "",
          user_bongkar: "",

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",

          // asn detail
          asn_details: [],
        },
      },
    };
  },

  async created() {
    try {
      let response = await this.$axios.get("inbound/asn/" + this.id);
      // Object.keys(this.parameters.form).forEach((item) => {
      //   this.parameters.form[item] = response.data[item];
      // });
      this.parameters.form = response.data;
      console.log(this.parameters.form);

      this.isLoadingPage = false;
    } catch (error) {
      this.$router.push("/inbound/asn");
    }
  },
};
</script>
