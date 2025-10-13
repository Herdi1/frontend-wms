<template>
  <div
    class="relative p-4 w-full bg-white dark:bg-slate-800 rounded-md border border-gray-300 mb-10"
  >
    <div
      v-if="isLoadingPreview"
      class="absolute inset-0 flex flex-col justify-center items-center bg-white/70 z-10"
      :class="`h-[${height}px]`"
    >
      <div
        class="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mb-3"
      ></div>
      <span class="text-gray-600 text-sm">Memuat dokumen...</span>
    </div>

    <iframe
      v-show="!isLoadingPreview && src"
      :src="src"
      type="application/pdf"
      class="w-full rounded-md shadow"
      :class="`h-[${height}px]`"
      @load="handleLoad"
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    height: {
      type: [String, Number],
      default: 500,
    },
  },

  data() {
    return {
      isLoadingPreview: true,
    };
  },

  methods: {
    handleLoad() {
      this.isLoadingPreview = false;
    },
  },

  watch: {
    src: {
      handler(newVal) {
        if (newVal) this.isLoadingPreview = true;
      },
    },
  },
};
</script>

<style scoped>
iframe {
  transition: opacity 0.3s ease;
}
</style>
