<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close-button" @click="closeModal">✕</button>
      </div>

      <div class="modal-body">
        <div v-if="pdfSupported">
          <iframe
            v-if="pdfUrl"
            :src="computedUrl"
            frameborder="0"
            width="100%"
            height="100%"
          ></iframe>
          <p v-else class="text-center">
            Tidak ada file PDF untuk ditampilkan.
          </p>
        </div>

        <div v-else class="unsupported">
          <p>Browser kamu tidak mendukung tampilan PDF langsung.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PdfViewerModal",
  props: {
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    computedUrl() {
      return encodeURI(this.pdfUrl);
    },
    pdfSupported() {
      const pdfMime = "application/pdf";
      return navigator.mimeTypes && navigator.mimeTypes[pdfMime];
    },
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background: #fff;
  width: 90%;
  max-width: 1000px;
  height: 80vh;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
}
.modal-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #f8f9fa;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #ddd;
  width: 100%;
}
.modal-body {
  flex: 1;
  background: #f9fafb;
}
.modal-body iframe {
  width: 100%;
  height: 80vh;
}
.close-btn {
  background: transparent;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
}
.unsupported {
  text-align: center;
  padding: 2rem;
}
</style>
