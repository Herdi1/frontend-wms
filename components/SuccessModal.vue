<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow max-w-md w-full p-5 text-center relative"
      >
        <button
          @click="close"
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414
              1.414L11.414 10l4.293 4.293a1 1 0 01-1.414
              1.414L10 11.414l-4.293 4.293a1 1 0
              01-1.414-1.414L8.586 10 4.293 5.707a1 1 0
              010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div
          class="w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-6 h-6 text-green-600 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0
              01-1.414 0l-4-4a1 1 0 011.414-1.414L8
              12.586l7.293-7.293a1 1 0
              011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <p class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ message }}
        </p>

        <div>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SuccessModal",
  props: {
    message: {
      type: String,
      default: "Berhasil!",
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("closed");
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
