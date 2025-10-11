<template>
  <div class="pdf-viewer">
    <div v-if="pdfSupported">
      <iframe
        v-if="pdfUrl"
        :src="computedUrl"
        frameborder="0"
        width="100%"
        height="100%"
        style="border: none"
      ></iframe>
      <p v-else class="text-center">Tidak ada file PDF untuk ditampilkan.</p>
    </div>

    <div v-else class="unsupported">
      <p>Browser kamu tidak mendukung tampilan PDF langsung.</p>
      <!-- <a :href="pdfUrl" target="_blank" rel="noopener"
        >Klik di sini untuk mengunduh file</a
      > -->
    </div>
  </div>
</template>

<script>
export default {
  name: "PdfViewer",
  props: {
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    computedUrl() {
      // encode URL supaya aman untuk karakter spasi, dll.
      return encodeURI(this.pdfUrl);
    },
    pdfSupported() {
      // deteksi dukungan PDF native di browser
      const pdfMime = "application/pdf";
      return navigator.mimeTypes && navigator.mimeTypes[pdfMime];
    },
  },
};
</script>

<style scoped>
.pdf-viewer {
  width: 100%;
  height: 100vh;
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.unsupported {
  text-align: center;
  padding: 2rem;
}

.unsupported a {
  color: #007bff;
  text-decoration: underline;
}
</style>
