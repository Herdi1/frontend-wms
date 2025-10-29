<template>
  <div :class="isFlex">
    <label :for="name" :class="isFlex ? 'w-1/2' : 'w-full'"
      >{{ label }}
      <span v-if="required && label" class="text-danger">*</span></label
    >
    <!-- <input
      placeholder="0.00"
      type="number"
      min="0"
      step="0.01"
      :value="value"
      :name="name"
      :required="required"
      :disabled="disabled"
      class="pl-2 py-1 border border-gray-300 rounded focus:outline-none"
      :class="isFlex ? 'w-1/2' : 'w-full'"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur', $event)"
    /> -->
    <input
      placeholder="0.00"
      type="number"
      min="0"
      step="0.01"
      :value="value"
      :name="name"
      :required="required"
      :disabled="disabled"
      class="pl-2 py-1 border border-gray-300 rounded focus:outline-none"
      :class="isFlex ? 'w-1/2' : 'w-full'"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur', $event)"
      @wheel.prevent
    />
  </div>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    isFlex: {
      type: [String, Object, Array],
      default: "",
    },
  },
};
</script>
