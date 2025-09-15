<template>
  <portal v-if="visible" to="modal-detail">
    <div @click="hide" class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="modal fade fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 w-[700px] max-h-[700px] overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-detail"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header flex justify-between text-xl font-bold mb-3">
            <h5 class="modal-title">Detail Data</h5>

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
            <div class="form-group">
              <label for="date">Tanggal</label>
              <div>{{ parameters.form.tanggal }}</div>
            </div>
            <div class="form-group">
              <label for="date">Tanggal Expired</label>
              <div>{{ parameters.form.tanggal_expired }}</div>
            </div>

            <div class="row">
              <div class="col-md-6 form-group">
                <label for="code">Kode Penyimpanan</label>
                <div>
                  {{
                    parameters.form.kode_slot_penyimpanan_terakhir
                      ? parameters.form.kode_slot_penyimpanan_terakhir || "-"
                      : "-"
                  }}
                </div>
              </div>

              <div class="form-group">
                <label for="reference_code"> Referensi Kode </label>
                <div>{{ parameters.form.kode_referensi || "-" }}</div>
              </div>
              <div class="form-group">
                <label for="reference_code"> Serial Number </label>
                <div>{{ parameters.form.serial_number || "-" }}</div>
              </div>

              <!-- <div class="col-md-6 form-group">
                <label for="product_id">Kode Coa</label>
                <div>
                  {{
                    parameters.form.coa
                      ? parameters.form.coa.nama_coa || "-"
                      : "-"
                  }}
                </div>
              </div> -->
            </div>
            <div class="row">
              <div class="col-md-4 form-group">
                <label for="saldo">Saldo Awal</label>
                <div class="text-info">{{ parameters.form.saldo_awal }}</div>
              </div>
              <div class="col-md-4 form-group">
                <label for="saldo">Saldo Akhir</label>
                <div class="text-info">{{ parameters.form.saldo_akhir }}</div>
              </div>
              <div class="col-md-4 form-group" v-if="parameters.form.masuk > 0">
                <label for="credit">Masuk</label>
                <div>
                  <p>
                    Total Masuk:
                    <span class="text-success">{{
                      parameters.form.masuk
                    }}</span>
                  </p>
                </div>
              </div>
              <div
                class="col-md-4 form-group"
                v-if="parameters.form.keluar > 0"
              >
                <label for="debit">Keluar</label>
                <div class="text-danger">
                  <span>{{ parameters.form.keluar }}</span>
                </div>
              </div>
            </div>

            <!-- <div class="form-group">
              <label for="last_balance">Saldo Akhir</label>
              <div class="text-primary">
                <span>
                  {{ formatPrice(parameters.form.last_balance) }}
                </span>
              </div>
            </div> -->

            <div class="form-group">
              <label for="description"> Deskripsi </label>
              <div>{{ parameters.form.deskripsi || "-" }}</div>
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
        form: {},
      },
      form: {
        stock_card_id: "",
      },
    };
  },

  // async created() {
  //   await this.fetchStockCardDetail();
  // },

  methods: {
    async fetchStockCardDetail() {
      this.isLoadingData = true;
      try {
        let response = await this.$axios.get(
          "inventory/stock-card/" + this.parameters.form.kartu_stok_id
        );

        this.parameters.form = response.data;

        Object.keys(this.detail_item).forEach((item) => {
          this.detail_item[item] = response.data[item];
        });
        console.log(this.parameters.form);
      } catch (error) {
        // this.hide();
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
    formatPrice(value) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);
    },
  },
};
</script>
