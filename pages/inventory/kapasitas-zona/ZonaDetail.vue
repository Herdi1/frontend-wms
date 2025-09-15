<template>
  <div
    :class="`w-full  p-3 dark:bg-slate-700 dark:border-none`"
    v-if="visible && !isLoading"
  >
    <!-- :style="{ top: room.y + 'px', left: room.x + 'px' }" -->
    <div class="w-full">
      <div class="flex justify-between items-center gap-3">
        <p>Nama Zona</p>
        <p class="font-bold">{{ room.zona_gudang.nama_zona_gudang }}</p>
      </div>
      <div class="flex justify-between items-center gap-3">
        <p>Kode Zona</p>
        <p class="font-bold">{{ room.zona_gudang.kode_zona_gudang }}</p>
      </div>
      <div class="flex justify-between items-center gap-3">
        <p>Kapasitas</p>
        <p class="font-bold">{{ room.zona_gudang.kapasitas | formatPrice }}</p>
      </div>
      <div class="flex justify-between items-center gap-3">
        <p>Kapasitas Terisi</p>
        <p
          class="font-bold"
          :class="
            parseFloat(room.total_quantity) >
            parseFloat(room.zona_gudang.kapasitas)
              ? `text-danger`
              : ''
          "
        >
          {{ room.total_quantity | formatPrice }}
        </p>
      </div>
      <!-- <div class="flex justify-between items-center gap-3">
        <p>Gudang</p>
        <p class="font-bold">{{ room.gudang.nama_gudang }}</p>
      </div> -->
    </div>
    <div class="w-full table-responsive">
      <table>
        <thead>
          <tr>
            <th class="w-20 border border-gray-300">Item</th>
            <th class="w-20 border border-gray-300">Quantity</th>
            <th class="w-20 border border-gray-300">Harga</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stok, index) in room.stok_gudang_alls" :key="index">
            <td class="border border-gray-300">
              {{ stok.item_gudang.nama_item }} -
              {{ stok.item_gudang.kode_item }}
            </td>
            <td class="border border-gray-300">
              {{ stok.quantity }}
              {{ stok.valuation ? stok.valuation.nama_valuation : "" }}
            </td>
            <td class="border border-gray-300">
              {{ stok.harga }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="flex justify-between items-center gap-3">
      <p>Quantity</p>
      <p class="font-bold">
        {{ room.stok_gudang_alls.quantity }}
        <span>{{ room.stok_gudang_alls.valuation.kode_valuation }}</span>
      </p>
    </div>
    <div class="flex justify-between items-center gap-3">
      <p>Harga</p>
      <p class="font-bold">{{ room.stok_gudang_alls.harga }}</p>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["self"],

  data() {
    return {
      layout_id: "",
      visible: false,
      isLoading: true,
      room: {},
    };
  },

  methods: {
    async getKapasitasZona() {
      try {
        let res = await this.$axios.get(
          "inventory/kapasitas-zona/" + this.layout_id
        );
        this.room = res.data;
        console.log(this.room);
      } catch (err) {
        this.$globalErrorToaster(this.$toaster, err);
      } finally {
        this.isLoading = false;
      }
    },

    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
