<template>
  <section>
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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
              <div class="flex w-full items-center">
                <label class="w-[40%]">Pelanggan Induk</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.pelanggan
                      ? this.detail_item.pelanggan.nama_pelanggan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Tipe Badan Hukum</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.tipebadanhukum
                      ? this.detail_item.tipebadanhukum.nama_tipe_badan_hukum
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">User Sales</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.user_sales
                      ? this.detail_item.user_sales.nama_lengkap
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kode Referensi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kode_referensi
                      ? this.detail_item.kode_referensi
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kode Pelanggan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kode_pelanggan
                      ? this.detail_item.kode_pelanggan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">No NPWP</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.no_npwp ? this.detail_item.no_npwp : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nama Pelanggan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.nama_pelanggan
                      ? this.detail_item.nama_pelanggan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Alias / Singkatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.alias ? this.detail_item.alias : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Email</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.email ? this.detail_item.email : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor Telepon</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.no_telp ? this.detail_item.no_telp : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor HP</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.no_hp ? this.detail_item.no_hp : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Negara</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.negara
                      ? this.detail_item.negara.nama_negara
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Provinsi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.provinsi
                      ? this.detail_item.provinsi.nama_provinsi
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kota</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kota
                      ? this.detail_item.kota.nama_kota
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kecamatan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kecamatan
                      ? this.detail_item.kecamatan.nama_kecamatan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kelurahan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kelurahan
                      ? this.detail_item.kelurahan.nama_kelurahan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Kode Pos</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.kode_pos
                      ? this.detail_item.kode_pos.nama_kode_pos
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Longitude</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.longitude
                      ? this.detail_item.longitude
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Latitude</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.latitude ? this.detail_item.latitude : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Radius</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.radius ? this.detail_item.radius : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nomor SIUP</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.nomor_siup
                      ? this.detail_item.nomor_siup
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Rentang Retur Penjualan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.rentang_retur_penjualan
                      ? this.detail_item.rentang_retur_penjualan
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nilai Plafon</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.nilai_plafon
                      ? this.detail_item.nilai_plafon
                      : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Nama Contact Person</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.nama_cp ? this.detail_item.nama_cp : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">No Telp Contact Person</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.telp_cp ? this.detail_item.telp_cp : "-"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">No HP Contact Person</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_item.hp_cp ? this.detail_item.hp_cp : "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%]">Alamat</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_item.alamat_pelanggan
                      ? this.detail_item.alamat_pelanggan
                      : "-"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h1 class="text-xl font-bold mb-2 uppercase">Detail Pemilik</h1>
      </div>
      <div
        class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
          <div class="flex w-full items-center">
            <label class="w-[40%]">Nama Pemilik</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{
                this.detail_item.nama_pemilik
                  ? this.detail_item.nama_pemilik
                  : "-"
              }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%]">NIK Pemilik</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{
                this.detail_item.nik_pemilik
                  ? this.detail_item.nik_pemilik
                  : "-"
              }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%]">No NPWP Pemilik</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{
                this.detail_item.no_npwp_pemilik
                  ? this.detail_item.no_npwp_pemilik
                  : "-"
              }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%]">Negara Pemilik</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{
                this.detail_item.negara_pemilik
                  ? this.detail_item.negara_pemilik.nama_negara
                  : "-"
              }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%]">Provinsi Pemilik</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{
                this.detail_item.provinsi_pemilik
                  ? this.detail_item.provinsi_pemilik.nama_provinsi
                  : "-"
              }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%]">Kota Pemilik</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{
                this.detail_item.kota_pemilik
                  ? this.detail_item.kota_pemilik.nama_kota
                  : "-"
              }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%]">Kecamatan Pemilik</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{
                this.detail_item.kecamatan_pemilik
                  ? this.detail_item.kecamatan_pemilik.nama_kecamatan
                  : "-"
              }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%]">Kelurahan Pemilik</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{
                this.detail_item.kelurahan_pemilik
                  ? this.detail_item.kelurahan_pemilik.nama_kelurahan
                  : "-"
              }}
            </div>
          </div>
          <div class="flex w-full items-center">
            <label class="w-[40%]">Alamat Pemilik</label>
            <div class="border border-gray-300 rounded-md p-1 w-[60%]">
              {{
                this.detail_item.alamat_pemilik
                  ? this.detail_item.alamat_pemilik
                  : "-"
              }}
            </div>
          </div>
        </div>
      </div>

      <TabComponent :tabs="tabs">
        <template #ItemPelanggan>
          <ItemPelanggan :self="{ detail_item }" />
        </template>
        <template #Shipto>
          <p>shipto</p>
        </template>
      </TabComponent>
    </div>
  </section>
</template>

<script>
import TabComponent from "../tabComponent.vue";
import ItemPelanggan from "./itemPelanggan.vue";
export default {
  props: ["self"],

  components: {
    TabComponent,
    ItemPelanggan,
  },

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      tabs: [
        { name: "Item Pelanggan", slotName: "ItemPelanggan" },
        { name: "Shipto", slotName: "Shipto" },
      ],

      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingData: false,
      detail_item: {
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
        kode_pos_id: "",
        no_telp: "",
        no_hp: "",
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
        nama_pemilik: "",
        alamat_pemilik: "",
        nik_pemilik: "",
        no_npwp_pemilik: "",
        negara_id_pemilik: "",
        provinsi_id_pemilik: "",
        kota_id_pemilik: "",
        kecamatan_id_pemilik: "",
        kelurahan_id_pemilik: "",
        item_pelanggans: [],
        lokasi_pelanggans: [],
        pelanggan_id_induk: {},
        tipe_badan_hukum_id: {},
        user_id_sales: {},
        kelurahan_id: {},
        kecamatan_id: {},
        kota_id: {},
        provinsi_id: {},
        negara_id: {},
        kode_pos_id: {},
        lokasi_id: {},
        negara_id_pemilik: {},
        provinsi_id_pemilik: {},
        kota_id_pemilik: {},
        kecamatan_id_pemilik: {},
        kelurahan_id_pemilik: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(`master/pelanggan/${this.id}`);
      this.detail_item = res.data;
      this.detail_item.item_pelanggans = res.data.item_pelanggans;
      this.isLoadingPage = false;
      // console.log(this.detail_item.item_pelanggans);
    } catch (error) {
      console.log("error", error);
    }
  },
};
</script>
