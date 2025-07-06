<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold">Detail Gudang</h1>

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
            <div
              class="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-top w-full mb-5"
            >
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Lokasi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.lokasi
                      ? this.detail_item.lokasi.nama_lokasi
                      : "Lokasi tidak ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname"
                  >Kode Gudang SAP</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.kode_gudang_sap }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname"
                  >Kode Gudang</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.kode_gudang }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname"
                  >Nama Gudang</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.nama_gudang }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Profit Cost Center</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.profit_cost
                      ? `${this.detail_item.profit_cost.nama_wilayah} (${this.detail_item.profit_center} - ${this.detail_item.cost_center})`
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Status Konfig SAP</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.status_konfig_outbound_sap == 1
                      ? "Aktif"
                      : "Non Aktif"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname"
                  >Nomor Rekening</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.nomor_rekening }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="fullname"
                  >Atas Nama Rekening</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.atas_nama_rekening }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Status Gudang</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.status_gudang == 1 ? "Aktif" : "Non Aktif"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Group Gudang 1</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.group_gudang_1
                      ? this.detail_item.group_gudang_1.nama_group_gudang
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Group Gudang 2</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.group_gudang_2
                      ? this.detail_item.group_gudang_2.nama_group_gudang
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Group Gudang 3</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.group_gudang_3
                      ? this.detail_item.group_gudang_3.nama_group_gudang
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Group Gudang 4</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.group_gudang_4
                      ? this.detail_item.group_gudang_4.nama_group_gudang
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Group Gudang 5</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.group_gudang_5
                      ? this.detail_item.group_gudang_5.nama_group_gudang
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername">Latitude</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.latitude }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername">Longitude</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.longitude }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername">Alamat</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.alamat }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername">Kecamatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kecamatan
                      ? this.detail_item.kecamatan.nama_kecamatan
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername">Kota</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kota
                      ? this.detail_item.kota.nama_kota
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername">Provinsi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.provinsi
                      ? this.detail_item.provinsi.nama_provinsi
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername">Negara</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.negara
                      ? this.detail_item.negara.nama_negara
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Vendor Pemilik</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.vendor_pemilik
                      ? this.detail_item.vendor_pemilik.nama_vendor
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Vendor Operator</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.vendor_operator
                      ? this.detail_item.vendor_operator.nama_vendor
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Fungsi Gudang</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.fungsi_gudang
                      ? this.detail_item.fungsi_gudang.nama_fungsi
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Fisik Gudang</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.fisik_gudang
                      ? this.detail_item.fisik_gudang.nama_fisik
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Ukuran Gudang</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.ukuran_gudang
                      ? this.detail_item.ukuran_gudang.nama_ukuran
                      : "Tidak Ditemukan"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Nomor Handphone</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.no_hp }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Nomor WhatsApp</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.no_wa }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername">Kapasitas</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.kapasitas }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Kapasitas Bongkar</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.kapasitas_bongkar }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Status Sewa</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.status_sewa == 0 ? "Sewa" : "Sendiri" }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Status Satpam</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.status_satpam == 0
                      ? "Tidak Memiliki Satpam"
                      : "Memiliki Satpam"
                  }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Luas Gudang</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.luas_gudang }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >Satuan Luas</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.satuan_luas.nama_satuan }}
                </div>
              </div>

              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold" for="uername"
                  >File Layout</label
                >
                <div class="w-[60%]">
                  <button
                    @click="displayFile"
                    class="p-2 h-auto bg-blue-500 rounded-md max-w-full flex gap-2 items-center text-white"
                  >
                    <i class="fa fa-file text-xl"></i>
                    <span class="truncate">{{
                      this.detail_item.file_layout
                    }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <table-data-loading-section :self="this" /> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);
    return {
      id,

      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_item: {
        gudang_id: "",
        lokasi_id: "",
        kode_gudang_sap: "",
        profit_cost_id: "",
        kode_gudang: "",
        nama_gudang: "",
        status_konfig_outbound_sap: "",
        nomor_rekening: "",
        atas_nama_rekening: "",
        status_gudang: "",
        group_gudang_id_1: "",
        group_gudang_id_2: "",
        group_gudang_id_3: "",
        group_gudang_id_4: "",
        group_gudang_id_5: "",
        longitude: "",
        latitude: "",
        alamat: "",
        kecamatan_id: "",
        kota_id: "",
        provinsi_id: "",
        negara_id: "",
        vendor_id_pemilik: "",
        vendor_id_operator: "",
        fungsi_gudang_id: "",
        no_hp: "",
        no_wa: "",
        kapasitas: "",
        kapasitas_bongkar: "",
        fisik_gudang_id: "",
        ukuran_gudang_id: "",
        file_layout: "",
        status_sewa: "",
        status_satpam: "",
        luas_gudang: "",
        satuan_id_luas: "",
        fisik_gudang: {},
        fungsi_gudang: {},
        group_gudang_1: {},
        group_gudang_2: {},
        group_gudang_3: {},
        group_gudang_4: {},
        group_gudang_5: {},
        kecamatan: {},
        kota: {},
        provinsi: {},
        negara: {},
        lokasi: {},
        profit_cost: {},
        satuan_luas: {},
        ukuran_gudang: {},
        vendor_pemilik: {},
        vendor_operator: {},
      },
      form: {
        item_id: "",
      },
    };
  },

  async created() {
    try {
      let response = await this.$axios.get("master/gudang/" + this.id);
      Object.keys(this.detail_item).forEach((item) => {
        this.detail_item[item] = response.data[item];
      });

      this.isLoadingPage = false;
    } catch (error) {
      this.$router.push("/master/gudang");
    }
  },

  methods: {},
};
</script>
