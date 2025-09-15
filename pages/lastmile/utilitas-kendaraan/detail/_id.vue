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
        <div class="w-full">
          <div
            class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
          >
            <div
              class="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-top w-full mb-5"
            >
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Kendaraan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_utilitas.kendaraan
                      ? this.detail_utilitas.kendaraan.nama_kendaraan
                      : "Lokasi tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Jenis Kendaraan</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_utilitas.jenis_kendaraan
                      ? this.detail_utilitas.jenis_kendaraan
                          .nama_jenis_kendaraan
                      : "Lokasi tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Tanggal</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_utilitas.tanggal }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Gudang</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{
                    this.detail_utilitas.gudang
                      ? this.detail_utilitas.gudang.nama_gudang
                      : "Lokasi tidak ditemukan"
                  }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Pengiriman Pertama</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_utilitas.jam_pengiriman_awal }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Pengiriman Akhir</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_utilitas.jam_pengiriman_akhir || "-" }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Standar Waktu Kerja</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_utilitas.standar_waktu_kerja }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Jumlah Ritase</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_utilitas.jumlah_ritase }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold"
                  >Total Standar Waktu Kerja</label
                >
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_utilitas.total_standar_waktu }}
                </div>
              </div>
              <div class="flex w-full items-center">
                <label class="w-[40%] font-bold">Total Realisasi</label>
                <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                  {{ this.detail_utilitas.total_realisasi }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="mt-4 bg-white dark:bg-slate-800 rounded-md px-4 py-2 shadow-sm border border-gray-300"
          >
            <div class="table-responsive overflow-y-hidden mb-7">
              <div
                class="mb-3 mt-5 text-xl font-bold uppercase flex justify-between items-start w-full"
              >
                <h1>Riwayat Rute Shipment</h1>
                <div></div>
              </div>
              <table
                class="table border-collapse border border-gray-300 my-5 h-full overflow-auto table-fixed"
              >
                <thead>
                  <tr class="text-sm uppercase">
                    <th class="w-60 border border-gray-300">Kode Shipment</th>
                    <th class="w-60 border border-gray-300">Lokasi Asal</th>
                    <th class="w-60 border border-gray-300">Lokasi Tujuan</th>
                    <th class="w-60 border border-gray-300">
                      Tanggal Berangkat
                    </th>
                    <th class="w-40 border border-gray-300">Jarak</th>
                    <th class="w-40 border border-gray-300">
                      Waktu Sampai Tujuan
                    </th>
                    <th class="w-40 border border-gray-300">Jenis Routing</th>
                    <th class="w-40 border border-gray-300">File</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in detail_utilitas.rute_shipments"
                    :key="i"
                    class="border-t border-gray-400 align-top"
                  >
                    <td class="border border-gray-300">
                      {{ item.kode_shipment }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.lokasi_asal.nama_lokasi }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.lokasi_tujuan.nama_lokasi }}
                    </td>
                    <td class="border border-gray-300">
                      {{ item.tanggal_berangkat }}
                    </td>
                    <td class="border border-gray-300">{{ item.jarak }} KM</td>
                    <td class="border border-gray-300">
                      {{ item.waktu_sampai_tujuan }} Menit
                    </td>
                    <td class="border border-gray-300 text-center">
                      <span
                        v-if="item.jenis_routing.trim() == 'KOSONG'"
                        class="p-1 px-2 text-white rounded-md bg-orange-500"
                        >Kosong</span
                      >
                      <span
                        v-if="item.jenis_routing.trim() == 'MUAT'"
                        class="p-1 px-2 text-white rounded-md bg-green-500"
                        >Muat</span
                      >
                    </td>
                    <td class="border border-gray-300">
                      <button
                        v-if="item.file"
                        @click="onShowPicture(item)"
                        type="button"
                        class="flex p-2 my-1 max-w-full rounded-md bg-blue-500 text-white hover:bg-blue-400 items-center"
                      >
                        <i class="fa fa-file mx-2"></i>
                        <span class="font-bold text-ellipsis">File</span>
                      </button>
                      <p v-else>File Tidak Ditemukan</p>
                    </td>
                  </tr>
                </tbody>
              </table>
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
      detail_utilitas: {
        utilitas_kendaraan_id: "",
        gudang_id: "",
        tanggal: "",
        kendaraan_id: "",
        jenis_kendaraan_id: "",
        jam_pengiriman_awal: "",
        jam_pengiriman_akhir: "",
        standar_waktu_kerja: "",
        jumlah_ritase: "",
        total_standar_waktu: "",
        total_realisasi: "",
        gudang: {},
        kendaraan: {},
        jenis_kendaraan: {},
        rute_shipments: [],
      },
      form: {
        item_id: "",
      },
    };
  },

  async created() {
    try {
      let response = await this.$axios.get(
        "lastmile/utilitas-kendaraan/" + this.id
      );
      Object.keys(this.detail_utilitas).forEach((item) => {
        this.detail_utilitas[item] = response.data[item];
      });

      this.isLoadingPage = false;
    } catch (error) {
      console.log(error);
      this.$router.push("/lastmile/utilitas-kendaraan");
    }
  },
};
</script>
