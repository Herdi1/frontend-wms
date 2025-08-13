<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">
          Detail Konfirmasi Selesai Kirim
        </h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <div class="w-full mt-5">
        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Status Kiriman</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{ this.form.status_kiriman ? this.form.status_kiriman : "-" }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%] font-bold">Catatan Kiriman</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.form.catatan_kiriman ? this.form.catatan_kiriman : "-"
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="mt-7">
          <h1 class="text-xl font-bold mb-2 uppercase">Data Shipment</h1>
          <div
            class="mt-4 mb-10 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-2 gap-x-4">
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Kode Shipement</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.kode_shipment ? form.kode_shipment : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Gudang</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.gudang_id ? form.gudang_id.nama_gudang : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Nomor Referensi</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.no_referensi ? form.no_referensi : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Tanggal Muat</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.tanggal_muat ? form.tanggal_muat : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Tanggal Inspeksi</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.tanggal_inspeksi ? form.tanggal_inspeksi : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">User PIC</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.user_id_pic ? form.user_id_pic.nama_lengkap : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Pengemudi</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.staff_id ? form.staff_id.nama_lengkap : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Kendaraan</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{
                    form.kendaraan_id ? form.kendaraan_id.nama_kendaraan : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Jenis Kendaraan</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{
                    form.jenis_kendaraan_id
                      ? form.jenis_kendaraan_id.nama_jenis_kendaraan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Keterangan</label>
                <div
                  class="border border-gray-300 bg-gray-50 rounded-md p-1 w-[60%]"
                >
                  {{ form.keterangan ? form.keterangan : "-" }}
                </div>
              </div>
            </div>
          </div>

          <div class="mt-5">
            <tab-component :tabs="tabs">
              <template #DetailShipment>
                <div class="table-responsive overflow-y-hidden mb-7">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                    :class="form.shipment_details.length ? 'mb-40' : 'mb-5'"
                  >
                    <thead>
                      <tr class="uppercase">
                        <th class="border border-gray-300 w-44">
                          Kode Delivery Order
                        </th>
                        <th class="border border-gray-300 w-44">Item</th>
                        <th class="border border-gray-300 w-44">
                          Jenis Transaksi
                        </th>
                        <th class="border border-gray-300 w-44">
                          Alamat Pengirim
                        </th>
                        <th class="border border-gray-300 w-44">Lokasi</th>
                        <th class="border border-gray-300 w-44">Urutan</th>
                        <th class="border border-gray-300 w-44">
                          Nomor Referensi
                        </th>
                        <th class="border border-gray-300 w-44">Zona Gudang</th>
                        <th class="border border-gray-300 w-44">Quantity</th>
                        <th class="border border-gray-300 w-44">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in form.shipment_details"
                        :key="i"
                        class="border-t align-top"
                      >
                        <td class="border border-gray-300">
                          {{
                            item.kode_delivery_order
                              ? item.kode_delivery_order
                              : "-"
                          }}
                        </td>
                        <td class="border border-gray-300">
                          {{
                            item.item_gudang ? item.item_gudang.nama_item : ""
                          }}
                        </td>
                        <td class="border border-gray-300">
                          <span
                            v-if="item.jenis == 0"
                            class="p-1 text-white rounded-md bg-orange-500"
                            >Penjualan</span
                          >
                          <span
                            v-if="item.jenis == 1"
                            class="p-1 text-white rounded-md bg-green-500"
                            >Stok Transfer</span
                          >
                        </td>
                        <td class="border border-gray-300">
                          {{ item.lokasi ? item.lokasi.alamat_lokasi : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.lokasi ? item.lokasi.kode_lokasi : "-" }} -
                          {{ item.lokasi ? item.lokasi.nama_lokasi : "-" }}
                        </td>
                        <td class="border border-gray-300 text-center">
                          {{ item.urutan ? item.urutan : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.no_referensi ? item.no_referensi : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          {{
                            item.zona_gudang
                              ? item.zona_gudang.nama_zona_gudang
                              : "-"
                          }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.quantity ? item.quantity : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.keterangan ? item.keterangan : "-" }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
              <template #RuteShipment>
                <div class="table-responsive overflow-y-hidden mb-7">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                    :class="form.rute_shipments.length ? 'mb-40' : 'mb-5'"
                  >
                    <thead>
                      <tr class="uppercase">
                        <th class="border border-gray-300 w-44">
                          Jenis Transaksi
                        </th>
                        <th class="border border-gray-300 w-44">Lokasi Asal</th>
                        <th class="border border-gray-300 w-44">
                          Lokasi Tujuan
                        </th>
                        <th class="border border-gray-300 w-44">Jarak</th>
                        <th class="border border-gray-300 w-44">
                          Waktu Sampai Tujuan (menit)
                        </th>
                        <th class="border border-gray-300 w-44">
                          Jenis Routing
                        </th>
                        <th class="border border-gray-300 w-44">
                          Jenis Kiriman
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in form.rute_shipments"
                        :key="i"
                        class="border-t align-top"
                      >
                        <td class="border border-gray-300">
                          <span
                            v-if="item.jenis == 0"
                            class="p-1 text-white rounded-md bg-orange-500"
                            >Penjualan</span
                          >
                          <span
                            v-if="item.jenis == 1"
                            class="p-1 text-white rounded-md bg-green-500"
                            >Stok Transfer</span
                          >
                        </td>
                        <td class="border border-gray-300">
                          {{
                            item.lokasi_asal
                              ? item.lokasi_asal.nama_lokasi
                              : "-"
                          }}
                        </td>
                        <td class="border border-gray-300">
                          {{
                            item.lokasi_tujuan
                              ? item.lokasi_tujuan.nama_lokasi
                              : "-"
                          }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.jarak ? item.jarak : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          {{
                            item.waktu_sampai_tujuan
                              ? item.waktu_sampai_tujuan
                              : "-"
                          }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.jenis_routing ? item.jenis_routing : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          <span
                            v-if="item.jenis_kiriman == 0"
                            class="p-1 text-white rounded-md bg-orange-500"
                            >Kembali</span
                          >
                          <span
                            v-if="item.jenis_kiriman == 1"
                            class="p-1 text-white rounded-md bg-green-500"
                            >Berangkat</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
              <template #BiayaLastmile>
                <div class="table-responsive overflow-y-hidden mb-7">
                  <table
                    class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
                    :class="form.biaya_lastmiles.length ? 'mb-40' : 'mb-5'"
                  >
                    <thead>
                      <tr class="uppercase">
                        <th class="border border-gray-300 w-44">
                          Jenis Transaksi
                        </th>

                        <th class="border border-gray-300 w-44">Jenis Biaya</th>
                        <th class="border border-gray-300 w-44">Lokasi</th>
                        <th class="border border-gray-300 w-44">
                          Term Pembayaran
                        </th>
                        <th class="border border-gray-300 w-44">Jumlah</th>
                        <th class="border border-gray-300 w-44">
                          Biaya Per Kilometer
                        </th>
                        <!-- <th class="border border-gray-300 w-44">
                            Payable To
                          </th> -->
                        <th class="border border-gray-300 w-44">Total</th>
                        <th class="border border-gray-300 w-44">COA</th>
                        <th class="border border-gray-300 w-44">Divisi</th>
                        <th class="border border-gray-300 w-44">Vendor</th>
                        <th class="border border-gray-300 w-44">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, i) in form.biaya_lastmiles"
                        :key="i"
                        class="border-t align-top"
                      >
                        <td class="border border-gray-300">
                          <span
                            v-if="item.jenis == 0"
                            class="p-1 text-white rounded-md bg-orange-500"
                            >Penjualan</span
                          >
                          <span
                            v-if="item.jenis == 1"
                            class="p-1 text-white rounded-md bg-green-500"
                            >Stok Transfer</span
                          >
                        </td>

                        <td class="border border-gray-300">
                          {{
                            item.jenis_biaya
                              ? item.jenis_biaya.nama_jenis_biaya
                              : "-"
                          }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.lokasi ? item.lokasi.nama_lokasi : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          {{
                            item.term_pembayaran
                              ? item.term_pembayaran.nama_term_pembayaran
                              : "-"
                          }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.jumlah ? item.jumlah : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.nominal_satuan ? item.nominal_satuan : "-" }}
                        </td>
                        <!-- <td class="border border-gray-300">
                            {{ item.payable_to ? item.payable_to : "-" }}
                          </td> -->
                        <td class="border border-gray-300">
                          {{ item.total ? item.total : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.coa ? item.coa.nama_coa : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.divisi ? item.divisi.nama_divisi : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.vendor ? item.vendor.nama_vendor : "-" }}
                        </td>
                        <td class="border border-gray-300">
                          {{ item.keterangan ? item.keterangan : "-" }}
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
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      tabs: [
        {
          name: "Detail Shipment",
          slotName: "DetailShipment",
        },
        {
          name: "Rute Shipment",
          slotName: "RuteShipment",
        },
        {
          name: "Biaya Lastmile",
          slotName: "BiayaLastmile",
        },
      ],
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      url: "lastmile/konfirmasi-selesai-kirim",
      form: {
        kode_shipment: "",
        gudang_id: "",
        no_referensi: "",
        tanggal_muat: "",
        tanggal_inspeksi: "",
        user_id_pic: "",
        kendaraan_id: "",
        jenis_kendaraan_id: "",
        staff_id: "",
        keterangan: "",

        shipment_details: [],
        rute_shipments: [],
        biaya_lastmiles: [],

        status_kiriman: "",
        catatan_kiriman: "",

        gudang: {},
        user_pic: {},
        kendaraan: {},
        jenis_kendaraan: {},
        staff: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`${this.url}/${this.id}`);
      Object.keys(this.form).forEach((key) => {
        this.form[key] = res.data[key];
      });
      this.form.gudang_id = res.data.gudang;
      this.form.kendaraan_id = res.data.kendaraan;
      this.form.jenis_kendaraan_id = res.data.jenis_kendaraan;
      this.form.staff_id = res.data.staff;
      this.form.user_id_pic = res.data.user_pic;

      this.form.shipment_details = res.data.shipment_details.map((item) => {
        return {
          ...item,
        };
      });
      this.form.rute_shipments = res.data.rute_shipments.map((item) => {
        return {
          ...item,
        };
      });
      this.form.biaya_lastmiles = res.data.biaya_lastmiles.map((item) => {
        return {
          ...item,
        };
      });
      this.isLoadingPage = false;
    } catch (error) {
      this.isLoadingPage = false;
      this.$router.back();
    }
  },
};
</script>
