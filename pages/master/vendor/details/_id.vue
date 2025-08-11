<template>
  <section>
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Vendor</h1>

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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
              <div class="flex w-full items-center">
                <label class="w-[40%]">Vendor Induk</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.vendor_id_induk
                      ? this.detail_vendor.vendor_id_induk.nama_vendor
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kode Vendor</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.kode_vendor
                      ? this.detail_vendor.kode_vendor
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kode Referensi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.kode_referensi
                      ? this.detail_vendor.kode_referensi
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nama Vendor</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.nama_vendor
                      ? this.detail_vendor.nama_vendor
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Alias / Singkatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.alias ? this.detail_vendor.alias : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Tipe Badan Hukum</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.tipe_badan_hukum_id
                      ? this.detail_vendor.tipe_badan_hukum_id
                          .nama_tipe_badan_hukum
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Email</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.email ? this.detail_vendor.email : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">No Telepon</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.no_telp
                      ? this.detail_vendor.no_telp
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">No HP</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.no_hp ? this.detail_vendor.no_hp : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">User PIC</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.user_id_pic
                      ? this.detail_vendor.user_id_pic.nama_lengkap
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">No NPWP Vendor</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.no_npwp
                      ? this.detail_vendor.no_npwp
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor SIUP</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.nomor_siup
                      ? this.detail_vendor.nomor_siup
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Tipe Vendor</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.tipe_vendor_id
                      ? this.detail_vendor.tipe_vendor_id.nama_tipe_vendor
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Grouping Vendor</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.group ? this.detail_vendor.group : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Negara</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.negara_id
                      ? this.detail_vendor.negara_id.nama_negara
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Provinsi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.provinsi_id
                      ? this.detail_vendor.provinsi_id.nama_provinsi
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kota</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.kota_id
                      ? this.detail_vendor.kota_id.nama_kota
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kecamatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.kecamatan_id
                      ? this.detail_vendor.kecamatan_id.nama_kecamatan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kelurahan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.kelurahan_id
                      ? this.detail_vendor.kelurahan_id.nama_kelurahan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kode Pos</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.kode_pos_id
                      ? this.detail_vendor.kode_pos_id.nama_kode_pos
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Longitude</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.longitude
                      ? this.detail_vendor.longitude
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Latitude</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.latitude
                      ? this.detail_vendor.latitude
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Radius</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.radius
                      ? this.detail_vendor.radius + " Meter"
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nama Contact Person</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.nama_cp
                      ? this.detail_vendor.nama_cp
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">No Telepone Contact Person</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.telp_cp
                      ? this.detail_vendor.telp_cp
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">No Hp Contact Person</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.hp_cp ? this.detail_vendor.hp_cp : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Alamat Vendor</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_vendor.alamat_vendor
                      ? this.detail_vendor.alamat_vendor
                      : "-"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-7">
          <h1 class="text-xl font-bold mb-2 uppercase">Data Pemilik</h1>
        </div>
        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
            <div class="flex w-full items-center">
              <label class="w-[40%]">Nama Pemilik</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_vendor.nama_pemilik
                    ? this.detail_vendor.nama_pemilik
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">NIK Pemilik</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_vendor.nik_pemilik
                    ? this.detail_vendor.nik_pemilik
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">No NPWP Pemilik</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_vendor.no_npwp_pemilik
                    ? this.detail_vendor.no_npwp_pemilik
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Negara Pemilik</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_vendor.negara_id_pemilik
                    ? this.detail_vendor.negara_id_pemilik.nama_negara
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Provinsi Pemilik</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_vendor.provinsi_id_pemilik
                    ? this.detail_vendor.provinsi_id_pemilik.nama_provinsi
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kota Pemilik</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_vendor.kota_id_pemilik
                    ? this.detail_vendor.kota_id_pemilik.nama_kota
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kecamatan Pemilik</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_vendor.kecamatan_id_pemilik
                    ? this.detail_vendor.kecamatan_id_pemilik.nama_kecamatan
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kelurahan Pemilik</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_vendor.kelurahan_id_pemilik
                    ? this.detail_vendor.kelurahan_id_pemilik.nama_kelurahan
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Alamat Pemilik</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_vendor.alamat_pemilik
                    ? this.detail_vendor.alamat_pemilik
                    : "-"
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_vendor: {
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
        kode_pos_id: "",
        no_telp: "",
        no_hp: "",
        no_npwp: "",
        email: "",
        nama_cp: "",
        telp_cp: "",
        hp_cp: "",
        nomor_siup: "",
        group: "",
        user_id_pic: "",
        tipe_vendor_id: "",
        longitude: "",
        latitude: "",
        radius: "",
        nama_pemilik: "",
        nik_pemilik: "",
        no_npwp_pemilik: "",
        negara_id_pemilik: "",
        provinsi_id_pemilik: "",
        kota_id_pemilik: "",
        kelurahan_id_pemilik: "",
        kecamatan_id_pemilik: "",
        alamat_pemilik: "",
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`master/vendor/${this.id}`);
      Object.keys(this.detail_vendor).forEach((item) => {
        this.detail_vendor[item] = res.data[item];
      });
      this.detail_vendor.vendor_id_induk = res.data.vendor_induk;
      this.detail_vendor.tipe_badan_hukum_id = res.data.tipebadanhukum;
      this.detail_vendor.kelurahan_id = res.data.kelurahan;
      this.detail_vendor.kecamatan_id = res.data.kecamatan;
      this.detail_vendor.kota_id = res.data.kota;
      this.detail_vendor.provinsi_id = res.data.provinsi;
      this.detail_vendor.negara_id = res.data.negara;
      this.detail_vendor.kode_pos_id = res.data.kode_pos;
      this.detail_vendor.user_id_pic = res.data.user_pic;
      this.detail_vendor.tipe_vendor_id = res.data.tipe_vendor;
      this.detail_vendor.negara_id_pemilik = res.data.negara_pemilik;
      this.detail_vendor.provinsi_id_pemilik = res.data.provinsi_pemilik;
      this.detail_vendor.kota_id_pemilik = res.data.kota_pemilik;
      this.detail_vendor.kelurahan_id_pemilik = res.data.kelurahan_pemilik;
      this.detail_vendor.kecamatan_id_pemilik = res.data.kecamatan_pemilik;
      this.isLoadingPage = false;
      console.log("detail", this.detail_vendor);
    } catch (error) {
      this.$router.back();
    }
  },
};
</script>
