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
            <h5 class="modal-title">Detail Pelanggan</h5>

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
                <label class="font-semibold">Pelanggan Induk</label>
                <span>{{
                  this.parameters.form.pelanggan_induk
                    ? this.parameters.form.pelanggan_induk.nama_pelanggan
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Tipe Badan Hukum</label>
                <span>{{
                  this.parameters.form.tipebadanhukum.nama_tipe_badan_hukum
                }}</span>
              </div>
              <div>
                <label class="font-semibold">User Sales</label>
                <span>{{
                  this.parameters.form.user_sales
                    ? this.parameters.form.user_sales.nama_lengkap
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Kode Referensi</label>
                <span>{{ this.parameters.form.kode_referensi }}</span>
              </div>
              <div>
                <label class="font-semibold">Kode Pelanggan</label>
                <span>{{ this.parameters.form.kode_pelanggan }}</span>
              </div>
              <div>
                <label class="font-semibold">No NPWP Pelanggan</label>
                <span>{{
                  this.parameters.form.no_npwp
                    ? this.parameters.form.no_npwp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Nama Pelanggan</label>
                <span>{{ this.parameters.form.nama_pelanggan }}</span>
              </div>
              <div>
                <label class="font-semibold">Alias/Singkatan</label>
                <span>{{ this.parameters.form.alias }}</span>
              </div>
              <div>
                <label class="font-semibold">Email</label>
                <span>{{
                  this.parameters.form.email
                    ? this.parameters.form.email
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Negara</label>
                <span>{{ this.parameters.form.negara.nama_negara }}</span>
              </div>
              <div>
                <label class="font-semibold">Provinsi</label>
                <span>{{ this.parameters.form.provinsi.nama_provinsi }}</span>
              </div>
              <div>
                <label class="font-semibold">Kota</label>
                <span>{{ this.parameters.form.kota.nama_kota }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Kecamatan</label>
                <span>{{ this.parameters.form.kecamatan.nama_kecamatan }}</span>
              </div>
              <div>
                <label class="font-semibold">Kelurahan</label>
                <span>{{
                  this.parameters.form.kelurahan
                    ? this.parameters.form.kelurahan.nama_kelurahan
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Kode Pos</label>
                <span>{{
                  this.parameters.form.kode_pos
                    ? this.parameters.form.kode_pos.nama_kode_pos
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Nama Pemilik</label>
                <span>{{ this.parameters.form.nama_pemilik }}</span>
              </div>
              <div>
                <label class="font-semibold">No Telepon</label>
                <span>{{
                  this.parameters.form.no_telp
                    ? this.parameters.form.no_telp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">No HP</label>
                <span>{{
                  this.parameters.form.no_hp
                    ? this.parameters.form.no_hp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">NIK Pemilik</label>
                <span>{{
                  this.parameters.form.nik_pemilik
                    ? this.parameters.form.nik_pemilik
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">No NPWP Pemilik</label>
                <span>{{
                  this.parameters.form.no_npwp_pemilik
                    ? this.parameters.form.no_npwp_pemilik
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Nomor SIUP</label>
                <span>{{
                  this.parameters.form.nomor_siup
                    ? this.parameters.form.nomor_siup
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Nama Contact Person</label>
                <span>{{
                  this.parameters.form.nama_cp
                    ? this.parameters.form.nama_cp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">No Telepon Contact Person</label>
                <span>{{
                  this.parameters.form.telp_cp
                    ? this.parameters.form.telp_cp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">No HP Contact Person</label>
                <span>{{
                  this.parameters.form.hp_cp
                    ? this.parameters.form.hp_cp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Rentang Retur Penjualan</label>
                <span>{{
                  this.parameters.form.rentang_retur_penjualan
                    ? this.parameters.form.rentang_retur_penjualan
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Nilai Plafon</label>
                <span>{{
                  this.parameters.form.nilai_plafon
                    ? this.parameters.form.nilai_plafon
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Lokasi</label>
                <span>{{ this.parameters.form.lokasi.nama_lokasi }}</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Longitude</label>
                <span>{{ this.parameters.form.longitude }}</span>
              </div>
              <div>
                <label class="font-semibold">Latitude</label>
                <span>{{ this.parameters.form.latitude }}</span>
              </div>
              <div>
                <label class="font-semibold">Radius</label>
                <span>{{ this.parameters.form.radius }} Meter</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 mb-3 my-1">
              <div>
                <label class="font-semibold">Alamat Pelanggan</label>
                <span>{{ this.parameters.form.alamat_pelanggan }}</span>
              </div>
              <div>
                <label class="font-semibold">Alamat Pemilik</label>
                <span>{{ this.parameters.form.alamat_pemilik }}</span>
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
        pelanggan_id_induk: "",
        tipe_badan_hukum_id: "",
        user_id_sales: "",
        alias: "",
        kode_referensi: "",
        kode_pelanggan: "",
        no_npwp: "",
        nama_pelanggan: "",
        email: "",
        alamat_pelanggan: "",
        kelurahan_id: "",
        kecamatan_id: "",
        kota_id: "",
        provinsi_id: "",
        negara_id: "",
        kode_pos: "",
        nama_pemilik: "",
        alamat_pemilik: "",
        no_telp: "",
        no_hp: "",
        nik_pemilik: "",
        no_npwp_pemilik: "",
        nomor_siup: "",
        nama_cp: "",
        telp_cp: "",
        hp_cp: "",
        nilai_plafon: "",
        lokasi_id: "",
        rentang_retur_penjualan: "",
        longitude: "",
        latitude: "",
        radius: "",
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
