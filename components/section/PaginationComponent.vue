<template>
  <div class="flex justify-between items-baseline clearfix mt-3">
    <div class="">Showing {{ from }} to {{ to }} of {{ total }} records</div>
    <div>
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
          v-if="!pages.some((number) => number == 1)"
          v-bind:class="['page-item', { active: 1 == active_page }]"
          @click="clickPage(1)"
        >
          <a class="px-2 py-1 rounded-sm page-link page">1</a>
        </li>
        <li v-if="!pages.some((number) => number == 1)">
          <a class="px-2 py-1 rounded-sm page-link page">...</a>
        </li>
        <li
          v-for="i in pages"
          :key="i"
          v-bind:class="['page-item', { active: i == active_page }]"
          @click="clickPage(i)"
        >
          <a class="px-2 py-1 rounded-sm page-link page">{{ i }}</a>
        </li>
        <li v-if="!pages.some((number) => number == total_page)">
          <a class="px-2 py-1 rounded-sm page-link page">...</a>
        </li>
        <li
          v-if="!pages.some((number) => number == total_page)"
          v-bind:class="['page-item', { active: total_page == active_page }]"
          @click="clickPage(total_page)"
        >
          <a class="px-2 py-1 rounded-sm page-link page">{{ total_page }}</a>
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
      // pages: [],
      click_counter: 1,
      disable_next_page: false,
      disable_prive_page: true,
      active_page: "",
      end_page: "",

      // from: 0,
      // to: 0,
      // total_page: 0,
      // current_page: 0,
      // total: 0,
      // per_page: 0,
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

    pages() {
      let pages = [];
      pages.push(this.current_page);
      if (this.current_page > 1) {
        pages.unshift(this.current_page - 1);
      }
      if (this.current_page < this.total_page) {
        pages.push(this.current_page + 1);
      }
      return pages;
    },
  },

  methods: {
    nextPage() {
      if (this.active_page === this.total_page) return;

      this.active_page = this.active_page + 1;
      if (this.active_page > 1) this.disable_prive_page = false;
      if (this.active_page == this.total_page) this.disable_next_page = true;

      this.self.onLoad(this.active_page);
    },

    privousPage() {
      if (this.active_page == "1") return;
      // console.log(this.active_page);

      this.active_page = this.active_page - 1;
      if (this.active_page == 1) this.disable_prive_page = true;
      if (this.active_page < this.total_page) this.disable_next_page = false;

      this.self.onLoad(this.active_page);
    },

    clickPage(item) {
      this.active_page = item;
      this.self.onLoad(this.active_page);
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
