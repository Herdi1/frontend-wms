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
            <h5 class="modal-title">Detail Item Gudang</h5>

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
                <label class="font-semibold">Nama Vendor</label>
                <span>{{
                  this.parameters.form.vendor
                    ? this.parameters.form.vendor.nama_vendor
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Nama Gudang</label>
                <span>{{
                  this.parameters.form.gudang
                    ? this.parameters.form.gudang.nama_gudang
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Nama Zona Gudang</label>
                <span>{{
                  this.parameters.form.zona_gudang
                    ? this.parameters.form.zona_gudang.nama_zona_gudang
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Nama Supplier</label>
                <span>{{
                  this.parameters.form.supplier
                    ? this.parameters.form.supplier.nama_supplier
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Kode Supplier</label>
                <span>{{
                  this.parameters.form.supplier_code
                    ? this.parameters.form.supplier_code
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
                      ? "1. " +
                        this.parameters.form.group_item_1.nama_group_item
                      : "Tidak Ditemukan"
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.group_item_2
                      ? "2. " +
                        this.parameters.form.group_item_2.nama_group_item
                      : ""
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.group_item_3
                      ? "3. " +
                        this.parameters.form.group_item_3.nama_group_item
                      : ""
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.group_item_4
                      ? "4. " +
                        this.parameters.form.group_item_4.nama_group_item
                      : ""
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.group_item_5
                      ? "5. " +
                        this.parameters.form.group_item_5.nama_group_item
                      : ""
                  }}
                </p>
              </div>
              <div>
                <label class="font-semibold">Kategori Item</label>
                <p>
                  {{
                    this.parameters.form.kategori_1
                      ? "1. " +
                        this.parameters.form.kategori_1.nama_kategori_item
                      : "Tidak Ditemukan"
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.kategori_2
                      ? "2. " +
                        this.parameters.form.kategori_2.nama_kategori_item
                      : ""
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.kategori_3
                      ? "3. " +
                        this.parameters.form.kategori_3.nama_kategori_item
                      : ""
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.kategori_4
                      ? "4. " +
                        this.parameters.form.kategori_4.nama_kategori_item
                      : ""
                  }}
                </p>
                <p>
                  {{
                    this.parameters.form.kategori_5
                      ? "5. " +
                        this.parameters.form.kategori_5.nama_kategori_item
                      : ""
                  }}
                </p>
              </div>
              <div>
                <label class="font-semibold">Batas Item</label>
                <div class="flex items-center gap-2">
                  <i class="fa fa-caret-up text-green-300"></i>
                  <p>
                    {{
                      this.parameters.form.batas_atas
                        ? this.parameters.form.batas_atas
                        : ""
                    }}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fa fa-caret-down text-red-300"></i>
                  <p>
                    {{
                      this.parameters.form.batas_bawah
                        ? this.parameters.form.batas_bawah
                        : ""
                    }}
                  </p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Jumlah Palet</label>
                <span>{{
                  this.parameters.form.jumlah_palet
                    ? this.parameters.form.jumlah_palet
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Kapasitas Palet</label>
                <span>{{
                  this.parameters.form.kapasitas_palet
                    ? this.parameters.form.kapasitas_palet
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Kebutuhan Palet</label>
                <span>{{
                  this.parameters.form.kebutuhan_palet
                    ? this.parameters.form.kebutuhan_palet
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Berat Bersih</label>
                <span class="flex gap-1">
                  <p>
                    {{
                      this.parameters.form.berat_bersih
                        ? this.parameters.form.berat_bersih
                        : "Tidak Ditemukan"
                    }}
                  </p>
                  <p v-if="this.parameters.form.berat_bersih">
                    {{
                      this.parameters.form.satuan_berat
                        ? this.parameters.form.satuan_berat.nama_satuan
                        : ""
                    }}
                  </p>
                </span>
              </div>
              <div>
                <label class="font-semibold">Berat Kotor</label>
                <span class="flex gap-1">
                  <p>
                    {{
                      this.parameters.form.berat_kotor
                        ? this.parameters.form.berat_kotor
                        : "Tidak Ditemukan"
                    }}
                  </p>
                  <p v-if="this.parameters.form.berat_kotor">
                    {{
                      this.parameters.form.satuan_berat
                        ? this.parameters.form.satuan_berat.nama_satuan
                        : ""
                    }}
                  </p>
                </span>
              </div>
              <div>
                <label class="font-semibold">Panjang</label>
                <span class="flex gap-1">
                  <p>
                    {{
                      this.parameters.form.panjang
                        ? this.parameters.form.panjang
                        : "Tidak Ditemukan"
                    }}
                  </p>
                  <p v-if="this.parameters.form.panjang">
                    {{
                      this.parameters.form.satuan
                        ? this.parameters.form.satuan.nama_satuan
                        : ""
                    }}
                  </p>
                </span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Lebar</label>
                <span class="flex gap-1">
                  <p>
                    {{
                      this.parameters.form.lebar
                        ? this.parameters.form.lebar
                        : "Tidak Ditemukan"
                    }}
                  </p>
                  <p v-if="this.parameters.form.lebar">
                    {{
                      this.parameters.form.satuan
                        ? this.parameters.form.satuan.nama_satuan
                        : ""
                    }}
                  </p>
                </span>
              </div>
              <div>
                <label class="font-semibold">Tebal</label>
                <span class="flex gap-1">
                  <p>
                    {{
                      this.parameters.form.tebal
                        ? this.parameters.form.tebal
                        : "Tidak Ditemukan"
                    }}
                  </p>
                  <p v-if="this.parameters.form.tebal">
                    {{
                      this.parameters.form.satuan
                        ? this.parameters.form.satuan.nama_satuan
                        : ""
                    }}
                  </p>
                </span>
              </div>
              <div>
                <label class="font-semibold">Volume</label>
                <span class="flex gap-1">
                  <p>
                    {{
                      this.parameters.form.volume
                        ? this.parameters.form.volume
                        : "Tidak Ditemukan"
                    }}
                  </p>
                  <p v-if="this.parameters.form.volume">
                    {{
                      this.parameters.form.satuan_volume
                        ? this.parameters.form.satuan_volume.nama_satuan
                        : ""
                    }}
                  </p>
                </span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Biaya Gaji Sopir</label>
                <span>{{
                  this.parameters.form.biaya_gaji_sopir
                    ? this.parameters.form.biaya_gaji_sopir
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Biaya Bongkar Toko</label>
                <span>{{
                  this.parameters.form.biaya_bongkartoko
                    ? this.parameters.form.biaya_bongkartoko
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Biaya Bongkar</label>
                <span>{{
                  this.parameters.form.biaya_bongkar
                    ? this.parameters.form.biaya_bongkar
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Biaya Muat</label>
                <span>{{
                  this.parameters.form.biaya_muat
                    ? this.parameters.form.biaya_muat
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Stocklevel</label>
                <span class="flex gap-1">
                  <p>
                    {{
                      this.parameters.form.value_stocklevel
                        ? this.parameters.form.value_stocklevel
                        : "Tidak Ditemukan"
                    }}
                  </p>
                  <p v-if="this.parameters.form.value_stocklevel">
                    {{
                      this.parameters.form.satuan_stocklevel
                        ? this.parameters.form.satuan_stocklevel.nama_satuan
                        : ""
                    }}
                  </p>
                </span>
              </div>
              <div>
                <label class="font-semibold">Warna</label>
                <span>{{
                  this.parameters.form.warna
                    ? this.parameters.form.warna
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div>
              <label class="font-semibold">Keterangan</label>
              <span>{{
                this.parameters.form.keterangan
                  ? this.parameters.form.keterangan
                  : "Tidak Ditemukan"
              }}</span>
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
        gudang_id: "",
        zona_id: "",
        supplier_id: "",
        supplier_code: "",
        nama_item: "",
        group_item_id_1: "",
        group_item_id_2: "",
        group_item_id_3: "",
        group_item_id_4: "",
        group_item_id_5: "",
        batas_atas: "",
        kode_sap: "",
        batas_bawah: "",
        kategori_id_1: "",
        kategori_id_2: "",
        kategori_id_3: "",
        kategori_id_4: "",
        kategori_id_5: "",
        biaya_gaji_sopir: "",
        biaya_bongkartoko: "",
        biaya_bongkar: "",
        biaya_muat: "",
        biaya_pok: "",
        jumlah_palet: "",
        kapasitas_palet: "",
        kebutuhan_palet: "",
        maksimal_tumpukan: "",
        berat_bersih: "",
        berat_kotor: "",
        panjang: "",
        lebar: "",
        tebal: "",
        volume: "",
        warna: "",
        satuan_id: "",
        satuan_id_berat: "",
        satuan_id_volume: "",
        satuan_id_stocklevel: "",
        value_stocklevel: "",
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
