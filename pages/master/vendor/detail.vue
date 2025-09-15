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
            <h5 class="modal-title">Detail Vendor</h5>

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
                <label class="font-semibold">Vendor Induk</label>
                <span>{{
                  this.parameters.form.vendor_induk
                    ? this.parameters.form.vendor_induk.nama_vendor
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
                <label class="font-semibold">User PIC</label>
                <span>{{
                  this.parameters.form.user_id_pic
                    ? this.parameters.form.user_pic.nama_lengkap
                    : "Tidak Ditemukan"
                }}</span>
              </div>

              <div>
                <label class="font-semibold">Kode Referensi</label>
                <span>{{
                  this.parameters.form.kode_referensi
                    ? this.parameters.form.kode_referensi
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Kode Vendor</label>
                <span>{{ this.parameters.form.kode_vendor }}</span>
              </div>
              <div>
                <label class="font-semibold">No NPWP Vendor</label>
                <span>{{
                  this.parameters.form.no_npwp
                    ? this.parameters.form.no_npwp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Nama Vendor</label>
                <span>{{ this.parameters.form.nama_vendor }}</span>
              </div>
              <div>
                <label class="font-semibold">Alias/Singkatan</label>
                <span>{{
                  this.parameters.form.alias
                    ? this.parameters.form.alias
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Email Vendor</label>
                <span>{{
                  this.parameters.form.email
                    ? this.parameters.form.email
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">No Telp Vendor</label>
                <span>{{
                  this.parameters.form.no_telp
                    ? this.parameters.form.no_telp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">No HP Vendor</label>
                <span>{{
                  this.parameters.form.no_hp
                    ? this.parameters.form.no_hp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">No SIUP</label>
                <span>{{
                  this.parameters.form.nomor_siup
                    ? this.parameters.form.nomor_siup
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Tipe Vendor</label>
                <span>{{
                  this.parameters.form.tipe_vendor.trim() === "o"
                    ? "Operator"
                    : this.parameters.form.tipe_vendor.trim() === "v"
                    ? "Vendor"
                    : this.parameters.form.tipe_vendor.trim() === "g"
                    ? "Sewa Gudang"
                    : this.parameters.form.tipe_vendor.trim() === "e"
                    ? "Sewa Perlatan"
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Group Vendor</label>
                <span>{{
                  this.parameters.form.group
                    ? this.parameters.form.group
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Kode Pos Vendor</label>
                <span>{{
                  this.parameters.form.kode_pos
                    ? this.parameters.form.kode_pos
                    : "Tidak Ditemukan"
                }}</span>
              </div>

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
                <label class="font-semibold">Lokasi</label>
                <span>{{ this.parameters.form.lokasi.nama_lokasi }}</span>
              </div>

              <div>
                <label class="font-semibold">Nama Pemilik</label>
                <span>{{
                  this.parameters.form.nama_pemilik
                    ? this.parameters.form.nama_pemilik
                    : "Tidak Ditemukan"
                }}</span>
              </div>
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
                <label class="font-semibold">Longitude</label>
                <span>{{ this.parameters.form.longitude }}</span>
              </div>
              <div>
                <label class="font-semibold">Latitude</label>
                <span>{{ this.parameters.form.latitude }}</span>
              </div>
              <div>
                <label class="font-semibold">Radius</label>
                <span>{{ this.parameters.form.radius }}</span>
              </div>
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
            <div class="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label class="font-semibold">Alamat Vendor</label>
                <span>{{
                  this.parameters.form.alamat_vendor
                    ? this.parameters.form.alamat_vendor
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Alamat Pemilik</label>
                <span>{{
                  this.parameters.form.alamat_pemilik
                    ? this.parameters.form.alamat_pemilik
                    : "Tidak Ditemukan"
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

      parameters: {
        form: {
          vendor_id_induk: "",
          tipe_badan_hukum_id: "",
          alias: "",
          kode_referensi: "",
          kode_vendor: "",
          nama_vendor: "",
          alamat_vendor: "",
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
          no_npwp: "",
          no_npwp_pemilik: "",
          email: "",
          lokasi_id: "",
          nama_cp: "",
          telp_cp: "",
          hp_cp: "",
          nomor_siup: "",
          group: "",
          user_id_pic: "",
          tipe_vendor: "",
          longitude: "",
          latitude: "",
          radius: "",
        },
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
