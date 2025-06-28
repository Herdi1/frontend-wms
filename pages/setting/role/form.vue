<template>
  <div to="modal">
    <div class="" aria-hidden="true" id="modal-form">
      <div class="modal-dialog">
        <div class="">
          <h1 v-if="isEditable" class="text-xl font-bold mb-2 uppercase">
            Edit Data
          </h1>
          <h1 v-else class="text-xl font-bold mb-2 uppercase">Tambah Data</h1>

          <ValidationObserver v-slot="{ invalid, validate }" ref="formValidate">
            <form
              @submit.prevent="validate().then(() => onSubmit(invalid))"
              autocomplete="off"
            >
              <div class="modal-body">
                <ValidationProvider
                  ref="inputProvider"
                  name="name"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <label for="name">Rute</label>
                    <input
                      id="name"
                      type="text"
                      class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                      name="name"
                      v-model="parameters.form.rute"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />
                    <div class="text-danger" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                    <div class="text-danger text-small" v-if="isEditable">
                      * Hati-hati dalam menganti nama menu
                    </div>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  ref="inputProvider"
                  name="judul"
                  rules="required"
                >
                  <div class="form-group" slot-scope="{ errors, valid }">
                    <label for="judul">Nama Menu</label>
                    <input
                      id="judul"
                      type="text"
                      class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                      name="judul"
                      v-model="parameters.form.judul"
                      :class="
                        errors[0] ? 'is-invalid' : valid ? 'is-valid' : ''
                      "
                    />

                    <div class="text-danger" v-if="errors[0]">
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>

                <div class="form-group mb-3">
                  <label for="icon">Icon</label>
                  <input
                    id="icon"
                    type="text"
                    class="border border-gray-300 rounded md p-1 outline-none w-full text-gray-500"
                    name="icon"
                    v-model="parameters.form.icon"
                  />
                </div>

                <div class="form-group">
                  <label for="status_menu">Status Menu</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-3"
                    id="status_menu"
                    label="judul"
                    :options="[
                      { judul: 'Modul', value: '1' },
                      { judul: 'Parent', value: '2' },
                      { judul: 'Child', value: '3' },
                    ]"
                    :reduce="(item) => item.value"
                    v-model="parameters.form.status_menu"
                  >
                  </v-select>
                </div>

                <!-- menu induk 1 -->
                <div
                  class="form-group"
                  v-show="parameters.form.status_menu != 1"
                >
                  <label for="menu_id_induk">Module</label>
                  <v-select
                    id="menu_id_induk"
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="judul"
                    :loading="isLoadingGetRole"
                    :options="lookup_roles.data"
                    :filterable="false"
                    @search="onGetRole"
                    :reduce="(item) => item.menu_id"
                    v-model="parameters.form.menu_id_induk"
                    @input="onSearchRole2"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="flex justify-between"
                      v-if="lookup_roles.data.length || search"
                    >
                      <span
                        v-if="lookup_roles.current_page > 1"
                        @click="onGetRole(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-1 rounded-sm"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_roles.last_page > lookup_roles.current_page
                        "
                        @click="onGetRole(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-1 rounded-sm"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                  <span class="text-muted text-xs">
                    *Kosongi jika ingin membuat menu menjadi module
                  </span>
                </div>

                <!-- menu induk 2 -->
                <div
                  class="form-group"
                  v-show="
                    parameters.form.status_menu != 1 &&
                    parameters.form.status_menu != 2
                  "
                >
                  <!-- <search-dropdown
                    :optionsData="lookup_custom1"
                    label="Parent"
                    :isLoading="isLoadingGetCustom"
                    :onSearch="onGetRole2"
                    :reduce="(item) => item.menu_id"
                    :value="parameters.form.menu_id_induk_2"
                  /> -->
                  <label for="parent_id">Parent</label>
                  <v-select
                    class="w-full rounded-sm bg-white text-gray-500 border-gray-300"
                    label="judul"
                    :loading="isLoadingGetCustom"
                    :options="lookup_custom1.data"
                    :filterable="false"
                    @search="onGetRole2"
                    :reduce="(item) => item.menu_id"
                    v-model="parameters.form.menu_id_induk_2"
                  >
                    <li
                      slot-scope="{ search }"
                      slot="list-footer"
                      class="p-2 border-t flex justify-between"
                      v-if="lookup_custom1.data.length || search"
                    >
                      <span
                        v-if="lookup_custom1.current_page > 1"
                        @click="onGetRole2(search, false)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Sebelumnya</span
                      >
                      <span
                        v-if="
                          lookup_custom1.last_page > lookup_custom1.current_page
                        "
                        @click="onGetRole2(search, true)"
                        class="flex-fill bg-primary text-white text-center cursor-pointer p-2 rounded"
                        >Selanjutnya</span
                      >
                    </li>
                  </v-select>
                  <span class="text-muted text-xs">
                    *Kosongi jika ingin membuat menu menjadi parent
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label for="status">Aplikasi</label>
                <v-select
                  class="w-full rounded-sm bg-white text-gray-500 border-gray-300 mb-3"
                  id="status"
                  label="judul"
                  :options="[
                    { judul: 'Web', value: '0' },
                    { judul: 'Android', value: '1' },
                  ]"
                  :reduce="(item) => item.value"
                  v-model="parameters.form.status"
                >
                </v-select>
              </div>

              <modal-footer-section
                :isLoadingForm="isLoadingForm"
                @reset="formReset()"
              />
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  middleware: ["isNotAccessable"],

  props: ["self"],

  async mounted() {
    await this.onSearchRole();
    // await this.onSearchRole2();
  },

  data() {
    return {
      isStopSearchRole: false,
      isLoadingGetRole: false,

      isStopSearchCustom: false,
      isLoadingGetCustom: false,

      statusMenu: "",
      role_search: "",
      custom_search: "",

      isEditable: false,
      isLoadingForm: false,
      title: "Role",
      parameters: {
        url: "setting/menu",
        form: {
          rute: "",
          judul: "",
          icon: "",
          menu_id_induk: "",
          menu_id_induk_2: "",
          urutan: "",
          status: "",
          status_menu: "",
        },
      },
    };
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_roles",
      "lookup_custom1",
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;

      this.isLoadingForm = true;

      let parameters = {
        ...this.parameters,
        form: {
          ...this.parameters.form,
          urutan: 0,
          id: this.parameters.form.menu_id ? this.parameters.form.menu_id : "",
          menu_id: this.parameters.form.menu_id
            ? this.parameters.form.menu_id
            : "",
          // menu_id: this.parameters.form.menu_id,
        },
      };

      if (this.isEditable) {
        await this.updateData(parameters);
      } else {
        await this.addData(parameters);
      }

      if (this.result == true) {
        this.self.onLoad(this.self.parameters.params.page);
        this.$toaster.success(
          "Data berhasil di " + (this.isEditable == true ? "Diedit" : "Tambah")
        );
        this.isEditable = false;
        this.parameters.form = {
          rute: "",
          judul: "",
          icon: "",
          menu_id_induk: "",
          menu_id_induk_2: "",
          urutan: "",
          status: "",
          status_menu: "",
        };

        this.$refs.inputProvider.reset();
      } else {
        this.$globalErrorToaster(this.$toaster, this.error);
      }

      this.isLoadingForm = false;
    },

    //get modul
    onGetRole(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchRole);

      this.isStopSearchRole = setTimeout(() => {
        this.role_search = search;

        if (typeof isNext !== "function") {
          this.lookup_roles.current_page = isNext
            ? this.lookup_roles.current_page + 1
            : this.lookup_roles.current_page - 1;
        } else {
          this.lookup_roles.current_page = 1;
        }

        // this.statusMenu = '&status_menu=1';

        this.onSearchRole();
      }, 600);
      this.onSearchRole2();
    },

    async onSearchRole() {
      if (!this.isLoadingGetRole) {
        this.isLoadingGetRole = true;

        await this.lookUp({
          url: "setting/menu/get-menu",
          lookup: "roles",
          query:
            "?search=" +
            this.role_search +
            "&status_menu=1" +
            "&page=" +
            this.lookup_roles.current_page +
            "&per_page=10",
        });

        this.isLoadingGetRole = false;
        // console.log(this.lookup_roles.data);
      }
    },

    //get parent 2
    onGetRole2(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchCustom);

      this.isStopSearchCustom = setTimeout(() => {
        this.custom_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }

        this.onSearchRole2();
        console.log("get parent");
      }, 600);
    },

    async onSearchRole2() {
      if (!this.isLoadingGetCustom) {
        this.isLoadingGetCustom = true;

        await this.lookUp({
          url: "setting/menu/get-menu",
          lookup: "custom1",
          query:
            "?search=" +
            this.custom_search +
            "&menu_id_induk=" +
            this.parameters.form.menu_id_induk +
            "&status_menu=2" +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });

        this.isLoadingGetCustom = false;
        // console.log("get parent");
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        rute: "",
        judul: "",
        icon: "",
        menu_id_induk: "",
        menu_id_induk_2: "",
        urutan: "",
        status: "",
        status_menu: "",
      };
    },
  },
};
</script>
