<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="w-[150px] border border-gray-300">Jenis Transaksi</th>
          <th class="w-[150px] border border-gray-300">Jenis Routing</th>
          <th class="w-[200px] border border-gray-300">Jenis Biaya</th>
          <th class="w-[200px] border border-gray-300">Vendor</th>
          <!-- <th class="w-[200px] border border-gray-300">Lokasi Asal</th> -->
          <th class="w-[200px] border border-gray-300">Lokasi Tujuan</th>
          <!-- <th class="w-[200px] border border-gray-300">Term Pembayaran</th> -->
          <th class="w-[200px] border border-gray-300">Quantity</th>
          <th class="w-[200px] border border-gray-300">Nominal Satuan</th>
          <!-- <th class="w-[200px] border border-gray-300">Payable To</th> -->
          <th class="w-[200px] border border-gray-300">Sub Total</th>
          <!-- <th class="w-[200px] border border-gray-300">COA</th> -->
          <!-- <th class="w-[200px] border border-gray-300">Divisi</th> -->
          <th class="w-[200px] border border-gray-300">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.detail_shipment.biaya_lastmiles"
          :key="i"
        >
          <td class="border border-gray-300 text-center">
            <span
              v-if="item.jenis == 0"
              class="p-1 text-white rounded-md bg-orange-500"
              >Penjualan</span
            >
            <span
              v-if="item.jenis == 1"
              class="p-1 text-white rounded-md bg-green-500"
              >Stok Transfer</span
            >
          </td>
          <td class="border border-gray-300 text-center">
            <span
              v-if="item.jenis_routing == 'KOSONG'"
              class="p-1 text-white rounded-md bg-orange-500"
              >Kosong</span
            >
            <span
              v-if="item.jenis_routing == 'MUAT'"
              class="p-1 text-white rounded-md bg-green-500"
              >Muat</span
            >
          </td>
          <td class="border border-gray-300">
            <div class="w-full">
              <p>{{ item.jenis_biaya.nama_jenis_biaya }}</p>
            </div>
          </td>
          <td class="border border-gray-300">
            <p>
              {{ item.vendor.nama_vendor }}
            </p>
          </td>
          <!-- <td class="border border-gray-300">
            <p>
              {{ item.lokasi_asal ? item.lokasi_id_asal.nama_lokasi : "" }}
            </p>
          </td> -->
          <td class="border border-gray-300">
            <p>{{ item.lokasi.nama_lokasi }}</p>
          </td>
          <td class="border border-gray-300">
            <money
              disabled
              v-model="item.jumlah"
              class="w-full pl-2 py-1 border rounded focus:outline-none"
            />
          </td>
          <td class="border border-gray-300">
            <money
              disabled
              :value="item.nominal_satuan"
              class="w-full pl-2 py-1 border rounded focus:outline-none"
            />
          </td>
          <td class="border border-gray-300">
            <money
              disabled
              :value="item.total"
              class="w-full pl-2 py-1 border rounded focus:outline-none"
            />
          </td>
          <td class="border border-gray-300">
            <p>{{ item.keterangan }}</p>
          </td>
        </tr>
        <tr v-if="self.detail_shipment.biaya_lastmiles.length > 0">
          <td colspan="7" class="border border-gray-300 text-right">
            Grand Total
          </td>
          <td class="border border-gray-300 text-right">
            <p>
              {{ calculateGrandTotal | formatPrice }}
            </p>
          </td>
          <td colspan="2" class="border border-gray-300 text-right"></td>
        </tr>
        <tr v-if="!this.self.detail_shipment.biaya_lastmiles.length > 0">
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
</template>

<script>
export default {
  props: ["self"],

  computed: {
    calculateGrandTotal() {
      let total = 0;
      this.self.detail_shipment.biaya_lastmiles.forEach((item) => {
        total += parseFloat(item.total);
      });
      return total;
    },
  },
};
</script>
