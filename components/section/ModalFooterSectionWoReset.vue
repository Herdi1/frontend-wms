<template>
  <div class="flex gap-2 justify-end">
   
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
