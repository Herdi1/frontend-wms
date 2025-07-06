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
            <h5 class="modal-title">Detail Lokasi</h5>

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
                <label class="font-semibold">Lokasi Induk</label>
                <span>{{
                  this.parameters.form.lokasi_id_induk
                    ? this.parameters.form.lokasi_id_induk
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Tipe Lokasi</label>
                <span>{{
                  this.parameters.form.tipe_lokasi === "T"
                    ? "Toko"
                    : this.parameters.form.tipe_lokasi === "P"
                    ? "Project"
                    : this.parameters.form.tipe_lokasi === "V"
                    ? "Vendor"
                    : this.parameters.form.tipe_lokasi === "G"
                    ? "Gudang"
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
                <label class="font-semibold">Kode Lokasi</label>
                <span>{{ this.parameters.form.kode_lokasi }}</span>
              </div>
              <div>
                <label class="font-semibold">Nama Lokasi</label>
                <span>{{ this.parameters.form.nama_lokasi }}</span>
              </div>
              <div>
                <label class="font-semibold">Negara</label>
                <span>{{
                  this.parameters.form.negara
                    ? this.parameters.form.negara.nama_negara
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Provinsi</label>
                <span>{{ this.parameters.form.provinsi.nama_provinsi }}</span>
              </div>
              <div>
                <label class="font-semibold">Kota</label>
                <span>{{
                  this.parameters.form.kota
                    ? this.parameters.form.kota.nama_kota
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Kecamatan</label>
                <span>{{
                  this.parameters.form.kecamatan
                    ? this.parameters.form.kecamatan.nama_kecamatan
                    : "Tidak Ditemukan"
                }}</span>
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
                    ? this.parameters.form.kode_pos
                    : "Tidak Ditemukan"
                }}</span>
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
                <label class="font-semibold">Email</label>
                <span>{{
                  this.parameters.form.email
                    ? this.parameters.form.email
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
                <label class="font-semibold">Nomor Telepon</label>
                <span>{{
                  this.parameters.form.no_telp
                    ? this.parameters.form.no_telp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Nomor HP</label>
                <span>{{
                  this.parameters.form.no_hp
                    ? this.parameters.form.no_hp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">No NPWP</label>
                <span>{{
                  this.parameters.form.no_npwp
                    ? this.parameters.form.no_npwp
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Longitude</label>
                <span>{{
                  this.parameters.form.longitude
                    ? this.parameters.form.longitude
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Latitude</label>
                <span>{{
                  this.parameters.form.latitude
                    ? this.parameters.form.latitude
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Radius</label>
                <span
                  >{{
                    this.parameters.form.radius &&
                    parseFloat(this.parameters.form.radius) > 0
                      ? this.parameters.form.radius + " Meter"
                      : "Tidak Ditemukan"
                  }}
                </span>
              </div>
              <div>
                <label class="font-semibold">Longitude 2</label>
                <span>{{
                  this.parameters.form.longitude2
                    ? this.parameters.form.longitude2
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Latitude 2</label>
                <span>{{
                  this.parameters.form.latitude2
                    ? this.parameters.form.latitude2
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Radius 2</label>
                <span
                  >{{
                    this.parameters.form.radius2 &&
                    parseFloat(this.parameters.form.radius2) > 0
                      ? this.parameters.form.radius2 + " Meter"
                      : "Tidak Ditemukan"
                  }}
                </span>
              </div>
              <div>
                <label class="font-semibold">Longitude 3</label>
                <span>{{
                  this.parameters.form.longitude3
                    ? this.parameters.form.longitude3
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Latitude 3</label>
                <span>{{
                  this.parameters.form.latitude3
                    ? this.parameters.form.latitude3
                    : "Tidak Ditemukan"
                }}</span>
              </div>
              <div>
                <label class="font-semibold">Radius 3</label>
                <span
                  >{{
                    this.parameters.form.radius3 &&
                    parseFloat(this.parameters.form.radius3) > 0
                      ? this.parameters.form.radius3 + " Meter"
                      : "Tidak Ditemukan"
                  }}
                </span>
              </div>
              <div>
                <label class="font-semibold">Alamat</label>
                <span
                  >{{
                    this.parameters.form.alamat
                      ? this.parameters.form.alamat
                      : "Tidak Ditemukan"
                  }}
                </span>
              </div>
              <div>
                <label class="font-semibold">Alamat Lokasi</label>
                <span
                  >{{
                    this.parameters.form.alamat_lokasi
                      ? this.parameters.form.alamat_lokasi
                      : "Tidak Ditemukan"
                  }}
                </span>
              </div>
              <div>
                <label class="font-semibold">Alamat Pemilik</label>
                <span
                  >{{
                    this.parameters.form.alamat_pemilik
                      ? this.parameters.form.alamat_pemilik
                      : "Tidak Ditemukan"
                  }}
                </span>
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
          lokasi_id_induk: "",
          tipe_lokasi: "",
          kode_referensi: "",
          kode_lokasi: "",
          nama_lokasi: "",
          negara_id: "",
          provinsi_id: "",
          kota_id: "",
          kecamatan_id: "",
          kelurahan_id: "",
          kode_pos: "",
          nama_pemilik: "",
          email: "",
          nilai_plafon: "",
          no_telp: "",
          no_hp: "",
          no_npwp: "",
          longitude: "",
          latitude: "",
          radius: "",
          longitude2: "",
          latitude2: "",
          radius2: "",
          longitude3: "",
          latitude3: "",
          radius3: "",
          alamat: "",
          alamat_lokasi: "",
          alamat_pemilik: "",
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
