<template>
  <button
    class="btn btn-sm btn-danger border-none"
    :disabled="disabled"
    :class="disabled ? 'bg-gray-300' : ''"
    @click="$emit('click')"
  >
    <i class="fas fa-trash"></i>
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
