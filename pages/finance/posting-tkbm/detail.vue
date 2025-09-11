<template>
  <portal v-if="visible" to="modal-detail">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 w-full max-w-[500px] max-h-[80vh] overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-detail"
    >
      <div class="modal-dialog relative w-full">
        <div class="modal-content overflow-y-auto">
          <div class="flex justify-between text-xl font-bold mb-3">
            <h5 class="modal-title">Detail TKBM</h5>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hide()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="grid grid-cols-2 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Gudang</label>
                <span>{{
                  this.self.form.list_tkbm.gudang
                    ? this.self.form.list_tkbm.gudang.nama_gudang
                    : "Gudang Tidak Ditemukan"
                }}</span>
              </div>
              <div v-if="this.self.form.jenis === 'OUTBOUND'">
                <label class="font-semibold">Kode Pick Order</label>
                <span>{{
                  this.self.form.list_tkbm.pick_order
                    ? this.self.form.list_tkbm.pick_order.kode_pick_order
                    : "Pick Order Tidak Ditemukan"
                }}</span>
              </div>
              <div v-if="this.self.form.jenis === 'OUTBOUND'">
                <label class="font-semibold">Kode TKBM</label>
                <span>{{
                  this.self.form.list_tkbm.pick_order
                    ? this.self.form.list_tkbm.pick_order.kode_tkbm
                    : "Kode TKBM Tidak Ditemukan"
                }}</span>
              </div>
              <div v-if="this.self.form.jenis === 'OUTBOUND'">
                <label class="font-semibold">Staff</label>
                <span>{{
                  this.self.form.list_tkbm.pick_order
                    ? this.self.form.list_tkbm.pick_order.staff.nama_lengkap
                    : "Staff Tidak Ditemukan"
                }}</span>
              </div>
              <div v-if="this.self.form.jenis === 'INBOUND'">
                <label class="font-semibold">Kode Inbound</label>
                <span>{{
                  this.self.form.list_tkbm.inbound
                    ? this.self.form.list_tkbm.inbound.kode_inbound
                    : "Kode Inbound Tidak Ditemukan"
                }}</span>
              </div>
              <div v-if="this.self.form.jenis === 'INBOUND'">
                <label class="font-semibold">Kode TKBM</label>
                <span>{{
                  this.self.form.list_tkbm.inbound
                    ? this.self.form.list_tkbm.inbound.kode_tkbm
                    : "Kode TKBM Tidak Ditemukan"
                }}</span>
              </div>
              <div v-if="this.self.form.jenis === 'INBOUND'">
                <label class="font-semibold">Staff</label>
                <span>{{
                  this.self.form.list_tkbm.inbound
                    ? this.self.form.list_tkbm.inbound.staff.nama_lengkap
                    : "Staff Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Nama Item</label>
                <span
                  >{{
                    this.self.form.list_tkbm.item_gudang
                      ? this.self.form.list_tkbm.item_gudang.kode_item
                      : "Kode Item Tidak Ditemukan"
                  }}
                  -
                  {{
                    this.self.form.list_tkbm.item_gudang
                      ? this.self.form.list_tkbm.item_gudang.nama_item
                      : "Nama Item Tidak Ditemukan"
                  }}</span
                >
              </div>
              <div>
                <label class="font-semibold">Quantity</label>
                <span>{{
                  this.self.form.list_tkbm.jumlah
                    ? this.self.form.list_tkbm.jumlah
                    : "Quantity Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Dasar Perhitungan</label>
                <span>{{
                  this.self.form.list_tkbm.dasar_perhitungan
                    ? this.self.form.list_tkbm.dasar_perhitungan
                    : "Dasar Perhitungan Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Jenis Biaya</label>
                <span>{{
                  this.self.form.list_tkbm.jenis_biaya
                    ? this.self.form.list_tkbm.jenis_biaya.nama_jenis_biaya
                    : "Jenis Biaya Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Berat</label>
                <span>{{
                  this.self.form.list_tkbm.berat
                    ? this.self.form.list_tkbm.berat
                    : "Berat Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Volume</label>
                <span>{{
                  this.self.form.list_tkbm.volume
                    ? this.self.form.list_tkbm.volume
                    : "Volume Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Nominal Satuan</label>
                <span>{{
                  this.self.form.list_tkbm.nominal_satuan | formatPrice
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Total</label>
                <span>{{ this.self.form.list_tkbm.total | formatPrice }}</span>
              </div>
              <div>
                <label class="font-semibold">Vendor</label>
                <span>{{
                  this.self.form.list_tkbm.vendor
                    ? this.self.form.list_tkbm.vendor.nama_vendor
                    : "Vendor Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Keterangan</label>
                <span>{{
                  this.self.form.list_tkbm.keterangan
                    ? this.self.form.list_tkbm.keterangan
                    : "Keterangan Tidak Ditemukan"
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  middleware: ["isNotAccessable"],
  props: ["self"],

  data() {
    return {
      visible: false,
    };
  },

  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
