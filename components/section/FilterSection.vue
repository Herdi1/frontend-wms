<template>
  <portal to="modal-filter">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 w-full max-w-md dark:bg-slate-700 dark:text-gray-100"
      id="modal-filter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalFilter"
      style="z-index: 9999"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="flex justify-between text-xl font-bold mb-3">
            <h5 style="margin-left: -10px">Filter</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hide"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <slot></slot>
            <hr />
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <button
                    class="btn btn-warning"
                    type="button"
                    @click="onReset()"
                  >
                    <i class="fas fa-redo-alt"></i> Reset
                  </button>
                  <button
                    class="btn btn-primary float-right"
                    @click="onFilter()"
                  >
                    <i class="fas fa-check-circle"></i> Apply
                  </button>
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
  props: {
    self: Object,
    title: String,
  },

  data() {
    return {
      visible: false,
    };
  },

  methods: {
    async onFilter() {
      this.self.onLoad();
      this.hide();
    },

    onReset() {
      this.self.parameters.params = {
        ...this.self.parameters.default_params,
      };
      this.self.onLoad();
      this.hide();
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
<style scoped>
/*
select.form-control:not([size]):not([multiple]) {
  height: calc(2.25rem + -5px);
}
*/
</style>
