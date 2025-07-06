<template>
  <div class="w-full flex gap-3 p-2">
    <div class="grid grid-flow-rows grid-rows-5">
      <select-component
        v-for="(item, index) in self.selectList"
        :key="index"
        :label="item.label"
        :options="item.options"
        v-model="item.model"
        :labelKey="item.labelKey"
        :valueKey="item.valueKey"
        :pagination="item.pagination"
        @paginate="(e) => self.handlePaginate(index, e)"
      />
    </div>
    <button class="p-1 bg-blue-500 hover:bg-blue-400 rounded sm text-white">
      Filter
    </button>
  </div>
</template>

<script>
export default {
  props: {
    self: Object,
  },
};
</script>
