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
            <h5 class="modal-title">Detail UJS Supir</h5>

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

          <div class="table-responsive mb-5">
            <table
              class="table border-collapse border border-gray-300 mt-5 h-full overflow-auto table-fixed"
            >
              <!-- :class="
                      form.ujs_sopir_details.length ? 'mb-[300px]' : ''
                    " -->
              <thead>
                <tr class="text-sm uppercase text-nowrap">
                  <th class="w-48 border border-gray-300">Lokasi</th>
                  <th class="w-48 border border-gray-300">Vendor</th>
                  <th class="w-48 border border-gray-300">Divisi</th>
                  <th class="w-48 border border-gray-300">Jenis Biaya</th>
                  <th class="w-48 border border-gray-300">Term Pembayaran</th>
                  <th class="w-48 border border-gray-300">Jenis Routing</th>
                  <th class="w-48 border border-gray-300">Berat</th>
                  <th class="w-48 border border-gray-300">Jumlah</th>
                  <th class="w-48 border border-gray-300">Nominal Satuan</th>
                  <th class="w-48 border border-gray-300">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in this.form" :key="i">
                  <td class="border border-gray-300">
                    {{ item.lokasi?.nama_lokasi ?? "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.vendor?.nama_vendor ?? "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.divisi?.nama_divisi ?? "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.jenis_biaya?.nama_jenis_biaya ?? "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.term_pembayaran?.nama_term_pembayaran ?? "" }}
                  </td>
                  <td class="border border-gray-300">
                    {{ item.jenis_routing ?? "" }}
                  </td>
                  <td class="border border-gray-300 text-right">
                    {{ item.berat || 0 | formatPrice }}
                  </td>
                  <td class="border border-gray-300 text-right">
                    {{ item.jumlah || 0 | formatPrice }}
                  </td>
                  <td class="border border-gray-300 text-right">
                    {{ item.nominal_satuan || 0 | formatPrice }}
                  </td>
                  <td class="border border-gray-300 text-right">
                    {{ item.total || 0 | formatPrice }}
                  </td>
                </tr>
                <tr v-if="!form.length > 0">
                  <td colspan="100" class="text-center">
                    <span class="flex justify-center">
                      <img
                        src="/img/data-not-found.svg"
                        style="height: 250px; object-fit: cover"
                      />
                    </span>
                    <div class="mt-3">Data Tidak Ditemukan</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- <div class="modal-body">
            <div class="grid grid-cols-2 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Lokasi</label>
                <span>{{
                  this.form.lokasi
                    ? this.form.lokasi.nama_lokasi
                    : "Lokasi Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Vendor</label>
                <span>{{
                  this.form.vendor
                    ? this.form.vendor.nama_vendor
                    : "Vendor Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Divisi</label>
                <span>{{
                  this.form.divisi
                    ? this.form.divisi.nama_divisi
                    : "Divisi Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Jenis Biaya</label>
                <span>{{
                  this.form.jenis_biaya
                    ? this.form.jenis_biaya.nama_jenis_biaya
                    : "Jenis Biaya Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Term Pembayaran</label>
                <span>{{
                  this.form.term_pembayaran
                    ? this.form.term_pembayaran.nama_term_pembayaran
                    : "Term Pembayaran Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Jenis Routing</label>
                <span>{{
                  this.form.jenis_routing
                    ? this.form.jenis_routing
                    : "Jenis Routing Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Berat</label>
                <span>{{
                  this.form.berat ? this.form.berat : "Berat Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Quantity</label>
                <span>{{
                  this.form.jumlah ? this.form.jumlah : "Jumlah Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Nominal Satuan</label>
                <span>{{ this.form.nominal_satuan | formatPrice }}</span>
              </div>
              <div>
                <label class="font-semibold">Total</label>
                <span>{{ this.form.total | formatPrice }}</span>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["isNotAccessable"],
  props: ["self"],

  data() {
    return {
      title: "Rute Lastmiles",
      visible: false,
      isLoadingData: false,
      isPaginate: true,
      form: {
        // berat: "",
        // divisi: {},
        // jenis_biaya: {},
        // jenis_routing: "",
        // jumlah: "",
        // lokasi: {},
        // nominal_satuan: "",
        // term_pembayaran: {},
        // total: "",
        // vendor: {},
      },
      // parameters: {
      //   url: "",
      //   type: "pdf",
      //   params: {
      //     gudang_id: "",
      //     tanggal: "",
      //     soft_deleted: "",
      //     search: "",
      //     order: "rute_shipment_id",
      //     sort: "desc",
      //     all: "",
      //     per_page: 10,
      //     page: 1,
      //     start_date: "",
      //     end_data: "",
      //   },
      // },
    };
  },

  // created() {
  //   this.set_data([]);
  // },

  // computed: {
  //   ...mapState("moduleApi", ["data", "error", "result"]),
  //   onFormOptionReady() {
  //     const formOption = this.$refs["form-option"];
  //     if (formOption) {
  //       formOption.isExport = false;
  //       formOption.isFilter = false;
  //       formOption.isMaintenancePage = true;
  //       formOption.isAddData = false;
  //     }
  //   },
  // },

  methods: {
    // ...mapActions("moduleApi", [
    //   "getData",
    //   "deleteData",
    //   "restoreData",
    //   "deleteAllData",
    //   "restoreAllData",
    // ]),
    // ...mapMutations("moduleApi", ["set_data"]),

    // async onLoad(page = 1) {
    //   if (this.isLoadingData) return;

    //   this.isLoadingData = true;
    //   this.parameters.params.page = parseInt(page) || 1;

    //   this.parameters.url = `finance/ujs-sopir/get-daftar-rute-lastmile`;

    //   let loader = this.$loading.show({
    //     container: this.$refs.formContainer,
    //     canCancel: true,
    //     onCancel: this.onCancel,
    //   });

    //   await this.getData(this.parameters);

    //   if (this.result == true) {
    //     loader.hide();

    //     if (page == 1) {
    //       //this.$refs["pagination"].generatePage();
    //     }

    //     this.$refs["pagination"].active_page = this.parameters.params.page;
    //   } else {
    //     this.$globalErrorToaster(this.$toaster, this.error);
    //   }

    //   this.isLoadingData = false;
    // },

    show() {
      this.visible = true;

      // this.$nextTick(() => {
      //   const formOption = this.$refs["form-option"];
      //   if (formOption) {
      //     formOption.isExport = false;
      //     formOption.isFilter = false;
      //     formOption.isMaintenancePage = true;
      //     formOption.isAddData = false;
      //   }
      // });
    },
    hide() {
      this.visible = false;
    },

    // onSort(column, sort = "asc") {
    //   this.parameters.params = {
    //     ...this.parameters.params,
    //     order: column,
    //     sort: sort,
    //   };

    //   this.onLoad(this.parameters.params.page);
    // },
  },
};
</script>
