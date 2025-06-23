<template>
  <div class="flex justify-between text-xl font-bold mb-3">
    <h5 class="modal-title">{{ self.isEditable ? "Edit" : "Add" }} Data</h5>

    <button
      type="button"
      class="close"
      data-dismiss="modal"
      aria-label="Close"
      @click="$emit('close')"
    >
      <span aria-hidden="true">&times;</span>
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
