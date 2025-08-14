<template>
  <section class="section">
    <div class="section-body mb-10" v-if="!isLoadingPage">
      <div class="mt- justify-between items-center flex">
        <h1 class="text-xl font-bold uppercase">Detail Kontrak TKBM</h1>

        <button class="btn btn-primary my-2" @click="$router.back()">
          <i class="fas fa-arrow-left mr-2"></i>
          Kembali
        </button>
      </div>
      <div class="w-full">
        <div
          class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4 w-full">
            <div class="flex w-full items-center">
              <label class="w-[40%]">Kode Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_tkbm.kode_kontrak
                    ? this.detail_tkbm.kode_kontrak
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Pelanggan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_tkbm.pelanggan
                    ? this.detail_tkbm.pelanggan.nama_pelanggan
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Jenis Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_tkbm.jenis_kontrak
                    ? this.detail_tkbm.jenis_kontrak.nama_jenis_kontrak
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Status Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_tkbm.status_kontrak
                    ? this.detail_tkbm.status_kontrak
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal Kontrak</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_tkbm.tanggal_kontrak
                    ? this.detail_tkbm.tanggal_kontrak
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal Berlaku</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_tkbm.tanggal_berlaku
                    ? this.detail_tkbm.tanggal_berlaku
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Tanggal Berhenti</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_tkbm.tanggal_berhenti
                    ? this.detail_tkbm.tanggal_berhenti
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">No Referensi</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_tkbm.no_referensi
                    ? this.detail_tkbm.no_referensi
                    : "-"
                }}
              </div>
            </div>
            <div class="flex w-full items-center">
              <label class="w-[40%]">Keterangan</label>
              <div class="border border-gray-300 rounded-md p-1 w-[60%]">
                {{
                  this.detail_tkbm.keterangan
                    ? this.detail_tkbm.keterangan
                    : "-"
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h1 class="text-xl font-bold mb-2 uppercase">Detail TKBM</h1>
      </div>
      <div
        class="mb-3 p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300"
      >
        <div class="w-full relative overflow-x-auto">
          <table
            class="mb-5 table-fixed border border-collapse border-gray-300"
          >
            <thead>
              <tr class="uppercase">
                <th class="w-60 border border-gray-300">Jenis Kontrak</th>
                <th class="w-60 border border-gray-300">Divisi</th>
                <th class="w-60 border border-gray-300">Jenis Biaya</th>
                <th class="w-60 border border-gray-300">Gudang</th>
                <th class="w-60 border border-gray-300">Mata Uang</th>
                <th class="w-60 border border-gray-300">Pembayaran</th>
                <th class="w-60 border border-gray-300">Term Pembayaran</th>
                <th class="w-60 border border-gray-300">Payable To</th>
                <th class="w-60 border border-gray-300">Group Item</th>
                <th class="w-60 border border-gray-300">Nama Item</th>
                <th class="w-60 border border-gray-300">Dasar Perhitungan</th>
                <th class="w-60 border border-gray-300">Satuan</th>
                <th class="w-60 border border-gray-300">Nilai Kontrak</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in detail_tkbm.kontrak_tkbm_pelanggan_details"
                :key="i"
                class="border-b border-gray-300"
              >
                <td class="border border-gray-300">
                  {{
                    item.jenis_kontrak
                      ? item.jenis_kontrak.nama_jenis_kontrak
                      : "-"
                  }}
                </td>
                <td class="border border-gray-300">
                  {{ item.divisi ? item.divisi.nama_divisi : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{
                    item.jenis_biaya ? item.jenis_biaya.nama_jenis_biaya : "-"
                  }}
                </td>
                <td class="border border-gray-300">
                  {{ item.gudang ? item.gudang.nama_gudang : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.mata_uang ? item.mata_uang.nama_mata_uang : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.pembayaran ? item.pembayaran.nama_pembayaran : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{
                    item.term_pembayaran
                      ? item.term_pembayaran.nama_term_pembayaran
                      : "-"
                  }}
                </td>
                <td class="border border-gray-300">
                  {{ item.payable_to ? item.payable_to : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.group_item ? item.group_item.nama_group_item : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.dasar_perhitungan ? item.dasar_perhitungan : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.satuan ? item.satuan.nama_satuan : "-" }}
                </td>
                <td class="border border-gray-300">
                  {{ item.nilai_kontrak ? item.nilai_kontrak : "-" }}
                </td>
              </tr>
            </tbody>
          </table>
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
      detail_tkbm: {
        kode_kontrak: "",
        no_referensi: "",
        pelanggan_id: "",
        tanggal_kontrak: "",
        tanggal_berlaku: "",
        tanggal_berhenti: "",
        status_kontrak: "",
        jenis_kontrak_id: "",
        keterangan: "",
        kontrak_tkbm_pelanggan_details: [],
        pelanggan: {},
        jenis_kontrak: {},
      },
    };
  },

  async created() {
    try {
      let res = await this.$axios.get(
        `finance/kontrak-tkbm-pelanggan/${this.id}`
      );
      Object.keys(this.detail_tkbm).forEach((item) => {
        if (item != "kontrak_tkbm_pelanggan_details") {
          this.detail_tkbm[item] = res.data[item];
        }
      });
      this.detail_tkbm.kontrak_tkbm_pelanggan_details =
        res.data.kontrak_tkbm_pelanggan_details;
      this.isLoadingPage = false;
      console.log(this.detail_tkbm);
    } catch (error) {
      this.$router.back();
    }
  },
};
</script>
