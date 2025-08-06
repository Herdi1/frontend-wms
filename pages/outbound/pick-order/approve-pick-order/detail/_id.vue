<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Pick Order</h1>

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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kode Pick Order</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.kode_pick_order
                      ? this.detail_pick_order.kode_pick_order
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Tanggal</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.tanggal
                      ? this.detail_pick_order.tanggal
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor Referensi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.no_referensi_1
                      ? this.detail_pick_order.no_referensi_1
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor Referensi 2</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.no_referensi_2
                      ? this.detail_pick_order.no_referensi_2
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor Referensi 3</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.no_referensi_3
                      ? this.detail_pick_order.no_referensi_3
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Gudang</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.gudang_id
                      ? this.detail_pick_order.gudang_id.nama_gudang
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">User PIC</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.user_id_pic
                      ? this.detail_pick_order.user_id_pic.nama_lengkap
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Staff</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.staff_id_pic
                      ? this.detail_pick_order.staff_id_pic.nama_lengkap
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Peralatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.peralatan_id
                      ? this.detail_pick_order.peralatan_id.nama_peralatan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Keterangan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.keterangan
                      ? this.detail_pick_order.keterangan
                      : "-"
                  }}
                </div>
              </div>
            </div>
            <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4">
              <div class="flex w-full items-center">
                <label class="w-[40%]">Status</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.status_approve === "0"
                      ? "Menunggu"
                      : this.detail_pick_order.status_approve === "1"
                      ? "Approve"
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Catatan Approve</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.catatan_approve
                      ? this.detail_pick_order.catatan_approve
                      : "-"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-7 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
      >
        <tab-component :tabs="tabs">
          <template #DetailPickOrder>
            <div
              class="mb-3 text-xl font-bold uppercase flex justify-between items-start w-full"
            >
              <span class="w-1/2"><h1>Pick Order Detail</h1></span>
            </div>
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                :class="
                  detail_pick_order.pick_order_details.length ? 'mb-48' : ''
                "
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <!-- <th class="w-60 border border-gray-300">
                          Kode Pick Request
                        </th>
                        <th class="w-60 border border-gray-300">Tanggal</th> -->
                    <th class="w-60 border border-gray-300">
                      Kode Delivery Order
                    </th>
                    <th class="w-60 border border-gray-300">Kode Item</th>
                    <th class="w-60 border border-gray-300">Nama Item</th>
                    <th class="w-60 border border-gray-300">Valuation</th>
                    <th class="w-60 border border-gray-300">Zona Asal</th>
                    <th class="w-60 border border-gray-300">
                      Lokasi Penyimpanan Asal
                    </th>
                    <th class="w-60 border border-gray-300">
                      Quantity Request
                    </th>
                    <th class="w-60 border border-gray-300">Quantity</th>
                    <th class="w-60 border border-gray-300">Zona Tujuan</th>
                    <!-- <th class="w-60 border border-gray-300">
                          Lokasi Penyimpanan Tujuan
                        </th> -->
                    <th class="w-60 border border-gray-300">Keterangan</th>
                    <!-- <th class="w-20 border border-gray-300 text-center">
                          Delete
                        </th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in detail_pick_order.pick_order_details"
                    :key="i"
                    class="border-t border-gray-400 align-top"
                  >
                    <td class="border border-gray-300">
                      {{ item.kode_delivery_order }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.item_gudang ? item.item_gudang.kode_item : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.valuation ? item.valuation.nama_valuation : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{
                        item.zona_gudang
                          ? item.zona_gudang.nama_zona_gudang
                          : "-"
                      }}
                    </td>
                    <td class="border border-gray-300">
                      <div class="w-full flex justify-between">
                        <p>Lokasi Aisle:</p>
                        <div class="text-right font-medium">
                          {{
                            item.slot_penyimpanan_aisle
                              ? item.slot_penyimpanan_aisle
                                  .nama_slot_penyimpanan
                              : "-"
                          }}
                        </div>
                      </div>
                      <div class="w-full flex justify-between">
                        <p>Lokasi Rack:</p>
                        <div class="font-medium">
                          {{
                            item.slot_penyimpanan_rack
                              ? item.slot_penyimpanan_rack.nama_slot_penyimpanan
                              : "-"
                          }}
                        </div>
                      </div>
                      <div class="w-full flex justify-between">
                        <p>Lokasi Level:</p>
                        <div class="font-medium">
                          {{
                            item.slot_penyimpanan_level
                              ? item.slot_penyimpanan_level
                                  .nama_slot_penyimpanan
                              : "-"
                          }}
                        </div>
                      </div>
                      <div class="w-full flex justify-between">
                        <p>Lokasi Bin:</p>
                        <div class="font-medium">
                          {{
                            item.slot_penyimpanan_bin
                              ? item.slot_penyimpanan_bin.nama_slot_penyimpanan
                              : "-"
                          }}
                        </div>
                      </div>
                    </td>
                    <td class="border border-gray-300">
                      {{ item.quantity_request ? item.quantity_request : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.quantity ? item.quantity : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{
                        item.zona_gudang_tujuan
                          ? item.zona_gudang_tujuan.nama_zona_gudang
                          : "-"
                      }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.keterangan ? item.keterangan : "-" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template #BiayaPickOrder>
            <div
              class="mb-3 text-xl font-bold uppercase flex justify-between items-start w-full"
            >
              <span class="w-1/2"><h1>Biaya Order Detail</h1></span>
            </div>
            <div class="table-responsive overflow-y-hidden mb-7">
              <table
                class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
                :class="
                  detail_pick_order.biaya_pick_orders.length ? 'mb-48' : ''
                "
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <th class="w-60 border border-gray-300">Jenis Biaya</th>
                    <th class="w-60 border border-gray-300">COA</th>
                    <th class="w-60 border border-gray-300">Divisi</th>
                    <th class="w-60 border border-gray-300">Vendor</th>
                    <th class="w-60 border border-gray-300">Nominal Satuan</th>
                    <th class="w-60 border border-gray-300">Jumlah</th>
                    <th class="w-60 border border-gray-300">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in detail_pick_order.biaya_pick_orders"
                    :key="i"
                    class="border-t border-gray-400 align-top"
                  >
                    <td class="border border-gray-300">
                      {{
                        item.jenis_biaya
                          ? item.jenis_biaya.nama_jenis_biaya
                          : "-"
                      }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.coa.kode_coa }} -
                      {{ item.coa ? item.coa.nama_coa : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.divisi ? item.divisi.nama_divisi : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.vendor ? item.vendor.nama_vendor : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.nominal_satuan ? item.nominal_satuan : "-" }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.jumlah ? item.jumlah : "-" }}
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
  </section>
