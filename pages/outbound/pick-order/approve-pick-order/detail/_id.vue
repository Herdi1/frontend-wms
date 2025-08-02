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
              <div class="mt-7">
                <div class="flex w-full items-center">
                  <label class="w-[40%]">Status</label>
                  <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                    {{
                      this.detail_pick_order.status_approve
                        ? this.detail_pick_order.status_approve
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
      </div>
      <div
        class="mt-7 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm"
      >
        <tab-component :tabs="tabs">
          <template #DetailPickOrder>
            <p>detail</p>
          </template>
          <template #BiayaPickOrder>
            <p>biaya</p>
          </template>
        </tab-component>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: { tabComponent },
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
      let res = await this.$axios.get(`outbound/pick-order/${this.id}`);
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
      this.detail_pick_order.biaya_pick_orders = res.data.biaya_pick_orders.map(
        (item) => {
          return {
            ...item,
          };
        }
      );
      this.isLoadingPage = false;
    } catch (error) {
      this.$router.back();
    }
  },
};
</script>
