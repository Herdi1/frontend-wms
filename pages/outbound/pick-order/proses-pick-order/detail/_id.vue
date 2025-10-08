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
            <div class="mt-7 flex justify-between gap-x-4">
              <div class="flex w-full items-center">
                <label class="w-[40%]">Status Pick Order</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.status_pick_order
                      ? this.detail_pick_order.status_pick_order
                      : "-"
                  }}
                </div>
              </div>
              <div
                class="flex w-full items-center"
                v-if="this.detail_pick_order.status_pick_order === 'PROSES'"
              >
                <label class="w-[40%]">Catatan Proses</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.catatan_proses
                      ? this.detail_pick_order.catatan_proses
                      : "-"
                  }}
                </div>
              </div>
              <div
                class="flex w-full items-center"
                v-if="this.detail_pick_order.status_pick_order === 'SELESAI'"
              >
                <label class="w-[40%]">Catatan Selesai</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.catatan_selesai
                      ? this.detail_pick_order.catatan_selesai
                      : "-"
                  }}
                </div>
              </div>
              <div
                class="flex w-full items-center"
                v-if="this.detail_pick_order.status_pick_order === 'BATAL'"
              >
                <label class="w-[40%]">Catatan Batal</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_pick_order.catatan_batal
                      ? this.detail_pick_order.catatan_batal
                      : "-"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h1 class="text-xl font-bold mb-2 uppercase">Detail Pick Order</h1>
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
                <th class="w-60 border border-gray-300">Kode Item</th>
                <th class="w-60 border border-gray-300">Nama Item</th>
                <th class="w-40 border border-gray-300">Jenis</th>
                <th class="w-40 border border-gray-300">Jenis Kiriman</th>
                <th class="w-60 border border-gray-300">Peralatan</th>
                <th class="w-60 border border-gray-300">
                  Jenis <Biaya></Biaya>
                </th>
                <th class="w-60 border border-gray-300">Valuation</th>
                <th class="w-60 border border-gray-300">Quantity Request</th>
                <th class="w-60 border border-gray-300">Quantity</th>
                <th class="w-60 border border-gray-300">Zona Asal</th>
                <th class="w-60 border border-gray-300">
                  Lokasi Penyimpanan Asal
                </th>
                <th class="w-60 border border-gray-300">Zona Tujuan</th>
                <th class="w-60 border border-gray-300">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in detail_pick_order.pick_order_details"
                :key="i"
                class="border-t align-top"
              >
                <td class="border border-gray-300">
                  {{ item.item_gudang.kode_item }}
                </td>
                <td class="border border-gray-300">
                  {{ item.item_gudang.nama_item }}
                </td>
                <td class="border border-gray-300 text-center">
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
                  <div v-if="item.jenis_kiriman">
                    <p v-if="item.jenis_kiriman.trim() === 'FRC'">Franco</p>
                    <p v-if="item.jenis_kiriman.trim() === 'LCO'">Locco</p>
                    <p v-if="item.jenis_kiriman.trim() === 'SWC'">Switch</p>
                  </div>
                  <div v-else>-</div>
                </td>
                <td class="border border-gray-300">
                  {{ item.peralatan?.nama_peralatan ?? "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.jenis_biaya?.nama_jenis_biaya ?? "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.valuation.nama_valuation }}
                </td>
                <td class="border border-gray-300">
                  {{ item.quantity_request }}
                </td>
                <td class="border border-gray-300">
                  {{ item.quantity }}
                </td>
                <td class="border border-gray-300">
                  {{ item.zona_gudang.nama_zona_gudang }}
                </td>
                <td class="border border-gray-300">
                  <div>
                    <p>Aisle</p>
                    <p class="text-right">
                      {{
                        item.slot_penyimpanan_aisle?.nama_slot_penyimpanan ??
                        "-"
                      }}
                    </p>
                  </div>
                  <div>
                    <p>Rack</p>
                    <p class="text-right">
                      {{
                        item.slot_penyimpanan_rack?.nama_slot_penyimpanan ?? "-"
                      }}
                    </p>
                  </div>
                  <div>
                    <p>Level</p>
                    <p class="text-right">
                      {{
                        item.slot_penyimpanan_level?.nama_slot_penyimpanan ??
                        "-"
                      }}
                    </p>
                  </div>
                  <div>
                    <p>Bin</p>
                    <p class="text-right">
                      {{
                        item.slot_penyimpanan_bin?.nama_slot_penyimpanan ?? "-"
                      }}
                    </p>
                  </div>
                </td>
                <td class="border border-gray-300">
                  {{ item.zona_gudang_tujuan.nama_zona_gudang }}
                </td>
                <td class="border border-gray-300">
                  {{ item.keterangan }}
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
        status_pick_order: "",
        catatan_proses: "",
        catatan_selesai: "",
        catatan_batal: "",
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`outbound/pick-order/${this.id}`);
      Object.keys(this.detail_pick_order).forEach((item) => {
        if (item != "pick_order_details") {
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
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
    }
  },
};
</script>
