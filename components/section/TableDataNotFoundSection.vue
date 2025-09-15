<template>
  <tr v-if="isShowNotFound">
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
</template>

<script>
export default {
  props: {
    self: Object,
  },
  computed: {
    isShowNotFound() {
      return this.self.data.length == 0 && !this.self.isLoadingData;
    },
  },
};
</script>
