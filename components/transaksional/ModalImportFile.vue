<template>
  <portal v-if="visible" to="modal-detail">
    <div @click="hide" class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="modal fade fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 overflow-y-auto dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-detail"
    >
      <div class="modal-dialog mb-5">
        <div class="modal-content">
          <div
            class="modal-header flex justify-between items-center text-xl font-bold mb-3"
          >
            <h3>{{ self.title }}</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hide()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body max-h-[600px] mb-5">
            <ValidationObserver
              v-slot="{ invalid, validate }"
              ref-="formValidate"
            >
              <form
                @submit.prevent="validate().then(() => onSubmit(invalid))"
                enctype="multipart/form-data"
              >
                <div class="flex gap-2 items-center">
                  <button
                    type="button"
                    @click="onExport"
                    class="bg-blue-500 shadow-md hover:shadow-none p-2 text-white rounded-md flex"
                  >
                    <i
                      class="fa fa-file-download text-white font-bold mr-2"
                    ></i>
                    <!-- <div>Download Template</div> -->
                  </button>
                  <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    name="import-asn"
                    id="import-asn"
                    @change="handleFileChange"
                  />
                </div>
                <modal-footer-section
                  class="mt-5"
                  :isLoadingForm="isLoadingForm"
                  @reset="formReset()"
                />
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  middleware: ["isNotAccessable"],
  props: ["self"],

  data() {
    return {
      isLoadingForm: false,
      visible: false,
      parameters: {
        url: "",
        template_url: "",
        file_name: "",
      },
      form: {
        file: "",
      },
    };
  },

  computed: {
    ...mapState("moduleApi", ["data", "error", "result"]),
  },

  methods: {
    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let formData = new FormData();

      if (this.form.file instanceof File) {
        formData.append("file", this.form.file);
      }

      await this.$axios({
        url: this.parameters.url,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          this.$toaster.success("Data Telah Diimport");
          this.hide();
          this.self.onLoad();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
        });
    },

    async onExport() {
      let url = this.parameters.template_url;
      const link = document.createElement("a");
      link.href = url;
      link.download = this.parameters.file_name || "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    formReset() {
      this.form.file = "";
    },

    handleFileChange(e) {
      let file = e.target.files[0];
      this.form.file = file;
    },

    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
