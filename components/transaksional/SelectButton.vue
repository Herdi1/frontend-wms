<template>
  <div class="form-group flex items-center justify-between">
    <label for=""
      >{{ self.label }}
      <span v-if="required" class="text-danger">*</span></label
    >
    <v-select
      :label="self.optionLabel"
      :loading="self.isLoading"
      :options="self.lookup.data"
      :filterable="false"
      v-model="self.value"
      :class="width"
      @search="self.onGet"
      @input="self.input"
      :reduce="reduce"
      :disabled="disabled"
    >
      <template #selected-option="{ option }">
        <div class="w-[120px] whitespace-nowrap text-ellipsis overflow-hidden">
          {{ option?.[self.optionLabel] || "No data" }}
        </div>
      </template>
      <li
        slot-scope="{ search }"
        slot="list-footer"
        class="p-1 border-t flex justify-between"
        v-if="self.lookup.data.length || search"
      >
        <span
          v-if="self.lookup.current_page > 1"
          @click="self.onGet(search, false)"
          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
          >Sebelumnya</span
        >
        <span
          v-if="self.lookup.last_page > self.lookup.current_page"
          @click="self.onGet(search, true)"
          class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
          >Selanjutnya</span
        >
      </li>
      <template #list-footer="{ search }">
        <button
          v-if="search"
          type="button"
          @click="self.onGet(search, false)"
          class="bg-blue-500 p-1 w-full text-sm text-white"
        >
          <i class="fa fa-search"></i>
        </button>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  props: {
    self: Object,
    width: {
      type: String,
      // default: 'w-[60%]'
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
