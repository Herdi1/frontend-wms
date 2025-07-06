<template>
  <div class="flex items-center w-full">
    <label for="" class="w-[40%]">{{ label }}</label>
    <v-select
      :label="labelKey"
      :options="options"
      :reduce="(item) => item[valueKey]"
      v-model="value"
      @input="$emit('input', $event)"
      :filterable="false"
      ,
      class="w-[60%]"
    >
      <li
        slot-scope="{ search }"
        slot="list-footer"
        class="p-1 border-t flex justify-between"
        v-if="pagination && (options.length || search)"
      >
        <span
          v-if="pagination.current_page > 1"
          @click="$emit('paginate', { next: false, search })"
          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
          >Sebelumnya</span
        >
        <span
          v-if="pagination.last_page > pagination.current_page"
          @click="$emit('paginate', { next: true, search })"
          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
          >Selanjutnya</span
        >
      </li>
    </v-select>
  </div>
</template>

<script>
export default {
  name: "Select Component",
  props: {
    label: String,
    options: {
      type: Array,
      default: () => [],
    },
    value: [String, Number],
    labelKey: { type: String, default: "label" },
    valueKey: { type: String, default: "value" },
    pagination: {
      type: Object,
      default: null,
    },
  },
};
</script>
