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
            <h5 class="modal-title">Detail Item Pelanggan</h5>

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
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Nama Item</label>
                <span>{{
                  this.parameters.form.nama_item
                    ? this.parameters.form.nama_item
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Kode Item Pelanggan</label>
                <span>{{
                  this.parameters.form.kode_item_pelanggan
                    ? this.parameters.form.kode_item_pelanggan
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Referensi SAP</label>
                <span>{{
                  this.parameters.form.kode_sap
                    ? this.parameters.form.kode_sap
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Vendor</label>
                <span>{{
                  this.parameters.form.vendor
                    ? this.parameters.form.vendor.nama_vendor
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Pelanggan</label>
                <span>{{
                  this.parameters.form.pelanggan
                    ? this.parameters.form.pelanggan.nama_pelanggan
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Supplier</label>
                <span>{{
                  this.parameters.form.supplier
                    ? this.parameters.form.supplier.nama_supplier
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Group Item</label>
                <p>
                  {{
                    this.parameters.form.group_item_1
                      ? this.parameters.form.group_item_1.nama_group_item
                      : "Tidak Ditemukan"
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.group_item_2
                      ? this.parameters.form.group_item_2.nama_group_item
                      : ""
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.group_item_3
                      ? this.parameters.form.group_item_3.nama_group_item
                      : ""
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.group_item_4
                      ? this.parameters.form.group_item_4.nama_group_item
                      : ""
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.group_item_5
                      ? this.parameters.form.group_item_5.nama_group_item
                      : ""
                  }}
                </p>
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
      parameters: {
        item_id: "",
        vendor_id: "",
        pelanggan_id: "",
        nama_item: "",
        kode_item_pelanggan: "",
        kode_sap: "",
        group_item_id_1: "",
        group_item_id_2: "",
        group_item_id_3: "",
        group_item_id_4: "",
        group_item_id_5: "",
        kategori_id_1: "",
        kategori_id_2: "",
        kategori_id_3: "",
        kategori_id_4: "",
        kategori_id_5: "",
        jumlah_palet: "",
        kapasitas_palet: "",
        kebutuhan_palet: "",
        batas_atas: "",
        batas_bawah: "",
        maksimal_tumpukan: "",
        supplier_id: "",
        supplier_code: "",
        satuan_id: "",
        berat_bersih: "",
        berat_kotor: "",
        satuan_id_berat: "",
        panjang: "",
        lebar: "",
        tebal: "",
        volume: "",
        satuan_id_volume: "",
        value_stocklevel: "",
        satuan_id_stocklevel: "",
        warna: "",
        keterangan: "",
      },
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
