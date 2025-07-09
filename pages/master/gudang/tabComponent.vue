<template>
  <div class="px-3 bg-white border rounded">
    <div class="flex border-b mb-4">
      <button
        type="button"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="px-4 py-2 -mb-px font-semibold border-b-2"
        :class="{
          'border-blue-500 text-blue-600': activeTab === index,
          'border-transparent text-gray-500': activeTab !== index,
        }"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="p-4">
      <slot :name="tabs[activeTab].slotName || tabs[activeTab].name" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>
