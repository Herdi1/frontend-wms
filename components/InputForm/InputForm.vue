<template>
<<<<<<< HEAD
  <div class="">
    <label :for="name">{{ label }}</label>
=======
  <div class="my-2">
    <label :for="name"
      >{{ label }}<span v-if="required" class="text-danger">*</span></label
    >
>>>>>>> 1329bf60dc1b859da07072a71e837fd16547c6c6
    <input
      :placeholder="label"
      :type="type"
      :value="value"
      :name="name"
      :required="required"
      :class="inputClass"
      class="w-full pl-2 py-1 border border-gray-300 rounded focus:outline-none"
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