</template>

<script>
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      tabs: [
        { name: "DETAIL PICK ORDER", slotName: "DetailPickOrder" },
        { name: "BIAYA PICK ORDER", slotName: "BiayaPickOrder" },
      ],

      id,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_pick_order: {
        kode_pick_order: "",
        tanggal: "",
        no_referensi_1: "",
        no_referensi_2: "",
        no_referensi_3: "",
        gudang_id: "",
        user_id_pic: "",
        staff_id_pic: "",
        peralatan_id: "",
        keterangan: "",
        pick_order_details: [],
        biaya_pick_orders: [],
        status_approve: "",
        catatan_approve: "",
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`outbound/approve-pick-order/${this.id}`);
      Object.keys(this.detail_pick_order).forEach((item) => {
        if (item != "pick_order_details" && item != "biaya_pick_orders") {
          this.detail_pick_order[item] = res.data[item];
        }
      });
      this.detail_pick_order.gudang_id = res.data.gudang;
      this.detail_pick_order.user_id_pic = res.data.user_pic;
      this.detail_pick_order.staff_id_pic = res.data.staff_pic;
      this.detail_pick_order.peralatan_id = res.data.peralatan;
      this.detail_pick_order.pick_order_details =
        res.data.pick_order_details.map((item) => {
          return {
            ...item,
          };
        });
      this.detail_pick_order.biaya_pick_orders = res.data.biaya_pick_orders
        ? res.data.biaya_pick_orders
        : [];
      // this.detail_pick_order.biaya_pick_orders = res.data.biaya_pick_orders.map(
      //   (item) => {
      //     return {
      //       ...item,
      //     };
      //   }
      // );
      this.isLoadingPage = false;
      // console.log("biaya", this.detail_pick_order.biaya_pick_orders);
    } catch (error) {
      this.$router.back();
      // console.log("error", error);
    }
  },
};
</script>
