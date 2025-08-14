<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
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
          <th class="w-60 border border-gray-300">Jenis Kendaraan</th>
          <th class="w-60 border border-gray-300">Biaya Muat /km</th>
          <th class="w-60 border border-gray-300">Biaya Kosong /km</th>
          <th class="w-60 border border-gray-300">Standar Muat</th>
          <th class="w-60 border border-gray-300">Minimal Muat</th>
          <th class="w-60 border border-gray-300">Maksimal Muat</th>
          <th class="w-60 border border-gray-300">Kecepatan Muat</th>
          <th class="w-60 border border-gray-300">Kecepatan Kosong</th>
          <th class="w-60 border border-gray-300">Standar Waktu Muat</th>
          <th class="w-60 border border-gray-300">Standar Waktu Bongkar</th>
          <th class="w-60 border border-gray-300">
            Standar Waktu Istirahat /km
          </th>
          <th class="w-60 border border-gray-300">Maksimal Panjang</th>
          <th class="w-60 border border-gray-300">Maksimal Lebar</th>
          <th class="w-60 border border-gray-300">Maksimal Tinggi</th>
          <th class="w-60 border border-gray-300">Satuan Dimensi</th>
          <th class="w-60 border border-gray-300">Satuan Volume</th>
          <th class="w-60 border border-gray-300">Maksimal Volume</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.detail_lastmile
            .kontrak_lastmile_berat_pelanggan_details"
          :key="i"
        >
          <td class="border border-gray-300">
            {{
              item.jenis_kontrak ? item.jenis_kontrak.nama_jenis_kontrak : "-"
            }}
          </td>
          <td class="border border-gray-300">
            {{ item.divisi ? item.divisi.nama_divisi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.jenis_biaya ? item.jenis_biaya.nama_jenis_biaya : "-" }}
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
            {{
              item.jenis_kendaraan
                ? item.jenis_kendaraan.nama_jenis_kendaraan
                : "-"
            }}
          </td>
          <td class="border border-gray-300">
            {{ item.biaya_perkm_muat ? item.biaya_perkm_muat : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.biaya_perkm_kosong ? item.biaya_perkm_kosong : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.standar_muat ? item.standar_muat : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.minimal_muat ? item.minimal_muat : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.maksimal_muat ? item.maksimal_muat : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.kecepatan_muat ? item.kecepatan_muat : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.kecepatan_kosong ? item.kecepatan_kosong : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.standar_waktu_muat ? item.standar_waktu_muat : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.standar_waktu_bongkar ? item.standar_waktu_bongkar : "-" }}
          </td>
          <td class="border border-gray-300">
            {{
              item.standar_waktu_istirahat_perkm
                ? item.standar_waktu_istirahat_perkm
                : "-"
            }}
          </td>
          <td class="border border-gray-300">
            {{ item.maksimal_panjang ? item.maksimal_panjang : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.maksimal_lebar ? item.maksimal_lebar : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.maksimal_tinggi ? item.maksimal_tinggi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.satuan_dimensi ? item.satuan_dimensi.nama_satuan : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.satuan_volume ? item.satuan_volume.nama_satuan : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.maksimal_volume ? item.maksimal_volume : "-" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["self"],
};
</script>
