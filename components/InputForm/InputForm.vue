<template>
  <div class="my-2">
    <label :for="name">{{ label }}</label>
    <input
      :type="type"
      :value="value"
      :name="name"
      :class="inputClass"
      :placeholder="label"
      class="w-full pl-2 py-1 border rounded focus:outline-none"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur', $event)"
    />
  </div>
</template>

<script>
export default {
  props: {
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
    inputClass: {
      type: [String, Object, Array],
      default: "",
    },
  },
};
</script>
