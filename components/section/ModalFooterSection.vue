<template>
  <div class="flex gap-2 justify-end">
    <button
      type="button"
      class="btn btn-danger"
      data-dismiss="modal"
      @click="$emit('reset')"
    >
      <span class="mr-2">
        <i class="fas fa-ban"></i>
      </span>
      <span>Reset</span>
    </button>
    <button type="submit" class="btn btn-success" :disabled="isLoadingForm">
      <span class="mr-2" v-if="isLoadingForm">
        <i class="fas fa-circle-notch fa-spin"></i>
      </span>
      <span v-else><i class="fas fa-save"></i> Save </span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    isLoadingForm: Boolean,
  },
};
</script>
