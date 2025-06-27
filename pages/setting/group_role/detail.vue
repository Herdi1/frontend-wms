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
            <h5 class="modal-title">Detail Data</h5>

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
            <div class="form-group">
              <label for="name">Nama</label>
              <div>{{ parameters.form.nama_role }}</div>
            </div>

            <div class="table table-responsive w-full">
              <table class="table">
                <tr>
                  <td>Hak Akses</td>
                  <td>Operator</td>
                </tr>
                <tr
                  v-for="item in parameters.form.menu_grants"
                  :key="item.menu_grant_id"
                >
                  <td>{{ item.menu ? item.menu.judul : "-" }}</td>
                  <td class="flex gap-2">
                    <span
                      v-for="(operator, index) in item.operators"
                      :key="index"
                      class="flex flex-col items-center my-2"
                    >
                      <p
                        class="bg-green-400 px-2 py-1 rounded-full text-white text-center"
                      >
                        {{ operator }}
                      </p>
                    </span>
                  </td>
                  <!-- <td>
                    <span
                      class="badge badge-success ml-1 mr-1 mb-2"
                      v-for="itemOperator in item.operators"
                      :key="itemOperator"
                    >
                      {{ itemOperator }}
                    </span>
                  </td> -->
                </tr>
                <!-- <tr
                  v-for="(menu, index) in parameters.form.menu_grants"
                  :key="index"
                >
                  <td class="bg-red-200 w-full">
                    <span
                      v-for="(operator, index) in menu.operators"
                      :key="index"
                      class="flex gap-2"
                    >
                      <p
                        class="bg-green-500 px-2 py-1 rounded-full text-white text-center"
                      >
                        {{ operator }}
                      </p>
                    </span>
                  </td>
                </tr> -->
                <tr v-if="!parameters.form.menu_grants.length">
                  <td colspan="2" class="text-center">Data tidak ditemukan</td>
                </tr>
              </table>
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
      visible: false,
      parameters: {
        form: {
          nama_role: "",
          menu_grants: [],
        },
      },
    };
  },
  methods: {
    show() {
      this.visible = true;
      console.log(this.parameters.form.menu_grants);
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
