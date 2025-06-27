<template>
  <div :class="{ 'dark text-white-dark': $store.state.semidark }">
    <nav
      :class="[
        'sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300',
      ]"
    >
      <div class="h-full bg-white dark:bg-[#0e1726]">
        <app-sidebar-brand></app-sidebar-brand>
        <app-sidebar-menu></app-sidebar-menu>
      </div>
    </nav>
  </div>
</template>
<script>
import SidebarBrand from "@/components/aside/SidebarBrand.vue";
import SidebarMenu from "@/components/aside/SidebarMenu.vue";
export default {
  components: {
    "app-sidebar-menu": SidebarMenu,
    "app-sidebar-brand": SidebarBrand,
  },
};
</script>
