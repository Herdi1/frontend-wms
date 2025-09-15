<template>
  <div class="w-full relative overflow-x-auto">
    <table class="mb-5 table-fixed border border-collapse border-gray-300">
      <thead>
        <tr class="uppercase">
          <th class="w-[200px] border border-gray-300">Kode Delivery Order</th>
          <th class="w-[200px] border border-gray-300">Item</th>
          <!-- <th class="w-[200px] border border-gray-300">Alamat Pengiriman</th> -->
          <th class="w-[200px] border border-gray-300">Lokasi</th>
          <th class="w-[200px] border border-gray-300">Urutan</th>
          <th class="w-[200px] border border-gray-300">Nomor Referensi</th>
          <th class="w-[200px] border border-gray-300">Zona Gudang</th>
          <th class="w-[200px] border border-gray-300">Quantity</th>
          <th class="w-[200px] border border-gray-300">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in this.self.detail_shipment.shipment_details"
          :key="i"
        >
          <td class="border border-gray-300">
            {{ item.kode_delivery_order }}
          </td>
          <td class="border border-gray-300">
            {{ item.item_gudang ? item.item_gudang.nama_item : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.lokasi ? item.lokasi.nama_lokasi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.urutan ? item.urutan : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.no_referensi ? item.no_referensi : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.zona_gudang ? item.zona_gudang.nama_zona_gudang : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.quantity ? item.quantity : "-" }}
          </td>
          <td class="border border-gray-300">
            {{ item.keterangan ? item.keterangan : "-" }}
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
