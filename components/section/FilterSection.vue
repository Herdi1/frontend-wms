<template>
  <div
    v-show="visible"
    class="absolute right-2 bg-white border border-gray-200 rounded shadow-lg z-50 p-3 dark:bg-slate-700 dark:border-none"
  >
    <div class="modal-dialog" role="document">
      <div class="p-2">
        <div class="flex justify-between text-xl font-bold mb-3">
          <h5>Filter</h5>
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
              <div class="flex gap-2 justify-end">
                <button
                  class="btn btn-warning"
                  type="button"
                  @click="onReset()"
                >
                  <i class="fas fa-redo-alt"></i> Reset
                </button>
                <button class="btn btn-primary float-right" @click="onFilter()">
                  <i class="fas fa-check-circle"></i> Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  props: {
    self: Object,
    title: String,
    visible: Boolean,
  },

  data() {
    return {
      // visible: false,
    };
  },

  methods: {
    async onFilter() {
      this.self.onLoad();
    },

    onReset() {
      this.self.parameters.params = {
        ...this.self.parameters.default_params,
      };
      this.self.onLoad();
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
