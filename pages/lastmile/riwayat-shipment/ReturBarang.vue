<template>
  <div class="w-full table-responsive">
    <div
      class="mb-3 mt-5 text-xl font-bold uppercase flex justify-between items-start w-full"
    >
      <h1>Retur</h1>
      <div class="flex justify-end gap-2">
        <button
          type="button"
          @click="self.showRetur"
          class="bg-[#2B7BF3] text-white px-2 py-2 rounded-md flex gap-2 items-center my-1"
        >
          <i class="fas fa-plus"></i>
          <p class="text-xs font-medium">Tambah Retur Data</p>
        </button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th class="w-20 border border-gray-300">Kode Retur</th>
          <th class="w-20 border border-gray-300">Delivery Order</th>
          <th class="w-20 border border-gray-300">Quantity Kirim</th>
          <th class="w-20 border border-gray-300">Quantity</th>
          <th class="w-20 border border-gray-300">Valuation</th>
          <th class="w-20 border border-gray-300">Alasan</th>
          <th class="w-20 border border-gray-300">Edit</th>
          <th class="w-20 border border-gray-300">Hapus</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(retur, index) in self.parameters.form.shipment_retur_details"
          :key="index"
        >
          <td class="w-20 border border-gray-300">
            {{ retur.kode_shipment_retur }}
          </td>
          <td class="w-20 border border-gray-300">
            {{ retur.kode_delivery_order }}
          </td>
          <td class="w-20 border border-gray-300">
            {{ retur.quantity_kirim }}
          </td>
          <td class="w-20 border border-gray-300">
            {{ retur.quantity_retur }}
          </td>
          <td class="w-20 border border-gray-300">
            {{ retur.valuation.nama_valuation }}
          </td>
          <td class="w-20 border border-gray-300">{{ retur.alasan }}</td>
          <td class="w-20 border border-gray-300 text-center text-gray-500">
            <button type="button" @click="self.editRetur(retur)">
              <i class="fa fa-pen"></i>
            </button>
          </td>
          <td class="w-20 border border-gray-300 text-center text-gray-500">
            <button type="button" @click="self.deleteRetur(retur)">
              <i class="fa fa-trash"></i>
            </button>
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
