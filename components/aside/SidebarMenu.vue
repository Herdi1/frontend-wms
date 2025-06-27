<template>
  <div class="relative h-[calc(100vh-80px)] overflow-y-auto">
    <ul class="relative space-y-0.5 p-4 py-0 font-semibold">
      <template v-for="item in menus">
        <li class="menu nav-item" :key="item.id" v-if="item.childs.length">
          <h2
            class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]"
          >
            <icon-minus class="hidden h-5 w-4 flex-none" />
            <span>{{ item.judul }}</span>
          </h2>
          <ul>
            <li
              v-for="child in item.childs"
              :key="child.menu_id"
              class="menu nav-item"
            >
              <button
                v-if="child.childs_2 && child.childs_2.length"
                type="button"
                class="nav-link group w-full"
                :class="{ active: activeDropdown === child.rute }"
                @click="
                  activeDropdown === child.rute
                    ? (activeDropdown = null)
                    : (activeDropdown = child.rute)
                "
              >
                <div class="flex items-center justify-between w-full">
                  <div class="flex">
                    <i
                      :class="[
                        'mx-2 fas fa-' + child.icon,
                        { 'text-active': activeDropdown === child.rute },
                      ]"
                    ></i>
                    <span>
                      {{ child.judul }}
                    </span>
                  </div>
                  <div
                    v-show="child.childs_2.length"
                    :class="{
                      '-rotate-90 rtl:rotate-90': activeDropdown !== child.rute,
                    }"
                  >
                    <IconCaretDown />
                  </div>
                </div>
              </button>
              <nuxt-link
                v-else
                :to="'/' + item.rute + '/' + child.rute"
                class="nav-link group w-full"
                :class="{ active: activeDropdown === child.rute }"
                @click="
                  activeDropdown === child.rute
                    ? (activeDropdown = null)
                    : (activeDropdown = child.rute)
                "
              >
                <div class="">
                  <i
                    :class="[
                      'mx-2 fas fa-' + child.icon,
                      { '': activeDropdown === child.rute },
                    ]"
                  ></i>
                  <span>
                    {{ child.judul }}
                  </span>
                </div>
              </nuxt-link>
              <vue-collapsible :isOpen="activeDropdown === child.rute">
                <ul class="sub-menu text-gray-500" :key="child.id + 'child'">
                  <li
                    v-for="itemChild in child.childs_2"
                    :key="itemChild.menu_id"
                  >
                    <nuxt-link
                      :class="[
                        'nav-link',
                        { 'nav-active': subActive === itemChild.id },
                      ]"
                      :to="'/' + item.rute + '/' + itemChild.rute"
                      @click.native="setActiveMenu(itemChild.id)"
                    >
                      <i
                        :class="[
                          'fas fa-' + itemChild.icon,
                          { 'text-active': subActive === itemChild.id },
                          'mr-2',
                        ]"
                      ></i>
                      <span
                        :class="{ 'text-active': subActive === itemChild.id }"
                      >
                        {{ itemChild.judul }}
                      </span>
                    </nuxt-link>
                  </li>
                </ul>
              </vue-collapsible>
            </li>
          </ul>
        </li>

        <!-- <li class="nav-item dropdown" :key="item.id + 'child'">
        </li> -->
      </template>

      <!-- PENGATURAN -->
      <!-- <li class="menu-header">SETTING</li> -->

      <!-- END PENGATURAN -->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeDropdown: "dashboard",
      subActive: "",
    };
  },
  computed: {
    menus() {
      let menus = this.$store.state.setting.settings.find(
        (item) => item.nama == "roles"
      ).value;

      if (this.$auth.user.parent_id) {
        let roles_id = this.$auth.user.group_role.roles.reduce(
          (ids, item) => [...ids, item.id],
          []
        );

        menus.forEach((element) => {
          element.childs = element.childs.filter((item) =>
            roles_id.includes(item.id)
          );
        });
      }

      return menus;
    },
  },
  methods: {
    setActiveMenu(index) {
      this.subActive = index;
    },
  },
};
</script>

<style scoped>
.sidebar-menu > .nav-item > a > span {
  font-size: 12px;
}
.sidebar-menu > .nav-item > a > span {
  font-size: 12px;
}

.primary-theme {
  background-color: #2b7bf3;
}

.nav-link {
  height: 35px !important;
}
.nav-active {
  background-color: #2b7bf3;
}
.text-active {
  color: #ffff;
}

.nav-item a:hover {
  background-color: #2b7bf3 !important ;
  color: #ffff !important;
}
</style>
