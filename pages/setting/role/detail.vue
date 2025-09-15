<template>
  <portal v-if="visible" to="modal-detail">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 w-full max-w-md dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-detail"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="flex justify-between text-xl font-bold mb-3">
            <h5 class="">Detail Data</h5>

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

          <div class="modal-body">
            <div class="grid grid-cols-2 mb-3">
              <div class="col">
                <div class="form-group">
                  <label class="font-bold" for="name">Nama</label>
                  <div>{{ parameters.form.rute }}</div>
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label class="font-bold" for="title">Judul</label>
                  <div>{{ parameters.form.judul }}</div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 mb-3">
              <div class="col">
                <label class="font-bold" for="icon">Icon</label>
                <div>
                  <i :class="'fas fa-' + parameters.form.icon + ' fa-2x'"></i>
                </div>
              </div>

              <div class="form-group">
                <label class="font-bold" for="">Module</label>
                <div>
                  <span
                    v-if="parameters.form.menu_id_induk"
                    class="bg-red-500 py-1 px-2 rounded-md text-white"
                  >
                    Tidak
                  </span>
                  <span v-else class="bg-blue-red-500 p-1 rounded-sm">
                    Ya
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    return {
      parameters: {
        form: {},
      },
      visible: false,
    };
  },

  methods: {
    show() {
      this.visible = true;
      console.log(this.parameters.form);
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
