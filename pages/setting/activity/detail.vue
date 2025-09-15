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
            <div class="mb-2">
              <div class="form-group">
                <label for="username" class="font-bold mb-2">Username</label>
                <div class="ml-3">
                  {{
                    parameters.form.causer
                      ? parameters.form.causer.username
                      : "-"
                  }}
                </div>
              </div>
            </div>

            <div class="mb-2">
              <div class="form-group">
                <label for="username" class="font-bold mb-2">Username</label>
                <div class="ml-3">
                  {{ parameters.form.description }}
                </div>
              </div>
            </div>

            <div class="mb-2">
              <div class="form-group">
                <label for="username" class="font-bold mb-2">Username</label>
                <div class="ml-3">
                  {{ onHumanReadAble(parameters.form.created_at) }}
                </div>
              </div>
            </div>

            <div class="mb-2">
              <div class="form-group">
                <label for="username" class="font-bold mb-2">Username</label>
                <div class="ml-3">
                  <div class="flex">
                    <span class="w-[90px]">Table</span>
                    <span>{{
                      parameters.form.properties
                        ? parameters.form.properties.table || "-"
                        : "-"
                    }}</span>
                  </div>
                  <div class="flex">
                    <span class="w-[90px]">Name</span>
                    <span>{{
                      parameters.form.properties
                        ? parameters.form.properties.name || "-"
                        : "-"
                    }}</span>
                  </div>
                  <div class="flex">
                    <span class="w-[90px]">Id</span>
                    <span>{{
                      parameters.form.properties
                        ? parameters.form.properties.id || "-"
                        : "-"
                    }}</span>
                  </div>
                  <div class="flex">
                    <span class="w-[90px]">IP Address</span>
                    <span>{{
                      parameters.form.ip_address
                        ? parameters.form.ip_address || "-"
                        : "-"
                    }}</span>
                  </div>
                  <div class="flex">
                    <span class="w-[90px]">User Agent</span>
                    <span>{{
                      parameters.form.user_agent
                        ? parameters.form.user_agent || "-"
                        : "-"
                    }}</span>
                  </div>
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
      visible: false,

      parameters: {
        form: {},
      },
    };
  },

  methods: {
    onHumanReadAble(date) {
      return moment(date).locale("id").format("LLLL");
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
