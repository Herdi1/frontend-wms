<template>
  <div class="mb-2 flex justify-between items-center">
    <label :for="name" :class="labelWidth"
      >{{ label }} <span v-if="required" class="text-danger">*</span></label
    >
    <input
      :placeholder="label"
      :type="type"
      :value="value"
      :name="name"
      :required="required"
      :disabled="disabled"
      :class="inputWidth"
      class="pl-2 py-1 border border-gray-300 rounded focus:outline-none"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur', $event)"
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
      default: false,
    },
    type: {
      type: String,
      required: true,
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
    inputWidth: {
      type: String,
      default: "w-1/2",
    },
    labelWidth: {
      type: String,
      default: "w-1/2",
    },
  },
};
</script>
