<template>
  <portal v-if="visible" to="modal-detail">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 w-[700px] max-h-[800px] overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-detail"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="flex justify-between text-xl font-bold mb-3">
            <h5 class="">Detail Data Item Master</h5>

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
            <div class="grid grid-cols-2 gap-3 mb-3">
              <div class="col">
                <div>
                  <label class="font-bold" for="fullname">Nama Item</label>
                  <div>{{ this.detail_item.nama_item }}</div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Kode Item</label>
                  <div>{{ this.detail_item.kode_wms }}</div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Satuan</label>
                  <div>{{ this.detail_item.satuan.nama_satuan }}</div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Berat</label>
                  <div>
                    {{
                      this.detail_item.berat +
                      " " +
                      this.detail_item.satuan_berat.nama_satuan
                    }}
                  </div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Volume</label>
                  <div>
                    {{
                      this.detail_item.berat +
                      " " +
                      this.detail_item.satuan_volume.nama_satuan
                    }}
                  </div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Stocklevel</label>
                  <div>
                    {{
                      this.detail_item.value_stocklevel +
                      " " +
                      this.detail_item.satuan_stocklevel.nama_satuan
                    }}
                  </div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Supplier</label>
                  <div>
                    {{
                      this.detail_item.supplier
                        ? this.detail_item.supplier.nama_supplier
                        : "Supplier tidak ditemukan"
                    }}
                  </div>
                </div>
              </div>

              <div class="col" v-if="this.detail_item.group_item_1">
                <div>
                  <label class="font-bold" for="uername">Group Item 1</label>
                  <div>{{ this.detail_item.group_item_1.nama_group_item }}</div>
                </div>
              </div>

              <div class="col" v-if="this.detail_item.group_item_2">
                <div>
                  <label class="font-bold" for="uername">Group Item 2</label>
                  <div>{{ this.detail_item.group_item_2.nama_group_item }}</div>
                </div>
              </div>

              <div class="col" v-if="this.detail_item.group_item_3">
                <div>
                  <label class="font-bold" for="uername">Group Item 3</label>
                  <div>{{ this.detail_item.group_item_3.nama_group_item }}</div>
                </div>
              </div>

              <div class="col" v-if="this.detail_item.group_item_4">
                <div>
                  <label class="font-bold" for="uername">Group Item 4</label>
                  <div>{{ this.detail_item.group_item_4.nama_group_item }}</div>
                </div>
              </div>

              <div class="col" v-if="this.detail_item.group_item_5">
                <div>
                  <label class="font-bold" for="uername">Group Item 5</label>
                  <div>{{ this.detail_item.group_item_5.nama_group_item }}</div>
                </div>
              </div>

              <div class="col" v-if="kategori_item_1">
                <div>
                  <label class="font-bold" for="uername">Kategori Item 1</label>
                  <div>
                    {{ this.detail_item.kategori_item_1.nama_kategori_item }}
                  </div>
                </div>
              </div>

              <div class="col" v-if="this.detail_item.kategori_item_2">
                <div>
                  <label class="font-bold" for="uername">Kategori Item 2</label>
                  <div>
                    {{ this.detail_item.kategori_item_2.nama_kategori_item }}
                  </div>
                </div>
              </div>

              <div class="col" v-if="this.detail_item.kategori_item_3">
                <div>
                  <label class="font-bold" for="uername">Kategori Item 3</label>
                  <div>
                    {{ this.detail_item.kategori_item_3.nama_kategori_item }}
                  </div>
                </div>
              </div>

              <div class="col" v-if="this.detail_item.kategori_item_4">
                <div>
                  <label class="font-bold" for="uername">Kategori Item 4</label>
                  <div>
                    {{ this.detail_item.kategori_item_4.nama_kategori_item }}
                  </div>
                </div>
              </div>

              <div class="col" v-if="this.detail_item.kategori_item_5">
                <div>
                  <label class="font-bold" for="uername">Kategori Item 5</label>
                  <div>
                    {{ this.detail_item.kategori_item_5.nama_kategori_item }}
                  </div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Batas Atas</label>
                  <div>{{ this.detail_item.batas_atas }}</div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Batas Bawah</label>
                  <div>{{ this.detail_item.batas_bawah }}</div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Jumlah Palet</label>
                  <div>{{ this.detail_item.jumlah_palet }}</div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Kapasitas Palet</label>
                  <div>{{ this.detail_item.kapasitas_palet }}</div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername">Kebutuhan Palet</label>
                  <div>{{ this.detail_item.kebutuhan_palet }}</div>
                </div>
              </div>

              <div class="col">
                <div>
                  <label class="font-bold" for="uername"
                    >Maksimal Tumpukan</label
                  >
                  <div>{{ this.detail_item.maksimal_tumpukan }}</div>
                </div>
              </div>

              <div class="col col-span-2">
                <div>
                  <label class="font-bold" for="uername">Keterangan</label>
                  <div>{{ this.detail_item.keterangan }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- <table-data-loading-section :self="this" /> -->
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
      isLoadingData: false,
      visible: false,
      detail_item: {
        item_id: "",
        nama_item: "",
        kode_wms: "",
        kode_alternatif: "",
        kode_alternatif_2: "",
        satuan_id: "",
        satuan_id_berat: "",
        berat: "",
        satuan_id_volume: "",
        volume: "",
        satuan_id_stocklevel: "",
        value_stocklevel: "",
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
        batas_atas: "",
        batas_bawah: "",
        jumlah_palet: "",
        kapasitas_palet: "",
        kebutuhan_palet: "",
        maksimal_tumpukan: "",
        supplier_id: "",
        keterangan: "",
        satuan: {},
        satuan_berat: {},
        satuan_volume: {},
        satuan_stocklevel: {},
        supplier: {},
        group_item_1: {},
        group_item_2: {},
        group_item_3: {},
        group_item_4: {},
        group_item_5: {},
        kategori_item_1: {},
        kategori_item_2: {},
        kategori_item_3: {},
        kategori_item_4: {},
        kategori_item_5: {},
      },
      form: {
        item_id: "",
      },
    };
  },

  async created() {
    await this.fetchItemDetail();
  },

  methods: {
    async fetchItemDetail() {
      this.isLoadingData = true;
      try {
        let response = await this.$axios.get(
          "master/item/" + this.form.item_id
        );

        Object.keys(this.detail_item).forEach((item) => {
          this.detail_item[item] = response.data[item];
        });
      } catch (error) {
        this.hide();
      } finally {
        this.isLoadingData = false;
        console.log(this.detail_item);
      }
    },
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
