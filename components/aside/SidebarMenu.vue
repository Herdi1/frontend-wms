<template>
  <div class="relative h-[calc(100vh-80px)] overflow-y-auto">
    <ul class="relative space-y-0.5 p-4 py-0 font-semibold">
      <!-- <li class="menu nav-item">
        <h2
          class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]"
        >
          <icon-minus class="hidden h-5 w-4 flex-none" />
          <span>Setting</span>
        </h2>
        <ul>
          <li>
            <nuxt-link
              :class="[
                'nav-link group w-full',
                { 'nav-active': activeId === 'user' },
              ]"
              @click.native="setActiveMenu('user')"
              to="/setting/user"
              v-if="$auth.user && !$auth.user.parent_id"
            >
              <div
                class="flex items-center p-2 hover:bg-blue-500 rounded-md text-black hover:text-white dark:text-[#506690] dark:hover:text-white"
              >
                <i
                  :class="[
                    ' fas fa-users-cog mx-2',
                    { 'text-active': activeDropdown === 'user' },
                  ]"
                ></i>
                <span> Akun </span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :class="[
                'nav-link group w-full',
                { 'nav-active': activeId === 'group_role' },
              ]"
              @click.native="setActiveMenu('group_role')"
              to="/setting/group_role"
              v-if="$auth.user && !$auth.user.parent_id"
            >
              <div
                class="flex items-center p-2 hover:bg-blue-500 rounded-md text-black hover:text-white dark:text-[#506690] dark:hover:text-white"
              >
                <i
                  :class="[
                    'fas fa-users mx-2',
                    { 'text-active': activeDropdown === 'user' },
                  ]"
                ></i>
                <span> Hak Akses Grup </span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :class="[
                'nav-link group w-full',
                { 'nav-active': activeId === 'role' },
              ]"
              @click.native="setActiveMenu('role')"
              to="/setting/role"
              v-if="$auth.user && !$auth.user.parent_id"
            >
              <div
                class="flex items-center p-2 hover:bg-blue-500 rounded-md text-black hover:text-white dark:text-[#506690] dark:hover:text-white"
              >
                <i
                  :class="[
                    'fas fa-user-cog mx-2',
                    { 'text-active': activeDropdown === 'user' },
                  ]"
                ></i>
                <span> Hak Akses </span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :class="[
                'nav-link group w-full',
                { 'nav-active': activeId === 'setting' },
              ]"
              @click.native="setActiveMenu('setting')"
              to="/setting"
              v-if="$auth.user && !$auth.user.parent_id"
            >
              <div
                class="flex items-center p-2 hover:bg-blue-500 rounded-md text-black hover:text-white dark:text-[#506690] dark:hover:text-white"
              >
                <i
                  :class="[
                    'fas fa-cogs mx-2',
                    { 'text-active': activeDropdown === 'user' },
                  ]"
                ></i>
                <span> Aplikasi </span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :class="[
                'nav-link group w-full',
                { 'nav-active': activeId === 'activity' },
              ]"
              @click.native="setActiveMenu('activity')"
              to="/setting/activity"
              v-if="$auth.user && !$auth.user.parent_id"
            >
              <div
                class="flex items-center p-2 hover:bg-blue-500 rounded-md text-black hover:text-white dark:text-[#506690] dark:hover:text-white"
              >
                <i
                  :class="[
                    ' fas fa-sun mx-2',
                    { 'text-active': activeDropdown === 'user' },
                  ]"
                ></i>
                <span> Log Aktivitas </span>
              </div>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :class="[
                'nav-link group w-full',
                { 'nav-active': activeId === 'change_password' },
              ]"
              @click.native="setActiveMenu('change_password')"
              to="/setting/change_password"
            >
              <div
                class="flex items-center p-2 hover:bg-blue-500 rounded-md text-black hover:text-white dark:text-[#506690] dark:hover:text-white"
              >
                <i
                  :class="[
                    'fas fa-key mx-2',
                    { 'text-active': activeDropdown === 'user' },
                  ]"
                ></i>
                <span> Ganti Password </span>
              </div>
            </nuxt-link>
          </li>
        </ul>

      </li> -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search menu..."
        class="w-full px-2 py-1 mb-4 rounded text-gray-500 my-3 mr:3 border border-gray-300 outline-none"
      />
      <template v-for="item in filteredMenus">
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
                      :to="
                        '/' +
                        item.rute +
                        '/' +
                        child.rute +
                        '/' +
                        itemChild.rute
                      "
                      @click.native="setActiveMenu(itemChild.menu_id)"
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
      searchQuery: "",
    };
  },
  computed: {
    menus() {
      let menus = this.$store.state.setting.settings.find(
        (item) => item.nama == "roles"
      ).value;

      menus = menus.filter((menu) => menu.status == 0);

      menus.forEach((menu) => {
        if (Array.isArray(menu.childs)) {
          menu.childs = menu.childs.filter(
            (child) => child.status == 0
          );
          menu.childs.forEach((menu) => {
            menu.childs_2.filter((child) => child.status == 0);
          });
        }
      });

      if (this.$auth.user.is_superadmin != 1) {
        let roles_id = this.$auth.user.role.menus.reduce(
          (ids, item) => [...ids, item.menu_id],
          []
        );

        menus.forEach((element) => {
          element.childs = element.childs.filter(
            (item) =>
              roles_id.includes(item.menu_id) || item.childs_2.length > 0
          );

          element.childs.forEach((child) => {
            child.childs_2 = child.childs_2.filter((item) =>
              roles_id.includes(item.menu_id)
            );
          });
        });
      }

      return menus;
    },
    filteredMenus() {
      const search = this.searchQuery.toLowerCase();
      return this.menus
        .map((parent) => {
          let filteredChild = parent.childs.filter((child) =>
            child.judul.toLowerCase().includes(search)
          );

          if (
            parent.judul.toLowerCase().includes(search) ||
            filteredChild.length > 0
          ) {
            return {
              judul: parent.judul,
              rute: parent.rute,
              childs: filteredChild.length ? filteredChild : parent.childs,
            };
          }

          return null;
        })
        .filter(Boolean);
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
