<template>
  <button
    class="btn btn-sm bg-blue-500 text-white"
    :disabled="disabled"
    :class="disabled ? 'bg-gray-300' : ''"
    @click="$emit('click')"
  >
    <i class="fas fa-pen"></i>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
