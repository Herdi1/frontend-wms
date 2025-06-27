<template>
  <div
    class="flex justify-between items-baseline clearfix mt-3"
    v-if="self.isPaginate"
  >
    <div class="">Showing {{ from }} to {{ to }} of {{ total }} records</div>
    <div class="">
      <ul class="flex gap-3">
        <button
          :disabled="disable_prive_page"
          v-bind:class="['page-item', { disabled: disable_prive_page }]"
          @click="privousPage()"
        >
          <a
            class="bg-gray-100 px-2 py-1 rounded-sm text-gray-500 dark:bg-slate-700"
            tabindex="-1"
          >
            <i class="fas fa-chevron-left"></i>
          </a>
        </button>

        <li
          v-for="i in pages"
          :key="i"
          v-bind:class="['page-item', { active: i == active_page }]"
          @click="self.onLoad(i)"
        >
          <a class="px-2 py-1 rounded-sm page-link page">{{ i }}</a>
        </li>

        <li v-if="total_page > 5" class="page-item disabled">
          <a class="px-2 py-1 rounded-sm page-link" href="#">...Of</a>
        </li>

        <li v-if="total_page > 5" class="page-item disabled">
          <a class="px-2 py-1 rounded-sm page-link" href="#">
            {{ total_page }}</a
          >
        </li>

        <button
          :disabled="disable_next_page"
          v-bind:class="['page-item', { disabled: disable_next_page }]"
          @click="nextPage()"
        >
          <a
            class="bg-gray-100 px-2 py-1 rounded-sm text-gray-500 dark:bg-slate-700"
          >
            <i class="fas fa-chevron-right"></i>
          </a>
        </button>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    self: Object,
  },

  data() {
    return {
      pages: [],
      click_counter: 1,
      disable_next_page: false,
      disable_prive_page: true,
      active_page: "",
      end_page: "",
    };
  },
  computed: {
    ...mapState("pagination", {
      from: (state) => state.from,
      to: (state) => state.to,
      total_page: (state) => state.total_page,
      current_page: (state) => state.current_page,
      total: (state) => state.total,
      per_page: (state) => state.per_page,
    }),
  },

  methods: {
    generatePage() {
      var page_count = [];
      var total_pages = this.total_page > 5 ? 5 : this.total_page;

      for (var i = 0; i <= total_pages - 1; i++) {
        page_count.push(i + 1);
      }

      this.pages = page_count;
      this.click_counter = 1;
      this.disable_next_page = this.total_page <= 5;
    },

    nextPage() {
      if (this.active_page + 5 > this.total_page) return;

      var counter = this.click_counter + 1;
      var start_page = counter * 5 - 5;
      var rest_page = this.total_page;
      var page_count = [];

      this.active_page = start_page + 1;

      if (this.total_page - counter * 5 + 5 >= 5) {
        rest_page = counter * 5;
        this.disable_next_page = false;
      } else {
        this.disable_next_page = true;
      }

      for (let i = start_page + 1; i <= rest_page; i++) {
        page_count.push(i);
      }

      this.pages = page_count;
      this.disable_prive_page = false;
      this.click_counter++;
    },

    privousPage() {
      if (this.active_page - 5 < 1) return;

      var counter = this.click_counter - 1;
      var start_page = (counter - 1) * 5;
      var page_count = [];

      for (let i = start_page + 1; i <= start_page + 5; i++) {
        page_count.push(i);
      }

      this.pages = page_count;
      this.active_page = page_count[0];
      this.click_counter--;

      this.disable_prive_page = this.click_counter === 1;
      this.disable_next_page = false;
    },
  },
};
</script>
<style scoped>
.page-item.active .page-link {
  color: white;
  background-color: #2b7bf3 !important;
  border-color: #2b7bf3 !important;
}

.page-item .page-link:hover {
  background-color: #2b7bf3 !important;
  border-color: #2b7bf3 !important;
}
</style>
