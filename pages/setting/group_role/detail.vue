<template>
  <portal v-if="visible" to="modal-detail">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 w-[700px] dark:bg-slate-700 dark:text-gray-100 h-[700px] overflow-x-auto"
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

            <div class="table table-responsive w-full mt-5">
              <table class="table-fixed">
                <tr>
                  <td class="font-semibold w-[33%]">Hak Akses</td>
                  <td class="font-semibold w-[33%] text-center">Aplikasi</td>
                  <td class="font-semibold w-[33%]">Operator</td>
                </tr>
                <tr
                  v-for="item in parameters.form.menu_grants"
                  :key="item.menu_grant_id"
                >
                  <td>{{ item.menu ? item.menu.judul : "-" }}</td>
                  <td class="text-center">
                    {{
                      item.menu
                        ? item.menu.status === "0"
                          ? "Website"
                          : "Mobile"
                        : "-"
                    }}
                  </td>
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
                </tr>

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
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
